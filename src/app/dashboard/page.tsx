import Link from "next/link";
import {
  GraduationCap,
  Wallet,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getProgramByTrack } from "@/content/site";
import { formatNaira, formatDate } from "@/lib/utils";
import { StatCard, StatusBadge } from "@/components/dashboard/ui";
import { PayBalanceButton } from "@/components/dashboard/PayBalanceButton";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await requireSession("/dashboard");

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    include: { payments: { orderBy: { createdAt: "desc" } } },
  });

  const activeCount = enrollments.filter((e) => e.status === "ACTIVE").length;
  const totalPaid = enrollments.reduce((sum, e) => sum + e.amountPaid, 0);
  const outstanding = enrollments.reduce(
    (sum, e) => sum + Math.max(0, e.totalAmount - e.amountPaid),
    0
  );

  const firstName = session.name.split(" ")[0];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-bold text-ink-900">
          Welcome back, {firstName} 👋
        </h2>
        <p className="mt-1 text-ink-500">
          Here&apos;s an overview of your Oakvale enrolments and payments.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Active programs"
          value={activeCount}
          icon={GraduationCap}
          accent="primary"
        />
        <StatCard
          label="Total paid"
          value={formatNaira(totalPaid)}
          icon={CheckCircle2}
          accent="emerald"
        />
        <StatCard
          label="Outstanding balance"
          value={formatNaira(outstanding)}
          icon={Wallet}
          accent={outstanding > 0 ? "amber" : "primary"}
        />
      </div>

      {/* Enrolments */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-ink-900">My enrolments</h3>

        {enrollments.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {enrollments.map((e) => {
              const program = getProgramByTrack(e.track);
              const balance = Math.max(0, e.totalAmount - e.amountPaid);
              const progress = Math.min(
                100,
                Math.round((e.amountPaid / e.totalAmount) * 100)
              );
              return (
                <div
                  key={e.id}
                  className="rounded-3xl border border-ink-100 bg-white p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-600 text-white">
                        <GraduationCap className="size-6" />
                      </span>
                      <div>
                        <h4 className="font-bold text-ink-900">{program.name}</h4>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-500">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="size-3.5" />
                            {program.details.find((d) => d.label === "Duration")?.value}
                          </span>
                          <span>·</span>
                          <span>{e.cohort}</span>
                          <span>·</span>
                          <span>{e.plan === "FULL" ? "Full payment" : "Installments"}</span>
                        </div>
                      </div>
                    </div>
                    <StatusBadge status={e.status} />
                  </div>

                  {/* Payment progress */}
                  <div className="mt-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-ink-500">
                        {formatNaira(e.amountPaid)} of {formatNaira(e.totalAmount)} paid
                      </span>
                      <span className="font-medium text-ink-700">{progress}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink-100">
                      <div
                        className="h-full rounded-full bg-accent-500 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {balance > 0 && e.status !== "PENDING" && (
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-amber-50 px-4 py-3">
                      <p className="text-sm font-medium text-amber-800">
                        Balance of {formatNaira(balance)} due before Day 1.
                      </p>
                      <PayBalanceButton enrollmentId={e.id} />
                    </div>
                  )}

                  {e.status === "PENDING" && (
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-ink-50 px-4 py-3">
                      <p className="text-sm text-ink-600">
                        Payment not completed yet.
                      </p>
                      <Link
                        href={`/enroll/${program.slug}?plan=${e.plan.toLowerCase()}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700"
                      >
                        Complete payment <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Payment history */}
      {enrollments.some((e) => e.payments.length > 0) && (
        <div>
          <h3 className="mb-4 text-lg font-bold text-ink-900">Payment history</h3>
          <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
                  <th className="px-5 py-3 font-semibold">Reference</th>
                  <th className="px-5 py-3 font-semibold">Program</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {enrollments
                  .flatMap((e) =>
                    e.payments.map((p) => ({ p, track: e.track }))
                  )
                  .sort(
                    (a, b) =>
                      b.p.createdAt.getTime() - a.p.createdAt.getTime()
                  )
                  .map(({ p, track }) => (
                    <tr key={p.id} className="text-ink-700">
                      <td className="px-5 py-3 font-mono text-xs">{p.reference}</td>
                      <td className="px-5 py-3">
                        {getProgramByTrack(track).shortName}
                      </td>
                      <td className="px-5 py-3 font-medium text-ink-900">
                        {formatNaira(p.amount)}
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
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-ink-200 bg-white p-10 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary-600">
        <Sparkles className="size-7" />
      </span>
      <h4 className="mt-4 text-lg font-bold text-ink-900">
        You haven&apos;t enrolled yet
      </h4>
      <p className="mx-auto mt-1 max-w-sm text-sm text-ink-500">
        Choose a track and secure your seat in Cohort 2 to start your caregiving
        career.
      </p>
      <Link
        href="/programs"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:bg-primary-700"
      >
        Explore programs
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
