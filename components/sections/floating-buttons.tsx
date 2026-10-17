"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site";
import { SmoothLink } from "@/components/ui/smooth-link";
import { cn } from "@/lib/cn";

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener"
        aria-label="Chat with us on WhatsApp"
        title="Chat on WhatsApp"
        className="fab-wa fixed bottom-4 right-4 z-[60] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-wa transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 md:bottom-6 md:right-6 md:h-[58px] md:w-[58px]"
      >
        <Image src="/icons/whatsapp.png" alt="" width={32} height={32} className="h-7 w-7 md:h-8 md:w-8" />
      </a>
      <SmoothLink
        href="#top"
        aria-label="Back to top"
        title="Back to top"
        className={cn(
          "fab-top fixed bottom-4 left-4 z-[60] flex h-[46px] w-[46px] items-center justify-center rounded-full border-[1.5px] border-blue/35 bg-white/90 backdrop-blur-sm transition-opacity duration-300 md:bottom-6 md:left-6 md:h-[52px] md:w-[52px]",
          showTop ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </SmoothLink>
    </>
  );
}
