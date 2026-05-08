import Link from "next/link";
import { AdoptionPuppyCards } from "@/components/bunyang/AdoptionPuppyCards";
import { PlateCard, PlateSection } from "@/components/ui/PlateSection";
import { ADOPTION_PUPPIES } from "@/lib/adoption-puppies";
import { KAKAO_PLACEHOLDER_HREF } from "@/lib/constants";

export default function BunyangPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-20 px-4 py-14">
      <PlateSection
        eyebrow="LISTING"
        title="분양 아이들"
        description="데모용 예시 카드 4건입니다. 실제 분양 시에는 사진·검진 기록이 업데이트됩니다."
      >
        <AdoptionPuppyCards puppies={ADOPTION_PUPPIES} />
      </PlateSection>

      <PlateSection
        id="process"
        eyebrow="PROCESS"
        title="분양 프로세스"
        description="상담부터 입가까지 단계를 투명하게 안내합니다."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["1", "사전 상담", "가정 환경·알러지·케어 경험 확인"],
            ["2", "만남", "아이 성향·건강 기록 확인"],
            ["3", "계약", "책임 분양 조건·사후 케어 안내"],
            ["4", "입가 후", "적응 기간 체크리스트 제공"],
          ].map(([n, t, d]) => (
            <PlateCard key={n} className="!p-5">
              <span className="text-xs font-bold text-[var(--accent-dark)]">STEP {n}</span>
              <p className="mt-2 text-base font-bold text-[var(--text)]">{t}</p>
              <p className="mt-2 text-sm text-muted">{d}</p>
            </PlateCard>
          ))}
        </div>
      </PlateSection>

      <PlateSection
        id="health"
        eyebrow="HEALTH"
        title="건강 관리"
        description="분양 전·후 건강 관리 포인트입니다."
      >
        <PlateCard>
          <ul className="list-disc space-y-2 pl-4 text-sm text-muted">
            <li>기본 접종·기생충 예방 기록 제공</li>
            <li>분양 직후 2주는 급격한 사료 변경 자제</li>
            <li>이상 징후 시 제휴 병원 동선 안내</li>
          </ul>
        </PlateCard>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/bunyang/book"
            className="inline-flex items-center justify-center rounded-2xl bg-accent px-8 py-3.5 text-sm font-semibold shadow-sm hover:bg-accent-dark"
          >
            <span className="text-white">상담·예약</span>
          </Link>
          <a
            href={KAKAO_PLACEHOLDER_HREF}
            className="inline-flex rounded-2xl border border-[var(--border)] bg-white px-8 py-3.5 text-sm font-semibold hover:bg-[color-mix(in_srgb,white_92%,var(--accent-2))]"
          >
            카카오톡
          </a>
        </div>
      </PlateSection>
    </div>
  );
}
