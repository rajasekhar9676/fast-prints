import { NextResponse } from "next/server";
import fs from "fs/promises";
import fsSync from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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
  ".gif",
  ".eps",
  ".tiff",
  ".tif",
  ".zip",
  ".rar",
  ".7z",
  ".jfif",
  ".heic",
  ".heif",
  ".avif",
  ".bmp",
]);

// 50 MB limit for high-resolution print files
const MAX_FILE_SIZE = 50 * 1024 * 1024;

function getUploadDirectories(): string[] {
  const dirs: string[] = [];
  const cwd = process.cwd();

  // 1. Direct path inside current working directory
  dirs.push(path.join(cwd, "public", "uploads", "designs"));

  // 2. If running from repo root
  if (!cwd.endsWith("fast-prints")) {
    dirs.push(path.join(cwd, "fast-prints", "public", "uploads", "designs"));
  }

  // 3. Absolute path to workspace directory
  dirs.push("C:\\Users\\mraja\\Desktop\\Gitfastprints\\fast-prints\\public\\uploads\\designs");

  return Array.from(new Set(dirs));
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No design file provided." }, { status: 400 });
    }

    const fileName =
      file && typeof file === "object" && "name" in file && typeof (file as any).name === "string"
        ? (file as any).name
        : "design-artwork.png";

    const fileSize =
      file && typeof file === "object" && "size" in file && typeof (file as any).size === "number"
        ? (file as any).size
        : 0;

    const fileType =
      file && typeof file === "object" && "type" in file && typeof (file as any).type === "string"
        ? (file as any).type.toLowerCase()
        : "";

    let ext = path.extname(fileName).toLowerCase();
    if (!ext || ext === ".") {
      if (fileType.includes("jpeg") || fileType.includes("jpg")) ext = ".jpg";
      else if (fileType.includes("png")) ext = ".png";
      else if (fileType.includes("webp")) ext = ".webp";
      else if (fileType.includes("pdf")) ext = ".pdf";
      else if (fileType.includes("svg")) ext = ".svg";
      else if (fileType.includes("gif")) ext = ".gif";
      else ext = ".png";
    }

    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        {
          error: `Unsupported file type (${ext}). Allowed formats: PDF, AI, CDR, PSD, PNG, JPG, EPS, TIFF, ZIP, HEIC.`,
        },
        { status: 400 }
      );
    }

    if (fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds 50MB limit. For larger files, please share via Google Drive or WhatsApp." },
        { status: 400 }
      );
    }

    // Extract buffer safely across Web API and Node.js environments
    let buffer: Buffer;
    if (typeof (file as any).arrayBuffer === "function") {
      const arrayBuffer = await (file as any).arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else if (typeof (file as any).bytes === "function") {
      const bytes = await (file as any).bytes();
      buffer = Buffer.from(bytes);
    } else if (Buffer.isBuffer(file)) {
      buffer = file;
    } else if (typeof (file as any).text === "function") {
      buffer = Buffer.from(await (file as any).text());
    } else if (typeof file === "string") {
      buffer = Buffer.from(file);
    } else {
      throw new Error("Unable to parse uploaded file content.");
    }

    // Safe base filename
    const rawBase = path.basename(fileName, ext);
    const safeBase =
      rawBase
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 50) || "design";

    const rand = Math.floor(Math.random() * 9000 + 1000);
    const uniqueFileName = `${Date.now()}-${rand}-${safeBase}${ext}`;

    const uploadDirs = getUploadDirectories();
    let writeSuccessCount = 0;

    for (const dir of uploadDirs) {
      try {
        if (!fsSync.existsSync(dir)) {
          fsSync.mkdirSync(dir, { recursive: true });
        }
        await fs.writeFile(path.join(dir, uniqueFileName), buffer);
        writeSuccessCount++;
      } catch (writeErr) {
        console.warn(`Could not write to upload dir ${dir}:`, writeErr);
      }
    }

    if (writeSuccessCount === 0) {
      throw new Error("Could not save design file to upload directory.");
    }

    const fileUrl = `/uploads/designs/${uniqueFileName}`;

    return NextResponse.json({
      ok: true,
      url: fileUrl,
      fileName,
      storedName: uniqueFileName,
      size: buffer.length,
    });
  } catch (error: any) {
    console.error("Artwork upload error:", error);
    return NextResponse.json(
      {
        error: `Failed to upload design artwork: ${error?.message || "Internal server error"}. Please try again or share on WhatsApp.`,
        details: String(error?.stack || error),
      },
      { status: 500 }
    );
  }
}
