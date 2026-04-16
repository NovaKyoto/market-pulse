import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "https://market-pulse-five-ruby.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/onboarding", "/auth/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
