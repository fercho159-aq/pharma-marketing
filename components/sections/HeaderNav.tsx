import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { CartIcon } from "@/components/ui/CartIcon";
import { HeaderSearch } from "@/components/sections/HeaderSearch";
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
  const isDistribucion = variant === "distribucion" || variant === "grupo";
  const isSkincare = variant === "skincare";

  let logoWidth = 255;
  let logoHeight = 64;
  let logoHeightClass = "h-[55px] md:h-[64px]";

  if (isFarmacia) {
    logoWidth = 270;
    logoHeight = 68;
    logoHeightClass = "h-[68px] md:h-[68px]";
  } else if (isDistribucion) {
    logoWidth = 240;
    logoHeight = 60;
    logoHeightClass = "h-[60px] md:h-[60px]";
  } else if (isSkincare) {
    logoWidth = 255;
    logoHeight = 64;
    logoHeightClass = "h-[55px] md:h-[64px]";
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-ohm-line)] bg-[color:var(--color-ohm-cream)]/90 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-ohm-cream)]/75">
      <div className="mx-auto max-w-7xl px-4 md:px-10 h-16 flex items-center justify-between gap-3 md:gap-6">
        <Logo
          division={variant === "farmacia" ? "gin" : variant === "skincare" ? "i-love-myself" : "grupo-ohm"}
          variant="horizontal"
          href="/"
          className={`${logoHeightClass} w-auto text-base md:text-lg shrink-0`}
          width={logoWidth}
          height={logoHeight}
        />

        {/* Buscador (lg: inline | <lg: botón ícono) */}
        <HeaderSearch />

        <nav className="hidden md:flex lg:hidden xl:flex items-center gap-6 xl:gap-8" aria-label="Primaria">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm xl:text-base font-medium text-[color:var(--color-ohm-ink-soft)] hover:text-[color:var(--color-ohm-wine)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-ohm-ink)] border border-[color:var(--color-ohm-gold)] px-3 xl:px-4 py-2 rounded-sm hover:bg-[color:var(--color-ohm-gold-pale)] transition-colors"
          >
            <MessageCircle size={16} strokeWidth={1.5} />
            <span className="hidden xl:inline">WhatsApp</span>
          </a>
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
