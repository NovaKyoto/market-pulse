"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  Zap,
  FileText,
  Send,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
  Home,
  Clock,
  DollarSign,
  BarChart3,
} from "lucide-react";

interface Report {
  id: string;
  title: string;
  summary: string | null;
  ai_insights: string | null;
  zip_code: string;
  status: string;
  created_at: string;
  sent_at: string | null;
  market_data: {
    median_price?: number;
    price_change_pct?: number;
    avg_days_on_market?: number;
    active_listings?: number;
    sold_last_30?: number;
    price_per_sqft?: number;
    inventory_months?: number;
    median_rent?: number;
    city?: string;
    state?: string;
  } | null;
}

export default function ReportsPage() {
  const [generating, setGenerating] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadReports() {
    const { data } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });
    setReports((data as Report[]) ?? []);
    setLoading(false);
  }

  async function generateReport() {
    setGenerating(true);
    try {
      const res = await fetch("/api/generate-report", { method: "POST" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to generate");
      }
      await loadReports();
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  }

  function formatCurrency(val: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="mt-1 text-muted-foreground">
            Generate AI-powered market reports for your zip codes
          </p>
        </div>
        <Button onClick={generateReport} disabled={generating} className="gap-2">
          {generating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4" />
              Generate Report
            </>
          )}
        </Button>
      </div>

      {generating && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-4 py-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
            <div>
              <p className="font-medium">Generating your market report...</p>
              <p className="text-sm text-muted-foreground">
                Fetching market data and writing AI insights. This takes about 15-30 seconds.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : reports.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-4">
              <FileText className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No reports yet</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-md">
              Click &quot;Generate Report&quot; to create your first AI-powered market
              analysis. It uses real data for your configured zip codes.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => {
            const expanded = expandedId === report.id;
            const md = report.market_data;

            return (
              <Card key={report.id} className="overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setExpandedId(expanded ? null : report.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-sm truncate">
                        {report.title}
                      </h3>
                      <Badge
                        variant={report.status === "sent" ? "default" : "secondary"}
                        className="shrink-0"
                      >
                        {report.status === "sent" ? (
                          <><Send className="mr-1 h-3 w-3" />Sent</>
                        ) : (
                          <><FileText className="mr-1 h-3 w-3" />Ready</>
                        )}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {report.zip_code}
                        {md?.city && ` (${md.city}, ${md.state})`}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(report.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  {expanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
                  )}
                </div>

                {expanded && (
                  <div className="border-t">
                    {/* Market Stats Grid */}
                    {md && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-muted/30">
                        <StatCard
                          icon={<DollarSign className="h-4 w-4" />}
                          label="Median Price"
                          value={formatCurrency(md.median_price ?? 0)}
                          trend={md.price_change_pct}
                        />
                        <StatCard
                          icon={<Clock className="h-4 w-4" />}
                          label="Days on Market"
                          value={String(md.avg_days_on_market ?? "—")}
                        />
                        <StatCard
                          icon={<Home className="h-4 w-4" />}
                          label="Active Listings"
                          value={String(md.active_listings ?? "—")}
                        />
                        <StatCard
                          icon={<BarChart3 className="h-4 w-4" />}
                          label="Price/Sq Ft"
                          value={formatCurrency(md.price_per_sqft ?? 0)}
                        />
                      </div>
                    )}

                    {/* Summary */}
                    {report.summary && (
                      <div className="px-4 py-3 border-t">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Summary</p>
                        <p className="text-sm leading-relaxed">{report.summary}</p>
                      </div>
                    )}

                    {/* AI Insights */}
                    {report.ai_insights && (
                      <div className="px-4 py-3 border-t">
                        <p className="text-sm font-medium text-muted-foreground mb-2">AI Insights</p>
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">
                          {report.ai_insights}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: number;
}) {
  return (
    <div className="rounded-lg bg-background p-3 border">
      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-lg font-bold">{value}</p>
      {trend !== undefined && (
        <div
          className={`flex items-center gap-0.5 text-xs mt-0.5 ${
            trend >= 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {trend >= 0 ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {trend > 0 ? "+" : ""}
          {trend.toFixed(1)}% YoY
        </div>
      )}
    </div>
  );
}
