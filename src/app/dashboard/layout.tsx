import { requireSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession("/dashboard");
  if (session.role === "ADMIN") redirect("/admin");

  return (
    <DashboardShell
      variant="learner"
      user={{ name: session.name, email: session.email, role: session.role }}
      title="Dashboard"
    >
      {children}
    </DashboardShell>
  );
}
