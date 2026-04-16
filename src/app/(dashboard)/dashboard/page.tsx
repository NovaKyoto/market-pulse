import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, MapPin, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ count: reportCount }, { count: recipientCount }, { data: profile }] =
    await Promise.all([
      supabase.from("reports").select("*", { count: "exact", head: true }).eq("user_id", user!.id),
      supabase.from("recipients").select("*", { count: "exact", head: true }).eq("user_id", user!.id),
      supabase.from("profiles").select("*").eq("id", user!.id).single(),
    ]);

  const stats = [
    {
      label: "Reports Generated",
      value: reportCount ?? 0,
      icon: FileText,
    },
    {
      label: "Recipients",
      value: recipientCount ?? 0,
      icon: Users,
    },
    {
      label: "Markets Tracked",
      value: profile?.zip_codes?.length ?? 0,
      icon: MapPin,
    },
    {
      label: "Subscription",
      value: profile?.subscription_status === "active" ? "Active" : "Trial",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {profile?.full_name ?? "there"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentReports userId={user!.id} />
        </CardContent>
      </Card>
    </div>
  );
}

async function RecentReports({ userId }: { userId: string }) {
  const supabase = await createClient();
  const { data: reports } = await supabase
    .from("reports")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);

  if (!reports || reports.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        No reports yet. Generate your first one from the Reports page.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <div
          key={report.id}
          className="flex items-center justify-between rounded-lg border p-3"
        >
          <div>
            <p className="font-medium text-sm">{report.title}</p>
            <p className="text-xs text-muted-foreground">
              {report.zip_code} &middot;{" "}
              {new Date(report.created_at).toLocaleDateString()}
            </p>
          </div>
          <Badge variant={report.status === "sent" ? "default" : "secondary"}>
            {report.status}
          </Badge>
        </div>
      ))}
    </div>
  );
}
