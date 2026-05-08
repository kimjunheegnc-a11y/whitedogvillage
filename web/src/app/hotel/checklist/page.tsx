import Link from "next/link";
import { BookingTeaser } from "@/components/service/BookingTeaser";
import { ProseBlock } from "@/components/service/ProseBlock";

export default function HotelChecklistPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr,300px]">
        <ProseBlock title="입실 체크리스트" eyebrow="CHECK">
          <ul>
            <li>사료·간식(분할 포장)과 급여 시간표</li>
            <li>복용 약·영양제(용량·시간)</li>
            <li>목줄·하네스·인식표</li>
            <li>케이지/이동가방 익숙도</li>
            <li>스트레스 요인(소음·낯선 개) 메모</li>
          </ul>
          <p>준비물이 많을 경우 입실 전날 미리 사진으로 보내주시면 동선을 짧게 잡아드릴 수 있어요.</p>
        </ProseBlock>
        <BookingTeaser href="/hotel/book" title="예약" body="체크리스트를 메모에 함께 적어주세요." />
      </div>
      <p className="mt-12 text-center text-sm text-muted">
        <Link href="/hotel" className="font-semibold text-[var(--accent-dark)] hover:underline">
          ← 호텔 안내
        </Link>
      </p>
    </div>
  );
}
