import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { HeaderNav } from "@/components/sections/HeaderNav";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Pago pendiente — Grupo OHM",
  description: "Tu pago está en proceso de confirmación.",
};

type Props = {
  searchParams: Promise<{
    payment_id?: string;
    external_reference?: string;
  }>;
};

export default async function PendingPage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <>
      <HeaderNav variant="grupo" />
      <main className="min-h-[70vh] bg-[color:var(--color-ohm-cream)]">
        <section className="mx-auto max-w-2xl px-6 md:px-10 py-16 md:py-24 text-center">
          <div className="bg-[color:var(--color-ohm-paper)] border border-[color:var(--color-ohm-line)] rounded-sm p-8 md:p-12">
            <Clock size={56} strokeWidth={1.25} className="mx-auto text-amber-500" />
            <h1 className="mt-6 text-3xl md:text-4xl font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
              Pago en proceso
            </h1>
            <p className="mt-3 text-[color:var(--color-ohm-ink-soft)]">
              Tu pago está siendo verificado. Esto puede tardar de unos minutos a 24 horas
              dependiendo del medio de pago elegido (OXXO, transferencia, etc.).
            </p>

            {params.external_reference && (
              <p className="mt-4 text-sm">
                Referencia:{" "}
                <span className="font-semibold text-[color:var(--color-ohm-wine)]">
                  {params.external_reference}
                </span>
              </p>
            )}

            <p className="mt-4 text-xs text-[color:var(--color-ohm-ink-soft)] italic">
              Te avisaremos por correo cuando se confirme. No es necesario que vuelvas a pagar.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-[color:var(--color-ohm-line)] text-[color:var(--color-ohm-ink)] px-5 py-2.5 rounded-sm hover:bg-[color:var(--color-ohm-cream)] text-sm font-medium"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer tone="grupo" />
    </>
  );
}
