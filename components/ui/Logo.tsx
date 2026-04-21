import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Division = "ohm-pharma" | "gin" | "i-love-myself" | "grupo-ohm";

type Props = {
  division?: Division;
  variant?: "horizontal" | "vertical" | "mark";
  className?: string;
  width?: number;
  height?: number;
  href?: string;
  alt?: string;
};

const sources: Record<Division, { horizontal: string; vertical: string; mark: string; alt: string }> = {
  "ohm-pharma": {
    horizontal: "/branding/ohm-pharma/logo-original.jpeg",
    vertical: "/branding/ohm-pharma/logo-original.jpeg",
    mark: "/branding/ohm-pharma/logo-original.jpeg",
    alt: "OHM Pharma — Distribuidora de Medicamento",
  },
  gin: {
    horizontal: "/branding/gin/farmacia-sin-fondo.png",
    vertical: "/branding/gin/farmacia-sin-fondo.png",
    mark: "/branding/gin/farmacia-sin-fondo.png",
    alt: "Farmayoreo Gin",
  },
  "i-love-myself": {
    horizontal: "/branding/i-love-myself/logo-horizontal.svg",
    vertical: "/branding/i-love-myself/logo-vertical.svg",
    mark: "/branding/i-love-myself/mark.svg",
    alt: "I Love Myself — OHM Pharma",
  },
  "grupo-ohm": {
    horizontal: "/branding/ohm-pharma/logo-original.jpeg",
    vertical: "/branding/ohm-pharma/logo-original.jpeg",
    mark: "/branding/ohm-pharma/logo-original.jpeg",
    alt: "Grupo OHM",
  },
};

export function Logo({
  division = "grupo-ohm",
  variant = "horizontal",
  className,
  width = 180,
  height = 60,
  href,
  alt,
}: Props) {
  const data = sources[division];
  if (division === "grupo-ohm") {
    const groupContent = (
      <span
        className={cn(
          "inline-flex items-baseline gap-2 font-[family-name:var(--font-display)]",
          className,
        )}
      >
        <span className="text-[color:var(--color-ohm-wine)] text-[1.5em] leading-none">Grupo</span>
        <span className="text-[color:var(--color-ohm-ink)] text-[1.5em] leading-none tracking-tight">
          <span className="text-[color:var(--color-ohm-gold)]">O</span>HM
        </span>
      </span>
    );
    return href ? <Link href={href}>{groupContent}</Link> : groupContent;
  }
  const img = (
    <Image
      src={data[variant]}
      alt={alt || data.alt}
      width={width}
      height={height}
      className={cn("object-contain", className)}
      priority={variant !== "mark"}
    />
  );
  return href ? <Link href={href}>{img}</Link> : img;
}
