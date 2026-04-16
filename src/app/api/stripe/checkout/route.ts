import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createCustomer, createCheckoutSession } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: { plan?: string } = {};
    try {
      body = await request.json();
    } catch {
      // default to monthly
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await createCustomer(user.email ?? "");
      customerId = customer.id;
      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    // Use annual price if requested, fall back to monthly
    const priceId =
      body.plan === "annual"
        ? process.env.STRIPE_ANNUAL_PRICE_ID ?? process.env.STRIPE_PRICE_ID
        : process.env.STRIPE_PRICE_ID;

    if (!priceId) {
      return NextResponse.json({ error: "Price not configured" }, { status: 500 });
    }

    const session = await createCheckoutSession(
      customerId,
      priceId,
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=cancelled`
    );

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("Stripe checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
