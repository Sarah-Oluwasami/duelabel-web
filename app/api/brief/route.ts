import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TO = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "duelabeltech@gmail.com";
const FROM = process.env.BRIEF_FROM ?? "Due Label Website <onboarding@resend.dev>";

interface Brief {
  name: string;
  email: string;
  brief: string;
  honey?: string | null;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/**
 * POST /api/brief — emails a project brief to the studio inbox.
 * Uses Resend when RESEND_API_KEY is set; otherwise relays through FormSubmit so the
 * form still works on a fresh deploy with no secrets configured.
 */
export async function POST(req: Request) {
  let body: Brief;
  try {
    body = (await req.json()) as Brief;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.honey) return NextResponse.json({ ok: true }); // bot filled the hidden field; pretend success
  const name = (body.name ?? "").trim().slice(0, 200);
  const email = (body.email ?? "").trim().slice(0, 200);
  const brief = (body.brief ?? "").trim().slice(0, 5000);
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !brief) {
    return NextResponse.json({ error: "Name, a valid email and a brief are required." }, { status: 422 });
  }

  const subject = `New project brief from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\n\nWhat's due:\n${brief}`;

  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject,
        text,
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>What's due:</strong></p><p>${escapeHtml(brief).replace(/\n/g, "<br>")}</p>`,
      }),
    });
    if (!res.ok) return NextResponse.json({ error: "Email provider rejected the message." }, { status: 502 });
    return NextResponse.json({ ok: true, via: "resend" });
  }

  // Fallback: FormSubmit (needs one-time activation email on first use).
  const res = await fetch(`https://formsubmit.co/ajax/${TO}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ name, email, brief, _subject: subject, _template: "table", _captcha: "false" }),
  });
  if (!res.ok) return NextResponse.json({ error: "Relay rejected the message." }, { status: 502 });
  return NextResponse.json({ ok: true, via: "formsubmit" });
}
