import Image from "next/image";
import Link from "next/link";
import { PlateCard, PlateSection } from "@/components/ui/PlateSection";
import { KAKAO_CHAT_HREF, MOBILE_PHONE } from "@/lib/constants";
import { stock } from "@/lib/stock-photos";

export default function HospitalPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-20 px-4 py-14">
      <PlateSection
        id="services"
        eyebrow="CLINIC"
        title="진료 가능 항목"
        description="제휴 병원 기준 예시이며, 실제는 병원 일정에 따라 달라질 수 있습니다."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {["건강검진", "예방접종", "피부·외이", "소화기", "정형 외상", "치과 상담"].map((t) => (
            <PlateCard key={t} className="!py-4 text-center text-sm font-semibold text-[var(--text)]">
              {t}
            </PlateCard>
          ))}
        </div>
      </PlateSection>

      <PlateSection
        id="flow"
        eyebrow="FLOW"
        title="진료 절차"
        description="방문 전 예약을 권장합니다."
      >
        <PlateCard>
          <ol className="list-decimal space-y-3 pl-4 text-sm text-muted">
            <li>전화 또는 카카오로 증상·희망 시간 전달</li>
            <li>접수 후 대기 — 긴급도에 따라 순서 조정</li>
            <li>진료·처방·다음 방문 안내</li>
            <li>수납 및 예약(필요 시)</li>
          </ol>
        </PlateCard>
      </PlateSection>

      <PlateSection id="vet" eyebrow="VET" title="수의사 소개" description="제휴 병원 담당 선생님 프로필 예시입니다.">
        <div className="grid items-center gap-8 md:grid-cols-[240px_1fr]">
          <div className="relative aspect-[3/4] w-full max-w-[240px] overflow-hidden rounded-3xl border border-[var(--border)]">
            <Image src={stock.vetSmile} alt="" fill className="object-cover" sizes="240px" />
          </div>
          <PlateCard>
            <p className="text-sm font-bold text-[var(--text)]">김OO 수의사</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              소동물 임상 경력 기반으로 예방의학·노령견 만성 질환 관리를 담당합니다. (실제 프로필은 제휴 병원 안내에
              따릅니다.)
            </p>
          </PlateCard>
        </div>
      </PlateSection>

      <PlateSection
        id="emergency"
        eyebrow="ER"
        title="응급 안내"
        description="위급 시 먼저 전화해 주세요."
      >
        <PlateCard className="border-rose-100 bg-[color-mix(in_srgb,white_92%,#ffe4e6)]">
          <p className="text-sm font-bold text-rose-900">응급 징후 예시</p>
          <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-rose-900/90">
            <li>호흡 곤란, 의식 저하</li>
            <li>지속 구토·혈변</li>
            <li>외상·낙상 후 보행 이상</li>
          </ul>
          <a
            href={`tel:${MOBILE_PHONE.replace(/-/g, "")}`}
            className="mt-6 inline-flex rounded-2xl bg-rose-700 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-800"
          >
            긴급 연락 {MOBILE_PHONE}
          </a>
        </PlateCard>
      </PlateSection>

      <PlateSection
        id="vaccine"
        eyebrow="VACCINE"
        title="예방접종 안내"
        description="생후 주차·체중에 맞춰 스케줄을 조정합니다."
      >
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl border border-[var(--border)]">
          <Image src={stock.vetExam} alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <PlateCard className="mt-4">
          <ul className="space-y-2 text-sm text-muted">
            <li>종합백신(DHPPL) — 기본 스케줄 병원 안내</li>
            <li>코로나·켄넬코프 등 선택 접종 상담</li>
            <li>접종 후 24시간은 격한 운동 자제</li>
          </ul>
        </PlateCard>
        <p className="mt-10 text-center">
          <Link href="/hospital/contact" className="text-sm font-semibold text-[var(--accent-dark)] hover:underline">
            병원 관련 문의 →
          </Link>
          {" · "}
          <a href={KAKAO_CHAT_HREF} className="text-sm font-semibold text-[var(--accent-dark)] hover:underline">
            카카오톡
          </a>
        </p>
      </PlateSection>
    </div>
  );
}
