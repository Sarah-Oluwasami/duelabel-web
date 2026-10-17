"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { work } from "@/lib/site";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/cn";

/**
 * 3-up grid. Each row spreads out from its middle card as it scrolls into view;
 * clicking a card lights a travelling cyan gradient in its border.
 */
export function Work() {
  const [glow, setGlow] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="work" className="dot-texture relative overflow-hidden bg-white text-charcoal">
      <div className="container-site relative flex flex-col gap-14 pb-24 pt-[104px]">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <Reveal className="flex min-w-0 flex-[1_1_480px] flex-col gap-3.5">
            <span className="eyebrow text-blue">{work.eyebrow}</span>
            <h2 className="section-title text-navy">{work.title}</h2>
          </Reveal>
          <p className="flex-[0_1_420px] text-[17px] text-muted">{work.lead}</p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {work.projects.map((p, i) => {
            const col = i % 3; // 0 left, 1 middle, 2 right
            const row = Math.floor(i / 3);
            const fromX = col === 0 ? "calc(100% + 20px)" : col === 2 ? "calc(-100% - 20px)" : 0;
            return (
              <motion.article
                key={p.name}
                variants={{
                  hidden: { opacity: 0, x: fromX, scale: col === 1 ? 0.96 : 0.94 },
                  show: {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: { duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: (col === 1 ? 0 : 0.3) + row * 0.15, opacity: { duration: 0.7 } },
                  },
                }}
                onPointerDown={() => setGlow(i)}
                onMouseLeave={() => setTimeout(() => setGlow((g) => (g === i ? null : g)), 600)}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-card border bg-grey transition-[border-color,box-shadow] duration-300 hover:-translate-y-[3px] hover:shadow-[0_14px_32px_rgba(11,31,59,.08)]",
                  col === 1 && "z-[2]",
                  glow === i ? "border-transparent" : "border-line",
                )}
              >
                <span aria-hidden className={cn("glow-border glow-border--strong z-[3] transition-opacity duration-300", glow === i ? "opacity-100" : "opacity-0")} />
                <a href={p.url} target="_blank" rel="noopener" aria-label={`Open ${p.name}`} className="relative block aspect-video overflow-hidden bg-navy">
                  <Image
                    src={p.image}
                    alt={`${p.name} website`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover object-top transition-transform duration-700 [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
                  />
                </a>
                <div className="flex flex-col gap-2.5 p-6">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-blue">{p.tag}</span>
                  <h3 className="font-display text-[20px] font-semibold text-navy">{p.name}</h3>
                  <p className="text-[15px] text-muted">{p.body}</p>
                  <a href={p.url} target="_blank" rel="noopener" className="mt-1 inline-flex items-center gap-1.5 text-[14px] font-semibold text-blue hover:text-navy">
                    {p.display} <span aria-hidden>↗</span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
