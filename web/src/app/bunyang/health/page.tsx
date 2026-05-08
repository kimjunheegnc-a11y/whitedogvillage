import Link from "next/link";
import { BookingTeaser } from "@/components/service/BookingTeaser";
import { ProseBlock } from "@/components/service/ProseBlock";

export default function BunyangHealthPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr,300px]">
        <ProseBlock title="건강 · 검진" eyebrow="HEALTH">
          <p>
            분양 전 기본 건강 상태를 확인하고, 필요 시 수의 상담을 연계합니다. 3개월 이상 아이들은 접종
            스케줄을 안내드리며, 이후 가정에서의 급여·구충 일정도 함께 정리해 드립니다.
          </p>
          <ul>
            <li>구충·심장사상충 예방 안내</li>
            <li>분리불안 완화를 위한 적응 팁</li>
            <li>사료 전환 가이드</li>
          </ul>
        </ProseBlock>
        <BookingTeaser href="/bunyang/book" title="상담 예약" body="건강 관련 질문을 메모에 적어주세요." />
      </div>
      <p className="mt-12 text-center text-sm text-muted">
        <Link href="/bunyang" className="font-semibold text-[var(--accent-dark)] hover:underline">
          ← 분양 소개
        </Link>
      </p>
    </div>
  );
}
