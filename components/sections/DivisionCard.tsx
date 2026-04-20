import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  accent: "wine" | "sage" | "nude";
  image?: string;
  imageAlt?: string;
};

const accentStyles = {
  wine: {
    bg: "bg-[color:var(--color-ohm-paper)]",
    accent: "text-[color:var(--color-ohm-wine)]",
    line: "bg-[color:var(--color-ohm-wine)]",
    hover: "hover:border-[color:var(--color-ohm-wine-soft)]",
  },
  sage: {
    bg: "bg-[color:var(--color-gin-sage-pale)]",
    accent: "text-[color:var(--color-gin-sage-dark)]",
    line: "bg-[color:var(--color-gin-sage-dark)]",
    hover: "hover:border-[color:var(--color-gin-sage-soft)]",
  },
  nude: {
    bg: "bg-[color:var(--color-ilm-nude-pale)]",
    accent: "text-[color:var(--color-ilm-nude-dark)]",
    line: "bg-[color:var(--color-ilm-nude-dark)]",
    hover: "hover:border-[color:var(--color-ilm-nude-soft)]",
  },
};

export function DivisionCard({
  eyebrow,
  title,
  description,
  href,
  accent,
  image,
  imageAlt,
}: Props) {
  const s = accentStyles[accent];
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col border border-[color:var(--color-ohm-line)] rounded-sm overflow-hidden transition-colors duration-300",
        s.bg,
        s.hover,
      )}
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-[color:var(--color-ohm-gold-pale)]">
        {image ? (
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[color:var(--color-ohm-gold)]">
            {title}
          </div>
        )}
      </div>
      <div className="p-8 flex flex-col gap-4 flex-1">
        <p className={cn("text-[10px] uppercase tracking-[0.2em] font-medium", s.accent)}>
          {eyebrow}
        </p>
        <h3 className="text-[1.75rem] leading-[1.1] text-[color:var(--color-ohm-ink)]">
          {title}
        </h3>
        <p className="text-[color:var(--color-ohm-ink-soft)] leading-relaxed text-[0.95rem] flex-1">
          {description}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className={cn("text-sm font-medium", s.accent)}>Conocer más</span>
          <ArrowUpRight
            size={16}
            strokeWidth={1.5}
            className={cn("transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1", s.accent)}
          />
        </div>
      </div>
      <span className={cn("h-[2px] transition-all duration-500 w-0 group-hover:w-full", s.line)} />
    </Link>
  );
}
