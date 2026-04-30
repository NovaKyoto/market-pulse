import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  MapPin,
  Zap,
  Database,
  Sparkles,
  Search,
  TrendingUp,
  TrendingDown,
  Clock,
  Flame,
  Snowflake,
  Scale,
  DollarSign,
} from "lucide-react";
import { CITIES, type City } from "@/lib/cities";
import { fetchMarketData, formatCurrency } from "@/lib/market-data";
import { CityArtwork } from "@/components/markets/city-artwork";
import { LUXURY_MARKETS } from "@/lib/luxury-markets";

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

// Revalidate the page (and its fetched data) every 24 hours
export const revalidate = 86400;

interface FeaturedCity {
  city: City;
  data: Awaited<ReturnType<typeof fetchMarketData>>;
}

export default async function MarketIndexPage() {
  const byState = groupByState();
  const featuredCities = FEATURED_SLUGS.map((s) => CITIES.find((c) => c.slug === s)).filter(
    (c): c is City => Boolean(c)
  );

  // Fetch live market data for all featured cities in parallel
  const featured: FeaturedCity[] = await Promise.all(
    featuredCities.map(async (city) => ({
      city,
      data: await fetchMarketData(city.zipCode),
    }))
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
            <Link href="/teams" className="px-3 py-2 text-muted-foreground hover:text-foreground">For Teams</Link>
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
              <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-2">
                Most Popular
              </p>
              <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
                FEATURED MARKETS
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Live data · Updated daily · Click any card to see the full report
              </p>
            </div>
            <Link
              href="#all-markets"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-primary font-bold hover:underline"
            >
              View All {CITIES.length}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map(({ city, data }) => {
              const priceUp = (data.price_change_pct ?? 0) >= 0;
              const isSellersMarket = (data.inventory_months ?? 6) < 4;
              const isBuyersMarket = (data.inventory_months ?? 6) > 6;
              const sentimentLabel = isSellersMarket
                ? "Seller's"
                : isBuyersMarket
                ? "Buyer's"
                : "Balanced";
              const SentimentIcon = isSellersMarket
                ? Flame
                : isBuyersMarket
                ? Snowflake
                : Scale;
              const sentimentGradient = isSellersMarket
                ? "from-rose-500/15 via-orange-500/10 to-transparent"
                : isBuyersMarket
                ? "from-emerald-500/15 via-teal-500/10 to-transparent"
                : "from-amber-500/15 via-orange-500/10 to-transparent";
              const sentimentBadge = isSellersMarket
                ? "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30"
                : isBuyersMarket
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                : "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30";

              return (
                <Link
                  key={city.slug}
                  href={`/market/${city.slug}`}
                  className="group relative overflow-hidden rounded-2xl border bg-background hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10"
                >
                  {/* City-specific SVG artwork (palms, skylines, cactus, etc.) */}
                  <CityArtwork slug={city.slug} />

                  {/* Sentiment gradient — soft tint on top of artwork */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${sentimentGradient} opacity-30 mix-blend-soft-light pointer-events-none`}
                  />

                  {/* Top scrim for text legibility — strong at top, fades to transparent quickly */}
                  <div className="absolute top-0 left-0 right-0 h-[42%] bg-gradient-to-b from-background via-background/92 via-50% to-transparent pointer-events-none" />

                  <div className="relative p-5">
                    {/* Top row: state + sentiment badge */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-foreground/10 backdrop-blur-sm text-xs font-bold text-foreground">
                        <MapPin className="h-3 w-3" />
                        {city.stateCode}
                      </div>
                      <Badge
                        className={`gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 font-bold border-2 shadow-sm ${sentimentBadge}`}
                      >
                        <SentimentIcon className="h-2.5 w-2.5" />
                        {sentimentLabel}
                      </Badge>
                    </div>

                    {/* City name — bold, prominent */}
                    <h3 className="font-extrabold text-2xl tracking-tighter group-hover:text-primary transition-colors leading-[1.05] drop-shadow-sm">
                      {city.name}
                    </h3>

                    {/* Median Price — THE HERO STAT (prominent gradient pill) */}
                    <div className="mt-3">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1.5">
                        Median Price
                      </p>
                      <div className="inline-flex items-baseline gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
                        <DollarSign className="h-4 w-4 text-white/90 self-center" />
                        <p className="text-2xl sm:text-3xl font-black font-mono tracking-tighter text-white leading-none">
                          {formatCurrency(data.median_price).replace("$", "")}
                        </p>
                      </div>
                      {/* YoY change as a solid colored pill */}
                      <div
                        className={`ml-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold border shadow-sm align-middle ${
                          priceUp
                            ? "bg-emerald-500 text-white border-emerald-600"
                            : "bg-rose-500 text-white border-rose-600"
                        }`}
                      >
                        {priceUp ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {data.price_change_pct > 0 ? "+" : ""}
                        {data.price_change_pct.toFixed(1)}%
                      </div>
                    </div>

                    {/* Spacer to let artwork breathe */}
                    <div className="h-20 sm:h-24" />

                    {/* Bottom stats bar — solid glass with colored value pills */}
                    <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-3 bg-background/95 backdrop-blur-md border-t border-foreground/10 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center justify-between gap-2">
                        {/* Days on Market */}
                        <div className="flex flex-col items-center flex-1">
                          <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-muted-foreground font-bold">
                            <Clock className="h-2.5 w-2.5" />
                            Days
                          </div>
                          <div className="font-mono font-black text-base text-foreground">
                            {data.avg_days_on_market}
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="h-8 w-px bg-foreground/15" />

                        {/* Active Listings */}
                        <div className="flex flex-col items-center flex-1">
                          <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold">
                            Listings
                          </div>
                          <div className="font-mono font-black text-base text-foreground">
                            {data.active_listings}
                          </div>
                        </div>

                        {/* CTA arrow */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 shadow-md">
                          <ArrowRight className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile-only "view all" link */}
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/market"
              className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
            >
              View all {CITIES.length} markets
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* LUXURY MARKETS — demo showcase for high-end agents */}
      <section className="relative overflow-hidden border-t py-20">
        {/* Dark luxury background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-950" />
        {/* Gold accent gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-amber-500/15 blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-yellow-500/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-400 font-bold mb-3 inline-flex items-center gap-2">
              <Sparkles className="h-3 w-3" />
              Demo Feature
            </p>
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent pb-2">
              LUXURY MARKETS
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              MarketPulse handles million-dollar ZIPs as easily as starter homes. Try any
              luxury market — your branded report renders the same beautiful way.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LUXURY_MARKETS.map((m) => (
              <div
                key={m.zipCode}
                className="group relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-sm p-6 hover:border-amber-400/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/20"
              >
                {/* Subtle gold shimmer on hover */}
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* ZIP code as overline */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-mono text-xs font-bold text-amber-400/80 tracking-widest">
                      {m.zipCode}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                      {m.region}
                    </div>
                  </div>

                  {/* City name — hero */}
                  <h3 className="text-2xl font-extrabold tracking-tight text-white leading-tight mb-1">
                    {m.city}
                  </h3>
                  <p className="text-xs text-slate-400 italic mb-4">{m.vibe}</p>

                  {/* Median price — gold pill */}
                  <div className="inline-flex items-baseline gap-1 px-3 py-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border border-amber-500/30">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-amber-400">
                      Median
                    </span>
                    <span className="text-2xl font-black font-mono tracking-tighter text-amber-200 ml-1">
                      {formatCurrency(m.estimatedMedian)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="gap-2 px-8 h-12 text-base bg-gradient-to-br from-amber-400 to-yellow-600 hover:from-amber-300 hover:to-yellow-500 text-slate-950 font-bold border-0 shadow-xl shadow-amber-500/30"
              >
                Start Your Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-3 text-xs text-slate-400">
              Generate a branded luxury market report in under 30 seconds
            </p>
          </div>
        </div>
      </section>

      {/* BROWSE BY STATE — compact directory */}
      <section id="all-markets" className="border-t marketing-muted py-16 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-2">
              Full Directory
            </p>
            <h2 className="text-3xl font-extrabold tracking-tighter sm:text-4xl">
              BROWSE BY STATE
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-mono font-bold text-foreground">{CITIES.length}</span> cities across{" "}
              <span className="font-mono font-bold text-foreground">{byState.length}</span> states
            </p>
          </div>

          {/* Compact two-column accordion-style directory */}
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {byState.map(([state, cities]) => {
              const stateCode = cities[0]?.stateCode ?? "";
              return (
                <div key={state} className="border-b border-border/50 pb-3">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-black text-sm tracking-wide flex items-center gap-2">
                      <span className="font-mono text-primary">{stateCode}</span>
                      <span>{state.toUpperCase()}</span>
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                      <span className="font-mono">{cities.length}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {cities.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/market/${c.slug}`}
                        className="text-xs text-muted-foreground hover:text-primary hover:underline transition-colors font-medium"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
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
          <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
            DON&apos;T SEE YOUR MARKET?
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
                <li><Link href="/teams" className="hover:text-foreground">For Teams</Link></li>
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
