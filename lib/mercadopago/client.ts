/**
 * Cliente único de Mercado Pago para el servidor.
 * SOLO debe importarse desde route handlers (`app/api/...`) o server components.
 * Nunca desde un Client Component — expondría el access token.
 */
import { MercadoPagoConfig } from "mercadopago";

const accessToken = process.env.MP_ACCESS_TOKEN;

if (!accessToken) {
  // Aviso suave en build/desarrollo. En runtime la API responderá 500
  // si esto falta, pero queremos que sea evidente en logs.
  // eslint-disable-next-line no-console
  console.warn(
    "[mercadopago] MP_ACCESS_TOKEN no está definido. " +
      "Crea .env.local con las credenciales (ver .env.local.example).",
  );
}

export const mpClient = new MercadoPagoConfig({
  accessToken: accessToken ?? "",
  options: {
    timeout: 8000,
    // Idempotency key se setea por request en el preference builder.
  },
});

export function isMpConfigured() {
  return Boolean(process.env.MP_ACCESS_TOKEN);
}
