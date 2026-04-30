import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, Zap, Users, Gift, Sparkles, Clock, Star, Quote } from "lucide-react";

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://marketpulse.now").trim();

export const metadata: Metadata = {
  title: "Founding 5 Program — Free 90 Days + Lifetime 50% Off",
  description:
    "Be one of the first 5 MarketPulse customers. Get 90 days free, lifetime 50% off ($24.50/mo forever), and direct input on the product. Limited spots.",
  alternates: {
    canonical: `${APP_URL}/founding`,
  },
  openGraph: {
    title: "MarketPulse Founding 5 — Free 90 Days + 50% Off Forever",
    description: "Be one of the first 5 agents. Free for 90 days, then $24.50/mo for life.",
    url: `${APP_URL}/founding`,
    type: "website",
  },
  robots: {
    // Don't index this page — it's for direct outreach links only
    index: false,
    follow: false,
  },
};

export default function FoundingPage() {
  return (
    <div className="flex flex-col min-h-screen marketing-bg">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            MarketPulse
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/5" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="text-center">
            <Badge className="mb-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-600 border-0 text-white">
              <Sparkles className="mr-1 h-3 w-3" />
              Limited — 5 Spots Total
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Become a<span className="block mt-1 pb-2 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Founding Member</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              The first 5 agents get <strong className="text-foreground">90 days free</strong>, then{" "}
              <strong className="text-foreground">$24.50/mo for life</strong> (half price, forever).
              In exchange, I ask for a 15-minute survey, a testimonial, and a star rating once you&apos;ve used it.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2 px-8 h-12 text-base">
                  Claim Your Spot
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground">No credit card · No risk</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Deal */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            What you get
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Benefit 1 */}
            <Card className="relative overflow-hidden border-2 border-amber-500/20">
              <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-amber-500/20 to-transparent rounded-bl-full" />
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 mb-4">
                  <Gift className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">90 Days Free</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Full access for 3 months. Send as many branded reports as you want. See if your
                  past clients actually engage.
                </p>
              </CardContent>
            </Card>

            {/* Benefit 2 */}
            <Card className="relative overflow-hidden border-2 border-primary/30 shadow-lg scale-105">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                <Badge className="shadow-md">Best Value</Badge>
              </div>
              <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
              <CardContent className="p-6 pt-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">50% Off Forever</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  After trial, you pay <strong className="text-foreground">$24.50/mo for life</strong>
                  {" "}— not just the first year. Lock it in as your rate forever.
                </p>
              </CardContent>
            </Card>

            {/* Benefit 3 */}
            <Card className="relative overflow-hidden border-2 border-purple-500/20">
              <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full" />
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Direct Input</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your feedback shapes the product. I read every survey response personally and
                  build the features you actually ask for.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What You Commit */}
      <section className="border-t marketing-muted py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-6">
            What I ask in return
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            Honestly, not much. This is about getting product-market fit, not squeezing revenue.
          </p>
          <Card>
            <CardContent className="p-6 sm:p-8">
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">A 15-minute survey after using it</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Once you&apos;ve sent a few reports, fill out a short survey about your experience —
                      what worked, what didn&apos;t, what you wish it did. No call required. Done at your own pace.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">A star rating</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Rate MarketPulse out of 5 stars. Helps future agents decide if it&apos;s right for them.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Quote className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">A short testimonial (only if you love it)</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      One or two sentences about why MarketPulse worked for you. If it didn&apos;t, no
                      hard feelings — just include that in the survey so I can make it better.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What MarketPulse Does */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-4">
            Quick refresher: what MarketPulse does
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Sends branded AI-written market reports to your past clients on autopilot. You stay
            top-of-mind. They send you referrals.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 max-w-2xl mx-auto">
            {[
              "Live Redfin + MLS market data for any US ZIP code",
              "AI-written insights in your chosen tone (professional, conversational, luxury)",
              "Branded with your logo, name, and colors",
              "Automated weekly or monthly email delivery",
              "Engagement tracking — see which clients are opening",
              "Hot leads surfaced automatically (3+ opens = warm)",
              "Social media posts generated for Instagram, FB, LinkedIn, X",
              "Branded social images for any city",
              "PDF export and sharable report links",
              "Follow Up Boss CRM integration",
            ].map((f) => (
              <div key={f} className="flex items-start gap-2 text-sm">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency / CTA */}
      <section className="border-t py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <Card className="border-2 border-amber-500/30 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10 overflow-hidden">
            <CardContent className="p-8 sm:p-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                  Only 5 spots. Once they&apos;re gone, the price goes to $49/mo for everyone.
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Lock in your rate forever</h2>
              <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
                Start your 90-day free trial now. No credit card required. After you&apos;ve used
                MarketPulse, I&apos;ll send you a quick survey link.
              </p>
              <div className="mt-8">
                <Link href="/sign-up">
                  <Button size="lg" className="gap-2 px-10 h-12 text-base shadow-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 border-0">
                    Claim Your Spot
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Questions first? Email{" "}
                <a href="mailto:hello@marketpulse.now" className="underline hover:text-foreground">
                  hello@marketpulse.now
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 mt-auto">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <Zap className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              MarketPulse
            </Link>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/market" className="hover:text-foreground">Markets</Link>
              <Link href="/blog" className="hover:text-foreground">Blog</Link>
              <Link href="/legal/terms" className="hover:text-foreground">Terms</Link>
              <Link href="/legal/privacy" className="hover:text-foreground">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
