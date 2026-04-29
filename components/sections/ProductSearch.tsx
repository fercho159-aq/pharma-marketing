"use client";

/**
 * Buscador de productos con autocompletado.
 * Muestra hasta 3 resultados parecidos según el texto que escribe el usuario.
 * Funciona en desktop y mobile (responsive).
 */

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import type { Product } from "@/lib/data/products";

type Props = {
  products: Product[];
  /** Base URL para detalle de producto, ej. "/farmacia" */
  detailBase?: string;
  /** Tono del UI: "sage" para farmacia, "wine" para distribución, etc. */
  accent?: "sage" | "wine" | "ilm";
  placeholder?: string;
};

const MAX_RESULTS = 3;

function formatMXN(n: number) {
  return `$${n.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

/**
 * Score de coincidencia muy simple — más alto = mejor match.
 * Prioriza:
 *  - coincidencia al inicio del nombre
 *  - múltiples términos del query coinciden
 *  - coincidencia en categoría/tagline
 */
function scoreProduct(product: Product, query: string): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;

  const haystack = `${product.name} ${product.tagline} ${product.category} ${product.ingredients ?? ""}`.toLowerCase();
  const name = product.name.toLowerCase();
  const tokens = q.split(/\s+/).filter(Boolean);

  let score = 0;

  // Match exacto al inicio del nombre — peso máximo
  if (name.startsWith(q)) score += 100;

  // Cada token que coincide en el nombre suma
  for (const t of tokens) {
    if (name.includes(t)) score += 25;
    else if (haystack.includes(t)) score += 8;
  }

  // Bonus si el query completo coincide
  if (haystack.includes(q)) score += 15;

  return score;
}

export function ProductSearch({
  products,
  detailBase = "/farmacia",
  accent = "sage",
  placeholder = "Busca un producto, principio activo o categoría…",
}: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ─── Calcula los 3 mejores resultados ────────────────────────────────────────
  const results = useMemo(() => {
    if (query.trim().length === 0) return [];

    return products
      .map((p) => ({ product: p, score: scoreProduct(p, query) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS)
      .map((r) => r.product);
  }, [query, products]);

  // ─── Cierra dropdown al hacer click fuera ────────────────────────────────────
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ─── Reset highlight cuando cambian resultados ───────────────────────────────
  useEffect(() => {
    setHighlight(0);
  }, [results.length]);

  // ─── Navegación con teclado ──────────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[highlight];
      if (target) window.location.href = `${detailBase}/${target.id}`;
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  // ─── Estilos según accent ────────────────────────────────────────────────────
  const accentStyles = {
    sage: {
      ring: "focus-within:border-[color:var(--color-gin-sage-dark)] focus-within:ring-[color:var(--color-gin-sage-dark)]/25",
      itemHover: "hover:bg-[color:var(--color-gin-sage-pale)]",
      itemActive: "bg-[color:var(--color-gin-sage-pale)]",
      price: "text-[color:var(--color-gin-sage-dark)]",
    },
    wine: {
      ring: "focus-within:border-[color:var(--color-ohm-wine)] focus-within:ring-[color:var(--color-ohm-wine)]/25",
      itemHover: "hover:bg-[color:var(--color-ohm-gold-pale)]/40",
      itemActive: "bg-[color:var(--color-ohm-gold-pale)]/40",
      price: "text-[color:var(--color-ohm-wine)]",
    },
    ilm: {
      ring: "focus-within:border-[color:var(--color-ilm-nude-dark)] focus-within:ring-[color:var(--color-ilm-nude-dark)]/25",
      itemHover: "hover:bg-[color:var(--color-ilm-nude-pale)]",
      itemActive: "bg-[color:var(--color-ilm-nude-pale)]",
      price: "text-[color:var(--color-ilm-nude-dark)]",
    },
  }[accent];

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      {/* INPUT */}
      <div
        className={`flex items-center gap-3 px-4 py-3 md:py-3.5 border-2 border-[color:var(--color-ohm-line)] bg-[color:var(--color-ohm-paper)] rounded-sm transition-colors focus-within:ring-2 ${accentStyles.ring}`}
      >
        <Search size={18} strokeWidth={1.75} className="text-[color:var(--color-ohm-ink-soft)] shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Buscar productos"
          aria-autocomplete="list"
          aria-expanded={open && results.length > 0}
          className="flex-1 bg-transparent outline-none text-sm md:text-base text-[color:var(--color-ohm-ink)] placeholder:text-[color:var(--color-ohm-ink-soft)]"
        />
        {query && (
          <button
            type="button"
            aria-label="Limpiar búsqueda"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="text-[color:var(--color-ohm-ink-soft)] hover:text-[color:var(--color-ohm-ink)] transition-colors shrink-0"
          >
            <X size={16} strokeWidth={1.75} />
          </button>
        )}
      </div>

      {/* DROPDOWN DE RESULTADOS */}
      {open && query.trim().length > 0 && (
        <div
          role="listbox"
          className="absolute z-50 left-0 right-0 mt-2 bg-[color:var(--color-ohm-paper)] border border-[color:var(--color-ohm-line)] rounded-sm shadow-xl overflow-hidden"
        >
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-[color:var(--color-ohm-ink-soft)]">
              No encontramos productos para
              <span className="font-medium text-[color:var(--color-ohm-ink)]"> &ldquo;{query}&rdquo;</span>.
              <p className="mt-1 text-xs">Intenta con otra palabra o navega por categoría.</p>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-[color:var(--color-ohm-line)]">
                {results.map((p, idx) => (
                  <li key={p.id} role="option" aria-selected={idx === highlight}>
                    <Link
                      href={`${detailBase}/${p.id}`}
                      onMouseEnter={() => setHighlight(idx)}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 md:gap-4 px-3 md:px-4 py-3 transition-colors ${
                        idx === highlight ? accentStyles.itemActive : accentStyles.itemHover
                      }`}
                    >
                      {/* Imagen */}
                      <div className="relative shrink-0 h-14 w-14 md:h-16 md:w-16 bg-[color:var(--color-ohm-cream)] border border-[color:var(--color-ohm-line)] rounded-sm overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-ohm-ink-soft)] truncate">
                          {p.category}
                        </p>
                        <h4 className="text-sm md:text-base font-medium text-[color:var(--color-ohm-ink)] leading-snug truncate">
                          {p.name}
                        </h4>
                        <p className="hidden sm:block text-xs text-[color:var(--color-ohm-ink-soft)] truncate mt-0.5">
                          {p.tagline}
                        </p>
                      </div>

                      {/* Precio */}
                      <div className={`shrink-0 text-sm md:text-base font-semibold ${accentStyles.price}`}>
                        {formatMXN(p.price)}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-ohm-ink-soft)] bg-[color:var(--color-ohm-cream)] border-t border-[color:var(--color-ohm-line)] text-center">
                ↑ ↓ navegar · ↵ abrir · Esc cerrar
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
