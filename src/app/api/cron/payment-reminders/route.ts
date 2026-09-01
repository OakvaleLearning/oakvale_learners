import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendReminderEmail } from "@/lib/emails";

export const dynamic = "force-dynamic";

/**
 * Cron: send the 2nd-instalment reminder (SOP Email 2) to learners whose
 * balance is due within the next 7 days and who haven't been reminded yet.
 *
 * Scheduled daily via vercel.json. Vercel attaches
 * `Authorization: Bearer $CRON_SECRET`; we reject anything else when the
 * secret is configured.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const now = new Date();
  const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const due = await prisma.enrollment.findMany({
    where: {
      status: "PARTIAL",
      reminderEmailSentAt: null,
      balanceDueDate: { not: null, gte: now, lte: in7Days },
    },
    include: { user: true },
  });

  let sent = 0;
  for (const enrollment of due) {
    // Claim first so a concurrent run can't double-send.
    const claim = await prisma.enrollment.updateMany({
      where: { id: enrollment.id, reminderEmailSentAt: null },
      data: { reminderEmailSentAt: new Date() },
    });
    if (claim.count === 0) continue;

    const ok = await sendReminderEmail(enrollment.user, enrollment);
    if (ok) {
      sent++;
    } else {
      await prisma.enrollment.update({
        where: { id: enrollment.id },
        data: { reminderEmailSentAt: null },
      });
    }
  }

  return NextResponse.json({ ok: true, candidates: due.length, sent });
}
