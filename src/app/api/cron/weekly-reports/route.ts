import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { fetchMarketData } from "@/lib/market-data";
import { generateReportInsights } from "@/lib/ai-writer";
import { sendReportEmail } from "@/lib/email";

// Service role client — this runs from a cron job, no user session
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
  );
}

export async function GET(request: Request) {
  // Verify cron secret
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getAdminClient();

  // Get all active users with completed onboarding
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("onboarding_complete", true)
    .in("subscription_status", ["active", "trialing"]);

  if (!profiles || profiles.length === 0) {
    return NextResponse.json({ message: "No active users" });
  }

  let totalReports = 0;
  let totalEmails = 0;

  for (const profile of profiles) {
    if (!profile.zip_codes?.length) continue;

    // Get active recipients for this user
    const { data: recipients } = await supabase
      .from("recipients")
      .select("*")
      .eq("user_id", profile.id)
      .eq("active", true);

    if (!recipients || recipients.length === 0) continue;

    for (const zipCode of profile.zip_codes) {
      const marketData = await fetchMarketData(zipCode);

      const { title, summary, insights } = await generateReportInsights(
        marketData,
        profile.full_name ?? "Your Agent",
        profile.business_name ?? "MarketPulse"
      );

      // Save report
      await supabase.from("reports").insert({
        user_id: profile.id,
        zip_code: zipCode,
        title,
        summary,
        market_data: marketData,
        ai_insights: insights,
        status: "sent",
        sent_at: new Date().toISOString(),
      });

      // Send to all recipients
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

      totalReports++;
      totalEmails += recipients.length;
    }
  }

  return NextResponse.json({
    success: true,
    reports: totalReports,
    emails: totalEmails,
  });
}
