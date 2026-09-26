import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided in form data" }, { status: 400 });
    }

    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    // If Vercel Blob Token is set, upload to Vercel Blob CDN
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(filename, file, {
        access: "public",
      });
      return NextResponse.json({
        url: blob.url,
        pathname: blob.pathname,
        provider: "vercel-blob",
      });
    }

    // Local dev fallback: Convert to Data URL so uploads work immediately without requiring Blob token yet
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString("base64");
    const mimeType = file.type || "application/octet-stream";
    const dataUrl = `data:${mimeType};base64,${base64Data}`;

    return NextResponse.json({
      url: dataUrl,
      pathname: filename,
      provider: "local-dev-fallback",
      message: "Uploaded as local fallback. Add BLOB_READ_WRITE_TOKEN on Vercel to store on Vercel Blob CDN.",
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process upload" },
      { status: 500 }
    );
  }
}
