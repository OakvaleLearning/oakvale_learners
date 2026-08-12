import { Mail, ClipboardList } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getProgramByTrack } from "@/content/site";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const [waitlist, messages] = await Promise.all([
    prisma.waitlistEntry.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-ink-900">Leads</h2>
        <p className="mt-1 text-ink-500">
          Waitlist sign-ups and contact enquiries.
        </p>
      </div>

      {/* Waitlist */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <ClipboardList className="size-5 text-primary-600" />
          <h3 className="font-bold text-ink-900">
            Waitlist ({waitlist.length})
          </h3>
        </div>
        {waitlist.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-ink-200 bg-white p-6 text-sm text-ink-500">
            No waitlist sign-ups yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-ink-100 bg-white">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Interest</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {waitlist.map((w) => (
                  <tr key={w.id} className="text-ink-700">
                    <td className="px-5 py-3 font-medium text-ink-900">{w.name}</td>
                    <td className="px-5 py-3 text-ink-500">{w.email}</td>
                    <td className="px-5 py-3">
                      {w.track ? getProgramByTrack(w.track).shortName : "General"}
                    </td>
                    <td className="px-5 py-3 text-ink-500">
                      {formatDate(w.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Contact messages */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Mail className="size-5 text-accent-500" />
          <h3 className="font-bold text-ink-900">
            Contact messages ({messages.length})
          </h3>
        </div>
        {messages.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-ink-200 bg-white p-6 text-sm text-ink-500">
            No messages yet.
          </p>
        ) : (
          <div className="space-y-3">
            {messages.map((m) => (
              <div key={m.id} className="rounded-3xl border border-ink-100 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-semibold text-ink-900">{m.name}</span>
                    <span className="ml-2 text-sm text-ink-400">{m.email}</span>
                  </div>
                  <span className="text-xs text-ink-400">
                    {formatDate(m.createdAt)}
                  </span>
                </div>
                {m.subject && (
                  <p className="mt-2 text-sm font-medium text-ink-800">
                    {m.subject}
                  </p>
                )}
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                  {m.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
