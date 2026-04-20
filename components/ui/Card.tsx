import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Tone = "paper" | "cream" | "sage-pale" | "nude-pale" | "gold-pale";

const tones: Record<Tone, string> = {
  paper: "bg-[color:var(--color-ohm-paper)]",
  cream: "bg-[color:var(--color-ohm-cream)]",
  "sage-pale": "bg-[color:var(--color-gin-sage-pale)]",
  "nude-pale": "bg-[color:var(--color-ilm-nude-pale)]",
  "gold-pale": "bg-[color:var(--color-ohm-gold-pale)]",
};

export function Card({
  tone = "paper",
  className,
  ...props
}: { tone?: Tone } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border border-[color:var(--color-ohm-line)] rounded-sm p-8 transition-colors duration-200",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
