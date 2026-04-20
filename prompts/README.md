# Grupo OHM — Multi-Agent Design Pipeline

Setup de 5 agentes especializados para rediseñar `grupoohm.com` desde cero usando Claude Code con el flag experimental de agent teams.

## Estructura

```
prompts/
├── README.md                   ← este archivo
├── ORCHESTRATOR.md             ← prompt del agente coordinador principal
├── SHARED_CONTEXT.md           ← contexto que TODOS los agentes leen primero
├── DESIGN_BRIEF.md             ← el brief completo (fuente de verdad visual)
└── agents/
    ├── 01-architect.md         ← fundación: tokens, fonts, structure
    ├── 02-art-director.md      ← paleta fine-tuning + rediseño logo Gin
    ├── 03-components-pages.md  ← shadcn re-estilizado + las 4 páginas
    ├── 04-motion.md            ← GSAP + ScrollTrigger + reveals
    └── 05-qa.md                ← checklist + a11y + responsive audit
```

## Cómo arrancar

### Opción A — Agent Teams (experimental, recomendado)

```bash
cd tu-proyecto-grupo-ohm
cp -r prompts/ .
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 claude
```

En la primera interacción:

> Lee `prompts/ORCHESTRATOR.md` y ejecuta el pipeline completo. Comienza con Fase 1 y espera mi aprobación antes de continuar con Fase 2.

El orquestador va a delegar cada fase al agente correspondiente usando `Task()`, cada uno con su propio contexto acotado.

### Opción B — Manual (sin el flag, una sesión por agente)

Si prefieres control fino, corre una sesión de Claude Code por fase:

```bash
# Sesión 1 — Arquitecto
claude
> Lee prompts/SHARED_CONTEXT.md, prompts/DESIGN_BRIEF.md y prompts/agents/01-architect.md. Ejecuta tu rol completo.

# [revisa output, commit]

# Sesión 2 — Director de arte
claude
> Lee los mismos + prompts/agents/02-art-director.md. Lee también el DESIGN_SYSTEM.md que dejó el arquitecto.

# [etc.]
```

Esta opción da más control pero requiere que tú pases manualmente los outputs de un agente al siguiente.

## Checkpoints humanos (IMPORTANTE)

El pipeline tiene **3 puntos de revisión humana obligatoria**:

1. **Tras Fase 1** (Arquitecto): Validas tokens, paleta y tipografía antes de que el resto construya encima.
2. **Tras Fase 2b** (Director de arte): Validas el rediseño del logo Farmayoreo Gin antes de componer las páginas. Idealmente se lo mandas a Sheccid para aprobación.
3. **Tras Fase 3** (Components + Pages): Validas el `/styleguide` y los 4 mockups antes de motion y QA.

El orquestador **se detiene automáticamente** en cada checkpoint. No salta fases sin tu ok.

## Pipeline visual

```
         ┌─────────────────┐
         │  ORCHESTRATOR   │
         └────────┬────────┘
                  │
        ┌─────────▼──────────┐
        │  01 · ARCHITECT    │  Fase 1
        │  tokens + fonts    │
        └─────────┬──────────┘
                  │  ← checkpoint humano
        ┌─────────▼──────────┐
        │ 02 · ART DIRECTOR  │  Fase 2a
        │ paleta + logo Gin  │
        └─────────┬──────────┘
                  │  ← checkpoint humano (logo → Sheccid)
        ┌─────────▼──────────┐
        │ 03 · COMPONENTS &  │  Fase 2b + 3
        │     PAGES          │
        └─────────┬──────────┘
                  │  ← checkpoint humano
        ┌─────────▼──────────┐
        │  04 · MOTION       │  Fase 4
        └─────────┬──────────┘
                  │
        ┌─────────▼──────────┐
        │  05 · QA           │  Fase 5
        └─────────┬──────────┘
                  ▼
              Entregable
```

## Stack asumido

- Next.js 15 (App Router)
- Tailwind v4
- shadcn/ui
- GSAP 3 + ScrollTrigger
- Lucide icons
- `next/font/google`
- Vercel

Si cambias algo del stack, actualízalo en `SHARED_CONTEXT.md` **antes** de lanzar los agentes — todos leen de ahí.

## Qué NO incluye este setup

- Backend, base de datos, auth, pagos. Los mockups de producto son data estática hardcoded. La fase de e-commerce real va en un segundo multi-agente aparte (con Drizzle + Neon + bcryptjs + jose, tu stack habitual).
- Contenido real de la clienta. Todo lo que necesite copy o fotos reales queda con `{/* TODO: contenido de Sheccid */}` + placeholder elegante.
