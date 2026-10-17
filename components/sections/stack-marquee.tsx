import { stack, positioning } from "@/lib/site";
import { Mark } from "@/components/ui/logo";
import { Reveal } from "@/components/motion";

export function StackMarquee() {
  const items = [...stack, ...stack]; // doubled so the loop is seamless
  return (
    <>
      <section aria-label="Technologies we work with" className="overflow-hidden border-t border-navy/10 bg-cyan text-navy">
        <div className="flex w-full items-center gap-9 py-[26px]">
          <span className="shrink-0 whitespace-nowrap pl-8 text-[12px] font-semibold uppercase tracking-[0.12em] opacity-80">
            We work in
          </span>
          <div
            className="marquee min-w-0 flex-1 overflow-hidden"
            style={{
              maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
              WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            }}
          >
            <div className="marquee-track flex w-max items-center gap-9">
              {items.map((name, i) => (
                <span key={`${name}-${i}`} className="flex items-center gap-9">
                  <span className="whitespace-nowrap text-[17px] font-semibold uppercase tracking-[0.1em]">{name}</span>
                  <Mark size={18} color="#0B1F3B" className="shrink-0 opacity-55" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Positioning strip */}
      <section className="bg-white">
        <Reveal className="container-site flex flex-wrap items-center justify-between gap-x-12 gap-y-5 py-10">
          <p className="font-display text-[20px] font-semibold text-navy">
            {positioning.line[0]}
            <span className="text-blue">{positioning.line[1]}</span>
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2.5 text-[14px] font-medium text-muted">
            {positioning.traits.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
