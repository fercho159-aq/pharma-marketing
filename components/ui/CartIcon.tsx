"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";

export function CartIcon() {
  const { count } = useCart();
  return (
    <Link
      href="/carrito"
      aria-label={`Carrito, ${count} artículo${count === 1 ? "" : "s"}`}
      className="relative inline-flex items-center justify-center h-10 w-10 text-[color:var(--color-ohm-ink)] hover:text-[color:var(--color-ohm-wine)] transition-colors"
    >
      <ShoppingBag size={22} strokeWidth={1.5} />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[color:var(--color-ohm-wine)] text-[color:var(--color-ohm-cream)] text-[10px] font-semibold flex items-center justify-center">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
