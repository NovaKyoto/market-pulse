import type { MetadataRoute } from "next";
import { CITIES } from "@/lib/cities";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "https://marketpulse.now";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/sign-up`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/sign-in`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/market`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/legal/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/legal/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/legal/cookies`, lastModified: now, changeFrequency: "monthly", priority: 0.2 },
  ];

  // Add every city page — these are the high-value SEO landing pages
  const cityPages: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${BASE}/market/${city.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...cityPages];
}
