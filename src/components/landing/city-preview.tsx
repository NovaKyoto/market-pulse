"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Search,
  MapPin,
  DollarSign,
  Clock,
  Home,
  BarChart3,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Sparkles,
  Layers,
} from "lucide-react";

interface MarketPreview {
  median_price: number;
  price_change_pct: number;
  avg_days_on_market: number;
  active_listings: number;
  price_per_sqft: number;
  inventory_months: number;
  sold_last_30: number;
  city: string;
  state: string;
  zip_code: string;
}

function formatCurrency(val: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(val);
}

export function CityPreview() {
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MarketPreview | null>(null);
  const [error, setError] = useState("");

  async function handlePreview(zipCode: string) {
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await fetch(`/api/public-preview?zip=${zipCode}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not fetch market data");
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (zip.length === 5) handlePreview(zip);
  }

  const isSellers = data ? (data.inventory_months ?? 6) < 4 : false;
  const priceUp = data ? (data.price_change_pct ?? 0) >= 0 : false;

  return (
    <div className="w-full">
      {/* Input */}
      <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter a US ZIP code (e.g., 77007)"
              value={zip}
              onChange={(e) => {
                setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
                setError("");
              }}
              className="pl-10 h-12 text-base"
              inputMode="numeric"
              maxLength={5}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={zip.length !== 5 || loading}
            className="gap-2 h-12 px-6"
          >
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" />Loading...</>
            ) : (
              <><Search className="h-4 w-4" />See Your Market</>
            )}
          </Button>
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">Try:</span>
          {[
            { zip: "77007", label: "Houston" },
            { zip: "90210", label: "Beverly Hills" },
            { zip: "33101", label: "Miami" },
            { zip: "78701", label: "Austin" },
          ].map((ex) => (
            <button
              key={ex.zip}
              type="button"
              onClick={() => {
                setZip(ex.zip);
                handlePreview(ex.zip);
              }}
              className="text-xs text-primary hover:underline"
            >
              {ex.label}
            </button>
          ))}
        </div>
        {error && <p className="mt-2 text-sm text-center text-red-500">{error}</p>}
      </form>

      {/* Preview Result */}
      {data && (
        <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="overflow-hidden border-2 shadow-2xl max-w-3xl mx-auto">
            {/* Report Header */}
            <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-6 sm:p-8">
              <div className="absolute top-0 right-0 h-40 w-40 bg-white/10 rounded-full blur-3xl" />
              <div className="relative">
                <Badge className="mb-3 bg-white/20 hover:bg-white/20 text-white border-white/30">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Sample Report · This is what your clients would see
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                  {data.city && data.state
                    ? `${data.city}, ${data.state} Market Update`
                    : `ZIP ${data.zip_code} Market Update`}
                </h3>
                <p className="mt-2 text-sm text-white/80">
                  Live data from Redfin · Updated today
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <CardContent className="p-0">
              <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-border">
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                    <DollarSign className="h-3.5 w-3.5" />
                    <span className="text-xs">Median Price</span>
                  </div>
                  <p className="text-2xl font-bold">{formatCurrency(data.median_price)}</p>
                  <div
                    className={`mt-1 flex items-center gap-0.5 text-xs font-medium ${
                      priceUp ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {priceUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {data.price_change_pct > 0 ? "+" : ""}
                    {data.price_change_pct.toFixed(1)}% YoY
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-xs">Days on Market</span>
                  </div>
                  <p className="text-2xl font-bold">{data.avg_days_on_market}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {data.avg_days_on_market < 30 ? "Fast-moving" : "Normal pace"}
                  </p>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                    <Home className="h-3.5 w-3.5" />
                    <span className="text-xs">Active Listings</span>
                  </div>
                  <p className="text-2xl font-bold">{data.active_listings}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{data.sold_last_30} sold (30d)</p>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                    <BarChart3 className="h-3.5 w-3.5" />
                    <span className="text-xs">Price / Sq Ft</span>
                  </div>
                  <p className="text-2xl font-bold">{formatCurrency(data.price_per_sqft)}</p>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                    <Layers className="h-3.5 w-3.5" />
                    <span className="text-xs">Months of Inventory</span>
                  </div>
                  <p className="text-2xl font-bold">{data.inventory_months}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {isSellers ? "Seller's market" : data.inventory_months > 6 ? "Buyer's market" : "Balanced"}
                  </p>
                </div>
                <div className="p-5 bg-primary/5">
                  <div className="flex items-center gap-1.5 text-primary mb-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">AI Insights</span>
                  </div>
                  <p className="text-xs leading-relaxed text-foreground">
                    {isSellers
                      ? "Tight inventory and strong demand. Sellers hold leverage."
                      : data.inventory_months > 6
                      ? "Buyers have more options and negotiating power here."
                      : "Balanced market — buyers and sellers on equal footing."}
                  </p>
                </div>
              </div>
            </CardContent>

            {/* CTA in-card */}
            <div className="p-5 bg-muted/30 border-t text-center">
              <p className="text-sm text-muted-foreground">
                This is <strong className="text-foreground">your branded report</strong> — your
                name, your logo, sent automatically to your clients every week.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
                <Link href="/sign-up">
                  <Button className="gap-2">
                    Start 14-Day Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/founding">
                  <Button variant="outline">
                    Founding 5 Offer — 50% Off Forever
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
