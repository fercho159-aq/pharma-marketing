# Design Brief — Grupo OHM (v2, reboot)

Eres **director de arte y diseñador de sistemas visuales** para un proyecto de rediseño completo del sitio web de **Grupo OHM**, un holding farmacéutico mexicano con tres divisiones. La primera propuesta fue rechazada por el cliente. Tu misión es entregar un sistema de diseño coherente, elegante y fiel a la marca real antes de que escribamos una sola línea de lógica de negocio.

**No escribas código de producción todavía.** Trabajarás en fase de diseño visual: design tokens, tipografía, componentes de presentación, y mockups estáticos (Next.js 15 + Tailwind v4 + GSAP) de las páginas clave. La implementación de e-commerce, auth y base de datos vendrá en una fase posterior.

---

## 1. Contexto del cliente (qué pasó y por qué estás aquí)

La clienta, Sheccid Medina, rechazó la primera propuesta en `pharma-marketing-seven.vercel.app`. Su feedback textual fue:

> *"No entiendo nada. No veo mi logo ni los colores de mi marca por ningún lado. Creo que no me gusta. Me gustaría que fuera más clara y sencilla de utilizar; siento que está muy revuelta la información desde el inicio. Que predominen los colores de los logos. Me gustaría que se vea una página elegante de industria farmacéutica."*

**Traducción accionable:**

1. La identidad real de la marca no aparecía. Se usaron emojis (🏥 💊 🌸) y una paleta genérica de dashboard (morado/teal) en lugar de los logos reales y la paleta burgundy/gold/crema que define OHM Pharma.
2. El home tenía sobrecarga informacional: hero + badges de envío + 3 divisiones + oferta relámpago con countdown + productos destacados + beneficios + testimonios + CTA final, todo en la misma pantalla. Sheccid quiere **aire, jerarquía, silencio**.
3. "Elegante de industria farmacéutica" en este contexto significa **boutique farmacéutica europea** — boticas parisinas, Caudalie, herbolarias de lujo. No significa hospital corporativo ni dashboard SaaS.

Interioriza este feedback. Cada decisión de diseño debe preguntarse: *¿esto siente el brand de Sheccid o siente Material Design?*

---

## 2. Arquitectura del negocio

Grupo OHM opera tres divisiones bajo una sola sombrilla corporativa:

| División | Modelo | Audiencia | Tipo de página |
|---|---|---|---|
| **OHM Pharma Distribución** | B2B, mayoreo | Farmacias, hospitales, clínicas | **Informativa** (catálogo visual, sin carrito) |
| **Farmayoreo Gin** | B2C e-commerce | Consumidor final | **Tienda en línea** (medicamentos, vitaminas) |
| **I Love Myself** | B2C e-commerce premium | Consumidoras de skincare | **Tienda en línea** (serums, cremas, tratamientos) |

**Decisión de arquitectura (confirmada):** Un solo dominio `grupoohm.com` como hub, con tres mundos visualmente diferenciados bajo rutas `/distribucion`, `/farmacia` y `/skincare`. El landing raíz presenta las tres divisiones como portales de entrada.

**Datos duros que necesitas:**
- Dirección física compartida por las tres divisiones: *Av. Tláhuac 2772, Santa Ana Poniente, Tláhuac, CDMX.*
- Contacto principal: WhatsApp Business (número por confirmar).
- Distribución solo muestra información + teléfonos + dirección. No lleva carrito.

---

## 3. Sistema de marca maestro

### 3.1 Paleta principal (extraída directamente del logo de OHM Pharma)

Esta paleta es **no negociable** para OHM Pharma Distribución y es la paleta paraguas de Grupo OHM.

