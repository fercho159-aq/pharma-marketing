/**
 * POST /api/checkout/preference
 *
 * Crea una preference de Mercado Pago Checkout Pro y devuelve el `init_point`
 * al frontend, que redirige al usuario al checkout de MP.
 *
 * Body: {
 *   items: CartItem[],
 *   shipping: ShippingAddress,
 *   shippingMethod: ShippingQuote
 * }
 *
 * Returns: { id, initPoint, sandboxInitPoint, externalReference }
 */
import { NextResponse } from "next/server";
import { isMpConfigured } from "@/lib/mercadopago/client";
import { createCheckoutPreference } from "@/lib/mercadopago/preference";
import type { CartItem } from "@/lib/cart/CartContext";
import type { ShippingAddress, ShippingQuote } from "@/lib/shipping/types";

export const dynamic = "force-dynamic";

type Body = {
  items: CartItem[];
  shipping: ShippingAddress;
  shippingMethod: ShippingQuote;
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

  // Base URL: prioriza la variable de entorno; en dev cae al origin del request.
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    new URL(req.url).origin;

  try {
    const preference = await createCheckoutPreference({
      items: body.items,
      shipping: body.shipping,
      shippingMethod: body.shippingMethod,
      baseUrl,
    });

    return NextResponse.json(preference);
  } catch (err) {
    // eslint-disable-next-line no-console
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
