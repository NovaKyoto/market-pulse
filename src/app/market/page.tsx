import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Zap } from "lucide-react";
import { CITIES } from "@/lib/cities";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://marketpulse.now";

export const metadata: Metadata = {
  title: "Live Housing Market Reports for 50+ US Cities",
  description:
    "Real-time housing market data for major US cities. Median prices, days on market, inventory, and trends — updated weekly. Free branded reports for real estate agents.",
  alternates: {
    canonical: `${APP_URL}/market`,
  },
  openGraph: {
    title: "US Housing Market Reports — MarketPulse",
    description: "Real-time market data for 50+ US cities. Free branded reports for agents.",
    url: `${APP_URL}/market`,
    type: "website",
  },
};

// Group cities by state for better browsing
function groupByState() {
  const grouped: Record<string, typeof CITIES> = {};
  for (const city of CITIES) {
    if (!grouped[city.state]) grouped[city.state] = [];
    grouped[city.state].push(city);
  }
  return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
}

export default function MarketIndexPage() {
  const byState = groupByState();

  return (
    <div className="flex flex-col min-h-screen bg-background">
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
            <Link href="/sign-up">
              <Button size="sm" className="gap-1">Start Free Trial<ArrowRight className="h-3 w-3" /></Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4 px-3 py-1">
              <MapPin className="mr-1 h-3 w-3" />
              {CITIES.length} markets tracked
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Live US Housing Market Reports
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Real-time market data and AI-powered insights for major US cities. Updated weekly
              with median prices, inventory, days on market, and trend analysis.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2 px-6 h-11">
                  Get branded reports for your market
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground">Free 14-day trial · No card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* City Index */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Browse markets by state</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {byState.map(([state, cities]) => (
              <Card key={state}>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                    {state}
                  </h3>
                  <div className="space-y-1.5">
                    {cities.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/market/${c.slug}`}
                        className="block text-sm hover:text-primary transition-colors py-0.5"
                      >
                        {c.name} →
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Don&apos;t see your market?
          </h2>
          <p className="mt-3 text-muted-foreground">
            MarketPulse generates reports for any US ZIP code. Sign up and pick your own market.
          </p>
          <div className="mt-8">
            <Link href="/sign-up">
              <Button size="lg" className="gap-2 h-12 px-8 text-base">
                Start 14-Day Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
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
              <Link href="/legal/terms" className="hover:text-foreground">Terms</Link>
              <Link href="/legal/privacy" className="hover:text-foreground">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
