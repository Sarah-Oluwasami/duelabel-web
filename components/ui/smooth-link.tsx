"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

/**
 * In-page anchor that scrolls smoothly and stops under the sticky header.
 * (CSS scroll-behavior covers most browsers; this adds the header offset and hash update.)
 */
export function SmoothLink({ href, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  function handle(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented || !href?.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    const nav = document.querySelector<HTMLElement>("[data-site-nav]");
    const y = target.getBoundingClientRect().top + window.pageYOffset - (nav?.offsetHeight ?? 0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: Math.max(0, y), behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", href);
  }
  return <a href={href} onClick={handle} {...rest} />;
}
