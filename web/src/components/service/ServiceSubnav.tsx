"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ServiceNavItem } from "@/lib/service-nav";

export function ServiceSubnav({ items }: { items: ServiceNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav
      className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto pb-1 pt-1"
      aria-label="섹션 메뉴"
    >
      {items.map((item) => {
        const on = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
              on
                ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent-2)_55%,white)] text-[var(--text)] shadow-sm"
                : "border-[var(--border)] bg-white/80 text-muted hover:border-[var(--accent-2)] hover:bg-white",
            ].join(" ")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
