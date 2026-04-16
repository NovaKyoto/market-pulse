"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import type { Recipient } from "@/types";

export default function RecipientsPage() {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
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
