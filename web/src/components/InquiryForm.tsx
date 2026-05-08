"use client";

import { useState } from "react";
import {
  parseApiErrorPayload,
  validateCustomerName,
  validateNotes,
  validatePhone,
} from "@/lib/reservation-input";

export function InquiryForm({ category, title }: { category: string; title: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; ok: boolean } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);
    const vName = validateCustomerName(name);
    if (vName) {
      setFeedback({ text: vName, ok: false });
      return;
    }
    const vPhone = validatePhone(phone);
    if (vPhone) {
      setFeedback({ text: vPhone, ok: false });
      return;
    }
    const vMsg = validateNotes(message, 5);
    if (vMsg) {
      setFeedback({ text: vMsg, ok: false });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/submit-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, name: name.trim(), phone, message: message.trim() }),
      });
      const data = (await res.json()) as unknown;
      if (!res.ok) throw new Error(parseApiErrorPayload(data));
      setFeedback({ text: "문의가 접수되었습니다.", ok: true });
      setName("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setFeedback({
        text: err instanceof Error ? err.message : "오류가 발생했습니다.",
        ok: false,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-white/90 p-6 shadow-[var(--shadow)] ring-1 ring-white/70">
      <h2 className="text-lg font-extrabold text-[var(--accent-dark)]">{title}</h2>
      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <label className="grid gap-1 text-sm font-medium">
          이름 (2글자 이상)
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
            placeholder="010-1234-5678"
            className="rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,white_92%,var(--accent-2))] px-3 py-3 outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--accent)_35%,transparent)]"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          문의 내용 (5글자 이상)
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
        {feedback ? (
          <p
            className={`whitespace-pre-wrap text-center text-sm font-semibold ${
              feedback.ok ? "text-green-800" : "text-red-700"
            }`}
          >
            {feedback.text}
          </p>
        ) : null}
      </form>
    </section>
  );
}
