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
    horizontal: "/branding/ohm-pharma/distribucion-logo.jpeg",
    vertical: "/branding/ohm-pharma/distribucion-logo.jpeg",
    mark: "/branding/ohm-pharma/distribucion-logo.jpeg",
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
    horizontal: "/branding/ohm-pharma/distribucion-logo.jpeg",
    vertical: "/branding/ohm-pharma/distribucion-logo.jpeg",
    mark: "/branding/ohm-pharma/distribucion-logo.jpeg",
    alt: "Grupo OHM — Distribuidora de Medicamento",
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
