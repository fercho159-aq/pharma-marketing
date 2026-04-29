"use client";

/**
 * Botón flotante de WhatsApp con CTA adaptado a la marca.
 * Detecta la ruta actual para mostrar el mensaje adecuado.
 * Incluye animación sutil de "pulso" para llamar la atención.
 */

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

const WA_NUMBER = "5215575538801";

type BrandConfig = {
  cta: string;
  message: string;
  bg: string;
  bgHover: string;
  pulse: string;
  text: string;
  badge: string;
  badgeBg: string;
};

function getBrandConfig(pathname: string): BrandConfig {
  if (pathname.startsWith("/farmacia")) {
    return {
      cta: "¿Necesitas tu medicamento?",
      message: "Hola, estoy en la página de Farmayoreo Gin y me gustaría hacer un pedido 💊",
      bg: "bg-[#4F5D46]",
      bgHover: "hover:bg-[#3d4a36]",
      pulse: "bg-[#7A8B6F]",
      text: "text-white",
      badge: "text-[#4F5D46]",
      badgeBg: "bg-[#DCE2D4]",
    };
  }
  if (pathname.startsWith("/skincare")) {
    return {
      cta: "¿Dudas sobre tu rutina?",
      message: "Hola, estoy en la página de I Love Myself y me gustaría recibir asesoría sobre skincare ✨",
      bg: "bg-[#6E3495]",
      bgHover: "hover:bg-[#5a2a7a]",
      pulse: "bg-[#D696C2]",
      text: "text-white",
      badge: "text-[#6E3495]",
      badgeBg: "bg-[#F7E4EE]",
    };
  }
  if (pathname.startsWith("/distribucion")) {
    return {
      cta: "¿Buscas proveedor mayorista?",
      message: "Hola, estoy en la página de OHM Pharma Distribución y me interesa abrir cuenta como cliente mayorista 🏥",
      bg: "bg-[#830220]",
      bgHover: "hover:bg-[#6a011a]",
      pulse: "bg-[#A84356]",
      text: "text-white",
      badge: "text-[#830220]",
      badgeBg: "bg-[#E8D9A8]",
    };
  }
  // Default — grupo/home
  return {
    cta: "Escríbenos por WhatsApp",
    message: "Hola, me gustaría recibir más información sobre Grupo OHM 👋",
    bg: "bg-[#830220]",
    bgHover: "hover:bg-[#6a011a]",
    pulse: "bg-[#A84356]",
    text: "text-white",
    badge: "text-[#830220]",
    badgeBg: "bg-[#E8D9A8]",
  };
}

export function WhatsAppFloat() {
  const pathname = usePathname();
  const brand = getBrandConfig(pathname);
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Show tooltip after 3 seconds, auto-hide after 8 more
  useEffect(() => {
    const showTimer = setTimeout(() => setShowTooltip(true), 3000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 11000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(brand.message)}`;

  // Don't show on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip / CTA bubble */}
      {showTooltip && !dismissed && (
        <div
          className={`${brand.badgeBg} ${brand.badge} rounded-lg shadow-lg px-4 py-3 max-w-[220px] text-sm font-medium leading-snug animate-in fade-in slide-in-from-bottom-2 duration-300 relative`}
        >
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="absolute -top-2 -right-2 bg-white rounded-full shadow p-0.5"
            aria-label="Cerrar"
          >
            <X size={12} strokeWidth={2} className="text-gray-500" />
          </button>
          {brand.cta}
          {/* Triangle pointer */}
          <div
            className={`absolute -bottom-2 right-5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] ${
              brand.badgeBg === "bg-[#DCE2D4]"
                ? "border-t-[#DCE2D4]"
                : brand.badgeBg === "bg-[#F7E4EE]"
                  ? "border-t-[#F7E4EE]"
                  : "border-t-[#E8D9A8]"
            }`}
          />
        </div>
      )}

      {/* Main floating button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className={`group relative inline-flex items-center justify-center h-14 w-14 rounded-full ${brand.bg} ${brand.bgHover} ${brand.text} shadow-lg shadow-black/20 transition-all duration-300 hover:scale-110 hover:shadow-xl`}
      >
        {/* Pulse ring */}
        <span
          className={`absolute inset-0 rounded-full ${brand.pulse} opacity-40 animate-ping`}
          style={{ animationDuration: "2s" }}
        />
        {/* WhatsApp icon */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="relative h-7 w-7"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
