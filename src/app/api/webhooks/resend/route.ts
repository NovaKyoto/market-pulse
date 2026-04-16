import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
  );
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
    return NextResponse.json({ ok: true });
  }

  // Extract our custom headers/tags for user_id and report_id
  const tags = data.tags ?? [];
  const userId = tags.find((t) => t.name === "user_id")?.value;
  const reportId = tags.find((t) => t.name === "report_id")?.value;
  const recipientName = tags.find((t) => t.name === "recipient_name")?.value;

  if (!userId) {
    return NextResponse.json({ ok: true });
  }

  const supabase = getServiceClient();

  await supabase.from("email_events").insert({
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

  return NextResponse.json({ ok: true });
}
