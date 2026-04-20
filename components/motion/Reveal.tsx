"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
};

export function Reveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.9,
  stagger = 0.08,
  once = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>("[data-reveal-item]");
    const hasItems = items.length > 0;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.removeAttribute("data-reveal");
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !el) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const animTargets = hasItems ? items : [el];
        gsap.set(animTargets, { opacity: 0, y });
        el.removeAttribute("data-reveal");
        gsap.to(animTargets, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger: hasItems ? stagger : 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: once ? "play none none none" : "play reverse play reverse",
          },
        });
      }, el);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [delay, y, duration, stagger, once]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      data-reveal="pending"
      className={cn("reveal-root", className)}
    >
      {children}
    </Tag>
  );
}
