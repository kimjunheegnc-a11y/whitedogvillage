import nodemailer from "nodemailer";

export async function sendOwnerEmail(subject: string, text: string) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.OWNER_EMAIL;
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !pass || !to || !from) {
    console.warn("[mail] SMTP not fully configured; skipping email");
    return { skipped: true as const };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({ from, to, subject, text });
  return { skipped: false as const };
}
