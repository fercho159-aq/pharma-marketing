import type { Metadata } from "next";
import { HeaderNav } from "@/components/sections/HeaderNav";
import { Footer } from "@/components/sections/Footer";
import { SuccessClient } from "./SuccessClient";

export const metadata: Metadata = {
  title: "¡Compra realizada! — Grupo OHM",
  description: "Tu pago fue procesado exitosamente.",
};

type Props = {
  searchParams: Promise<{
    payment_id?: string;
    status?: string;
    external_reference?: string;
    merchant_order_id?: string;
    preference_id?: string;
  }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <>
      <HeaderNav variant="grupo" />
      <main className="min-h-[70vh] bg-[color:var(--color-ohm-cream)]">
        <SuccessClient
          paymentId={params.payment_id}
          status={params.status}
          externalReference={params.external_reference}
        />
      </main>
      <Footer tone="grupo" />
    </>
  );
}
