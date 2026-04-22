"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, ShieldCheck, Truck, RefreshCw, Plus, Check, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import type { Product, Review } from "@/lib/data/products";
import { useCart } from "@/lib/cart/CartContext";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
  accent: "sage" | "nude" | "wine";
  backHref: string;
  backLabel: string;
};

const accentMap = {
  sage: {
    badge: "bg-[color:var(--color-gin-sage-pale)] text-[color:var(--color-gin-sage-dark)] border-[color:var(--color-gin-sage-soft)]",
    price: "text-[color:var(--color-gin-sage-dark)]",
    cta: "bg-[color:var(--color-gin-sage-dark)] hover:bg-[color:var(--color-gin-sage-dark)]/90 text-white",
    outline: "border-[color:var(--color-gin-sage)] text-[color:var(--color-gin-sage-dark)] hover:bg-[color:var(--color-gin-sage-pale)]",
    star: "text-[color:var(--color-gin-sage-dark)]",
    tag: "bg-[color:var(--color-gin-sage-pale)] text-[color:var(--color-gin-sage-dark)]",
  },
  nude: {
    badge: "bg-[color:var(--color-ilm-nude-pale)] text-[color:var(--color-ilm-nude-dark)] border-[color:var(--color-ilm-nude-soft)]",
    price: "text-[color:var(--color-ilm-nude-dark)]",
    cta: "bg-[color:var(--color-ilm-nude-dark)] hover:bg-[color:var(--color-ilm-nude-dark)]/90 text-white",
    outline: "border-[color:var(--color-ilm-nude)] text-[color:var(--color-ilm-nude-dark)] hover:bg-[color:var(--color-ilm-nude-pale)]",
    star: "text-[color:var(--color-ilm-nude-dark)]",
    tag: "bg-[color:var(--color-ilm-nude-pale)] text-[color:var(--color-ilm-nude-dark)]",
  },
  wine: {
    badge: "bg-[color:var(--color-ohm-paper)] text-[color:var(--color-ohm-wine)] border-[color:var(--color-ohm-line)]",
    price: "text-[color:var(--color-ohm-wine)]",
    cta: "bg-[color:var(--color-ohm-wine)] hover:bg-[color:var(--color-ohm-wine-dark)] text-[color:var(--color-ohm-cream)]",
    outline: "border-[color:var(--color-ohm-wine-soft)] text-[color:var(--color-ohm-wine)] hover:bg-[color:var(--color-ohm-paper)]",
    star: "text-[color:var(--color-ohm-wine)]",
    tag: "bg-[color:var(--color-ohm-paper)] text-[color:var(--color-ohm-wine)]",
  },
};

function StarRating({ rating, size = 16, className }: { rating: number; size?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-none text-amber-300"}
        />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="border border-[color:var(--color-ohm-line)] bg-[color:var(--color-ohm-paper)] rounded-sm p-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <StarRating rating={review.rating} size={14} />
          <span className="text-sm font-medium text-[color:var(--color-ohm-ink)]">{review.author}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[color:var(--color-ohm-ink-soft)]">
          {review.verified && (
            <span className="inline-flex items-center gap-1 text-green-600">
              <ShieldCheck size={12} strokeWidth={1.75} /> Compra verificada
            </span>
          )}
          <span>{review.date}</span>
        </div>
      </div>
      <p className="mt-3 text-sm text-[color:var(--color-ohm-ink-soft)] leading-relaxed">{review.text}</p>
    </article>
  );
}

function CollapsibleSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-[color:var(--color-ohm-line)] pt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left py-2 text-sm font-medium text-[color:var(--color-ohm-ink)] hover:text-[color:var(--color-ohm-wine)]"
      >
        {title}
        {open ? <ChevronUp size={16} strokeWidth={1.75} /> : <ChevronDown size={16} strokeWidth={1.75} />}
      </button>
      {open && (
        <div className="mt-3 pb-4 text-sm text-[color:var(--color-ohm-ink-soft)] leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

export function ProductDetail({ product, accent, backHref, backLabel }: Props) {
  const s = accentMap[accent];
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const avgRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length
      : null;

  const handleAdd = () => {
    add(product, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-[color:var(--color-ohm-ink-soft)]" aria-label="Navegación">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 hover:text-[color:var(--color-ohm-wine)] transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={1.75} />
          {backLabel}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[color:var(--color-ohm-ink)]">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
        {/* ============ GALLERY ============ */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "flex-shrink-0 relative h-16 w-16 md:h-20 md:w-20 border-2 rounded-sm overflow-hidden transition-all",
                    i === activeImg
                      ? "border-[color:var(--color-ohm-wine)]"
                      : "border-[color:var(--color-ohm-line)] opacity-60 hover:opacity-100",
                  )}
                  aria-label={`Ver imagen ${i + 1}`}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
          {/* Main image */}
          <div className="relative flex-1 aspect-square md:aspect-[4/5] rounded-sm overflow-hidden bg-[color:var(--color-ohm-gold-pale)]/20 border border-[color:var(--color-ohm-line)]">
            <Image
              src={images[activeImg]}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* ============ INFO ============ */}
        <div className="flex flex-col gap-6">
          {/* Category badge */}
          <span className={cn("self-start text-[10px] uppercase tracking-[0.22em] font-medium border px-2.5 py-1 rounded-full", s.badge)}>
            {product.category}
          </span>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl leading-snug font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
            {product.name}
          </h1>

          {/* Rating summary */}
          {avgRating !== null && product.reviews && (
            <div className="flex items-center gap-3 text-sm">
              <StarRating rating={avgRating} size={16} />
              <span className="text-[color:var(--color-ohm-ink-soft)]">
                {avgRating.toFixed(1)} · {product.reviews.length} reseña{product.reviews.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          {/* Tagline */}
          <p className="text-sm text-[color:var(--color-ohm-ink-soft)] italic">{product.tagline}</p>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className={cn("text-3xl md:text-4xl font-semibold", s.price)}>
              ${product.price.toLocaleString("es-MX")}
            </span>
            <span className="text-sm text-[color:var(--color-ohm-ink-soft)]">MXN</span>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base leading-relaxed text-[color:var(--color-ohm-ink-soft)]">
            {product.description}
          </p>

          {/* Benefits */}
          {product.benefits && (
            <ul className="space-y-2">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-[color:var(--color-ohm-ink-soft)]">
                  <span className={cn("mt-0.5 h-4 w-4 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold", s.cta)}>✓</span>
                  {b}
                </li>
              ))}
            </ul>
          )}

          {/* Qty + CTA */}
          <div className="flex flex-wrap gap-3 items-center mt-2">
            <div className="inline-flex items-center border border-[color:var(--color-ohm-line)] rounded-sm">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-11 w-11 inline-flex items-center justify-center hover:bg-[color:var(--color-ohm-cream)] text-[color:var(--color-ohm-ink)]"
                aria-label="Menos"
              >
                <Plus size={14} strokeWidth={1.75} className="rotate-45" />
              </button>
              <span className="w-10 text-center font-medium text-[color:var(--color-ohm-ink)]">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="h-11 w-11 inline-flex items-center justify-center hover:bg-[color:var(--color-ohm-cream)] text-[color:var(--color-ohm-ink)]"
                aria-label="Más"
              >
                <Plus size={14} strokeWidth={1.75} />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className={cn(
                "flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-sm font-semibold uppercase tracking-[0.12em] transition-colors",
                s.cta,
              )}
            >
              {added ? (
                <>
                  <Check size={16} strokeWidth={1.75} /> ¡Agregado!
                </>
              ) : (
                <>
                  <Plus size={16} strokeWidth={1.75} /> Agregar al carrito
                </>
              )}
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[color:var(--color-ohm-line)]">
            <div className="flex flex-col items-center gap-1 text-center">
              <Truck size={18} strokeWidth={1.5} className="text-[color:var(--color-ohm-ink-soft)]" />
              <span className="text-[10px] text-[color:var(--color-ohm-ink-soft)] leading-tight">Envío a toda la República</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <ShieldCheck size={18} strokeWidth={1.5} className="text-[color:var(--color-ohm-ink-soft)]" />
              <span className="text-[10px] text-[color:var(--color-ohm-ink-soft)] leading-tight">Productos originales COFEPRIS</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <RefreshCw size={18} strokeWidth={1.5} className="text-[color:var(--color-ohm-ink-soft)]" />
              <span className="text-[10px] text-[color:var(--color-ohm-ink-soft)] leading-tight">Devolución en 30 días</span>
            </div>
          </div>

          {/* Collapsibles */}
          <div className="space-y-0.5">
            {product.howToUse && (
              <CollapsibleSection title="Modo de uso">
                <p>{product.howToUse}</p>
              </CollapsibleSection>
            )}
            {product.ingredients && (
              <CollapsibleSection title="Ingredientes">
                <p>{product.ingredients}</p>
              </CollapsibleSection>
            )}
          </div>
        </div>
      </div>

      {/* ============ REVIEWS ============ */}
      {product.reviews && product.reviews.length > 0 && (
        <section className="mt-20">
          <div className="border-t border-[color:var(--color-ohm-line)] pt-12">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
                  Reseñas de clientes
                </h2>
                {avgRating !== null && (
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-5xl font-semibold text-[color:var(--color-ohm-ink)]">
                      {avgRating.toFixed(1)}
                    </span>
                    <div className="flex flex-col gap-1">
                      <StarRating rating={avgRating} size={20} />
                      <span className="text-xs text-[color:var(--color-ohm-ink-soft)]">
                        {product.reviews.length} reseña{product.reviews.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Rating distribution */}
              <div className="flex flex-col gap-1.5 min-w-[200px]">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = product.reviews!.filter((r) => r.rating === star).length;
                  const pct = (count / product.reviews!.length) * 100;
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-2 text-right text-[color:var(--color-ohm-ink-soft)]">{star}</span>
                      <Star size={11} strokeWidth={1.5} className="text-amber-400 fill-amber-400" />
                      <div className="flex-1 h-2 bg-[color:var(--color-ohm-line)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-4 text-[color:var(--color-ohm-ink-soft)]">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review list */}
            <div className="grid md:grid-cols-2 gap-4">
              {product.reviews.map((r, i) => (
                <ReviewCard key={i} review={r} />
              ))}
            </div>

            {/* Social proof banner */}
            <div className="mt-10 p-6 border border-[color:var(--color-ohm-line)] bg-[color:var(--color-ohm-paper)] rounded-sm flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[color:var(--color-ohm-ink-soft)]">
                  Garantía de satisfacción
                </p>
                <p className="mt-1 text-lg font-[family-name:var(--font-display)] text-[color:var(--color-ohm-ink)]">
                  +500 clientes satisfechos en CDMX
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-[color:var(--color-ohm-ink-soft)]">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} strokeWidth={1.5} /> Producto auténtico</span>
                <span className="inline-flex items-center gap-1.5"><Truck size={14} strokeWidth={1.5} /> Envío en 24-72 hrs</span>
                <span className="inline-flex items-center gap-1.5"><Star size={14} strokeWidth={1.5} className="fill-amber-400 text-amber-400" /> Calidad farmacéutica</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
