"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface CopyButtonProps {
  /** Text placed on the clipboard. */
  value: string;
  /** Where the link goes if the clipboard isn't available (mailto:, wa.me, ...). */
  href: string;
  className?: string;
  children: ReactNode;
}

/** Click copies `value`; label flips to "Copied" for 1.6s. Falls back to following `href`. */
export function CopyButton({ value, href, className, children }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  async function handle(e: MouseEvent<HTMLAnchorElement>) {
    if (!navigator.clipboard?.writeText) return; // let the link do its thing
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = href;
    }
  }

  return (
    <a href={href} onClick={handle} className={cn("relative cursor-copy", className)}>
      <span className={cn("transition-all duration-200", copied && "-translate-y-1.5 opacity-0")}>{children}</span>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center gap-2 transition-all duration-200",
          copied ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0",
        )}
      >
        <span className="inline-block h-3.5 w-2 -translate-y-px rotate-45 border-b-[2.5px] border-r-[2.5px] border-current" />
        Copied
      </span>
    </a>
  );
}
