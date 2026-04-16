import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Home,
  BarChart3,
  Layers,
  MapPin,
  Zap,
} from "lucide-react";

function getPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
  );
}

function formatCurrency(val: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(val);
}

export default async function PublicReportPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const supabase = getPublicClient();

  const { data: report } = await supabase
    .from("reports")
    .select("*, profiles:user_id(full_name, business_name, brand_color)")
    .eq("id", id)
    .single();

  if (!report) notFound();

  const md = report.market_data as Record<string, number | string | null> | null;
  const profile = report.profiles as Record<string, string | null> | null;
  const brandColor = profile?.brand_color ?? "#4f46e5";
  const businessName = profile?.business_name ?? "MarketPulse";
  const agentName = profile?.full_name ?? "";

  const stats = md
    ? [
        { icon: DollarSign, label: "Median Price", value: formatCurrency((md.median_price as number) ?? 0), trend: md.price_change_pct as number },
        { icon: Clock, label: "Days on Market", value: String(md.avg_days_on_market ?? "—") },
        { icon: Home, label: "Active Listings", value: String(md.active_listings ?? "—") },
        { icon: BarChart3, label: "Price/Sq Ft", value: formatCurrency((md.price_per_sqft as number) ?? 0) },
        { icon: Layers, label: "Inventory", value: `${md.inventory_months ?? "—"} months` },
        { icon: TrendingUp, label: "Sold (30 days)", value: String(md.sold_last_30 ?? "—") },
      ]
    : [];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div
        className="py-12 px-4"
        style={{ background: `linear-gradient(135deg, ${brandColor}, ${brandColor}dd)` }}
      >
        <div className="mx-auto max-w-3xl text-center text-white">
          <p className="text-sm font-medium opacity-80 mb-2">{businessName}</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            {report.title}
          </h1>
          <div className="flex items-center justify-center gap-3 mt-4 text-sm opacity-80">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {report.zip_code}
              {md?.city && ` (${md.city}, ${md.state})`}
            </span>
            <span>
              {new Date(report.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          {agentName && (
            <p className="mt-3 text-sm opacity-70">
              Prepared by {agentName}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
        {/* Summary */}
        {report.summary && (
          <Card>
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed text-foreground/90">
                {report.summary}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        {stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                    <stat.icon className="h-4 w-4" />
                    <span className="text-xs font-medium">{stat.label}</span>
                  </div>
                  <p className="text-xl font-bold">{stat.value}</p>
                  {stat.trend !== undefined && stat.trend !== null && (
                    <div
                      className={`flex items-center gap-0.5 text-xs mt-1 ${
                        (stat.trend as number) >= 0 ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {(stat.trend as number) >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {(stat.trend as number) > 0 ? "+" : ""}
                      {Number(stat.trend).toFixed(1)}% YoY
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* AI Insights */}
        {report.ai_insights && (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Market Analysis</h2>
              <div className="prose prose-sm max-w-none text-foreground/85 leading-relaxed whitespace-pre-wrap">
                {report.ai_insights}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <Separator />
        <div className="text-center py-4">
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
            <Zap className="h-4 w-4" />
            Powered by MarketPulse
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            AI-powered market reports for real estate professionals
          </p>
        </div>
      </div>
    </div>
  );
}
