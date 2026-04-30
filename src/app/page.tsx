import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CityPreview } from "@/components/landing/city-preview";
import {
  Zap,
  BarChart3,
  Mail,
  Shield,
  ArrowRight,
  Check,
  Sparkles,
  Clock,
  Users,
  TrendingUp,
  Flame,
  Gift,
  Palette,
  FileText,
  ShieldCheck,
  Database,
  Brain,
  Send,
} from "lucide-react";

const pricingFeatures = [
  "Unlimited AI market reports",
  "Up to 500 recipients",
  "Real market data (Redfin-powered)",
  "Claude AI-written insights",
  "Your branding, your colors",
  "Automated weekly delivery",
  "PDF report downloads",
  "Multiple zip codes",
  "Priority email support",
];

const faqs = [
  {
    q: "What happens during the free trial?",
    a: "You get full access for 14 days. No credit card required. Send unlimited reports, add unlimited recipients, try every feature. Cancel anytime from your dashboard with one click.",
  },
  {
    q: "Where does the market data come from?",
    a: "We pull live data from Redfin's public stingray API and other MLS-backed sources. Updated daily. Data is deemed reliable but not guaranteed — we disclose this clearly in every report so your clients know.",
  },
  {
    q: "Can my clients unsubscribe? Will they think I'm spamming?",
    a: "Yes, every email has a one-click unsubscribe link (required by CAN-SPAM law). Reports go only to people you add, so they're opted-in. Most agents see open rates of 30-50% — well above industry average — because clients actually want local market data.",
  },
  {
    q: "What if the AI writes something wrong or inaccurate?",
    a: "Every report includes a clear disclaimer that it's AI-generated and not a professional appraisal. You can preview reports before they send, edit anything, and approve before delivery. You're always in control.",
  },
  {
    q: "Do I need any technical skills?",
    a: "No. If you can use Gmail, you can use MarketPulse. Setup takes under 5 minutes: add your ZIP codes, upload your client list (CSV or paste emails), pick your brand colors. Reports send automatically.",
  },
  {
    q: "How is this different from Mailchimp or my CRM?",
    a: "Mailchimp and CRMs are empty tools — you still have to write every newsletter yourself. MarketPulse automatically generates the content (market data + AI commentary), so you'll never write a market email again. Think of it as a report factory, not just a send tool.",
  },
  {
    q: "What does the ROI actually look like?",
    a: "One referred listing typically generates $8-15K in commission. MarketPulse costs $49/mo ($588/year). You only need one referral every two years to 10x your investment. Most agents who use it consistently see 3-8 referrals per year.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, cancel anytime from your dashboard. No contracts, no cancellation fees, no calls to a sales rep. If you cancel during the trial, you're never charged.",
  },
];

