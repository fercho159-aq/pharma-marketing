import Image from "next/image";
import { HeaderNav } from "@/components/sections/HeaderNav";
import { Footer } from "@/components/sections/Footer";
import { ProductCard } from "@/components/sections/ProductCard";
import { BenefitsBand } from "@/components/sections/BenefitsBand";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Divider } from "@/components/ui/Divider";
import { farmaciaProducts, farmaciaCategories } from "@/lib/data/products";
import { Leaf, Clock3, MapPin, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const benefits = [
  { icon: Leaf, title: "Asesoría cercana", text: "Nuestro equipo conoce a cada cliente por su nombre y su tratamiento." },
  { icon: Clock3, title: "Entrega el mismo día", text: "Cobertura en CDMX y Estado de México con tarifa plana." },
  { icon: MapPin, title: "Sucursal en Tláhuac", text: "Av. Tláhuac 2772, abierta de lunes a sábado." },
  { icon: MessageCircle, title: "WhatsApp Business", text: "Pide por chat, te confirmamos disponibilidad y precio." },
];

export default function FarmaciaPage() {
  return (
    <>
      <HeaderNav variant="farmacia" />

      <main>
        {/* HERO */}
        <section className="px-6 md:px-10 pt-24 pb-20 md:pt-32 md:pb-28 bg-[color:var(--color-gin-sage-pale)] border-b border-[color:var(--color-gin-sage-soft)]">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-[3fr_2fr] gap-16 items-center">
            <div className="flex flex-col gap-8">
              <p className="text-[11px] uppercase tracking-[0.28em] font-medium text-[color:var(--color-gin-sage-dark)]">
                Farmayoreo Gin · Tláhuac, CDMX
              </p>
              <h1 className="text-[length:var(--text-display)] leading-[0.98] text-[color:var(--color-ohm-ink)]">
                Tu farmacia de <span className="italic text-[color:var(--color-gin-sage-dark)]">confianza</span>, cerca de casa.
              </h1>
              <p className="text-[1.1rem] leading-[1.6] text-[color:var(--color-ohm-ink-soft)] max-w-[48ch]">
                Medicamento, vitaminas y cuidado diario al precio justo. Atención humana, surtido amplio y entrega el mismo día.
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <Button href="#productos" variant="sage" size="lg">Ver productos</Button>
                <Button href="https://wa.me/5215555555555" variant="outline" size="lg">
                  <MessageCircle size={16} strokeWidth={1.5} className="mr-2" />
                  Pedir por WhatsApp
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/5] bg-[color:var(--color-ohm-paper)] border border-[color:var(--color-gin-sage-soft)] rounded-sm p-10 flex items-center justify-center">
              <Image
                src="/branding/gin/farmacia-sin-fondo.png"
                alt="Farmayoreo Gin"
                width={320}
                height={320}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </section>

        {/* CATEGORÍAS */}
        <section className="px-6 md:px-10 py-16 border-b border-[color:var(--color-ohm-line)]">
          <div className="mx-auto max-w-7xl flex flex-col gap-6">
            <p className="text-[11px] uppercase tracking-[0.28em] font-medium text-[color:var(--color-gin-sage-dark)]">
              Explora por categoría
            </p>
            <div className="flex flex-wrap gap-3">
              {farmaciaCategories.map((c) => (
                <a
                  key={c}
                  href="#productos"
                  className="px-5 py-2 text-sm border border-[color:var(--color-gin-sage-soft)] text-[color:var(--color-ohm-ink)] rounded-sm hover:bg-[color:var(--color-gin-sage-pale)] hover:border-[color:var(--color-gin-sage-dark)] transition-colors"
                >
                  {c}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTOS DESTACADOS */}
        <section id="productos" className="px-6 md:px-10 py-[var(--spacing-section)]">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Más pedidos esta semana"
              title={<>Lo que tu familia <span className="italic">necesita.</span></>}
              subtitle="Productos de alta rotación con stock garantizado en nuestra sucursal de Tláhuac."
              tone="sage"
              align="left"
              className="mb-16"
            />
            <Reveal className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {farmaciaProducts.map((p) => (
                <div key={p.id} data-reveal-item>
                  <ProductCard product={p} accent="sage" detailBase="/farmacia" />
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* BENEFITS */}
        <BenefitsBand items={benefits} tone="sage-pale" />

        {/* SUCURSAL / CTA */}
        <section className="px-6 md:px-10 py-[var(--spacing-section)]">
          <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="flex flex-col gap-6">
              <p className="text-[11px] uppercase tracking-[0.28em] font-medium text-[color:var(--color-gin-sage-dark)]">
                Visítanos
              </p>
              <h2 className="text-[length:var(--text-h2)] leading-[1.1] text-[color:var(--color-ohm-ink)]">
                Pasa por tu medicamento. Te esperamos con café.
              </h2>
              <Divider tone="gold" className="my-2" />
              <address className="not-italic flex flex-col gap-4 text-sm text-[color:var(--color-ohm-ink-soft)]">
                <p className="flex items-start gap-3">
                  <MapPin size={16} strokeWidth={1.5} className="mt-0.5 text-[color:var(--color-gin-sage-dark)]" />
                  Av. Tláhuac 2772, Santa Ana Poniente, Tláhuac, CDMX.
                </p>
                <p className="flex items-start gap-3">
                  <Clock3 size={16} strokeWidth={1.5} className="mt-0.5 text-[color:var(--color-gin-sage-dark)]" />
                  Lunes a sábado · 9:00–21:00 · Domingos 10:00–16:00
                </p>
              </address>
            </div>
            <div className="bg-[color:var(--color-gin-sage-pale)] border border-[color:var(--color-gin-sage-soft)] rounded-sm p-8 md:p-10 flex flex-col gap-5">
              <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-[color:var(--color-gin-sage-dark)]">
                Pedido rápido
              </p>
              <p className="text-lg leading-snug text-[color:var(--color-ohm-ink)] font-[family-name:var(--font-display)]">
                ¿Buscas un medicamento específico? Mándanos la receta por WhatsApp.
              </p>
              <Button href="https://wa.me/5215555555555" variant="sage" size="lg" className="self-start">
                <MessageCircle size={16} strokeWidth={1.5} className="mr-2" />
                Abrir WhatsApp
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer tone="sage" />
    </>
  );
}
