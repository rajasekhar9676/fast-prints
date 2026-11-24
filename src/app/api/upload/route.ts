import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const ALLOWED_EXTENSIONS = new Set([
  ".pdf",
  ".ai",
  ".cdr",
  ".psd",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
  ".eps",
  ".tiff",
  ".tif",
  ".zip",
]);

// 50 MB limit for high-resolution print files
const MAX_FILE_SIZE = 50 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No design file provided." }, { status: 400 });
    }

    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        {
          error: `Unsupported file type (${ext || "unknown"}). Allowed formats: PDF, AI, CDR, PSD, PNG, JPG, EPS, TIFF, ZIP.`,
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds 50MB limit. For larger files, please share via Google Drive or WhatsApp." },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "designs");
    await fs.mkdir(uploadDir, { recursive: true });

    // Safe base filename
    const rawBase = path.basename(file.name, ext);
    const safeBase = rawBase
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 50);

    const rand = Math.floor(Math.random() * 9000 + 1000);
    const uniqueFileName = `${Date.now()}-${rand}-${safeBase}${ext}`;
    const destinationPath = path.join(uploadDir, uniqueFileName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(destinationPath, buffer);

    const fileUrl = `/uploads/designs/${uniqueFileName}`;

    return NextResponse.json({
      ok: true,
      url: fileUrl,
      fileName: file.name,
      storedName: uniqueFileName,
      size: file.size,
    });
  } catch (error) {
    console.error("Artwork upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload design artwork. Please try again or share on WhatsApp." },
      { status: 500 }
    );
  }
}
