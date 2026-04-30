"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Check, Send, Sparkles } from "lucide-react";

const AGENT_COUNT_OPTIONS = [
  "1-5 agents",
  "6-10 agents",
  "11-25 agents",
  "26-50 agents",
  "51-100 agents",
  "100+ agents",
];

export function TeamsWaitlistForm() {
  const [brokerageName, setBrokerageName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [agentCount, setAgentCount] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/teams-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brokerageName,
          contactName,
          contactEmail,
          agentCount,
          message,
        }),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data.error ?? "Submission failed");
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <Card className="border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/10 shadow-xl">
        <CardContent className="p-8 sm:p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 mb-4 shadow-lg">
            <Check className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">You&apos;re on the waitlist</h3>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            We&apos;ll reach out personally before launch with a discounted founding-brokerage
            offer. Check your inbox — you&apos;ll get a confirmation shortly.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Coming Soon
        </div>
        <h3 className="text-2xl font-bold tracking-tight">Join the Teams waitlist</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Be the first brokerage to use MarketPulse Teams. Founding brokerages get lifetime pricing.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="brokerageName">Brokerage name</Label>
              <Input
                id="brokerageName"
                placeholder="Smith Realty Group"
                value={brokerageName}
                onChange={(e) => setBrokerageName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contactName">Your name</Label>
              <Input
                id="contactName"
                placeholder="Jane Smith"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contactEmail">Work email</Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="jane@smithrealty.com"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="agentCount">How many agents?</Label>
            <select
              id="agentCount"
              value={agentCount}
              onChange={(e) => setAgentCount(e.target.value)}
              required
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Select team size...</option>
              {AGENT_COUNT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">Anything else? (optional)</Label>
            <textarea
              id="message"
              placeholder="What problems are you trying to solve? Any specific features you'd want?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-md">
              {error}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full gap-2 shadow-lg"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Get Early Access
              </>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            We&apos;ll never share your info. Unsubscribe anytime.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
