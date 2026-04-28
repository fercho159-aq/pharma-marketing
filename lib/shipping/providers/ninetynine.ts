/**
 * Provider "99minutos" — integración con la paquetería 99 minutos.
 *
 * ESTADO: stub listo para enchufar la API real cuando el cliente nos entregue
 * las credenciales. Mientras tanto, devuelve [] para que el sistema caiga al
 * provider "standard" (ver lib/shipping/index.ts).
 *
 * Documentación de 99 minutos:
 *   https://devs.99minutos.com/  (se actualizará al recibir acceso real)
 *
 * Endpoints típicos que vamos a usar:
 *   POST /v3/orders/quote   → cotiza un envío
 *   POST /v3/orders          → crea el envío real (después de pago confirmado)
 *   GET  /v3/orders/:id      → tracking
 *
 * Cuando lleguen las credenciales:
 *   1. Llenar NINETY_NINE_API_KEY en .env.local
 *   2. Reemplazar el TODO de abajo con el fetch real al endpoint de quote
 *   3. Mapear la respuesta a ShippingQuote[]
 *   4. Cambiar SHIPPING_PROVIDER="99minutos" en .env.local
 *   5. Para crear el envío post-pago, ver el webhook MP en
 *      app/api/checkout/webhook/route.ts (TODO marcado ahí también)
 */
import type {
  ShippingProviderQuoteInput,
  ShippingQuote,
} from "../types";

const API_URL = process.env.NINETY_NINE_API_URL ?? "https://api.99minutos.com/v3";
const API_KEY = process.env.NINETY_NINE_API_KEY;

const ORIGIN = {
  zip: process.env.SHIPPING_ORIGIN_ZIP ?? "13000",
  city: process.env.SHIPPING_ORIGIN_CITY ?? "Tláhuac",
  state: process.env.SHIPPING_ORIGIN_STATE ?? "CDMX",
  street: process.env.SHIPPING_ORIGIN_STREET ?? "Av. Tláhuac 2772",
};

export function isNinetyNineConfigured() {
  return Boolean(API_KEY && API_KEY.length > 0);
}

export async function get99MinutosQuotes(
  input: ShippingProviderQuoteInput,
): Promise<ShippingQuote[]> {
  if (!isNinetyNineConfigured()) {
    // Sin credenciales — el caller usará el fallback `standard`.
    return [];
  }

  const { address, items } = input;

  // Total de peso estimado (gramos). Si un item no trae weightGrams asumimos 250 g.
  const totalWeight = items.reduce(
    (acc, i) => acc + (i.weightGrams ?? 250) * i.qty,
    0,
  );

  try {
    // ─────────────────────────────────────────────────────────────────────
    // TODO: Reemplazar este bloque con la llamada real a 99 minutos.
    // El shape del request depende de su API definitiva. Esquema aproximado:
    //
    // const res = await fetch(`${API_URL}/orders/quote`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     pickup: {
    //       postalCode: ORIGIN.zip,
    //       city: ORIGIN.city,
    //       state: ORIGIN.state,
    //       address: ORIGIN.street,
    //     },
    //     dropoff: {
    //       postalCode: address.zip,
    //       city: address.city,
    //       state: address.state,
    //       address: address.street,
    //     },
    //     packages: [{
    //       weight: totalWeight / 1000, // kg
    //       length: 20, width: 15, height: 10, // cm — defaults razonables
    //     }],
    //   }),
    // });
    //
    // if (!res.ok) throw new Error(`99min quote failed: ${res.status}`);
    // const data = await res.json();
    //
    // return data.services.map((svc: any): ShippingQuote => ({
    //   id: `99min-${svc.code}`,
    //   label: `99 minutos · ${svc.name}`,
    //   carrier: "99minutos",
    //   eta: svc.deliveryEstimate,
    //   price: Number(svc.totalPrice),
    //   recommended: svc.code === "sameDay",
    // }));
    // ─────────────────────────────────────────────────────────────────────

    // Mientras llegan las credenciales — devolvemos [] para activar fallback.
    void totalWeight;
    void ORIGIN;
    void API_URL;
    void address;
    return [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[shipping/99minutos] error cotizando:", err);
    return [];
  }
}

/**
 * Crea el envío real en 99 minutos después de que MP confirma el pago.
 * Se llama desde el webhook de Mercado Pago.
 *
 * TODO: implementar cuando lleguen credenciales y se defina el flujo de
 * persistencia de órdenes (ahora mismo el webhook solo loguea).
 */
export async function create99MinutosShipment(_args: {
  externalReference: string;
  address: ShippingProviderQuoteInput["address"];
  items: ShippingProviderQuoteInput["items"];
  serviceCode: string;
}) {
  if (!isNinetyNineConfigured()) {
    throw new Error("99 minutos no está configurado (falta NINETY_NINE_API_KEY).");
  }
  // TODO: POST /v3/orders con el payload completo + tracking number.
  throw new Error("create99MinutosShipment todavía no está implementado.");
}
