# REVIEW — Grupo OHM v2 (Fase 5 QA)

Fecha: 2026-04-20 · Next.js 16.2.4 · Tailwind v4 · GSAP 3.15.

## Rutas entregadas

| Ruta | HTTP | Tipo | Notas |
|---|---|---|---|
| `/` | 200 | Static | Landing Grupo OHM: hero + 3 DivisionCards + Nosotros |
| `/distribucion` | 200 | Static | B2B OHM Pharma: hero + valor + 3 categorías + formulario |
| `/farmacia` | 200 | Static | B2C Gin: hero + categorías + 4 productos + sucursal |
| `/skincare` | 200 | Static | B2C I Love Myself: hero + 3 productos + ritual + filosofía + quote |
| `/styleguide` | 200 | Static | Interno: paleta, type scale, logos, componentes |

`next build` → 8/8 páginas estáticas, TypeScript sin errores, 0 warnings relevantes.

## Checklist QA

### Accesibilidad (WCAG AA)

Contraste auditado por pares (fg/bg) vía luminancia relativa:

- `ink` sobre `cream` · 17.10 ✅
- `ink-soft` sobre `cream` · 10.13 ✅
- `wine` sobre `cream` · 9.85 ✅
- `wine-dark` sobre `cream` · 13.36 ✅
- `cream` sobre `wine` · 9.85 ✅ (CTA primario)
- `sage-dark` sobre `sage-pale` · 5.31 ✅ (tras darken 5F6E57 → 4F5D46)
- `cream` sobre `sage-dark` · 6.58 ✅ (botón sage)
- `nude-dark` sobre `nude-pale` · 4.69 ✅ (tras darken B88A85 → 8E5A54)
- `cream` sobre `nude-dark` · 5.25 ✅ (botón nude hover)
- `gold` sobre `cream` · 3.70 · AA-large only → usado sólo para números grandes (01, 02, 03), ornamento ✦ e iconografía decorativa. No aplica a texto de cuerpo.

Otros ítems:
- `lang="es"` declarado en `<html>`.
- `viewport` meta con `width=device-width` y zoom habilitado (no se usa `user-scalable=no`).
- `focus-visible` global con outline gold 2px offset 2px (globals.css).
- Form labels con `htmlFor`/`id`; Input + TextArea exportan `aria-invalid` + `aria-describedby` cuando hay error.
- Botones icónicos (WhatsApp) con texto visible; iconos Instagram/Facebook del footer tienen `aria-label` y los SVG llevan `aria-hidden`.
- Heading hierarchy: `h1` único por página, `h2` en secciones, no hay saltos.

### Motion / prefers-reduced-motion

- Componentes: `<Reveal>` (scroll-triggered stagger, 0.9s power3.out) y `<HeroEnter>` (1.1s stagger 0.12 delay 0.15).
- FOUC prevention vía atributo `data-reveal="pending"` + regla CSS en `globals.css` que colapsa a `opacity:1` bajo `prefers-reduced-motion: reduce`.
- Global override en `@layer base` para reducir duración a 0.01ms de cualquier `animation`/`transition` cuando el usuario pide motion reducido.
- `gsap.context` + cleanup en `useEffect` return (revert + cancelled flag) para evitar leaks en HMR.

### Responsive

- Mobile-first: breakpoints sm/md/lg con grids que colapsan a 1 columna < 768px.
- Hero landing oculta composición de logos (lg:block) en mobile para priorizar H1 + CTA.
- Typography fluida via `clamp()` (display, h1, h2) — sin overflow horizontal.
- HeaderNav: nav inline oculto `hidden md:flex`, CTA WhatsApp `hidden sm:inline-flex` — logo siempre visible.
- Container estándar `max-w-7xl`, padding lateral `px-6 md:px-10` consistente entre páginas.

### Marca / Identidad

- Paleta OHM wine + gold presente en TODAS las páginas (requisito del brief Sheccid).
- Logos por división:
  - `OHM Pharma` → JPEG real en hero distribución + landing.
  - `Gin` → 3 SVG rediseñados (silueta femenina en círculo sage + wordmark).
  - `I Love Myself` → logotipo tipográfico inline (DM Serif Display + cursiva nude-dark).
  - `Grupo OHM` → lockup "Grupo OHM" con O dorada.
- Anti-patrones evitados: `#FFFFFF` puro, `rounded-2xl`, `shadow-xl`, emojis como iconos, gradientes decorativos, Unsplash.
- Iconos: Lucide stroke 1.5, 16–24px. Instagram + Facebook inlineados por omisión en Lucide 1.8.

## Deuda técnica (para Sheccid)

- `WA_NUMBER = "5215555555555"` → placeholder en HeaderNav + Footer + formularios.
- Aviso de privacidad real pendiente (`app/aviso-privacidad/page.tsx` no existe).
- Rutas `/nosotros` y `/contacto` enlazadas en Footer pero sin página creada (404).
- Formulario distribución sin handler (POST a nowhere). Requiere endpoint o integración tipo Formspree/Resend.
- Logos Gin SVG son rediseño propio; validar con Sheccid antes de impresión.

## Pendientes opcionales

- OG image + `metadata.openGraph`.
- Sitemap (`app/sitemap.ts`).
- Favicon por división (actualmente single `icon.svg` genérico).
- Página 404 editorial.

## Comandos útiles

```bash
npm run dev     # dev server localhost:3000
npm run build   # producción static export
npm run lint    # eslint
npx tsc --noEmit
```

## Signoff

v2 lista para checkpoint humano con Sheccid. Paleta OHM dominante, logos por división presentes, contraste AA, motion respetuoso de reduced-motion, build estático sin errores.
