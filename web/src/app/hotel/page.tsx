import Image from "next/image";
import Link from "next/link";
import { MiniCalendar } from "@/components/hotel/MiniCalendar";
import { PlateCard, PlateSection } from "@/components/ui/PlateSection";
import { stock } from "@/lib/stock-photos";

function demoAvailableDays() {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const last = new Date(y, m + 1, 0).getDate();
  const out = [];
  for (let d = 2; d <= last; d += 1) {
    if (d % 7 === 2 || d % 7 === 3 || d % 7 === 4) out.push(d);
  }
  return out;
}

export default function HotelPage() {
  const avail = demoAvailableDays();

  return (
    <div className="mx-auto max-w-5xl space-y-20 px-4 py-14">
      <PlateSection
        id="space"
        eyebrow="SPACE"
        title="호텔 공간 소개"
        description="쾌적한 바닥재·환기·카메라 안내 구역으로 구성했습니다."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[var(--border)]">
            <Image src={stock.hotelRoom} alt="호텔 런" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[var(--border)]">
            <Image src={stock.hotelPlay} alt="놀이 공간" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
          </div>
        </div>
      </PlateSection>

      <PlateSection
        id="routine"
        eyebrow="DAY"
        title="하루 루틴"
        description="체크인 후 급식·산책·휴식 리듬을 맞춥니다."
      >
        <PlateCard>
          <ol className="space-y-4 text-sm text-muted">
            {[
              ["09:00", "체크인 · 건강 상태 확인"],
              ["10:30", "산책 · 배변"],
              ["12:30", "급식(사료 지참 시)"],
              ["15:00", "실내놀이 · 휴식"],
              ["18:00", "저녁 산책"],
              ["21:00", "취침 전 물·배변"],
            ].map(([t, s]) => (
              <li key={t} className="flex gap-4 border-b border-[var(--border)] border-opacity-60 pb-3 last:border-0">
                <span className="w-14 shrink-0 font-bold text-[var(--text)]">{t}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </PlateCard>
      </PlateSection>

      <PlateSection
        id="care"
        eyebrow="CARE"
        title="실시간 케어"
        description="투숙 중 사진·영상을 짧게 공유해 드립니다. (서비스 범위는 상담 시 안내)"
      >
        <PlateCard>
          <p className="text-sm leading-relaxed text-muted">
            급식·배변·활동량을 기록해 퇴실 시 한눈에 전달드립니다. 이상 징후가 보이면 바로 연락드리는 것을 원칙으로
            합니다.
          </p>
        </PlateCard>
      </PlateSection>

      <PlateSection id="price" eyebrow="PRICE" title="가격" description="체급·일수에 따라 달라지며 상담 후 확정됩니다.">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { n: "소형", p: "4만 원대~/박", d: "7kg 미만 기준" },
            { n: "중형", p: "5만 원대~/박", d: "7–15kg" },
            { n: "대형", p: "별도 문의", d: "15kg 초과" },
          ].map((x) => (
            <PlateCard key={x.n} className="!p-5">
              <p className="text-xs font-semibold text-muted">{x.n}</p>
              <p className="mt-2 text-lg font-bold">{x.p}</p>
              <p className="mt-2 text-xs text-muted">{x.d}</p>
            </PlateCard>
          ))}
        </div>
      </PlateSection>

      <PlateSection
        id="checklist"
        eyebrow="CHECKLIST"
        title="준비물 · 안내"
        description="입실 전 체크리스트입니다."
      >
        <PlateCard>
          <ul className="list-disc space-y-2 pl-4 text-sm text-muted">
            <li>평소 먹는 사료·간식 (급성 위장 이슈 방지)</li>
            <li>이름표·목줄·입마개(필요 시)</li>
            <li>예방접종 증명서 사본</li>
            <li>복용 중인 약과 용법 메모</li>
          </ul>
        </PlateCard>
      </PlateSection>

      <PlateSection
        id="calendar"
        eyebrow="BOOK"
        title="예약 가능 날짜"
        description="아래는 UI 예시입니다. 실제 예약은 전화·카카오·예약 폼으로 확정합니다."
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          <MiniCalendar availableDays={avail} />
          <PlateCard className="!p-5">
            <p className="text-sm text-muted">
              원하시는 입실·퇴실 일정을 예약 폼에 적어 주세요. 달력에 표시된 날짜는 &ldquo;상담 가능한
              슬롯&rdquo; 예시입니다.
            </p>
            <Link
              href="/hotel/book"
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-accent py-3 text-sm font-semibold shadow-sm hover:bg-accent-dark"
            >
              <span className="text-white">호텔 예약하기</span>
            </Link>
          </PlateCard>
        </div>
      </PlateSection>
    </div>
  );
}
