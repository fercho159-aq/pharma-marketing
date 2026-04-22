import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeaderNav } from "@/components/sections/HeaderNav";
import { Footer } from "@/components/sections/Footer";
import { ProductDetail } from "@/components/sections/ProductDetail";
import { skincareProducts } from "@/lib/data/products";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return skincareProducts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = skincareProducts.find((p) => p.id === id);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: `${product.name} — I Love Myself`,
    description: product.description,
  };
}

export default async function SkincareProductPage({ params }: Props) {
  const { id } = await params;
  const product = skincareProducts.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <>
      <HeaderNav variant="skincare" />
      <main className="min-h-screen bg-[color:var(--color-ohm-cream)]">
        <ProductDetail
          product={product}
          accent="nude"
          backHref="/skincare"
          backLabel="Skincare"
        />
      </main>
      <Footer tone="nude" />
    </>
  );
}
