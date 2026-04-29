"use client";

/**
 * Buscador compacto para el header.
 * - Desktop: input visible inline (entre logo y nav)
 * - Mobile: botón ícono que abre un overlay full-width con el buscador
 */

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { ProductSearch } from "./ProductSearch";
import { farmaciaProducts } from "@/lib/data/products";

export function HeaderSearch() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Bloquea scroll del body cuando el overlay mobile está abierto
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Cerrar con Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [mobileOpen]);

  return (
    <>
      {/* DESKTOP — input inline */}
      <div className="hidden lg:block w-[200px] xl:w-[240px] mx-3">
        <CompactSearch />
      </div>

      {/* MOBILE/TABLET — botón ícono */}
      <button
        type="button"
        aria-label="Buscar productos"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-sm text-[color:var(--color-ohm-ink)] hover:bg-[color:var(--color-ohm-gold-pale)] transition-colors"
      >
        <Search size={20} strokeWidth={1.75} />
      </button>

      {/* MOBILE/TABLET — overlay con buscador full-width */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Buscador de productos"
          className="lg:hidden fixed inset-0 z-50 bg-[color:var(--color-ohm-cream)]/95 backdrop-blur-sm"
          onClick={(e) => {
            // Cerrar al click en el fondo (no en el contenido)
            if (e.target === e.currentTarget) setMobileOpen(false);
          }}
        >
          <div className="flex flex-col h-full">
            {/* Header del overlay */}
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[color:var(--color-ohm-line)] bg-[color:var(--color-ohm-cream)]">
              <p className="text-[11px] uppercase tracking-[0.28em] font-medium text-[color:var(--color-gin-sage-dark)]">
                Buscar productos
              </p>
              <button
                type="button"
                aria-label="Cerrar buscador"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center h-9 w-9 rounded-sm hover:bg-[color:var(--color-ohm-gold-pale)] transition-colors"
              >
                <X size={20} strokeWidth={1.75} />
              </button>
            </div>

            {/* Buscador */}
            <div className="flex-1 px-6 py-6 overflow-auto">
              <ProductSearch
                products={farmaciaProducts}
                detailBase="/farmacia"
                accent="sage"
                placeholder="Busca por nombre, principio activo…"
              />
              <p className="mt-6 text-xs text-[color:var(--color-ohm-ink-soft)] text-center">
                Tip: prueba con &ldquo;dolor&rdquo;, &ldquo;diabetes&rdquo; o &ldquo;presión&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Versión compacta del buscador para usar inline en el header (desktop).
 * Misma lógica que ProductSearch pero más estrecho.
 */
function CompactSearch() {
  return (
    <ProductSearch
      products={farmaciaProducts}
      detailBase="/farmacia"
      accent="sage"
      placeholder="Buscar productos…"
      compact
    />
  );
}
