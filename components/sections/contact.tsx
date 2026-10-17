"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { contact, formatPhone, site } from "@/lib/site";
import { Reveal, TiltCard, TiltLayer } from "@/components/motion";
import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-blue text-white">
      <BackgroundMark />
      <div className="container-site relative flex flex-wrap items-center justify-between gap-x-20 gap-y-12 py-[104px]">
        <Reveal className="flex min-w-0 flex-[1_1_480px] flex-col gap-[18px]">
          <h2 className="font-display text-[40px] font-bold leading-[1.08] tracking-[-0.025em] md:text-[52px]">{contact.title}</h2>
          <p className="max-w-[520px] text-[18px] text-[#E6EEFF]">{contact.lead}</p>
          <div className="mt-2 flex flex-wrap gap-3.5">
            <CopyButton value={site.email} href={`mailto:${site.email}`} className="btn btn-white">
              {site.email}
            </CopyButton>
            <CopyButton value={formatPhone(site.whatsapp)} href={`https://wa.me/${site.whatsapp}`} className="btn btn-ghost">
              {formatPhone(site.whatsapp)}
            </CopyButton>
          </div>
        </Reveal>

        <Reveal className="min-w-0 flex-[1_1_400px]">
          <TiltCard className="rounded-[20px] bg-white text-navy shadow-[0_30px_60px_rgba(4,15,40,.25)] [&:hover]:shadow-[0_40px_80px_rgba(4,15,40,.32)]">
            <BriefForm />
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}

/** Emails the brief through /api/brief (or FormSubmit if no API key is configured) and opens WhatsApp with it pre-filled. */
function BriefForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState(contact.form.note);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const brief = String(data.get("brief") ?? "").trim();

    const msg = `Hi Due Label, I'd like to start a project.\n\nName: ${name}\nEmail: ${email}\n\nWhat's due:\n${brief}`;
    // Open WhatsApp synchronously inside the submit handler so pop-up blockers allow it.
    const wa = window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    if (wa) wa.opener = null;

    setStatus("sending");
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, brief, honey: data.get("_honey") }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setNote(wa ? "Emailed. Finish by tapping send in WhatsApp." : "Emailed. Pop-up blocked, so tap the WhatsApp button to send it there too.");
      form.reset();
    } catch {
      setStatus("error");
      setNote("Email didn't go through. Your brief is in WhatsApp, or email us directly.");
    }
  }

  const sending = status === "sending";
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 p-8">
      <TiltLayer depth={70}>
        <h3 className="mb-1 font-display text-[22px] font-semibold">{contact.form.title}</h3>
      </TiltLayer>
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
      <TiltLayer depth={30} className="flex flex-col gap-1.5">
        <label htmlFor="dl-name" className="text-[13px] font-medium text-muted">
          Your name
        </label>
        <input id="dl-name" name="name" type="text" required className="field" />
      </TiltLayer>
      <TiltLayer depth={30} className="flex flex-col gap-1.5">
        <label htmlFor="dl-email" className="text-[13px] font-medium text-muted">
          Email
        </label>
        <input id="dl-email" name="email" type="email" required className="field" />
      </TiltLayer>
      <TiltLayer depth={30} className="flex flex-col gap-1.5">
        <label htmlFor="dl-brief" className="text-[13px] font-medium text-muted">
          What&apos;s due?
        </label>
        <textarea id="dl-brief" name="brief" rows={4} required className="field resize-y py-3" />
      </TiltLayer>
      <TiltLayer depth={50}>
        <button
          type="submit"
          disabled={sending}
          className={cn("btn btn-primary mt-1 w-full border-0", status === "sent" && "bg-navy hover:bg-navy", sending && "cursor-progress opacity-70")}
        >
          {sending ? "Sending…" : status === "sent" ? "Brief sent ✓" : contact.form.button}
        </button>
      </TiltLayer>
      <p className={cn("text-center text-[13px]", status === "sent" ? "text-[#1D9E5B]" : status === "error" ? "text-[#C0392B]" : "text-muted")}>{note}</p>
    </form>
  );
}

/** The big faded brand mark: triangle slides in, chevron draws itself, then the whole thing drifts. */
function BackgroundMark() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 64 64"
      className="mark-float pointer-events-none absolute -bottom-[200px] -left-[160px] h-[560px] w-[560px] overflow-visible opacity-10"
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.path
        d="M6 16 L28 32 L6 48 Z"
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinejoin="round"
        variants={{ hidden: { opacity: 0, x: -40, scale: 0.8 }, show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.9, ease } } }}
      />
      <motion.path
        d="M36 10 L58 32 L36 54"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { opacity: 0, x: -26, pathLength: 0 },
          show: { opacity: 1, x: 0, pathLength: 1, transition: { delay: 0.25, duration: 1.2, ease, opacity: { duration: 0.4 } } },
        }}
      />
    </motion.svg>
  );
}
