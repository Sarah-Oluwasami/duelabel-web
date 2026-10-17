"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface PuzzleImageProps {
  src: string;
  /** Image width / height. */
  ratio: number;
  cols?: number;
  rows?: number;
  className?: string;
}

interface Piece {
  dx: number;
  dy: number;
  rot: number;
  sx: number;
  sy: number;
  srot: number;
  fx: number;
  fy: number;
  fd: number;
  fo: number;
  delay: number;
}

/**
 * Cuts an image into a grid of tiles that fly in from scattered positions on mount
 * and settle into a loose, gently floating mosaic (never a seamless photo).
 * The grid is sized to "cover" its parent the way background-size: cover would.
 */
export function PuzzleImage({ src, ratio, cols = 9, rows = 6, className }: PuzzleImageProps) {
  const reduce = useReducedMotion();
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [host, setHost] = useState<HTMLDivElement | null>(null);

  // Random scatter is generated once on the client so SSR markup stays deterministic.
  const [pieces, setPieces] = useState<Piece[] | null>(null);
  useEffect(() => {
    const out: Piece[] = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const ang = Math.random() * Math.PI * 2;
        const dist = 160 + Math.random() * 360;
        const cx = (c - (cols - 1) / 2) / cols;
        const cy = (r - (rows - 1) / 2) / rows;
        out.push({
          dx: Math.cos(ang) * dist,
          dy: Math.sin(ang) * dist,
          rot: (Math.random() - 0.5) * 70,
          sx: (Math.random() - 0.5) * 10,
          sy: (Math.random() - 0.5) * 10,
          srot: (Math.random() - 0.5) * 5,
          fx: (Math.random() - 0.5) * 8,
          fy: (Math.random() - 0.5) * 8,
          fd: 6 + Math.random() * 6,
          fo: -Math.random() * 8,
          delay: Math.sqrt(cx * cx + cy * cy) * 1.1 + Math.random() * 0.25,
        });
      }
    setPieces(out);
  }, [cols, rows]);

  useEffect(() => {
    if (!host) return;
    const measure = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (w / h > ratio) setSize({ w, h: w / ratio });
      else setSize({ w: h * ratio, h });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    return () => ro.disconnect();
  }, [host, ratio]);

  const bgSize = useMemo(() => `${cols * 100}% ${rows * 100}%`, [cols, rows]);

  return (
    <div ref={setHost} className={className} aria-hidden>
      {size && pieces && (
        <div
          className="absolute left-1/2 top-[40%] grid gap-[3px]"
          style={{
            width: size.w,
            height: size.h,
            transform: "translate(-50%, -40%)",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {pieces.map((p, i) => {
            const c = i % cols;
            const r = Math.floor(i / cols);
            // Outer layer: Framer Motion owns `transform` for the scatter/settle.
            // Inner layer: a CSS keyframe owns `transform` for the idle float. Keeping them on
            // separate elements avoids the two fighting over the same property.
            return (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, x: p.dx, y: p.dy, rotate: p.rot, scale: 0.55 }}
                animate={{ opacity: 1, x: p.sx, y: p.sy, rotate: p.srot, scale: 0.965 }}
                transition={{ duration: 1.3, delay: p.delay, ease: [0.22, 1, 0.36, 1], opacity: { duration: 0.7, delay: p.delay } }}
              >
                <div
                  className="puzzle-piece h-full w-full rounded-[2px] bg-no-repeat shadow-[0_10px_30px_rgba(0,0,0,.45),inset_0_0_0_1px_rgba(255,255,255,.14)]"
                  style={
                    {
                      backgroundImage: `url(${src})`,
                      backgroundSize: bgSize,
                      backgroundPosition: `${(c / (cols - 1)) * 100}% ${(r / (rows - 1)) * 100}%`,
                      "--fx": `${p.fx.toFixed(1)}px`,
                      "--fy": `${p.fy.toFixed(1)}px`,
                      "--fd": `${p.fd.toFixed(1)}s`,
                      "--fo": `${p.fo.toFixed(1)}s`,
                    } as React.CSSProperties
                  }
                />
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
