import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  BarChart3,
  Mail,
  Clock,
  DollarSign,
  Shield,
  ArrowRight,
  Check,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "AI-Powered Market Analysis",
    description:
      "Claude AI analyzes real-time market data and writes professional insights your clients will actually read.",
  },
  {
    icon: Mail,
    title: "Automated Email Delivery",
    description:
      "Reports are automatically emailed to your client list every week, branded with your logo and colors.",
  },
  {
    icon: Clock,
    title: "Set It and Forget It",
    description:
      "Pick your zip codes, add your clients, and we handle everything. No weekly work required.",
  },
  {
    icon: DollarSign,
    title: "Look Like a Market Expert",
    description:
      "Your clients receive a polished, data-driven report from YOU. Build trust, get referrals, close more deals.",
  },
];

const pricingFeatures = [
  "Unlimited market reports",
  "Up to 500 recipients",
  "AI-written insights by Claude",
  "Your branding, your colors",
  "Automated weekly delivery",
  "Track multiple zip codes",
  "PDF downloads",
  "Email support",
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Zap className="h-5 w-5 text-primary" />
            MarketPulse
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:py-32">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Automated Market Reports
          <br />
          <span className="text-primary">Your Clients Will Love</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          AI generates a branded weekly market report for your zip codes and
          emails it to your entire client list. You look like a market expert.
          Zero effort.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/sign-up">
            <Button size="lg" className="gap-2">
              Start 14-Day Free Trial
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          No credit card required &middot; Cancel anytime
        </p>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/40 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Three steps. Five minutes. Then it runs on autopilot forever.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {features.map((f) => (
              <Card key={f.title}>
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {f.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Simple Pricing
          </h2>
          <p className="mt-3 text-muted-foreground">
            One plan. Everything included. Cancel anytime.
          </p>

          <Card className="mx-auto mt-10 max-w-md">
            <CardContent className="p-8">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold">$49</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                14-day free trial included
              </p>
              <ul className="mt-8 space-y-3 text-left">
                {pricingFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="mt-8 block">
                <Button className="w-full" size="lg">
                  Start Free Trial
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <Zap className="h-4 w-4" />
            MarketPulse
          </div>
          <p className="mt-2">
            Automated AI market reports for real estate agents
          </p>
        </div>
      </footer>
    </div>
  );
}
