"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Upload, FileSpreadsheet } from "lucide-react";
import type { Recipient } from "@/types";

export default function RecipientsPage() {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [csvImporting, setCsvImporting] = useState(false);
  const [csvResult, setCsvResult] = useState("");
  const supabase = createClient();

  useEffect(() => {
    loadRecipients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadRecipients() {
    const { data } = await supabase
      .from("recipients")
      .select("*")
      .order("created_at", { ascending: false });
    setRecipients((data as Recipient[]) ?? []);
  }

  async function addRecipient(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("recipients").insert({
      user_id: user.id,
      email,
      name: name || null,
    });

    setName("");
    setEmail("");
    setLoading(false);
    loadRecipients();
  }

  async function removeRecipient(id: string) {
    await supabase.from("recipients").delete().eq("id", id);
    loadRecipients();
  }

  async function handleCsvImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvImporting(true);
    setCsvResult("");

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const text = await file.text();
    const lines = text.split(/\r?\n/).filter((l) => l.trim());

    // Skip header if it looks like one
    const start = /email/i.test(lines[0]) ? 1 : 0;
    let added = 0;
    let skipped = 0;

    const existingEmails = new Set(recipients.map((r) => r.email.toLowerCase()));

    for (let i = start; i < lines.length; i++) {
      const parts = lines[i].split(",").map((p) => p.trim().replace(/^["']|["']$/g, ""));
      // Try to find email (could be first or second column)
      let rowEmail = "";
      let rowName = "";

      for (const part of parts) {
        if (part.includes("@")) {
          rowEmail = part.toLowerCase();
        } else if (!rowName && part.length > 0) {
          rowName = part;
        }
      }

      if (!rowEmail || existingEmails.has(rowEmail)) {
        skipped++;
        continue;
      }

      await supabase.from("recipients").insert({
        user_id: user.id,
        email: rowEmail,
        name: rowName || null,
      });

      existingEmails.add(rowEmail);
      added++;
    }

    setCsvImporting(false);
    setCsvResult(`Imported ${added} contacts${skipped > 0 ? `, ${skipped} skipped (duplicates or invalid)` : ""}`);
    setTimeout(() => setCsvResult(""), 5000);
    loadRecipients();
    e.target.value = "";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Recipients</h1>
        <p className="text-muted-foreground">
          Manage who receives your weekly market reports
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Recipient</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addRecipient} className="flex gap-3 items-end">
            <div className="flex-1 space-y-1">
              <Label htmlFor="rname">Name</Label>
              <Input
                id="rname"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex-1 space-y-1">
              <Label htmlFor="remail">Email</Label>
              <Input
                id="remail"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              <Plus className="mr-1 h-4 w-4" />
              Add
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center gap-3">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleCsvImport}
                  className="hidden"
                  disabled={csvImporting}
                />
                <div className="flex items-center gap-2 rounded-md border border-dashed px-4 py-2 text-sm text-muted-foreground hover:bg-muted/50 transition-colors">
                  {csvImporting ? (
                    <>Importing...</>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Import CSV
                    </>
                  )}
                </div>
              </label>
              <span className="text-xs text-muted-foreground">
                Upload a CSV with columns: name, email (or just email)
              </span>
            </div>
            {csvResult && (
              <p className="mt-2 text-sm text-green-600 flex items-center gap-1.5">
                <FileSpreadsheet className="h-4 w-4" />
                {csvResult}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {recipients.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            No recipients yet. Add your clients above.
          </p>
        )}
        {recipients.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div>
              <p className="text-sm font-medium">{r.name ?? r.email}</p>
              <p className="text-xs text-muted-foreground">{r.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={r.active ? "default" : "secondary"}>
                {r.active ? "Active" : "Paused"}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeRecipient(r.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
