/**
 * /admin/pedidos — Panel de pedidos (server component, no requiere auth aún)
 *
 * Muestra todas las órdenes guardadas en Neon, ordenadas de más reciente a más antigua.
 * Acceso: http://localhost:3000/admin/pedidos
 *
 * ⚠️  TODO: proteger con autenticación básica (NextAuth / Clerk) antes de lanzar a producción.
 */
import type { Metadata } from "next";
import { listRecentOrders } from "@/lib/db/orders";
import type { OrderStatus } from "@/lib/generated/prisma/client";

export const metadata: Metadata = {
  title: "Pedidos — Admin Grupo OHM",
  description: "Panel interno de pedidos.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatMXN(n: number) {
  return `$${n.toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} MXN`;
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  }).format(d);
}

const STATUS_LABEL: Record<OrderStatus, { label: string; color: string }> = {
  PENDING:    { label: "Pendiente",   color: "bg-yellow-100 text-yellow-800" },
  APPROVED:   { label: "Aprobado",    color: "bg-green-100 text-green-800" },
  IN_PROCESS: { label: "En proceso",  color: "bg-blue-100 text-blue-800" },
  REJECTED:   { label: "Rechazado",   color: "bg-red-100 text-red-800" },
  CANCELLED:  { label: "Cancelado",   color: "bg-gray-100 text-gray-600" },
  SHIPPED:    { label: "Enviado",     color: "bg-purple-100 text-purple-800" },
  DELIVERED:  { label: "Entregado",   color: "bg-teal-100 text-teal-800" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AdminPedidosPage() {
  let orders: Awaited<ReturnType<typeof listRecentOrders>> = [];
  let dbError: string | null = null;

  try {
    orders = await listRecentOrders(100);
  } catch (err) {
    dbError =
      err instanceof Error ? err.message : "Error conectando a la base de datos.";
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">Panel interno</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">Pedidos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Últimos 100 pedidos · Base de datos Neon · Ciudad de México
          </p>
        </div>

        {/* Stats */}
        {!dbError && orders.length > 0 && (
          <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              label="Total pedidos"
              value={String(orders.length)}
              sub="últimos 100"
            />
            <StatCard
              label="Aprobados"
              value={String(orders.filter((o) => o.status === "APPROVED").length)}
              sub="pagados"
            />
            <StatCard
              label="Pendientes"
              value={String(orders.filter((o) => o.status === "PENDING").length)}
              sub="sin pagar"
            />
            <StatCard
              label="Ingresos"
              value={formatMXN(
                orders
                  .filter((o) => o.status === "APPROVED" || o.status === "SHIPPED" || o.status === "DELIVERED")
                  .reduce((acc, o) => acc + o.total, 0),
              )}
              sub="aprobados"
            />
          </div>
        )}

        {/* Error */}
        {dbError && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <strong>Error de base de datos:</strong> {dbError}
          </div>
        )}

        {/* Empty */}
        {!dbError && orders.length === 0 && (
          <div className="rounded-md border border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="text-gray-500 text-sm">No hay pedidos todavía.</p>
            <p className="mt-1 text-xs text-gray-400">
              Las órdenes aparecerán aquí cuando alguien complete el checkout.
            </p>
          </div>
        )}

        {/* Table */}
        {!dbError && orders.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-100 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Referencia", "Fecha", "Cliente", "Items", "Total", "Envío", "Estado", "MP ID"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => {
                  const st = STATUS_LABEL[order.status] ?? {
                    label: order.status,
                    color: "bg-gray-100 text-gray-600",
                  };
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      {/* Referencia */}
                      <td className="px-4 py-3 font-mono text-xs text-blue-700 whitespace-nowrap">
                        {order.externalReference}
                      </td>
                      {/* Fecha */}
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(order.createdAt)}
                      </td>
                      {/* Cliente */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="font-medium text-gray-900">{order.payerName}</p>
                        <p className="text-xs text-gray-400">{order.payerEmail}</p>
                      </td>
                      {/* Items */}
                      <td className="px-4 py-3 max-w-[200px]">
                        <ul className="space-y-0.5">
                          {order.items.map((item) => (
                            <li key={item.id} className="text-xs text-gray-600 truncate">
                              {item.quantity}× {item.productName}
                            </li>
                          ))}
                        </ul>
                      </td>
                      {/* Total */}
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                        {formatMXN(order.total)}
                      </td>
                      {/* Envío */}
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        <p>{order.shippingMethodLabel ?? order.shippingCarrier ?? "—"}</p>
                        <p className="text-gray-400">{order.shippingZip} · {order.shippingCity}</p>
                      </td>
                      {/* Estado */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${st.color}`}
                        >
                          {st.label}
                        </span>
                        {order.mpStatusDetail && (
                          <p className="mt-0.5 text-[10px] text-gray-400">{order.mpStatusDetail}</p>
                        )}
                      </td>
                      {/* MP ID */}
                      <td className="px-4 py-3 font-mono text-xs text-gray-400 whitespace-nowrap">
                        {order.mpPaymentId ?? "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-xs text-gray-400 text-center">
          ⚠️ Esta página es interna. Agregar autenticación antes de ir a producción.
        </p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
      <p className="mt-0.5 text-xs text-gray-400">{sub}</p>
    </div>
  );
}
