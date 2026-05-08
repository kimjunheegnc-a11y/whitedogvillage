import Link from "next/link";
import { ReservationForm } from "@/components/ReservationForm";
import { ProseBlock } from "@/components/service/ProseBlock";
import { KAKAO_CHAT_HREF, MOBILE_PHONE } from "@/lib/constants";

export default function GroomingBookPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <ProseBlock title="미용 예약" eyebrow="BOOK">
        <p>
          아래 폼으로 접수해 주시면 확인 후 연락드립니다. 급하신 경우{" "}
          <a href={`tel:${MOBILE_PHONE.replace(/-/g, "")}`} className="font-bold text-[var(--accent-dark)] underline">
            {MOBILE_PHONE}
          </a>{" "}
          또는{" "}
          <a href={KAKAO_CHAT_HREF} className="font-bold text-[var(--accent-dark)] underline">
            카카오톡
          </a>
          도 함께 확인해 주세요.
        </p>
        <p className="text-sm">
          우측 하단 <strong>+ 챗봇</strong>에서도 동일하게 예약 접수가 가능합니다.
        </p>
      </ProseBlock>
      <div className="mt-8">
        <ReservationForm type="grooming" title="미용 예약 접수" />
      </div>
      <p className="mt-10 text-center text-sm text-muted">
        <Link href="/grooming" className="font-semibold text-[var(--accent-dark)] hover:underline">
          ← 미용 안내
        </Link>
      </p>
    </div>
  );
}
