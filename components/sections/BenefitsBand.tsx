import type { LucideIcon } from "lucide-react";

type Benefit = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export function BenefitsBand({
  items,
  tone = "cream",
}: {
  items: Benefit[];
  tone?: "cream" | "paper" | "sage-pale" | "nude-pale";
}) {
  const bg = {
    cream: "bg-[color:var(--color-ohm-cream)]",
    paper: "bg-[color:var(--color-ohm-paper)]",
    "sage-pale": "bg-[color:var(--color-gin-sage-pale)]",
    "nude-pale": "bg-[color:var(--color-ilm-nude-pale)]",
  }[tone];
  return (
    <section className={`${bg} border-y border-[color:var(--color-ohm-line)]`}>
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {items.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex flex-col gap-3">
              <Icon size={24} strokeWidth={1.5} className="text-[color:var(--color-ohm-gold)]" />
              <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-[color:var(--color-ohm-wine)]">
                {title}
              </p>
              <p className="text-sm text-[color:var(--color-ohm-ink-soft)] leading-relaxed">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
