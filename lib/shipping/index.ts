/**
 * Punto de entrada único para cotizar envíos.
 * Selecciona el provider según `SHIPPING_PROVIDER` en .env.local
 * y siempre garantiza al menos una opción (cae a `standard` como fallback).
 */
import type {
  ShippingProviderQuoteInput,
  ShippingQuote,
} from "./types";
import { getStandardQuotes } from "./providers/standard";
import {
  get99MinutosQuotes,
  isNinetyNineConfigured,
} from "./providers/ninetynine";

export type { ShippingAddress, ShippingItem, ShippingQuote } from "./types";

export async function getShippingQuotes(
  input: ShippingProviderQuoteInput,
): Promise<ShippingQuote[]> {
  const provider = (process.env.SHIPPING_PROVIDER ?? "standard").toLowerCase();

  // Siempre incluimos `standard` como base — son tarifas internas que cubren
  // el caso "sin paquetería externa". 99 minutos se agrega encima cuando
  // está configurado y disponible para la zona.
  const standard = await getStandardQuotes(input);

  if (provider === "99minutos" && isNinetyNineConfigured()) {
    const ninetynine = await get99MinutosQuotes(input);
    if (ninetynine.length > 0) {
      // Cuando 99min tiene cobertura, lo ofrecemos primero como recomendado,
      // pero mantenemos `standard` como alternativa.
      return [
        ...ninetynine.map((q, i) => ({ ...q, recommended: i === 0 })),
        ...standard.map((q) => ({ ...q, recommended: false })),
      ];
    }
  }

  return standard;
}
