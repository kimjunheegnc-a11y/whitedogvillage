import Link from "next/link";
import { BookingTeaser } from "@/components/service/BookingTeaser";
import { ProseBlock } from "@/components/service/ProseBlock";

export default function HotelDayPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr,300px]">
        <ProseBlock title="하루 돌봄" eyebrow="DAY">
          <p>
            <strong>오전</strong> 산책과 배변 후 간식·휴식. <strong>오후</strong>에는 놀이 타임과 브러싱,
            저녁 급식 전 가벼운 산책을 배치합니다. 야간에는 조용한 환경에서 휴식을 취하도록 합니다.
          </p>
          <p>노령견·슬개골 이슈가 있다면 활동량을 조절하고, 계단·점프 놀이는 제한합니다.</p>
        </ProseBlock>
        <BookingTeaser href="/hotel/book" title="예약" body="기간에 맞춰 상담 후 일정을 조율해 드립니다." />
      </div>
      <p className="mt-12 text-center text-sm text-muted">
        <Link href="/hotel" className="font-semibold text-[var(--accent-dark)] hover:underline">
          ← 호텔 안내
        </Link>
      </p>
    </div>
  );
}
