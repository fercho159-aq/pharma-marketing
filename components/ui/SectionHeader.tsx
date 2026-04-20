import { cn } from "@/lib/utils";

type Align = "left" | "center";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: Align;
  tone?: "wine" | "gold" | "sage" | "nude" | "ink";
  className?: string;
};

const eyebrowColor: Record<NonNullable<Props["tone"]>, string> = {
  wine: "text-[color:var(--color-ohm-wine)]",
  gold: "text-[color:var(--color-ohm-gold)]",
  sage: "text-[color:var(--color-gin-sage-dark)]",
  nude: "text-[color:var(--color-ilm-nude-dark)]",
  ink: "text-[color:var(--color-ohm-ink-soft)]",
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "wine",
  className,
}: Props) {
  return (
    <header
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-[11px] uppercase tracking-[0.2em] font-medium mb-4",
            eyebrowColor[tone],
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="text-[length:var(--text-h2)] leading-[1.1] text-[color:var(--color-ohm-ink)]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[color:var(--color-ohm-ink-soft)] text-[1.05rem] leading-[1.6] mt-5 max-w-[52ch]">
          {subtitle}
        </p>
      )}
    </header>
  );
}
