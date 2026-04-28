/**
 * Provider "standard" — tarifas planas calculadas localmente.
 * No requiere credenciales ni llamadas a APIs externas.
 *
 * Sirve como fallback mientras llegan las credenciales de 99 minutos
 * y como alternativa permanente para zonas que 99 minutos no cubre.
 */
import type {
  ShippingProviderQuoteInput,
  ShippingQuote,
} from "../types";

const FREE_SHIPPING_THRESHOLD = 1500; // MXN

/** Códigos postales de CDMX están en rangos 01000–16999. */
function isCDMX(zip: string) {
  const n = parseInt(zip, 10);
  return n >= 1000 && n <= 16999;
}

/** ZMVM ampliada: Estado de México metropolitano (Naucalpan, Ecatepec, etc.). */
function isZMVM(zip: string) {
  const n = parseInt(zip, 10);
  // rangos aproximados de Edomex zona conurbada
  return (n >= 50000 && n <= 57999) || (n >= 52000 && n <= 56999);
}

export async function getStandardQuotes(
  input: ShippingProviderQuoteInput,
): Promise<ShippingQuote[]> {
  const { address, subtotal } = input;
  const zip = address.zip.trim();

  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const localBase = freeShipping ? 0 : 99;
  const metroBase = freeShipping ? 0 : 119;
  const foraneoBase = freeShipping ? 0 : 179;

  const quotes: ShippingQuote[] = [];

  if (isCDMX(zip)) {
    quotes.push({
      id: "standard-cdmx-sameday",
      label: "Entrega mismo día — CDMX",
      carrier: "internal",
      eta: "2–6 hrs (pedidos antes de 14:00)",
      price: freeShipping ? 0 : 149,
      recommended: true,
    });
    quotes.push({
      id: "standard-cdmx-nextday",
      label: "Entrega siguiente día — CDMX",
      carrier: "standard",
      eta: "24 hrs hábiles",
      price: localBase,
    });
  } else if (isZMVM(zip)) {
    quotes.push({
      id: "standard-zmvm",
      label: "Entrega en zona metropolitana",
      carrier: "standard",
      eta: "24–48 hrs hábiles",
      price: metroBase,
      recommended: true,
    });
  } else {
    quotes.push({
      id: "standard-foraneo",
      label: "Envío foráneo nacional",
      carrier: "standard",
      eta: "3–6 días hábiles",
      price: foraneoBase,
      recommended: true,
    });
    quotes.push({
      id: "standard-foraneo-express",
      label: "Envío foráneo express",
      carrier: "standard",
      eta: "2–3 días hábiles",
      price: freeShipping ? 99 : 279,
    });
  }

  return quotes;
}
