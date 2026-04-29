/**
 * Email de solicitud de contacto mayoreo/distribución.
 * Llega a administracion@grupoohm.com cuando alguien llena el formulario en /distribucion.
 */
import { resend, FROM, ADMIN_EMAIL } from "./client";

export type WholesaleContactInput = {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  mensaje: string;
};

function buildAdminHtml(data: WholesaleContactInput): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f7f4ef;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4ef;padding:40px 20px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#6b1c2e;padding:28px 40px;border-radius:4px 4px 0 0;">
            <p style="margin:0;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#c9a96e;">
              Grupo OHM — Distribución B2B
            </p>
            <h1 style="margin:8px 0 0;font-size:22px;color:#f7f4ef;font-weight:normal;">
              Nueva solicitud de contacto mayoreo
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:36px 40px;border:1px solid #e8e0d4;border-top:none;">

            <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                ["Nombre", data.nombre],
                ["Farmacia / Empresa", data.empresa],
                ["Email", data.email],
                ["Teléfono", data.telefono],
              ]
                .map(
                  ([label, value]) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0ece4;width:140px;">
                  <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.16em;color:#9a7b5a;">${label}</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f0ece4;">
                  <span style="font-size:14px;color:#2c1f14;font-weight:600;">${value}</span>
                </td>
              </tr>`,
                )
                .join("")}
            </table>

            <div style="margin-top:24px;background:#f7f4ef;border:1px solid #e8e0d4;border-radius:4px;padding:16px 20px;">
              <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#9a7b5a;">
                Mensaje
              </p>
              <p style="margin:0;font-size:14px;color:#2c1f14;line-height:1.7;white-space:pre-wrap;">${data.mensaje}</p>
            </div>

            <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e8e0d4;">
              <a href="mailto:${data.email}" style="display:inline-block;background:#6b1c2e;color:#f7f4ef;padding:12px 24px;border-radius:4px;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:0.08em;">
                Responder a ${data.nombre}
              </a>
            </div>

          </td>
        </tr>

        <tr>
          <td style="background:#2c1f14;padding:20px 40px;border-radius:0 0 4px 4px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#5a4a3a;">
              © ${new Date().getFullYear()} Grupo OHM · Formulario /distribucion
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildConfirmationHtml(data: WholesaleContactInput): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f7f4ef;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4ef;padding:40px 20px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">
        <tr>
          <td style="background:#6b1c2e;padding:32px 40px;border-radius:4px 4px 0 0;text-align:center;">
            <p style="margin:0;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#c9a96e;">Grupo OHM</p>
            <h1 style="margin:8px 0 0;font-size:26px;color:#f7f4ef;font-weight:normal;">Recibimos tu solicitud</h1>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:40px;border:1px solid #e8e0d4;border-top:none;">
            <p style="margin:0 0 16px;font-size:15px;color:#5a4a3a;line-height:1.6;">
              Hola <strong>${data.nombre}</strong>, gracias por tu interés en distribución mayorista con Grupo OHM.
            </p>
            <p style="margin:0 0 24px;font-size:15px;color:#5a4a3a;line-height:1.6;">
              Un asesor comercial se pondrá en contacto contigo en las próximas <strong>48 horas hábiles</strong>
              al correo <strong>${data.email}</strong> o al teléfono <strong>${data.telefono}</strong>.
            </p>
            <div style="background:#f7f4ef;border-left:3px solid #c9a96e;padding:16px 20px;border-radius:0 4px 4px 0;">
              <p style="margin:0;font-size:13px;color:#9a7b5a;line-height:1.6;">
                Si tienes urgencia puedes escribirnos directamente a
                <a href="mailto:administracion@grupoohm.com" style="color:#6b1c2e;">administracion@grupoohm.com</a>
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#2c1f14;padding:24px 40px;border-radius:0 0 4px 4px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#5a4a3a;">© ${new Date().getFullYear()} Grupo OHM · Av. Tláhuac 2772, CDMX</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendWholesaleContactEmails(data: WholesaleContactInput) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY no configurada — email omitido.");
    return;
  }

  // Enviar los dos emails en paralelo
  const [adminResult, confirmResult] = await Promise.allSettled([
    // 1. Notificación interna a administración
    resend.emails.send({
      from: FROM,
      to: [ADMIN_EMAIL],
      replyTo: data.email,
      subject: `Nueva solicitud mayoreo — ${data.empresa} (${data.nombre})`,
      html: buildAdminHtml(data),
    }),
    // 2. Confirmación automática al cliente
    resend.emails.send({
      from: FROM,
      to: [data.email],
      subject: "Recibimos tu solicitud — Grupo OHM Distribución",
      html: buildConfirmationHtml(data),
    }),
  ]);

  if (adminResult.status === "rejected") {
    console.error("[email] error enviando notificación interna:", adminResult.reason);
  }
  if (confirmResult.status === "rejected") {
    console.error("[email] error enviando confirmación al cliente:", confirmResult.reason);
  }

  console.log(`[email] wholesale contact emails enviados para ${data.email}`);
}
