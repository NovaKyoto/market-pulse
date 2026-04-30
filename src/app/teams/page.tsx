import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TeamsWaitlistForm } from "@/components/teams/waitlist-form";
import { TeamsRoiCalculator } from "@/components/teams/roi-calculator";
import {
  ArrowRight,
  Building2,
  Users,
  Palette,
  TrendingUp,
  Zap,
  Check,
  Sparkles,
  Target,
  Award,
  Layers,
  Clock,
  ShieldCheck,
} from "lucide-react";

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://marketpulse.now").trim();

export const metadata: Metadata = {
  title: "MarketPulse for Brokerages — Branded Reports for Your Whole Team",
  description:
    "Give every agent in your brokerage automated, branded weekly market reports. Centralized billing, co-branding, engagement leaderboard. Coming soon — join the waitlist.",
  alternates: {
    canonical: `${APP_URL}/teams`,
  },
  openGraph: {
    title: "MarketPulse Teams — For Real Estate Brokerages",
    description: "Branded weekly market reports for every agent in your brokerage.",
    url: `${APP_URL}/teams`,
    type: "website",
  },
};

const benefits = [
  {
    icon: Palette,
    title: "Co-branded reports",
    description:
      "Every report features your brokerage logo alongside the agent's name. Consistent brand, personal touch.",
    accent: "from-blue-500 to-indigo-600",
  },
  {
    icon: Users,
    title: "Centralized billing",
    description:
      "One subscription for all agents. Add or remove team members anytime. Volume-based pricing.",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    icon: TrendingUp,
    title: "Engagement leaderboard",
    description:
      "See which agents have the most engaged clients. Identify top performers and coach the rest.",
    accent: "from-amber-500 to-orange-600",
  },
  {
    icon: Layers,
    title: "Bulk send",
    description:
      "Push the same market report under all agents' brands at once. One click, every client list.",
    accent: "from-purple-500 to-pink-600",
  },
  {
    icon: Target,
    title: "Recruiting tool",
    description:
      "Show prospective agents the marketing platform they get when they join. A built-in perk.",
    accent: "from-cyan-500 to-blue-600",
  },
  {
    icon: Award,
    title: "Retention edge",
    description:
      "Top agents stay because their tools come with you. Reduce churn at the agent level.",
    accent: "from-rose-500 to-red-600",
  },
];

type UseCaseItem = { icon: typeof Building2; text: string };
type UseCase = {
  role: string;
  title: string;
  description: string;
  heroIcon: typeof Building2;
  heroGradient: string;
  bgGradient: string;
  borderColor: string;
  iconBg: string;
  iconText: string;
  items: UseCaseItem[];
};

const useCases: UseCase[] = [
  {
    role: "Broker / Team Lead",
    title: "Total Visibility, Zero Hassle",
    description: "Run your whole team's marketing from one dashboard.",
    heroIcon: Building2,
    heroGradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50/50 to-indigo-50/30 dark:from-blue-950/20 dark:to-indigo-950/10",
    borderColor: "border-blue-500/30",
    iconBg: "bg-blue-500/10",
    iconText: "text-blue-600 dark:text-blue-400",
    items: [
      { icon: TrendingUp, text: "See which agents send reports consistently" },
      { icon: Sparkles, text: "Track engagement metrics across the whole team" },
      { icon: Users, text: "Add or remove agents with a single click" },
      { icon: Palette, text: "Co-brand every report with your brokerage logo" },
      { icon: Award, text: "One invoice — no chasing 50 agents for $49 each" },
    ],
  },
  {
    role: "Your Agents",
    title: "Premium Marketing on Day One",
    description: "Polished, branded reports without lifting a finger.",
    heroIcon: Users,
    heroGradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-50/50 to-teal-50/30 dark:from-emerald-950/20 dark:to-teal-950/10",
    borderColor: "border-emerald-500/30",
    iconBg: "bg-emerald-500/10",
    iconText: "text-emerald-600 dark:text-emerald-400",
    items: [
      { icon: Sparkles, text: "Free professional marketing they didn't set up" },
      { icon: Palette, text: "Branded reports go out automatically — polished every time" },
      { icon: Users, text: "Each agent's clients get their own tailored emails" },
      { icon: Target, text: "Engagement insights surface warm leads automatically" },
      { icon: Award, text: "Onboarding takes 5 minutes — no training required" },
    ],
  },
];

