"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "로그인 실패");
      router.replace("/admin/dashboard");
      router.refresh();
    } catch (er) {
      setErr(er instanceof Error ? er.message : "오류");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="text-center text-2xl font-bold text-pink-700">관리자 로그인</h1>
      <p className="mt-2 text-center text-sm text-muted">하얀 개 마을 /admin</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-pink-100">
        <label className="grid gap-1 text-sm font-semibold">
          비밀번호
          <input
            type="password"
            autoComplete="current-password"
            className="rounded-xl border border-pink-100 px-3 py-3 outline-none focus:ring-2 focus:ring-pink-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {err ? <p className="text-sm text-red-600">{err}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-accent py-3 text-sm font-bold text-white disabled:opacity-50"
        >
          {loading ? "확인 중…" : "입장"}
        </button>
      </form>
    </div>
  );
}
