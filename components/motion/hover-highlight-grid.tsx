"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface HoverHighlightGridProps<T> {
  items: T[];
  getKey: (item: T, index: number) => string;
  /** `active` is true while the highlight sits behind this item. */
  renderItem: (item: T, active: boolean, index: number) => ReactNode;
  /** Cells rendered after the highlightable items (e.g. a CTA card the slab never visits). */
  trailing?: ReactNode;
  className?: string;
  highlightClassName?: string;
}

/**
 * Grid where one shared background glides between cells as the pointer moves.
 * The glide is Framer Motion's shared layout animation (`layoutId`).
 * From motion-kit, with two changes from the HTML prototype: the slab hides when the
 * pointer leaves a cell for anything that isn't another cell, and `trailing` lets the
 * CTA card share the grid without being a target.
 */
export function HoverHighlightGrid<T>({
  items,
  getKey,
  renderItem,
  trailing,
  className,
  highlightClassName,
}: HoverHighlightGridProps<T>) {
  const [hovered, setHovered] = useState<number | null>(null);
  const layoutId = useId();

  return (
    <div className={cn("grid grid-cols-1", className)} onMouseLeave={() => setHovered(null)}>
      {items.map((item, i) => (
        <div
          key={getKey(item, i)}
          className="relative p-2"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
          onFocus={() => setHovered(i)}
          onBlur={() => setHovered(null)}
        >
          <AnimatePresence>
            {hovered === i && (
              <motion.span
                layoutId={layoutId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
                transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                className={cn("absolute inset-0 block rounded-3xl bg-navy", highlightClassName)}
              />
            )}
          </AnimatePresence>
          <div className="relative z-10 h-full">{renderItem(item, hovered === i, i)}</div>
        </div>
      ))}
      {trailing}
    </div>
  );
}
