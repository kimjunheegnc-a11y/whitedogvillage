"use client";

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function startWeekday(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

/** 데모: 일부 날짜만 예약 가능 표시 (실제 연동 전 UI) */
export function MiniCalendar({
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
  availableDays,
}: {
  year?: number;
  month?: number;
  /** 해당 월의 '일' 번호 배열 */
  availableDays: number[];
}) {
  const total = daysInMonth(year, month);
  const start = startWeekday(year, month);
  const setAvail = new Set(availableDays);
  const cells: (number | null)[] = [...Array(start).fill(null)];
  for (let d = 1; d <= total; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const label = new Date(year, month).toLocaleDateString("ko-KR", { year: "numeric", month: "long" });

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-white p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-bold text-[var(--text)]">예약 가능 일정</p>
        <p className="text-xs font-medium text-muted">{label}</p>
      </div>
      <p className="mt-1 text-xs text-muted">초록 배경 날짜는 상담·입실 가능으로 표시된 예시입니다.</p>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-muted">
        {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
          <span key={d} className="py-1">
            {d}
          </span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1 text-center text-sm">
        {cells.map((d, i) => {
          if (d === null) return <span key={`e-${i}`} className="aspect-square rounded-xl" />;
          const ok = setAvail.has(d);
          return (
            <span
              key={d}
              className={[
                "flex aspect-square items-center justify-center rounded-xl font-medium",
                ok
                  ? "bg-[color-mix(in_srgb,var(--accent-2)_70%,#ecfdf5)] text-[var(--text)] ring-1 ring-emerald-200/60"
                  : "text-muted/70",
              ].join(" ")}
            >
              {d}
            </span>
          );
        })}
      </div>
    </div>
  );
}
