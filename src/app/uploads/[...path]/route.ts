import { NextResponse } from "next/server";
import fs from "fs/promises";
import fsSync from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
  ".ai": "application/illustrator",
  ".psd": "image/vnd.adobe.photoshop",
  ".eps": "application/postscript",
  ".tif": "image/tiff",
  ".tiff": "image/tiff",
  ".bmp": "image/bmp",
  ".zip": "application/zip",
};

export async function GET(
  _request: Request,
  props: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await props.params;
    if (!pathSegments || pathSegments.length === 0) {
      return new NextResponse("File not found", { status: 404 });
    }

    // Prevent directory traversal
    const safeSegments = pathSegments.map((s) => path.basename(s));
    const subPath = path.join(...safeSegments);

    const candidates = [
      path.join(process.cwd(), "public", "uploads", subPath),
      path.join(process.cwd(), "fast-prints", "public", "uploads", subPath),
      path.join("C:\\Users\\mraja\\Desktop\\Gitfastprints\\fast-prints\\public\\uploads", subPath),
      path.join("C:\\Users\\mraja\\Desktop\\Gitfastprints\\public\\uploads", subPath),
    ];

    let foundPath: string | null = null;
    for (const candidate of candidates) {
      if (fsSync.existsSync(candidate)) {
        foundPath = candidate;
        break;
      }
    }

    if (!foundPath) {
      return new NextResponse("File not found", { status: 404 });
    }

    const fileBuffer = await fs.readFile(foundPath);
    const ext = path.extname(foundPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Error serving uploaded file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
