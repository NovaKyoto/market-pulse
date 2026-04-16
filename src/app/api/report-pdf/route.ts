import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateReportHtml } from "@/lib/report-pdf";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reportId = searchParams.get("id");

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

  const { data: report } = await supabase
    .from("reports")
    .select("*")
    .eq("id", reportId)
    .eq("user_id", user.id)
    .single();

  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, business_name, brand_color")
    .eq("id", user.id)
    .single();

  const html = generateReportHtml({
    title: report.title,
    summary: report.summary ?? "",
    insights: report.ai_insights ?? "",
    marketData: report.market_data,
    agentName: profile?.full_name ?? "Agent",
    businessName: profile?.business_name ?? "MarketPulse",
    brandColor: profile?.brand_color ?? "#4f46e5",
  });

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
