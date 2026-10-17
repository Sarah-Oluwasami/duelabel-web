import { values } from "@/lib/site";
import { Reveal } from "@/components/motion";

export function Values() {
  return (
    <section className="bg-white">
      <div className="container-site flex flex-wrap gap-x-20 gap-y-12 pb-24 pt-[104px]">
        <Reveal className="flex min-w-0 flex-[1_1_360px] flex-col gap-3.5">
          <span className="eyebrow text-blue">{values.eyebrow}</span>
          <h2 className="section-title text-navy">{values.title}</h2>
          <p className="text-[17px] text-muted">{values.lead}</p>
        </Reveal>
        <Reveal className="grid min-w-0 flex-[1_1_520px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-10 gap-y-3">
          {values.items.map((v) => (
            <div key={v.title} className="value-row relative flex flex-col gap-1.5 border-b border-line py-5">
              <h3 className="font-display text-[18px] font-semibold text-navy">{v.title}</h3>
              <p className="text-[15px] text-muted">{v.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
