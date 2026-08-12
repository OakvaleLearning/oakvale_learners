import Link from "next/link";
import { Receipt } from "lucide-react";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getProgramByTrack } from "@/content/site";
import { formatNaira, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/dashboard/ui";

export const dynamic = "force-dynamic";

export default async function LearnerPaymentsPage() {
  const session = await requireSession("/dashboard/payments");

  const payments = await prisma.payment.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    include: { enrollment: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-900">Payments</h2>
        <p className="mt-1 text-ink-500">
          A complete record of your transactions with Oakvale.
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-ink-200 bg-white p-10 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary-600">
            <Receipt className="size-7" />
          </span>
          <p className="mt-4 text-ink-500">No payments yet.</p>
          <Link
            href="/programs"
            className="mt-4 inline-block text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            Explore programs →
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-ink-100 bg-white">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
                <th className="px-5 py-3 font-semibold">Reference</th>
                <th className="px-5 py-3 font-semibold">Program</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Channel</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {payments.map((p) => (
                <tr key={p.id} className="text-ink-700">
                  <td className="px-5 py-3 font-mono text-xs">{p.reference}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