export default function TeamsPage() {
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
            <Link href="/teams" className="px-3 py-2 text-foreground font-medium">For Teams</Link>
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
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          {/* Compact centered hero text */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4 px-3 py-1.5 gap-1.5 bg-background/80 backdrop-blur border shadow-sm">
              <Building2 className="h-3.5 w-3.5 text-primary" />
              For Brokerages &amp; Teams
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl leading-[1.05]">
              See Your Brokerage&apos;s
              <span className="block mt-2 pb-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
                ROI in 30 Seconds
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
              MarketPulse Teams gives every agent in your brokerage co-branded weekly market
              reports — under one subscription. <strong className="text-foreground">Adjust the sliders below</strong>{" "}
              to see your numbers.
            </p>
          </div>

          {/* THE CALCULATOR — front and center as the hero */}
          <TeamsRoiCalculator />

          {/* Below-calculator info bar */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge className="gap-1.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/10">
                <Sparkles className="h-3 w-3" />
                Coming Soon — Waitlist Open
              </Badge>
              <span className="text-sm text-muted-foreground">
                Founding brokerages get <strong className="text-foreground">lifetime pricing</strong>
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#waitlist">
                <Button size="lg" className="gap-2 px-8 h-12 text-base shadow-lg w-full sm:w-auto">
                  Join the Waitlist
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <Link href="/sign-up">
                <Button size="lg" variant="outline" className="gap-2 h-12 w-full sm:w-auto">
                  Try Solo Plan First
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bento */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">
              What You Get
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter">
              BUILT FOR BROKERAGES, AGENT-FRIENDLY
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Every feature serves both the broker (visibility, control, revenue) and the
              agent (free marketing, polished tools, more referrals).
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {benefits.map((b) => (
              <Card key={b.title} className="hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${b.accent} mb-4 shadow-md`}>
                    <b.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-base mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases — split design (broker vs agent perspectives) */}
      <section className="border-t marketing-muted py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">
              Two Perspectives, One Product
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter">
              EVERYONE WINS
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Brokers get visibility and control. Agents get polished marketing they
              didn&apos;t have to build. Same product, different wins.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {useCases.map((uc) => {
              const HeroIcon = uc.heroIcon;
              return (
                <Card
                  key={uc.title}
                  className={`group relative overflow-hidden border-2 ${uc.borderColor} bg-gradient-to-br ${uc.bgGradient} hover:shadow-2xl transition-all hover:-translate-y-1`}
                >
                  {/* Decorative blob */}
                  <div className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${uc.heroGradient} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />

                  <CardContent className="relative p-6 sm:p-8">
                    {/* Header with hero icon */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${uc.heroGradient} shadow-lg ring-4 ring-white/30 shrink-0`}>
                        <HeroIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-[10px] uppercase tracking-widest font-black ${uc.iconText} mb-1`}>
                          For {uc.role}
                        </p>
                        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tighter leading-tight">
                          {uc.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{uc.description}</p>
                      </div>
                    </div>

                    {/* Items list with custom icons */}
                    <ul className="space-y-3">
                      {uc.items.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <li key={item.text} className="flex items-start gap-3">
                            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${uc.iconBg} mt-0.5`}>
                              <ItemIcon className={`h-3.5 w-3.5 ${uc.iconText}`} />
                            </div>
                            <span className="text-sm leading-relaxed pt-0.5 font-medium">
                              {item.text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="border-t py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">
              Simple Pricing
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter">
              PAY ONCE. COVER YOUR WHOLE TEAM.
            </h2>
            <p className="mt-3 text-muted-foreground">
              No per-seat surprises. No 12-month contracts. Cancel anytime.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-2 relative overflow-hidden">
              <CardContent className="p-7">
                <Badge variant="secondary" className="mb-3">Team</Badge>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold font-mono tracking-tighter">$149</span>
                  <span className="text-base text-muted-foreground">/mo</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Up to 10 agents</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {[
                    "All MarketPulse features per agent",
                    "Co-branded reports (brokerage + agent)",
                    "Centralized billing &amp; admin dashboard",
                    "Engagement leaderboard",
                    "Priority support",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span dangerouslySetInnerHTML={{ __html: f }} />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 border-primary shadow-xl relative overflow-hidden">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="px-3 py-1 shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-600 border-0">
                  Most brokerages
                </Badge>
              </div>
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
              <CardContent className="p-7">
                <Badge className="mb-3">Brokerage · Unlimited</Badge>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold font-mono tracking-tighter">$399</span>
                  <span className="text-base text-muted-foreground">/mo</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Unlimited agents</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {[
                    "Everything in Team",
                    "Unlimited agents",
                    "Bulk-send across all agents",
                    "Custom domain for emails",
                    "Recruiting/onboarding kit",
                    "Dedicated success manager",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <Card className="border-2 border-amber-500/40 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10">
              <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">Founding Brokerage Program</p>
                  <p className="text-sm text-muted-foreground">
                    First 3 brokerages get <strong className="text-foreground">50% off forever</strong>
                    {" "}+ direct input on the product roadmap.
                  </p>
                </div>
                <a href="#waitlist">
                  <Button size="sm" variant="outline" className="gap-1 border-amber-600/50 hover:bg-amber-100 dark:hover:bg-amber-950/30">
                    Apply <ArrowRight className="h-3 w-3" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* WAITLIST — split layout with form + what-to-expect */}
      <section id="waitlist" className="relative overflow-hidden border-t marketing-muted py-16 sm:py-20 scroll-mt-20">
        {/* Decorative accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute -bottom-20 left-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          {/* Section header */}
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">
              Join Early
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter">
              JOIN THE TEAMS WAITLIST
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Tell us about your brokerage. We&apos;ll reach out personally before launch
              with a founding-brokerage offer.
            </p>
          </div>

          {/* Two-column layout: form + what-to-expect */}
          <div className="grid gap-8 lg:grid-cols-5 items-start max-w-5xl mx-auto">
            {/* Form takes 3 columns on desktop */}
            <div className="lg:col-span-3">
              <TeamsWaitlistForm />
            </div>

            {/* "What to expect" sidebar takes 2 columns */}
            <div className="lg:col-span-2 space-y-4">
              {/* Founding Brokerage progress card */}
              <Card className="border-2 border-amber-500/40 bg-gradient-to-br from-amber-50 via-orange-50/50 to-amber-50 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-amber-950/20 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 h-28 w-28 rounded-full bg-amber-500/20 blur-2xl" />
                <CardContent className="relative p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <p className="text-[10px] uppercase tracking-widest text-amber-700 dark:text-amber-400 font-black">
                      Founding Brokerage Spots
                    </p>
                  </div>
                  <p className="text-5xl font-black font-mono tracking-tighter bg-gradient-to-br from-amber-500 to-orange-600 bg-clip-text text-transparent mb-2">
                    3/3
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    First 3 brokerages get <strong className="text-foreground">50% off forever</strong>.
                    Once gone, this offer is gone for good.
                  </p>
                </CardContent>
              </Card>

              {/* What Happens Next timeline */}
              <Card className="border-2 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-foreground">
                      What Happens Next
                    </p>
                  </div>

                  <ol className="space-y-4">
                    {[
                      {
                        step: "01",
                        title: "We review your application",
                        desc: "Within 24 hours, you'll get a confirmation email.",
                      },
                      {
                        step: "02",
                        title: "Personal outreach (optional call)",
                        desc: "If you want to chat, we'll set up a 15-minute call to understand your team.",
                      },
                      {
                        step: "03",
                        title: "Early access at launch",
                        desc: "When Teams launches, you're first in line — with founding pricing locked in.",
                      },
                    ].map((item) => (
                      <li key={item.step} className="flex gap-3">
                        <div className="font-mono font-black text-2xl text-primary/30 leading-none shrink-0">
                          {item.step}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm leading-tight">{item.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* Privacy / commitment note */}
              <div className="flex items-start gap-3 rounded-xl border bg-background/60 backdrop-blur-sm p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold mb-0.5">No spam, no pressure</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We&apos;ll only email you about MarketPulse Teams. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 h-80 w-80 rounded-full bg-white/10 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-white/5 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center text-white">
          <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
            SOLO AGENT? DON&apos;T WAIT.
          </h2>
          <p className="mt-6 text-white/80 max-w-xl mx-auto text-lg">
            Start sending branded reports today on the solo plan. Migrate to Teams when
            we launch — your data and clients come with you.
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
                See Founding 5 Solo Offer
              </Button>
            </Link>
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
                Automated AI market reports for real estate agents and brokerages.
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-3">Product</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/sign-up" className="hover:text-foreground">Start Free Trial</Link></li>
                <li><Link href="/founding" className="hover:text-foreground">Founding 5</Link></li>
                <li><Link href="/teams" className="hover:text-foreground">For Teams</Link></li>
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
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} MarketPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
