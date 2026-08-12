import Link from "next/link";
import {
  Wallet,
  GraduationCap,
  Users,
  Clock,
  TrendingUp,
  ArrowRight,
  Heart,
  Baby,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getProgramByTrack } from "@/content/site";
import { formatNaira, formatDate } from "@/lib/utils";
import { StatCard, StatusBadge } from "@/components/dashboard/ui";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [
    revenueAgg,
    totalEnrollments,
    activeEnrollments,
    partialEnrollments,
    learnerCount,
    adultCount,
    childCount,
    recentPayments,
  ] = await Promise.all([
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "SUCCESS" },
    }),
    prisma.enrollment.count(),
    prisma.enrollment.count({ where: { status: "ACTIVE" } }),
    prisma.enrollment.count({ where: { status: "PARTIAL" } }),
    prisma.user.count({ where: { role: "LEARNER" } }),
    prisma.enrollment.count({ where: { track: "ADULT_CARE" } }),
    prisma.enrollment.count({ where: { track: "CHILD_CARE" } }),
    prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { user: true, enrollment: true },
    }),
  ]);

  const revenue = revenueAgg._sum.amount ?? 0;
  const outstandingAgg = await prisma.enrollment.findMany({
    select: { totalAmount: true, amountPaid: true, status: true },
  });
  const outstanding = outstandingAgg
    .filter((e) => e.status === "PARTIAL")
    .reduce((sum, e) => sum + (e.totalAmount - e.amountPaid), 0);

  const trackTotal = adultCount + childCount || 1;
  const adultPct = Math.round((adultCount / trackTotal) * 100);
  const childPct = 100 - adultPct;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-ink-900">Overview</h2>
        <p className="mt-1 text-ink-500">
          Revenue, enrolments, and recent activity at a glance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total revenue"
          value={formatNaira(revenue)}
          icon={Wallet}
          accent="emerald"
          hint="From successful payments"
        />
        <StatCard
          label="Outstanding"
          value={formatNaira(outstanding)}
          icon={Clock}
          accent="amber"
          hint="Deposits awaiting balance"
        />
        <StatCard
          label="Enrolments"
          value={totalEnrollments}
          icon={GraduationCap}
          accent="primary"
          hint={`${activeEnrollments} active · ${partialEnrollments} partial`}
        />
        <StatCard
          label="Learners"
          value={learnerCount}
          icon={Users}
          accent="accent"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        {/* Track split */}
        <div className="rounded-3xl border border-ink-100 bg-white p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-5 text-primary-600" />
            <h3 className="font-bold text-ink-900">Enrolments by track</h3>
          </div>
          <div className="mt-6 space-y-5">
            <TrackBar
              Icon={Heart}
              label="Adult & Elderly Care"
              count={adultCount}
              pct={adultPct}
              color="bg-primary-600"
            />
            <TrackBar
              Icon={Baby}
              label="Childcare & Early Years"
              count={childCount}
              pct={childPct}
              color="bg-accent-500"
            />
          </div>
        </div>

        {/* Recent payments */}
        <div className="rounded-3xl border border-ink-100 bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-ink-900">Recent payments</h3>
            <Link
              href="/admin/payments"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View all <ArrowRight className="size-4" />
            </Link>
          </div>
          {recentPayments.length === 0 ? (
            <p className="mt-6 text-sm text-ink-500">No payments yet.</p>
          ) : (
            <div className="mt-4 divide-y divide-ink-100">
              {recentPayments.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-ink-900">
                      {p.user.name}
                    </div>
                    <div className="truncate text-xs text-ink-400">
                      {getProgramByTrack(p.enrollment.track).shortName} ·{" "}
                      {formatDate(p.createdAt)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-ink-900">
                      {formatNaira(p.amount)}
                    </span>
                    <StatusBadge status={p.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TrackBar({
  Icon,
  label,
  count,
  pct,
  color,
}: {
  Icon: React.ElementType;
  label: string;
  count: number;
  pct: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-2 font-medium text-ink-800">
          <Icon className="size-4 text-ink-400" />
          {label}
        </span>
        <span className="text-ink-500">
          {count} ({pct}%)
        </span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
