"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";
import { Plus, Check } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";

type Props = {
  product: Product;
  accent?: "sage" | "nude" | "wine";
  className?: string;
  /** The base URL for the product detail page, e.g. "/skincare" or "/farmacia" */
  detailBase?: string;
};

const accentMap = {
  sage: {
    price: "text-[color:var(--color-gin-sage-dark)]",
    cta: "border-[color:var(--color-gin-sage)] text-[color:var(--color-gin-sage-dark)] hover:bg-[color:var(--color-gin-sage-pale)]",
  },
  nude: {
    price: "text-[color:var(--color-ilm-nude-dark)]",
    cta: "border-[color:var(--color-ilm-nude)] text-[color:var(--color-ilm-nude-dark)] hover:bg-[color:var(--color-ilm-nude-pale)]",
  },
  wine: {
    price: "text-[color:var(--color-ohm-wine)]",
    cta: "border-[color:var(--color-ohm-wine-soft)] text-[color:var(--color-ohm-wine)] hover:bg-[color:var(--color-ohm-paper)]",
  },
};

export function ProductCard({ product, accent = "sage", className, detailBase }: Props) {
  const s = accentMap[accent];
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // don't navigate when clicking the button
    add(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const detailHref = detailBase ? `${detailBase}/${product.id}` : undefined;

  const cardContent = (
    <>
      <div className="aspect-[4/5] relative overflow-hidden bg-[color:var(--color-ohm-gold-pale)]/30">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ohm-ink-soft)]">
          {product.category}
        </p>
        <h3 className="text-lg leading-snug text-[color:var(--color-ohm-ink)] font-[family-name:var(--font-display)]">
          {product.name}
        </h3>
        <p className="text-sm text-[color:var(--color-ohm-ink-soft)]">{product.tagline}</p>
        <p className="text-sm leading-relaxed text-[color:var(--color-ohm-ink-soft)]/90 flex-1 line-clamp-3">
          {product.description}
        </p>
        {detailHref && (
          <span className="text-xs font-medium underline underline-offset-4 text-[color:var(--color-ohm-ink-soft)] opacity-0 group-hover:opacity-100 transition-opacity">
            Ver detalles →
          </span>
        )}
        <div className="flex items-end justify-between mt-3 pt-3 border-t border-[color:var(--color-ohm-line)]">
          <span className={cn("text-lg font-medium", s.price)}>
            ${product.price.toLocaleString("es-MX")}
            <span className="text-xs text-[color:var(--color-ohm-ink-soft)] font-normal ml-1">MXN</span>
          </span>
          <button
            type="button"
            onClick={handleAdd}
            className={cn(
              "inline-flex items-center gap-1 border text-xs font-medium uppercase tracking-[0.15em] px-3 py-1.5 rounded-sm transition-colors",
              s.cta,
            )}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            {added ? (
              <>
                <Check size={14} strokeWidth={1.75} />
                Agregado
              </>
            ) : (
              <>
                <Plus size={14} strokeWidth={1.75} />
                Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );

  if (detailHref) {
    return (
      <Link
        href={detailHref}
        className={cn(
          "group border border-[color:var(--color-ohm-line)] bg-[color:var(--color-ohm-paper)] rounded-sm overflow-hidden flex flex-col hover:border-[color:var(--color-ohm-wine)]/40 transition-colors",
          className,
        )}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <article
      className={cn(
        "group border border-[color:var(--color-ohm-line)] bg-[color:var(--color-ohm-paper)] rounded-sm overflow-hidden flex flex-col",
        className,
      )}
    >
      {cardContent}
    </article>
  );
}