export default function LandingPage() {
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
            <Link href="/market" className="px-3 py-2 text-muted-foreground hover:text-foreground">Markets</Link>
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

      {/* Hero + Live Preview */}
      <section className="relative">
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm gap-1.5 bg-background/80 backdrop-blur border shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Now in launch — Founding 5 program open</span>
            </Badge>
            <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl leading-[1.05]">
              Stay top-of-mind
              <span className="block mt-2 pb-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
                without the busywork
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              MarketPulse sends your past clients a <strong className="text-foreground">branded weekly market report</strong>
              {" "}automatically — with AI-written insights and real MLS data.
              You earn more referrals without writing a single email.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2 px-8 h-12 text-base shadow-lg">
                  Start 14-Day Free Trial
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
              No credit card · Cancel anytime · Works with any US ZIP code
            </p>
          </div>

          {/* Interactive Live Preview */}
          <div className="mt-16">
            <div className="text-center mb-6">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                See it live in your market
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Enter your ZIP code — no signup required
              </p>
            </div>
            <CityPreview />
          </div>
        </div>
      </section>

      {/* Data source / trust bar */}
      <section className="border-y marketing-muted py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground mb-5">
            Powered by trusted data sources
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2 font-semibold">
              <Database className="h-4 w-4" />
              Redfin MLS Data
            </span>
            <span className="flex items-center gap-2 font-semibold">
              <Brain className="h-4 w-4" />
              Claude AI
            </span>
            <span className="flex items-center gap-2 font-semibold">
              <Send className="h-4 w-4" />
              Resend Email
            </span>
            <span className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              Stripe-secured
            </span>
          </div>
        </div>
      </section>

      {/* WHAT YOUR CLIENTS SEE — product preview mockup */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">
              The Output
            </p>
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
              WHAT YOUR CLIENTS RECEIVE
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Every Monday, your past clients open their inbox to a beautifully branded
              market report — with your name, your logo, your colors.
            </p>
          </div>

          {/* Mockup — laptop preview of email/report */}
          <div className="relative max-w-4xl mx-auto">
            {/* Browser window chrome */}
            <div className="rounded-2xl border-2 shadow-2xl overflow-hidden bg-background">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 mx-4 px-3 py-1 rounded-md bg-background border text-xs text-muted-foreground font-mono truncate">
                  📧 Houston Market Update · Smith Realty Group
                </div>
                <div className="hidden sm:block text-xs text-muted-foreground">
                  Inbox
                </div>
              </div>

              {/* Email content */}
              <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 sm:p-10 text-white">
                {/* Brokerage header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm font-bold text-white">
                    SR
                  </div>
                  <div>
                    <p className="font-bold text-sm">Smith Realty Group</p>
                    <p className="text-xs text-white/70">Weekly Market Report · Apr 2026</p>
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tighter leading-tight">
                  Houston Homes Selling in 18 Days
                  <span className="block text-amber-300 mt-1">As Seller Advantage Holds Strong</span>
                </h3>
                <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl">
                  In ZIP code 77007, Houston homes are flying off the market in just 18 days
                  on average, with prices holding steady near $401,400 — a sign of a market
                  that remains firmly in sellers&apos; favor.
                </p>
              </div>

              {/* Stat grid below header */}
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 border-t">
                {[
                  { label: "Median Price", value: "$401,400", trend: "-0.4%", up: false },
                  { label: "Days on Market", value: "18", trend: "Fast", up: true },
                  { label: "Active Listings", value: "84", trend: "+3 wk", up: true },
                  { label: "Sold (30d)", value: "34", trend: "+12%", up: true },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 sm:p-5">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-xl sm:text-2xl font-black font-mono tracking-tighter mt-1">
                      {stat.value}
                    </p>
                    <p
                      className={`text-xs font-bold mt-1 ${
                        stat.up ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {stat.trend}
                    </p>
                  </div>
                ))}
              </div>

              {/* Body text preview */}
              <div className="p-6 sm:p-8 border-t">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Right now, 77007 is a strong seller&apos;s market</strong>
                  , and here&apos;s what that means in plain English: there simply aren&apos;t
                  enough homes available to meet the number of people who want to buy. With only
                  2.1 months of available inventory...
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-amber-500" />
                  <span className="italic">Continue reading the full AI-written analysis</span>
                </div>
              </div>
            </div>

            {/* Floating annotations */}
            <div className="hidden lg:block">
              <div className="absolute -left-32 top-32">
                <div className="bg-amber-100 dark:bg-amber-950/40 border-2 border-amber-500 px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold text-amber-900 dark:text-amber-200">
                  Your branding
                </div>
                <svg className="ml-12 mt-1" width="80" height="20" viewBox="0 0 80 20">
                  <path d="M 0 10 Q 40 5 75 10" stroke="currentColor" className="text-amber-500" strokeWidth="2" fill="none" />
                  <path d="M 70 5 L 78 10 L 70 15" stroke="currentColor" className="text-amber-500" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <div className="absolute -right-36 top-1/2">
                <div className="bg-emerald-100 dark:bg-emerald-950/40 border-2 border-emerald-500 px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  Real MLS data
                </div>
                <svg className="-ml-2 -mt-2" width="80" height="20" viewBox="0 0 80 20">
                  <path d="M 75 10 Q 40 5 5 10" stroke="currentColor" className="text-emerald-500" strokeWidth="2" fill="none" />
                  <path d="M 10 5 L 2 10 L 10 15" stroke="currentColor" className="text-emerald-500" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <div className="absolute -right-44 -bottom-4">
                <svg className="ml-2" width="80" height="20" viewBox="0 0 80 20">
                  <path d="M 75 10 Q 40 15 5 10" stroke="currentColor" className="text-purple-500" strokeWidth="2" fill="none" />
                  <path d="M 10 5 L 2 10 L 10 15" stroke="currentColor" className="text-purple-500" strokeWidth="2" fill="none" />
                </svg>
                <div className="bg-purple-100 dark:bg-purple-950/40 border-2 border-purple-500 px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold text-purple-900 dark:text-purple-200">
                  AI-written insights
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Sample report · Your reports use your name, logo, and brand color
          </p>
        </div>
      </section>

      {/* ROI framing */}
      <section className="py-20 sm:py-24 border-t">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">
              Return on Investment
            </p>
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
              ONE REFERRAL PAYS FOR
              <span className="block mt-1 text-primary">3 YEARS OF MARKETPULSE</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            <Card className="text-center border-2 border-red-500/20 bg-red-50/50 dark:bg-red-950/10">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Cost</p>
                <p className="text-4xl font-bold font-mono">$588</p>
                <p className="text-xs text-muted-foreground mt-2">per year</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/10">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">One Referral</p>
                <p className="text-4xl font-bold font-mono text-emerald-600">$8-15K</p>
                <p className="text-xs text-muted-foreground mt-2">commission</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 border-primary/30 bg-primary/5">
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">ROI</p>
                <p className="text-4xl font-bold font-mono text-primary">14-25x</p>
                <p className="text-xs text-muted-foreground mt-2">per referral</p>
              </CardContent>
            </Card>
          </div>
          <p className="mt-8 text-sm text-center text-muted-foreground max-w-2xl mx-auto">
            Agents who contact past clients monthly earn <strong className="text-foreground">3x more referrals</strong>{" "}
            than those who don&apos;t. At $49/mo, you&apos;re one referral away from paying for{" "}
            <strong className="text-foreground">years</strong> of MarketPulse.
          </p>
        </div>
      </section>

      {/* Bento feature grid */}
      <section className="border-t marketing-muted py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">
              Features
            </p>
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
              EVERYTHING YOU NEED TO STAY TOP-OF-MIND
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Stop paying for five different tools. MarketPulse handles the entire client retention
              workflow in one place.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid gap-4 md:grid-cols-3 md:grid-rows-3 md:h-[640px]">
            {/* Large hero feature */}
            <Card className="md:col-span-2 md:row-span-2 relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="absolute top-0 right-0 h-64 w-64 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full" />
              <CardContent className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-5 shadow-lg shadow-blue-500/30">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3">AI-written market insights</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Claude analyzes live Redfin data for your ZIP and writes professional, plain-English
                    commentary your clients will actually read. Pick your tone:{" "}
                    <strong className="text-foreground">professional, conversational, or luxury</strong>.
                  </p>
                </div>
                <div className="mt-6 rounded-lg border bg-background/80 backdrop-blur p-4 relative">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Sparkles className="h-3 w-3 text-amber-500" />
                    AI-generated sample
                  </div>
                  <p className="text-sm leading-relaxed italic">
                    &quot;Homes in this ZIP are selling in just 18 days on average, with median prices
                    holding steady near $401K. Sellers hold the leverage...&quot;
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Branded delivery */}
            <Card className="group hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 mb-4">
                  <Palette className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold mb-2">Your branding, your colors</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Reports look like YOUR product, not ours.
                </p>
              </CardContent>
            </Card>

            {/* Engagement */}
            <Card className="group hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 mb-4">
                  <Flame className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold mb-2">Hot leads surfaced</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  3+ opens = warm lead. Know who&apos;s ready to move.
                </p>
              </CardContent>
            </Card>

            {/* Automated delivery */}
            <Card className="group hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-4">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold mb-2">Set and forget</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Weekly or monthly auto-send. Zero ongoing work.
                </p>
              </CardContent>
            </Card>

            {/* Real data */}
            <Card className="group hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-4">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold mb-2">Real MLS data</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Redfin-powered. Deemed reliable, disclosed clearly.
                </p>
              </CardContent>
            </Card>

            {/* Multi-format */}
            <Card className="group hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 mb-4">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold mb-2">Email + PDF + Social</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  One click exports for every channel.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">
              How It Works
            </p>
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
              UP AND RUNNING IN 5 MINUTES
            </h2>
            <p className="mt-4 text-muted-foreground">
              Three steps. Then it runs on autopilot forever.
            </p>
          </div>
          <div className="space-y-12">
            {[
              {
                num: "01",
                title: "Set your market and branding",
                desc: "Pick your ZIP codes, upload your logo, choose your brand color, and set your preferred AI tone. Takes under 2 minutes.",
              },
              {
                num: "02",
                title: "Import your client list",
                desc: "Paste emails, upload a CSV, or sync from Follow Up Boss. Duplicates are auto-handled. No complicated integration required.",
              },
              {
                num: "03",
                title: "Your clients start receiving branded reports",
                desc: "Every Monday, a professional market report hits their inbox with your name on it. You do nothing. They think you're amazing.",
              },
            ].map((step, i) => (
              <div key={step.num} className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                <div className="shrink-0">
                  <div className="font-mono text-6xl font-bold text-primary/20 leading-none">
                    {step.num}
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-bold tracking-tight mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
                {i < 2 && <div className="sm:hidden border-t my-2" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — friendly, risk-reversed framing */}
      <section className="border-t marketing-muted py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Section header — leads with FREE, not the price */}
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">
              Try It First
            </p>
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
              FREE FOR 14 DAYS
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Send unlimited reports, add unlimited clients, try every feature.
              No credit card required to start. <strong className="text-foreground">If it doesn&apos;t work, you pay nothing.</strong>
            </p>
          </div>

          {/* Risk-reversal trust strip */}
          <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto mb-10">
            <div className="text-center rounded-xl border bg-background/80 p-3 sm:p-4">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 mb-2">
                <Check className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="text-xs font-bold">No Credit Card</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">to start trial</p>
            </div>
            <div className="text-center rounded-xl border bg-background/80 p-3 sm:p-4">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 mb-2">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-xs font-bold">Cancel Anytime</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">one-click in dashboard</p>
            </div>
            <div className="text-center rounded-xl border bg-background/80 p-3 sm:p-4">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 mb-2">
                <Sparkles className="h-4 w-4 text-amber-600" />
              </div>
              <p className="text-xs font-bold">No Lock-in</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">no contracts ever</p>
            </div>
          </div>

          {/* Pricing cards — softer, more reassuring */}
          <div className="mx-auto grid gap-6 max-w-3xl md:grid-cols-2">
            {/* Monthly */}
            <Card className="border-2 relative overflow-hidden hover:border-primary/40 transition-colors">
              <CardContent className="p-7 sm:p-8">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">Monthly</Badge>
                  <span className="text-[10px] text-muted-foreground italic">Flexible</span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">After your free trial:</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold font-mono tracking-tighter">$49</span>
                  <span className="text-lg text-muted-foreground">/month</span>
                </div>
                <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  Just $1.63/day · Less than a coffee
                </p>
                <p className="mt-4 text-xs text-muted-foreground border-l-2 border-emerald-500/40 pl-3 italic">
                  💡 One referred deal covers <strong className="text-foreground not-italic">12+ months</strong> of MarketPulse.
                </p>
                <Link href="/sign-up" className="mt-6 block">
                  <Button className="w-full h-12" variant="outline" size="lg">
                    Start Free — Pay Later
                  </Button>
                </Link>
                <p className="mt-3 text-[10px] text-center text-muted-foreground">
                  No credit card needed today
                </p>
              </CardContent>
            </Card>

            {/* Annual */}
            <Card className="border-2 border-primary shadow-xl relative overflow-hidden">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="px-3 py-1 shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-600 border-0 font-bold">
                  Save $118 / year
                </Badge>
              </div>
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
              <CardContent className="p-7 sm:p-8 pt-9">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="text-xs">Annual</Badge>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">Most Popular</span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">After your free trial:</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold font-mono tracking-tighter">$39</span>
                  <span className="text-lg text-muted-foreground">/month</span>
                </div>
                <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  Just $1.30/day · Save 20%
                </p>
                <p className="mt-4 text-xs text-muted-foreground border-l-2 border-emerald-500/40 pl-3 italic">
                  💡 One referred deal covers <strong className="text-foreground not-italic">15+ months</strong> of MarketPulse.
                </p>
                <Link href="/sign-up" className="mt-6 block">
                  <Button className="w-full h-12 gap-2 shadow-md" size="lg">
                    Start Free — Pay Later
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <p className="mt-3 text-[10px] text-center text-muted-foreground">
                  Choose annual when your trial ends
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Both plans include — single shared list */}
          <div className="mx-auto mt-8 max-w-3xl">
            <Card className="bg-gradient-to-br from-emerald-50/50 to-teal-50/30 dark:from-emerald-950/10 dark:to-teal-950/10 border-emerald-500/20">
              <CardContent className="p-5 sm:p-6">
                <p className="text-xs uppercase tracking-widest font-bold text-emerald-700 dark:text-emerald-400 mb-3 text-center">
                  Every Plan Includes Everything
                </p>
                <ul className="grid gap-2 sm:grid-cols-2 sm:gap-x-6">
                  {pricingFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Comparison framing — makes $49 feel cheap */}
          <div className="mt-8 max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-3 text-center">
              How MarketPulse Compares
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="rounded-xl border-2 border-red-500/20 bg-red-50/30 dark:bg-red-950/10 p-4 text-center">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  Marketing Assistant
                </p>
                <p className="text-2xl font-black font-mono mt-1">$3,000<span className="text-xs text-muted-foreground">/mo</span></p>
                <p className="text-[10px] text-muted-foreground mt-1 italic">Plus benefits and overhead</p>
              </div>
              <div className="rounded-xl border-2 border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/10 p-4 text-center">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  DIY Newsletters
                </p>
                <p className="text-2xl font-black font-mono mt-1">8 hrs<span className="text-xs text-muted-foreground">/wk</span></p>
                <p className="text-[10px] text-muted-foreground mt-1 italic">Plus subscription costs</p>
              </div>
              <div className="rounded-xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-4 text-center shadow-md">
                <p className="text-[10px] uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">
                  MarketPulse
                </p>
                <p className="text-2xl font-black font-mono mt-1 text-emerald-700 dark:text-emerald-400">$49<span className="text-xs text-muted-foreground">/mo</span></p>
                <p className="text-[10px] text-muted-foreground mt-1 italic">Zero hours of your time</p>
              </div>
            </div>
          </div>

          {/* Founding 5 callout */}
          <div className="mt-8 max-w-3xl mx-auto">
            <Card className="border-2 border-amber-500/40 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10">
              <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
                  <Gift className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">Founding 5 program</p>
                  <p className="text-sm text-muted-foreground">
                    First 5 agents: 90 days free + <strong className="text-foreground">50% off for life</strong>
                    {" "}($24.50/mo forever).
                  </p>
                </div>
                <Link href="/founding">
                  <Button size="sm" variant="outline" className="gap-1 border-amber-600/50 hover:bg-amber-100 dark:hover:bg-amber-950/30">
                    Claim spot <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">
              FAQ
            </p>
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
              COMMON QUESTIONS
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything agents ask before signing up.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border bg-background p-5 hover:border-primary/30 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-base list-none">
                  <span>{faq.q}</span>
                  <span className="ml-4 text-muted-foreground group-open:rotate-45 transition-transform text-xl font-light">+</span>
                </summary>
                <div className="mt-4 text-muted-foreground leading-relaxed text-sm">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 h-80 w-80 rounded-full bg-white/10 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-white/5 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center text-white">
          <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
            STOP WRITING NEWSLETTERS.
            <span className="block mt-2">START KEEPING CLIENTS.</span>
          </h2>
          <p className="mt-6 text-white/80 max-w-xl mx-auto text-lg">
            14-day free trial. No credit card required. Send your first branded report
            in under 5 minutes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/sign-up">
              <Button size="lg" variant="secondary" className="gap-2 h-12 px-8 text-base shadow-xl">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/founding">
              <Button size="lg" variant="outline" className="gap-2 h-12 text-base bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
                See Founding 5 Offer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-md py-12">
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
                <li><Link href="/teams" className="hover:text-foreground">For Teams &amp; Brokerages</Link></li>
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
            <p>AI-generated reports are not appraisals. Data deemed reliable but not guaranteed.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
