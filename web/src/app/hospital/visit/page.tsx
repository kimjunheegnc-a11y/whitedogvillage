import Link from "next/link";
import { BookingTeaser } from "@/components/service/BookingTeaser";
import { ProseBlock } from "@/components/service/ProseBlock";

export default function HospitalVisitPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr,300px]">
        <ProseBlock title="방문 · 예방" eyebrow="VISIT">
          <p>
            예방접종·항체가 검사는 아이의 연령과 환경에 따라 주기가 달라질 수 있습니다. 외출이 잦다면
            외기생충 예방도 함께 점검해 보세요.
          </p>
          <ul>
            <li>심장사상충·외부기생충 예방</li>
            <li>치석 관리와 구강 검진</li>
            <li>노령견 정기 검진 항목</li>
          </ul>
        </ProseBlock>
        <BookingTeaser href="/hospital/contact" title="문의" body="예방 일정이 궁금하면 남겨주세요." />
      </div>
      <p className="mt-12 text-center text-sm text-muted">
        <Link href="/hospital" className="font-semibold text-[var(--accent-dark)] hover:underline">
          ← 제휴 안내
        </Link>
      </p>
    </div>
  );
}
