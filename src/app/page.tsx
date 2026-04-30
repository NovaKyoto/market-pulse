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
    a: "Mailchimp and CRMs are empty tools — you still have to write every newsletter. MarketPulse automatically generates the content (market data + AI commentary) so you never write an email again. It's a report factory, not a send tool.",
  },
  {
    q: "What does the ROI actually look like?",
    a: "One referred listing typically generates $8-15K in commission. MarketPulse costs $49/mo ($588/year). You need just one referral every 2 years to 10x your investment. Most agents who use consistently see 3-8 referrals per year.",
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

      {/* ROI framing */}
      <section className="py-20 sm:py-24">
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

      {/* Pricing */}
      <section className="border-t marketing-muted py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">
              Pricing
            </p>
            <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
              SIMPLE. NO SURPRISES.
            </h2>
            <p className="mt-4 text-muted-foreground">
              One plan. Everything included. Cancel anytime.
            </p>
          </div>
          <div className="mx-auto grid gap-6 max-w-3xl md:grid-cols-2">
            {/* Monthly */}
            <Card className="border-2 relative overflow-hidden">
              <CardContent className="p-8">
                <Badge variant="secondary" className="mb-4">Monthly</Badge>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold font-mono tracking-tighter">$49</span>
                  <span className="text-lg text-muted-foreground">/mo</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  14-day free trial · cancel anytime
                </p>
                <ul className="mt-6 space-y-2.5 text-left">
                  {pricingFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up" className="mt-6 block">
                  <Button className="w-full h-11" variant="outline" size="lg">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Annual */}
            <Card className="border-2 border-primary shadow-xl relative overflow-hidden">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="px-3 py-1 shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-600 border-0">
                  Save 20%
                </Badge>
              </div>
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
              <CardContent className="p-8">
                <Badge className="mb-4">Annual · Best Value</Badge>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold font-mono tracking-tighter">$39</span>
                  <span className="text-lg text-muted-foreground">/mo</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  $470/year · save $118
                </p>
                <ul className="mt-6 space-y-2.5 text-left">
                  {pricingFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up" className="mt-6 block">
                  <Button className="w-full h-11 gap-2" size="lg">
                    Start Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
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
