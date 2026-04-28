/**
 * POST /api/shipping/quote
 *
 * Body: { address: ShippingAddress, items: ShippingItem[], subtotal: number }
 * Returns: { quotes: ShippingQuote[] }
 *
 * El frontend lo llama justo después de que el usuario ingresa CP/dirección
 * para mostrarle las opciones de envío disponibles.
 */
import { NextResponse } from "next/server";
import { getShippingQuotes } from "@/lib/shipping";
import type { ShippingAddress, ShippingItem } from "@/lib/shipping/types";

export const dynamic = "force-dynamic";

type Body = {
  address: ShippingAddress;
  items: ShippingItem[];
  subtotal: number;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Body JSON inválido." }, { status: 400 });
  }

  if (!body?.address?.zip || !Array.isArray(body.items)) {
    return NextResponse.json(
      { error: "Faltan address.zip o items." },
      { status: 400 },
    );
  }

  try {
    const quotes = await getShippingQuotes({
      address: body.address,
      items: body.items,
      subtotal: Number(body.subtotal) || 0,
    });

    return NextResponse.json({ quotes });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[/api/shipping/quote]", err);
    return NextResponse.json(
      { error: "Error cotizando envío." },
      { status: 500 },
    );
  }
}
