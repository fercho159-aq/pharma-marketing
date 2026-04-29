/**
 * POST /api/contact/wholesale
 * Recibe el formulario de solicitud mayoreo de /distribucion y envía los emails.
 */
import { NextResponse } from "next/server";
import { sendWholesaleContactEmails } from "@/lib/email/wholesaleContact";
import type { WholesaleContactInput } from "@/lib/email/wholesaleContact";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: WholesaleContactInput;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body inválido." }, { status: 400 });
  }

  const { nombre, empresa, email, telefono, mensaje } = body;

  if (!nombre || !empresa || !email || !telefono || !mensaje) {
    return NextResponse.json({ error: "Todos los campos son requeridos." }, { status: 400 });
  }

  // Validación básica de email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }

  try {
    await sendWholesaleContactEmails({ nombre, empresa, email, telefono, mensaje });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact/wholesale] error:", err);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje. Intenta de nuevo." },
      { status: 502 },
    );
  }
}
