"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  ArrowLeftRight,
  MapPin,
  DollarSign,
  Clock,
  Home,
  BarChart3,
  Layers,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";

interface MarketData {
  zip_code: string;
  city: string;
  state: string;
  median_price: number;
  price_change_pct: number;
  avg_days_on_market: number;
  active_listings: number;
  price_per_sqft: number;
  inventory_months: number;
  sold_last_30: number;
  median_rent: number;
}

export default function ComparePage() {
  const [zip1, setZip1] = useState("");
  const [zip2, setZip2] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    zip1: MarketData;
    zip2: MarketData;
    analysis: string;
  } | null>(null);
  const [error, setError] = useState("");

  async function handleCompare() {
    if (!zip1 || !zip2) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zip1, zip2 }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Comparison failed");
      }
      setResult(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function fmt(val: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  }

  const metrics = result
    ? [
        { label: "Median Price", icon: DollarSign, a: fmt(result.zip1.median_price), b: fmt(result.zip2.median_price), highlight: result.zip1.median_price < result.zip2.median_price ? "a" : "b" },
        { label: "Price Change", icon: TrendingUp, a: `${result.zip1.price_change_pct > 0 ? "+" : ""}${result.zip1.price_change_pct.toFixed(1)}%`, b: `${result.zip2.price_change_pct > 0 ? "+" : ""}${result.zip2.price_change_pct.toFixed(1)}%`, highlight: result.zip1.price_change_pct > result.zip2.price_change_pct ? "a" : "b" },
        { label: "Days on Market", icon: Clock, a: String(result.zip1.avg_days_on_market), b: String(result.zip2.avg_days_on_market), highlight: result.zip1.avg_days_on_market < result.zip2.avg_days_on_market ? "a" : "b" },
        { label: "Active Listings", icon: Home, a: String(result.zip1.active_listings), b: String(result.zip2.active_listings), highlight: result.zip1.active_listings > result.zip2.active_listings ? "a" : "b" },
        { label: "Price/Sq Ft", icon: BarChart3, a: fmt(result.zip1.price_per_sqft), b: fmt(result.zip2.price_per_sqft), highlight: result.zip1.price_per_sqft < result.zip2.price_per_sqft ? "a" : "b" },
        { label: "Inventory", icon: Layers, a: `${result.zip1.inventory_months} mo`, b: `${result.zip2.inventory_months} mo`, highlight: result.zip1.inventory_months > result.zip2.inventory_months ? "a" : "b" },
      ]
    : [];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Compare" }]}
        title="Compare Markets"
        description="Compare two ZIP codes side-by-side with AI-powered analysis"
      />
      <div className="space-y-6">
      {/* Input */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 w-full">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Market A</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ZIP code (e.g. 77007)"
                  value={zip1}
                  onChange={(e) => setZip1(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  className="pl-9"
                />
              </div>
            </div>
            <ArrowLeftRight className="h-5 w-5 text-muted-foreground shrink-0 mt-4 sm:mt-5" />
            <div className="flex-1 w-full">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Market B</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ZIP code (e.g. 90210)"
                  value={zip2}
                  onChange={(e) => setZip2(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  className="pl-9"
                />
              </div>
            </div>
            <Button
              onClick={handleCompare}
              disabled={loading || zip1.length < 5 || zip2.length < 5}
              className="gap-2 mt-4 sm:mt-5 w-full sm:w-auto"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" />Comparing...</>
              ) : (
                <><ArrowLeftRight className="h-4 w-4" />Compare</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="p-4 text-sm text-destructive">{error}</CardContent>
        </Card>
      )}

      {/* Results */}
      {result && (
        <>
          {/* Side-by-side stats */}
          <div className="grid gap-3">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
              <div className="text-center">
                <Badge variant="outline" className="mb-1">{result.zip1.zip_code}</Badge>
                <p className="text-sm font-semibold">{result.zip1.city}, {result.zip1.state}</p>
              </div>
              <div className="w-8" />
              <div className="text-center">
                <Badge variant="outline" className="mb-1">{result.zip2.zip_code}</Badge>
                <p className="text-sm font-semibold">{result.zip2.city}, {result.zip2.state}</p>
              </div>
            </div>

            {/* Metric rows */}
            {metrics.map((m) => (
              <div key={m.label} className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                <Card className={m.highlight === "a" ? "border-primary/40 bg-primary/5" : ""}>
                  <CardContent className="p-3 text-center">
                    <p className="text-lg font-bold">{m.a}</p>
                    {m.highlight === "a" && (
                      <TrendingUp className="h-3 w-3 text-primary mx-auto mt-0.5" />
                    )}
                  </CardContent>
                </Card>
                <div className="flex flex-col items-center gap-0.5 w-8">
                  <m.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground text-center leading-tight">{m.label}</span>
                </div>
                <Card className={m.highlight === "b" ? "border-primary/40 bg-primary/5" : ""}>
                  <CardContent className="p-3 text-center">
                    <p className="text-lg font-bold">{m.b}</p>
                    {m.highlight === "b" && (
                      <TrendingUp className="h-3 w-3 text-primary mx-auto mt-0.5" />
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* AI Analysis */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-3">AI Comparison</h2>
              <div className="prose prose-sm max-w-none text-foreground/85 leading-relaxed whitespace-pre-wrap">
                {result.analysis}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Empty state */}
      {!result && !loading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 mb-4 ring-1 ring-border">
              <ArrowLeftRight className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Compare any two markets</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-md">
              Enter two ZIP codes above to see a head-to-head comparison with real market data and AI-powered analysis.
            </p>
          </CardContent>
        </Card>
      )}
      </div>
    </div>
  );
}
