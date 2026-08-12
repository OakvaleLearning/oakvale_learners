import { requireAdmin } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <DashboardShell
      variant="admin"
      user={{ name: session.name, email: session.email, role: session.role }}
      title="Admin"
    >
      {children}
    </DashboardShell>
  );
}
