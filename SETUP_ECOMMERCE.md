# Setup E-commerce — Grupo OHM

Esta guía cubre la configuración de **Mercado Pago Checkout Pro** y **99 minutos**
para que el e-commerce funcione de punta a punta.

---

## 1. Variables de entorno

Copia `.env.local.example` a `.env.local`:

```bash
cp .env.local.example .env.local
```

Edita `.env.local` y llena los valores. Las credenciales de PRUEBA de Mercado
Pago ya vienen pre-rellenadas en el ejemplo.

| Variable | Dónde se usa | Pública / Secreta |
|----------|--------------|-------------------|
| `NEXT_PUBLIC_BASE_URL` | URLs de retorno + webhook | Pública |
| `MP_ACCESS_TOKEN` | API de Mercado Pago (server) | **Secreta** |
| `NEXT_PUBLIC_MP_PUBLIC_KEY` | Frontend (Bricks) | Pública |
| `MP_WEBHOOK_SECRET` | Verificar firma del webhook | **Secreta** |
| `SHIPPING_PROVIDER` | `"standard"` o `"99minutos"` | Pública |
| `NINETY_NINE_API_KEY` | API 99 minutos | **Secreta** |

> ⚠️ `.env.local` está en `.gitignore` — nunca lo subas al repo.

---

## 2. Instalar dependencias

```bash
npm install
```

(El SDK `mercadopago` se agregó a `package.json`).

---

## 3. Probar Mercado Pago en local

### 3.1 Tarjetas de prueba

Con el access token actual (test mode) puedes pagar usando estas tarjetas
oficiales de Mercado Pago. **No se hace ningún cargo real.**

| Marca | Número | CVV | Vencimiento |
|-------|--------|-----|-------------|
| Mastercard | `5031 7557 3453 0604` | `123` | `11/30` |
| Visa | `4509 9535 6623 3704` | `123` | `11/30` |
| Amex | `3711 803032 57522` | `1234` | `11/30` |

**Nombre del titular** para definir el resultado:
- `APRO` → pago aprobado ✅
- `OTHE` → rechazado por error general ❌
- `CONT` → pendiente (queda en pending) ⏳
- `CALL` → rechazado, llamar al banco ❌

### 3.2 Flujo de prueba

1. `npm run dev`
2. Agrega productos al carrito → `/carrito`
3. Completa el formulario de envío con cualquier CP de CDMX (ej. `13000`)
4. Selecciona un método de envío
5. Click en "Pagar con Mercado Pago" → te redirige a `mercadopago.com.mx/checkout/...`
6. Paga con una tarjeta de prueba + nombre `APRO`
7. Vuelves a `/carrito/success`

---

## 4. Configurar Webhooks de Mercado Pago

Para que MP avise cuando un pago cambia de estado:

