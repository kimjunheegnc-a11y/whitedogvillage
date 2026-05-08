import Link from "next/link";
import { BookingTeaser } from "@/components/service/BookingTeaser";
import { ProseBlock } from "@/components/service/ProseBlock";

export default function GroomingSafetyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr,300px] lg:items-start">
        <div className="space-y-8">
          <ProseBlock title="위생 · 안내" eyebrow="SAFETY">
            <p>
              미용 도구는 <strong>1견 1소독</strong> 원칙으로 관리합니다. 공용 타월·매트는 교체 주기를
              짧게 가져가며, 알러지 이력이 있는 경우 별도 도구를 준비합니다.
            </p>
            <p>
              미용 중 무리한 고정은 피하고, 스트레스 신호(과호흡, 헥헥거림)가 보이면 잠시 휴식을 취합니다.
              노령견·심장 질환 이력이 있다면 예약 시 꼭 알려주세요.
            </p>
            <ul>
              <li>예약 변경은 최소 하루 전 연락 부탁드립니다.</li>
              <li>공격성이 강한 경우, 안전을 위해 미용이 제한될 수 있습니다.</li>
              <li>외이염·피부병 의심 시, 진료 연계를 안내드릴 수 있습니다.</li>
            </ul>
          </ProseBlock>
        </div>
        <BookingTeaser
          href="/grooming/book"
          title="예약하기"
          body="컨디션·약 복용 여부를 메모에 적어주시면 케어 계획에 반영됩니다."
        />
      </div>
      <p className="mt-12 text-center text-sm text-muted">
        <Link href="/grooming" className="font-semibold text-[var(--accent-dark)] hover:underline">
          ← 미용 안내
        </Link>
      </p>
    </div>
  );
}
