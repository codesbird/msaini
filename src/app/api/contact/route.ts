import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { adminDb } from "@/lib/firebase-admin";
import { defaultSmtpConfig, personalInfo } from "@/data/portfolio-data";
import { SmtpConfig } from "@/types/portfolio";

export const dynamic = "force-dynamic";

async function getActiveSmtpConfig(): Promise<SmtpConfig> {
  if (adminDb) {
    try {
      const snap = await adminDb.ref("portfolio/smtpConfig").once("value");
      if (snap.exists() && snap.val()) {
        const val = snap.val();
        return {
          host: val.host || defaultSmtpConfig.host,
          port: Number(val.port) || defaultSmtpConfig.port,
          secure: Boolean(val.secure),
          user: val.user || defaultSmtpConfig.user,
          pass: val.pass || defaultSmtpConfig.pass,
          fromEmail: val.fromEmail || defaultSmtpConfig.fromEmail,
          toEmail: val.toEmail || defaultSmtpConfig.toEmail,
          enabled: Boolean(val.enabled),
        };
      }
    } catch (err) {
      console.warn("Could not read SMTP config from Firebase RTDB:", err);
    }
  }
  return defaultSmtpConfig;
}

function createSmtpTransporter(config: SmtpConfig, timeout = 12000) {
  const port = Number(config.port) || 587;

  // Intelligent SSL/TLS Resolution:
  // Port 465 is dedicated for direct SMTPS (secure: true).
  // Port 587 (and 25) are dedicated for submission with STARTTLS (secure: false).
  // If 'secure: true' is requested on port 587, OpenSSL throws:
  // "tls_validate_record_header:wrong version number" because port 587 initially speaks plain ASCII.
  let isSecure = Boolean(config.secure);
  if (port === 465) {
    isSecure = true;
  } else if (port === 587 || port === 25) {
    isSecure = false;
  }

  return nodemailer.createTransport({
    host: config.host,
    port,
    secure: isSecure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: timeout,
    greetingTimeout: timeout,
    socketTimeout: timeout,
  });
}

