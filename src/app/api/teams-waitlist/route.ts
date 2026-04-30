import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SERVICE_ROLE_KEY");
  }
  return createClient(url, key);
}

interface WaitlistInput {
  brokerageName?: string;
  contactName?: string;
  contactEmail?: string;
  agentCount?: string;
  message?: string;
  utmSource?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body: WaitlistInput = await request.json();
    const brokerageName = body.brokerageName?.trim();
    const contactName = body.contactName?.trim();
    const contactEmail = body.contactEmail?.trim().toLowerCase();
    const agentCount = body.agentCount?.trim();
    const message = body.message?.trim() || null;
    const utmSource = body.utmSource?.trim() || null;

    if (!brokerageName || !contactName || !contactEmail || !agentCount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!isValidEmail(contactEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const supabase = getServiceClient();
    const { error } = await supabase.from("teams_waitlist").insert({
      brokerage_name: brokerageName,
      contact_name: contactName,
      contact_email: contactEmail,
      agent_count: agentCount,
      message,
      utm_source: utmSource,
    });

    if (error) {
      console.error("Teams waitlist insert error:", error.message);
      return NextResponse.json(
        { error: "Could not save your information. Please try again." },
        { status: 500 }
      );
    }

    // Notify founder via email (best-effort, don't fail if it errors)
    try {
      const resendKey = process.env.RESEND_API_KEY;
      const fromEmail =
        process.env.RESEND_FROM_EMAIL ?? "reports@mail.marketpulse.now";
      const notifyEmail = process.env.NOTIFY_EMAIL ?? "hooligansnext@yahoo.com";

      if (resendKey) {
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: `MarketPulse <${fromEmail}>`,
          to: notifyEmail,
          subject: `New Teams Waitlist: ${brokerageName} (${agentCount} agents)`,
          html: `<h2>New Teams Tier Waitlist Signup</h2>
            <p><strong>Brokerage:</strong> ${brokerageName}</p>
            <p><strong>Contact:</strong> ${contactName}</p>
            <p><strong>Email:</strong> <a href="mailto:${contactEmail}">${contactEmail}</a></p>
            <p><strong>Agent count:</strong> ${agentCount}</p>
            ${message ? `<p><strong>Message:</strong><br>${message}</p>` : ""}
            ${utmSource ? `<p><strong>Source:</strong> ${utmSource}</p>` : ""}`,
        });
      }
    } catch (emailErr) {
      console.error("Notification email failed:", emailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("Teams waitlist error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
