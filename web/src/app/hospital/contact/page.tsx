import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";
import { ProseBlock } from "@/components/service/ProseBlock";

export default function HospitalContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <ProseBlock title="문의" eyebrow="CONTACT">
        <p>
          제휴·진료 경로 관련 질문은 아래 폼 또는 우측 하단 <strong>+ 챗봇</strong>으로 남겨주세요.
        </p>
      </ProseBlock>
      <div className="mt-8">
        <InquiryForm category="병원 문의" title="병원 관련 문의 남기기" />
      </div>
      <p className="mt-10 text-center text-sm text-muted">
        <Link href="/hospital" className="font-semibold text-[var(--accent-dark)] hover:underline">
          ← 제휴 안내
        </Link>
      </p>
    </div>
  );
}
