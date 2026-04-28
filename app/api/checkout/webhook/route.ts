/**
 * POST /api/checkout/webhook
 *
 * Endpoint para las notificaciones (IPN/Webhooks) de Mercado Pago.
 * MP llama aquí cada vez que el estado de un pago cambia.
 *
 * Al recibir una notificación de pago:
 *  1. Obtiene el detalle completo del pago desde la API de MP.
 *  2. Actualiza la orden en DB (status + datos del pago).
 *  3. Si aprobado → TODO: crear envío en 99 minutos.
 *  4. Si aprobado → TODO: enviar email de confirmación al cliente.
 *
 * Configurar la URL pública en:
 *   https://www.mercadopago.com.mx/developers/panel/notifications/webhooks
 *
 * IMPORTANTE: responder 200 lo antes posible — MP reintenta si tarda.
 */
import { NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { mpClient, isMpConfigured } from "@/lib/mercadopago/client";
import { updateOrderPayment } from "@/lib/db/orders";
import type { OrderStatus } from "@/lib/generated/prisma/client";

export const dynamic = "force-dynamic";

/** Mapea los estados de MP a nuestros OrderStatus de DB */
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
    console.warn("[webhook MP] llamada recibida sin MP_ACCESS_TOKEN configurado.");
    return NextResponse.json({ ok: true, note: "MP not configured" });
  }

  const url = new URL(req.url);
  const type = url.searchParams.get("type") ?? url.searchParams.get("topic");
  const dataId = url.searchParams.get("data.id") ?? url.searchParams.get("id");

  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    /* algunos eventos vienen sin body */
  }

  console.log("[webhook MP] notificación:", { type, dataId, body });

  if (type === "payment" && dataId) {
    try {
      const payment = new Payment(mpClient);
      const data = await payment.get({ id: String(dataId) });

      console.log("[webhook MP] payment detail:", {
        id: data.id,
        status: data.status,
        statusDetail: data.status_detail,
        externalReference: data.external_reference,
        amount: data.transaction_amount,
        payer: data.payer?.email,
        method: data.payment_method_id,
      });

      // Actualizar orden en DB
      if (data.external_reference) {
        const orderStatus = mpStatusToOrderStatus(data.status ?? "");

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
          console.error("[webhook MP] error actualizando orden en DB:", dbErr);
        }
      }

      // Lógica post-aprobación
      if (data.status === "approved") {
        // TODO: Crear envío en 99 minutos cuando lleguen las credenciales.
        //   import { create99MinutosShipment } from "@/lib/shipping/providers/ninetynine";
        //   import { getOrderByReference } from "@/lib/db/orders";
        //   const order = await getOrderByReference(data.external_reference!);
        //   const shipmentId = await create99MinutosShipment({ order });
        //   await markOrderShipped(data.external_reference!, shipmentId);

        // TODO: Enviar email de confirmación con Resend o Sendgrid.
        //   import { sendOrderConfirmation } from "@/lib/email/resend";
        //   await sendOrderConfirmation({ order, paymentId: data.id });
      }
    } catch (err) {
      console.error("[webhook MP] error obteniendo payment:", err);
      // No retornamos error para evitar reintentos infinitos de MP.
    }
  }

  return NextResponse.json({ ok: true });
}

// Health check — algunos endpoints viejos de MP usan GET.
export async function GET() {
  return NextResponse.json({ ok: true, service: "ohm-mp-webhook" });
}
