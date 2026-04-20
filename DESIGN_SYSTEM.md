# Grupo OHM — Design System

Single source of truth for visual system. Keep this doc in sync with `app/globals.css`.

---

## 1. Identidad

**Cliente:** Grupo OHM · Holding farmacéutico mexicano (CDMX)
**Divisiones:** OHM Pharma Distribución (B2B) · Farmayoreo Gin (B2C) · I Love Myself (B2C premium)
**Tono:** Boutique farmacéutica europea. Aesop / Caudalie / L'Officine Universelle Buly como norte. No hospital corporativo, no dashboard SaaS.

---

## 2. Paleta

### Primarios OHM (no negociable — extraídos del logo real)

| Token | Hex | Uso |
|---|---|---|
| `--color-ohm-wine` | `#830220` | Identidad dominante. CTAs primarios, titulares de acento, logo |
| `--color-ohm-wine-dark` | `#5C0116` | Hover de wine, texto sobre crema cuando wine pleno satura |
| `--color-ohm-wine-soft` | `#A84356` | Acentos sutiles, bordes, detalles decorativos |

### Dorados

| Token | Hex | Uso |
|---|---|---|
| `--color-ohm-gold` | `#9F7B0B` | Acento premium. La "O" del logo. Detalles serif ornamentales |
| `--color-ohm-gold-soft` | `#C9A14A` | Hovers dorados, ribbons, separadores acentuados |
| `--color-ohm-gold-pale` | `#E8D9A8` | Fondos decorativos muy tenues, placeholders |

### Terciario

| Token | Hex | Uso |
|---|---|---|
| `--color-ohm-green` | `#008200` | Hoja del loto. Uso PUNTUAL — solo detalle, nunca superficie |

### Neutros cálidos (prohibido `#FFFFFF` puro)

| Token | Hex | Uso |
|---|---|---|
| `--color-ohm-ink` | `#1C130E` | Texto principal |
| `--color-ohm-ink-soft` | `#4A3A30` | Texto secundario, lead paragraphs |
| `--color-ohm-cream` | `#FAF7F2` | Fondo principal del sitio |
| `--color-ohm-paper` | `#FDFBF7` | Fondo de cards sobre crema |
| `--color-ohm-line` | `#E8E1D5` | Divisores, bordes sutiles |

### Paletas por división (iterar en Fase 2a)

| División | Background | Primario | Secundario |
|---|---|---|---|
| OHM Pharma Distribución | `ohm-cream` | `ohm-wine` | `ohm-gold` |
| Farmayoreo Gin | `ohm-cream` | `gin-sage` `#7A8B6F` *(propuesta)* | `ohm-gold-soft` |
| I Love Myself | `ohm-paper` | `ilm-nude` `#D4A5A0` *(propuesta)* | `ohm-gold` |

Hilo conductor entre las 3 marcas: el dorado. Nunca romper.

---

## 3. Tipografía

**Display:** DM Serif Display — 400 regular + italic
**Body:** Inter — 300, 400, 500, 600, 700

Contraste deliberado serif display + sans body = "editorial farmacéutico". Carga vía `next/font/google` (self-hosted, `display: swap`).

### Escala fluid

| Token | Valor | Uso |
|---|---|---|
| `--text-display` | `clamp(3rem, 7vw, 5.5rem)` | Hero institucional |
| `--text-h1` | `clamp(2.25rem, 4vw, 3.5rem)` | H1 de página |
| `--text-h2` | `clamp(1.75rem, 3vw, 2.5rem)` | Section headers |
| `--text-h3` | `1.5rem` | Subsections, card titles |
| `--text-body` | `1rem` | Párrafos default |
| `--text-small` | `0.875rem` | Meta info, captions inline |
| `--text-caption` | `0.75rem` | Eyebrows, labels, footer meta |

### Reglas de uso

- Letter-spacing negativo en display: `-0.02em`
- Letter-spacing positivo en eyebrow / uppercase: `+0.18em`
- Body line-height: `1.6` (lead) / `1.5` (default)
- Máximo 42ch en párrafos lead (max 65ch en body corrido)
- Jamás texto blanco puro sobre fondo fotográfico sin overlay

### Clase utility `.eyebrow`

```html
<p class="eyebrow">DISTRIBUIDORA DE MEDICAMENTO</p>
```

Uppercase + tracking 0.18em + wine. Usar encima de H1 de hero.

### Clase utility `.lead`

Párrafo de introducción: 1.125rem, line-height 1.6, max 42ch, color ink-soft.

---

## 4. Espaciado

Tailwind defaults (4px base) salvo override:

| Token | Valor | Uso |
|---|---|---|
| `--spacing-section` | `clamp(4rem, 10vw, 8rem)` | Padding vertical entre secciones mayores |

Ritmo vertical dentro de sección: `16 / 24 / 32 / 48 / 64` (Tailwind `gap-4/6/8/12/16`).

---

## 5. Radios (boutique, casi rectos)

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | `2px` | Inputs, badges pequeños |
| `--radius-md` | `4px` | Buttons, cards |
| `--radius-lg` | `6px` | Cards grandes, imágenes hero |

