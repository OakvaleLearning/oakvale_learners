import { GraduationCap } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getProgramByTrack } from "@/content/site";
import { formatNaira, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/dashboard/ui";
import { EnrollmentStatusSelect } from "@/components/dashboard/AdminControls";

export const dynamic = "force-dynamic";

export default async function AdminEnrollmentsPage() {
  const enrollments = await prisma.enrollment.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-900">Enrolments</h2>
        <p className="mt-1 text-ink-500">
          {enrollments.length} total · manage learner enrolments and statuses.
        </p>
      </div>

      {enrollments.length === 0 ? (
        <Empty />
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-ink-100 bg-white">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
                <th className="px-5 py-3 font-semibold">Learner</th>
                <th className="px-5 py-3 font-semibold">Program</th>
                <th className="px-5 py-3 font-semibold">Plan</th>
                <th className="px-5 py-3 font-semibold">Paid / Total</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Manage</th>
                <th className="px-5 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {enrollments.map((e) => (
                <tr key={e.id} className="text-ink-700">
                  <td className="px-5 py-3">
                    <div className="font-medium text-ink-900">{e.user.name}</div>
                    <div className="text-xs text-ink-400">{e.user.email}</div>
                  </td>
                  <td className="px-5 py-3">
                    {getProgramByTrack(e.track).shortName}
                  </td>
                  <td className="px-5 py-3">
                    {e.plan === "FULL" ? "Full" : "Installments"}
                  </td>
                  <td className="px-5 py-3">
                    <span className="font-medium text-ink-900">
                      {formatNaira(e.amountPaid)}
                    </span>
                    <span className="text-ink-400"> / {formatNaira(e.totalAmount)}</span>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={e.status} />
                  </td>
                  <td className="px-5 py-3">
                    <EnrollmentStatusSelect enrollmentId={e.id} current={e.status} />
                  </td>
                  <td className="px-5 py-3 text-ink-500">
                    {formatDate(e.createdAt)}
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

function Empty() {
  return (
    <div className="rounded-3xl border border-dashed border-ink-200 bg-white p-10 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary-600">
        <GraduationCap className="size-7" />
      </span>
      <p className="mt-4 text-ink-500">No enrolments yet.</p>
    </div>
  );
}
