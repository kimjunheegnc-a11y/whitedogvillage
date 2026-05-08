import Link from "next/link";
import { BookingTeaser } from "@/components/service/BookingTeaser";
import { ProseBlock } from "@/components/service/ProseBlock";
import Image from "next/image";
import { stock } from "@/lib/stock-photos";

export default function SnacksPicksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr,300px]">
        <div className="space-y-8">
          <ProseBlock title="추천 간식 · 사료" eyebrow="PICKS">
            <p>
              사진은 이해를 돕기 위한 예시 이미지(Unsplash)입니다. 실제 매장 라인업은 시즌·입고에 따라
              달라질 수 있어요.
            </p>
          </ProseBlock>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white shadow-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image src={stock.treats} alt="간식 예시" fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[var(--text)]">저자극 간식 라인</h3>
                <p className="mt-2 text-sm text-muted">단백질 원료·알러지 표기를 확인하며 골라보세요.</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white shadow-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image src={stock.kibble} alt="사료 예시" fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[var(--text)]">사료 선택 가이드</h3>
                <p className="mt-2 text-sm text-muted">체중·활동량에 맞춰 급여량을 조절하는 방법을 안내합니다.</p>
              </div>
            </div>
          </div>
        </div>
        <BookingTeaser href="/snacks/contact" title="입고 문의" body="관심 제품명을 적어주세요." />
      </div>
      <p className="mt-12 text-center text-sm text-muted">
        <Link href="/snacks" className="font-semibold text-[var(--accent-dark)] hover:underline">
          ← 매장 안내
        </Link>
      </p>
    </div>
  );
}
