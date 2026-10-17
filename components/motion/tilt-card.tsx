"use client";

import { createContext, useContext, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

const TiltContext = createContext(false);

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

export interface TiltCardProps {
  children: ReactNode;
  /** Maximum rotation in degrees at the card's edge. */
  max?: number;
  className?: string;
}

/**
 * Card that rotates in 3D toward the pointer. Wrap inner pieces in <TiltLayer> to lift them.
 * From motion-kit. One fix carried over from the prototype: layers rest at z=2px (never
 * coplanar with the card face) and the 3D context is only kept while hovered, which stops
 * form controls blinking out as the card settles.
 */
export function TiltCard({ children, max = 7, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 2 * max);
    rotateX.set(-py * 2 * max);
  }

  function handleLeave() {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  }

  const active = hovered && !reduce;

  return (
    <TiltContext.Provider value={active}>
      <div style={{ perspective: 1100 }} className="h-full">
        <motion.div
          ref={ref}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          style={{ rotateX, rotateY, transformStyle: active ? "preserve-3d" : "flat" }}
          className={cn("relative h-full transition-shadow duration-300", className)}
        >
          {children}
        </motion.div>
      </div>
    </TiltContext.Provider>
  );
}

export interface TiltLayerProps {
  children: ReactNode;
  /** How far (px) this layer lifts toward the viewer while the card is hovered. */
  depth?: number;
  className?: string;
}

export function TiltLayer({ children, depth = 40, className }: TiltLayerProps) {
  const active = useContext(TiltContext);
  return (
    <motion.div
      animate={{ z: active ? depth : 2 }}
      transition={{ type: "spring", ...SPRING }}
      style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
