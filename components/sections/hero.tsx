import { hero } from "@/lib/site";
import Image from "next/image";
import { Typewriter } from "@/components/motion";
import { SmoothLink } from "@/components/ui/smooth-link";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-charcoal text-white">
      {/* Photo with a neutral scrim so the text stays readable. */}
      <Image src="/images/hero.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[center_40%]" aria-hidden />
      {/* Neutral scrim, heaviest behind the text block, lighter at the edges. */}
      <div className="absolute inset-0 bg-black/60" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(0,0,0,.45),transparent_70%)]" aria-hidden />

      <div className="container-site relative flex flex-col items-center gap-[22px] pb-12 pt-20 text-center">
        <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-cyan">{hero.eyebrow}</div>
        <h1 className="max-w-[900px] font-display text-[52px] font-bold leading-[1.02] tracking-[-0.03em] [text-shadow:0_2px_20px_rgba(0,0,0,.5)] md:text-[72px]">
          {hero.title[0]}
          <span className="text-cyan">{hero.title[1]}</span>
        </h1>
        <p className="max-w-[680px] text-[20px] leading-relaxed text-white/95 [text-shadow:0_1px_12px_rgba(0,0,0,.6)]">{hero.lead}</p>
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
