import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Variant = "wine" | "gold" | "sage" | "nude" | "neutral";

const variants: Record<Variant, string> = {
  wine:
    "border-[color:var(--color-ohm-wine-soft)] text-[color:var(--color-ohm-wine)] bg-[color:var(--color-ohm-paper)]",
  gold:
    "border-[color:var(--color-ohm-gold-soft)] text-[color:var(--color-ohm-gold)] bg-[color:var(--color-ohm-paper)]",
  sage:
    "border-[color:var(--color-gin-sage-soft)] text-[color:var(--color-gin-sage-dark)] bg-[color:var(--color-gin-sage-pale)]",
  nude:
    "border-[color:var(--color-ilm-nude-soft)] text-[color:var(--color-ilm-nude-dark)] bg-[color:var(--color-ilm-nude-pale)]",
  neutral:
    "border-[color:var(--color-ohm-line)] text-[color:var(--color-ohm-ink-soft)] bg-[color:var(--color-ohm-paper)]",
};

export function Badge({
  variant = "neutral",
  className,
  ...props
}: { variant?: Variant } & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-3 py-1 rounded-sm text-[11px] font-medium tracking-[0.12em] uppercase",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
