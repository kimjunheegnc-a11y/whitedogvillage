"use client";

import { useState } from "react";

type ResType = "adoption" | "hotel" | "grooming";

export function ReservationForm({
  type,
  title,
}: {
  type: ResType;
  title: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pet, setPet] = useState("");
  const [when, setWhen] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const preferred_at =
        when.trim().length > 0 ? new Date(when).toISOString() : undefined;
      const res = await fetch("/api/submit-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          customer_name: name,
          phone,
          pet_info: pet,
          preferred_at,
          notes,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "전송 실패");
      setMsg("접수되었습니다. 빠르게 연락드릴게요!");
      setName("");
      setPhone("");
      setPet("");
      setWhen("");
      setNotes("");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-white/90 p-6 shadow-[var(--shadow)] ring-1 ring-white/70">
      <h2 className="text-lg font-extrabold text-[var(--accent-dark)]">{title}</h2>
      <p className="mt-1 text-sm text-muted">
        아래 정보를 남겨주시면 확인 후 연락드립니다.
      </p>
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
          반려동물 정보
          <input
            className="rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,white_92%,var(--accent-2))] px-3 py-3 outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--accent)_35%,transparent)]"
            value={pet}
            onChange={(e) => setPet(e.target.value)}
            placeholder="종류, 나이 등"
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          희망 일시 (선택)
          <input
            type="datetime-local"
            className="rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,white_92%,var(--accent-2))] px-3 py-3 outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--accent)_35%,transparent)]"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          요청사항
          <textarea
            rows={4}
            className="rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,white_92%,var(--accent-2))] px-3 py-3 outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--accent)_35%,transparent)]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-accent py-3 text-center text-sm font-bold text-white shadow hover:bg-accent-dark disabled:opacity-60"
        >
          {loading ? "전송 중…" : "예약 접수하기"}
        </button>
        {msg ? (
          <p className="text-center text-sm font-semibold text-[var(--accent-dark)]">{msg}</p>
        ) : null}
      </form>
    </section>
  );
}
