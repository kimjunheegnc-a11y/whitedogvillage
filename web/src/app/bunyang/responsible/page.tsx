import Link from "next/link";
import { BookingTeaser } from "@/components/service/BookingTeaser";
import { ProseBlock } from "@/components/service/ProseBlock";

export default function BunyangResponsiblePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr,300px]">
        <ProseBlock title="책임 분양" eyebrow="RESPONSIBLE">
          <p>
            상담 → 방문 → 계약 순으로 진행하며, 가정 환경 점검을 통해 아이에게 맞는지 확인합니다. 분양 후
            일정 기간 내 문의 채널을 열어 두어 급한 상황에서도 연결될 수 있도록 합니다.
          </p>
          <p>문의는 우측 하단 챗봇 또는 예약 폼으로 남겨주시면 순차적으로 연락드립니다.</p>
        </ProseBlock>
        <BookingTeaser href="/bunyang/book" title="상담 예약" body="가족 구성·반려 경험을 적어주세요." />
      </div>
      <p className="mt-12 text-center text-sm text-muted">
        <Link href="/bunyang" className="font-semibold text-[var(--accent-dark)] hover:underline">
          ← 분양 소개
        </Link>
      </p>
    </div>
  );
}
