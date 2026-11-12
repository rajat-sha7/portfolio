import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Sends two emails when someone submits the contact form:
// 1. a notification to the site owner
// 2. a confirmation to the visitor
//
// Needs these environment variables (in .env.local and on Vercel):
//   GMAIL_USER          the Gmail address that sends the emails
//   GMAIL_APP_PASSWORD  a Gmail app password (not the normal password)
//   CONTACT_TO          where notifications go (defaults to GMAIL_USER)

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;

// Basic per-IP limit so the form can't be used to spam inboxes.
// It lives in memory, so it resets when the server restarts. That's fine for a portfolio.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO || user;
  if (!user || !pass || !to) {
    console.error("Contact form: GMAIL_USER / GMAIL_APP_PASSWORD not set");
    return NextResponse.json({ error: "Email is not configured yet. Please try again later." }, { status: 500 });
  }

  let body: { email?: unknown; website?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Hidden "website" field: real people leave it empty, bots usually fill it.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const when = new Date().toUTCString();

  try {
    await Promise.all([
      transporter.sendMail({
        from: `"Portfolio Contact" <${user}>`,
        to,
        replyTo: email,
        subject: `New project enquiry from ${email}`,
        text: `Someone wants to discuss a project.\n\nEmail: ${email}\nTime: ${when}\n\nReply to this email to contact them directly.`,
        html: layout(`
          <h2 style="margin:0 0 12px">New project enquiry</h2>
          <p style="margin:0 0 8px">Someone submitted the contact form on your portfolio.</p>
          <p style="margin:0 0 4px"><strong>Email:</strong> <a href="mailto:${email}" style="color:#000">${email}</a></p>
          <p style="margin:0 0 16px"><strong>Time:</strong> ${when}</p>
          <p style="margin:0;color:#555">Hit reply to respond to them directly.</p>
        `),
      }),
      transporter.sendMail({
        from: `"Rajat Sharma" <${user}>`,
        to: email,
        replyTo: to,
        subject: "Thanks for reaching out! I'll be in touch soon",
        text: `Hi,\n\nThanks for getting in touch through my portfolio. I've received your message and will get back to you within 24-48 hours.\n\nIn the meantime, feel free to reply to this email with details about your project.\n\nBest regards,\nRajat Sharma\nSenior Fullstack AI Developer`,
        html: layout(`
          <h2 style="margin:0 0 12px">Thanks for reaching out!</h2>
          <p style="margin:0 0 12px">Hi,</p>
          <p style="margin:0 0 12px">Thanks for getting in touch through my portfolio. I've received your message and will get back to you within <strong>24–48 hours</strong>.</p>
          <p style="margin:0 0 20px">In the meantime, feel free to reply to this email with details about your project: goals, timeline and budget.</p>
          <p style="margin:0">Best regards,<br/><strong>Rajat Sharma</strong><br/><span style="color:#555">Senior Fullstack AI Developer</span></p>
        `),
      }),
    ]);
  } catch (err) {
    console.error("Contact form: failed to send email", err);
    return NextResponse.json({ error: "Couldn't send right now. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

// Simple black-and-white email wrapper (inline styles for email clients)
function layout(content: string) {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#111">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden">
    <tr><td style="background:linear-gradient(180deg,#2b2b2b,#000);padding:20px 28px;color:#fff;font-size:20px;font-weight:bold;letter-spacing:.5px">Rajat Sharma</td></tr>
    <tr><td style="padding:28px;font-size:15px;line-height:1.6">${content}</td></tr>
    <tr><td style="padding:16px 28px;background:#fafafa;color:#888;font-size:12px">Sent from the contact form on portfolio-rajat-sha7s-projects.vercel.app</td></tr>
  </table></body></html>`;
}
