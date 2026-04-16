import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
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

  const { reportId, platform } = await request.json();

  const { data: report } = await supabase
    .from("reports")
    .select("*")
    .eq("id", reportId)
    .eq("user_id", user.id)
    .single();

  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  const md = report.market_data;
  const reportUrl = `${process.env.NEXT_PUBLIC_APP_URL}/report/${report.id}`;

  const platformGuide =
    platform === "instagram"
      ? "Instagram post caption (max 2200 chars, use line breaks for readability, include 5-8 relevant hashtags at the end like #HoustonRealEstate #MarketUpdate)"
      : platform === "facebook"
      ? "Facebook post (conversational, 2-3 short paragraphs, include a question to drive engagement, no hashtags)"
      : platform === "linkedin"
      ? "LinkedIn post (professional but warm, start with a hook, include data points, end with a call to action)"
      : "Twitter/X post (max 280 chars, punchy, include one key stat)";

  const ai = getAI();
  const message = await ai.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 800,
    messages: [
      {
        role: "user",
        content: `You are a social media expert for real estate agents. Write a ${platformGuide} based on this market report.

Report title: ${report.title}
Summary: ${report.summary}
ZIP: ${report.zip_code} (${md?.city ?? ""}, ${md?.state ?? ""})
Median price: $${md?.median_price ?? "N/A"}
Price change: ${md?.price_change_pct ?? 0}% YoY
Days on market: ${md?.avg_days_on_market ?? "N/A"}
Active listings: ${md?.active_listings ?? "N/A"}

Report link: ${reportUrl}

Rules:
- Write as if YOU are the real estate agent sharing market knowledge
- Sound knowledgeable but approachable — NOT salesy
- Include 1-2 specific numbers from the data
- End with something that invites engagement (question, CTA)
- Include the report link naturally
- Do NOT use emojis excessively (max 2-3 total)

Return ONLY the post text, nothing else.`,
      },
    ],
  });

  const postText =
    message.content[0].type === "text" ? message.content[0].text : "";

  return NextResponse.json({ post: postText, platform, reportUrl });
}
