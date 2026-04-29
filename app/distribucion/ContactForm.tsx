"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { CheckCircle } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      nombre: (form.elements.namedItem("nombre") as HTMLInputElement).value,
      empresa: (form.elements.namedItem("empresa") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      telefono: (form.elements.namedItem("telefono") as HTMLInputElement).value,
      mensaje: (form.elements.namedItem("mensaje") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact/wholesale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Error al enviar. Intenta de nuevo.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error inesperado.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-5 border border-[color:var(--color-ohm-line)] bg-[color:var(--color-ohm-paper)] rounded-sm p-10 md:p-14 text-center min-h-[320px]">
        <CheckCircle size={48} strokeWidth={1.25} className="text-[color:var(--color-ohm-gold)]" />
        <h3 className="text-2xl font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
          ¡Solicitud enviada!
        </h3>
        <p className="text-[color:var(--color-ohm-ink-soft)] text-sm leading-relaxed max-w-[36ch]">
          Recibimos tu mensaje. Un asesor comercial te contactará en las próximas
          <strong> 48 horas hábiles</strong>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 border border-[color:var(--color-ohm-line)] bg-[color:var(--color-ohm-paper)] rounded-sm p-8 md:p-10"
    >
      {status === "error" && (
        <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <Input name="nombre" label="Nombre" required />
        <Input name="empresa" label="Farmacia / Empresa" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Input name="email" type="email" label="Email" required />
        <Input name="telefono" type="tel" label="Teléfono" autoComplete="tel" required />
      </div>
      <TextArea
        name="mensaje"
        label="Mensaje"
        helperText="Cuéntanos volumen aproximado, línea que te interesa, ubicación de tus puntos."
        required
      />
      <Button
        type="submit"
        variant="wine"
        size="lg"
        className="mt-2 self-start"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Enviando…" : "Enviar solicitud"}
      </Button>
      <p className="text-xs text-[color:var(--color-ohm-ink-soft)]">
        Al enviar aceptas nuestro aviso de privacidad. Tus datos se usan solo para esta gestión comercial.
      </p>
    </form>
  );
}
