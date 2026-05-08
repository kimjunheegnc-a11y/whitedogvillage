"use client";

import { useState } from "react";

export function InquiryForm({ category, title }: { category: string; title: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch("/api/submit-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, name, phone, message }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "전송 실패");
      setMsg("문의가 접수되었습니다.");
      setName("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "오류");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-white/90 p-6 shadow-[var(--shadow)] ring-1 ring-white/70">
      <h2 className="text-lg font-extrabold text-[var(--accent-dark)]">{title}</h2>
      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <label className="grid gap-1 text-sm font-medium">
          이름
          <input
            required
            className="rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,white_92%,var(--accent-2))] px-3 py-3 outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--accent)_35%,transparent)]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          연락처
          <input
            required
            inputMode="tel"
            className="rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,white_92%,var(--accent-2))] px-3 py-3 outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--accent)_35%,transparent)]"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          문의 내용
          <textarea
            required
            rows={5}
            className="rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,white_92%,var(--accent-2))] px-3 py-3 outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--accent)_35%,transparent)]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-accent py-3 text-sm font-bold text-white shadow hover:bg-accent-dark disabled:opacity-60"
        >
          {loading ? "전송 중…" : "문의 보내기"}
        </button>
        {msg ? <p className="text-center text-sm font-semibold text-[var(--accent-dark)]">{msg}</p> : null}
      </form>
    </section>
  );
}
