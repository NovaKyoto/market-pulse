import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import Link from "next/link";
import {
  FileText,
  Users,
  MapPin,
  ArrowRight,
  Zap,
  Mail,
  Calendar,
  CreditCard,
  Sparkles,
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ count: reportCount }, { count: recipientCount }, { data: profile }, { data: recentReports }] =
    await Promise.all([
      supabase.from("reports").select("*", { count: "exact", head: true }).eq("user_id", user!.id),
      supabase.from("recipients").select("*", { count: "exact", head: true }).eq("user_id", user!.id),
      supabase.from("profiles").select("*").eq("id", user!.id).single(),
      supabase
        .from("reports")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  const zipCount = profile?.zip_codes?.length ?? 0;
  const subStatus = profile?.subscription_status;
  const isActive = subStatus === "active";
  const isTrialing = subStatus === "trialing";

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Dashboard" }]}
        title={`Welcome back, ${profile?.full_name?.split(" ")[0] ?? "there"}`}
        description="Here's what's happening with your market reports"
        actions={
          <Link href="/dashboard/reports">
            <Button className="gap-2 shadow-sm">
              <Zap className="h-4 w-4" />
              Generate Report
            </Button>
          </Link>
        }
      />

      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Reports"
            value={reportCount ?? 0}
            description={reportCount === 0 ? "Generate your first report" : "reports generated"}
            icon={FileText}
            accent="blue"
          />
          <StatCard
            label="Recipients"
            value={recipientCount ?? 0}
            description="clients receiving reports"
            icon={Users}
            accent="emerald"
          />
          <StatCard
            label="Markets Tracked"
            value={zipCount}
            description={
              zipCount === 0
                ? "Add ZIP codes in settings"
                : profile?.zip_codes?.slice(0, 3).join(", ") +
                  (zipCount > 3 ? ` +${zipCount - 3}` : "")
            }
            icon={MapPin}
            accent="amber"
          />
          <StatCard
            label="Subscription"
            value={isActive ? "Active" : isTrialing ? "Trial" : "Inactive"}
            description={
              isActive
                ? "Reports auto-send weekly"
                : isTrialing
                ? "14-day free trial"
                : "Upgrade to activate"
            }
            icon={CreditCard}
            accent={isActive ? "emerald" : isTrialing ? "amber" : "rose"}
          />
        </div>

        {/* Quick Actions + Recent Reports */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
              <CardDescription>Get the most out of MarketPulse</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                {
                  href: "/dashboard/reports",
                  label: "Generate Report",
                  desc: "AI-powered market analysis",
                  icon: Zap,
                  accent: "from-blue-500 to-indigo-600",
                },
                {
                  href: "/dashboard/recipients",
                  label: "Add Recipients",
                  desc: "Grow your client list",
                  icon: Mail,
                  accent: "from-emerald-500 to-teal-600",
                },
                {
                  href: "/dashboard/compare",
                  label: "Compare Markets",
                  desc: "Two ZIPs side-by-side",
                  icon: Sparkles,
                  accent: "from-purple-500 to-pink-600",
                },
                {
                  href: "/dashboard/settings",
                  label: "Settings",
                  desc: "Branding & billing",
                  icon: Calendar,
                  accent: "from-amber-500 to-orange-600",
                },
              ].map((action) => (
                <Link key={action.href} href={action.href} className="block group">
                  <div className="flex items-center gap-3 rounded-lg border bg-background p-3 transition-all hover:border-primary/40 hover:shadow-sm">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${action.accent} shadow-md`}
                    >
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{action.label}</p>
                      <p className="text-xs text-muted-foreground">{action.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Recent Reports</CardTitle>
                <CardDescription>Your latest market analyses</CardDescription>
              </div>
              {(recentReports?.length ?? 0) > 0 && (
                <Link href="/dashboard/reports">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View all
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              )}
            </CardHeader>
            <CardContent>
              {!recentReports || recentReports.length === 0 ? (
                <EmptyState
                  icon={FileText}
                  title="No reports yet"
                  description="Generate your first AI-powered market report to start impressing your clients."
                  action={
                    <Link href="/dashboard/reports">
                      <Button size="sm" className="gap-2">
                        <Zap className="h-3 w-3" />
                        Generate First Report
                      </Button>
                    </Link>
                  }
                />
              ) : (
                <div className="space-y-1">
                  {recentReports.map((report, i) => (
                    <div key={report.id}>
                      <Link
                        href="/dashboard/reports"
                        className="flex items-center justify-between py-3 px-2 -mx-2 rounded-md hover:bg-muted transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{report.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            <span className="font-mono">{report.zip_code}</span>{" "}
                            &middot;{" "}
                            {new Date(report.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <Badge
                          variant={report.status === "sent" ? "default" : "secondary"}
                          className="ml-2 shrink-0"
                        >
                          {report.status === "sent"
                            ? "Sent"
                            : report.status === "generated"
                            ? "Ready"
                            : "Pending"}
                        </Badge>
                      </Link>
                      {i < recentReports.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
