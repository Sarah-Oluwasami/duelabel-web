import { hero } from "@/lib/site";
import { PuzzleImage, Typewriter } from "@/components/motion";
import { SmoothLink } from "@/components/ui/smooth-link";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy text-white">
      {/* Photo, cut into a floating mosaic. Dark shade + Due Blue glow on top keep the text readable. */}
      <div className="hero-zoom absolute inset-0 [filter:saturate(.75)_brightness(.9)]" aria-hidden>
        <PuzzleImage src="/images/hero.jpg" ratio={1.5} className="absolute inset-0" />
      </div>
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg,rgba(11,31,59,.84) 0%,rgba(11,31,59,.78) 45%,rgba(11,31,59,.92) 100%),radial-gradient(ellipse 60% 70% at 70% 40%,rgba(37,99,235,.28),transparent 70%)",
        }}
      />
      <div className="glitter glitter-a" aria-hidden />
      <div className="glitter glitter-b" aria-hidden />
      <div className="glitter glitter-c" aria-hidden />

      <div className="container-site relative flex flex-col items-center gap-[22px] pb-12 pt-20 text-center">
        <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-cyan">{hero.eyebrow}</div>
        <h1 className="max-w-[900px] font-display text-[52px] font-bold leading-[1.02] tracking-[-0.03em] md:text-[72px]">
          {hero.title[0]}
          <span className="text-cyan">{hero.title[1]}</span>
        </h1>
        <p className="max-w-[680px] text-[20px] leading-relaxed text-mist">{hero.lead}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3.5">
          <SmoothLink href="#contact" className="btn btn-primary">
            Start a project
          </SmoothLink>
          <SmoothLink href="#process" className="btn btn-ghost">
            See how we work
          </SmoothLink>
        </div>
        <div className="mt-3.5 font-display text-[26px] font-semibold leading-tight">
          We build <Typewriter words={hero.typed} className="text-ember" caretClassName="bg-ember" />
        </div>
      </div>

      {/* Angled cut into the next section */}
      <div aria-hidden className="mt-2 h-[72px] bg-grey [clip-path:polygon(0_100%,100%_0,100%_100%)]" />
    </section>
  );
}
