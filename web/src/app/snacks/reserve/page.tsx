import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";

export default function SnacksReservePage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-14">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-dark)]">RESERVE</p>
      <h2 className="mt-2 text-2xl font-bold text-[var(--text)]">간식 담아두기</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        원하시는 제품명·수량·픽업 희망일을 남겨 주시면 재고 확인 후 연락드립니다.
      </p>
      <InquiryForm category="간식 담아두기" title="간식 픽업 예약" />
      <p className="mt-10 text-center text-sm text-muted">
        <Link href="/snacks" className="font-semibold text-[var(--accent-dark)] hover:underline">
          ← 간식 안내
        </Link>
      </p>
    </div>
  );
}
