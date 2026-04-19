import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Clock, Zap } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-posts";

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://marketpulse.now").trim();

export const metadata: Metadata = {
  title: "Blog — Real Estate Marketing, Client Retention & Market Insights",
  description:
    "Practical guides, research, and tool comparisons for real estate agents who want to retain past clients and grow through referrals.",
  alternates: {
    canonical: `${APP_URL}/blog`,
  },
  openGraph: {
    title: "MarketPulse Blog — Real Estate Marketing & Retention",
    description:
      "Practical guides and research for real estate agents.",
    url: `${APP_URL}/blog`,
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
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
      <section className="border-b">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 px-3 py-1">
              <BookOpen className="mr-1 h-3 w-3" />
              MarketPulse Blog
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Real estate marketing that actually works
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Practical guides, research, and honest comparisons for agents who want to keep past
              clients and grow through referrals — not chase cold leads.
            </p>
          </div>
        </div>
      </section>

      {/* Post list */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <Card className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-3 text-xs">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {post.readTime} min read
                      </span>
                      <span className="text-muted-foreground">
                        {new Date(post.datePublished).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{post.excerpt}</p>
                    <div className="mt-4 text-sm font-medium text-primary inline-flex items-center gap-1">
                      Read article
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Stop writing newsletters. Start keeping clients.
          </h2>
          <p className="mt-3 text-muted-foreground">
            MarketPulse sends branded market reports to your entire client list on autopilot.
            Your branding, your colors, real market data — zero ongoing work.
          </p>
          <div className="mt-8">
            <Link href="/sign-up">
              <Button size="lg" className="gap-2 h-12 px-8 text-base">
                Start 14-Day Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
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
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/market" className="hover:text-foreground">Markets</Link>
              <Link href="/blog" className="hover:text-foreground">Blog</Link>
              <Link href="/legal/terms" className="hover:text-foreground">Terms</Link>
              <Link href="/legal/privacy" className="hover:text-foreground">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
