import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { MapPin, Phone } from "lucide-react";
import { Divider } from "@/components/ui/Divider";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const ADDRESS = "Av. Tláhuac 2772, Santa Ana Poniente, Tláhuac, CDMX";
const WA_NUMBER = "5215575538801";

export function Footer({ tone = "grupo" }: { tone?: "grupo" | "sage" | "nude" }) {
  const accentLabel =
    tone === "sage"
      ? "Farmayoreo Gin"
      : tone === "nude"
        ? "I Love Myself"
        : "Grupo OHM";

  return (
    <footer className="mt-32 border-t border-[color:var(--color-ohm-line)] bg-[color:var(--color-ohm-paper)]">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Logo division="grupo-ohm" className="text-xl mb-6" />
            <p className="text-[color:var(--color-ohm-ink-soft)] leading-relaxed max-w-sm">
              Distribución farmacéutica, farmacia al consumidor y skincare premium desde la Ciudad de México.
            </p>
            <address className="not-italic mt-8 space-y-3 text-sm text-[color:var(--color-ohm-ink-soft)]">
              <p className="flex items-start gap-3">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[color:var(--color-ohm-gold)]" />
                <span>{ADDRESS}</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone size={16} strokeWidth={1.5} className="text-[color:var(--color-ohm-gold)]" />
                <a href={`https://wa.me/${WA_NUMBER}`} className="hover:text-[color:var(--color-ohm-wine)]">
                  +52 1 55 7553 8801
                </a>
              </p>
            </address>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[color:var(--color-ohm-wine)] mb-4">
              Divisiones
            </p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/distribucion" className="text-[color:var(--color-ohm-ink)] hover:text-[color:var(--color-ohm-wine)]">Distribución</Link></li>
              <li><Link href="/farmacia" className="text-[color:var(--color-ohm-ink)] hover:text-[color:var(--color-ohm-wine)]">Farmacia</Link></li>
              <li><Link href="/skincare" className="text-[color:var(--color-ohm-ink)] hover:text-[color:var(--color-ohm-wine)]">Skincare</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[color:var(--color-ohm-wine)] mb-4">
              Compañía
            </p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/nosotros" className="text-[color:var(--color-ohm-ink)] hover:text-[color:var(--color-ohm-wine)]">Nosotros</Link></li>
              <li><Link href="/contacto" className="text-[color:var(--color-ohm-ink)] hover:text-[color:var(--color-ohm-wine)]">Contacto</Link></li>
              <li><Link href="/aviso-privacidad" className="text-[color:var(--color-ohm-ink)] hover:text-[color:var(--color-ohm-wine)]">Aviso de privacidad</Link></li>
            </ul>
            <div className="flex gap-3 mt-6" aria-label="Redes sociales">
              <a href="#" aria-label="Instagram" className="text-[color:var(--color-ohm-ink-soft)] hover:text-[color:var(--color-ohm-wine)]">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="Facebook" className="text-[color:var(--color-ohm-ink-soft)] hover:text-[color:var(--color-ohm-wine)]">
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Divider ornament tone="gold" />
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[color:var(--color-ohm-ink-soft)]">
          <p>© {new Date().getFullYear()} {accentLabel}. Todos los derechos reservados.</p>
          <p>Hecho en CDMX · Salud, farmacia y belleza con cuidado editorial.</p>
        </div>
      </div>
    </footer>
  );
}
