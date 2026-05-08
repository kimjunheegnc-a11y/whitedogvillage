"use client";

import Image from "next/image";
import { useState } from "react";
import type { AdoptionPuppy } from "@/lib/adoption-puppies";

export function AdoptionPuppyCards({ puppies }: { puppies: AdoptionPuppy[] }) {
  const [open, setOpen] = useState<AdoptionPuppy | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {puppies.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setOpen(p)}
            className="group rounded-3xl border border-[var(--border)] bg-white p-0 text-left shadow-sm ring-0 transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
              <Image src={p.image} alt={p.name} fill className="object-cover transition duration-300 group-hover:scale-[1.02]" sizes="(max-width:1024px) 50vw, 25vw" />
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold text-muted">{p.breed}</p>
              <p className="mt-0.5 text-lg font-bold text-[var(--text)]">{p.name}</p>
              <p className="mt-1 text-xs text-muted">
                {p.gender} · {p.months}개월
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {p.keywords.slice(0, 3).map((k) => (
                  <span key={k} className="rounded-full bg-[color-mix(in_srgb,var(--accent-2)_55%,white)] px-2 py-0.5 text-[10px] font-semibold text-[var(--text)]">
                    {k}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs font-semibold text-[var(--accent-dark)]">탭하여 상세 보기 →</p>
            </div>
          </button>
        ))}
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="puppy-detail-title"
          onClick={() => setOpen(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[var(--border)] bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
              <Image src={open.image} alt="" fill className="object-cover" sizes="512px" />
            </div>
            <h3 id="puppy-detail-title" className="mt-5 text-xl font-bold text-[var(--text)]">
              {open.name}{" "}
              <span className="text-base font-medium text-muted">
                · {open.breed} {open.gender} {open.months}개월
              </span>
            </h3>
            <div className="mt-2 flex flex-wrap gap-1">
              {open.keywords.map((k) => (
                <span key={k} className="rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,white_90%,var(--accent-2))] px-2 py-0.5 text-xs font-medium">
                  {k}
                </span>
              ))}
            </div>
            <dl className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
              <div>
                <dt className="font-bold text-[var(--text)]">소개</dt>
                <dd className="mt-1">{open.detail.summary}</dd>
              </div>
              <div>
                <dt className="font-bold text-[var(--text)]">성향</dt>
                <dd className="mt-1">{open.detail.personality}</dd>
              </div>
              <div>
                <dt className="font-bold text-[var(--text)]">건강</dt>
                <dd className="mt-1">{open.detail.health}</dd>
              </div>
              <div>
                <dt className="font-bold text-[var(--text)]">안내</dt>
                <dd className="mt-1">{open.detail.note}</dd>
              </div>
            </dl>
            <button
              type="button"
              className="mt-8 w-full rounded-2xl border border-[var(--border)] py-3 text-sm font-bold text-[var(--text)] hover:bg-[color-mix(in_srgb,white_88%,var(--accent-2))]"
              onClick={() => setOpen(null)}
            >
              닫기
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
