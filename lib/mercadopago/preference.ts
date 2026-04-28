/**
 * Construcción de la "preference" de Mercado Pago Checkout Pro.
 * Una preference describe el carrito + datos del comprador + URLs de retorno.
 * El customer es redirigido al `init_point` para pagar dentro del entorno MP.
 *
 * Docs: https://www.mercadopago.com.mx/developers/es/docs/checkout-pro
 */
import { Preference } from "mercadopago";
import { randomUUID } from "node:crypto";
import { mpClient } from "./client";
import type { CartItem } from "@/lib/cart/CartContext";
import type { ShippingAddress, ShippingQuote } from "@/lib/shipping/types";

export type CreatePreferenceInput = {
  items: CartItem[];
  shipping: ShippingAddress;
  shippingMethod: ShippingQuote;
  /** External reference que viaja con el pago (lo verás en el webhook). */
  externalReference?: string;
  /** Base URL absoluta — usada para construir back_urls + notification_url. */
  baseUrl: string;
};

export type PreferenceResult = {
  id: string;
  initPoint: string;
  sandboxInitPoint: string;
  externalReference: string;
};

export async function createCheckoutPreference(
  input: CreatePreferenceInput,
): Promise<PreferenceResult> {
  const { items, shipping, shippingMethod, baseUrl } = input;
  const externalReference = input.externalReference ?? `OHM-${Date.now()}`;

  const [firstName, ...rest] = shipping.fullName.trim().split(/\s+/);
  const lastName = rest.join(" ") || firstName;

  const preference = new Preference(mpClient);

  const result = await preference.create({
    body: {
      items: items.map(({ product, qty }) => ({
        id: product.id,
        title: product.name,
        description: product.tagline.slice(0, 250),
        category_id: product.category,
        quantity: qty,
        unit_price: Number(product.price),
        currency_id: "MXN",
        picture_url: product.image?.startsWith("http")
          ? product.image
          : `${baseUrl}${product.image}`,
      })),

      payer: {
        name: firstName,
        surname: lastName,
        email: shipping.email,
        phone: parseMexPhone(shipping.phone),
        address: {
          zip_code: shipping.zip,
          street_name: shipping.street,
        },
      },

      // Costo de envío como ítem separado para que aparezca en el resumen.
      // (Alternativa: usar shipments.cost — pero esto es más visible en MP.)
      shipments: {
        cost: shippingMethod.price,
        mode: "not_specified",
        receiver_address: {
          zip_code: shipping.zip,
          street_name: shipping.street,
          city_name: shipping.city,
          state_name: shipping.state,
        },
      },

      back_urls: {
        success: `${baseUrl}/carrito/success`,
        failure: `${baseUrl}/carrito/failure`,
        pending: `${baseUrl}/carrito/pending`,
      },
      auto_return: "approved",

      notification_url: `${baseUrl}/api/checkout/webhook`,

      external_reference: externalReference,

      statement_descriptor: "GRUPO OHM",

      metadata: {
        shipping_method: shippingMethod.id,
        shipping_carrier: shippingMethod.carrier,
        items_count: items.reduce((acc, i) => acc + i.qty, 0),
      },
    },
    requestOptions: {
      idempotencyKey: randomUUID(),
    },
  });

  if (!result.id || !result.init_point) {
    throw new Error("Mercado Pago no devolvió un init_point válido.");
  }

  return {
    id: result.id,
    initPoint: result.init_point,
    sandboxInitPoint: result.sandbox_init_point ?? result.init_point,
    externalReference,
  };
}

/**
 * Convierte un teléfono mexicano a la estructura que pide MP.
 * Acepta entradas tipo "+52 55 1234 5678", "5512345678", etc.
 */
function parseMexPhone(raw: string): { area_code: string; number: string } | undefined {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 10) return undefined;
  // últimos 10 dígitos son el número nacional MX
  const national = digits.slice(-10);
  return { area_code: national.slice(0, 2), number: national.slice(2) };
}
