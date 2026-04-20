# SHARED_CONTEXT.md

**Este documento es leído por TODOS los agentes como primer paso.** Contiene el estado del proyecto, los acuerdos firmes, y las reglas que ningún agente puede violar sin consultar al humano.

---

## Proyecto

- **Cliente:** Grupo OHM (holding farmacéutico, CDMX)
- **Contacto primario:** Sheccid Medina
- **Agencia:** MAW Soluciones (Alma Fernández, Alex Aldazoro, Luis Mario)
- **Dev lead:** Fernando (freelance)
- **Dominio objetivo:** `grupoohm.com` (o `ohmpharma.com.mx` / `ohmpharma.mx` como alternativos — disponibles los tres)
- **Dirección física (compartida entre las 3 divisiones):** Av. Tláhuac 2772, Santa Ana Poniente, Tláhuac, CDMX
- **Contacto:** WhatsApp Business (número exacto por confirmar con cliente)
- **Redes sociales:** por confirmar

## Arquitectura (CONFIRMADA)

Un solo dominio, hub con tres mundos bajo rutas:

- `/` — landing institucional Grupo OHM
- `/distribucion` — OHM Pharma Distribución (B2B, informativo, sin carrito)
- `/farmacia` — Farmayoreo Gin (B2C, e-commerce)
- `/skincare` — I Love Myself (B2C premium, e-commerce)
- `/styleguide` — referencia interna del sistema visual (no linkeada públicamente)

## Fuente de verdad visual

El documento autoritativo del sistema visual es **`DESIGN_BRIEF.md`** en este mismo directorio. Si hay conflicto entre este archivo y el brief, gana el brief. Si hay conflicto entre un agente y el brief, el agente pierde.

## Paleta maestra (NO negociable)

Extraída directamente de los píxeles del logo real de OHM Pharma:

```css
@theme {
  /* Primarios OHM */
  --color-ohm-wine:       #830220;
  --color-ohm-wine-dark:  #5C0116;
  --color-ohm-wine-soft:  #A84356;

  /* Secundario (acento premium) */
  --color-ohm-gold:       #9F7B0B;
  --color-ohm-gold-soft:  #C9A14A;
  --color-ohm-gold-pale:  #E8D9A8;

  /* Terciario (uso puntual) */
  --color-ohm-green:      #008200;

  /* Neutros cálidos — NUNCA usar blanco puro #FFFFFF */
  --color-ohm-ink:        #1C130E;
  --color-ohm-ink-soft:   #4A3A30;
  --color-ohm-cream:      #FAF7F2;
  --color-ohm-paper:      #FDFBF7;
  --color-ohm-line:       #E8E1D5;
}
```

## Paletas por división (propuestas, iterar con Director de arte)

| División | Background | Acento primario | Acento secundario |
|---|---|---|---|
| OHM Pharma Distribución | `ohm-cream` | `ohm-wine` | `ohm-gold` |
| Farmayoreo Gin | `ohm-cream` | Sage `#7A8B6F` *(iterar)* | `ohm-gold-soft` |
| I Love Myself | `ohm-paper` | Nude rosado `#D4A5A0` *(iterar)* | `ohm-gold` |

**Hilo conductor entre las 3:** el dorado. Nunca rompas ese hilo.

## Stack técnico (acordado)

- Next.js 15 (App Router, RSC por default)
- Tailwind v4 (tokens vía `@theme` en `app/globals.css`)
- shadcn/ui como base, fuertemente re-estilizada
- GSAP 3.x + ScrollTrigger para motion
- Framer Motion solo para interacciones UI muy puntuales
- Lucide React para iconografía (stroke 1.5, 20-24px)
- `next/font/google` para fuentes self-hosted
- Vercel

## Tipografía (por confirmar en Fase 1)

- **Display/headlines:** Cormorant Garamond *(opción A)* o DM Serif Display *(opción B)*
- **Body/UI:** Inter *(opción A)* o Geist *(opción B)*
- El Arquitecto debe preguntar al humano antes de fijar la combinación.

