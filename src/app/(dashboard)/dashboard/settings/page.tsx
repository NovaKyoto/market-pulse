"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Gift } from "lucide-react";
import type { Profile } from "@/types";

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [refCopied, setRefCopied] = useState(false);
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
                : "You are on a free trial"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                const res = await fetch("/api/stripe/portal", { method: "POST" });
                const { url } = await res.json();
                if (url) window.location.href = url;
              }}
            >
              Manage Billing
            </Button>
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
                  {typeof window !== "undefined" ? window.location.origin : ""}/sign-up?ref={profile.referral_code}
                </code>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5 shrink-0"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/sign-up?ref=${profile.referral_code}`);
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
