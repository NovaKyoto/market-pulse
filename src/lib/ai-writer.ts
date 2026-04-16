import Anthropic from "@anthropic-ai/sdk";
import type { MarketData } from "@/types";
import { formatCurrency, formatPercent } from "./market-data";

function getClient() {
  return new Anthropic();
}

export async function generateReportInsights(
  marketData: MarketData,
  agentName: string,
  businessName: string
): Promise<{ title: string; summary: string; insights: string }> {
  const dataContext = `
Market Data for ${marketData.zip_code} (${marketData.city}, ${marketData.state}):
- Median Home Price: ${formatCurrency(marketData.median_price)}
- Price Change (YoY): ${formatPercent(marketData.price_change_pct)}
- Average Days on Market: ${marketData.avg_days_on_market}
- Active Listings: ${marketData.active_listings}
- Homes Sold (Last 30 Days): ${marketData.sold_last_30}
- Price per Sq Ft: ${formatCurrency(marketData.price_per_sqft)}
- Months of Inventory: ${marketData.inventory_months}
${marketData.median_rent ? `- Median Rent: ${formatCurrency(marketData.median_rent)}` : ""}
`;

  const anthropic = getClient();
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: `You are a real estate market analyst writing a weekly market report for a realtor named ${agentName} from ${businessName}.

${dataContext}

Write a professional, insightful market report with these sections. Use markdown formatting:

1. **Title**: A compelling, specific report title (e.g., "Houston Heights Market Heats Up: Median Prices Rise 4.2%")

2. **Summary**: A 2-sentence executive summary a homeowner can understand.

3. **Insights**: 4-5 paragraphs covering:
   - Current market conditions (buyer's vs seller's market based on inventory months)
   - Price trends and what they mean for homeowners
   - How quickly homes are selling and what that signals
   - Actionable advice for both buyers and sellers
   - A forward-looking statement about where the market is heading

Write in a warm, authoritative tone. Avoid jargon. Make homeowners feel informed, not overwhelmed.

Respond in this exact JSON format:
{"title": "...", "summary": "...", "insights": "..."}`,
      },
    ],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");
    return JSON.parse(jsonMatch[0]);
  } catch {
    return {
      title: `Weekly Market Report: ${marketData.zip_code}`,
      summary: text.slice(0, 200),
      insights: text,
    };
  }
}
