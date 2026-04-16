import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fetchMarketData } from "@/lib/market-data";
import { generateReportInsights } from "@/lib/ai-writer";
import { sendReportEmail } from "@/lib/email";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.zip_codes?.length) {
    return NextResponse.json(
      { error: "No zip codes configured" },
      { status: 400 }
    );
  }

  const results = [];

  for (const zipCode of profile.zip_codes) {
    // 1. Fetch market data
    const marketData = await fetchMarketData(zipCode);

    // 2. Generate AI insights
    const { title, summary, insights } = await generateReportInsights(
      marketData,
      profile.full_name ?? "Your Agent",
      profile.business_name ?? "MarketPulse"
    );

    // 3. Save report to database
    const { data: report } = await supabase
      .from("reports")
      .insert({
        user_id: user.id,
        zip_code: zipCode,
        title,
        summary,
        market_data: marketData,
        ai_insights: insights,
        status: "generated",
      })
      .select()
      .single();

    // 4. Send to all recipients
    const { data: recipients } = await supabase
      .from("recipients")
      .select("*")
      .eq("user_id", user.id)
      .eq("active", true);

    if (recipients && recipients.length > 0) {
      await Promise.all(
        recipients.map((r) =>
          sendReportEmail({
            to: r.email,
            recipientName: r.name,
            agentName: profile.full_name ?? "Your Agent",
            businessName: profile.business_name ?? "MarketPulse",
            brandColor: profile.brand_color ?? "#2563eb",
            reportTitle: title,
            reportSummary: summary,
            reportInsights: insights,
            zipCode,
          })
        )
      );

      // Mark as sent
      if (report) {
        await supabase
          .from("reports")
          .update({ status: "sent", sent_at: new Date().toISOString() })
          .eq("id", report.id);
      }
    }

    results.push({ zipCode, title, recipientCount: recipients?.length ?? 0 });
  }

  return NextResponse.json({ success: true, results });
}
