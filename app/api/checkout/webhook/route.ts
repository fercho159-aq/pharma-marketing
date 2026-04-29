/**
 * POST /api/checkout/webhook
 * Notificaciones IPN/Webhooks de Mercado Pago.
 *
 * Al aprobarse un pago:
 *  1. Obtiene detalle del pago desde MP.
 *  2. Actualiza la orden en DB.
 *  3. Envía email de confirmación al cliente (cc: administracion@grupoohm.com).
 *  4. TODO: crear envío en 99 minutos cuando lleguen las credenciales.
 */
import { NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { mpClient, isMpConfigured } from "@/lib/mercadopago/client";
import { updateOrderPayment, getOrderByReference } from "@/lib/db/orders";
import { sendOrderConfirmation } from "@/lib/email/orderConfirmation";
import type { OrderStatus } from "@/lib/generated/prisma/client";

export const dynamic = "force-dynamic";

function mpStatusToOrderStatus(mpStatus: string): OrderStatus {
  switch (mpStatus) {
    case "approved":   return "APPROVED";
    case "in_process": return "IN_PROCESS";
    case "pending":    return "IN_PROCESS";
    case "rejected":   return "REJECTED";
    case "cancelled":  return "CANCELLED";
    default:           return "PENDING";
  }
}

export async function POST(req: Request) {
  if (!isMpConfigured()) {
    console.warn("[webhook MP] llamada sin MP_ACCESS_TOKEN configurado.");
    return NextResponse.json({ ok: true, note: "MP not configured" });
  }

  const url = new URL(req.url);
  const type = url.searchParams.get("type") ?? url.searchParams.get("topic");
  const dataId = url.searchParams.get("data.id") ?? url.searchParams.get("id");

  let body: unknown = null;
  try { body = await req.json(); } catch { /* sin body */ }

  console.log("[webhook MP] notificación:", { type, dataId, body });

  if (type === "payment" && dataId) {
    try {
      const payment = new Payment(mpClient);
      const data = await payment.get({ id: String(dataId) });

      console.log("[webhook MP] payment:", {
        id: data.id,
        status: data.status,
        externalReference: data.external_reference,
        payer: data.payer?.email,
      });

      if (data.external_reference) {
        const orderStatus = mpStatusToOrderStatus(data.status ?? "");

        // 1. Actualizar orden en DB
        try {
          await updateOrderPayment({
            externalReference: data.external_reference,
            mpPaymentId: String(data.id),
            status: orderStatus,
            mpStatusDetail: data.status_detail ?? undefined,
            mpPaymentMethod: data.payment_method_id ?? undefined,
          });
          console.log(`[webhook MP] orden ${data.external_reference} → ${orderStatus}`);
        } catch (dbErr) {
          console.error("[webhook MP] error actualizando DB:", dbErr);
        }

        // 2. Si pago aprobado → email de confirmación
        if (data.status === "approved") {
          try {
            const order = await getOrderByReference(data.external_reference);
            if (order) {
              await sendOrderConfirmation(order);
            }
          } catch (emailErr) {
            console.error("[webhook MP] error enviando email:", emailErr);
            // No lanzamos — el pago ya fue procesado
          }

          // TODO: Crear envío en 99 minutos cuando lleguen las credenciales.
          // const order = await getOrderByReference(data.external_reference!);
          // const shipmentId = await create99MinutosShipment({ order });
          // await markOrderShipped(data.external_reference!, shipmentId);
        }
      }
    } catch (err) {
      console.error("[webhook MP] error obteniendo payment:", err);
    }
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "ohm-mp-webhook" });
}
