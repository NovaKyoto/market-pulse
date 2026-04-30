import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Clock, Zap, Sparkles, Calendar } from "lucide-react";
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
    description: "Practical guides and research for real estate agents.",
    url: `${APP_URL}/blog`,
    type: "website",
  },
};

const categoryColors: Record<string, string> = {
  Comparison: "from-blue-500 to-indigo-600",
  Research: "from-emerald-500 to-teal-600",
  "How-to": "from-amber-500 to-orange-600",
  Guide: "from-purple-500 to-pink-600",
};

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );
  const [featured, ...rest] = posts;

  // Aggregate content stats
  const totalReadTime = posts.reduce((sum, p) => sum + p.readTime, 0);
  const categoryCounts = posts.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const totalKeywords = new Set(posts.flatMap((p) => p.keywords)).size;

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
            <Link href="/blog" className="px-3 py-2 text-foreground font-medium">Blog</Link>
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
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 px-3 py-1.5 gap-1.5 bg-background/80 backdrop-blur border shadow-sm">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              MarketPulse Journal
            </Badge>
            <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl leading-[1.05]">
              Real estate marketing
              <span className="block mt-2 pb-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
                that actually works
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Practical guides, research, and honest comparisons for agents who want to keep past
              clients and grow through referrals — not chase cold leads.
            </p>

            {/* CONTENT STATS — magazine-style metric strip */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              <div className="rounded-xl border bg-background/80 backdrop-blur-sm p-4 text-center">
                <p className="text-3xl font-black font-mono tracking-tighter bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {posts.length}
                </p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-1">
                  Articles
                </p>
              </div>
              <div className="rounded-xl border bg-background/80 backdrop-blur-sm p-4 text-center">
                <p className="text-3xl font-black font-mono tracking-tighter bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {totalReadTime}
                </p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-1">
                  Min Reading
                </p>
              </div>
              <div className="rounded-xl border bg-background/80 backdrop-blur-sm p-4 text-center">
                <p className="text-3xl font-black font-mono tracking-tighter bg-gradient-to-br from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  {Object.keys(categoryCounts).length}
                </p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-1">
                  Categories
                </p>
              </div>
              <div className="rounded-xl border bg-background/80 backdrop-blur-sm p-4 text-center">
                <p className="text-3xl font-black font-mono tracking-tighter bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {totalKeywords}
                </p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-1">
                  Topics
                </p>
              </div>
            </div>

            {/* Topic / category browser */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground mr-2">
                Browse:
              </span>
              {Object.entries(categoryCounts).map(([category, count]) => {
                const accent = categoryColors[category] ?? "from-blue-500 to-indigo-600";
                return (
                  <span
                    key={category}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${accent} shadow-sm`}
                  >
                    {category}
                    <span className="font-mono opacity-80">{count}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-5">
              Featured
            </p>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <Card className="overflow-hidden hover:border-primary/50 transition-colors">
                <div className="grid md:grid-cols-2 items-stretch">
                  {/* Visual */}
                  <div className={`relative overflow-hidden bg-gradient-to-br ${categoryColors[featured.category] ?? "from-blue-500 to-indigo-600"} p-8 sm:p-10 min-h-[280px] flex flex-col justify-end`}>
                    <div className="absolute top-0 right-0 h-40 w-40 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-40 w-40 bg-white/5 rounded-full blur-3xl" />
                    <div className="relative">
                      <Badge className="mb-3 bg-white/20 hover:bg-white/20 text-white border-white/30 backdrop-blur">
                        <Sparkles className="mr-1 h-3 w-3" />
                        {featured.category}
                      </Badge>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tighter leading-tight">
                        {featured.title}
                      </h2>
                    </div>
                  </div>
                  {/* Body */}
                  <CardContent className="p-6 sm:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {featured.readTime} min read
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(featured.datePublished).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {featured.excerpt}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Read article
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* Other posts grid */}
      {rest.length > 0 && (
        <section className="border-t marketing-muted py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-5">
              All articles
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              {rest.map((post) => {
                const accent = categoryColors[post.category] ?? "from-blue-500 to-indigo-600";
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                    <Card className="h-full overflow-hidden hover:border-primary/50 transition-colors">
                      <div className={`h-2 bg-gradient-to-r ${accent}`} />
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3 text-xs">
                          <Badge variant="secondary">{post.category}</Badge>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {post.readTime} min read
                          </span>
                        </div>
                        <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                        <div className="mt-4 flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {new Date(post.datePublished).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span className="inline-flex items-center gap-1 font-medium text-primary">
                            Read
                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden py-20">
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
          </div>
        </div>
      </footer>
    </div>
  );
}
