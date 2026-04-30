"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Calendar, Sparkles, Search } from "lucide-react";
import type { BlogPost } from "@/lib/blog-posts";

const CATEGORY_COLORS: Record<string, string> = {
  Comparison: "from-blue-500 to-indigo-600",
  Research: "from-emerald-500 to-teal-600",
  "How-to": "from-amber-500 to-orange-600",
  Guide: "from-purple-500 to-pink-600",
};

interface Props {
  posts: BlogPost[];
}

/**
 * Interactive article browser with topic filtering and search.
 * Magazine-style layout with category color accents.
 */
export function ArticleBrowser({ posts }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const set = new Set<string>(posts.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.keywords.some((k) => k.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Search */}
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles by topic or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 flex-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const accent = CATEGORY_COLORS[cat] ?? "from-blue-500 to-indigo-600";
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? `text-white bg-gradient-to-r ${accent} shadow-md`
                    : "text-muted-foreground bg-background border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
                <span className={`font-mono ${isActive ? "opacity-80" : "opacity-60"}`}>
                  {cat === "All"
                    ? posts.length
                    : posts.filter((p) => p.category === cat).length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      {(activeCategory !== "All" || searchQuery) && (
        <p className="text-xs text-muted-foreground mb-5 font-medium">
          {filteredPosts.length === 0
            ? "No articles match your filters."
            : `Showing ${filteredPosts.length} ${filteredPosts.length === 1 ? "article" : "articles"}`}
          {activeCategory !== "All" && (
            <span> · in <strong className="text-foreground">{activeCategory}</strong></span>
          )}
          {searchQuery && <span> · matching <strong className="text-foreground">&ldquo;{searchQuery}&rdquo;</strong></span>}
        </p>
      )}

      {/* Article grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-xl">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted/60 mb-3">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="font-bold text-base">No Articles Found</p>
          <p className="text-sm text-muted-foreground mt-1">
            Try a different category or search term.
          </p>
          <button
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="mt-4 text-sm font-bold text-primary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filteredPosts.map((post) => {
            const accent = CATEGORY_COLORS[post.category] ?? "from-blue-500 to-indigo-600";
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <Card className="h-full overflow-hidden hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.datePublished).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1 font-bold text-primary">
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
      )}
    </div>
  );
}
