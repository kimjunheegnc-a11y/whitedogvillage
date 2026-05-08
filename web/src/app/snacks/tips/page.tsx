import Link from "next/link";
import { BookingTeaser } from "@/components/service/BookingTeaser";
import { ProseBlock } from "@/components/service/ProseBlock";

export default function SnacksTipsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr,300px]">
        <ProseBlock title="급여 · 보관 팁" eyebrow="TIPS">
          <ul>
            <li>간식 칼로리는 하루 급여의 10% 내외로 조절해 보세요.</li>
            <li>대용량 제품은 밀봉 후 서늘한 곳에 보관하면 산패를 늦출 수 있어요.</li>
            <li>사료 전환은 7~10일에 걸쳐 점진적으로 섞어 주세요.</li>
          </ul>
        </ProseBlock>
        <BookingTeaser href="/snacks/contact" title="문의" body="특정 제품 보관법이 궁금하면 남겨주세요." />
      </div>
      <p className="mt-12 text-center text-sm text-muted">
        <Link href="/snacks" className="font-semibold text-[var(--accent-dark)] hover:underline">
          ← 매장 안내
        </Link>
      </p>
    </div>
  );
}