**No usar `rounded-2xl` o superior** — se siente SaaS/dashboard, no boutique.

---

## 6. Motion

Solo dos herramientas:

- **GSAP 3 + ScrollTrigger** — reveals, hero fades, scroll choreography
- **Framer Motion** — solo para interacciones de UI puntuales (modales, drawers)

Reglas duras:

- Duración micro-interacciones: **150–300ms**
- Reveals de hero: **400–600ms** con `power2.out`
- Stagger: **80ms** entre hijos
- Respetar `prefers-reduced-motion` — hay override global en `globals.css`
- Nada de scroll-jacking. Nada de parallax pesado.

---

## 7. Iconografía

- **Librería:** Lucide React, stroke 1.5, tamaño 20–24px default
- **Nunca emojis** como iconos (🏥 💊 🌸 prohibidos en UI). Solo como microcopy si el tono lo pide
- Stroke consistente. Mezclar filled + outline en el mismo nivel jerárquico = no

---

## 8. Do's

- Aire. Padding vertical generoso. Una idea por hero.
- Jerarquía silenciosa: 1 título + 1 párrafo + 1 CTA por sección.
- Serif display + sans body como firma editorial.
- Bordes de 1px en `ohm-wine-soft` o `ohm-gold-soft` sobre crema.
- Fotografía editorial flat-lay o macro con luz natural (fotos de producto reales en `/public/products/`).
- Animación contenida: fade + 24px slide con stagger 80ms.

## 9. Don'ts

- Emojis como iconos.
- Gradientes saturados, colores neón, sombras pesadas.
- Countdowns, banners apilados, badges flotantes de descuento.
- `rounded-2xl` en todo.
- Stock photos Unsplash de farmacias con manos blancas y pastillas blancas.
- Más de 2 CTAs visibles al mismo tiempo.
- `#FFFFFF` puro.
- Texto blanco sobre foto sin overlay.
- Testimonios inventados o métricas falsas.

---

## 10. Assets de marca

Ubicación: `public/branding/`

```
public/branding/
├── ohm-pharma/
│   ├── logo-original.jpeg           ← logo master (fuente: Sheccid)
│   ├── distribucion-original.jpeg   ← variante división (v1 legacy)
│   └── ohm-cosmetics.pdf            ← PDF vectorial original
├── gin/
│   └── logo-original.jpeg           ← v1 legacy (a rediseñar en Fase 2a)
└── i-love-myself/
    └── logo-original.pdf            ← v1 legacy
```

**Estado:** solo existen rasters (JPEG) + PDFs originales. El Art Director (Fase 2a) debe:

1. Vectorizar OHM Pharma (SVG pixel-perfect sobre el PDF/JPEG)
2. Rediseñar Farmayoreo Gin — mantener personaje "Gin", suavizar paleta hacia sage + gold + cream
3. Vectorizar I Love Myself (o proponer rediseño si el existente es débil)

### Fotos de producto

12 fotos reales en `public/products/product-{1..12}.jpeg`. Aptas para hero grids y secciones de producto. Source: WhatsApp de cliente, 20-abr-2026.

---

## 11. Decisiones tomadas

| Fecha | Decisión | Por qué |
|---|---|---|
| 2026-04-20 | Display: DM Serif Display | Más peso editorial moderno vs Cormorant. Legible en desktop y mobile sin sentirse frágil |
| 2026-04-20 | Body: Inter | Estándar legible, pairing probado con serifs editoriales, carga rápida |
| 2026-04-20 | Fresh Next.js 15 en lugar de seguir HTML v1 | v1 fue rechazada por la clienta. Arquitectura nueva, preservada como branch `v1-rejected` |
| 2026-04-20 | `gin-sage #7A8B6F` + `ilm-nude #D4A5A0` como placeholders | El Director de arte debe iterar 2-3 variantes antes de fijar |

---

## 12. Decisiones pendientes

- [ ] **Director de arte (Fase 2a):** fijar color exacto de sage para Gin y nude para I Love Myself (iterar 2-3 variantes por división)
- [ ] **Cliente (Sheccid):** número WhatsApp Business exacto
- [ ] **Cliente (Sheccid):** redes sociales oficiales (Instagram, Facebook, TikTok)
- [ ] **Cliente (Sheccid):** aprobar rediseño del logo Gin tras Fase 2a
- [ ] **Cliente (Sheccid):** entregar SVG vectorial oficial de OHM Pharma (actualmente solo JPEG + PDF)
- [ ] **Components & Pages (Fase 3):** decisión final sobre hero visual del landing — composición asimétrica de 3 logos vs foto editorial

---

## 13. Anti-referencia

`pharma-marketing-seven.vercel.app` = propuesta v1 rechazada por Sheccid. Todo lo que hizo, reemplazar conscientemente. Feedback literal de la clienta:

> *"No entiendo nada. No veo mi logo ni los colores de mi marca por ningún lado. […] Me gustaría que fuera más clara y sencilla de utilizar; siento que está muy revuelta la información desde el inicio. Que predominen los colores de los logos. Me gustaría que se vea una página elegante de industria farmacéutica."*

Preguntarse en cada decisión: *¿esto siente el brand de Sheccid o siente Material Design?*
