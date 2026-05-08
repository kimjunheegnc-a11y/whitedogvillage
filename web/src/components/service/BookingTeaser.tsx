import Link from "next/link";

export function BookingTeaser({
  href,
  title,
  body,
}: {
  href: string;
  title: string;
  body: string;
}) {
  return (
    <aside className="rounded-[1.75rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--accent-2)_35%,white)] p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-dark)]">빠른 연결</p>
      <h3 className="mt-2 text-lg font-extrabold text-[var(--text)]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
      <Link
        href={href}
        className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-accent px-4 py-3 text-sm font-bold text-white shadow hover:bg-accent-dark"
      >
        바로 이동
      </Link>
      <p className="mt-3 text-center text-[11px] text-muted">
        우측 하단 <span className="font-semibold text-[var(--text)]">+ 챗봇</span>으로도 접수 가능
      </p>
    </aside>
  );
}
