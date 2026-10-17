import { processSteps } from "@/lib/site";
import { Reveal } from "@/components/motion";

export function Process() {
  return (
    <section id="process" className="bg-white">
      <div className="container-site flex flex-col gap-14 pb-24 pt-[104px]">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <Reveal className="flex min-w-0 flex-[1_1_480px] flex-col gap-3.5">
            <span className="eyebrow text-blue">{processSteps.eyebrow}</span>
            <h2 className="section-title text-navy">{processSteps.title}</h2>
          </Reveal>
          <p className="flex-[0_1_420px] text-[17px] text-muted">{processSteps.lead}</p>
        </div>

        <div className="steps-line relative grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {processSteps.steps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.09}
              className="group relative flex flex-col gap-3.5 rounded-[20px] border border-transparent px-7 pb-8 pt-7 transition-[border-color,box-shadow,transform] duration-[400ms] hover:-translate-y-[3px] hover:border-blue hover:shadow-[0_0_0_1px_rgba(37,99,235,.25),0_18px_40px_rgba(37,99,235,.12)]"
            >
              <span className="relative z-[1] flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-blue/60 bg-white font-display text-[15px] font-bold tracking-[0.02em] text-blue transition-[background-color,color,border-color,box-shadow] duration-[400ms] group-hover:border-blue group-hover:bg-blue group-hover:text-white group-hover:shadow-[0_0_0_6px_rgba(37,99,235,.15)]">
                {s.n}
              </span>
              <h3 className="mt-2.5 font-display text-[24px] font-semibold text-navy transition-colors duration-[400ms] group-hover:text-blue">
                {s.title}
              </h3>
              <p className="text-[15px] text-muted">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
