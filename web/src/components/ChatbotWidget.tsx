"use client";

import { useCallback, useState } from "react";
import { KAKAO_CHAT_HREF } from "@/lib/constants";

type ReserveKind = "adoption" | "hotel" | "grooming";
type ReservePhase = "species" | "dog_size" | "age" | "sex_neuter" | "form";

type Flow =
  | { step: "menu" }
  | { step: "inquiry" }
  | { step: "reserve"; kind: ReserveKind; phase: ReservePhase };

const KIND_LABEL: Record<ReserveKind, string> = {
  adoption: "분양 상담",
  hotel: "호텔 예약",
  grooming: "미용 예약",
};

function parseApiError(data: unknown): string {
  if (data && typeof data === "object" && "error" in data) {
    const e = (data as { error: unknown }).error;
    if (typeof e === "string") return e;
  }
  return "전송 실패";
}

function KakaoPromo() {
  const isConfigured = KAKAO_CHAT_HREF.startsWith("http");
  return (
    <div className="rounded-2xl border border-amber-200/80 bg-amber-50 px-3 py-2.5 text-xs leading-snug text-amber-950">
      <p className="font-bold">자세한 상담을 위해 카톡 상담을 해보세요</p>
      <a
        href={KAKAO_CHAT_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex items-center gap-1 font-semibold text-amber-900 underline decoration-amber-700/60 underline-offset-2 hover:text-amber-800"
      >
        카카오톡으로 상담하기 →
      </a>
      {!isConfigured ? (
        <p className="mt-1 text-[10px] text-amber-800/80">
          채널 URL은 <code className="rounded bg-white/60 px-0.5">NEXT_PUBLIC_KAKAO_CHAT_URL</code> 환경 변수에 넣으면 됩니다.
        </p>
      ) : null}
    </div>
  );
}

function buildPetInfo(params: {
  petName: string;
  species: "dog" | "cat" | null;
  dogSize: "small" | "medium" | "large" | null;
  ageText: string;
  sexNeuter: string;
}): string {
  const bits: string[] = [];
  const pn = params.petName.trim();
  if (pn) bits.push(`아이이름:${pn}`);
  if (params.species === "dog") {
    bits.push("종:강아지");
    const sizeLabel =
      params.dogSize === "small"
        ? "소형(~10kg미만)"
        : params.dogSize === "medium"
          ? "중형(약10~25kg)"
          : params.dogSize === "large"
            ? "대형(25kg초과)"
            : "";
    if (sizeLabel) bits.push(`체급:${sizeLabel}`);
  } else if (params.species === "cat") {
    bits.push("종:고양이");
  }
  const age = params.ageText.trim();
  if (age) bits.push(`나이:${age}`);
  if (params.sexNeuter) bits.push(`성별·중성화:${params.sexNeuter}`);
  let out = bits.join(" · ");
  if (out.length > 500) out = `${out.slice(0, 496)}…`;
  return out;
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [flow, setFlow] = useState<Flow>({ step: "menu" });

  const [species, setSpecies] = useState<"dog" | "cat" | null>(null);
  const [dogSize, setDogSize] = useState<"small" | "medium" | "large" | null>(null);
  const [ageText, setAgeText] = useState("");
  const [sexNeuter, setSexNeuter] = useState("");

  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [petName, setPetName] = useState("");
  const [when, setWhen] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);

  const resetWizardFields = useCallback(() => {
    setSpecies(null);
    setDogSize(null);
    setAgeText("");
    setSexNeuter("");
    setOwnerName("");
    setPhone("");
    setPetName("");
    setWhen("");
    setNotes("");
  }, []);

  const reset = useCallback(() => {
    setFlow({ step: "menu" });
    resetWizardFields();
    setBanner(null);
  }, [resetWizardFields]);

  function goBackReserve() {
    if (flow.step !== "reserve") return;
    const { kind, phase } = flow;
    if (phase === "form") {
      setFlow({ step: "reserve", kind, phase: "sex_neuter" });
      return;
    }
    if (phase === "sex_neuter") {
      setFlow({ step: "reserve", kind, phase: "age" });
      return;
    }
    if (phase === "age") {
      if (species === "dog") setFlow({ step: "reserve", kind, phase: "dog_size" });
      else setFlow({ step: "reserve", kind, phase: "species" });
      return;
    }
    if (phase === "dog_size") {
      setFlow({ step: "reserve", kind, phase: "species" });
      return;
    }
    if (phase === "species") {
      resetWizardFields();
      setFlow({ step: "menu" });
    }
  }

  async function submitReservation(kind: ReserveKind) {
    setLoading(true);
    setBanner(null);
    try {
      const preferred_at =
        when.trim().length > 0 ? new Date(when).toISOString() : undefined;
      const pet_info = buildPetInfo({
        petName,
        species,
        dogSize,
        ageText,
        sexNeuter,
      });
      const res = await fetch("/api/submit-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: kind,
          customer_name: ownerName,
          phone,
          pet_info,
          preferred_at,
          notes,
        }),
      });
      const data = (await res.json()) as unknown;
      if (!res.ok) throw new Error(parseApiError(data));
      setBanner("예약이 접수되었습니다!");
      resetWizardFields();
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
          name: ownerName,
          phone,
          message: notes.trim() || "(내용 없음)",
        }),
      });
      const data = (await res.json()) as unknown;
      if (!res.ok) throw new Error(parseApiError(data));
      setBanner("문의가 접수되었습니다!");
      setOwnerName("");
      setPhone("");
      setNotes("");
      setFlow({ step: "menu" });
    } catch (e) {
      setBanner(e instanceof Error ? e.message : "오류");
    } finally {
      setLoading(false);
    }
  }

  const reservePrompt =
    flow.step === "reserve"
      ? flow.phase === "species"
        ? `${KIND_LABEL[flow.kind]} — 강아지와 고양이 중 어떤 아이인가요?`
        : flow.phase === "dog_size"
          ? "체급을 골라주세요 (소·중·대형, kg 기준 안내)"
          : flow.phase === "age"
            ? "나이를 알려주세요 (예: 8개월, 3살)"
            : flow.phase === "sex_neuter"
              ? "성별과 중성화 여부를 골라주세요"
              : "마지막으로 연락처와 문의 내용을 적어주세요"
      : "";

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
              안녕하세요! 상담 분야를 골라주시면, 아이 정보를 간단히 여쭙고 접수 폼으로 연결해 드릴게요.
            </div>

            {banner ? (
              <div className="rounded-2xl bg-green-50 px-3 py-2 text-sm font-semibold text-green-800">{banner}</div>
            ) : null}

            <KakaoPromo />

            {flow.step === "menu" ? (
              <div className="grid gap-2">
                {(["adoption", "hotel", "grooming"] as const).map((kind) => (
                  <button
                    key={kind}
                    type="button"
                    className="rounded-2xl border border-[var(--border)] bg-white px-3 py-3 text-left font-semibold text-[var(--text)] hover:bg-[color-mix(in_srgb,white_80%,var(--accent-2))]"
                    onClick={() => {
                      resetWizardFields();
                      setFlow({ step: "reserve", kind, phase: "species" });
                    }}
                  >
                    {KIND_LABEL[kind]}
                  </button>
                ))}
                <button
                  type="button"
                  className="rounded-2xl border border-[var(--border)] bg-white px-3 py-3 text-left font-semibold text-[var(--text)] hover:bg-[color-mix(in_srgb,white_80%,var(--accent-2))]"
                  onClick={() => {
                    resetWizardFields();
                    setFlow({ step: "inquiry" });
                  }}
                >
                  기타 문의
                </button>
              </div>
            ) : null}

            {flow.step === "reserve" ? (
              <div className="space-y-3">
                <button type="button" className="text-xs text-muted underline" onClick={goBackReserve}>
                  ← 이전
                </button>

                <div className="rounded-2xl border border-[var(--border)] bg-white px-3 py-2 text-xs leading-relaxed text-[var(--text)]">
                  {reservePrompt}
                </div>

                {flow.phase === "species" ? (
                  <div className="grid gap-2">
                    <button
                      type="button"
                      className="rounded-2xl border border-[var(--border)] bg-white px-3 py-3 text-left font-semibold hover:bg-[color-mix(in_srgb,white_80%,var(--accent-2))]"
                      onClick={() => {
                        setSpecies("dog");
                        setDogSize(null);
                        setFlow({ step: "reserve", kind: flow.kind, phase: "dog_size" });
                      }}
                    >
                      강아지
                    </button>
                    <button
                      type="button"
                      className="rounded-2xl border border-[var(--border)] bg-white px-3 py-3 text-left font-semibold hover:bg-[color-mix(in_srgb,white_80%,var(--accent-2))]"
                      onClick={() => {
                        setSpecies("cat");
                        setDogSize(null);
                        setFlow({ step: "reserve", kind: flow.kind, phase: "age" });
                      }}
                    >
                      고양이
                    </button>
                  </div>
                ) : null}

                {flow.phase === "dog_size" ? (
                  <div className="grid gap-2">
                    {(
                      [
                        ["small", "소형견 (~10kg 미만)"],
                        ["medium", "중형견 (약 10~25kg)"],
                        ["large", "대형견 (25kg 초과)"],
                      ] as const
                    ).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        className="rounded-2xl border border-[var(--border)] bg-white px-3 py-3 text-left font-semibold hover:bg-[color-mix(in_srgb,white_80%,var(--accent-2))]"
                        onClick={() => {
                          setDogSize(key);
                          setFlow({ step: "reserve", kind: flow.kind, phase: "age" });
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                ) : null}

                {flow.phase === "age" ? (
                  <div className="space-y-2">
                    <input
                      className="w-full rounded-xl border border-[var(--border)] px-3 py-2"
                      placeholder="예: 1살, 8개월"
                      value={ageText}
                      onChange={(e) => setAgeText(e.target.value)}
                    />
                    <button
                      type="button"
                      disabled={!ageText.trim()}
                      className="w-full rounded-full bg-accent py-2.5 text-sm font-bold text-white disabled:opacity-50"
                      onClick={() => setFlow({ step: "reserve", kind: flow.kind, phase: "sex_neuter" })}
                    >
                      다음
                    </button>
                  </div>
                ) : null}

                {flow.phase === "sex_neuter" ? (
                  <div className="grid gap-2">
                    {(
                      [
                        "수컷 · 중성화 완료",
                        "수컷 · 미중성화",
                        "암컷 · 중성화 완료",
                        "암컷 · 미중성화",
                        "잘 모르겠어요 / 해당 없음",
                      ] as const
                    ).map((label) => (
                      <button
                        key={label}
                        type="button"
                        className="rounded-2xl border border-[var(--border)] bg-white px-3 py-2.5 text-left text-sm font-semibold hover:bg-[color-mix(in_srgb,white_80%,var(--accent-2))]"
                        onClick={() => {
                          setSexNeuter(label);
                          setFlow({ step: "reserve", kind: flow.kind, phase: "form" });
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                ) : null}

                {flow.phase === "form" ? (
                  <div className="space-y-3">
                    <label className="grid gap-1 text-xs font-semibold">
                      보호자 이름
                      <input
                        className="rounded-xl border border-[var(--border)] px-3 py-2"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                      />
                    </label>
                    <label className="grid gap-1 text-xs font-semibold">
                      전화번호
                      <input
                        inputMode="tel"
                        className="rounded-xl border border-[var(--border)] px-3 py-2"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </label>
                    <label className="grid gap-1 text-xs font-semibold">
                      아이 이름
                      <input
                        className="rounded-xl border border-[var(--border)] px-3 py-2"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                      />
                    </label>
                    <label className="grid gap-1 text-xs font-semibold">
                      희망 일시 (선택)
                      <input
                        type="datetime-local"
                        className="rounded-xl border border-[var(--border)] px-3 py-2"
                        value={when}
                        onChange={(e) => setWhen(e.target.value)}
                      />
                    </label>
                    <label className="grid gap-1 text-xs font-semibold">
                      문의 내용
                      <textarea
                        rows={3}
                        className="rounded-xl border border-[var(--border)] px-3 py-2"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="요청사항·질문을 적어주세요"
                      />
                    </label>
                    <button
                      type="button"
                      disabled={loading || !ownerName.trim() || !phone.trim()}
                      onClick={() => submitReservation(flow.kind)}
                      className="w-full rounded-full bg-accent py-3 text-sm font-bold text-white disabled:opacity-50"
                    >
                      {loading ? "전송 중…" : "접수하기"}
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}

            {flow.step === "inquiry" ? (
              <div className="space-y-3">
                <button
                  type="button"
                  className="text-xs text-muted underline"
                  onClick={() => {
                    resetWizardFields();
                    setFlow({ step: "menu" });
                  }}
                >
                  ← 메뉴로
                </button>
                <KakaoPromo />
                <label className="grid gap-1 text-xs font-semibold">
                  이름
                  <input
                    className="rounded-xl border border-[var(--border)] px-3 py-2"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
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
                  disabled={loading || !ownerName.trim() || !phone.trim()}
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
