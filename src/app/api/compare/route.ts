import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fetchMarketData, formatCurrency, formatPercent } from "@/lib/market-data";
import Anthropic from "@anthropic-ai/sdk";

function getAI() {
  return new Anthropic();
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { zip1, zip2 } = await request.json();

  if (!zip1 || !zip2) {
    return NextResponse.json({ error: "Two zip codes required" }, { status: 400 });
  }

  const [data1, data2] = await Promise.all([
    fetchMarketData(zip1),
    fetchMarketData(zip2),
  ]);

  const ai = getAI();
  const message = await ai.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: `Compare these two real estate markets in plain English. Write 3-4 short paragraphs.

MARKET A — ${zip1} (${data1.city}, ${data1.state}):
Median Price: ${formatCurrency(data1.median_price)} | Change: ${formatPercent(data1.price_change_pct)}
Days on Market: ${data1.avg_days_on_market} | Active Listings: ${data1.active_listings}
Price/SqFt: ${formatCurrency(data1.price_per_sqft)} | Inventory: ${data1.inventory_months} months

MARKET B — ${zip2} (${data2.city}, ${data2.state}):
Median Price: ${formatCurrency(data2.median_price)} | Change: ${formatPercent(data2.price_change_pct)}
Days on Market: ${data2.avg_days_on_market} | Active Listings: ${data2.active_listings}
Price/SqFt: ${formatCurrency(data2.price_per_sqft)} | Inventory: ${data2.inventory_months} months

Write a clear, helpful comparison a home buyer can understand. Which is hotter? Which is more affordable? Which is moving faster? End with a one-sentence recommendation for buyers and one for sellers.

Return ONLY the comparison text.`,
      },
    ],
  });

  const analysis =
    message.content[0].type === "text" ? message.content[0].text : "";

  return NextResponse.json({
    zip1: data1,
    zip2: data2,
    analysis,
  });
}
