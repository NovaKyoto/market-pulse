import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
  );
}

function getAI() {
  return new Anthropic();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("secret") !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceClient();

  // Get all active users
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .in("subscription_status", ["active", "trialing"]);

  if (!profiles?.length) {
    return NextResponse.json({ message: "No active users" });
  }

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const results = [];

  for (const profile of profiles) {
    // Get all reports from last 30 days for this user
    const { data: recentReports } = await supabase
      .from("reports")
      .select("zip_code, title, market_data, created_at")
      .eq("user_id", profile.id)
      .gte("created_at", thirtyDaysAgo.toISOString())
      .order("created_at", { ascending: false });

    if (!recentReports?.length) continue;

    // Group by zip code, take latest report per zip
    const latestByZip = new Map<string, typeof recentReports[0]>();
    for (const r of recentReports) {
      if (!latestByZip.has(r.zip_code)) latestByZip.set(r.zip_code, r);
    }

    // Build summary data
    const marketSummaries = Array.from(latestByZip.values()).map((r) => {
      const md = r.market_data as Record<string, number | string | null> | null;
      return `${r.zip_code} (${md?.city ?? ""}, ${md?.state ?? ""}): Median $${md?.median_price ?? "N/A"}, ${md?.price_change_pct ?? 0}% YoY, ${md?.avg_days_on_market ?? "N/A"} DOM, ${md?.active_listings ?? "N/A"} listings`;
    });

    const ai = getAI();
    const message = await ai.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `Write a Monthly Market Summary for a real estate agent. This is a recap of the past 30 days across their tracked markets.

Agent: ${profile.full_name ?? "Agent"} at ${profile.business_name ?? "MarketPulse"}

Markets tracked this month:
${marketSummaries.join("\n")}

Write 3-4 short paragraphs covering:
1. Overall market theme this month (buyer's vs seller's, price trends)
2. Which markets are hottest and which are cooling
3. Year-over-year comparison and what it means
4. One-sentence outlook for next month

Style: ${profile.ai_tone === "conversational" ? "Casual and friendly" : profile.ai_tone === "luxury" ? "Sophisticated and polished" : "Warm and authoritative"}

Return a JSON object: {"title": "Monthly Summary: [Month Year]", "summary": "2-sentence overview", "insights": "full analysis"}`,
        },
      ],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    let parsed;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { title: `Monthly Summary: ${now.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`, summary: text.slice(0, 300), insights: text };
    } catch {
      parsed = { title: `Monthly Summary: ${now.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`, summary: text.slice(0, 300), insights: text };
    }

    // Save as a special "monthly" report
    await supabase.from("reports").insert({
      user_id: profile.id,
      zip_code: "MONTHLY",
      title: parsed.title,
      summary: parsed.summary,
      market_data: { type: "monthly_summary", markets: Array.from(latestByZip.keys()) },
      ai_insights: parsed.insights,
      status: "generated",
    });

    results.push({ userId: profile.id, markets: latestByZip.size });
  }

  return NextResponse.json({ success: true, summaries: results.length });
}
