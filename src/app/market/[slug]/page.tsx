import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Database,
  Sparkles,
  Building2,
} from "lucide-react";
import { CITIES, getCityBySlug, formatCityTitle } from "@/lib/cities";
import { fetchMarketData, formatCurrency, formatPercent } from "@/lib/market-data";

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://marketpulse.now").trim();

export async function generateStaticParams() {
  return CITIES.map((c) => ({ slug: c.slug }));
}

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
  const isBuyersMarket = (data.inventory_months ?? 6) > 6;
  const priceUp = (data.price_change_pct ?? 0) >= 0;

  const today = new Date();
  const monthYear = today.toLocaleString("en-US", { month: "long", year: "numeric" });

  // Cities in same state for "more local markets" section
  const sameStateCities = CITIES.filter(
    (c) => c.stateCode === city.stateCode && c.slug !== slug
  );
  const otherTopCities = CITIES.filter(
    (c) => c.stateCode !== city.stateCode && c.slug !== slug
  ).slice(0, 12);

  // FAQ content - SEO + featured snippet bait
  const faqs = [
    {
      q: `What's the median home price in ${city.name}, ${city.stateCode}?`,
      a: `As of ${monthYear}, the median home sale price in ${city.name}, ${city.stateCode} is ${formatCurrency(data.median_price)}. This is ${priceUp ? "up" : "down"} ${formatPercent(Math.abs(data.price_change_pct))} year-over-year.`,
    },
    {
      q: `Is ${city.name} a buyer's market or seller's market?`,
      a: `${city.name} currently has ${data.inventory_months} months of inventory, making it a ${isSellersMarket ? "seller's market" : isBuyersMarket ? "buyer's market" : "balanced market"}. ${
        isSellersMarket
          ? "Inventory is tight (under 4 months) which favors sellers — homes move quickly and often attract multiple offers."
          : isBuyersMarket
          ? "Inventory is high (over 6 months) which favors buyers — there's more negotiating room and sellers may price competitively."
          : "Inventory is balanced (4-6 months) which means buyers and sellers share negotiating power."
      }`,
    },
    {
      q: `How long do homes take to sell in ${city.name}?`,
      a: `Homes in ${city.name} are currently selling in an average of ${data.avg_days_on_market} days. ${
        data.avg_days_on_market < 30
          ? "This is fast-moving — well-priced homes attract offers quickly."
          : data.avg_days_on_market > 60
          ? "This is slower than average — homes may need price adjustments or extra marketing to sell."
          : "This is a typical pace for the market."
      }`,
    },
    {
      q: `How is this data calculated?`,
      a: `Market data is aggregated from Redfin's public MLS feeds and updated daily. Median prices reflect closed sales, days on market measures listing-to-contract time, and inventory is calculated from active listings divided by the recent sales pace.`,
    },
  ];

  // Schema.org structured data
  const reportLd = {
    "@context": "https://schema.org",
    "@type": "Report",
    headline: `${formatCityTitle(city)} Housing Market Report — ${monthYear}`,
    description: `Real estate market analysis for ${city.name}, ${city.state}.`,
    datePublished: today.toISOString(),
    author: { "@type": "Organization", name: "MarketPulse", url: APP_URL },
    publisher: { "@type": "Organization", name: "MarketPulse", url: APP_URL },
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

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Sentiment determination for hero badge
  const marketLabel = isSellersMarket ? "Seller's Market" : isBuyersMarket ? "Buyer's Market" : "Balanced Market";
  const marketColor = isSellersMarket
    ? "from-rose-500 to-red-600"
    : isBuyersMarket
    ? "from-emerald-500 to-green-600"
    : "from-amber-500 to-orange-600";

  return (
    <div className="flex flex-col min-h-screen marketing-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reportLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

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
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/market" className="hover:text-foreground">Markets</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{city.name}, {city.stateCode}</span>
          </div>

          <div className="text-center">
            <Badge className={`mb-4 px-3 py-1.5 gap-1.5 bg-gradient-to-r ${marketColor} hover:opacity-90 border-0 text-white shadow-lg`}>
              <Sparkles className="h-3 w-3" />
              {marketLabel} · Updated {monthYear}
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl leading-[1.05]">
              {city.name}
              <span className="block mt-2 pb-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
                Housing Market
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Live market data for <strong className="text-foreground">{city.name}, {city.state}</strong>.
              Median prices, inventory, days on market, and AI-powered trend analysis — backed by Redfin MLS data.
            </p>

            {/* Trust signals */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Database className="h-3 w-3" />
                Redfin-powered
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                Updated daily
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3" />
                Free for agents
              </span>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2 px-8 h-12 text-base shadow-lg">
                  Get this branded with your name
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

      {/* Headline Stats — Bento style */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Big 3 hero stats */}
          <div className="grid gap-4 lg:grid-cols-3 mb-4">
            {/* Median Price - Large */}
            <Card className="lg:col-span-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-48 w-48 bg-gradient-to-br from-blue-500/15 to-transparent rounded-bl-full" />
              <CardContent className="relative p-8">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                    <DollarSign className="h-3.5 w-3.5" />
                    Median Sale Price
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-semibold ${
                      priceUp ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {priceUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {formatPercent(data.price_change_pct)} YoY
                  </div>
                </div>
                <p className="text-5xl sm:text-6xl font-extrabold font-mono tracking-tighter mt-4">
                  {formatCurrency(data.median_price)}
                </p>
                <p className="text-sm text-muted-foreground mt-3">
                  {priceUp
                    ? `Prices in ${city.name} have appreciated ${formatPercent(Math.abs(data.price_change_pct))} compared to last year.`
                    : `Prices have softened ${formatPercent(Math.abs(data.price_change_pct))} year-over-year — opportunity for buyers.`}
                </p>
              </CardContent>
            </Card>

            {/* Days on Market */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-emerald-500/15 to-transparent rounded-bl-full" />
              <CardContent className="relative p-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  <Clock className="h-3.5 w-3.5" />
                  Days on Market
                </div>
                <p className="text-5xl font-extrabold font-mono tracking-tighter mt-4">
                  {data.avg_days_on_market}
                </p>
                <p className="text-sm text-muted-foreground mt-3">
                  {data.avg_days_on_market < 30
                    ? "Fast-moving market — homes sell quickly."
                    : data.avg_days_on_market > 60
                    ? "Slower pace — homes need extra time to sell."
                    : "Typical selling pace for this market."}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 4 smaller stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Home,
                label: "Active Listings",
                value: String(data.active_listings),
                sub: `${data.sold_last_30} sold (30d)`,
                color: "from-orange-500/10 to-transparent",
              },
              {
                icon: BarChart3,
                label: "Price / Sq Ft",
                value: formatCurrency(data.price_per_sqft),
                sub: "Median listing PPSF",
                color: "from-purple-500/10 to-transparent",
              },
              {
                icon: Layers,
                label: "Months of Inventory",
                value: `${data.inventory_months}`,
                sub: marketLabel,
                color: "from-cyan-500/10 to-transparent",
              },
              {
                icon: TrendingUp,
                label: "Sold (30 days)",
                value: String(data.sold_last_30),
                sub: `In ZIP ${city.zipCode}`,
                color: "from-rose-500/10 to-transparent",
              },
            ].map((stat) => (
              <Card key={stat.label} className="relative overflow-hidden hover:border-primary/30 transition-colors">
                <div className={`absolute top-0 right-0 h-24 w-24 bg-gradient-to-br ${stat.color} rounded-bl-full`} />
                <CardContent className="relative p-5">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    <stat.icon className="h-3.5 w-3.5" />
                    {stat.label}
                  </div>
                  <p className="text-3xl font-bold font-mono tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Analysis */}
      <section className="border-t marketing-muted py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            AI Market Analysis
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter mb-6 leading-tight">
            WHAT&apos;S HAPPENING IN {city.name.toUpperCase()} RIGHT NOW
          </h2>
          <div className="space-y-5 text-[18px] leading-[1.7] text-foreground/90">
            <p>
              The {city.name}, {city.stateCode} housing market currently shows a median sale price of{" "}
              <strong>{formatCurrency(data.median_price)}</strong>
              {priceUp ? " — up" : " — down"}{" "}
              <strong className={priceUp ? "text-emerald-600" : "text-red-500"}>
                {formatPercent(Math.abs(data.price_change_pct))}
              </strong>{" "}
              year-over-year. Homes are selling in an average of{" "}
              <strong>{data.avg_days_on_market} days</strong>, with{" "}
              <strong>{data.active_listings} active listings</strong> available.
            </p>
            <p>
              With <strong>{data.inventory_months} months</strong> of inventory, {city.name} is
              currently a <strong>{marketLabel.toLowerCase()}</strong>.{" "}
              {isSellersMarket
                ? "Sellers hold the leverage — well-priced homes move fast and often attract multiple offers. Buyers should be ready to act decisively and lead with strong offers."
                : isBuyersMarket
                ? "Buyers have more negotiating power, and sellers may need to price competitively to attract offers. Buyers can take more time to evaluate and negotiate."
                : "Buyers and sellers share balanced negotiating power. This is a healthy, sustainable market dynamic."}{" "}
              Price per square foot sits at <strong>{formatCurrency(data.price_per_sqft)}</strong>.
            </p>
            <p>
              In the last 30 days, <strong>{data.sold_last_30} homes</strong> have sold in this
              market. Real estate agents in {city.name} use MarketPulse to send branded weekly
              market updates to past clients, helping them stay top-of-mind and earn repeat business.
            </p>
          </div>
        </div>
      </section>

      {/* Agent CTA - rich card */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Card className="relative overflow-hidden border-2 border-primary/20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
            <div className="absolute top-0 right-0 h-64 w-64 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full" />
            <CardContent className="relative p-8 sm:p-12">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                  <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-600 border-0 text-white">
                    For Real Estate Agents
                  </Badge>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter leading-tight">
                    Send this report to your clients —
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> with YOUR branding</span>
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    MarketPulse automatically emails branded market reports like this one to your
                    entire client list every week. Your name, your logo, your colors.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Link href="/sign-up">
                      <Button size="lg" className="gap-2 px-6 h-12 shadow-lg w-full sm:w-auto">
                        Start 14-Day Free Trial
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/founding">
                      <Button size="lg" variant="outline" className="gap-2 h-12 w-full sm:w-auto">
                        Founding 5 Offer
                      </Button>
                    </Link>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    No credit card · Cancel anytime
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    "Your branding, your colors, your name",
                    "Automated weekly delivery — zero ongoing work",
                    "AI-written insights in your tone of voice",
                    "Real MLS + Redfin data for any US ZIP",
                    "Engagement tracking — know who's a hot lead",
                    "Social posts auto-generated for IG/FB/LinkedIn/X",
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-3 text-sm">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 mt-0.5">
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t marketing-muted py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-center mb-3">
            COMMON QUESTIONS ABOUT {city.name.toUpperCase()}
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            Quick answers based on the latest market data.
          </p>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border bg-background p-5 hover:border-primary/30 transition-colors"
              >
                <summary className="flex items-start justify-between cursor-pointer font-semibold list-none gap-4">
                  <span className="flex-1">{faq.q}</span>
                  <span className="text-muted-foreground group-open:rotate-45 transition-transform text-xl font-light leading-none mt-1 shrink-0">+</span>
                </summary>
                <div className="mt-4 text-muted-foreground leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other Cities + Same State */}
      <section className="border-t py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {sameStateCities.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Building2 className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold tracking-tight">
                  More markets in {city.state}
                </h2>
              </div>
              <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {sameStateCities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/market/${c.slug}`}
                    className="group flex items-center gap-2 rounded-lg border bg-background p-3 text-sm hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0 group-hover:text-primary" />
                    <span className="truncate">{c.name}, {c.stateCode}</span>
                    <ArrowRight className="h-3 w-3 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold tracking-tight">Other markets we track</h2>
            </div>
            <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {otherTopCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/market/${c.slug}`}
                  className="group flex items-center gap-2 rounded-lg border bg-background p-3 text-sm hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0 group-hover:text-primary" />
                  <span className="truncate">{c.name}, {c.stateCode}</span>
                  <ArrowRight className="h-3 w-3 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/market">
                <Button variant="outline" className="gap-2">
                  View All Markets
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
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
            <p>Market data deemed reliable but not guaranteed. Not an appraisal.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
