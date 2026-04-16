"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Gift, Link2, Unlink, RefreshCw, CreditCard, Loader2 } from "lucide-react";
import type { Profile } from "@/types";

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [refCopied, setRefCopied] = useState(false);
  const [billingLoading, setBillingLoading] = useState(false);
  const [billingError, setBillingError] = useState("");
  const [fubKey, setFubKey] = useState("");
  const [fubConnecting, setFubConnecting] = useState(false);
  const [fubSyncing, setFubSyncing] = useState(false);
  const [fubMessage, setFubMessage] = useState("");
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (data) setProfile(data as Profile);
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        business_name: profile.business_name,
        brand_color: profile.brand_color,
        ai_tone: profile.ai_tone ?? "professional",
      })
      .eq("id", profile.id);

    setSaving(false);
    setMessage(error ? error.message : "Settings saved!");
    setTimeout(() => setMessage(""), 3000);
  }

  if (!profile) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your profile and branding</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={profile.full_name ?? ""}
                onChange={(e) =>
                  setProfile({ ...profile, full_name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input
                value={profile.business_name ?? ""}
                onChange={(e) =>
                  setProfile({ ...profile, business_name: e.target.value })
                }
                placeholder="Smith Realty Group"
              />
            </div>
            <div className="space-y-2">
              <Label>Brand Color</Label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={profile.brand_color}
                  onChange={(e) =>
                    setProfile({ ...profile, brand_color: e.target.value })
                  }
                  className="h-10 w-10 rounded border cursor-pointer"
                />
                <Input
                  value={profile.brand_color}
                  onChange={(e) =>
                    setProfile({ ...profile, brand_color: e.target.value })
                  }
                  className="w-28"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Writing Style</CardTitle>
            <CardDescription>Choose how your market reports sound</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              {([
                { value: "professional", label: "Professional", desc: "Warm and authoritative, like a trusted advisor" },
                { value: "conversational", label: "Conversational", desc: "Casual and friendly, like texting a knowledgeable friend" },
                { value: "luxury", label: "Luxury", desc: "Sophisticated and polished, like a private wealth advisor" },
              ] as const).map((tone) => (
                <button
                  key={tone.value}
                  type="button"
                  onClick={() => setProfile({ ...profile!, ai_tone: tone.value } as Profile)}
                  className={`rounded-lg border-2 p-4 text-left transition-all ${
                    (profile?.ai_tone ?? "professional") === tone.value
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted-foreground/30"
                  }`}
                >
                  <p className="font-semibold text-sm">{tone.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{tone.desc}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>
              {profile.subscription_status === "active"
                ? "Your subscription is active"
                : profile.subscription_status === "trialing"
                ? "You are on a free trial"
                : "Subscribe to unlock weekly reports and email delivery"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {profile.subscription_status === "active" || profile.subscription_status === "trialing" ? (
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                disabled={billingLoading}
                onClick={async () => {
                  setBillingLoading(true);
                  try {
                    const res = await fetch("/api/stripe/portal", { method: "POST" });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || "Failed to open billing portal");
                    if (data.url) window.location.href = data.url;
                  } catch (err) {
                    setBillingError(err instanceof Error ? err.message : "Could not open billing portal");
                    setTimeout(() => setBillingError(""), 5000);
                  } finally {
                    setBillingLoading(false);
                  }
                }}
              >
                {billingLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
                Manage Billing
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  type="button"
                  className="gap-2"
                  disabled={billingLoading}
                  onClick={async () => {
                    setBillingLoading(true);
                    try {
                      const res = await fetch("/api/stripe/checkout", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ plan: "monthly" }),
                      });
                      const text = await res.text();
                      if (!text) throw new Error("Empty response from server — check Stripe env vars on Vercel");
                      const data = JSON.parse(text);
                      if (!res.ok) throw new Error(data.error || "Failed to start checkout");
                      if (data.url) window.location.href = data.url;
                    } catch (err) {
                      setBillingError(err instanceof Error ? err.message : "Could not start checkout");
                      setTimeout(() => setMessage(""), 4000);
                    } finally {
                      setBillingLoading(false);
                    }
                  }}
                >
                  {billingLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
                  Subscribe — $49/mo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  disabled={billingLoading}
                  onClick={async () => {
                    setBillingLoading(true);
                    try {
                      const res = await fetch("/api/stripe/checkout", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ plan: "annual" }),
                      });
                      const text = await res.text();
                      if (!text) throw new Error("Empty response from server — check Stripe env vars on Vercel");
                      const data = JSON.parse(text);
                      if (!res.ok) throw new Error(data.error || "Failed to start checkout");
                      if (data.url) window.location.href = data.url;
                    } catch (err) {
                      setBillingError(err instanceof Error ? err.message : "Could not start checkout");
                      setTimeout(() => setBillingError(""), 5000);
                    } finally {
                      setBillingLoading(false);
                    }
                  }}
                >
                  Annual — $39/mo
                  <Badge variant="secondary" className="ml-1 text-xs">Save 20%</Badge>
                </Button>
              </div>
            )}
            {billingError && (
              <p className="text-sm text-red-500">{billingError}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              Follow Up Boss Integration
            </CardTitle>
            <CardDescription>
              Connect your CRM to auto-sync contacts and log report activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            {profile.fub_api_key ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Connected</Badge>
                  <span className="text-sm text-muted-foreground">
                    Report sends will be logged as notes in FUB
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    disabled={fubSyncing}
                    onClick={async () => {
                      setFubSyncing(true);
                      setFubMessage("");
                      try {
                        const res = await fetch("/api/fub/sync", { method: "POST" });
                        const data = await res.json();
                        if (!res.ok) throw new Error(data.error);
                        setFubMessage(`Synced ${data.imported} contacts${data.skipped ? `, ${data.skipped} skipped` : ""}`);
                      } catch (err) {
                        setFubMessage(err instanceof Error ? err.message : "Sync failed");
                      } finally {
                        setFubSyncing(false);
                        setTimeout(() => setFubMessage(""), 5000);
                      }
                    }}
                  >
                    {fubSyncing ? <><RefreshCw className="h-3.5 w-3.5 animate-spin" />Syncing...</> : <><RefreshCw className="h-3.5 w-3.5" />Sync Contacts</>}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-destructive"
                    onClick={async () => {
                      await fetch("/api/fub/connect", { method: "DELETE" });
                      setProfile({ ...profile!, fub_api_key: null } as Profile);
                    }}
                  >
                    <Unlink className="h-3.5 w-3.5" />Disconnect
                  </Button>
                </div>
                {fubMessage && <p className="text-sm text-muted-foreground">{fubMessage}</p>}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Enter your Follow Up Boss API key to connect. Find it in FUB under Admin &gt; API.
                </p>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="fub_xxxxxxxxxxxxxxxxxx"
                    value={fubKey}
                    onChange={(e) => setFubKey(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="sm"
                    className="gap-1.5 shrink-0"
                    disabled={fubConnecting || fubKey.length < 10}
                    onClick={async () => {
                      setFubConnecting(true);
                      setFubMessage("");
                      try {
                        const res = await fetch("/api/fub/connect", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ apiKey: fubKey }),
                        });
                        const data = await res.json();
                        if (!res.ok) throw new Error(data.error);
                        setProfile({ ...profile!, fub_api_key: fubKey } as Profile);
                        setFubKey("");
                      } catch (err) {
                        setFubMessage(err instanceof Error ? err.message : "Connection failed");
                        setTimeout(() => setFubMessage(""), 5000);
                      } finally {
                        setFubConnecting(false);
                      }
                    }}
                  >
                    {fubConnecting ? "Verifying..." : <><Link2 className="h-3.5 w-3.5" />Connect</>}
                  </Button>
                </div>
                {fubMessage && <p className="text-sm text-red-500">{fubMessage}</p>}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Referral Program
            </CardTitle>
            <CardDescription>
              Share your referral link with other agents. When they subscribe, you both get 1 free month!
            </CardDescription>
          </CardHeader>
          <CardContent>
            {profile.referral_code ? (
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded-md border bg-muted px-3 py-2 text-sm font-mono">
                  {process.env.NEXT_PUBLIC_APP_URL ?? ""}/sign-up?ref={profile.referral_code}
                </code>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5 shrink-0"
                  onClick={() => {
                    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL ?? window.location.origin}/sign-up?ref=${profile.referral_code}`);
                    setRefCopied(true);
                    setTimeout(() => setRefCopied(false), 2000);
                  }}
                >
                  {refCopied ? <><Check className="h-3.5 w-3.5 text-green-600" />Copied</> : <><Copy className="h-3.5 w-3.5" />Copy</>}
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Your referral code will be generated automatically. Save your settings to activate it.
              </p>
            )}
          </CardContent>
        </Card>

        <Separator />

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
          {message && (
            <p className="text-sm text-muted-foreground">{message}</p>
          )}
        </div>
      </form>
    </div>
  );
}
