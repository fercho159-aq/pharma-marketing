import type { Metadata } from "next";
import { HeaderNav } from "@/components/sections/HeaderNav";
import { Footer } from "@/components/sections/Footer";
import { CartPageClient } from "./CartPageClient";

export const metadata: Metadata = {
  title: "Carrito — Grupo OHM",
  description: "Revisa tu pedido y finaliza tu compra con Grupo OHM.",
};

export default function CarritoPage() {
  return (
    <>
      <HeaderNav variant="grupo" />
      <main className="min-h-[70vh] bg-[color:var(--color-ohm-cream)]">
        <CartPageClient />
      </main>
      <Footer tone="grupo" />
    </>
  );
}
