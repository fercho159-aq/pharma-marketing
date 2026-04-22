"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { Minus, Plus, Trash2, Lock, CheckCircle2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";

type Step = "cart" | "shipping" | "payment" | "processing" | "success";

type ShippingForm = {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
};

type PaymentForm = {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

const SHIPPING_COST = 149;
const FREE_SHIPPING_THRESHOLD = 1500;

function formatMXN(n: number) {
  return `$${n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;
}

function maskCard(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim();
}

function maskExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function CartPageClient() {
  const { items, subtotal, setQty, remove, clear } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [orderId, setOrderId] = useState<string>("");

  const [shipping, setShipping] = useState<ShippingForm>({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [payment, setPayment] = useState<PaymentForm>({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const shippingCost = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  }, [subtotal, items.length]);
  const total = subtotal + shippingCost;

  const handleShippingSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep("processing");
    // Simulate payment processing
    window.setTimeout(() => {
      const id = `OHM-${Date.now().toString().slice(-8)}`;
      setOrderId(id);
      clear();
      setStep("success");
    }, 2200);
  };

  /* ---------------------------- SUCCESS STATE ---------------------------- */
  if (step === "success") {
    return (
      <section className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-24">
        <div className="bg-[color:var(--color-ohm-paper)] border border-[color:var(--color-ohm-line)] rounded-sm p-8 md:p-12 text-center">
          <CheckCircle2
            size={56}
            strokeWidth={1.25}
            className="mx-auto text-[color:var(--color-ohm-wine)]"
          />
          <h1 className="mt-6 text-3xl md:text-4xl font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
            ¡Gracias por tu compra!
          </h1>
          <p className="mt-3 text-[color:var(--color-ohm-ink-soft)]">
            Tu pedido <span className="font-semibold text-[color:var(--color-ohm-wine)]">{orderId}</span> ha sido
            confirmado. Enviamos una copia del recibo a {shipping.email || "tu correo"}.
          </p>
          <div className="mt-8 text-left border-t border-[color:var(--color-ohm-line)] pt-6 space-y-2 text-sm text-[color:var(--color-ohm-ink-soft)]">
            <p>
              <strong className="text-[color:var(--color-ohm-ink)]">Envío a:</strong> {shipping.fullName || "—"},{" "}
              {shipping.street || "—"}, {shipping.city || "—"}, {shipping.state || "—"} {shipping.zip}
            </p>
            <p>
              <strong className="text-[color:var(--color-ohm-ink)]">Total pagado:</strong> {formatMXN(total)}
            </p>
            <p className="text-xs italic">
              Esta es una simulación. No se procesó ningún cargo real a tarjeta.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/farmacia"
              className="inline-flex items-center gap-2 border border-[color:var(--color-ohm-wine)] text-[color:var(--color-ohm-wine)] px-5 py-2.5 rounded-sm hover:bg-[color:var(--color-ohm-wine)] hover:text-[color:var(--color-ohm-cream)] transition-colors text-sm font-medium"
            >
              Ver Farmacia
            </Link>
            <Link
              href="/skincare"
              className="inline-flex items-center gap-2 border border-[color:var(--color-ilm-nude-dark)] text-[color:var(--color-ilm-nude-dark)] px-5 py-2.5 rounded-sm hover:bg-[color:var(--color-ilm-nude-dark)] hover:text-[color:var(--color-ohm-cream)] transition-colors text-sm font-medium"
            >
              Ver Skincare
            </Link>
          </div>
        </div>
      </section>
    );
  }

  /* --------------------------- PROCESSING STATE --------------------------- */
  if (step === "processing") {
    return (
      <section className="mx-auto max-w-3xl px-6 md:px-10 py-24 text-center">
        <div className="inline-flex h-14 w-14 rounded-full border-2 border-[color:var(--color-ohm-wine)] border-t-transparent animate-spin" />
        <h2 className="mt-6 text-2xl md:text-3xl font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
          Procesando tu pago…
        </h2>
        <p className="mt-3 text-[color:var(--color-ohm-ink-soft)]">
          Confirmando la transacción de forma segura. No cierres esta ventana.
        </p>
      </section>
    );
  }

  /* ----------------------------- EMPTY STATE ----------------------------- */
  if (items.length === 0 && step === "cart") {
    return (
      <section className="mx-auto max-w-2xl px-6 md:px-10 py-20 text-center">
        <ShoppingBag
          size={48}
          strokeWidth={1.25}
          className="mx-auto text-[color:var(--color-ohm-ink-soft)]"
        />
        <h1 className="mt-6 text-3xl md:text-4xl font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
          Tu carrito está vacío
        </h1>
        <p className="mt-3 text-[color:var(--color-ohm-ink-soft)]">
          Descubre nuestros productos de farmacia y skincare formulados con ciencia y cuidado.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            href="/farmacia"
            className="inline-flex items-center gap-2 border border-[color:var(--color-gin-sage-dark)] text-[color:var(--color-gin-sage-dark)] px-5 py-2.5 rounded-sm hover:bg-[color:var(--color-gin-sage-pale)] transition-colors text-sm font-medium"
          >
            Ir a Farmacia
          </Link>
          <Link
            href="/skincare"
            className="inline-flex items-center gap-2 border border-[color:var(--color-ilm-nude-dark)] text-[color:var(--color-ilm-nude-dark)] px-5 py-2.5 rounded-sm hover:bg-[color:var(--color-ilm-nude-pale)] transition-colors text-sm font-medium"
          >
            Ir a Skincare
          </Link>
        </div>
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

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* LEFT COLUMN */}
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
            />
          )}

          {step === "payment" && (
            <PaymentStep
              value={payment}
              onChange={setPayment}
              onSubmit={handlePaymentSubmit}
              onBack={() => setStep("shipping")}
            />
          )}
        </div>

        {/* RIGHT COLUMN — SUMMARY */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <OrderSummary
            items={items}
            subtotal={subtotal}
            shippingCost={shippingCost}
            total={total}
            freeThreshold={FREE_SHIPPING_THRESHOLD}
            onContinue={() => {
              if (step === "cart") setStep("shipping");
            }}
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
    { id: "payment", label: "Pago" },
  ];
  const activeIdx = steps.findIndex((s) => s.id === step);
  return (
    <ol className="mt-6 flex items-center gap-3 text-xs md:text-sm">
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
              className={`${
                isActive
                  ? "text-[color:var(--color-ohm-ink)] font-semibold"
                  : "text-[color:var(--color-ohm-ink-soft)]"
              }`}
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
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ohm-ink-soft)]">
              {product.category}
            </p>
            <h3 className="text-base md:text-lg font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)] leading-snug">
              {product.name}
            </h3>
            <p className="text-xs md:text-sm text-[color:var(--color-ohm-ink-soft)] line-clamp-2">
              {product.tagline}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center border border-[color:var(--color-ohm-line)] rounded-sm">
                <button
                  type="button"
                  onClick={() => setQty(product.id, qty - 1)}
                  aria-label="Disminuir cantidad"
                  className="h-8 w-8 inline-flex items-center justify-center hover:bg-[color:var(--color-ohm-cream)]"
                >
                  <Minus size={14} strokeWidth={1.75} />
                </button>
                <span className="w-8 text-center text-sm font-medium">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(product.id, qty + 1)}
                  aria-label="Aumentar cantidad"
                  className="h-8 w-8 inline-flex items-center justify-center hover:bg-[color:var(--color-ohm-cream)]"
                >
                  <Plus size={14} strokeWidth={1.75} />
                </button>
              </div>
              <span className="text-base font-medium text-[color:var(--color-ohm-wine)]">
                {formatMXN(product.price * qty)}
              </span>
              <button
                type="button"
                onClick={() => remove(product.id)}
                className="text-xs text-[color:var(--color-ohm-ink-soft)] hover:text-[color:var(--color-ohm-wine)] inline-flex items-center gap-1"
              >
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
  total,
  freeThreshold,
  onContinue,
  showContinue,
}: {
  items: ReturnType<typeof useCart>["items"];
  subtotal: number;
  shippingCost: number;
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
          label="Envío"
          value={shippingCost === 0 ? "Gratis" : formatMXN(shippingCost)}
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
        <button
          type="button"
          onClick={onContinue}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[color:var(--color-ohm-wine)] text-[color:var(--color-ohm-cream)] px-5 py-3 rounded-sm hover:bg-[color:var(--color-ohm-wine-dark)] transition-colors text-sm font-semibold uppercase tracking-[0.12em]"
        >
          Continuar compra
        </button>
      )}

      <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-[color:var(--color-ohm-ink-soft)]">
        <Lock size={12} strokeWidth={1.75} />
        Pago seguro · Simulación demo
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[color:var(--color-ohm-ink-soft)]">{label}</span>
      <span className="text-[color:var(--color-ohm-ink)] font-medium">{value}</span>
    </div>
  );
}

function ShippingStep({
  value,
  onChange,
  onSubmit,
  onBack,
}: {
  value: ShippingForm;
  onChange: (v: ShippingForm) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}) {
  const update = <K extends keyof ShippingForm>(key: K, v: ShippingForm[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <form
      onSubmit={onSubmit}
      className="border border-[color:var(--color-ohm-line)] bg-[color:var(--color-ohm-paper)] rounded-sm p-6 md:p-8 space-y-5"
    >
      <h2 className="text-xl md:text-2xl font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
        Datos de envío
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nombre completo" required value={value.fullName} onChange={(v) => update("fullName", v)} />
        <Field label="Correo" type="email" required value={value.email} onChange={(v) => update("email", v)} />
        <Field label="Teléfono" type="tel" required value={value.phone} onChange={(v) => update("phone", v)} />
        <Field label="Código postal" required value={value.zip} onChange={(v) => update("zip", v)} />
        <Field
          label="Calle y número"
          required
          className="md:col-span-2"
          value={value.street}
          onChange={(v) => update("street", v)}
        />
        <Field label="Ciudad" required value={value.city} onChange={(v) => update("city", v)} />
        <Field label="Estado" required value={value.state} onChange={(v) => update("state", v)} />
      </div>
      <div className="flex flex-wrap gap-3 justify-between items-center pt-3">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-[color:var(--color-ohm-ink-soft)] hover:text-[color:var(--color-ohm-wine)] underline underline-offset-4"
        >
          ← Volver al carrito
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-[color:var(--color-ohm-wine)] text-[color:var(--color-ohm-cream)] px-6 py-3 rounded-sm hover:bg-[color:var(--color-ohm-wine-dark)] transition-colors text-sm font-semibold uppercase tracking-[0.12em]"
        >
          Continuar al pago
        </button>
      </div>
    </form>
  );
}

function PaymentStep({
  value,
  onChange,
  onSubmit,
  onBack,
}: {
  value: PaymentForm;
  onChange: (v: PaymentForm) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="border border-[color:var(--color-ohm-line)] bg-[color:var(--color-ohm-paper)] rounded-sm p-6 md:p-8 space-y-5"
    >
      <div className="flex items-start justify-between">
        <h2 className="text-xl md:text-2xl font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
          Método de pago
        </h2>
        <span className="inline-flex items-center gap-1.5 text-xs text-[color:var(--color-ohm-ink-soft)]">
          <Lock size={12} strokeWidth={1.75} />
          Conexión cifrada
        </span>
      </div>

      <p className="text-xs text-[color:var(--color-ohm-ink-soft)] italic bg-[color:var(--color-ohm-gold-pale)]/40 border border-[color:var(--color-ohm-gold)]/30 rounded-sm p-3">
        Esto es una simulación. Puedes usar cualquier número de 16 dígitos — no se procesará ningún cargo real.
      </p>

      <Field
        label="Nombre en la tarjeta"
        required
        value={value.cardName}
        onChange={(v) => onChange({ ...value, cardName: v })}
      />
      <Field
        label="Número de tarjeta"
        required
        inputMode="numeric"
        placeholder="0000 0000 0000 0000"
        value={value.cardNumber}
        onChange={(v) => onChange({ ...value, cardNumber: maskCard(v) })}
      />
      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Vencimiento"
          required
          inputMode="numeric"
          placeholder="MM/AA"
          value={value.expiry}
          onChange={(v) => onChange({ ...value, expiry: maskExpiry(v) })}
        />
        <Field
          label="CVC"
          required
          inputMode="numeric"
          placeholder="123"
          value={value.cvc}
          onChange={(v) => onChange({ ...value, cvc: v.replace(/\D/g, "").slice(0, 4) })}
        />
      </div>

      <div className="flex flex-wrap gap-3 justify-between items-center pt-3">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-[color:var(--color-ohm-ink-soft)] hover:text-[color:var(--color-ohm-wine)] underline underline-offset-4"
        >
          ← Editar envío
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-[color:var(--color-ohm-wine)] text-[color:var(--color-ohm-cream)] px-6 py-3 rounded-sm hover:bg-[color:var(--color-ohm-wine-dark)] transition-colors text-sm font-semibold uppercase tracking-[0.12em]"
        >
          <Lock size={14} strokeWidth={1.75} />
          Pagar ahora
        </button>
      </div>
    </form>
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
