import { User, Mail, Calendar, ShieldCheck } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const rows = [
    { Icon: User, label: "Full name", value: user.name },
    { Icon: Mail, label: "Email", value: user.email },
    { Icon: ShieldCheck, label: "Account type", value: "Learner" },
    { Icon: Calendar, label: "Member since", value: formatDate(user.createdAt) },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-900">Account</h2>
        <p className="mt-1 text-ink-500">Your profile and account details.</p>
      </div>

      <div className="rounded-3xl border border-ink-100 bg-white p-6">
        <div className="flex items-center gap-4">
          <span className="grid size-16 place-items-center rounded-2xl bg-brand-gradient text-xl font-bold text-white">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </span>
          <div>
            <h3 className="text-lg font-bold text-ink-900">{user.name}</h3>
            <p className="text-sm text-ink-500">{user.email}</p>
          </div>
        </div>

        <dl className="mt-6 divide-y divide-ink-100">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center gap-3 py-3.5">
              <span className="grid size-9 place-items-center rounded-xl bg-ink-50 text-ink-500">
                <r.Icon className="size-4" />
              </span>
              <dt className="w-32 text-sm text-ink-500">{r.label}</dt>
              <dd className="text-sm font-medium text-ink-900">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="text-sm text-ink-400">
        Need to update your details or have an issue with your account? Reach out
        via our{" "}
        <a href="/contact" className="font-medium text-primary-600 hover:underline">
          contact page
        </a>
        .
      </p>
    </div>
  );
}
