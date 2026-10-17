"use client";

import { useState, type MouseEvent } from "react";
import { why } from "@/lib/site";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/cn";

const icons = {
  code: <path d="M4 17l6-6-6-6M12 19h8" fill="none" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  shield: (
    <>
      <path d="M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z" fill="none" stroke="#22D3EE" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" fill="none" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  chat: <path d="M4 5h16v11H8l-4 4V5z" fill="none" stroke="#22D3EE" strokeWidth="2" strokeLinejoin="round" />,
};

/** Spotlight card: cyan glow follows the pointer; lifts with a travelling gradient border. First card starts active. */
export function Why() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  return (
    <section id="about" className="relative bg-navy">
      <div className="container-site flex flex-col gap-14 pb-24 pt-[104px]">
        <Reveal className="flex max-w-[720px] flex-col gap-3.5">
          <span className="eyebrow text-cyan">{why.eyebrow}</span>
          <h2 className="section-title text-white">{why.title}</h2>
          <p className="text-[17px] text-mist">{why.lead}</p>
        </Reveal>

        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {why.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.09}>
              <GlowCard
                lit={hovering ? active === i : active === i}
                onEnter={() => setActive(i)}
                icon={icons[card.icon]}
                title={card.title}
                body={card.body}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GlowCard({ lit, onEnter, icon, title, body }: { lit: boolean; onEnter: () => void; icon: React.ReactNode; title: string; body: string }) {
  const [pos, setPos] = useState({ x: 22, y: 18 });
  function move(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }
  return (
    <div
      onMouseEnter={onEnter}
      onMouseMove={move}
      className={cn(
        "relative flex h-full flex-col gap-3.5 overflow-hidden rounded-card border bg-white/5 p-8 transition-[transform,box-shadow,border-color] duration-500 [transition-timing-function:cubic-bezier(.2,.8,.2,1)]",
        lit ? "-translate-y-1.5 border-transparent shadow-[0_24px_48px_rgba(4,15,40,.4)]" : "border-white/15",
      )}
    >
      {/* spotlight */}
      <span
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 transition-opacity duration-300", lit ? "opacity-100" : "opacity-0")}
        style={{
          background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, rgba(34,211,238,.32), rgba(34,211,238,.08) 40%, transparent 68%)`,
        }}
      />
      {/* travelling gradient border */}
      <span aria-hidden className={cn("glow-border z-[2] transition-opacity duration-400", lit ? "opacity-100" : "opacity-0")} />

      <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/15">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          {icon}
        </svg>
      </span>
      <h3 className="relative font-display text-[22px] font-semibold text-white">{title}</h3>
      <p className="relative text-[15px] text-mist">{body}</p>
    </div>
  );
}