function getFriendlySmtpError(err: any, port: number): string {
  const msg = err?.message || String(err);
  if (msg.includes("wrong version number")) {
    return `TLS Protocol Mismatch: Port ${port} does not support direct SSL socket handshake. Port 587 requires STARTTLS (uncheck 'Use SSL' or switch port to 465).`;
  }
  if (msg.includes("Invalid login") || msg.includes("535") || msg.includes("BadCredentials") || msg.includes("Username and Password not accepted")) {
    return `Authentication Failed: Incorrect username or password. For Gmail, make sure to generate and use a 16-character Google App Password (not your primary password).`;
  }
  if (msg.includes("ETIMEDOUT") || msg.includes("ECONNREFUSED") || msg.includes("greeting timeout")) {
    return `Connection Timeout: Could not connect to SMTP server on port ${port}. Please verify the host address and network/firewall.`;
  }
  return msg;
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Check if this is an SMTP test connection request from Admin Dashboard
    if (payload.action === "test") {
      const testConfig: SmtpConfig = payload.config || (await getActiveSmtpConfig());

      if (!testConfig.host || !testConfig.user || !testConfig.pass) {
        return NextResponse.json(
          {
            success: false,
            error: "Incomplete SMTP configuration. Host, User, and Password are required.",
          },
          { status: 400 }
        );
      }

      const port = Number(testConfig.port) || 587;
      const transporter = createSmtpTransporter(testConfig, 12000);

      try {
        // Verify connection handshake
        await transporter.verify();

        // Send verification email to toEmail
        const testResult = await transporter.sendMail({
          from: testConfig.fromEmail || testConfig.user,
          to: testConfig.toEmail || testConfig.user,
          subject: `[SMTP Test] Monu Saini Portfolio - Connection Verified`,
          text: `This is a test notification confirming that the SMTP service on your Monu Saini Portfolio CMS is configured correctly.\n\nHost: ${testConfig.host}\nPort: ${port}\nSecure Mode: ${port === 465 ? "Direct SSL (Port 465)" : "STARTTLS (Port 587)"}\nTimestamp: ${new Date().toISOString()}`,
          html: `
            <div style="font-family: monospace; background-color: #08090d; color: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #1e293b;">
              <h2 style="color: #06b6d4; margin-top: 0;">// SMTP Handshake Successful</h2>
              <p style="color: #94a3b8; font-size: 13px;">Your portfolio CMS mail server is authenticated and ready to route recruiter inquiries.</p>
              <div style="background-color: #0f172a; padding: 16px; border-radius: 8px; border: 1px solid #334155; margin: 16px 0; font-size: 12px; color: #cbd5e1;">
                <div><strong>Host:</strong> ${testConfig.host}</div>
                <div><strong>Port:</strong> ${port}</div>
                <div><strong>User:</strong> ${testConfig.user}</div>
                <div><strong>Security Protocol:</strong> ${port === 465 ? "Direct SSL / SMTPS (Port 465)" : "STARTTLS Auto-Negotiated (Port 587)"}</div>
                <div><strong>Timestamp:</strong> ${new Date().toISOString()}</div>
              </div>
              <div style="color: #10b981; font-weight: bold; font-size: 12px;">✓ Verified by Monu Saini Telemetry Engine</div>
            </div>
          `,
        });

        return NextResponse.json({
          success: true,
          message: `SMTP Verified! Test email delivered to ${testConfig.toEmail || testConfig.user}`,
          messageId: testResult.messageId,
        });
      } catch (verifyErr: any) {
        console.error("SMTP Verify/Send test failed:", verifyErr);
        return NextResponse.json(
          {
            success: false,
            error: getFriendlySmtpError(verifyErr, port),
          },
          { status: 400 }
        );
      }
    }

    // Standard Contact Form Submission
    const { name, email, phone, company, roleType, workMode, subject, message } = payload;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const activeConfig = await getActiveSmtpConfig();

    // Always store the inquiry in Firebase RTDB if adminDb is available so no messages are lost
    if (adminDb) {
      try {
        await adminDb.ref("inquiries").push({
          name,
          email,
          phone: phone || "",
          company: company || "",
          roleType: roleType || "General",
          workMode: workMode || "Not Specified",
          subject: subject || roleType || "Portfolio Contact Inquiry",
          message,
          timestamp,
          source: "web-contact-form",
        });
      } catch (dbErr) {
        console.warn("Could not log inquiry to Firebase:", dbErr);
      }
    }

    // If SMTP is enabled and has credentials, send actual email
    if (activeConfig.enabled && activeConfig.host && activeConfig.user && activeConfig.pass) {
      const transporter = createSmtpTransporter(activeConfig, 15000);
      const emailSubject = `[Portfolio Lead] ${company ? `${company} - ` : ""}${roleType || subject || "New Inquiry"} from ${name}`;

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #08090d; color: #f8fafc; padding: 28px; border-radius: 12px; border: 1px solid #1e293b; max-width: 650px; margin: 0 auto;">
          <div style="border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 20px;">
            <span style="font-family: monospace; font-size: 11px; color: #06b6d4; text-transform: uppercase; letter-spacing: 1px;">// INCOMING RECRUITMENT TRANSMISSION</span>
            <h2 style="color: #ffffff; margin: 6px 0 0 0; font-size: 20px;">${emailSubject}</h2>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 10px 0; color: #94a3b8; width: 140px;"><strong>Candidate Target:</strong></td>
              <td style="padding: 10px 0; color: #38bdf8;">Monu Saini (Python Developer & AI Automation Engineer)</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 10px 0; color: #94a3b8;"><strong>Sender / Recruiter:</strong></td>
              <td style="padding: 10px 0; color: #f8fafc; font-weight: bold;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 10px 0; color: #94a3b8;"><strong>Organization:</strong></td>
              <td style="padding: 10px 0; color: #f8fafc;">${company || "Direct Individual"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 10px 0; color: #94a3b8;"><strong>Sender Email:</strong></td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a></td>
            </tr>
            ${
              phone
                ? `
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 10px 0; color: #94a3b8;"><strong>Phone / WhatsApp:</strong></td>
              <td style="padding: 10px 0; color: #f8fafc;"><a href="tel:${phone}" style="color: #10b981; text-decoration: none;">${phone}</a></td>
            </tr>`
                : ""
            }
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 10px 0; color: #94a3b8;"><strong>Opportunity Role:</strong></td>
              <td style="padding: 10px 0; color: #a855f7; font-weight: bold;">${roleType || "Software Developer"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 10px 0; color: #94a3b8;"><strong>Work Mode:</strong></td>
              <td style="padding: 10px 0; color: #f8fafc;">${workMode || "Flexible"}</td>
            </tr>
          </table>

          <div style="background-color: #0f172a; padding: 18px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 20px;">
            <div style="font-family: monospace; font-size: 11px; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px;">Role Details / Message:</div>
            <div style="font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">${message}</div>
          </div>

          <div style="font-family: monospace; font-size: 11px; color: #64748b; border-top: 1px solid #1e293b; padding-top: 14px;">
            <div>Dispatched via Monu Saini Portfolio CMS // ${timestamp}</div>
            <div>Reply directly to this email to contact ${name} (${email}).</div>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: activeConfig.fromEmail || `"${name} via Portfolio" <${activeConfig.user}>`,
        to: activeConfig.toEmail || personalInfo.email,
        replyTo: email,
        subject: emailSubject,
        text: `New Portfolio Lead from ${name} (${email}, Company: ${company || "N/A"}):\n\nRole: ${roleType}\nWork Mode: ${workMode}\nPhone: ${phone || "N/A"}\n\nMessage:\n${message}\n\nTimestamp: ${timestamp}`,
        html: htmlContent,
      });

      return NextResponse.json({
        success: true,
        mode: "smtp",
        message: "Your message has been delivered directly to Monu Saini.",
      });
    }

    // If SMTP is disabled, message is recorded to database / local backup
    return NextResponse.json({
      success: true,
      mode: "stored",
      message:
        "Your message was recorded successfully and queued for review. (SMTP is in standby mode).",
    });
  } catch (error: any) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to process transmission.",
      },
      { status: 500 }
    );
  }
}
