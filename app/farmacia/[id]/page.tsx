import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeaderNav } from "@/components/sections/HeaderNav";
import { Footer } from "@/components/sections/Footer";
import { ProductDetail } from "@/components/sections/ProductDetail";
import { farmaciaProducts } from "@/lib/data/products";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return farmaciaProducts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = farmaciaProducts.find((p) => p.id === id);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: `${product.name} — Farmayoreo Gin`,
    description: product.description,
  };
}

export default async function FarmaciaProductPage({ params }: Props) {
  const { id } = await params;
  const product = farmaciaProducts.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <>
      <HeaderNav variant="farmacia" />
      <main className="min-h-screen bg-[color:var(--color-ohm-cream)]">
        <ProductDetail
          product={product}
          accent="sage"
          backHref="/farmacia"
          backLabel="Farmacia"
        />
      </main>
      <Footer tone="sage" />
    </>
  );
}
