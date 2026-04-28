/**
 * Funciones de acceso a DB para órdenes.
 * Solo se llaman desde API routes (server-side).
 */

import { db } from "./client";
import type { OrderStatus } from "@/lib/generated/prisma/client";
import type { CartItem } from "@/lib/cart/CartContext";
import type { ShippingAddress, ShippingQuote } from "@/lib/shipping/types";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CreateOrderInput = {
  externalReference: string;
  mpPreferenceId: string;
  items: CartItem[];
  shipping: ShippingAddress;
  shippingMethod: ShippingQuote;
  subtotal: number;
};

export type UpdateOrderPaymentInput = {
  externalReference: string;
  mpPaymentId: string;
  status: OrderStatus;
  mpStatusDetail?: string;
  mpPaymentMethod?: string;
};

// ─── Crear orden pendiente (al crear la preference) ───────────────────────────

export async function createPendingOrder(input: CreateOrderInput) {
  const {
    externalReference,
    mpPreferenceId,
    items,
    shipping,
    shippingMethod,
    subtotal,
  } = input;

  const total = subtotal + shippingMethod.price;

  return db.order.create({
    data: {
      externalReference,
      mpPreferenceId,
      status: "PENDING",

      subtotal,
      shippingCost: shippingMethod.price,
      total,
      currency: "MXN",

      payerName: shipping.fullName,
      payerEmail: shipping.email,
      payerPhone: shipping.phone ?? null,

      shippingStreet: shipping.street,
      shippingCity: shipping.city,
      shippingState: shipping.state,
      shippingZip: shipping.zip,

      shippingMethodId: shippingMethod.id,
      shippingMethodLabel: shippingMethod.label,
      shippingCarrier: shippingMethod.carrier,
      shippingEta: shippingMethod.eta,

      items: {
        create: items.map(({ product, qty }) => ({
          productId: product.id,
          productName: product.name,
          productImage: product.image ?? null,
          category: product.category ?? null,
          quantity: qty,
          unitPrice: product.price,
          lineTotal: qty * product.price,
        })),
      },
    },
    include: { items: true },
  });
}

// ─── Actualizar orden al recibir webhook de MP ────────────────────────────────

export async function updateOrderPayment(input: UpdateOrderPaymentInput) {
  const { externalReference, mpPaymentId, status, mpStatusDetail, mpPaymentMethod } = input;

  return db.order.update({
    where: { externalReference },
    data: {
      mpPaymentId,
      status,
      mpStatusDetail: mpStatusDetail ?? null,
      mpPaymentMethod: mpPaymentMethod ?? null,
    },
  });
}

// ─── Marcar orden como enviada (cuando se cree en 99 minutos) ─────────────────

export async function markOrderShipped(externalReference: string, shipmentId99: string) {
  return db.order.update({
    where: { externalReference },
    data: {
      status: "SHIPPED",
      shipmentId99,
    },
  });
}

// ─── Buscar orden por referencia (para success page, admin, etc.) ──────────────

export async function getOrderByReference(externalReference: string) {
  return db.order.findUnique({
    where: { externalReference },
    include: { items: true },
  });
}

// ─── Listar órdenes recientes (admin) ─────────────────────────────────────────

export async function listRecentOrders(limit = 50) {
  return db.order.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { items: true },
  });
}
