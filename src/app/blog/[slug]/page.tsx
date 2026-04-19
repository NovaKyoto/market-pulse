import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Calendar, Zap, Sparkles } from "lucide-react";
import {
  BLOG_POSTS,
  getBlogPostBySlug,
  getRelatedPosts,
  type BlogSection,
} from "@/lib/blog-posts";

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://marketpulse.now").trim();

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const url = `${APP_URL}/blog/${slug}`;
  const ogImage = `${APP_URL}/api/blog-og?slug=${slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.datePublished,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

function renderSection(section: BlogSection, i: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2 key={i} className="text-2xl sm:text-3xl font-bold tracking-tight mt-10 mb-4">
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="text-xl font-semibold tracking-tight mt-8 mb-3">
          {section.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="text-base leading-relaxed text-muted-foreground mb-5">
          {section.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="space-y-2 mb-6 pl-5 list-disc text-muted-foreground">
          {section.items.map((item, j) => (
            <li key={j} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="space-y-2 mb-6 pl-5 list-decimal text-muted-foreground">
          {section.items.map((item, j) => (
            <li key={j} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <Card key={i} className="my-6 border-primary/20 bg-primary/5">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">{section.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    case "stat":
      return (
        <Card key={i} className="my-4 bg-gradient-to-br from-blue-500/5 to-indigo-600/5 border-blue-500/20">
          <CardContent className="p-5">
            <p className="text-4xl font-extrabold tracking-tight text-primary">{section.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{section.label}</p>
            {section.source && (
              <p className="text-xs text-muted-foreground/70 mt-2">Source: {section.source}</p>
            )}
          </CardContent>
        </Card>
      );
    case "quote":
      return (
        <blockquote key={i} className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground">
          <p>&ldquo;{section.text}&rdquo;</p>
          {section.attribution && (
            <cite className="mt-2 block not-italic text-xs text-muted-foreground/70">
              — {section.attribution}
            </cite>
          )}
        </blockquote>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${APP_URL}/blog/${slug}`,
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

      {/* Article */}
      <article className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1 mb-6"
        >
          ← All articles
        </Link>

        <div className="flex items-center gap-3 mb-4 text-xs">
          <Badge variant="secondary">{post.category}</Badge>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            {post.readTime} min read
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {new Date(post.datePublished).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{post.description}</p>

        <div className="mt-10 border-t pt-8">
          {post.content.map((section, i) => renderSection(section, i))}
        </div>

        {/* Bottom CTA */}
        <Card className="mt-12 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-blue-500/5">
          <CardContent className="p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Ready to automate your client retention?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
              MarketPulse sends branded market reports to your entire client list on autopilot.
              14-day free trial. No credit card required.
            </p>
            <div className="mt-5">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="border-t py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-xl font-bold tracking-tight mb-4">Keep reading</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group">
                  <Card className="h-full hover:border-primary/50 transition-colors">
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="text-xs mb-2">
                        {r.category}
                      </Badge>
                      <p className="font-semibold group-hover:text-primary transition-colors leading-snug">
                        {r.title}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">{r.readTime} min read</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
