import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TeamsWaitlistForm } from "@/components/teams/waitlist-form";
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

const useCases = [
  {
    title: "For the broker / team lead",
    items: [
      "See which agents are sending reports consistently",
      "Track engagement metrics across the whole team",
      "Add or remove agents with a single click",
      "Co-brand every report with your brokerage logo",
      "One invoice — no chasing 50 agents for $49 each",
    ],
  },
  {
    title: "For your agents",
    items: [
      "Free professional marketing they didn't have to set up",
      "Branded reports go out automatically — they look polished",
      "Each agent's clients get their own tailored emails",
      "Engagement insights help them spot warm leads",
      "Onboarding is 5 minutes, no training required",
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
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 px-3 py-1.5 gap-1.5 bg-background/80 backdrop-blur border shadow-sm">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                For Brokerages &amp; Teams
              </Badge>
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl leading-[1.05]">
                Every agent gets a
                <span className="block mt-2 pb-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
                  branded marketing engine
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
                MarketPulse Teams gives every agent in your brokerage automated, co-branded
                weekly market reports — under one subscription, with one dashboard.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Badge className="gap-1.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/10">
                  <Sparkles className="h-3 w-3" />
                  Coming soon — waitlist open
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Founding brokerages get lifetime pricing
                </span>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#waitlist">
                  <Button size="lg" className="gap-2 px-8 h-12 text-base shadow-lg w-full sm:w-auto">
                    Join the waitlist
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <Link href="/sign-up">
                  <Button size="lg" variant="outline" className="gap-2 h-12 w-full sm:w-auto">
                    Try solo plan first
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual: stacked cards showing brokerage logo + multiple agents */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl" />
              <div className="relative space-y-3">
                {/* Brokerage card on top */}
                <Card className="shadow-2xl border-2 border-primary/30">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm">Smith Realty Group</p>
                        <p className="text-xs text-muted-foreground">42 agents · 1,847 clients</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">Admin</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Agent cards below — slightly offset */}
                {[
                  { name: "Sarah Chen", clients: 87, hot: 4, color: "from-emerald-500 to-teal-600" },
                  { name: "Marcus Johnson", clients: 124, hot: 7, color: "from-purple-500 to-pink-600" },
                  { name: "Lisa Park", clients: 56, hot: 2, color: "from-amber-500 to-orange-600" },
                ].map((agent, i) => (
                  <Card
                    key={agent.name}
                    className="shadow-lg ml-6"
                    style={{ marginLeft: `${(i + 1) * 8}px` }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${agent.color} text-xs font-bold text-white`}>
                          {agent.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{agent.name}</p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-mono">{agent.clients}</span> clients ·{" "}
                            <span className="text-amber-600 font-medium">{agent.hot} hot leads</span>
                          </p>
                        </div>
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bento */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
              What you get
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

      {/* Use cases */}
      <section className="border-t marketing-muted py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {useCases.map((uc) => (
              <Card key={uc.title} className="border-2">
                <CardContent className="p-7">
                  <h3 className="text-xl font-bold tracking-tight mb-5">{uc.title}</h3>
                  <ul className="space-y-3">
                    {uc.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 mt-0.5">
                          <Check className="h-3 w-3 text-emerald-600" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
              Simple team pricing
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

      {/* Waitlist Form */}
      <section id="waitlist" className="border-t marketing-muted py-16 sm:py-20 scroll-mt-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter">
              JOIN THE TEAMS WAITLIST
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Tell us about your brokerage. We&apos;ll reach out personally before launch with
              a discounted founding-brokerage offer.
            </p>
          </div>
          <TeamsWaitlistForm />
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
