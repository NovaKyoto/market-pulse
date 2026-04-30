"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Eye,
  MousePointerClick,
  Mail,
  Flame,
  TrendingUp,
  AlertCircle,
  User,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { EmptyState } from "@/components/dashboard/empty-state";

interface EmailEvent {
  id: string;
  recipient_email: string;
  recipient_name: string | null;
  event_type: string;
  report_id: string | null;
  created_at: string;
  metadata: {
    subject?: string;
  } | null;
}

interface LeadScore {
  email: string;
  name: string | null;
  opens: number;
  clicks: number;
  delivered: number;
  lastActivity: string;
  score: "hot" | "warm" | "cold";
}

export default function EngagementPage() {
  const [events, setEvents] = useState<EmailEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadEvents() {
    const { data } = await supabase
      .from("email_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    setEvents((data as EmailEvent[]) ?? []);
    setLoading(false);
  }

  // Aggregate per recipient
  const leads: LeadScore[] = (() => {
    const map = new Map<string, { name: string | null; opens: number; clicks: number; delivered: number; lastActivity: string }>();
    for (const e of events) {
      const existing = map.get(e.recipient_email) ?? { name: e.recipient_name, opens: 0, clicks: 0, delivered: 0, lastActivity: e.created_at };
      if (e.event_type === "opened") existing.opens++;
      if (e.event_type === "clicked") existing.clicks++;
      if (e.event_type === "delivered") existing.delivered++;
      if (!existing.name && e.recipient_name) existing.name = e.recipient_name;
      if (new Date(e.created_at) > new Date(existing.lastActivity)) existing.lastActivity = e.created_at;
      map.set(e.recipient_email, existing);
    }

    return Array.from(map.entries())
      .map(([email, data]) => ({
        email,
        ...data,
        score: (data.opens >= 3 || data.clicks >= 1 ? "hot" : data.opens >= 1 ? "warm" : "cold") as "hot" | "warm" | "cold",
      }))
      .sort((a, b) => {
        const scoreOrder = { hot: 0, warm: 1, cold: 2 };
        if (scoreOrder[a.score] !== scoreOrder[b.score]) return scoreOrder[a.score] - scoreOrder[b.score];
        return b.opens + b.clicks - (a.opens + a.clicks);
      });
  })();

  const totalOpens = events.filter((e) => e.event_type === "opened").length;
  const totalClicks = events.filter((e) => e.event_type === "clicked").length;
  const totalDelivered = events.filter((e) => e.event_type === "delivered").length;
  const hotLeads = leads.filter((l) => l.score === "hot");
  const openRate = totalDelivered > 0 ? Math.round((totalOpens / totalDelivered) * 100) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Engagement" }]}
        title="Engagement"
        description="Track who opens your reports and identify your hottest leads"
      />
      <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Delivered" value={totalDelivered} description="emails sent successfully" icon={Mail} accent="blue" />
        <StatCard label="Opens" value={totalOpens} description={`${openRate}% open rate`} icon={Eye} accent="emerald" />
        <StatCard label="Clicks" value={totalClicks} description="link clicks" icon={MousePointerClick} accent="purple" />
        <StatCard label="Hot Leads" value={hotLeads.length} description="3+ opens or clicked a link" icon={Flame} accent="amber" />
      </div>

      {/* Hot Leads */}
      {hotLeads.length > 0 && (
        <Card className="border-orange-200 bg-orange-50/50 dark:border-orange-900 dark:bg-orange-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              Hot Leads
            </CardTitle>
            <CardDescription>
              These contacts are actively engaging with your reports — reach out now!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hotLeads.map((lead) => (
                <div key={lead.email} className="flex items-center justify-between rounded-lg border bg-background p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                      <Flame className="h-4 w-4 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{lead.name || lead.email}</p>
                      {lead.name && <p className="text-xs text-muted-foreground">{lead.email}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{lead.opens} opens</span>
                    <span className="flex items-center gap-1"><MousePointerClick className="h-3 w-3" />{lead.clicks} clicks</span>
                    <span>{new Date(lead.lastActivity).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Contacts Engagement */}
      <Card>
        <CardHeader>
          <CardTitle>All Contacts</CardTitle>
          <CardDescription>Engagement ranked by activity level</CardDescription>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <EmptyState
              icon={Mail}
              title="No engagement data yet"
              description="Send your first report to start tracking opens and clicks. Hot leads will appear here automatically."
            />
          ) : (
            <div className="space-y-2">
              {leads.map((lead) => (
                <div key={lead.email} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{lead.name || lead.email}</p>
                      {lead.name && <p className="text-xs text-muted-foreground">{lead.email}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{lead.opens}</span>
                      <span className="flex items-center gap-1"><MousePointerClick className="h-3 w-3" />{lead.clicks}</span>
                    </div>
                    <Badge
                      variant={lead.score === "hot" ? "destructive" : lead.score === "warm" ? "default" : "secondary"}
                      className="text-[10px] px-1.5"
                    >
                      {lead.score === "hot" && <Flame className="h-2.5 w-2.5 mr-0.5" />}
                      {lead.score === "warm" && <TrendingUp className="h-2.5 w-2.5 mr-0.5" />}
                      {lead.score === "cold" && <AlertCircle className="h-2.5 w-2.5 mr-0.5" />}
                      {lead.score}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
