import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Check, Clock, GraduationCap, Info } from "lucide-react";
import { getSession } from "@/lib/auth";
import { PROGRAMS, SITE, type TrackSlug } from "@/content/site";
import { formatNairaPlain } from "@/lib/utils";
import { EnrollConfirm } from "@/components/sections/EnrollConfirm";

export const dynamic = "force-dynamic";

type PlanKey = "full" | "split";

export default async function EnrollPage({
  params,
  searchParams,
}: {
  params: Promise<{ track: string }>;
  searchParams: Promise<{ plan?: string }>;
}) {
  const { track } = await params;
  const { plan: planParam } = await searchParams;

  if (!(track in PROGRAMS)) notFound();
  const program = PROGRAMS[track as TrackSlug];

  const planKey: PlanKey = planParam === "split" ? "split" : "full";
  const planEnum = planKey === "split" ? "SPLIT" : "FULL";
  const card = program.pricing.find((p) => p.plan === planEnum)!;
  const fullCard = program.pricing.find((p) => p.plan === "FULL")!;
  const balance = fullCard.price - card.price;

  // Require login; bounce back here after auth.
  const session = await getSession();
  if (!session) {
    redirect(
      `/login?next=${encodeURIComponent(`/enroll/${track}?plan=${planKey}`)}`
    );
  }
  if (session.role === "ADMIN") redirect("/admin");

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-500">
          {program.kicker}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          Complete your enrolment
        </h1>
        <p className="mt-2 text-ink-500">
          Review your order and continue to secure payment.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Order summary */}
        <div className="rounded-4xl border border-ink-100 bg-white p-8">
          <h2 className="text-lg font-bold text-ink-900">Order summary</h2>

          <div className="mt-6 flex items-start gap-4 rounded-3xl bg-ink-50 p-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-600 text-white">
              <GraduationCap className="size-6" />
            </span>
            <div>
              <h3 className="font-bold text-ink-900">{program.name}</h3>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-500">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {program.details.find((d) => d.label === "Duration")?.value}
                </span>
                <span>{SITE.cohort}</span>
              </div>
            </div>
          </div>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-500">Plan</dt>
              <dd className="font-medium text-ink-900">{card.header}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-500">Full programme price</dt>
              <dd className="font-medium text-ink-900">
                {formatNairaPlain(fullCard.price)}
              </dd>
            </div>
            {planEnum === "SPLIT" && (
              <div className="flex justify-between">
                <dt className="text-ink-500">Balance due before Day 1</dt>
                <dd className="font-medium text-ink-900">
                  {formatNairaPlain(balance)}
                </dd>
              </div>
            )}
            <div className="border-t border-ink-100 pt-3">
              <div className="flex items-end justify-between">
                <dt className="font-semibold text-ink-900">Pay now</dt>
                <dd className="text-2xl font-black text-primary-700">
                  {formatNairaPlain(card.price)}
                </dd>
              </div>
            </div>
          </dl>

          {planEnum === "SPLIT" && (
            <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-accent-100 bg-accent-50 px-4 py-3 text-sm text-accent-800">
              <Info className="mt-0.5 size-4 shrink-0" />
              You&apos;re paying a 50% deposit today. Your remaining balance of{" "}
              {formatNairaPlain(balance)} is due any time before the first day of
              class.
            </div>
          )}
        </div>

        {/* Confirm / benefits */}
        <div className="space-y-6">
          <div className="rounded-4xl border border-ink-100 bg-white p-8">
            <h2 className="text-lg font-bold text-ink-900">You&apos;re enrolling as</h2>
            <p className="mt-1 text-sm text-ink-500">{session.name}</p>
            <p className="text-sm text-ink-500">{session.email}</p>

            <ul className="mt-6 space-y-2.5">
              {["Instant seat confirmation on payment", "Access to your learner dashboard", "Certificate on successful completion"].map(
                (item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-700">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary-600" strokeWidth={3} />
                    {item}
                  </li>
                )
              )}
            </ul>

            <div className="mt-7">
              <EnrollConfirm track={program.track} plan={planEnum} />
            </div>
          </div>

          <p className="text-center text-sm text-ink-500">
            Want a different plan?{" "}
            <Link
              href={`/programs/${track}#pricing`}
              className="font-semibold text-primary-600 hover:text-primary-700"
            >
              Change payment option
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
