"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Minus,
  Plus,
  Trash2,
  Lock,
  ShoppingBag,
  Truck,
  RefreshCw,
} from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import type { ShippingAddress, ShippingQuote } from "@/lib/shipping/types";

type Step = "cart" | "shipping" | "method" | "redirecting";

const FREE_SHIPPING_THRESHOLD = 1500;

function formatMXN(n: number) {
  return `$${n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;
}

export function CartPageClient() {
  const { items, subtotal, setQty, remove } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [error, setError] = useState<string | null>(null);

  const [shipping, setShipping] = useState<ShippingAddress>({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const [quotes, setQuotes] = useState<ShippingQuote[] | null>(null);
  const [quotesLoading, setQuotesLoading] = useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  const selectedQuote = useMemo(
    () => quotes?.find((q) => q.id === selectedQuoteId) ?? null,
    [quotes, selectedQuoteId],
  );
  const shippingCost = selectedQuote?.price ?? 0;
  const total = subtotal + shippingCost;

  /* ----------------------- shipping submit -> quotes ---------------------- */
  const handleShippingSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setQuotesLoading(true);
    setQuotes(null);
    setSelectedQuoteId(null);

    try {
      const res = await fetch("/api/shipping/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: shipping,
          subtotal,
          items: items.map((i) => ({
            id: i.product.id,
            name: i.product.name,
            qty: i.qty,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "No pudimos cotizar el envío.");
      }

      const data: { quotes: ShippingQuote[] } = await res.json();
      if (!data.quotes || data.quotes.length === 0) {
        throw new Error("No hay opciones de envío disponibles para tu CP.");
      }

      setQuotes(data.quotes);
      const recommended = data.quotes.find((q) => q.recommended) ?? data.quotes[0];
      setSelectedQuoteId(recommended.id);
      setStep("method");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setQuotesLoading(false);
    }
  };

  /* ----------------------- method -> Mercado Pago ------------------------ */
  const handleProceedToMP = async () => {
    if (!selectedQuote) {
      setError("Selecciona un método de envío.");
      return;
    }
    setError(null);
    setRedirecting(true);
    setStep("redirecting");

    try {
      const res = await fetch("/api/checkout/preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shipping,
          shippingMethod: selectedQuote,
          subtotal,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "No se pudo iniciar el pago.");
      }

      // Guarda referencia para que la página de success pueda mostrarla
      try {
        window.sessionStorage.setItem(
          "ohm-pending-order",
          JSON.stringify({
            externalReference: data.externalReference,
            shipping,
            method: selectedQuote,
            subtotal,
            total,
            ts: Date.now(),
          }),
        );
      } catch {
        /* sessionStorage puede no estar disponible */
      }

      // Redirige al checkout de Mercado Pago.
      // En sandbox usamos sandbox_init_point si la public key empieza con "TEST-"
      // o el access token también. Como las credenciales recibidas son APP_USR
      // (test mode), usamos initPoint normal — MP detecta automáticamente.
      window.location.href = data.initPoint;
    } catch (err) {
      setRedirecting(false);
      setStep("method");
      setError(err instanceof Error ? err.message : "Error inesperado.");
    }
  };

  /* ----------------------- AUTO-RECALC quotes when zip changes ----------- */
  // Si el usuario regresa al paso "shipping" y modifica el ZIP, limpiamos quotes.
  useEffect(() => {
    if (step === "shipping" && quotes) {
      setQuotes(null);
      setSelectedQuoteId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipping.zip, step]);

  /* ----------------------------- EMPTY STATE ----------------------------- */
  if (items.length === 0 && step === "cart") {
    return (
      <section className="mx-auto max-w-2xl px-6 md:px-10 py-20 text-center">
        <ShoppingBag size={48} strokeWidth={1.25} className="mx-auto text-[color:var(--color-ohm-ink-soft)]" />
        <h1 className="mt-6 text-3xl md:text-4xl font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
          Tu carrito está vacío
        </h1>
        <p className="mt-3 text-[color:var(--color-ohm-ink-soft)]">
          Descubre nuestros productos de farmacia y skincare.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link href="/farmacia" className="inline-flex items-center gap-2 border border-[color:var(--color-gin-sage-dark)] text-[color:var(--color-gin-sage-dark)] px-5 py-2.5 rounded-sm hover:bg-[color:var(--color-gin-sage-pale)] text-sm font-medium">
            Ir a Farmacia
          </Link>
          <Link href="/skincare" className="inline-flex items-center gap-2 border border-[color:var(--color-ilm-nude-dark)] text-[color:var(--color-ilm-nude-dark)] px-5 py-2.5 rounded-sm hover:bg-[color:var(--color-ilm-nude-pale)] text-sm font-medium">
            Ir a Skincare
          </Link>
        </div>
      </section>
    );
  }

  /* --------------------------- REDIRECTING STATE -------------------------- */
  if (step === "redirecting" && redirecting) {
    return (
      <section className="mx-auto max-w-3xl px-6 md:px-10 py-24 text-center">
        <div className="inline-flex h-14 w-14 rounded-full border-2 border-[color:var(--color-ohm-wine)] border-t-transparent animate-spin" />
        <h2 className="mt-6 text-2xl md:text-3xl font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
          Redirigiendo a Mercado Pago…
        </h2>
        <p className="mt-3 text-[color:var(--color-ohm-ink-soft)]">
          Vas a completar tu compra en el ambiente seguro de Mercado Pago.
        </p>
      </section>
    );
  }

  /* ------------------------------ MAIN FLOW ------------------------------ */
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 py-10 md:py-16">
      <header className="mb-8">
        <p className="eyebrow">Checkout</p>
        <h1 className="mt-2 text-3xl md:text-5xl font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
          Tu carrito
        </h1>
        <Stepper step={step} />
      </header>

      {error && (
        <div className="mb-6 rounded-sm border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* LEFT */}
        <div className="space-y-6">
          {step === "cart" && (
            <CartItemsList items={items} setQty={setQty} remove={remove} />
          )}

          {step === "shipping" && (
            <ShippingStep
              value={shipping}
              onChange={setShipping}
              onSubmit={handleShippingSubmit}
              onBack={() => setStep("cart")}
              loading={quotesLoading}
            />
          )}

          {step === "method" && quotes && (
            <ShippingMethodStep
              quotes={quotes}
              selectedId={selectedQuoteId}
              onSelect={setSelectedQuoteId}
              onBack={() => setStep("shipping")}
              onProceed={handleProceedToMP}
              redirecting={redirecting}
            />
          )}
        </div>

        {/* RIGHT */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <OrderSummary
            items={items}
            subtotal={subtotal}
            shippingCost={shippingCost}
            shippingLabel={selectedQuote?.label}
            total={total}
            freeThreshold={FREE_SHIPPING_THRESHOLD}
            onContinue={() => setStep("shipping")}
            showContinue={step === "cart"}
          />
        </aside>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  SUB-COMPONENTS                                                            */
/* ========================================================================== */

function Stepper({ step }: { step: Step }) {
  const steps: { id: Step; label: string }[] = [
    { id: "cart", label: "Carrito" },
    { id: "shipping", label: "Envío" },
    { id: "method", label: "Método" },
  ];
  const activeIdx = steps.findIndex((s) => s.id === step);
  return (
    <ol className="mt-6 flex items-center gap-3 text-xs md:text-sm flex-wrap">
      {steps.map((s, idx) => {
        const isActive = idx === activeIdx;
        const isDone = idx < activeIdx;
        return (
          <li key={s.id} className="flex items-center gap-3">
            <span
              className={`inline-flex items-center justify-center h-7 w-7 rounded-full border text-xs font-semibold ${
                isActive
                  ? "bg-[color:var(--color-ohm-wine)] text-[color:var(--color-ohm-cream)] border-[color:var(--color-ohm-wine)]"
                  : isDone
                    ? "bg-[color:var(--color-ohm-gold-pale)] text-[color:var(--color-ohm-wine)] border-[color:var(--color-ohm-gold)]"
                    : "bg-transparent text-[color:var(--color-ohm-ink-soft)] border-[color:var(--color-ohm-line)]"
              }`}
            >
              {idx + 1}
            </span>
            <span
              className={
                isActive
                  ? "text-[color:var(--color-ohm-ink)] font-semibold"
                  : "text-[color:var(--color-ohm-ink-soft)]"
              }
            >
              {s.label}
            </span>
            {idx < steps.length - 1 && (
              <span className="w-6 md:w-10 h-px bg-[color:var(--color-ohm-line)]" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function CartItemsList({
  items,
  setQty,
  remove,
}: {
  items: ReturnType<typeof useCart>["items"];
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
}) {
  return (
    <ul className="divide-y divide-[color:var(--color-ohm-line)] border border-[color:var(--color-ohm-line)] rounded-sm bg-[color:var(--color-ohm-paper)]">
      {items.map(({ product, qty }) => (
        <li key={product.id} className="p-4 md:p-6 flex gap-4">
          <div className="relative h-24 w-20 md:h-28 md:w-24 flex-shrink-0 bg-[color:var(--color-ohm-gold-pale)]/30 rounded-sm overflow-hidden">
            <Image src={product.image} alt={product.name} fill sizes="96px" className="object-cover" />
          </div>
          <div className="flex-1 flex flex-col gap-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ohm-ink-soft)]">
              {product.category}
            </p>
            <h3 className="text-base md:text-lg font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)] leading-snug">
              {product.name}
            </h3>
            <p className="text-xs md:text-sm text-[color:var(--color-ohm-ink-soft)] line-clamp-2">{product.tagline}</p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center border border-[color:var(--color-ohm-line)] rounded-sm">
                <button type="button" onClick={() => setQty(product.id, qty - 1)} aria-label="Disminuir cantidad" className="h-8 w-8 inline-flex items-center justify-center hover:bg-[color:var(--color-ohm-cream)]">
                  <Minus size={14} strokeWidth={1.75} />
                </button>
                <span className="w-8 text-center text-sm font-medium">{qty}</span>
                <button type="button" onClick={() => setQty(product.id, qty + 1)} aria-label="Aumentar cantidad" className="h-8 w-8 inline-flex items-center justify-center hover:bg-[color:var(--color-ohm-cream)]">
                  <Plus size={14} strokeWidth={1.75} />
                </button>
              </div>
              <span className="text-base font-medium text-[color:var(--color-ohm-wine)]">
                {formatMXN(product.price * qty)}
              </span>
              <button type="button" onClick={() => remove(product.id)} className="text-xs text-[color:var(--color-ohm-ink-soft)] hover:text-[color:var(--color-ohm-wine)] inline-flex items-center gap-1">
                <Trash2 size={14} strokeWidth={1.5} />
                Quitar
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function OrderSummary({
  items,
  subtotal,
  shippingCost,
  shippingLabel,
  total,
  freeThreshold,
  onContinue,
  showContinue,
}: {
  items: ReturnType<typeof useCart>["items"];
  subtotal: number;
  shippingCost: number;
  shippingLabel?: string;
  total: number;
  freeThreshold: number;
  onContinue: () => void;
  showContinue: boolean;
}) {
  const remainingForFree = Math.max(0, freeThreshold - subtotal);
  return (
    <div className="border border-[color:var(--color-ohm-line)] bg-[color:var(--color-ohm-paper)] rounded-sm p-6">
      <h2 className="text-xl font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
        Resumen del pedido
      </h2>

      <ul className="mt-4 space-y-3 text-sm max-h-[220px] overflow-auto pr-1">
        {items.map(({ product, qty }) => (
          <li key={product.id} className="flex justify-between gap-3">
            <span className="text-[color:var(--color-ohm-ink-soft)] flex-1 truncate">
              {qty} × {product.name}
            </span>
            <span className="text-[color:var(--color-ohm-ink)] font-medium whitespace-nowrap">
              {formatMXN(product.price * qty)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 pt-5 border-t border-[color:var(--color-ohm-line)] space-y-2 text-sm">
        <Row label="Subtotal" value={formatMXN(subtotal)} />
        <Row
          label={shippingLabel ? `Envío (${shippingLabel})` : "Envío"}
          value={shippingCost === 0 && shippingLabel ? "Gratis" : shippingCost > 0 ? formatMXN(shippingCost) : "Por calcular"}
        />
        {remainingForFree > 0 && items.length > 0 && (
          <p className="text-xs text-[color:var(--color-ohm-ink-soft)] italic">
            Te faltan {formatMXN(remainingForFree)} para envío gratis.
          </p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-[color:var(--color-ohm-line)] flex justify-between items-baseline">
        <span className="text-base font-medium text-[color:var(--color-ohm-ink)]">Total</span>
        <span className="text-xl font-semibold text-[color:var(--color-ohm-wine)]">
          {formatMXN(total)}
        </span>
      </div>

      {showContinue && (
        <button type="button" onClick={onContinue} className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[color:var(--color-ohm-wine)] text-[color:var(--color-ohm-cream)] px-5 py-3 rounded-sm hover:bg-[color:var(--color-ohm-wine-dark)] transition-colors text-sm font-semibold uppercase tracking-[0.12em]">
          Continuar compra
        </button>
      )}

      <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-[color:var(--color-ohm-ink-soft)]">
        <Lock size={12} strokeWidth={1.75} />
        Pago seguro vía Mercado Pago
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-[color:var(--color-ohm-ink-soft)] flex-1 truncate">{label}</span>
      <span className="text-[color:var(--color-ohm-ink)] font-medium whitespace-nowrap">{value}</span>
    </div>
  );
}

function ShippingStep({
  value,
  onChange,
  onSubmit,
  onBack,
  loading,
}: {
  value: ShippingAddress;
  onChange: (v: ShippingAddress) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
  loading: boolean;
}) {
  const update = <K extends keyof ShippingAddress>(key: K, v: ShippingAddress[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <form onSubmit={onSubmit} className="border border-[color:var(--color-ohm-line)] bg-[color:var(--color-ohm-paper)] rounded-sm p-6 md:p-8 space-y-5">
      <h2 className="text-xl md:text-2xl font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
        Datos de envío
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nombre completo" required value={value.fullName} onChange={(v) => update("fullName", v)} />
        <Field label="Correo" type="email" required value={value.email} onChange={(v) => update("email", v)} />
        <Field label="Teléfono" type="tel" required value={value.phone} onChange={(v) => update("phone", v)} />
        <Field label="Código postal" required inputMode="numeric" value={value.zip} onChange={(v) => update("zip", v.replace(/\D/g, "").slice(0, 5))} />
        <Field label="Calle y número" required className="md:col-span-2" value={value.street} onChange={(v) => update("street", v)} />
        <Field label="Ciudad / Alcaldía" required value={value.city} onChange={(v) => update("city", v)} />
        <Field label="Estado" required value={value.state} onChange={(v) => update("state", v)} />
      </div>
      <div className="flex flex-wrap gap-3 justify-between items-center pt-3">
        <button type="button" onClick={onBack} className="text-sm text-[color:var(--color-ohm-ink-soft)] hover:text-[color:var(--color-ohm-wine)] underline underline-offset-4">
          ← Volver al carrito
        </button>
        <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 bg-[color:var(--color-ohm-wine)] text-[color:var(--color-ohm-cream)] px-6 py-3 rounded-sm hover:bg-[color:var(--color-ohm-wine-dark)] transition-colors text-sm font-semibold uppercase tracking-[0.12em] disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? "Cotizando…" : "Cotizar envío"}
        </button>
      </div>
    </form>
  );
}

function ShippingMethodStep({
  quotes,
  selectedId,
  onSelect,
  onBack,
  onProceed,
  redirecting,
}: {
  quotes: ShippingQuote[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onBack: () => void;
  onProceed: () => void;
  redirecting: boolean;
}) {
  return (
    <div className="border border-[color:var(--color-ohm-line)] bg-[color:var(--color-ohm-paper)] rounded-sm p-6 md:p-8 space-y-5">
      <h2 className="text-xl md:text-2xl font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
        Elige tu método de envío
      </h2>

      <ul className="space-y-3">
        {quotes.map((q) => {
          const active = q.id === selectedId;
          return (
            <li key={q.id}>
              <label
                className={`flex items-start gap-4 p-4 border-2 rounded-sm cursor-pointer transition-colors ${
                  active
                    ? "border-[color:var(--color-ohm-wine)] bg-[color:var(--color-ohm-gold-pale)]/30"
                    : "border-[color:var(--color-ohm-line)] hover:border-[color:var(--color-ohm-wine-soft)]"
                }`}
              >
                <input
                  type="radio"
                  name="ship-method"
                  value={q.id}
                  checked={active}
                  onChange={() => onSelect(q.id)}
                  className="mt-1 accent-[color:var(--color-ohm-wine)]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="text-sm md:text-base font-medium text-[color:var(--color-ohm-ink)] inline-flex items-center gap-2">
                      <Truck size={16} strokeWidth={1.5} className="text-[color:var(--color-ohm-wine)]" />
                      {q.label}
                      {q.recommended && (
                        <span className="text-[10px] uppercase tracking-[0.18em] bg-[color:var(--color-ohm-wine)] text-[color:var(--color-ohm-cream)] px-2 py-0.5 rounded-full">
                          Recomendado
                        </span>
                      )}
                    </span>
                    <span className="text-base font-semibold text-[color:var(--color-ohm-wine)]">
                      {q.price === 0 ? "Gratis" : formatMXN(q.price)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[color:var(--color-ohm-ink-soft)]">
                    Tiempo estimado: {q.eta} · Empresa: {q.carrier === "99minutos" ? "99 minutos" : q.carrier}
                  </p>
                </div>
              </label>
            </li>
          );
        })}
      </ul>

      {/* Trust strip */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[color:var(--color-ohm-line)] text-center">
        <div className="flex flex-col items-center gap-1">
          <Lock size={16} strokeWidth={1.5} className="text-[color:var(--color-ohm-ink-soft)]" />
          <span className="text-[10px] text-[color:var(--color-ohm-ink-soft)]">Pago seguro Mercado Pago</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Truck size={16} strokeWidth={1.5} className="text-[color:var(--color-ohm-ink-soft)]" />
          <span className="text-[10px] text-[color:var(--color-ohm-ink-soft)]">Tracking incluido</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <RefreshCw size={16} strokeWidth={1.5} className="text-[color:var(--color-ohm-ink-soft)]" />
          <span className="text-[10px] text-[color:var(--color-ohm-ink-soft)]">Devolución 30 días</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-between items-center pt-3">
        <button type="button" onClick={onBack} className="text-sm text-[color:var(--color-ohm-ink-soft)] hover:text-[color:var(--color-ohm-wine)] underline underline-offset-4">
          ← Editar dirección
        </button>
        <button
          type="button"
          onClick={onProceed}
          disabled={!selectedId || redirecting}
          className="inline-flex items-center justify-center gap-2 bg-[color:var(--color-ohm-wine)] text-[color:var(--color-ohm-cream)] px-6 py-3 rounded-sm hover:bg-[color:var(--color-ohm-wine-dark)] transition-colors text-sm font-semibold uppercase tracking-[0.12em] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Lock size={14} strokeWidth={1.75} />
          {redirecting ? "Redirigiendo…" : "Pagar con Mercado Pago"}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  className,
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
}) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm ${className ?? ""}`}>
      <span className="text-xs uppercase tracking-[0.12em] text-[color:var(--color-ohm-ink-soft)] font-medium">
        {label}
        {required && <span className="text-[color:var(--color-ohm-wine)] ml-1">*</span>}
      </span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-[color:var(--color-ohm-line)] rounded-sm px-3 py-2.5 bg-[color:var(--color-ohm-cream)] text-[color:var(--color-ohm-ink)] focus:outline-none focus:border-[color:var(--color-ohm-wine)] focus:ring-1 focus:ring-[color:var(--color-ohm-wine)]/30 transition-colors"
      />
    </label>
  );
}
