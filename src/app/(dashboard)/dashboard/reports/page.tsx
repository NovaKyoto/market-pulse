"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
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
  Share2,
  Copy,
  Check,
  MessageSquare,
  Download,
  Image,
  Search,
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
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [socialPost, setSocialPost] = useState<{ reportId: string; platform: string; text: string } | null>(null);
  const [postCopied, setPostCopied] = useState(false);
  const [customZip, setCustomZip] = useState("");
  const [sendToRecipients, setSendToRecipients] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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

  async function generateReport(zipCode?: string) {
    setGenerating(true);
    try {
      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(zipCode ? { zipCode } : {}),
          sendToRecipients,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to generate");
      }
      await loadReports();
      setCustomZip("");
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  }

  function copyShareLink(reportId: string) {
    const url = `${window.location.origin}/report/${reportId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(reportId);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function generateSocialPost(reportId: string, platform: string) {
    setSocialLoading(`${reportId}-${platform}`);
    try {
      const res = await fetch("/api/social-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId, platform }),
      });
      if (!res.ok) throw new Error("Failed to generate post");
      const data = await res.json();
      setSocialPost({ reportId, platform, text: data.post });
    } catch (err) {
      console.error(err);
    } finally {
      setSocialLoading(null);
    }
  }

  function copySocialPost() {
    if (!socialPost) return;
    navigator.clipboard.writeText(socialPost.text);
    setPostCopied(true);
    setTimeout(() => setPostCopied(false), 2000);
  }

  function formatCurrency(val: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Reports" }]}
        title="Reports"
        description="Generate AI-powered market reports for any US ZIP code"
      />
      <div className="space-y-6">

      {/* Location Picker */}
      <Card>
        <CardContent className="p-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  ZIP Code
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter any US ZIP code (e.g. 77007, 90210, 33101)"
                    value={customZip}
                    onChange={(e) => setCustomZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                    className="pl-9"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && customZip.length === 5 && !generating) {
                        generateReport(customZip);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="flex items-end gap-2">
                <Button
                  onClick={() => generateReport(customZip || undefined)}
                  disabled={generating || (customZip.length > 0 && customZip.length < 5)}
                  className="gap-2 h-9"
                >
                  {generating ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />Generating...</>
                  ) : (
                    <><Zap className="h-4 w-4" />{customZip ? "Generate for this ZIP" : "Generate All Saved"}</>
                  )}
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendToRecipients}
                  onChange={(e) => setSendToRecipients(e.target.checked)}
                  className="rounded border-input"
                />
                <span className="text-xs text-muted-foreground">Send to recipients after generating</span>
              </label>
              {!customZip && (
                <span className="text-xs text-muted-foreground">
                  Leave ZIP empty to generate reports for all your saved locations
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {generating && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-4 py-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
            <div>
              <p className="font-medium">Generating your market report{customZip ? ` for ${customZip}` : ""}...</p>
              <p className="text-sm text-muted-foreground">
                Fetching real market data and writing AI insights. This takes about 15-30 seconds.
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
          <CardContent>
            <EmptyState
              icon={FileText}
              title="No reports yet"
              description="Generate your first AI-powered market report. Use the input above to enter any US ZIP code."
            />
          </CardContent>
        </Card>
      ) : (() => {
        const q = searchQuery.toLowerCase();
        const filtered = q
          ? reports.filter(
              (r) =>
                r.title.toLowerCase().includes(q) ||
                r.zip_code.includes(q) ||
                r.market_data?.city?.toLowerCase().includes(q) ||
                r.market_data?.state?.toLowerCase().includes(q)
            )
          : reports;
        return (
        <div className="space-y-4">
          {reports.length > 3 && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, ZIP, city, or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          )}
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              No reports match &quot;{searchQuery}&quot;
            </p>
          ) : filtered.map((report) => {
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

                    {/* Share & Social */}
                    <div className="px-4 py-3 border-t bg-muted/20">
                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5"
                          onClick={(e) => { e.stopPropagation(); copyShareLink(report.id); }}
                        >
                          {copiedId === report.id ? (
                            <><Check className="h-3.5 w-3.5 text-green-600" />Copied!</>
                          ) : (
                            <><Share2 className="h-3.5 w-3.5" />Share Link</>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5"
                          onClick={(e) => { e.stopPropagation(); window.open(`/api/report-pdf?id=${report.id}`, "_blank"); }}
                        >
                          <Download className="h-3.5 w-3.5" />PDF
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5"
                          onClick={(e) => { e.stopPropagation(); window.open(`/api/social-image?id=${report.id}&platform=instagram`, "_blank"); }}
                        >
                          <Image className="h-3.5 w-3.5" />Social Image
                        </Button>
                        <Separator orientation="vertical" className="h-6" />
                        <span className="text-xs text-muted-foreground">Generate post:</span>
                        {([
                          { platform: "instagram", label: "Instagram" },
                          { platform: "facebook", label: "Facebook" },
                          { platform: "linkedin", label: "LinkedIn" },
                          { platform: "twitter", label: "X" },
                        ] as const).map(({ platform, label }) => (
                          <Button
                            key={platform}
                            variant="ghost"
                            size="sm"
                            className="gap-1.5 h-8 px-2.5"
                            disabled={socialLoading === `${report.id}-${platform}`}
                            onClick={(e) => { e.stopPropagation(); generateSocialPost(report.id, platform); }}
                          >
                            {socialLoading === `${report.id}-${platform}` ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <MessageSquare className="h-3.5 w-3.5" />
                            )}
                            {label}
                          </Button>
                        ))}
                      </div>

                      {/* Social Post Result */}
                      {socialPost && socialPost.reportId === report.id && (
                        <div className="mt-3 rounded-lg border bg-background p-3">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="text-xs capitalize">{socialPost.platform}</Badge>
                            <Button variant="ghost" size="sm" className="gap-1 h-7" onClick={copySocialPost}>
                              {postCopied ? (
                                <><Check className="h-3 w-3 text-green-600" />Copied</>
                              ) : (
                                <><Copy className="h-3 w-3" />Copy</>
                              )}
                            </Button>
                          </div>
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">{socialPost.text}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
        );
      })()}
      </div>
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
