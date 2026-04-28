/**
 * POST /api/checkout/webhook
 *
 * Endpoint para las notificaciones (IPN/Webhooks) de Mercado Pago.
 * MP llama aquí cada vez que el estado de un pago cambia. Llega como:
 *   POST /api/checkout/webhook?type=payment&data.id=12345
 *
 * Configurar la URL pública de este endpoint en:
 *   https://www.mercadopago.com.mx/developers/panel/notifications/webhooks
 *
 * Para desarrollo local puedes usar ngrok / cloudflared para exponer
 * localhost:3000 a Mercado Pago.
 *
 * IMPORTANTE: la respuesta debe ser 200 lo antes posible. Si tarda, MP
 * reintenta y se duplican notificaciones.
 *
 * TODOs pendientes (cuando llegue el resto del e-commerce):
 *   1. Persistir orden en base de datos (Postgres / Supabase / Firestore).
 *   2. Si paga aprobado → crear envío real con 99 minutos
 *      (lib/shipping/providers/ninetynine.ts → create99MinutosShipment).
 *   3. Disparar email transaccional de confirmación al cliente
 *      (Resend / Sendgrid).
 *   4. Validar firma del webhook con MP_WEBHOOK_SECRET.
 */
import { NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { mpClient, isMpConfigured } from "@/lib/mercadopago/client";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Acuse de recibo rápido — MP necesita 200 cuanto antes.
  if (!isMpConfigured()) {
    // eslint-disable-next-line no-console
    console.warn("[webhook MP] llamada recibida sin MP_ACCESS_TOKEN configurado.");
    return NextResponse.json({ ok: true, note: "MP not configured" });
  }

  const url = new URL(req.url);
  const type = url.searchParams.get("type") ?? url.searchParams.get("topic");
  const dataId = url.searchParams.get("data.id") ?? url.searchParams.get("id");

  // El body suele duplicar info de la query — lo leemos por si viene de un
  // origen distinto (legacy IPN vs. webhooks v2).
  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    /* algunos eventos vienen sin body */
  }

  // eslint-disable-next-line no-console
  console.log("[webhook MP] notificación:", { type, dataId, body });

  // Verificación de firma — opcional pero recomendado.
  // Headers a chequear: x-signature + x-request-id.
  // const secret = process.env.MP_WEBHOOK_SECRET;
  // TODO: implementar HMAC SHA256 con secret cuando el cliente lo configure.

  if (type === "payment" && dataId) {
    try {
      const payment = new Payment(mpClient);
      const data = await payment.get({ id: String(dataId) });

      // eslint-disable-next-line no-console
      console.log("[webhook MP] payment detail:", {
        id: data.id,
        status: data.status, // approved | pending | rejected | in_process
        statusDetail: data.status_detail,
        externalReference: data.external_reference,
        amount: data.transaction_amount,
        payer: data.payer?.email,
        method: data.payment_method_id,
      });

      // Aquí va la lógica de negocio cuando el pago se aprueba:
      if (data.status === "approved") {
        // TODO 1: Marcar orden como pagada en DB (clave: external_reference).
        // TODO 2: Crear envío en 99 minutos (si está configurado).
        //         await create99MinutosShipment({
        //           externalReference: data.external_reference!,
        //           address: <recuperar de DB>,
        //           items: <recuperar de DB>,
        //           serviceCode: <de metadata.shipping_method>,
        //         });
        // TODO 3: Mandar email de confirmación al cliente.
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[webhook MP] error obteniendo payment:", err);
      // No retornamos error para evitar reintentos infinitos de MP.
    }
  }

  return NextResponse.json({ ok: true });
}

// Algunos endpoints viejos de MP usan GET para health check.
export async function GET() {
  return NextResponse.json({ ok: true, service: "ohm-mp-webhook" });
}
