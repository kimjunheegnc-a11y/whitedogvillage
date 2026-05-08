import type { ReactNode } from "react";

/** 토스/29CM 느낌 — 넉넉한 여백, 얇은 테두리, 큰 타이포 */
export function PlateSection({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-28 ${className}`}>
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-dark)]">{eyebrow}</p>
      ) : null}
      <h2 className="mt-1 text-2xl font-bold tracking-tight text-[var(--text)] sm:text-[1.65rem]">{title}</h2>
      {description ? <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{description}</p> : null}
      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}

export function PlateCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-[var(--border)] bg-[color-mix(in_srgb,white_96%,var(--accent-2))] p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
