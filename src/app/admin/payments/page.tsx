import { Receipt } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getProgramByTrack } from "@/content/site";
import { formatNaira, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/dashboard/ui";
import { PaymentActions } from "@/components/dashboard/AdminControls";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage() {
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true, enrollment: true },
  });

  const successTotal = payments
    .filter((p) => p.status === "SUCCESS")
    .reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-ink-900">Payments</h2>
          <p className="mt-1 text-ink-500">
            {payments.length} transactions · reconcile pending payments.
          </p>
        </div>
        <div className="rounded-2xl border border-ink-100 bg-white px-5 py-3">
          <div className="text-xs text-ink-400">Collected</div>
          <div className="text-lg font-black text-emerald-600">
            {formatNaira(successTotal)}
          </div>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-ink-200 bg-white p-10 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary-600">
            <Receipt className="size-7" />
          </span>
          <p className="mt-4 text-ink-500">No payments yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-ink-100 bg-white">
          <table className="w-full min-w-[880px] text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
                <th className="px-5 py-3 font-semibold">Reference</th>
                <th className="px-5 py-3 font-semibold">Learner</th>
                <th className="px-5 py-3 font-semibold">Program</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Channel</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {payments.map((p) => (
                <tr key={p.id} className="text-ink-700">
                  <td className="px-5 py-3 font-mono text-xs">{p.reference}</td>
                  <td className="px-5 py-3">
                    <div className="font-medium text-ink-900">{p.user.name}</div>
                    <div className="text-xs text-ink-400">{p.user.email}</div>
                  </td>
                  <td className="px-5 py-3">
                    {getProgramByTrack(p.enrollment.track).shortName}
                  </td>
                  <td className="px-5 py-3 font-medium text-ink-900">
                    {formatNaira(p.amount)}
                  </td>
                  <td className="px-5 py-3 capitalize text-ink-500">
                    {p.channel ?? "—"}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-5 py-3 text-ink-500">
                    {formatDate(p.createdAt)}
                  </td>
                  <td className="px-5 py-3">
                    <PaymentActions paymentId={p.id} status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
