import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";

type Variant = "wine" | "gold-ghost" | "outline" | "link" | "sage" | "nude";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center font-medium tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-sm min-h-10",
  md: "px-6 py-3 text-base rounded-sm min-h-11",
  lg: "px-8 py-4 text-base rounded-sm min-h-12",
};

const variants: Record<Variant, string> = {
  wine:
    "bg-[color:var(--color-ohm-wine)] text-[color:var(--color-ohm-cream)] hover:bg-[color:var(--color-ohm-wine-dark)] focus-visible:outline-[color:var(--color-ohm-gold)]",
  "gold-ghost":
    "border border-[color:var(--color-ohm-gold)] text-[color:var(--color-ohm-ink)] bg-transparent hover:bg-[color:var(--color-ohm-gold-pale)] focus-visible:outline-[color:var(--color-ohm-gold)]",
  outline:
    "border border-[color:var(--color-ohm-line)] text-[color:var(--color-ohm-ink)] bg-transparent hover:border-[color:var(--color-ohm-wine-soft)] hover:bg-[color:var(--color-ohm-paper)] focus-visible:outline-[color:var(--color-ohm-wine)]",
  link:
    "px-0 py-1 !min-h-0 text-[color:var(--color-ohm-ink-soft)] hover:text-[color:var(--color-ohm-wine)] border-b border-[color:var(--color-ohm-line)] hover:border-[color:var(--color-ohm-wine)] rounded-none focus-visible:outline-[color:var(--color-ohm-wine)]",
  sage:
    "bg-[color:var(--color-gin-sage)] text-[color:var(--color-ohm-cream)] hover:bg-[color:var(--color-gin-sage-dark)] focus-visible:outline-[color:var(--color-ohm-gold)]",
  nude:
    "bg-[color:var(--color-ilm-nude)] text-[color:var(--color-ohm-ink)] hover:bg-[color:var(--color-ilm-nude-dark)] hover:text-[color:var(--color-ohm-cream)] focus-visible:outline-[color:var(--color-ohm-gold)]",
};

type Props = {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children">;

export function Button({
  variant = "wine",
  size = "md",
  href,
  className,
  children,
  ...rest
}: Props) {
  const classes = cn(base, sizes[size], variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as object)}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
