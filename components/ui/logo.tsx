import { cn } from "@/lib/cn";

/** The brand-book mark: filled triangle + chevron. */
export function Mark({ size = 40, color = "#2563EB", className }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden className={className}>
      <path d="M6 16 L28 32 L6 48 Z" fill={color} stroke={color} strokeWidth="5" strokeLinejoin="round" />
      <path d="M36 10 L58 32 L36 54" fill="none" stroke={color} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ tone = "navy", className }: { tone?: "navy" | "white"; className?: string }) {
  const color = tone === "white" ? "#FFFFFF" : "#0B1F3B";
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Mark size={tone === "white" ? 36 : 40} color={tone === "white" ? "#FFFFFF" : "#2563EB"} />
      <span className="flex flex-col leading-none" style={{ color }}>
        <span className="font-display text-[20px] font-semibold tracking-[-0.01em]">Due Label</span>
        <span className="mt-[3px] font-display text-[9.5px] font-medium tracking-[0.22em]">TECHNOLOGIES</span>
      </span>
    </span>
  );
}
