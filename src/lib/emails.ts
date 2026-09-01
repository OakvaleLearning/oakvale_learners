import "server-only";
import type { Enrollment, User } from "@prisma/client";
import { SITE, getProgramByTrack } from "@/content/site";
import { formatNaira, formatDay } from "@/lib/utils";
import { sendEmail } from "@/lib/email";

const TEAM = "The Oakvale Learning Team";

/** e.g. "Professional Childcare & Early Years Programme" — HTML-safe. */
const programName = (e: Enrollment) => getProgramByTrack(e.track).name.replace(/&/g, "&amp;");
const programNamePlain = (e: Enrollment) => getProgramByTrack(e.track).name;

function appUrl(): string {
  return (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

const payBalanceLink = () => `${appUrl()}/dashboard/payments`;

/** Wrap body content in a simple, email-client-safe HTML shell. */
function layout(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f4f4f5;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#18181b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 0;">
      <tr><td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4e4e7;">
          <tr><td style="background:#0f766e;padding:20px 32px;">
            <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:.2px;">${SITE.name}</span>
          </td></tr>
          <tr><td style="padding:32px;">
            <h1 style="margin:0 0 16px;font-size:20px;line-height:1.3;color:#0f172a;">${title}</h1>
            ${bodyHtml}
          </td></tr>
          <tr><td style="padding:20px 32px;border-top:1px solid #e4e4e7;color:#71717a;font-size:12px;">
            ${SITE.name} · ${SITE.address}<br/>
            Questions? Just reply to this email or contact ${SITE.email}.
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function button(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;"><tr><td style="border-radius:10px;background:#0f766e;">
    <a href="${href}" style="display:inline-block;padding:12px 24px;color:#ffffff;font-weight:600;font-size:14px;text-decoration:none;border-radius:10px;">${label}</a>
  </td></tr></table>`;
}

function p(text: string): string {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3f3f46;">${text}</p>`;
}

/** EMAIL 1 — Deposit confirmation & second-instalment due date. */
export async function sendDepositEmail(user: User, enrollment: Enrollment): Promise<boolean> {
  const balance = enrollment.totalAmount - enrollment.amountPaid;
  const due = enrollment.balanceDueDate ? formatDay(enrollment.balanceDueDate) : "before Cohort Day 1";
  const paid = formatNaira(enrollment.amountPaid);
  const owed = formatNaira(balance);

  const bodyHtml =
    p(`Dear ${user.name},`) +
    p(`Thank you for securing your spot in the ${programName(enrollment)}!`) +
    p(`We have successfully received your first instalment payment of <strong>${paid}</strong>.`) +
    `<div style="background:#f0fdfa;border:1px solid #99f6e4;border-radius:12px;padding:16px 20px;margin:0 0 8px;">
      <p style="margin:0 0 8px;font-weight:700;font-size:13px;color:#0f766e;text-transform:uppercase;letter-spacing:.4px;">Your payment summary &amp; next due date</p>
      <p style="margin:0;font-size:14px;line-height:1.9;color:#134e4a;">
        • First instalment paid: <strong>${paid}</strong><br/>
        • Second instalment outstanding: <strong>${owed}</strong><br/>
        • Due date for second instalment: <strong>${due}</strong>
      </p>
    </div>` +
    p(`Please note that <strong>both instalments must be completed before Day 1</strong> to unlock full learning platform access.`) +
    p(`You can complete your second instalment at any time before the due date using the button below:`) +
    button(payBalanceLink(), "Complete Second Instalment") +
    p(`Warm regards,<br/>${TEAM}`);

  const text = `Dear ${user.name},

Thank you for securing your spot in the ${programNamePlain(enrollment)}!

We have successfully received your first instalment payment of ${paid}.

YOUR PAYMENT SUMMARY & NEXT DUE DATE:
• First Instalment Paid: ${paid}
• Second Instalment Outstanding: ${owed}
• Due Date for Second Instalment: ${due}

Please note that both instalments must be completed before Day 1 to unlock full learning platform access.

Complete your second instalment here: ${payBalanceLink()}

Warm regards,
${TEAM}`;

  return sendEmail({
    to: user.email,
    subject: "Deposit Received! Next Instalment Due Date for Childcare Programme",
    html: layout("Deposit received — your spot is secured", bodyHtml),
    text,
  });
}

/** EMAIL 2 — Balance reminder, 7 days before due date. */
export async function sendReminderEmail(user: User, enrollment: Enrollment): Promise<boolean> {
  const balance = enrollment.totalAmount - enrollment.amountPaid;
  const due = enrollment.balanceDueDate ? formatDay(enrollment.balanceDueDate) : "soon";
  const owed = formatNaira(balance);

  const bodyHtml =
    p(`Dear ${user.name},`) +
    p(`This is a quick reminder that the second and final instalment for your ${programName(enrollment)} is due in 7 days (<strong>${due}</strong>).`) +
    `<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:16px 20px;margin:0 0 8px;">
      <p style="margin:0 0 8px;font-weight:700;font-size:13px;color:#b45309;text-transform:uppercase;letter-spacing:.4px;">Balance details</p>
      <p style="margin:0;font-size:14px;line-height:1.9;color:#78350f;">
        • Outstanding balance: <strong>${owed}</strong><br/>
        • Payment deadline: <strong>${due}</strong>
      </p>
    </div>` +
    p(`To ensure your enrolment is confirmed and your access to the learning portal is unlocked on time for Cohort Day 1, please complete your payment using the button below:`) +
    button(payBalanceLink(), "Pay 2nd Instalment Now") +
    p(`If you have already made this payment, please disregard this email.`) +
    p(`Best regards,<br/>${TEAM}`);

  const text = `Dear ${user.name},

This is a quick reminder that the second and final instalment for your ${programNamePlain(enrollment)} is due in 7 days (${due}).

BALANCE DETAILS:
• Outstanding Balance: ${owed}
• Payment Deadline: ${due}

Complete your payment here: ${payBalanceLink()}

If you have already made this payment, please disregard this email.

Best regards,
${TEAM}`;

  return sendEmail({
    to: user.email,
    subject: "Reminder: Your 2nd Instalment is Due in 7 Days",
    html: layout("Your 2nd instalment is due in 7 days", bodyHtml),
    text,
  });
}

/** EMAIL 3 — Enrolment confirmation & vital details (fully paid). */
export async function sendEnrolledEmail(user: User, enrollment: Enrollment): Promise<boolean> {
  const start = formatDay(SITE.cohortStartDate);

  const bodyHtml =
    p(`Dear ${user.name},`) +
    p(`Congratulations! We have received your second and final instalment payment. Your tuition for the ${programName(enrollment)} is now <strong>PAID IN FULL</strong>.`) +
    `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;margin:0 0 8px;">
      <p style="margin:0 0 8px;font-weight:700;font-size:13px;color:#15803d;text-transform:uppercase;letter-spacing:.4px;">Vital programme details</p>
      <p style="margin:0;font-size:14px;line-height:1.9;color:#14532d;">
        • Enrolment status: <strong>Confirmed (Fully Paid)</strong><br/>
        • Programme start date: <strong>${start}</strong>
      </p>
    </div>` +
    button(SITE.communityUrl, "Access Free Community Platform") +
    p(`We are excited to welcome you to the cohort!`) +
    p(`Best regards,<br/>${TEAM}`);

  const text = `Dear ${user.name},

Congratulations! We have received your second and final instalment payment. Your tuition for the ${programNamePlain(enrollment)} is now PAID IN FULL.

VITAL PROGRAMME DETAILS:
• Enrolment Status: Confirmed (Fully Paid)
• Programme Start Date: ${start}
• LMS Link: ${SITE.communityUrl}

We are excited to welcome you to the cohort!

Best regards,
${TEAM}`;

  return sendEmail({
    to: user.email,
    subject: "Enrolment Confirmed! Welcome to the Professional Childcare Programme",
    html: layout("Enrolment confirmed — welcome to the cohort!", bodyHtml),
    text,
  });
}
