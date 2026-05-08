import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";
import { ProseBlock } from "@/components/service/ProseBlock";

export default function SnacksContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <ProseBlock title="문의" eyebrow="CONTACT">
        <p>
          입고 문의·단가 확인은 아래 폼 또는 우측 하단 <strong>+ 챗봇</strong>으로 남겨주세요. 전화로도
          빠르게 안내드립니다.
        </p>
      </ProseBlock>
      <div className="mt-8">
        <InquiryForm category="간식·사료 문의" title="상품·입고 문의" />
      </div>
      <p className="mt-10 text-center text-sm text-muted">
        <Link href="/snacks" className="font-semibold text-[var(--accent-dark)] hover:underline">
          ← 매장 안내
        </Link>
      </p>
    </div>
  );
}
