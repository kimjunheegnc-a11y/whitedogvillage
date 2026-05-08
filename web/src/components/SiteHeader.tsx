"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  DEFAULT_PHONE,
  KAKAO_CHAT_HREF,
  MOBILE_PHONE,
  NAV,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/constants";

export function SiteHeader({ phone }: { phone: string }) {
  const [open, setOpen] = useState(false);
  const tel = phone.replace(/[^0-9+]/g, "");
  const tel2 = MOBILE_PHONE.replace(/[^0-9+]/g, "");

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color-mix(in_srgb,white_92%,transparent)] shadow-[var(--shadow)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl bg-white ring-2 ring-[var(--accent-2)] shadow-sm">
            <Image
              src="/brand/logo-letterpress.png"
              alt=""
              fill
              className="object-cover"
              sizes="44px"
              priority
            />
          </span>
          <div className="min-w-0">
            <p className="truncate text-lg font-extrabold text-[var(--text)]">{SITE_NAME}</p>
            <p className="truncate text-xs text-muted">{SITE_TAGLINE}</p>
          </div>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-[var(--text)] hover:bg-[color-mix(in_srgb,white_70%,var(--accent-2))] hover:text-[var(--accent-dark)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 flex-col items-end gap-1 text-right lg:flex">
          <div className="flex items-center gap-3 text-xs font-semibold text-muted">
            <a href={`tel:${tel}`} className="hover:text-[var(--accent-dark)]">
              {phone}
            </a>
            <span className="text-[var(--border)]">|</span>
            <a href={`tel:${tel2}`} className="hover:text-[var(--accent-dark)]">
              {MOBILE_PHONE}
            </a>
          </div>
          <a
            href={KAKAO_CHAT_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-accent-dark"
            title="카카오톡 채널 URL은 준비 후 교체"
          >
            <span className="text-lg leading-none">💬</span>
            카카오톡 예약하기
          </a>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--accent-dark)] lg:hidden"
          aria-expanded={open}
          aria-label="메뉴"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-2xl">{open ? "×" : "≡"}</span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-[var(--border)] bg-white px-4 pb-4 lg:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-base font-semibold hover:bg-[color-mix(in_srgb,white_75%,var(--accent-2))]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-[var(--border)] pt-3 text-sm">
            <a href={`tel:${tel}`} className="font-semibold text-[var(--accent-dark)]">
              전화 {phone}
            </a>
            <a href={`tel:${tel2}`} className="font-semibold text-[var(--accent-dark)]">
              휴대폰 {MOBILE_PHONE}
            </a>
            <a
              href={KAKAO_CHAT_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent py-3 font-bold text-white"
            >
              카카오톡 예약하기
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function MobileQuickBar({ phone }: { phone: string }) {
  const tel = phone.replace(/[^0-9+]/g, "");
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex gap-2 border-t border-[var(--border)] bg-[color-mix(in_srgb,white_94%,var(--accent-2))] p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <a
        href={`tel:${tel}`}
        className="flex flex-1 items-center justify-center rounded-xl border border-[var(--border)] bg-white py-3 text-sm font-bold text-[var(--text)] shadow-sm"
      >
        전화
      </a>
      <a
        href={KAKAO_CHAT_HREF}
        className="flex flex-1 items-center justify-center rounded-xl bg-accent py-3 text-sm font-bold text-white shadow-sm"
      >
        카카오
      </a>
    </div>
  );
}

export { DEFAULT_PHONE };
