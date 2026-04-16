import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Redirect to onboarding if not complete
  const path =
    typeof window === "undefined" ? "" : window.location.pathname;
  if (profile && !profile.onboarding_complete && !path.includes("onboarding")) {
    redirect("/onboarding");
  }

  return (
    <DashboardShell
      user={{ email: user.email ?? "", name: profile?.full_name ?? "" }}
    >
      {children}
    </DashboardShell>
  );
}
