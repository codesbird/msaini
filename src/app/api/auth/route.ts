import { NextResponse } from "next/server";
import { generateSecret, generateURI, verifySync } from "otplib";
import QRCode from "qrcode";
import nodemailer from "nodemailer";
import { adminDb } from "@/lib/firebase-admin";
import { defaultPortfolioData } from "@/lib/portfolio-service";
import { defaultSmtpConfig, defaultSecurityConfig } from "@/data/portfolio-data";
import { SmtpConfig, AdminSecurityConfig } from "@/types/portfolio";

export const dynamic = "force-dynamic";

async function getActiveSmtpConfig(): Promise<SmtpConfig> {
  if (adminDb) {
    try {
      const snap = await adminDb.ref("portfolio/smtpConfig").once("value");
      if (snap.exists()) {
        return snap.val();
      }
    } catch (e) {
      console.warn("Could not read smtpConfig from Firebase Admin:", e);
    }
  }
  return defaultPortfolioData.smtpConfig || defaultSmtpConfig;
}

async function getActiveSecurityConfig(): Promise<AdminSecurityConfig> {
  if (adminDb) {
    try {
      const snap = await adminDb.ref("portfolio/securityConfig").once("value");
      if (snap.exists()) {
        return snap.val();
      }
    } catch (e) {
      console.warn("Could not read securityConfig from Firebase Admin:", e);
    }
  }
  return defaultPortfolioData.securityConfig || defaultSecurityConfig;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    // 1. Generate MFA Secret, QR Code, and Backup Codes
    if (action === "generate-mfa") {
      const email = body.email || "monusainideveloper@gmail.com";
      const secret = generateSecret();
      const otpauthUrl = generateURI({
        secret,
        label: email,
        issuer: "Monu Saini Portfolio",
      });

      const qrCodeUrl = await QRCode.toDataURL(otpauthUrl, {
        width: 250,
        margin: 2,
        color: {
          dark: "#06b6d4",
          light: "#08090d",
        },
      });

      // Generate 4 randomized backup recovery codes
      const backupCodes = Array.from({ length: 4 }, () => {
        const rand = Math.floor(1000 + Math.random() * 9000);
        return `MONU-${rand}`;
      });

      return NextResponse.json({
        success: true,
        secret,
        otpauthUrl,
        qrCodeUrl,
        backupCodes,
      });
    }

    // 2. Verify MFA Token or Backup Code
    if (action === "verify-mfa") {
      const { secret, token, backupCodes } = body;

      if (!token) {
        return NextResponse.json({ valid: false, error: "Token is required" }, { status: 400 });
      }

      const cleanToken = String(token).trim();

      // Check if it's an emergency backup code
      if (Array.isArray(backupCodes)) {
        const isBackupMatch = backupCodes.some(
          (code: string) => code.toUpperCase().trim() === cleanToken.toUpperCase()
        );
        if (isBackupMatch) {
          return NextResponse.json({ valid: true, isBackup: true });
        }
      }

      // Check standard 6-digit TOTP token
      if (secret) {
        try {
          const result = verifySync({ secret, token: cleanToken });
          if (result && result.valid) {
            return NextResponse.json({ valid: true, isBackup: false });
          }
        } catch (verifyErr) {
          console.warn("MFA TOTP verification check failed:", verifyErr);
        }
      }

      return NextResponse.json({ valid: false, error: "Invalid 6-digit verification code or backup code" });
    }

    // 3. Send Password Recovery Code via SMTP
    if (action === "send-recovery-code") {
      const email = body.email?.trim()?.toLowerCase();
      const securityConfig = await getActiveSecurityConfig();
      const registeredEmail = (securityConfig.email || "monusainideveloper@gmail.com").toLowerCase();

      if (!email || email !== registeredEmail) {
        return NextResponse.json(
          { error: `The email "${email}" does not match the registered administrator account.` },
          { status: 400 }
        );
      }

      // Generate 6-digit reset code
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      const resetCodeExpires = Date.now() + 15 * 60 * 1000; // 15 mins expiry

      // Save code in Firebase if available
      if (adminDb) {
        await adminDb.ref("portfolio/securityConfig/resetCode").set(resetCode);
        await adminDb.ref("portfolio/securityConfig/resetCodeExpires").set(resetCodeExpires);
      }

      const smtpConfig = await getActiveSmtpConfig();
      let emailDispatched = false;
      let dispatchError = null;

      if (smtpConfig.enabled && smtpConfig.host && smtpConfig.user && smtpConfig.pass) {
        try {
          const port = Number(smtpConfig.port) || 587;
          const isSecure = port === 465;

          const transporter = nodemailer.createTransport({
            host: smtpConfig.host,
            port,
            secure: isSecure,
            auth: {
              user: smtpConfig.user,
              pass: smtpConfig.pass,
            },
            connectionTimeout: 10000,
          });

          await transporter.sendMail({
            from: smtpConfig.fromEmail || smtpConfig.user,
            to: registeredEmail,
            subject: `[Security Notice] Admin Passphrase Reset Code: ${resetCode}`,
            text: `Your administrator passphrase reset code for Monu Saini Portfolio is: ${resetCode}\n\nThis code expires in 15 minutes.\nIf you did not request this, please verify your account security immediately.`,
            html: `
              <div style="font-family: monospace; background-color: #08090d; color: #f8fafc; padding: 28px; border-radius: 12px; border: 1px solid #1e293b; max-width: 520px;">
                <div style="color: #06b6d4; font-size: 14px; font-weight: bold; margin-bottom: 8px;">// SECURITY TELEMETRY GATE</div>
                <h2 style="color: #ffffff; margin-top: 0; font-size: 20px;">Administrator Passphrase Recovery</h2>
                <p style="color: #94a3b8; font-size: 13px; line-height: 1.6;">
                  A password reset request was initiated for your Monu Saini Portfolio CMS control center.
                </p>
                <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; border: 1px solid #06b6d4; margin: 20px 0; text-align: center;">
                  <div style="color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">One-Time Security Verification Code</div>
                  <div style="color: #10b981; font-size: 32px; font-weight: bold; letter-spacing: 6px;">${resetCode}</div>
                  <div style="color: #64748b; font-size: 11px; margin-top: 8px;">Valid for 15 minutes • Single-use only</div>
                </div>
                <p style="color: #64748b; font-size: 11px;">
                  If you did not initiate this request, your current password remains secure.
                </p>
              </div>
            `,
          });
          emailDispatched = true;
        } catch (err: any) {
          console.error("Failed to send recovery email via SMTP:", err);
          dispatchError = err?.message || String(err);
        }
      }

      return NextResponse.json({
        success: true,
        emailDispatched,
        message: emailDispatched
          ? `Verification code dispatched to ${registeredEmail}`
          : `SMTP is offline or unconfigured. In local mode, your recovery code is: ${resetCode}`,
        // Provide resetCode directly if email couldn't be sent so the admin is never locked out in dev
        devCode: !emailDispatched ? resetCode : undefined,
        dispatchError,
      });
    }

    // 4. Reset & Update Password
    if (action === "reset-password") {
      const { email, resetCode, newPassword } = body;

      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters long." }, { status: 400 });
      }

      const securityConfig = await getActiveSecurityConfig();
      const registeredEmail = (securityConfig.email || "monusainideveloper@gmail.com").toLowerCase();

      if (!email || email.toLowerCase().trim() !== registeredEmail) {
        return NextResponse.json({ error: "Email mismatch with administrator account." }, { status: 400 });
      }

      // Check reset code
      const storedCode = securityConfig.resetCode;
      const expires = securityConfig.resetCodeExpires || 0;

      // Allow master recovery code MONU-RECOVER-2026 or valid stored reset code
      const isMasterCode = resetCode === "MONU-RECOVER-2026";
      const isValidStoredCode = storedCode && storedCode === String(resetCode).trim() && Date.now() <= expires;

      if (!isMasterCode && !isValidStoredCode) {
        return NextResponse.json({ error: "Invalid or expired verification code." }, { status: 400 });
      }

      // Update password
      const updatedConfig: AdminSecurityConfig = {
        ...securityConfig,
        customPassword: newPassword,
        resetCode: undefined,
        resetCodeExpires: undefined,
      };

      if (adminDb) {
        await adminDb.ref("portfolio/securityConfig").set(updatedConfig);
      }

      return NextResponse.json({
        success: true,
        message: "Administrator password updated successfully. You can now authenticate.",
      });
    }

    return NextResponse.json({ error: `Unknown action: "${action}"` }, { status: 400 });
  } catch (error: any) {
    console.error("API /api/auth error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
