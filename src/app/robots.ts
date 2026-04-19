import type { MetadataRoute } from "next";

const BASE = (process.env.NEXT_PUBLIC_APP_URL ?? "https://marketpulse.now").trim();

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
