/**
 * POST /api/checkout/preference
 *
 * 1. Crea la preference en Mercado Pago.
 * 2. Guarda la orden como PENDING en la DB de Neon.
 * 3. Devuelve { id, initPoint, sandboxInitPoint, externalReference } al frontend.
 *
 * Body: {
 *   items: CartItem[],
 *   shipping: ShippingAddress,
 *   shippingMethod: ShippingQuote,
 *   subtotal: number
 * }
 */
import { NextResponse } from "next/server";
import { isMpConfigured } from "@/lib/mercadopago/client";
import { createCheckoutPreference } from "@/lib/mercadopago/preference";
import { createPendingOrder } from "@/lib/db/orders";
import type { CartItem } from "@/lib/cart/CartContext";
import type { ShippingAddress, ShippingQuote } from "@/lib/shipping/types";

export const dynamic = "force-dynamic";

type Body = {
  items: CartItem[];
  shipping: ShippingAddress;
  shippingMethod: ShippingQuote;
  subtotal: number;
};

export async function POST(req: Request) {
  if (!isMpConfigured()) {
    return NextResponse.json(
      {
        error:
          "Mercado Pago no está configurado en el servidor. Falta MP_ACCESS_TOKEN en .env.local.",
      },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Body JSON inválido." }, { status: 400 });
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json(
      { error: "El carrito está vacío." },
      { status: 400 },
    );
  }

  if (!body.shipping?.email || !body.shipping?.zip) {
    return NextResponse.json(
      { error: "Faltan datos de envío." },
      { status: 400 },
    );
  }

  if (!body.shippingMethod?.id) {
    return NextResponse.json(
      { error: "Selecciona un método de envío." },
      { status: 400 },
    );
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    new URL(req.url).origin;

  try {
    // 1. Crear preference en Mercado Pago
    const preference = await createCheckoutPreference({
      items: body.items,
      shipping: body.shipping,
      shippingMethod: body.shippingMethod,
      baseUrl,
    });

    // 2. Guardar orden pendiente en DB (no bloqueamos si falla — MP ya aceptó)
    try {
      await createPendingOrder({
        externalReference: preference.externalReference,
        mpPreferenceId: preference.id,
        items: body.items,
        shipping: body.shipping,
        shippingMethod: body.shippingMethod,
        subtotal: typeof body.subtotal === "number" ? body.subtotal : 0,
      });
    } catch (dbErr) {
      // Log pero no interrumpimos el flujo — el usuario ya puede pagar
      console.error("[preference] error guardando orden en DB:", dbErr);
    }

    return NextResponse.json(preference);
  } catch (err) {
    console.error("[/api/checkout/preference] error MP:", err);
    return NextResponse.json(
      {
        error: "No se pudo crear la preference de Mercado Pago.",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 502 },
    );
  }
}
