import { cn } from "@/lib/utils";

type Props = {
  ornament?: boolean;
  tone?: "line" | "gold";
  className?: string;
};

export function Divider({ ornament = false, tone = "line", className }: Props) {
  const color = tone === "gold" ? "var(--color-ohm-gold-soft)" : "var(--color-ohm-line)";
  if (!ornament) {
    return (
      <hr
        className={cn("border-0 h-px w-full", className)}
        style={{ background: color }}
      />
    );
  }
  return (
    <div className={cn("flex items-center gap-4 w-full", className)}>
      <span className="flex-1 h-px" style={{ background: color }} />
      <span
        className="text-[10px] tracking-[0.3em]"
        style={{ color: tone === "gold" ? "var(--color-ohm-gold)" : "var(--color-ohm-ink-soft)" }}
      >
        ✦
      </span>
      <span className="flex-1 h-px" style={{ background: color }} />
    </div>
  );
}
