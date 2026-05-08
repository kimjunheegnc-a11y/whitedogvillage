"use client";

import { useCallback, useState } from "react";

type Flow =
  | { step: "menu" }
  | { step: "reserve"; kind: "adoption" | "hotel" | "grooming" }
  | { step: "inquiry" };

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [flow, setFlow] = useState<Flow>({ step: "menu" });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pet, setPet] = useState("");
  const [when, setWhen] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);

  const reset = useCallback(() => {
    setFlow({ step: "menu" });
    setName("");
    setPhone("");
    setPet("");
    setWhen("");
    setNotes("");
    setBanner(null);
  }, []);

  async function submitReservation(kind: "adoption" | "hotel" | "grooming") {
    setLoading(true);
    setBanner(null);
    try {
      const preferred_at =
        when.trim().length > 0 ? new Date(when).toISOString() : undefined;
      const res = await fetch("/api/submit-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: kind,
          customer_name: name,
          phone,
          pet_info: pet,
          preferred_at,
          notes,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(typeof data.error === "string" ? data.error : "전송 실패");
      setBanner("예약이 접수되었습니다!");
      setName("");
      setPhone("");
      setPet("");
      setWhen("");
      setNotes("");
      setFlow({ step: "menu" });
    } catch (e) {
      setBanner(e instanceof Error ? e.message : "오류");
    } finally {
      setLoading(false);
    }
  }

  async function submitInquiry() {
    setLoading(true);
    setBanner(null);
    try {
      const res = await fetch("/api/submit-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: "기타 문의",
          name,
          phone,
          message: notes || "(내용 없음)",
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(typeof data.error === "string" ? data.error : "전송 실패");
      setBanner("문의가 접수되었습니다!");
      setName("");
      setPhone("");
      setNotes("");
      setFlow({ step: "menu" });
    } catch (e) {
      setBanner(e instanceof Error ? e.message : "오류");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="haean-chat-panel"
        onClick={() => {
          setOpen((v) => {
            if (v) reset();
            return !v;
          });
        }}
        className="fixed bottom-28 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-3xl font-bold text-white shadow-lg ring-4 ring-white/70 hover:bg-accent-dark lg:bottom-10 lg:right-10"
      >
        {open ? "×" : "+"}
      </button>

      {open ? (
        <div
          id="haean-chat-panel"
          className="fixed bottom-44 right-4 z-50 flex w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-2xl lg:bottom-28 lg:right-10"
        >
          <div className="flex items-center justify-between bg-accent px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="text-xl">🐶</span>
              <p className="font-bold">하얀개마을 챗봇</p>
            </div>
            <button
              type="button"
              className="rounded-full px-2 py-1 text-lg hover:bg-white/20"
              onClick={() => {
                setOpen(false);
                reset();
              }}
              aria-label="닫기"
            >
              ×
            </button>
          </div>

          <div className="max-h-[60dvh] space-y-3 overflow-y-auto p-4 text-sm">
            <div className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,white_82%,var(--accent-2))] px-3 py-2 text-[var(--text)]">
              안녕하세요! 원하시는 메뉴를 골라주세요.
            </div>

            {banner ? (
              <div className="rounded-2xl bg-green-50 px-3 py-2 text-sm font-semibold text-green-800">
                {banner}
              </div>
            ) : null}

            {flow.step === "menu" ? (
              <div className="grid gap-2">
                {(
                  [
                    ["adoption", "분양 상담"],
                    ["hotel", "호텔 예약"],
                    ["grooming", "미용 예약"],
                  ] as const
                ).map(([kind, label]) => (
                  <button
                    key={kind}
                    type="button"
                    className="rounded-2xl border border-[var(--border)] bg-white px-3 py-3 text-left font-semibold text-[var(--text)] hover:bg-[color-mix(in_srgb,white_80%,var(--accent-2))]"
                    onClick={() => setFlow({ step: "reserve", kind })}
                  >
                    {label}
                  </button>
                ))}
                <button
                  type="button"
                  className="rounded-2xl border border-[var(--border)] bg-white px-3 py-3 text-left font-semibold text-[var(--text)] hover:bg-[color-mix(in_srgb,white_80%,var(--accent-2))]"
                  onClick={() => setFlow({ step: "inquiry" })}
                >
                  기타 문의
                </button>
              </div>
            ) : null}

            {flow.step === "reserve" ? (
              <div className="space-y-3">
                <button
                  type="button"
                  className="text-xs text-muted underline"
                  onClick={() => setFlow({ step: "menu" })}
                >
                  ← 메뉴로
                </button>
                <label className="grid gap-1 text-xs font-semibold">
                  이름
                  <input
                    className="rounded-xl border border-[var(--border)] px-3 py-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label className="grid gap-1 text-xs font-semibold">
                  연락처
                  <input
                    inputMode="tel"
                    className="rounded-xl border border-[var(--border)] px-3 py-2"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>
                <label className="grid gap-1 text-xs font-semibold">
                  반려동물 정보
                  <input
                    className="rounded-xl border border-[var(--border)] px-3 py-2"
                    value={pet}
                    onChange={(e) => setPet(e.target.value)}
                  />
                </label>
                <label className="grid gap-1 text-xs font-semibold">
                  희망 일시
                  <input
                    type="datetime-local"
                    className="rounded-xl border border-[var(--border)] px-3 py-2"
                    value={when}
                    onChange={(e) => setWhen(e.target.value)}
                  />
                </label>
                <label className="grid gap-1 text-xs font-semibold">
                  요청사항
                  <textarea
                    rows={3}
                    className="rounded-xl border border-[var(--border)] px-3 py-2"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </label>
                <button
                  type="button"
                  disabled={loading || !name || !phone}
                  onClick={() => submitReservation(flow.kind)}
                  className="w-full rounded-full bg-accent py-3 text-sm font-bold text-white disabled:opacity-50"
                >
                  {loading ? "전송 중…" : "접수하기"}
                </button>
              </div>
            ) : null}

            {flow.step === "inquiry" ? (
              <div className="space-y-3">
                <button
                  type="button"
                  className="text-xs text-muted underline"
                  onClick={() => setFlow({ step: "menu" })}
                >
                  ← 메뉴로
                </button>
                <label className="grid gap-1 text-xs font-semibold">
                  이름
                  <input
                    className="rounded-xl border border-[var(--border)] px-3 py-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label className="grid gap-1 text-xs font-semibold">
                  연락처
                  <input
                    inputMode="tel"
                    className="rounded-xl border border-[var(--border)] px-3 py-2"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>
                <label className="grid gap-1 text-xs font-semibold">
                  문의 내용
                  <textarea
                    rows={4}
                    className="rounded-xl border border-[var(--border)] px-3 py-2"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </label>
                <button
                  type="button"
                  disabled={loading || !name || !phone}
                  onClick={() => submitInquiry()}
                  className="w-full rounded-full bg-accent py-3 text-sm font-bold text-white disabled:opacity-50"
                >
                  {loading ? "전송 중…" : "문의 보내기"}
                </button>
              </div>
            ) : null}
          </div>

          <div className="border-t border-[var(--border)] px-3 py-2 text-center text-[11px] text-muted">
            메시지는 내부 접수용으로만 사용됩니다.
          </div>
        </div>
      ) : null}
    </>
  );
}
