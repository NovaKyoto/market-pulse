import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { verifyFubKey } from "@/lib/follow-up-boss";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { apiKey } = (await request.json()) as { apiKey?: string };

  if (!apiKey || apiKey.trim().length < 10) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 400 });
  }

  const valid = await verifyFubKey(apiKey.trim());
  if (!valid) {
    return NextResponse.json({ error: "Could not verify API key. Please check it and try again." }, { status: 400 });
  }

  await supabase
    .from("profiles")
    .update({ fub_api_key: apiKey.trim() })
    .eq("id", user.id);

  return NextResponse.json({ connected: true });
}

export async function DELETE() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await supabase
    .from("profiles")
    .update({ fub_api_key: null })
    .eq("id", user.id);

  return NextResponse.json({ disconnected: true });
}
