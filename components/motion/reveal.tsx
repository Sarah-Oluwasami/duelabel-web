"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

export interface RevealProps extends HTMLMotionProps<"div"> {
  /** Stagger offset in seconds, for siblings. */
  delay?: number;
  /** Trigger when this fraction of the element is visible. */
  amount?: number;
}

/** Content rises in (28px, 0.85s) the first time it scrolls into view. */
export function Reveal({ delay = 0, amount = 0.2, className, children, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ opacity: { duration: 0.7, delay }, y: { duration: 0.85, delay, ease: [0.2, 0.8, 0.2, 1] } }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
