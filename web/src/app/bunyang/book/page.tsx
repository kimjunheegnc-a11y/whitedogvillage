import Link from "next/link";
import { ReservationForm } from "@/components/ReservationForm";
import { ProseBlock } from "@/components/service/ProseBlock";
import { KAKAO_PLACEHOLDER_HREF, MOBILE_PHONE } from "@/lib/constants";

export default function BunyangBookPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <ProseBlock title="상담 · 예약" eyebrow="BOOK">
        <p>
          전화{" "}
          <a href={`tel:${MOBILE_PHONE.replace(/-/g, "")}`} className="font-bold text-[var(--accent-dark)] underline">
            {MOBILE_PHONE}
          </a>
          , 카카오톡, 우측 하단 <strong>+ 챗봇</strong>으로도 동일하게 접수됩니다.
        </p>
        <p className="text-sm">
          <a href={KAKAO_PLACEHOLDER_HREF} className="font-bold text-[var(--accent-dark)] underline">
            카카오톡 상담
          </a>
        </p>
      </ProseBlock>
      <div className="mt-8">
        <ReservationForm type="adoption" title="분양 상담·예약 접수" />
      </div>
      <p className="mt-10 text-center text-sm text-muted">
        <Link href="/bunyang" className="font-semibold text-[var(--accent-dark)] hover:underline">
          ← 분양 소개
        </Link>
      </p>
    </div>
  );
}
