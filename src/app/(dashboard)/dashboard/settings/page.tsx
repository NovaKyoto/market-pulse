"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Profile } from "@/types";

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
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
