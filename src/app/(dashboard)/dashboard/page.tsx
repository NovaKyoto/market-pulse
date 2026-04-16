import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  FileText,
  Users,
  MapPin,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Zap,
  Mail,
  Calendar,
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
  const subscriptionActive = profile?.subscription_status === "active" || profile?.subscription_status === "trialing";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {profile?.full_name?.split(" ")[0] ?? "there"}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here&apos;s what&apos;s happening with your market reports
          </p>
        </div>
        <Link href="/dashboard/reports">
          <Button className="gap-2">
            <Zap className="h-4 w-4" />
            Generate Report
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="stat-gradient-blue">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Reports
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{reportCount ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {reportCount === 0 ? "Generate your first report" : "reports generated"}
            </p>
          </CardContent>
        </Card>

        <Card className="stat-gradient-green">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Recipients
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
              <Users className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{recipientCount ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              clients receiving reports
            </p>
          </CardContent>
        </Card>

        <Card className="stat-gradient-orange">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Markets Tracked
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
              <MapPin className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{zipCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {profile?.zip_codes?.slice(0, 3).join(", ")}{zipCount > 3 ? ` +${zipCount - 3} more` : ""}
            </p>
          </CardContent>
        </Card>

        <Card className="stat-gradient-purple">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Subscription
            </CardTitle>
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${subscriptionActive ? "bg-green-500/10" : "bg-yellow-500/10"}`}>
              {subscriptionActive ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-yellow-600" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {profile?.subscription_status === "active"
                ? "Active"
                : profile?.subscription_status === "trialing"
                ? "Trial"
                : "Inactive"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {subscriptionActive ? "Reports auto-send weekly" : "Upgrade to activate"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions + Recent Reports */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get the most out of MarketPulse</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/reports" className="block">
              <div className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Generate Report</p>
                  <p className="text-xs text-muted-foreground">AI-powered market analysis</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>

            <Link href="/dashboard/recipients" className="block">
              <div className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-500/10">
                  <Mail className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Add Recipients</p>
                  <p className="text-xs text-muted-foreground">Grow your client list</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>

            <Link href="/dashboard/settings" className="block">
              <div className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-orange-500/10">
                  <Calendar className="h-4 w-4 text-orange-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Manage Settings</p>
                  <p className="text-xs text-muted-foreground">Branding & billing</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Reports</CardTitle>
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
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="font-medium">No reports yet</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                  Generate your first AI-powered market report to start impressing your clients.
                </p>
                <Link href="/dashboard/reports" className="mt-4">
                  <Button size="sm" className="gap-2">
                    <Zap className="h-3 w-3" />
                    Generate First Report
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentReports.map((report, i) => (
                  <div key={report.id}>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {report.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {report.zip_code} &middot;{" "}
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
                        {report.status === "sent" ? "Sent" : report.status === "generated" ? "Ready" : "Pending"}
                      </Badge>
                    </div>
                    {i < recentReports.length - 1 && <Separator />}
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
