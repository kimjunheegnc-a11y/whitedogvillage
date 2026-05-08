import Link from "next/link";
import { BookingTeaser } from "@/components/service/BookingTeaser";
import { ProseBlock } from "@/components/service/ProseBlock";
import { DEFAULT_PHONE, MOBILE_PHONE } from "@/lib/constants";

export default function HospitalEmergencyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr,300px]">
        <ProseBlock title="응급 안내" eyebrow="EMERGENCY">
          <p>
            응급 상황에서는 <strong>즉시 전화</strong>가 가장 빠릅니다.{" "}
            <span className="font-bold">{DEFAULT_PHONE}</span> /{" "}
            <span className="font-bold">{MOBILE_PHONE}</span>
          </p>
          <ul>
            <li>호흡이 가쁘거나 잇몸이 하얗게 변하는 경우</li>
            <li>구토·설사가 반복되고 기운이 없는 경우</li>
            <li>외상·낙상 후 다리를 절거나 소리에 과민한 경우</li>
          </ul>
          <p>이동 중에는 안전하게 고정하고, 가능하면 최근 급여·약 복용 기록을 준비해 주세요.</p>
        </ProseBlock>
        <BookingTeaser href="/hospital/contact" title="문의" body="비응급 문의는 폼으로도 남겨주세요." />
      </div>
      <p className="mt-12 text-center text-sm text-muted">
        <Link href="/hospital" className="font-semibold text-[var(--accent-dark)] hover:underline">
          ← 제휴 안내
        </Link>
      </p>
    </div>
  );
}
