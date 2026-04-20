"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export function HeroEnter({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.removeAttribute("data-hero");
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { default: gsap } = await import("gsap");
      if (cancelled || !el) return;

      ctx = gsap.context(() => {
        const targets = el.querySelectorAll<HTMLElement>("[data-hero-item]");
        if (targets.length === 0) return;
        gsap.set(targets, { opacity: 0, y: 28 });
        el.removeAttribute("data-hero");
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.15,
        });
      }, el);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={ref} data-hero="pending" className="hero-enter">
      {children}
    </div>
  );
}
