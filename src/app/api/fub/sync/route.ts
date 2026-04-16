import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getFubContacts } from "@/lib/follow-up-boss";

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
    .select("fub_api_key")
    .eq("id", user.id)
    .single();

  if (!profile?.fub_api_key) {
    return NextResponse.json({ error: "Follow Up Boss not connected" }, { status: 400 });
  }

  // Fetch contacts from FUB
  let imported = 0;
  let skipped = 0;
  let offset = 0;
  const batchSize = 100;

  // Get existing recipient emails for dedup
  const { data: existingRecipients } = await supabase
    .from("recipients")
    .select("email")
    .eq("user_id", user.id);

  const existingEmails = new Set(
    (existingRecipients ?? []).map((r: { email: string }) => r.email.toLowerCase())
  );

  // Paginate through FUB contacts (up to 500 max to avoid timeout)
  for (let page = 0; page < 5; page++) {
    const data = await getFubContacts(profile.fub_api_key, batchSize, offset);
    const people = data.people ?? [];

    if (people.length === 0) break;

    for (const person of people) {
      const email = person.emails?.[0]?.value?.toLowerCase();
      if (!email || existingEmails.has(email)) {
        skipped++;
        continue;
      }

      const name = [person.firstName, person.lastName].filter(Boolean).join(" ") || null;

      await supabase.from("recipients").insert({
        user_id: user.id,
        email,
        name,
      });

      existingEmails.add(email);
      imported++;
    }

    offset += batchSize;
    if (people.length < batchSize) break;
  }

  return NextResponse.json({ imported, skipped });
}
