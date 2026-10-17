import { footer, nav, site } from "@/lib/site";
import { Logo } from "@/components/ui/logo";
import { SmoothLink } from "@/components/ui/smooth-link";

const col = "flex flex-col gap-3 text-[15px] [&_a]:text-mist [&_a:hover]:text-cyan";
const head = "font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-white";

export function Footer() {
  return (
    <footer className="bg-navy text-mist">
      <div className="container-site flex flex-col gap-12 pb-8 pt-16">
        <div className="flex flex-wrap justify-between gap-x-16 gap-y-10">
          <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-4">
            <Logo tone="white" />
            <p className="max-w-[320px] text-[15px]">{footer.blurb}</p>
          </div>
          <div className={col}>
            <span className={head}>Company</span>
            {nav.slice(0, 4).map((n) => (
              <SmoothLink key={n.href} href={n.href}>
                {n.label}
              </SmoothLink>
            ))}
          </div>
          <div className={col}>
            <span className={head}>Contact</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.url}>{site.url.replace("https://", "")}</a>
            <span>{site.location}</span>
          </div>
          <div className={col}>
            <span className={head}>Follow</span>
            <a href={site.social.linkedin}>LinkedIn</a>
            <a href={site.social.x}>X</a>
            <a href={site.social.github}>GitHub</a>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-[13px] text-[#8FA3C4] [&_a]:text-[#8FA3C4] [&_a:hover]:text-cyan">
          <span>
            © {new Date().getFullYear()} {site.name} Limited. {site.rc}.
          </span>
          <span className="flex gap-6">
            <SmoothLink href="#top">Privacy</SmoothLink>
            <SmoothLink href="#top">Terms</SmoothLink>
          </span>
        </div>
      </div>
    </footer>
  );
}
