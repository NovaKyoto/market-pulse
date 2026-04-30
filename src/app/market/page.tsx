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
} from "lucide-react";
import { CITIES, type City } from "@/lib/cities";
import { fetchMarketData, formatCurrency } from "@/lib/market-data";
import { CityArtwork } from "@/components/markets/city-artwork";

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
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                Most popular
              </p>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Featured markets
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Live data · Updated daily · Click to see the full report
              </p>
            </div>
            <Link
              href="/market"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
            >
              View all {CITIES.length}
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
                  {/* Sentiment gradient on bottom half — sets the mood color */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${sentimentGradient} opacity-100`}
                  />

                  {/* City-specific SVG artwork (palms, skylines, cactus, etc.) */}
                  <CityArtwork slug={city.slug} />

                  {/* Top white panel for data legibility — sharp cutoff to let artwork breathe */}
                  <div className="absolute top-0 left-0 right-0 h-[55%] bg-gradient-to-b from-background via-background/95 to-transparent" />

                  <div className="relative p-5">
                    {/* Top row: city + sentiment */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {city.stateCode}
                      </div>
                      <Badge
                        variant="outline"
                        className={`gap-1 text-[10px] uppercase tracking-wider px-2 ${sentimentBadge}`}
                      >
                        <SentimentIcon className="h-2.5 w-2.5" />
                        {sentimentLabel}
                      </Badge>
                    </div>

                    {/* City name */}
                    <h3 className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors leading-tight">
                      {city.name}
                    </h3>

                    {/* Median Price - the hero stat */}
                    <div className="mt-4">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                        Median Price
                      </p>
                      <p className="text-2xl font-extrabold font-mono tracking-tighter mt-1">
                        {formatCurrency(data.median_price)}
                      </p>
                      <div
                        className={`mt-1 inline-flex items-center gap-0.5 text-xs font-medium ${
                          priceUp ? "text-emerald-600" : "text-red-500"
                        }`}
                      >
                        {priceUp ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {data.price_change_pct > 0 ? "+" : ""}
                        {data.price_change_pct.toFixed(1)}% YoY
                      </div>
                    </div>

                    {/* Spacer to let artwork breathe */}
                    <div className="h-20 sm:h-24" />

                    {/* Bottom stats row + CTA — frosted glass over artwork */}
                    <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-3 bg-background/85 backdrop-blur-sm border-t">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span className="font-mono font-semibold text-foreground">
                            {data.avg_days_on_market}
                          </span>
                          <span>days</span>
                        </div>
                        <div className="text-muted-foreground">
                          <span className="font-mono font-semibold text-foreground">
                            {data.active_listings}
                          </span>
                          <span className="ml-1">listings</span>
                        </div>
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                          <ArrowRight className="h-3.5 w-3.5 text-primary group-hover:text-white transition-colors" />
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
            {byState.map(([state, cities], idx) => {
              // Cycle through 6 accent palettes so neighboring cards differ
              const palettes = [
                { gradient: "from-blue-500 to-indigo-600", soft: "from-blue-500/10 to-transparent", text: "text-blue-700 dark:text-blue-300", chip: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30" },
                { gradient: "from-emerald-500 to-teal-600", soft: "from-emerald-500/10 to-transparent", text: "text-emerald-700 dark:text-emerald-300", chip: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30" },
                { gradient: "from-amber-500 to-orange-600", soft: "from-amber-500/10 to-transparent", text: "text-amber-700 dark:text-amber-300", chip: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30" },
                { gradient: "from-purple-500 to-pink-600", soft: "from-purple-500/10 to-transparent", text: "text-purple-700 dark:text-purple-300", chip: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30" },
                { gradient: "from-rose-500 to-red-600", soft: "from-rose-500/10 to-transparent", text: "text-rose-700 dark:text-rose-300", chip: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30" },
                { gradient: "from-cyan-500 to-blue-600", soft: "from-cyan-500/10 to-transparent", text: "text-cyan-700 dark:text-cyan-300", chip: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30" },
              ];
              const palette = palettes[idx % palettes.length];
              const stateCode = cities[0]?.stateCode ?? "";

              return (
                <Card
                  key={state}
                  className="group relative overflow-hidden hover:border-primary/40 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  {/* Soft accent in top corner */}
                  <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${palette.soft} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <CardContent className="relative p-5">
                    {/* Header: State badge + count */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${palette.gradient} shadow-md font-bold text-white text-sm`}>
                          {stateCode}
                        </div>
                        <div>
                          <h3 className="font-bold text-base leading-tight">{state}</h3>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-mono font-semibold">{cities.length}</span>
                            {" "}{cities.length === 1 ? "market" : "markets"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* City chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {cities.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/market/${c.slug}`}
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-all hover:scale-105 hover:shadow-sm ${palette.chip} hover:border-current`}
                        >
                          <MapPin className="h-2.5 w-2.5" />
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
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
