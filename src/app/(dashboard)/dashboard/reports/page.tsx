"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus } from "lucide-react";
import useSWR from "swr";

export default function ReportsPage() {
  const [generating, setGenerating] = useState(false);
  const supabase = createClient();

  const { data: reports, mutate } = useSWR("reports", async () => {
    const { data } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });
    return data ?? [];
  });

  async function generateReport() {
    setGenerating(true);
    try {
      const res = await fetch("/api/generate-report", { method: "POST" });
      if (!res.ok) throw new Error("Failed to generate");
      await mutate();
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and view your market reports
          </p>
        </div>
        <Button onClick={generateReport} disabled={generating}>
          {generating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          {generating ? "Generating..." : "Generate Report"}
        </Button>
      </div>

      <div className="space-y-3">
        {(!reports || reports.length === 0) && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No reports yet. Click &quot;Generate Report&quot; to create your first one.
              </p>
            </CardContent>
          </Card>
        )}
        {reports?.map((report) => (
          <Card key={report.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">
                {report.title}
              </CardTitle>
              <Badge
                variant={report.status === "sent" ? "default" : "secondary"}
              >
                {report.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{report.summary}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {report.zip_code} &middot;{" "}
                {new Date(report.created_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
