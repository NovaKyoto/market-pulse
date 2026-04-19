import { NextResponse } from "next/server";
import { getBlogPostBySlug } from "@/lib/blog-posts";

// Simple XML escape for SVG text
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Word-wrap a string into multiple lines for SVG rendering
function wrapText(text: string, maxCharsPerLine: number, maxLines: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if ((current + " " + word).trim().length > maxCharsPerLine) {
      lines.push(current.trim());
      current = word;
      if (lines.length === maxLines - 1) {
        // Last line — put rest on it with ellipsis if needed
        const rest = [word, ...words.slice(words.indexOf(word) + 1)].join(" ");
        lines.push(rest.length > maxCharsPerLine ? rest.slice(0, maxCharsPerLine - 1) + "…" : rest);
        return lines;
      }
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const post = getBlogPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const width = 1200;
  const height = 630;

  const titleLines = wrapText(post.title, 36, 3);
  const titleStartY = 220;
  const lineHeight = 78;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a" />
      <stop offset="100%" stop-color="#4338ca" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#8b5cf6" />
    </linearGradient>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)" />

  <!-- Decorative circles -->
  <circle cx="1050" cy="100" r="180" fill="rgba(255,255,255,0.08)" />
  <circle cx="1180" cy="550" r="120" fill="rgba(255,255,255,0.05)" />

  <!-- Brand -->
  <g transform="translate(80, 80)">
    <rect x="0" y="0" width="44" height="44" rx="10" fill="url(#accent)" />
    <path d="M 14 12 L 24 12 L 18 22 L 30 22 L 14 36 L 20 26 L 10 26 Z" fill="white"/>
    <text x="60" y="30" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="white">MarketPulse</text>
  </g>

  <!-- Category badge -->
  <g transform="translate(80, 160)">
    <rect x="0" y="0" width="${post.category.length * 11 + 32}" height="32" rx="16" fill="rgba(255,255,255,0.15)" />
    <text x="16" y="21" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="white">${escapeXml(post.category.toUpperCase())}</text>
  </g>

  <!-- Title -->
  ${titleLines
    .map(
      (line, i) =>
        `<text x="80" y="${titleStartY + i * lineHeight}" font-family="Arial, sans-serif" font-size="56" font-weight="800" fill="white">${escapeXml(line)}</text>`
    )
    .join("\n  ")}

  <!-- Bottom info -->
  <g transform="translate(80, 540)">
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="18" font-weight="500" fill="rgba(255,255,255,0.7)">${post.readTime} MIN READ &#8226; MARKETPULSE.NOW</text>
  </g>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
