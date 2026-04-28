"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";

type PendingOrder = {
  externalReference: string;
  shipping: {
    fullName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  method: { label: string; carrier: string; eta: string; price: number };
  subtotal: number;
  total: number;
  ts: number;
};

type Props = {
  paymentId?: string;
  status?: string;
  externalReference?: string;
};

function formatMXN(n: number) {
  return `$${n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;
}

export function SuccessClient({ paymentId, status, externalReference }: Props) {
  const { clear } = useCart();
  const [order, setOrder] = useState<PendingOrder | null>(null);

  useEffect(() => {
    // Recupera info que el cart guardó antes de redirigir a MP
    try {
      const raw = window.sessionStorage.getItem("ohm-pending-order");
      if (raw) setOrder(JSON.parse(raw) as PendingOrder);
    } catch {
      /* ignore */
    }
    // Limpia el carrito ahora que la compra se completó
    clear();
    // Limpia el storage para que un refresh no muestre la misma orden
    try {
      window.sessionStorage.removeItem("ohm-pending-order");
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ref = externalReference ?? order?.externalReference ?? "—";

  return (
    <section className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-24">
      <div className="bg-[color:var(--color-ohm-paper)] border border-[color:var(--color-ohm-line)] rounded-sm p-8 md:p-12 text-center">
        <CheckCircle2 size={56} strokeWidth={1.25} className="mx-auto text-green-600" />
        <h1 className="mt-6 text-3xl md:text-4xl font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
          ¡Gracias por tu compra!
        </h1>
        <p className="mt-3 text-[color:var(--color-ohm-ink-soft)]">
          Tu pago{status === "approved" ? " fue aprobado" : ""} y estamos preparando tu pedido.
        </p>

        <dl className="mt-8 text-left border-t border-[color:var(--color-ohm-line)] pt-6 space-y-3 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-[color:var(--color-ohm-ink-soft)]">Referencia del pedido</dt>
            <dd className="font-semibold text-[color:var(--color-ohm-wine)]">{ref}</dd>
          </div>
          {paymentId && (
            <div className="flex justify-between gap-3">
              <dt className="text-[color:var(--color-ohm-ink-soft)]">ID de pago Mercado Pago</dt>
              <dd className="font-mono text-[color:var(--color-ohm-ink)]">{paymentId}</dd>
            </div>
          )}
          {order && (
            <>
              <div className="flex justify-between gap-3">
                <dt className="text-[color:var(--color-ohm-ink-soft)]">Envío a</dt>
                <dd className="text-[color:var(--color-ohm-ink)] text-right max-w-[60%]">
                  {order.shipping.fullName}
                  <br />
                  <span className="text-xs text-[color:var(--color-ohm-ink-soft)]">
                    {order.shipping.street}, {order.shipping.city}, {order.shipping.state}{" "}
                    {order.shipping.zip}
                  </span>
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[color:var(--color-ohm-ink-soft)]">Método de envío</dt>
                <dd className="text-[color:var(--color-ohm-ink)]">
                  {order.method.label}{" "}
                  <span className="text-xs text-[color:var(--color-ohm-ink-soft)]">
                    ({order.method.eta})
                  </span>
                </dd>
              </div>
              <div className="flex justify-between gap-3 pt-2 border-t border-[color:var(--color-ohm-line)]">
                <dt className="text-[color:var(--color-ohm-ink-soft)]">Total pagado</dt>
                <dd className="font-semibold text-lg text-[color:var(--color-ohm-wine)]">
                  {formatMXN(order.total)}
                </dd>
              </div>
            </>
          )}
        </dl>

        <p className="mt-6 text-xs text-[color:var(--color-ohm-ink-soft)] italic">
          Te enviaremos un correo a{" "}
          <span className="font-medium">{order?.shipping.email ?? "tu correo registrado"}</span>{" "}
          con los detalles del envío y tracking en cuanto el paquete salga de almacén.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            href="/farmacia"
            className="inline-flex items-center gap-2 border border-[color:var(--color-gin-sage-dark)] text-[color:var(--color-gin-sage-dark)] px-5 py-2.5 rounded-sm hover:bg-[color:var(--color-gin-sage-pale)] text-sm font-medium"
          >
            <ShoppingBag size={14} strokeWidth={1.75} />
            Seguir comprando · Farmacia
          </Link>
          <Link
            href="/skincare"
            className="inline-flex items-center gap-2 border border-[color:var(--color-ilm-nude-dark)] text-[color:var(--color-ilm-nude-dark)] px-5 py-2.5 rounded-sm hover:bg-[color:var(--color-ilm-nude-pale)] text-sm font-medium"
          >
            Skincare
          </Link>
        </div>
      </div>
    </section>
  );
}
