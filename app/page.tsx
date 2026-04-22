import Image from "next/image";
import { HeaderNav } from "@/components/sections/HeaderNav";
import { Footer } from "@/components/sections/Footer";
import { DivisionCard } from "@/components/sections/DivisionCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Divider } from "@/components/ui/Divider";
import { Reveal } from "@/components/motion/Reveal";
import { HeroEnter } from "@/components/motion/HeroEnter";

export default function Home() {
  return (
    <>
      <HeaderNav variant="grupo" />

      <main>
        {/* HERO */}
        <section className="min-h-[85vh] flex items-center px-6 md:px-10 py-20 md:py-32">
          <HeroEnter>
          <div className="mx-auto max-w-7xl w-full grid lg:grid-cols-[3fr_2fr] gap-16 items-center">
            <div className="flex flex-col gap-8">
              <p data-hero-item className="text-[11px] uppercase tracking-[0.28em] font-medium text-[color:var(--color-ohm-wine)]">
                Grupo OHM · Ciudad de México
              </p>
              <h1 data-hero-item className="text-[length:var(--text-display)] leading-[0.95] tracking-tight text-[color:var(--color-ohm-ink)]">
                Tres mundos.<br />
                <span className="italic text-[color:var(--color-ohm-wine)]">Un compromiso</span>
                <br />con tu salud.
              </h1>
              <p data-hero-item className="text-[1.15rem] leading-[1.55] text-[color:var(--color-ohm-ink-soft)] max-w-[46ch]">
                Del mayoreo farmacéutico al skincare premium, cada división responde a un cuidado específico. Elige el tuyo.
              </p>
              <div data-hero-item className="flex flex-wrap items-center gap-6 mt-2">
                <Button href="#divisiones" variant="wine" size="lg">
                  Explorar divisiones
                </Button>
                <a
                  href="#nosotros"
                  className="text-sm font-medium text-[color:var(--color-ohm-ink-soft)] hover:text-[color:var(--color-ohm-wine)] border-b border-[color:var(--color-ohm-line)] hover:border-[color:var(--color-ohm-wine)] pb-1 transition-colors"
                >
                  Conocer Grupo OHM →
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-12 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-ohm-ink-soft)]">
                <span>Distribución</span>
                <span className="h-px w-6 bg-[color:var(--color-ohm-line)]" />
                <span>Farmacia</span>
                <span className="h-px w-6 bg-[color:var(--color-ohm-line)]" />
                <span>Skincare</span>
              </div>
            </div>

            {/* Columna derecha: composición asimétrica de 3 logos */}
            <div data-hero-item className="relative hidden lg:block aspect-[4/5]">
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-[78%] aspect-[4/5] bg-[color:var(--color-ohm-paper)] border border-[color:var(--color-ohm-line)] rounded-sm p-8 flex items-center justify-center">
                  <Image
                    src="/branding/ohm-pharma/ohm-pharma-distribucion.png"
                    alt="OHM Pharma Distribuidora"
                    width={320}
                    height={160}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
                <div className="absolute bottom-[18%] left-0 w-[52%] aspect-square bg-[color:var(--color-gin-sage-pale)] border border-[color:var(--color-gin-sage-soft)] rounded-sm p-8 flex items-center justify-center">
                  <Image
                    src="/branding/gin/farmacia-sin-fondo.png"
                    alt="Farmayoreo Gin"
                    width={220}
                    height={220}
                    className="w-auto h-full object-contain"
                  />
                </div>
                <div className="absolute bottom-0 right-[10%] w-[44%] aspect-[5/3] bg-[color:var(--color-ilm-nude-pale)] border border-[color:var(--color-ilm-nude-soft)] rounded-sm p-4 flex items-center justify-center">
                  <Image
                    src="/branding/i-love-myself/skincare-logo.png"
                    alt="I Love Myself Skincare"
                    width={200}
                    height={80}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          </HeroEnter>
        </section>

        {/* DIVISIONES */}
        <section id="divisiones" className="px-6 md:px-10 py-[var(--spacing-section)] border-t border-[color:var(--color-ohm-line)]">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Nuestras divisiones"
              title={
                <>
                  Tres marcas. <span className="italic text-[color:var(--color-ohm-wine)]">Un mismo cuidado.</span>
                </>
              }
              subtitle="Cada división opera con estándares propios, manteniendo el hilo conductor dorado que define a Grupo OHM."
              align="center"
              className="mb-20"
            />

            <Reveal className="grid md:grid-cols-3 gap-6">
              <div data-reveal-item>
                <DivisionCard
                  eyebrow="B2B · Mayoreo"
                  title="OHM Pharma Distribución"
                  description="Patente, genérico y rebotica para farmacias, hospitales y clínicas. Abasto nacional con cadena de frío y trazabilidad."
                  href="/distribucion"
                  accent="wine"
                  image="/products/product-8.jpeg"
                  imageAlt="Distribución farmacéutica"
                />
              </div>
              <div data-reveal-item>
                <DivisionCard
                  eyebrow="B2C · Farmacia"
                  title="Farmayoreo Gin"
                  description="Tu farmacia de confianza. Medicamento, vitaminas y cuidado diario al precio justo, con la cercanía de siempre."
                  href="/farmacia"
                  accent="sage"
                  image="/products/product-9.jpeg"
                  imageAlt="Farmayoreo Gin"
                />
              </div>
              <div data-reveal-item>
                <DivisionCard
                  eyebrow="B2C · Skincare"
                  title="I Love Myself"
                  description="Ritual diario de skincare con formulaciones botánicas desarrolladas bajo estándar farmacéutico."
                  href="/skincare"
                  accent="nude"
                  image="/products/product-5.jpeg"
                  imageAlt="I Love Myself"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* NOSOTROS */}
        <section id="nosotros" className="px-6 md:px-10 py-[var(--spacing-section)]">
          <div className="mx-auto max-w-5xl">
            <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
              <p className="text-[11px] uppercase tracking-[0.28em] font-medium text-[color:var(--color-ohm-wine)]">
                Sobre Grupo OHM
              </p>
              <div className="flex flex-col gap-6">
                <h2 className="text-[length:var(--text-h2)] leading-[1.1] text-[color:var(--color-ohm-ink)]">
                  Nacimos en CDMX con una convicción sencilla: cuidar la salud de las familias mexicanas con cercanía y estándar profesional.
                </h2>
                <p className="text-[color:var(--color-ohm-ink-soft)] leading-[1.7] text-[1.05rem]">
                  {/* TODO: historia real de Sheccid — origen, años, equipo */}
                  Desde la distribución mayorista hasta el skincare de alta cosmética, cada división de Grupo OHM comparte un mismo compromiso: ofrecer productos con trazabilidad, precios justos y atención humana.
                </p>
                <Divider tone="gold" className="my-4" />
                <div className="grid sm:grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-ohm-gold)] mb-2">Origen</p>
                    <p className="text-[color:var(--color-ohm-ink-soft)]">Ciudad de México</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-ohm-gold)] mb-2">Divisiones</p>
                    <p className="text-[color:var(--color-ohm-ink-soft)]">Distribución · Farmacia · Skincare</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-ohm-gold)] mb-2">Atención</p>
                    <p className="text-[color:var(--color-ohm-ink-soft)]">WhatsApp Business · Presencial</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer tone="grupo" />
    </>
  );
}
