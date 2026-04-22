import type { Metadata, Viewport } from "next";
import { fontDisplay, fontBody } from "@/lib/fonts";
import { CartProvider } from "@/lib/cart/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grupo OHM — Distribución, farmacia y skincare desde CDMX",
  description:
    "Holding farmacéutico mexicano. OHM Pharma Distribución · Farmayoreo Gin · I Love Myself.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF7F2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
