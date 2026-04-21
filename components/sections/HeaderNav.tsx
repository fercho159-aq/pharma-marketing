import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { MessageCircle } from "lucide-react";

type NavVariant = "grupo" | "distribucion" | "farmacia" | "skincare";

const navLinks = [
  { href: "/distribucion", label: "Distribución" },
  { href: "/farmacia", label: "Farmacia" },
  { href: "/skincare", label: "Skincare" },
  { href: "/nosotros", label: "Nosotros" },
];

const WA_NUMBER = "5215555555555"; // TODO: número real de Sheccid

export function HeaderNav({ variant = "grupo" }: { variant?: NavVariant }) {
  const isFarmacia = variant === "farmacia";
  const logoWidth = isFarmacia ? 270 : 300;
  const logoHeight = isFarmacia ? 68 : 75;
  const logoHeightClass = isFarmacia ? "h-[68px] md:h-[68px]" : "h-[60px] md:h-[75px]";

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-ohm-line)] bg-[color:var(--color-ohm-cream)]/90 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-ohm-cream)]/75">
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between gap-6">
        <Logo
          division={variant === "farmacia" ? "gin" : variant === "skincare" ? "i-love-myself" : "grupo-ohm"}
          variant="horizontal"
          href="/"
          className={`${logoHeightClass} w-auto text-base md:text-lg`}
          width={logoWidth}
          height={logoHeight}
        />

        <nav className="hidden md:flex items-center gap-8" aria-label="Primaria">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[color:var(--color-ohm-ink-soft)] hover:text-[color:var(--color-ohm-wine)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href={`https://wa.me/${WA_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-ohm-ink)] border border-[color:var(--color-ohm-gold)] px-4 py-2 rounded-sm hover:bg-[color:var(--color-ohm-gold-pale)] transition-colors"
        >
          <MessageCircle size={16} strokeWidth={1.5} />
          WhatsApp
        </a>
      </div>
    </header>
  );
}
