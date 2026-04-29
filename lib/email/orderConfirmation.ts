/**
 * Email de confirmación de pedido — se envía cuando Mercado Pago aprueba el pago.
 * - Para el cliente: confirmación con detalle del pedido
 * - Copia a administracion@grupoohm.com
 */
import { resend, FROM, ADMIN_EMAIL } from "./client";
import type { Order, OrderItem } from "@/lib/generated/prisma/client";

type OrderWithItems = Order & { items: OrderItem[] };

function formatMXN(n: number) {
  return `$${n.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN`;
}

function buildHtml(order: OrderWithItems): string {
  const itemsRows = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0ece4;font-size:14px;color:#2c1f14;">
          ${item.quantity}× ${item.productName}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #f0ece4;font-size:14px;color:#2c1f14;text-align:right;white-space:nowrap;">
          ${formatMXN(item.lineTotal)}
        </td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f7f4ef;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4ef;padding:40px 20px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#6b1c2e;padding:32px 40px;border-radius:4px 4px 0 0;text-align:center;">
            <p style="margin:0;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#c9a96e;font-family:Arial,sans-serif;">
              Grupo OHM
            </p>
            <h1 style="margin:8px 0 0;font-size:28px;color:#f7f4ef;font-weight:normal;letter-spacing:0.02em;">
              ¡Pedido confirmado!
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:40px;border:1px solid #e8e0d4;border-top:none;">

            <p style="margin:0 0 24px;font-size:15px;color:#5a4a3a;line-height:1.6;font-family:Arial,sans-serif;">
              Hola <strong>${order.payerName}</strong>, tu pago fue aprobado y ya estamos preparando tu pedido.
            </p>

            <!-- Referencia -->
            <div style="background:#f7f4ef;border:1px solid #e8e0d4;border-radius:4px;padding:16px 20px;margin-bottom:28px;">
              <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#9a7b5a;font-family:Arial,sans-serif;">
                Número de pedido
              </p>
              <p style="margin:6px 0 0;font-size:18px;color:#6b1c2e;font-family:monospace;font-weight:bold;">
                ${order.externalReference}
              </p>
            </div>

            <!-- Productos -->
            <p style="margin:0 0 12px;font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#9a7b5a;font-family:Arial,sans-serif;">
              Productos
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
              ${itemsRows}
              <tr>
                <td style="padding:10px 0;font-size:13px;color:#9a7b5a;font-family:Arial,sans-serif;">
                  Envío — ${order.shippingMethodLabel ?? "Estándar"}
                </td>
                <td style="padding:10px 0;font-size:13px;color:#9a7b5a;text-align:right;font-family:Arial,sans-serif;">
                  ${order.shippingCost === 0 ? "Gratis" : formatMXN(order.shippingCost)}
                </td>
              </tr>
              <tr>
                <td style="padding:14px 0 0;font-size:16px;font-weight:bold;color:#2c1f14;font-family:Arial,sans-serif;border-top:2px solid #e8e0d4;">
                  Total pagado
                </td>
                <td style="padding:14px 0 0;font-size:18px;font-weight:bold;color:#6b1c2e;text-align:right;font-family:Arial,sans-serif;border-top:2px solid #e8e0d4;">
                  ${formatMXN(order.total)}
                </td>
              </tr>
            </table>

            <!-- Dirección -->
            <div style="background:#f7f4ef;border:1px solid #e8e0d4;border-radius:4px;padding:16px 20px;margin-top:24px;">
              <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#9a7b5a;font-family:Arial,sans-serif;">
                Dirección de entrega
              </p>
              <p style="margin:0;font-size:14px;color:#2c1f14;line-height:1.6;font-family:Arial,sans-serif;">
                ${order.shippingStreet}<br>
                ${order.shippingCity}, ${order.shippingState} ${order.shippingZip}
              </p>
              ${order.shippingEta ? `<p style="margin:8px 0 0;font-size:12px;color:#9a7b5a;font-family:Arial,sans-serif;">⏱ Tiempo estimado: ${order.shippingEta}</p>` : ""}
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#2c1f14;padding:24px 40px;border-radius:0 0 4px 4px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#9a7b5a;font-family:Arial,sans-serif;line-height:1.6;">
              ¿Tienes dudas? Escríbenos a
              <a href="mailto:administracion@grupoohm.com" style="color:#c9a96e;text-decoration:none;">
                administracion@grupoohm.com
              </a>
            </p>
            <p style="margin:8px 0 0;font-size:11px;color:#5a4a3a;font-family:Arial,sans-serif;">
              © ${new Date().getFullYear()} Grupo OHM · Tláhuac, CDMX
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendOrderConfirmation(order: OrderWithItems) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY no configurada — email omitido.");
    return;
  }

  const html = buildHtml(order);

  const { error } = await resend.emails.send({
    from: FROM,
    to: [order.payerEmail],
    cc: [ADMIN_EMAIL],
    subject: `Pedido confirmado ${order.externalReference} — Grupo OHM`,
    html,
  });

  if (error) {
    console.error("[email] error enviando confirmación de orden:", error);
    throw error;
  }

  console.log(`[email] confirmación enviada a ${order.payerEmail} (cc: ${ADMIN_EMAIL})`);
}
