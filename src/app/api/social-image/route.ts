import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reportId = searchParams.get("id");
  const platform = searchParams.get("platform") ?? "instagram";

  if (!reportId) {
    return NextResponse.json({ error: "Report ID required" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [{ data: report }, { data: profile }] = await Promise.all([
    supabase.from("reports").select("*").eq("id", reportId).eq("user_id", user.id).single(),
    supabase.from("profiles").select("full_name, business_name, brand_color").eq("id", user.id).single(),
  ]);

  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  const md = report.market_data as Record<string, number | string | null> | null;
  const brandColor = profile?.brand_color ?? "#4f46e5";
  const businessName = profile?.business_name ?? "MarketPulse";
  const city = md?.city ?? "";
  const state = md?.state ?? "";

  // Platform sizes
  const sizes: Record<string, { w: number; h: number }> = {
    instagram: { w: 1080, h: 1080 },
    facebook: { w: 1200, h: 630 },
    linkedin: { w: 1200, h: 627 },
    twitter: { w: 1200, h: 675 },
  };

  const { w, h } = sizes[platform] ?? sizes.instagram;

  const medianPrice = md?.median_price ? `$${Number(md.median_price).toLocaleString()}` : "N/A";
  const priceChange = md?.price_change_pct ? `${Number(md.price_change_pct) > 0 ? "+" : ""}${Number(md.price_change_pct).toFixed(1)}%` : "N/A";
  const dom = md?.avg_days_on_market ?? "N/A";
  const listings = md?.active_listings ?? "N/A";
  const isSquare = platform === "instagram";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${brandColor}"/>
      <stop offset="100%" style="stop-color:${brandColor}dd"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${w}" height="${h}" fill="url(#bg)"/>

  <!-- Decorative circles -->
  <circle cx="${w * 0.85}" cy="${h * 0.15}" r="${h * 0.2}" fill="white" opacity="0.05"/>
  <circle cx="${w * 0.1}" cy="${h * 0.9}" r="${h * 0.15}" fill="white" opacity="0.03"/>

  <!-- Business name -->
  <text x="${w * 0.5}" y="${isSquare ? 100 : 70}" text-anchor="middle" fill="white" opacity="0.8" font-family="system-ui, -apple-system, sans-serif" font-size="${isSquare ? 28 : 22}" font-weight="500">${escapeXml(businessName)}</text>

  <!-- Location -->
  <text x="${w * 0.5}" y="${isSquare ? 200 : 130}" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="${isSquare ? 56 : 42}" font-weight="800">${escapeXml(String(city))}${state ? `, ${escapeXml(String(state))}` : ""}</text>
  <text x="${w * 0.5}" y="${isSquare ? 260 : 175}" text-anchor="middle" fill="white" opacity="0.7" font-family="system-ui, -apple-system, sans-serif" font-size="${isSquare ? 28 : 22}">ZIP ${report.zip_code} Market Update</text>

  <!-- Stats grid -->
  ${generateStatBox(w * 0.1, isSquare ? 340 : 220, w * 0.38, isSquare ? 180 : 140, medianPrice, "Median Price", isSquare)}
  ${generateStatBox(w * 0.52, isSquare ? 340 : 220, w * 0.38, isSquare ? 180 : 140, priceChange, "YoY Change", isSquare)}
  ${generateStatBox(w * 0.1, isSquare ? 540 : 380, w * 0.38, isSquare ? 180 : 140, String(dom), "Days on Market", isSquare)}
  ${generateStatBox(w * 0.52, isSquare ? 540 : 380, w * 0.38, isSquare ? 180 : 140, String(listings), "Active Listings", isSquare)}

  ${isSquare ? `
  <!-- Summary text area -->
  <rect x="${w * 0.1}" y="780" width="${w * 0.8}" height="2" fill="white" opacity="0.2"/>
  <text x="${w * 0.5}" y="840" text-anchor="middle" fill="white" opacity="0.9" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="500">Real data. AI-powered insights.</text>
  <text x="${w * 0.5}" y="880" text-anchor="middle" fill="white" opacity="0.6" font-family="system-ui, -apple-system, sans-serif" font-size="20">Full report link in bio</text>
  ` : ""}

  <!-- Footer -->
  <text x="${w * 0.5}" y="${h - (isSquare ? 50 : 30)}" text-anchor="middle" fill="white" opacity="0.5" font-family="system-ui, -apple-system, sans-serif" font-size="${isSquare ? 18 : 16}">Powered by MarketPulse</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function generateStatBox(x: number, y: number, w: number, h: number, value: string, label: string, isSquare: boolean): string {
  const valueFontSize = isSquare ? 44 : 36;
  const labelFontSize = isSquare ? 18 : 15;
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="white" opacity="0.12"/>
  <text x="${x + w / 2}" y="${y + h * 0.55}" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="${valueFontSize}" font-weight="800">${escapeXml(value)}</text>
  <text x="${x + w / 2}" y="${y + h * 0.82}" text-anchor="middle" fill="white" opacity="0.7" font-family="system-ui, -apple-system, sans-serif" font-size="${labelFontSize}" font-weight="500">${escapeXml(label)}</text>`;
}

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