## Estado del pipeline

Cada agente, al terminar, debe **actualizar la sección `## Estado actual`** más abajo con bullets de lo entregado. El siguiente agente lee ese estado antes de arrancar.

## Estado actual

- [x] **Fase 1 — Arquitecto** (2026-04-20)
  - `app/globals.css` con `@theme` completo (paleta OHM + escala fluid + radios editoriales)
  - `lib/fonts.ts` con `DM_Serif_Display` (display) + `Inter` (body), ambos `display: swap`
  - `app/layout.tsx` con fonts loaded y `<body>` heredando bg cream
  - `app/page.tsx` placeholder con logo OHM Pharma + swatches de paleta
  - `lib/utils.ts` con helper `cn()`
  - `public/branding/ohm-pharma/` — logo JPEG + PDF + distribución legacy
  - `public/branding/gin/logo-original.jpeg` (v1 legacy, a rediseñar)
  - `public/branding/i-love-myself/logo-original.pdf` (v1 legacy)
  - `public/products/product-{1..12}.jpeg` (12 fotos reales cliente)
  - `DESIGN_SYSTEM.md` en raíz del proyecto
- [ ] Fase 2a — Director de arte
- [ ] Fase 2b — Components & Pages (styleguide)
- [ ] Fase 3 — Components & Pages (las 4 vistas)
- [ ] Fase 4 — Motion
- [ ] Fase 5 — QA

## Checkpoints humanos

Ningún agente avanza de fase sin ok explícito del humano. Los puntos de detención obligatorios son:

1. Tras Fase 1 (tokens + tipografía)
2. Tras Fase 2a (logo Gin rediseñado — se manda a Sheccid para aprobación)
3. Tras Fase 3 (styleguide + 4 mockups)

## Reglas globales (aplican a todo agente)

1. **No inventes contenido real.** Nombres, testimonios, métricas, certificaciones — todo lo que no venga confirmado por la clienta se deja como `{/* TODO: contenido de Sheccid */}` con un placeholder elegante.
2. **No uses Unsplash de farmacias genéricas.** Si necesitas placeholder visual, usa bloques de color `ohm-gold-pale` con el logo de la división centrado.
3. **No uses emojis como iconografía.** Nunca. Ni 💊 ni 🏥 ni 🌸. Iconos son Lucide o SVG custom.
4. **No uses `#FFFFFF` puro** como background. Siempre `ohm-cream` o `ohm-paper`.
5. **No salgas del stack acordado** sin justificarlo al humano primero.
6. **Respeta `prefers-reduced-motion`** en toda animación.
7. **Accesibilidad base siempre:** contraste AA mínimo, `aria-label` en botones-con-ícono, focus visible, navegación por teclado.

## Archivos que esperamos ver al final

```
app/
├── globals.css              ← tokens (Arquitecto)
├── layout.tsx               ← fonts loaded (Arquitecto)
├── page.tsx                 ← landing root (Components & Pages)
├── distribucion/page.tsx    ← (Components & Pages)
├── farmacia/page.tsx        ← (Components & Pages)
├── skincare/page.tsx        ← (Components & Pages)
└── styleguide/page.tsx      ← (Components & Pages)

components/
├── ui/                      ← shadcn re-estilizado (Components & Pages)
├── sections/                ← hero, grid, footer, etc. (Components & Pages)
└── motion/                  ← wrappers GSAP (Motion)

lib/
├── fonts.ts                 ← (Arquitecto)
└── motion/                  ← helpers de animación (Motion)

public/
└── branding/
    ├── ohm-pharma/          ← logo + variantes (Arquitecto copia de /mnt/user-data/uploads)
    ├── gin/                 ← 3 variantes rediseñadas (Art Director)
    └── i-love-myself/       ← logo + variantes (Arquitecto si disponible)

DESIGN_SYSTEM.md             ← (Arquitecto, actualizado por todos)
REVIEW.md                    ← (QA)
```
