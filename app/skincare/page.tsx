import Image from "next/image";
import { HeaderNav } from "@/components/sections/HeaderNav";
import { Footer } from "@/components/sections/Footer";
import { ProductCard } from "@/components/sections/ProductCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Divider } from "@/components/ui/Divider";
import { skincareProducts, ritualSteps } from "@/lib/data/products";
import { Sparkles, Leaf, FlaskConical, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const values = [
  { icon: Sparkles, title: "Formulaciones limpias", text: "Sin parabenos ni siliconas. Activos naturales con respaldo clínico." },
  { icon: Leaf, title: "Botánica mexicana", text: "Extractos de plantas nativas cosechadas con proveedores locales." },
  { icon: FlaskConical, title: "Estándar farmacéutico", text: "Producido en laboratorios certificados por COFEPRIS." },
  { icon: HeartHandshake, title: "Cruelty-free", text: "Nunca probado en animales. Envases reciclables y refill en CDMX." },
];

export default function SkincarePage() {
  return (
    <>
      <HeaderNav variant="skincare" />

      <main>
        {/* HERO */}
        <section className="px-6 md:px-10 pt-24 pb-20 md:pt-32 md:pb-28 bg-[color:var(--color-ilm-nude-pale)] border-b border-[color:var(--color-ilm-nude-soft)]">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-[3fr_2fr] gap-16 items-center">
            <div className="flex flex-col gap-8">
              <p className="text-[11px] uppercase tracking-[0.28em] font-medium text-[color:var(--color-ilm-nude-dark)]">
                I Love Myself · Ritual de piel
              </p>
              <h1 className="text-[length:var(--text-display)] leading-[0.98] text-[color:var(--color-ohm-ink)]">
                Skincare con <span className="italic text-[color:var(--color-ilm-nude-dark)]">alma</span> farmacéutica.
              </h1>
              <p className="text-[1.1rem] leading-[1.6] text-[color:var(--color-ohm-ink-soft)] max-w-[48ch]">
                Rituales diarios con formulaciones botánicas desarrolladas bajo estándar clínico. Para pieles que quieren cuidarse con intención.
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <Button href="#productos" variant="nude" size="lg">Descubrir ritual</Button>
                <Button href="#filosofia" variant="outline" size="lg">Nuestra filosofía</Button>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[color:var(--color-ilm-nude-soft)]">
              <Image
                src="/products/product-5.jpeg"
                alt="Sérum I Love Myself"
                fill
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* PRODUCTOS HERO */}
        <section id="productos" className="px-6 md:px-10 py-[var(--spacing-section)]">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="La colección"
              title={<>Tres gestos. <span className="italic">Una piel luminosa.</span></>}
              subtitle="Cada producto fue formulado para funcionar solo o como parte de un ritual completo."
              tone="nude"
              align="center"
              className="mb-16 mx-auto"
            />
            <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {skincareProducts.map((p) => (
                <div key={p.id} data-reveal-item>
                  <ProductCard product={p} accent="nude" />
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* RITUAL */}
        <section className="px-6 md:px-10 py-[var(--spacing-section)] bg-[color:var(--color-ilm-nude-pale)] border-y border-[color:var(--color-ilm-nude-soft)]">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="El ritual"
              title={<>Cuatro pasos. <span className="italic">Un cuidado editorial.</span></>}
              tone="nude"
              align="left"
              className="mb-16"
            />
            <Reveal as="ol" className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {ritualSteps.map((s) => (
                <li key={s.n} data-reveal-item className="flex flex-col gap-4 border-t border-[color:var(--color-ilm-nude-soft)] pt-6">
                  <span className="text-[10px] tracking-[0.3em] text-[color:var(--color-ilm-nude-dark)]">
                    {s.n}
                  </span>
                  <h3 className="text-[1.5rem] leading-tight text-[color:var(--color-ohm-ink)] font-[family-name:var(--font-display)]">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[color:var(--color-ohm-ink-soft)] leading-relaxed">{s.text}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        {/* FILOSOFÍA / VALORES */}
        <section id="filosofia" className="px-6 md:px-10 py-[var(--spacing-section)]">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Filosofía"
              title={<>Belleza que respeta la piel, el tiempo y la tierra.</>}
              tone="nude"
              align="left"
              className="mb-16"
            />
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {values.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex flex-col gap-3 border-t border-[color:var(--color-ilm-nude-soft)] pt-6">
                  <Icon size={24} strokeWidth={1.5} className="text-[color:var(--color-ilm-nude-dark)]" />
                  <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-[color:var(--color-ilm-nude-dark)]">{title}</p>
                  <p className="text-sm text-[color:var(--color-ohm-ink-soft)] leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* QUOTE / CIERRE */}
        <section className="px-6 md:px-10 py-[var(--spacing-section)] bg-[color:var(--color-ohm-paper)] border-y border-[color:var(--color-ohm-line)]">
          <div className="mx-auto max-w-3xl text-center flex flex-col items-center gap-8">
            <Divider ornament tone="gold" className="w-24" />
            <blockquote className="text-[length:var(--text-h2)] leading-[1.15] text-[color:var(--color-ohm-ink)] font-[family-name:var(--font-display)]">
              &ldquo;Cuidar la piel es también una forma de <span className="italic text-[color:var(--color-ilm-nude-dark)]">quererte</span> todos los días.&rdquo;
            </blockquote>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-ohm-ink-soft)]">
              Sheccid Medina — Fundadora
            </p>
            <Divider ornament tone="gold" className="w-24" />
          </div>
        </section>
      </main>

      <Footer tone="nude" />
    </>
  );
}
