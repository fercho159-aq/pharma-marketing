import Image from "next/image";
import { HeaderNav } from "@/components/sections/HeaderNav";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Input, TextArea } from "@/components/ui/Input";
import { Divider } from "@/components/ui/Divider";
import { distribucionCategories } from "@/lib/data/products";
import { Truck, ShieldCheck, HandCoins, HeartHandshake, MapPin, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const benefits = [
  { icon: Truck, title: "Cobertura nacional", text: "Red logística con cadena de frío desde CDMX a toda la república." },
  { icon: ShieldCheck, title: "Trazabilidad", text: "Lote, caducidad y registro sanitario verificables en cada entrega." },
  { icon: HandCoins, title: "Precio preferencial", text: "Escala comercial por volumen con condiciones para farmacia independiente." },
  { icon: HeartHandshake, title: "Asesor dedicado", text: "Un ejecutivo comercial único para abasto, pedidos y resolución." },
];

export default function DistribucionPage() {
  return (
    <>
      <HeaderNav variant="distribucion" />

      <main>
        {/* HERO */}
        <section className="px-6 md:px-10 pt-24 pb-20 md:pt-32 md:pb-28 border-b border-[color:var(--color-ohm-line)]">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-[3fr_2fr] gap-16 items-center">
            <div className="flex flex-col gap-8">
              <p className="text-[11px] uppercase tracking-[0.28em] font-medium text-[color:var(--color-ohm-wine)]">
                OHM Pharma Distribución · B2B
              </p>
              <h1 className="text-[length:var(--text-display)] leading-[0.98] text-[color:var(--color-ohm-ink)]">
                El aliado de tu <span className="italic text-[color:var(--color-ohm-wine)]">farmacia</span>, hospital o clínica.
              </h1>
              <p className="text-[1.1rem] leading-[1.6] text-[color:var(--color-ohm-ink-soft)] max-w-[48ch]">
                Distribución mayorista de medicamento de patente, genérico y rebotica. Abasto estable, condiciones preferenciales y atención comercial personalizada.
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <Button href="#contacto" variant="wine" size="lg">Solicitar contacto</Button>
                <Button href="https://wa.me/5215555555555" variant="gold-ghost" size="lg">
                  <MessageCircle size={16} strokeWidth={1.5} className="mr-2" />
                  WhatsApp directo
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/5] bg-[color:var(--color-ohm-paper)] border border-[color:var(--color-ohm-line)] rounded-sm p-10 flex items-center justify-center">
              <Image
                src="/branding/ohm-pharma/ohm-pharma-distribucion.png"
                alt="OHM Pharma Distribución"
                width={400}
                height={200}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </section>

        {/* PROPUESTA DE VALOR */}
        <section className="px-6 md:px-10 py-[var(--spacing-section)]">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Propuesta de valor"
              title={<>Abasto confiable. <span className="italic">Condiciones a la medida.</span></>}
              subtitle="Operamos con estándar farmacéutico para que el anaquel de tu punto de venta nunca tenga hueco."
              align="left"
              className="mb-16"
            />
            <Reveal as="ul" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {benefits.map(({ icon: Icon, title, text }) => (
                <li key={title} data-reveal-item className="flex flex-col gap-3 border-t border-[color:var(--color-ohm-gold-soft)] pt-6">
                  <Icon size={24} strokeWidth={1.5} className="text-[color:var(--color-ohm-gold)]" />
                  <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-[color:var(--color-ohm-wine)]">{title}</p>
                  <p className="text-sm text-[color:var(--color-ohm-ink-soft)] leading-relaxed">{text}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        {/* CATEGORÍAS */}
        <section className="px-6 md:px-10 py-[var(--spacing-section)] bg-[color:var(--color-ohm-paper)] border-y border-[color:var(--color-ohm-line)]">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Líneas que distribuimos"
              title="Tres categorías, un mismo estándar."
              align="center"
              className="mb-16 mx-auto"
            />
            <Reveal className="grid md:grid-cols-3 gap-6">
              {distribucionCategories.map((c, i) => (
                <article
                  key={c.slug}
                  data-reveal-item
                  className="bg-[color:var(--color-ohm-cream)] border border-[color:var(--color-ohm-line)] rounded-sm p-10 flex flex-col gap-5 hover:border-[color:var(--color-ohm-wine-soft)] transition-colors"
                >
                  <span className="text-[10px] tracking-[0.3em] text-[color:var(--color-ohm-gold)]">
                    0{i + 1}
                  </span>
                  <h3 className="text-[1.5rem] leading-tight text-[color:var(--color-ohm-ink)]">{c.title}</h3>
                  <p className="text-sm text-[color:var(--color-ohm-ink-soft)] leading-relaxed flex-1">{c.description}</p>
                  <Divider tone="gold" />
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        {/* CONTACTO COMERCIAL */}
        <section id="contacto" className="px-6 md:px-10 py-[var(--spacing-section)]">
          <div className="mx-auto max-w-5xl grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
            <div className="flex flex-col gap-6">
              <p className="text-[11px] uppercase tracking-[0.28em] font-medium text-[color:var(--color-ohm-wine)]">
                Contacto comercial
              </p>
              <h2 className="text-[length:var(--text-h2)] leading-[1.1] text-[color:var(--color-ohm-ink)]">
                Abrimos cuenta con tu farmacia en menos de 48 horas.
              </h2>
              <p className="text-[color:var(--color-ohm-ink-soft)] leading-relaxed">
                Déjanos tus datos y un asesor comercial te contacta para entender tu volumen, surtido y condiciones que necesitas.
              </p>
              <Divider tone="gold" className="my-2" />
              <address className="not-italic flex flex-col gap-4 text-sm text-[color:var(--color-ohm-ink-soft)]">
                <p className="flex items-start gap-3">
                  <MapPin size={16} strokeWidth={1.5} className="mt-0.5 text-[color:var(--color-ohm-gold)]" />
                  Av. Tláhuac 2772, Santa Ana Poniente, Tláhuac, CDMX.
                </p>
                <p className="flex items-start gap-3">
                  <MessageCircle size={16} strokeWidth={1.5} className="mt-0.5 text-[color:var(--color-ohm-gold)]" />
                  WhatsApp Business — número por confirmar.
                </p>
              </address>
            </div>

            <form className="flex flex-col gap-6 border border-[color:var(--color-ohm-line)] bg-[color:var(--color-ohm-paper)] rounded-sm p-8 md:p-10">
              <div className="grid sm:grid-cols-2 gap-5">
                <Input name="nombre" label="Nombre" required />
                <Input name="empresa" label="Farmacia / Empresa" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Input name="email" type="email" label="Email" required />
                <Input name="telefono" type="tel" label="Teléfono" autoComplete="tel" required />
              </div>
              <TextArea
                name="mensaje"
                label="Mensaje"
                helperText="Cuéntanos volumen aproximado, línea que te interesa, ubicación de tus puntos."
                required
              />
              <Button type="submit" variant="wine" size="lg" className="mt-2 self-start">
                Enviar solicitud
              </Button>
              <p className="text-xs text-[color:var(--color-ohm-ink-soft)]">
                {/* TODO: aviso de privacidad real */}
                Al enviar aceptas nuestro aviso de privacidad. Tus datos se usan solo para esta gestión comercial.
              </p>
            </form>
          </div>
        </section>
      </main>

      <Footer tone="grupo" />
    </>
  );
}
