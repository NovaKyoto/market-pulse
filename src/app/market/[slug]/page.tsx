import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  BarChart3,
  Clock,
  DollarSign,
  Home,
  Layers,
  MapPin,
  TrendingDown,
  TrendingUp,
  Zap,
  Check,
  ShieldCheck,
} from "lucide-react";
import { CITIES, getCityBySlug, formatCityTitle } from "@/lib/cities";
import { fetchMarketData, formatCurrency, formatPercent } from "@/lib/market-data";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://marketpulse.now";

// Pre-render all city pages at build time (ISR with revalidation)
export async function generateStaticParams() {
  return CITIES.map((c) => ({ slug: c.slug }));
}

// Revalidate every 24 hours so data stays fresh
export const revalidate = 86400;

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const title = `${formatCityTitle(city)} Housing Market Report — Live Data & AI Insights`;
  const description = `The latest ${city.name}, ${city.stateCode} real estate market data: median price, days on market, inventory, and trends. Updated weekly. Free branded reports for agents.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${APP_URL}/market/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${APP_URL}/market/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CityMarketPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const data = await fetchMarketData(city.zipCode);
  const isSellersMarket = (data.inventory_months ?? 6) < 4;
  const priceUp = (data.price_change_pct ?? 0) >= 0;

  const stats = [
    {
      icon: DollarSign,
      label: "Median Sale Price",
      value: formatCurrency(data.median_price),
      trend: data.price_change_pct,
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Clock,
      label: "Days on Market",
      value: String(data.avg_days_on_market),
      sub: data.avg_days_on_market < 30 ? "Fast-moving" : "Normal pace",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: Home,
      label: "Active Listings",
      value: String(data.active_listings),
      sub: `${data.sold_last_30} sold (30d)`,
      color: "from-orange-500 to-red-600",
    },
    {
      icon: BarChart3,
      label: "Price per Sq Ft",
      value: formatCurrency(data.price_per_sqft),
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Layers,
      label: "Months of Inventory",
      value: `${data.inventory_months}`,
      sub: isSellersMarket ? "Seller's market" : data.inventory_months > 6 ? "Buyer's market" : "Balanced",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: TrendingUp,
      label: "Homes Sold (30 days)",
      value: String(data.sold_last_30),
      color: "from-rose-500 to-pink-600",
    },
  ];

  const today = new Date();
  const monthYear = today.toLocaleString("en-US", { month: "long", year: "numeric" });

  // Schema.org structured data for SEO rich results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Report",
    headline: `${formatCityTitle(city)} Housing Market Report — ${monthYear}`,
    description: `Real estate market analysis for ${city.name}, ${city.state}.`,
    datePublished: today.toISOString(),
    author: {
      "@type": "Organization",
      name: "MarketPulse",
      url: APP_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "MarketPulse",
      url: APP_URL,
    },
    about: {
      "@type": "Place",
      name: `${city.name}, ${city.state}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: city.stateCode,
        postalCode: city.zipCode,
        addressCountry: "US",
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4 px-3 py-1">
              <MapPin className="mr-1 h-3 w-3" />
              {city.name}, {city.stateCode} · Updated {monthYear}
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              {city.name} Housing Market Report
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Real-time market data for {city.name}, {city.state}. Median prices, inventory,
              days on market, and trends — backed by live MLS and Redfin data.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2 px-6 h-11">
                  Get this report branded with your name
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground">Free 14-day trial · No card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="overflow-hidden border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      {stat.trend !== undefined && (
                        <div
                          className={`flex items-center gap-0.5 text-xs font-medium ${
                            stat.trend >= 0 ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {stat.trend >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {formatPercent(stat.trend)} YoY
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                    {stat.sub && (
                      <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Market Summary */}
      <section className="border-t bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What&apos;s happening in {city.name} right now
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              The {city.name}, {city.stateCode} housing market currently shows a median sale price of{" "}
              <strong className="text-foreground">{formatCurrency(data.median_price)}</strong>
              {priceUp ? " — up" : " — down"}{" "}
              <strong className={priceUp ? "text-green-600" : "text-red-500"}>
                {formatPercent(Math.abs(data.price_change_pct))}
              </strong>{" "}
              year-over-year. Homes are selling in an average of{" "}
              <strong className="text-foreground">{data.avg_days_on_market} days</strong>, with{" "}
              <strong className="text-foreground">{data.active_listings} active listings</strong>{" "}
              available.
            </p>
            <p>
              With{" "}
              <strong className="text-foreground">{data.inventory_months} months</strong> of
              inventory, {city.name} is currently a{" "}
              <strong className="text-foreground">
                {isSellersMarket ? "seller's market" : data.inventory_months > 6 ? "buyer's market" : "balanced market"}
              </strong>
              . {isSellersMarket
                ? "Sellers hold the leverage — well-priced homes move fast and often attract multiple offers."
                : data.inventory_months > 6
                ? "Buyers have more negotiating power, and sellers may need to price competitively to attract offers."
                : "Buyers and sellers share balanced negotiating power."}{" "}
              Price per square foot sits at{" "}
              <strong className="text-foreground">{formatCurrency(data.price_per_sqft)}</strong>.
            </p>
            <p>
              In the last 30 days, <strong className="text-foreground">{data.sold_last_30} homes</strong>{" "}
              have sold in this market. Real estate agents in {city.name} use MarketPulse to send
              branded weekly market updates to past clients, helping them stay top-of-mind and
              earn repeat business.
            </p>
          </div>
        </div>
      </section>

      {/* Agent CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Card className="overflow-hidden border-2 border-primary/20 shadow-xl">
            <CardContent className="p-8 sm:p-12 text-center">
              <Badge className="mb-4 px-3 py-1">For Real Estate Agents</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Send this report to your clients — with YOUR branding
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                MarketPulse automatically emails branded market reports like this one to your
                entire client list every week. Your name, your logo, your colors.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3 max-w-2xl mx-auto text-left">
                {[
                  "Your branding, your colors",
                  "Automated weekly delivery",
                  "AI-written market insights",
                  "Real MLS + Redfin data",
                  "Client engagement tracking",
                  "Unlimited zip codes",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/sign-up">
                  <Button size="lg" className="gap-2 px-8 h-12 text-base">
                    Start 14-Day Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <p className="mt-3 text-xs text-muted-foreground flex items-center justify-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                No credit card required · Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Other Cities */}
      <section className="border-t py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Other markets we track</h2>
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {CITIES.filter((c) => c.slug !== slug)
              .slice(0, 16)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/market/${c.slug}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {c.name}, {c.stateCode} →
                </Link>
              ))}
          </div>
          <div className="mt-6">
            <Link href="/market" className="text-sm font-medium text-primary">
              View all markets →
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
            <p className="text-xs text-muted-foreground text-center max-w-xl">
              Market data is aggregated from public sources and deemed reliable but not guaranteed.
              Not an appraisal or professional valuation.
            </p>
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
