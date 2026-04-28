import type { Metadata } from "next";
import Link from "next/link";
import { XCircle, RotateCw } from "lucide-react";
import { HeaderNav } from "@/components/sections/HeaderNav";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Pago no completado — Grupo OHM",
  description: "Tu pago no se procesó. Intenta de nuevo.",
};

type Props = {
  searchParams: Promise<{
    status_detail?: string;
    payment_id?: string;
  }>;
};

export default async function FailurePage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <>
      <HeaderNav variant="grupo" />
      <main className="min-h-[70vh] bg-[color:var(--color-ohm-cream)]">
        <section className="mx-auto max-w-2xl px-6 md:px-10 py-16 md:py-24 text-center">
          <div className="bg-[color:var(--color-ohm-paper)] border border-[color:var(--color-ohm-line)] rounded-sm p-8 md:p-12">
            <XCircle size={56} strokeWidth={1.25} className="mx-auto text-red-600" />
            <h1 className="mt-6 text-3xl md:text-4xl font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
              Pago no completado
            </h1>
            <p className="mt-3 text-[color:var(--color-ohm-ink-soft)]">
              No pudimos procesar tu pago. Esto puede pasar por fondos insuficientes,
              datos incorrectos o que el banco rechazó la transacción.
            </p>
            {params.status_detail && (
              <p className="mt-3 text-xs font-mono text-[color:var(--color-ohm-ink-soft)]">
                Motivo: {params.status_detail}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link
                href="/carrito"
                className="inline-flex items-center gap-2 bg-[color:var(--color-ohm-wine)] text-[color:var(--color-ohm-cream)] px-5 py-2.5 rounded-sm hover:bg-[color:var(--color-ohm-wine-dark)] text-sm font-semibold"
              >
                <RotateCw size={14} strokeWidth={1.75} />
                Reintentar pago
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-[color:var(--color-ohm-line)] text-[color:var(--color-ohm-ink)] px-5 py-2.5 rounded-sm hover:bg-[color:var(--color-ohm-cream)] text-sm font-medium"
              >
                Volver al inicio
              </Link>
            </div>

            <p className="mt-6 text-xs text-[color:var(--color-ohm-ink-soft)]">
              ¿Necesitas ayuda? Escríbenos por WhatsApp y un asesor te ayuda a completar
              la compra.
            </p>
          </div>
        </section>
      </main>
      <Footer tone="grupo" />
    </>
  );
}
