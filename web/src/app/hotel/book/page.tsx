import Link from "next/link";
import { ReservationForm } from "@/components/ReservationForm";
import { ProseBlock } from "@/components/service/ProseBlock";
import { KAKAO_CHAT_HREF, MOBILE_PHONE } from "@/lib/constants";

export default function HotelBookPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <ProseBlock title="호텔 예약" eyebrow="BOOK">
        <p>
          급한 일정은{" "}
          <a href={`tel:${MOBILE_PHONE.replace(/-/g, "")}`} className="font-bold text-[var(--accent-dark)] underline">
            {MOBILE_PHONE}
          </a>{" "}
          또는{" "}
          <a href={KAKAO_CHAT_HREF} className="font-bold text-[var(--accent-dark)] underline">
            카카오톡
          </a>
          으로도 연락 주세요. 우측 하단 <strong>+ 챗봇</strong> 예약도 동일하게 접수됩니다.
        </p>
      </ProseBlock>
      <div className="mt-8">
        <ReservationForm type="hotel" title="호텔 예약 접수" />
      </div>
      <p className="mt-10 text-center text-sm text-muted">
        <Link href="/hotel" className="font-semibold text-[var(--accent-dark)] hover:underline">
          ← 호텔 안내
        </Link>
      </p>
    </div>
  );
}
