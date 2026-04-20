import { HeaderNav } from "@/components/sections/HeaderNav";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Divider } from "@/components/ui/Divider";
import { Input, TextArea } from "@/components/ui/Input";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Logo } from "@/components/ui/Logo";

const swatches = [
  { name: "ohm-wine", hex: "#830220" },
  { name: "ohm-wine-dark", hex: "#5C0116" },
  { name: "ohm-wine-soft", hex: "#A84356" },
  { name: "ohm-gold", hex: "#9F7B0B" },
  { name: "ohm-gold-soft", hex: "#C9A14A" },
  { name: "ohm-gold-pale", hex: "#E8D9A8" },
  { name: "ohm-green", hex: "#008200" },
  { name: "ohm-ink", hex: "#1C130E" },
  { name: "ohm-ink-soft", hex: "#4A3A30" },
  { name: "ohm-cream", hex: "#FAF7F2" },
  { name: "ohm-paper", hex: "#FDFBF7" },
  { name: "ohm-line", hex: "#E8E1D5" },
  { name: "gin-sage", hex: "#7A8B6F" },
  { name: "gin-sage-dark", hex: "#4F5D46" },
  { name: "gin-sage-soft", hex: "#A9B69E" },
  { name: "gin-sage-pale", hex: "#E8EDE2" },
  { name: "ilm-nude", hex: "#D4A5A0" },
  { name: "ilm-nude-dark", hex: "#8E5A54" },
  { name: "ilm-nude-soft", hex: "#E8C8C3" },
  { name: "ilm-nude-pale", hex: "#F5E5E1" },
];

const typeScale = [
  { label: "Display", cls: "text-[length:var(--text-display)]", example: "Tres mundos." },
  { label: "H1", cls: "text-[length:var(--text-h1)]", example: "Un compromiso." },
  { label: "H2", cls: "text-[length:var(--text-h2)]", example: "Abasto confiable." },
  { label: "H3", cls: "text-[length:var(--text-h3)]", example: "Categorías distribuidas." },
  { label: "Body", cls: "text-base", example: "Del mayoreo farmacéutico al skincare premium." },
  { label: "Small", cls: "text-sm", example: "Etiqueta secundaria editorial." },
];

export default function StyleguidePage() {
  return (
    <>
      <HeaderNav variant="grupo" />

      <main className="px-6 md:px-10 py-16">
        <div className="mx-auto max-w-6xl flex flex-col gap-24">
          <header className="flex flex-col gap-4 border-b border-[color:var(--color-ohm-line)] pb-10">
            <p className="text-[11px] uppercase tracking-[0.28em] font-medium text-[color:var(--color-ohm-wine)]">
              Sistema de diseño · interno
            </p>
            <h1 className="text-[length:var(--text-h1)] leading-[1.05] text-[color:var(--color-ohm-ink)]">
              Styleguide Grupo OHM
            </h1>
            <p className="text-[color:var(--color-ohm-ink-soft)] max-w-[60ch]">
              Referencia visual de tokens, tipografía y componentes utilizados en las tres divisiones.
            </p>
          </header>

          {/* COLOR */}
          <section className="flex flex-col gap-8">
            <SectionHeader eyebrow="Color" title="Paleta editorial" tone="wine" />
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
              {swatches.map((s) => (
                <div key={s.name} className="flex flex-col gap-2 border border-[color:var(--color-ohm-line)] rounded-sm overflow-hidden">
                  <div className="h-24 w-full" style={{ background: s.hex }} />
                  <div className="px-3 py-2 text-xs">
                    <p className="font-medium text-[color:var(--color-ohm-ink)]">{s.name}</p>
                    <p className="text-[color:var(--color-ohm-ink-soft)] font-mono">{s.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TIPOGRAFÍA */}
          <section className="flex flex-col gap-8">
            <SectionHeader
              eyebrow="Tipografía"
              title={<>DM Serif Display + <span className="italic">Inter</span></>}
              tone="wine"
            />
            <div className="flex flex-col gap-8 border-t border-[color:var(--color-ohm-line)] pt-8">
              {typeScale.map((t) => (
                <div key={t.label} className="grid md:grid-cols-[120px_1fr] gap-6 items-baseline">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-ohm-gold)]">{t.label}</p>
                  <p className={`${t.cls} ${t.label === "Body" || t.label === "Small" ? "text-[color:var(--color-ohm-ink)]" : "text-[color:var(--color-ohm-ink)] leading-[1.1]"}`}>
                    {t.example}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* LOGOS */}
          <section className="flex flex-col gap-8">
            <SectionHeader eyebrow="Marcas" title="Logotipos por división" tone="wine" />
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[color:var(--color-ohm-paper)] border border-[color:var(--color-ohm-line)] rounded-sm p-8 flex items-center justify-center h-48">
                <Logo division="grupo-ohm" className="text-2xl" />
              </div>
              <div className="bg-[color:var(--color-gin-sage-pale)] border border-[color:var(--color-gin-sage-soft)] rounded-sm p-8 flex items-center justify-center h-48">
                <Logo division="gin" variant="horizontal" width={200} height={80} />
              </div>
              <div className="bg-[color:var(--color-ilm-nude-pale)] border border-[color:var(--color-ilm-nude-soft)] rounded-sm p-8 flex items-center justify-center h-48">
                <Logo division="i-love-myself" className="text-2xl" />
              </div>
            </div>
          </section>

          {/* BOTONES */}
          <section className="flex flex-col gap-8">
            <SectionHeader eyebrow="Componentes" title="Botones" tone="wine" />
            <div className="flex flex-wrap gap-4">
              <Button variant="wine">Wine primary</Button>
              <Button variant="gold-ghost">Gold ghost</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="sage">Sage</Button>
              <Button variant="nude">Nude</Button>
              <Button variant="link">Link editorial →</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="wine" size="sm">Small</Button>
              <Button variant="wine" size="md">Medium</Button>
              <Button variant="wine" size="lg">Large</Button>
            </div>
          </section>

          {/* BADGES */}
          <section className="flex flex-col gap-8">
            <SectionHeader eyebrow="Componentes" title="Badges" tone="wine" />
            <div className="flex flex-wrap gap-3">
              <Badge variant="wine">Nuevo</Badge>
              <Badge variant="gold">Premium</Badge>
              <Badge variant="sage">Stock</Badge>
              <Badge variant="nude">Botánico</Badge>
              <Badge variant="neutral">Genérico</Badge>
            </div>
          </section>

          {/* DIVIDERS */}
          <section className="flex flex-col gap-8">
            <SectionHeader eyebrow="Componentes" title="Dividers" tone="wine" />
            <div className="flex flex-col gap-8">
              <Divider />
              <Divider tone="gold" />
              <Divider ornament tone="gold" />
            </div>
          </section>

          {/* FORMULARIOS */}
          <section className="flex flex-col gap-8">
            <SectionHeader eyebrow="Componentes" title="Inputs & textarea" tone="wine" />
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              <Input name="demo-nombre" label="Nombre" placeholder="Sheccid Medina" />
              <Input name="demo-email" type="email" label="Email" placeholder="tu@email.com" required />
              <div className="md:col-span-2">
                <TextArea
                  name="demo-mensaje"
                  label="Mensaje"
                  helperText="Helper text editorial para orientar al usuario."
                  placeholder="Escribe aquí"
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer tone="grupo" />
    </>
  );
}
