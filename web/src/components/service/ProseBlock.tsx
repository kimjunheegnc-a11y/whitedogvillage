import type { ReactNode } from "react";

export function ProseBlock({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[1.75rem] border border-[var(--border)] bg-white/90 p-6 shadow-sm sm:p-8">
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-dark)]">{eyebrow}</p>
      ) : null}
      <h2 className="mt-1 text-2xl font-extrabold text-[var(--text)]">{title}</h2>
      <div className="prose-pink mt-4 space-y-4 text-sm leading-relaxed text-muted sm:text-base">{children}</div>
    </section>
  );
}