```css
@theme {
  /* Primarios OHM */
  --color-ohm-wine:       #830220;  /* burgundy dominante, identidad visual */
  --color-ohm-wine-dark:  #5C0116;  /* hovers, textos sobre crema */
  --color-ohm-wine-soft:  #A84356;  /* acentos sutiles, bordes */

  /* Secundario */
  --color-ohm-gold:       #9F7B0B;  /* acento premium, la "O" del logo */
  --color-ohm-gold-soft:  #C9A14A;  /* hovers dorados, ribbons */
  --color-ohm-gold-pale:  #E8D9A8;  /* fondos decorativos muy tenues */

  /* Terciario (uso mínimo) */
  --color-ohm-green:      #008200;  /* hoja del loto, usarlo como detalle puntual */

  /* Neutros cálidos (NUNCA usar blanco puro #FFFFFF) */
  --color-ohm-ink:        #1C130E;  /* texto principal, cálido sobre crema */
  --color-ohm-ink-soft:   #4A3A30;  /* texto secundario */
  --color-ohm-cream:      #FAF7F2;  /* fondo principal de todo el sitio */
  --color-ohm-paper:      #FDFBF7;  /* fondo de tarjetas sobre crema */
  --color-ohm-line:       #E8E1D5;  /* líneas, divisores, bordes sutiles */
}
```

### 3.2 Paletas por división (variaciones dentro del mismo sistema)

Las tres marcas comparten **el dorado como hilo conductor**. Cambia el color de acompañamiento para darle personalidad a cada mundo sin romper la familia visual.

**OHM Pharma Distribución** → wine + gold + cream
- Autoridad corporativa, serio, establecido
- Background: `ohm-cream`
- Acento primario: `ohm-wine`
- Acento secundario: `ohm-gold`

**Farmayoreo Gin** → sage + gold + cream (*a rediseñar*)
- Accesible, cercano, de barrio pero cuidado
- Background: `ohm-cream`
- Acento primario: verde salvia suave (`#7A8B6F` propuesto — itera 2-3 variantes)
- Acento secundario: `ohm-gold-soft`
- **Nota crítica:** el logo actual de Farmayoreo Gin no le gusta a la clienta. Ella pidió *"colores más neutros"*. Debes proponer un rediseño. La mascota "Gin" (personaje femenino basado en una persona real) debe permanecer — ella quiere usarla en videos y publicidad. Suaviza la paleta del logo, no lo rehagas entero.

**I Love Myself** → nude rosado + gold + cream
- Premium, femenino, científico-natural (tipo Caudalie)
- Background: `ohm-paper`
- Acento primario: rosa nude (`#D4A5A0` propuesto — itera)
- Acento secundario: `ohm-gold`

---

## 4. Tipografía

### Recomendación
- **Display / Headlines:** `"Cormorant Garamond"` o `"DM Serif Display"` (serif elegante, evoca boutique farmacéutica)
- **Body / UI:** `"Inter"` o `"Geist"` (sans-serif limpio, pero con buen pairing con el serif)
- **Acentos tipo etiqueta:** la misma sans en tracking ampliado y uppercase (ej. "DISTRIBUIDORA DE MEDICAMENTO" como aparece en el logo real)

### Escala (Tailwind v4, fluid)
```css
--text-display: clamp(3rem, 7vw, 5.5rem);
--text-h1:      clamp(2.25rem, 4vw, 3.5rem);
--text-h2:      clamp(1.75rem, 3vw, 2.5rem);
--text-h3:      1.5rem;
--text-body:    1rem;
--text-small:   0.875rem;
--text-caption: 0.75rem;
```

Letter-spacing negativo en display (-0.02em), neutro en body, positivo (+0.1em) en uppercase tipo etiqueta.

---

## 5. Filosofía de diseño

### ✅ Sí
- **Aire.** Padding vertical generoso. Secciones respirando. Hero con una sola idea.
- **Jerarquía silenciosa.** Un título grande, un párrafo, un CTA. No compitas por atención.
- **Fotografía editorial.** Flat lays de producto, close-ups con luz natural, texturas de mármol o lino. Si no hay foto real, reserva un placeholder elegante (no uses Unsplash de farmacias genéricas).
- **Serif en display + sans en body.** El contraste tipográfico es lo que vende "elegante farmacéutico".
- **Bordes de 1px en wine-soft o gold-soft** sobre crema. Sin shadows saturadas.
- **Animación contenida** (GSAP): fades de 400-600ms con `power2.out`, reveals de scroll con `ScrollTrigger` que respeten `prefers-reduced-motion`. Nada de scroll jacking.

