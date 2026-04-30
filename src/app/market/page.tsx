import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Zap, Database, Sparkles, Search } from "lucide-react";
import { CITIES } from "@/lib/cities";

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://marketpulse.now").trim();

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

function groupByState() {
  const grouped: Record<string, typeof CITIES> = {};
  for (const city of CITIES) {
    if (!grouped[city.state]) grouped[city.state] = [];
    grouped[city.state].push(city);
  }
  return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
}

// Featured cities to highlight at top
const FEATURED_SLUGS = [
  "houston-tx",
  "miami-fl",
  "austin-tx",
  "los-angeles-ca",
  "new-york-ny",
  "phoenix-az",
  "atlanta-ga",
  "dallas-tx",
];

export default function MarketIndexPage() {
  const byState = groupByState();
  const featured = FEATURED_SLUGS.map((s) => CITIES.find((c) => c.slug === s)).filter(
    (c): c is (typeof CITIES)[number] => Boolean(c)
  );

  return (
    <div className="flex flex-col min-h-screen marketing-bg">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-500/20">
              <Zap className="h-4 w-4 text-white" />
            </div>
            MarketPulse
          </Link>
          <div className="hidden sm:flex items-center gap-1 text-sm">
            <Link href="/market" className="px-3 py-2 text-foreground font-medium">Markets</Link>
            <Link href="/blog" className="px-3 py-2 text-muted-foreground hover:text-foreground">Blog</Link>
            <Link href="/founding" className="px-3 py-2 text-amber-600 hover:text-amber-700 font-medium">Founding 5 →</Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="gap-1 shadow-sm">
                Start Free Trial
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative border-b">
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 px-3 py-1.5 gap-1.5 bg-background/80 backdrop-blur border shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              {CITIES.length} markets · Updated daily
            </Badge>
            <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl leading-[1.05]">
              Live US Housing
              <span className="block mt-2 pb-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
                Market Reports
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Real-time market data and AI-powered insights for major US cities. Updated daily
              with median prices, inventory, days on market, and trend analysis.
            </p>

            {/* Trust signals */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Database className="h-3 w-3" />
                Redfin-powered MLS data
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                AI insights
              </span>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2 px-8 h-12 text-base shadow-lg">
                  Get branded reports for your market
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/founding">
                <Button size="lg" variant="outline" className="gap-2 h-12 text-base">
                  Founding 5 Offer
                </Button>
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              14-day free trial · No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                Most popular
              </p>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Featured markets
              </h2>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((c) => (
              <Link
                key={c.slug}
                href={`/market/${c.slug}`}
                className="group relative overflow-hidden rounded-xl border bg-background p-5 hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <Badge variant="secondary" className="mb-3 text-xs">
                    <MapPin className="mr-1 h-2.5 w-2.5" />
                    {c.stateCode}
                  </Badge>
                  <p className="font-bold text-lg group-hover:text-primary transition-colors">
                    {c.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{c.state}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary">
                    View market
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* By State */}
      <section className="border-t marketing-muted py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                Browse all
              </p>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Markets by state
              </h2>
              <p className="mt-2 text-muted-foreground">
                {CITIES.length} cities across {byState.length} states
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {byState.map(([state, cities]) => (
              <Card key={state} className="hover:border-primary/30 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-sm uppercase tracking-wide">
                      {state}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {cities.length}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {cities.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/market/${c.slug}`}
                        className="group flex items-center justify-between text-sm py-1.5 px-2 -mx-2 rounded-md hover:bg-primary/5 transition-colors"
                      >
                        <span className="text-foreground/80 group-hover:text-primary transition-colors">
                          {c.name}
                        </span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
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
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 h-80 w-80 rounded-full bg-white/10 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-white/5 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center text-white">
          <Search className="mx-auto h-10 w-10 mb-4 opacity-80" />
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Don&apos;t see your market?
          </h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto text-lg">
            MarketPulse generates branded reports for any US ZIP code. Sign up and pick your own market.
          </p>
          <div className="mt-10">
            <Link href="/sign-up">
              <Button size="lg" variant="secondary" className="gap-2 h-12 px-8 text-base shadow-xl">
                Start 14-Day Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="mt-3 text-xs text-white/60">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-md py-12 mt-auto">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                MarketPulse
              </Link>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Automated AI market reports for real estate agents.
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3">Product</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/sign-up" className="hover:text-foreground">Start Free Trial</Link></li>
                <li><Link href="/founding" className="hover:text-foreground">Founding 5</Link></li>
                <li><Link href="/sign-in" className="hover:text-foreground">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3">Resources</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/market" className="hover:text-foreground">Market Reports</Link></li>
                <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3">Legal</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/legal/terms" className="hover:text-foreground">Terms</Link></li>
                <li><Link href="/legal/privacy" className="hover:text-foreground">Privacy</Link></li>
                <li><Link href="/legal/cookies" className="hover:text-foreground">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} MarketPulse. All rights reserved.</p>
            <p>Market data deemed reliable but not guaranteed.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
