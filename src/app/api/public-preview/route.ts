import { NextResponse } from "next/server";
import { fetchMarketData } from "@/lib/market-data";

/**
 * Public, unauthenticated endpoint that returns market data for a ZIP.
 * Used by the landing page preview widget to show zero-signup previews.
 * Cached for 24 hours.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const zipCode = searchParams.get("zip");

    if (!zipCode || !/^\d{5}$/.test(zipCode)) {
      return NextResponse.json(
        { error: "Invalid ZIP code. Enter 5 digits." },
        { status: 400 }
      );
    }

    const data = await fetchMarketData(zipCode);
    return NextResponse.json(
      { data },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Preview failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
