import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SERVICE_ROLE_KEY");
  }
  return createClient(url, key);
}

interface ResendWebhookPayload {
  type: string;
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject: string;
    headers?: { name: string; value: string }[];
    tags?: { name: string; value: string }[];
  };
}

export async function POST(request: Request) {
  try {
    const payload: ResendWebhookPayload = await request.json();
    const { type, data } = payload;

    // Map Resend event types to our types
    const eventMap: Record<string, string> = {
      "email.delivered": "delivered",
      "email.opened": "opened",
      "email.clicked": "clicked",
      "email.bounced": "bounced",
      "email.complained": "complained",
    };

    const eventType = eventMap[type];
    if (!eventType) {
      return NextResponse.json({ ok: true, skipped: type });
    }

    // Extract our custom headers/tags for user_id and report_id
    const tags = data.tags ?? [];
    const userId = tags.find((t) => t.name === "user_id")?.value;
    const reportId = tags.find((t) => t.name === "report_id")?.value;
    const recipientName = tags.find((t) => t.name === "recipient_name")?.value;

    if (!userId) {
      return NextResponse.json({ ok: true, skipped: "no_user_id" });
    }

    const supabase = getServiceClient();

    const { error } = await supabase.from("email_events").insert({
      user_id: userId,
      report_id: reportId || null,
      recipient_email: data.to?.[0] ?? "",
      recipient_name: recipientName ?? null,
      event_type: eventType,
      metadata: {
        email_id: data.email_id,
        subject: data.subject,
        timestamp: payload.created_at,
      },
    });

    if (error) {
      console.error("Email event insert error:", error.message);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, eventType });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook failed";
    console.error("Resend webhook error:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