1. Entra a [tu panel de MP](https://www.mercadopago.com.mx/developers/panel/notifications/webhooks)
2. URL de notificación: `https://TU-DOMINIO.com/api/checkout/webhook`
3. Eventos a escuchar: **Pagos** (`payment`)
4. Copia el "Secret" → pégalo en `MP_WEBHOOK_SECRET` de `.env.local`

### Webhooks en local (desarrollo)

Mercado Pago no puede llegar a `localhost:3000`. Usa **ngrok** o **cloudflared**:

```bash
# Ngrok
ngrok http 3000
# → URL: https://abc123.ngrok-free.app
```

Configura esa URL pública en el panel de MP como webhook.

---

## 5. Integrar 99 minutos

> **Estado actual:** stub listo, esperando credenciales de Sheccid.

### Cuando lleguen las credenciales:

1. Llena en `.env.local`:
   ```env
   SHIPPING_PROVIDER="99minutos"
   NINETY_NINE_API_URL="https://api.99minutos.com/v3"
   NINETY_NINE_API_KEY="<key real>"
   NINETY_NINE_API_SECRET="<secret si aplica>"
   ```

2. Abre `lib/shipping/providers/ninetynine.ts`

3. Reemplaza el bloque `TODO` (líneas comentadas) con la llamada `fetch` real
   al endpoint `/orders/quote` según la documentación de 99 minutos.

4. Mapea la respuesta a `ShippingQuote[]` (campos: `id`, `label`, `carrier`,
   `eta`, `price`).

5. **Crear el envío real después del pago:** ir al webhook
   `app/api/checkout/webhook/route.ts` → completar el TODO 2 dentro del
   bloque `if (data.status === "approved")` con `create99MinutosShipment(...)`.

6. Probar con un código postal real cubierto por 99 minutos (ej. CDMX).

---

## 6. Lo que TODAVÍA falta (next iterations)

Esto es e-commerce funcional pero hay piezas pendientes que no requieren
credenciales y se pueden hacer cuando el cliente las priorice:

- [ ] **Persistencia de órdenes** (DB: Postgres + Prisma, Supabase o Firestore).
      Hoy el webhook solo loguea — no guarda nada. Sin DB no podemos:
      mostrar historial, recuperar pedido por referencia, hacer dashboard admin.
- [ ] **Email transaccional** de confirmación al cliente (Resend / Sendgrid).
- [ ] **Stock por producto** y bloqueo durante checkout.
- [ ] **Cupones / códigos de descuento.**
- [ ] **Verificación de firma** del webhook MP con HMAC SHA256.
- [ ] **Página de tracking** del envío (consultar 99 minutos por número de guía).
- [ ] **Cuenta de usuario** para que clientes vean sus pedidos previos.
- [ ] **Admin panel** para ver pedidos, status, gestionar envíos manualmente.

---

## 7. Arquitectura — referencia rápida

```
app/
├── api/
│   ├── checkout/
│   │   ├── preference/route.ts   ← POST: crea preference MP
│   │   └── webhook/route.ts      ← POST: notificaciones MP
│   └── shipping/
│       └── quote/route.ts         ← POST: cotiza envío
├── carrito/
│   ├── page.tsx                   ← /carrito
│   ├── CartPageClient.tsx         ← UI con stepper (cart → ship → method → MP)
│   ├── success/                   ← /carrito/success
│   ├── failure/                   ← /carrito/failure
│   └── pending/                   ← /carrito/pending
└── ...

lib/
├── mercadopago/
│   ├── client.ts                  ← MercadoPagoConfig instance
│   └── preference.ts              ← createCheckoutPreference()
├── shipping/
│   ├── types.ts                   ← ShippingAddress, ShippingQuote, etc.
│   ├── index.ts                   ← getShippingQuotes() — entry point
│   └── providers/
│       ├── standard.ts            ← tarifas planas locales (default)
│       └── ninetynine.ts          ← stub 99 minutos
└── cart/
    └── CartContext.tsx            ← carrito en localStorage
```

---

## 8. Flujo de compra — diagrama

```
Cliente
   │  /carrito  →  fills items
   │  /carrito  →  fills shipping address
   │
   ├─→ POST /api/shipping/quote     ─→ getShippingQuotes(address, items)
   │                                    ├─ standard provider (siempre)
   │                                    └─ 99minutos provider (si está config)
   │
   │  /carrito  →  selects method
   │
   ├─→ POST /api/checkout/preference  →  createCheckoutPreference()
   │                                       └─ MP SDK → /checkout/preferences
   │                                  ←  { initPoint }
   │
   │  window.location = initPoint
   │
   ↓
Mercado Pago (entorno externo)
   │  [usuario paga]
   │
   ├──→ GET /carrito/success  (back_url)
   │
   └──→ POST /api/checkout/webhook  (notification_url)
              └─ Payment.get(id)
              └─ if approved:
                   ├─ TODO: persist order
                   ├─ TODO: create99MinutosShipment()
                   └─ TODO: send confirmation email
```
