import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://marketpulse.now").trim();

export const metadata: Metadata = {
  title: {
    default: "MarketPulse - Automated AI Market Reports for Realtors",
    template: "%s | MarketPulse",
  },
  description:
    "AI generates branded weekly market reports and emails them to your client list. Real data, professional insights, zero ongoing work.",
  metadataBase: new URL(APP_URL),
  keywords: [
    "real estate market report",
    "automated market reports",
    "realtor marketing",
    "AI real estate",
    "weekly market update",
    "real estate agent tools",
    "CMA alternative",
    "market analysis",
  ],
  openGraph: {
    type: "website",
    title: "MarketPulse - Automated AI Market Reports for Realtors",
    description:
      "AI analyzes real market data for your zip codes and writes branded reports emailed to your clients every week. You stay top-of-mind without doing a thing.",
    siteName: "MarketPulse",
    url: APP_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "MarketPulse - AI Market Reports for Realtors",
    description:
      "Branded weekly market reports, powered by AI. Real data, zero effort.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