### ❌ No
- Emojis como iconos (🏥 💊 🌸). Usa iconografía line en SVG (Lucide o custom) o símbolos tipográficos.
- Gradientes saturados o colores neón.
- Countdowns, banners apilados, badges flotantes de descuento.
- Testimonios inventados con nombres genéricos y estrellas doradas grandes.
- `rounded-2xl` en todo. Usa `rounded-sm` o `rounded-none` con borde sutil — más boutique, menos SaaS.
- Stock photos de Unsplash de "farmacia" con manos blancas y pastillas blancas genéricas.
- Más de 2 CTAs visibles a la vez.
- Texto blanco puro sobre fondos fotográficos sin overlay.

---

## 6. Referencias

### Positivas (estudia, no copies)
- **[mx.caudalie.com](https://mx.caudalie.com)** — referencia de Sheccid. Estudia: jerarquía del hero, tipografía, uso del espacio negativo, consistencia del tono editorial, mosaico de 3 productos emblemáticos, secciones de valores con íconos minimalistas.
- **[farmamigo.com/sitio](https://farmamigo.com/sitio)** y **[farmater.com.mx](https://www.farmater.com.mx)** — referencias de distribuidor. Estudia estructura informativa, no estética (ambas son funcionales pero poco refinadas).
- **Aesop, Le Labo, L'Officine Universelle Buly** — para el tono de boutique farmacéutica europea en I Love Myself.

### Negativa (explícita)
- **`pharma-marketing-seven.vercel.app`** — la propuesta anterior. Antipatrón en vivo. Todo lo que hizo, reemplázalo conscientemente.

---

## 7. Stack técnico

- **Framework:** Next.js 15 (App Router)
- **Estilos:** Tailwind v4 (con `@theme` para los tokens del punto 3)
- **Motion:** GSAP 3.x + ScrollTrigger. Framer Motion solo si se justifica para interacciones de UI puntuales.
- **Componentes base:** shadcn/ui como fundación, **fuertemente** re-estilizados con los tokens. El look de shadcn por defecto (gris neutro, rounded-lg, shadows) queda prohibido.
- **Íconos:** Lucide React con stroke de 1.5, tamaño 20-24px por defecto.
- **Fuentes:** `next/font/google` para self-hosted, con `display: swap`.
- **Hosting:** Vercel.
- Todos los componentes deben ser `"use client"` solo si usan GSAP o estado; la mayor parte del sitio debe ser Server Components.

---

## 8. Entregables (en este orden exacto)

### Fase 1 — Fundación
1. `app/globals.css` con el bloque `@theme` completo (todos los tokens del punto 3 + escala tipográfica + escala de espaciado si difiere del default).
2. `lib/fonts.ts` con la configuración de fuentes Google vía `next/font`.
3. Documento `DESIGN_SYSTEM.md` en la raíz del proyecto con: paleta visual, escala tipográfica renderizada, reglas de espaciado, do's and don'ts.

### Fase 2 — Componentes base
4. `components/ui/` re-estilizados: `Button`, `Card`, `Input`, `Badge`, `Divider`, `SectionHeader`. Cada uno con al menos 3 variantes que correspondan al rol visual del brand (ej. Button: `wine`, `gold-ghost`, `link`). Muéstralos en una ruta interna `/styleguide` accesible durante desarrollo.

### Fase 3 — Mockups de página (estáticos, sin backend)
5. **Landing raíz** (`/`): hero institucional de Grupo OHM + presentación de las 3 divisiones como cards editoriales + breve sección "quiénes somos" + footer completo.
6. **`/distribucion`**: hero específico + propuesta de valor B2B + categorías de medicamento (patente / genérico / rebotica) como grid visual + formulario de contacto comercial + WhatsApp + dirección.
7. **`/farmacia`**: hero con la mascota Gin + 4 productos destacados + categorías + banda de beneficios breve + footer específico.
8. **`/skincare`**: hero editorial estilo Caudalie + 3 productos emblemáticos + sección de ritual/rutina + sección de valores (origen natural, laboratorio, etc.) + footer específico.

### Fase 4 — Rediseño del logo Farmayoreo Gin
9. Entrega **3 variantes** del logo rediseñado en SVG dentro de `public/branding/gin/`. La mascota Gin se preserva (redibújala vectorialmente con estilo más limpio si es necesario). Cambia la paleta hacia sage + gold + cream. Incluye una versión horizontal, una vertical y un isologo para avatar.

---

## 9. Hero del landing raíz — especificación detallada

Para que haya un ancla clara de qué es "éxito" en este proyecto, el hero del landing raíz debe cumplir:

- Altura: `min-h-[85vh]`
- Fondo: `ohm-cream`
- Layout: 2 columnas en desktop (60/40), stackeado en móvil
- Columna izquierda: eyebrow en uppercase + tracking amplio ("GRUPO OHM · DESDE CDMX"), seguido de un H1 serif de una línea con el posicionamiento de la marca (propón el copy, mantenlo breve — ~6-8 palabras), seguido de un párrafo de lead de máximo 25 palabras y UN solo CTA primario en `wine` + un link secundario en `ink-soft`.
- Columna derecha: imagen editorial vertical o composición de los tres logos de las divisiones en arreglo asimétrico sobre fondo crema texturizado. No foto de farmacia.
- Animación: fade + slide de 24px con stagger de 80ms entre eyebrow → H1 → párrafo → CTA. Total del reveal bajo 1s.
- En el footer del hero (no visible sin scroll): una banda discreta de `+ Distribución · Farmacia · Skincare` con separadores finos en `ohm-line`.

Si al terminar el hero puedes verlo al lado del screenshot de `pharma-marketing-seven.vercel.app` y decir *"este es claramente más caro"*, hiciste tu trabajo.

---

## 10. Criterios de aceptación

Antes de entregar, autoevalúa contra estos puntos. Si alguno falla, itera:

- [ ] ¿El wine `#830220` y el gold `#9F7B0B` son visibles en los primeros 2 segundos de cargar el landing?
- [ ] ¿Eliminé todos los emojis de la UI (solo permitidos en microcopy si son parte del tono, jamás como iconografía)?
- [ ] ¿El home respira? ¿Puede un usuario describir en una frase qué es Grupo OHM tras 3 segundos?
- [ ] ¿La tipografía tiene contraste serif/sans que se lee como editorial y no como dashboard?
- [ ] ¿Ningún fondo es `#FFFFFF` puro?
- [ ] ¿Las 3 divisiones se sienten como hermanas, no como primas lejanas ni como clones?
- [ ] ¿El rediseño del logo de Gin conserva el personaje pero lo vuelve neutro y armónico con OHM Pharma?
- [ ] ¿Funciona igual de bien en móvil 375px que en desktop 1440px?
- [ ] ¿Hay `prefers-reduced-motion` respetado en todas las animaciones GSAP?
- [ ] ¿El `/styleguide` deja claro el sistema completo sin que yo tenga que explicarte nada?

---

## 11. Lo que NO debes hacer en esta fase

- No toques lógica de carrito, checkout, auth, ni base de datos. Los mockups de producto son tarjetas estáticas con `const products = [...]` hardcoded.
- No instales más dependencias que las listadas en el punto 7 sin justificarlo primero.
- No inventes testimonios, métricas ("+12,000 clientes felices"), ni certificaciones. Si necesitas llenar espacio, déjalo con `{/* TODO: contenido real de la clienta */}` y un placeholder tipográfico elegante.
- No uses Unsplash de farmacias genéricas. Si necesitas imágenes placeholder, usa bloques de color `ohm-gold-pale` con el logo de la división centrado, o referencias a imágenes editoriales de Aesop/Caudalie con atribución y nota de que son placeholder.

---

## 12. Formato de entrega

Al cerrar, entrégame:
1. Estructura de archivos creados/modificados (árbol).
2. El `DESIGN_SYSTEM.md` renderizado.
3. Screenshots (o descripción si no puedes renderizar) de las 4 vistas principales: `/`, `/distribucion`, `/farmacia`, `/skincare`, `/styleguide`.
4. Las 3 variantes del logo de Gin en SVG inline o con ruta al archivo.
5. Un changelog breve explicando las decisiones de diseño más importantes y qué dejaste pendiente para fase 2 (implementación real).

Empieza por la Fase 1. Confírmame los tokens y la tipografía antes de avanzar a los mockups. Pregunta si algo está ambiguo — prefiero una pregunta corta a una iteración larga en la dirección equivocada.
