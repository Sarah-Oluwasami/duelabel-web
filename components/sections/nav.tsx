import { nav } from "@/lib/site";
import { Logo } from "@/components/ui/logo";
import { SmoothLink } from "@/components/ui/smooth-link";

export function Nav() {
  return (
    <header
      data-site-nav
      className="sticky top-0 z-10 border-b border-line bg-white/90 backdrop-blur-md"
    >
      <div className="flex w-full flex-wrap items-center justify-between gap-6 px-8 py-4">
        <SmoothLink href="#top" aria-label="Due Label Technologies home">
          <Logo />
        </SmoothLink>

        <nav aria-label="Primary" className="hidden items-center gap-8 text-[15px] font-medium md:flex">
          {nav.map((item) => (
            <SmoothLink key={item.href} href={item.href} className="text-navy transition-colors hover:text-blue">
              {item.label}
            </SmoothLink>
          ))}
        </nav>

        <SmoothLink
          href="#contact"
          className="btn btn-primary quote-pill relative isolate overflow-visible rounded-full pl-[18px] pr-[22px] gap-[9px]"
        >
          <svg className="quote-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H9l-4.2 3.3A.5.5 0 0 1 4 18.9V5.5z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          Get a quote
        </SmoothLink>
      </div>
    </header>
  );
}
