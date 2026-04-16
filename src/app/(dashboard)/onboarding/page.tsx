"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Zap } from "lucide-react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [brandColor, setBrandColor] = useState("#2563eb");
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [zipInput, setZipInput] = useState("");
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  function addZip() {
    const zip = zipInput.trim();
    if (zip.length === 5 && /^\d+$/.test(zip) && !zipCodes.includes(zip)) {
      setZipCodes([...zipCodes, zip]);
      setZipInput("");
    }
  }

  async function finish() {
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("profiles")
      .update({
        business_name: businessName,
        brand_color: brandColor,
        zip_codes: zipCodes,
        onboarding_complete: true,
      })
      .eq("id", user.id);

    window.location.href = "/dashboard";
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Set up MarketPulse</CardTitle>
          <CardDescription>Step {step} of 2</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input
                  placeholder="Smith Realty Group"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Brand Color</Label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="h-10 w-10 rounded border cursor-pointer"
                  />
                  <Input
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="w-28"
                  />
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => setStep(2)}
                disabled={!businessName}
              >
                Next
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Add ZIP Codes to Track</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="77001"
                    value={zipInput}
                    onChange={(e) => setZipInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addZip())}
                    maxLength={5}
                  />
                  <Button type="button" variant="outline" onClick={addZip}>
                    Add
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {zipCodes.map((zip) => (
                  <Badge key={zip} variant="secondary" className="gap-1">
                    {zip}
                    <button
                      onClick={() =>
                        setZipCodes(zipCodes.filter((z) => z !== zip))
                      }
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={finish}
                  disabled={zipCodes.length === 0 || saving}
                >
                  {saving ? "Setting up..." : "Start Using MarketPulse"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
