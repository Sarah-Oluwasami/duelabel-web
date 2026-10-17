"use client";

import { services, servicesCta } from "@/lib/site";
import { HoverHighlightGrid, Reveal } from "@/components/motion";
import { SmoothLink } from "@/components/ui/smooth-link";
import { cn } from "@/lib/cn";

export function Services() {
  return (
    <section id="services" className="relative bg-white">
      <div className="container-site relative flex flex-col gap-12 pb-24 pt-[104px]">
        <Reveal className="flex max-w-[640px] flex-col gap-3.5">
          <span className="eyebrow text-blue">What we build</span>
          <h2 className="section-title text-navy">Websites, apps and platforms, built to ship.</h2>
        </Reveal>

        <HoverHighlightGrid
          items={services}
          getKey={(s) => s.n}
          className="-m-2 grid-cols-[repeat(auto-fit,minmax(316px,1fr))]"
          highlightClassName="rounded-3xl bg-navy"
          renderItem={(s, active, i) => (
            <Reveal delay={i * 0.09} className="h-full">
              <article
                className={cn(
                  "flex h-full flex-col gap-4 rounded-2xl border p-8 transition-colors duration-300",
                  active ? "border-white/20 delay-150" : "border-navy/15",
                )}
              >
                <span className={cn("font-display text-[13px] font-semibold transition-colors duration-300", active ? "text-cyan delay-150" : "text-blue")}>
                  {s.n}
                </span>
                <h3 className={cn("font-display text-[24px] font-semibold transition-colors duration-300", active ? "text-white delay-150" : "text-navy")}>
                  {s.title}
                </h3>
                <p className={cn("text-[15px] transition-colors duration-300", active ? "text-white delay-150" : "text-muted")}>{s.body}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {s.chips.map((c) => (
                    <span key={c} className={cn("chip", active ? "bg-white/10 text-white delay-150" : "bg-navy/[.07] text-navy")}>
                      {c}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          )}
          trailing={
            <Reveal delay={services.length * 0.09} className="relative p-2">
              <article className="flex h-full flex-col justify-between gap-6 rounded-2xl bg-navy p-8 text-white">
                <div className="flex flex-col gap-3.5">
                  <span className="font-display text-[13px] font-semibold text-cyan">{servicesCta.eyebrow}</span>
                  <h3 className="font-display text-[24px] font-semibold">{servicesCta.title}</h3>
                </div>
                <SmoothLink href="#contact" className="btn btn-primary self-start">
                  {servicesCta.button}
                </SmoothLink>
              </article>
            </Reveal>
          }
        />
      </div>
    </section>
  );
}
