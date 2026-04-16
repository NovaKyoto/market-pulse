import type { MarketData } from "@/types";

const RENTCAST_BASE = "https://api.rentcast.io/v1";

interface RentCastSummary {
  medianPrice?: number;
  priceChange?: number;
  averageDaysOnMarket?: number;
  totalListings?: number;
  soldCount?: number;
  medianPricePerSqFt?: number;
  medianRent?: number;
}

export async function fetchMarketData(zipCode: string): Promise<MarketData> {
  const apiKey = process.env.RENTCAST_API_KEY;

  if (!apiKey) {
    // Return demo data when no API key is configured
    return generateDemoData(zipCode);
  }

  try {
    const [saleRes, rentRes] = await Promise.all([
      fetch(
        `${RENTCAST_BASE}/markets?zipCode=${zipCode}&dataType=sale&historyRange=6`,
        { headers: { "X-Api-Key": apiKey }, next: { revalidate: 86400 } }
      ),
      fetch(
        `${RENTCAST_BASE}/markets?zipCode=${zipCode}&dataType=rental&historyRange=6`,
        { headers: { "X-Api-Key": apiKey }, next: { revalidate: 86400 } }
      ),
    ]);

    if (!saleRes.ok || !rentRes.ok) {
      console.error("RentCast API error, falling back to demo data");
      return generateDemoData(zipCode);
    }

    const saleData: RentCastSummary = await saleRes.json();
    const rentData: RentCastSummary = await rentRes.json();

    return {
      median_price: saleData.medianPrice ?? 350000,
      price_change_pct: saleData.priceChange ?? 2.5,
      avg_days_on_market: saleData.averageDaysOnMarket ?? 28,
      active_listings: saleData.totalListings ?? 145,
      sold_last_30: saleData.soldCount ?? 52,
      price_per_sqft: saleData.medianPricePerSqFt ?? 185,
      inventory_months: saleData.totalListings
        ? Math.round((saleData.totalListings / (saleData.soldCount || 1)) * 10) / 10
        : 2.8,
      median_rent: rentData.medianRent ?? null,
      zip_code: zipCode,
      city: "",
      state: "",
      fetched_at: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to fetch market data:", error);
    return generateDemoData(zipCode);
  }
}

function generateDemoData(zipCode: string): MarketData {
  // Deterministic seed from zip code for consistent demo data
  const seed = parseInt(zipCode.replace(/\D/g, "")) || 77001;
  const base = (seed % 500) * 1000 + 200000;

  return {
    median_price: base,
    price_change_pct: Math.round(((seed % 10) - 3) * 10) / 10,
    avg_days_on_market: 15 + (seed % 30),
    active_listings: 80 + (seed % 200),
    sold_last_30: 30 + (seed % 50),
    price_per_sqft: 120 + (seed % 150),
    inventory_months: Math.round((2 + (seed % 4)) * 10) / 10,
    median_rent: 1200 + (seed % 800),
    zip_code: zipCode,
    city: "Demo City",
    state: "TX",
    fetched_at: new Date().toISOString(),
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}
