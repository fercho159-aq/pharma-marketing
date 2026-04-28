/**
 * Tipos compartidos para el sistema de envíos.
 * El frontend, los route handlers y los providers todos hablan estos tipos.
 */

export type ShippingAddress = {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type ShippingItem = {
  id: string;
  name: string;
  qty: number;
  /** Peso unitario en gramos. Si no se conoce, se asume 250 g por SKU. */
  weightGrams?: number;
};

export type ShippingQuote = {
  /** ID estable del método de envío para enviarlo al backend. */
  id: string;
  /** Nombre comercial: "99 minutos · Mismo día", "Estándar nacional", etc. */
  label: string;
  /** Empresa que ejecuta el envío. */
  carrier: "99minutos" | "standard" | "internal";
  /** Tiempo estimado de entrega legible: "2–4 hrs", "24–48 hrs". */
  eta: string;
  /** Precio en MXN (no centavos). */
  price: number;
  /** Si es true, la opción se marca como destacada en la UI. */
  recommended?: boolean;
};

export type ShippingProviderQuoteInput = {
  address: ShippingAddress;
  items: ShippingItem[];
  /** Subtotal de productos en MXN — algunos providers lo usan para envío gratis. */
  subtotal: number;
};
