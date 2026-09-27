import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { defaultPortfolioData } from "@/lib/portfolio-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!adminDb) {
      return NextResponse.json({
        data: defaultPortfolioData,
        source: "fallback-no-admin-sdk",
      });
    }

    const snapshot = await adminDb.ref("portfolio").once("value");
    if (snapshot.exists()) {
      return NextResponse.json({
        data: snapshot.val(),
        source: "firebase-admin",
      });
    }

    return NextResponse.json({
      data: defaultPortfolioData,
      source: "defaults",
    });
  } catch (error: any) {
    console.error("GET /api/portfolio error:", error);
    return NextResponse.json(
      { data: defaultPortfolioData, error: error?.message, source: "error-fallback" },
      { status: 200 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { section, data } = await req.json();

    if (!section || data === undefined) {
      return NextResponse.json({ error: "Missing section or data payload" }, { status: 400 });
    }

    const timestamp = new Date().toISOString();

    if (adminDb) {
      await adminDb.ref(`portfolio/${section}`).set(data);
      await adminDb.ref("portfolio/lastUpdated").set(timestamp);

      return NextResponse.json({
        success: true,
        source: "firebase-admin",
        section,
        timestamp,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: "Firebase Admin SDK is not initialized. Please verify environment credentials.",
      },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("POST /api/portfolio error:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

// PUT: Seed defaults into Firebase Realtime Database
export async function PUT() {
  try {
    if (!adminDb) {
      return NextResponse.json(
        { error: "Firebase Admin SDK is not initialized." },
        { status: 500 }
      );
    }

    const timestamp = new Date().toISOString();
    await adminDb.ref("portfolio").set({
      ...defaultPortfolioData,
      lastUpdated: timestamp,
    });

    return NextResponse.json({
      success: true,
      message: "Seeded defaults into Firebase Realtime Database successfully",
      timestamp,
    });
  } catch (error: any) {
    console.error("PUT /api/portfolio error:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
