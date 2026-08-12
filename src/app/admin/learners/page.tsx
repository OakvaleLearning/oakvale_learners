import { Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatNaira, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminLearnersPage() {
  const learners = await prisma.user.findMany({
    where: { role: "LEARNER" },
    orderBy: { createdAt: "desc" },
    include: {
      enrollments: true,
      payments: { where: { status: "SUCCESS" } },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-900">Learners</h2>
        <p className="mt-1 text-ink-500">
          {learners.length} registered learner{learners.length === 1 ? "" : "s"}.
        </p>
      </div>

      {learners.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-ink-200 bg-white p-10 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary-600">
            <Users className="size-7" />
          </span>
          <p className="mt-4 text-ink-500">No learners yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-ink-100 bg-white">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Enrolments</th>
                <th className="px-5 py-3 font-semibold">Total paid</th>
                <th className="px-5 py-3 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {learners.map((u) => {
                const paid = u.payments.reduce((s, p) => s + p.amount, 0);
                return (
                  <tr key={u.id} className="text-ink-700">
                    <td className="px-5 py-3 font-medium text-ink-900">{u.name}</td>
                    <td className="px-5 py-3 text-ink-500">{u.email}</td>
                    <td className="px-5 py-3">{u.enrollments.length}</td>
                    <td className="px-5 py-3 font-medium text-ink-900">
                      {formatNaira(paid)}
                    </td>
                    <td className="px-5 py-3 text-ink-500">
                      {formatDate(u.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
