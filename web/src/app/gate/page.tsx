"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function safeNext(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
}

function GateForm() {
  const sp = useSearchParams();
  const next = safeNext(sp.get("next"));
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/site-gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "입장 실패");
      window.location.assign(next);
    } catch (er) {
      setErr(er instanceof Error ? er.message : "오류");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-16">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-dark)]">WHITE DOG VILLAGE</p>
      <h1 className="mt-3 text-center text-2xl font-bold text-[var(--text)]">사이트 입장</h1>
      <p className="mt-2 text-center text-sm text-muted">정식 오픈 전 페이지입니다. 비밀번호를 입력해 주세요.</p>
      <form onSubmit={onSubmit} className="mt-10 space-y-4 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
        <label className="grid gap-1 text-sm font-semibold text-[var(--text)]">
          비밀번호
          <input
            type="password"
            inputMode="numeric"
            autoComplete="current-password"
            className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,white_96%,var(--accent-2))] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--accent)]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {err ? <p className="text-sm text-red-600">{err}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-[#FEE500] py-3.5 text-sm font-bold text-[#191919] shadow-sm ring-1 ring-black/5 hover:brightness-[0.97] disabled:opacity-50"
        >
          {loading ? "확인 중…" : "입장"}
        </button>
      </form>
    </div>
  );
}

export default function SiteGatePage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh]" />}>
      <GateForm />
    </Suspense>
  );
}
