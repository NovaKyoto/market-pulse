import Anthropic from "@anthropic-ai/sdk";
import type { MarketData } from "@/types";
import { formatCurrency, formatPercent } from "./market-data";

function getClient() {
  return new Anthropic();
}

export async function generateReportInsights(
  marketData: MarketData,
  agentName: string,
  businessName: string,
  aiTone: string = "professional"
): Promise<{ title: string; summary: string; insights: string }> {
  // Determine market conditions
  const marketType =
    marketData.inventory_months < 3
      ? "a strong seller's market"
      : marketData.inventory_months < 5
      ? "a balanced market"
      : "a buyer's market";

  const priceDirection =
    marketData.price_change_pct > 2
      ? "rising"
      : marketData.price_change_pct < -2
      ? "declining"
      : "stable";

  const speedDescription =
    marketData.avg_days_on_market < 20
      ? "Homes are selling very quickly"
      : marketData.avg_days_on_market < 35
      ? "Homes are selling at a moderate pace"
      : "Homes are taking longer to sell";

  const dataContext = `
MARKET DATA for ZIP code ${marketData.zip_code}${marketData.city ? ` (${marketData.city}, ${marketData.state})` : ""}:
- Median Home Sale Price: ${formatCurrency(marketData.median_price)}
- Year-over-Year Price Change: ${formatPercent(marketData.price_change_pct)}
- Average Days on Market: ${marketData.avg_days_on_market} days
- Active Listings: ${marketData.active_listings}
- Homes Sold in Last 30 Days: ${marketData.sold_last_30}
- Median Price per Square Foot: ${formatCurrency(marketData.price_per_sqft)}
- Months of Inventory Supply: ${marketData.inventory_months}
${marketData.median_rent ? `- Median Monthly Rent: ${formatCurrency(marketData.median_rent)}` : ""}

MARKET CONDITIONS ANALYSIS:
- This is ${marketType} (based on ${marketData.inventory_months} months of supply)
- Prices are ${priceDirection} (${formatPercent(marketData.price_change_pct)} YoY)
- ${speedDescription} (${marketData.avg_days_on_market} days average)
- There are ${marketData.active_listings} homes currently for sale
- ${marketData.sold_last_30} homes sold in the past month
`;

  const anthropic = getClient();
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `You are a top-tier real estate market analyst writing a weekly market update for a realtor named ${agentName} at ${businessName}. This report will be emailed to the agent's clients (homeowners, buyers, and prospects).

${dataContext}

Write a professional, warm, and insightful weekly market report. The audience is homeowners and buyers who are NOT real estate professionals — explain things simply.

Requirements:
1. **Title**: Create a specific, compelling headline that references the actual data. Example: "Houston 77007: Prices Up 4.2% as Spring Demand Surges" — NOT generic titles like "Weekly Market Report."

2. **Summary**: Exactly 2 sentences. First sentence: the headline finding. Second sentence: what it means for homeowners/buyers.

3. **Insights**: Write 4-5 SHORT paragraphs (3-4 sentences each) covering:
   - What kind of market this is right now and what that means in plain English
   - The price trend and what it means for current homeowners' equity
   - How fast homes are selling and what that tells us about demand
   - Specific, actionable advice: one thing buyers should do and one thing sellers should do right now
   - A brief forward-looking statement about the next 30-60 days

Style rules:
${aiTone === "conversational" ? `- Casual, friendly, and approachable — like texting a friend who happens to be a real estate expert
- Use contractions, short sentences, and relatable analogies
- It's okay to be a little playful or use humor` : aiTone === "luxury" ? `- Sophisticated, polished, and elegant — like a private wealth advisor
- Use refined language, emphasize exclusivity and investment value
- Speak to discerning buyers and high-net-worth homeowners` : `- Warm and authoritative, like a trusted advisor
- Confident and data-driven, balancing expertise with accessibility
- Sound knowledgeable but not stuffy`}
- NO jargon (no "basis points", "absorption rate", etc.)
- NO bullet points — flowing paragraphs only
- Reference specific numbers from the data naturally
- Don't start paragraphs with "The market" — vary your openings

Respond in EXACTLY this JSON format (no markdown code fences):
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
      title: `${marketData.city || "ZIP " + marketData.zip_code} Market Update: ${formatPercent(marketData.price_change_pct)} Price Change`,
      summary: text.slice(0, 300),
      insights: text,
    };
  }
}
