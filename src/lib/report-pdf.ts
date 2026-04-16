import type { MarketData } from "@/types";
import { formatCurrency, formatPercent } from "./market-data";

/**
 * Generates HTML for a market report that can be rendered to PDF via Puppeteer.
 * The HTML is a self-contained, print-optimized document.
 */
export function generateReportHtml(params: {
  title: string;
  summary: string;
  insights: string;
  marketData: MarketData;
  agentName: string;
  businessName: string;
  brandColor: string;
  logoUrl?: string;
}): string {
  const {
    title,
    summary,
    insights,
    marketData,
    agentName,
    businessName,
    brandColor,
  } = params;

  const stats = [
    { label: "Median Price", value: formatCurrency(marketData.median_price) },
    { label: "Price Change", value: formatPercent(marketData.price_change_pct) },
    { label: "Days on Market", value: String(marketData.avg_days_on_market) },
    { label: "Active Listings", value: String(marketData.active_listings) },
    { label: "Sold (30 days)", value: String(marketData.sold_last_30) },
    { label: "Price/Sq Ft", value: formatCurrency(marketData.price_per_sqft) },
    { label: "Inventory", value: `${marketData.inventory_months} months` },
    ...(marketData.median_rent
      ? [{ label: "Median Rent", value: formatCurrency(marketData.median_rent) }]
      : []),
  ];

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    @page { margin: 0.75in; size: letter; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1f2937; line-height: 1.6; }
    .header { background: ${brandColor}; color: white; padding: 32px; border-radius: 8px; margin-bottom: 24px; }
    .header h1 { font-size: 24px; font-weight: 700; }
    .header p { opacity: 0.85; margin-top: 4px; font-size: 13px; }
    .summary { background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid ${brandColor}; margin-bottom: 24px; font-size: 15px; color: #4b5563; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
    .stat { background: #f9fafb; padding: 16px; border-radius: 8px; text-align: center; }
    .stat-value { font-size: 22px; font-weight: 700; color: ${brandColor}; }
    .stat-label { font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px; }
    .insights { font-size: 14px; line-height: 1.8; }
    .insights p { margin-bottom: 12px; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 11px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${businessName}</h1>
    <p>Weekly Market Report | ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
  </div>

  <h2 style="font-size:20px; margin-bottom:12px;">${title}</h2>
  <div class="summary">${summary}</div>

  <div class="stats-grid">
    ${stats.map((s) => `<div class="stat"><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`).join("")}
  </div>

  <div class="insights">
    ${insights
      .split("\n")
      .filter(Boolean)
      .map((p) => `<p>${p}</p>`)
      .join("")}
  </div>

  <div class="footer">
    <p>Prepared by ${agentName} at ${businessName} | Data for ZIP ${marketData.zip_code}</p>
    <p>Powered by MarketPulse</p>
  </div>
</body>
</html>`;
}
