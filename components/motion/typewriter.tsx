"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface TypewriterProps {
  words: string[];
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  className?: string;
  caretClassName?: string;
}

/** Types each word, holds, deletes, moves to the next. The first word is shown immediately (SSR-safe). */
export function Typewriter({ words, typeMs = 85, deleteMs = 45, holdMs = 1800, className, caretClassName }: TypewriterProps) {
  const reduce = useReducedMotion();
  const [wi, setWi] = useState(0);
  const [len, setLen] = useState(words[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const word = words[wi];
    let delay = deleting ? deleteMs : typeMs;
    if (!deleting && len >= word.length) delay = holdMs;
    if (deleting && len === 0) delay = 350;

    const t = setTimeout(() => {
      if (!deleting && len >= word.length) setDeleting(true);
      else if (deleting && len === 0) {
        setDeleting(false);
        setWi((i) => (i + 1) % words.length);
      } else setLen((l) => l + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(t);
  }, [wi, len, deleting, words, reduce, typeMs, deleteMs, holdMs]);

  return (
    <span aria-live="polite">
      <span className={className}>{words[wi].slice(0, len)}</span>
      <span
        aria-hidden
        className={cn("caret ml-1 inline-block h-[1em] w-[3px] translate-y-[0.12em] rounded-sm", caretClassName)}
      />
    </span>
  );
}
