import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  BarChart3,
  Mail,
  Clock,
  Shield,
  ArrowRight,
  Check,
  Star,
  TrendingUp,
  Users,
  Building2,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Real Market Data",
    description:
      "Powered by Redfin and other trusted sources. Median prices, days on market, inventory levels, price trends — all for your specific zip codes.",
  },
  {
    icon: Zap,
    title: "AI-Written Insights",
    description:
      "Claude AI analyzes the data and writes professional, jargon-free commentary your clients will actually read and share.",
  },
  {
    icon: Mail,
    title: "Auto-Delivered Weekly",
    description:
      "Branded with your name, logo, and colors. Emailed to your entire client list every Monday. You don't lift a finger.",
  },
  {
    icon: Shield,
    title: "You're the Expert",
    description:
      "Clients see YOUR name on a polished, data-driven report. Build trust, stay top-of-mind, and earn referrals on autopilot.",
  },
];

const steps = [
  {
    num: "1",
    title: "Sign up & set your markets",
    description: "Pick your zip codes, add your business name and brand colors. Takes 2 minutes.",
  },
  {
    num: "2",
    title: "Add your clients",
    description: "Import or add the email addresses of past clients, prospects, and your sphere.",
  },
  {
    num: "3",
    title: "Sit back & look like a pro",
    description: "Every week, your clients get a branded market report from you. Automatically.",
  },
];

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

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Realtor, Keller Williams",
    text: "My clients actually reply to these reports thanking me. I've gotten 3 referrals directly from them.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Broker, RE/MAX",
    text: "I used to spend 2 hours every week writing market updates. Now it's completely hands-off and way better than what I was producing.",
    rating: 5,
  },
  {
    name: "Lisa Park",
    role: "Agent, Compass",
    text: "This pays for itself 100x over. One listing from a past client who loved the reports = $12K commission.",
    rating: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            MarketPulse
          </div>
          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="gap-1">
                Start Free Trial
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
              <TrendingUp className="mr-1.5 h-3.5 w-3.5" />
              Trusted by 500+ real estate agents
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Your Clients Get
              <span className="block mt-1 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Weekly Market Reports
              </span>
              <span className="block mt-1">You Get Referrals</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              AI analyzes real market data for your zip codes and writes a branded
              report emailed to your clients every week. You stay top-of-mind without
              doing a thing.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2 px-8 h-12 text-base">
                  Start 14-Day Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                No credit card required
              </p>
            </div>

            {/* Social proof bar */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>500+ agents</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>25K+ reports sent</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>120+ markets</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Up and running in 5 minutes
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Three steps. Then it runs on autopilot forever.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.num} className="relative text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-xl font-bold">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to stay top-of-mind
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((f) => (
              <Card key={f.title} className="border-0 shadow-md">
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{f.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Agents love MarketPulse
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-4 pt-4 border-t">
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            One plan. Everything included. Cancel anytime.
          </p>

          <div className="mx-auto mt-12 grid gap-6 max-w-2xl md:grid-cols-2">
            {/* Monthly */}
            <Card className="border-2 shadow-lg">
              <CardContent className="p-8">
                <Badge variant="secondary" className="mb-4">Monthly</Badge>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold">$49</span>
                  <span className="text-lg text-muted-foreground">/mo</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  14-day free trial &middot; cancel anytime
                </p>
                <ul className="mt-6 space-y-3 text-left">
                  {pricingFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up" className="mt-6 block">
                  <Button className="w-full h-11 text-base" variant="outline" size="lg">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Annual */}
            <Card className="border-2 border-primary shadow-xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="px-3 py-1 shadow-lg">Save 20%</Badge>
              </div>
              <CardContent className="p-8">
                <Badge variant="secondary" className="mb-4">Annual</Badge>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold">$39</span>
                  <span className="text-lg text-muted-foreground">/mo</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  $470/year &middot; billed annually
                </p>
                <ul className="mt-6 space-y-3 text-left">
                  {pricingFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up" className="mt-6 block">
                  <Button className="w-full h-11 text-base" size="lg">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            No credit card required to start &middot; Cancel anytime
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">
            Stop writing market reports manually
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            Join 500+ agents who save hours every week and stay top-of-mind with their clients.
          </p>
          <Link href="/sign-up" className="mt-8 inline-block">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 h-12 px-8 text-base"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <Zap className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              MarketPulse
            </div>
            <p className="text-sm text-muted-foreground">
              Automated AI market reports for real estate agents
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/legal/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/legal/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/legal/cookies" className="hover:text-foreground transition-colors">
                Cookies
              </Link>
              <Link href="/sign-in" className="hover:text-foreground transition-colors">
                Sign In
              </Link>
              <Link href="/sign-up" className="hover:text-foreground transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">
            &copy; {new Date().getFullYear()} MarketPulse. All rights reserved. AI-generated reports
            are not appraisals. Data deemed reliable but not guaranteed.
          </p>
        </div>
      </footer>
    </div>
  );
}
