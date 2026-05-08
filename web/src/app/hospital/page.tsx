import Image from "next/image";
import Link from "next/link";
import { BookingTeaser } from "@/components/service/BookingTeaser";
import { NaturalCard } from "@/components/service/NaturalCard";
import { ProseBlock } from "@/components/service/ProseBlock";
import { loadContentMap } from "@/lib/content-load";
import { asText } from "@/lib/json-content";
import { DEFAULT_PHONE, KAKAO_PLACEHOLDER_HREF, MOBILE_PHONE } from "@/lib/constants";
import { stock } from "@/lib/stock-photos";

export default async function HospitalOverviewPage() {
  const map = await loadContentMap();
  const intro = asText(
    map["page_hospital_intro"],
    "제휴 동물병원과 협력해 예방접종·건강검진 경로를 안내합니다."
  );
  const phone = asText(map["phone"], DEFAULT_PHONE);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr,300px] lg:items-start">
        <div className="space-y-10">
          <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-sm">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative min-h-[240px] w-full md:min-h-[300px]">
                <Image src={stock.vet} alt="건강 상담" fill className="object-cover" priority />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-dark)]">제휴 안내</p>
                <h2 className="mt-2 text-2xl font-extrabold text-[var(--text)]">건강은 예방이 먼저예요</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{intro}</p>
                <p className="mt-4 rounded-2xl bg-[color-mix(in_srgb,var(--accent-2)_40%,white)] p-4 text-sm ring-1 ring-[var(--border)]">
                  긴급 연락: <span className="font-bold">{phone}</span> ·{" "}
                  <span className="font-bold">{MOBILE_PHONE}</span>
                  <br />
                  <a href={KAKAO_PLACEHOLDER_HREF} className="font-bold text-[var(--accent-dark)] underline">
                    카카오톡
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="wave-divider" aria-hidden />

          <div>
            <h2 className="text-xl font-extrabold text-[var(--text)]">안내 더보기</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <NaturalCard
                href="/hospital/visit"
                title="방문 · 예방"
                summary="접종 스케줄·심장사상충 예방·구충 주기를 정리했습니다."
                imageSrc={stock.dogHappy}
                imageAlt="건강한 강아지"
              />
              <NaturalCard
                href="/hospital/emergency"
                title="응급 안내"
                summary="응급 신호와 이동 전 준비물을 안내드립니다."
                imageSrc={stock.puppy}
                imageAlt="강아지"
              />
              <NaturalCard
                href="/hospital/contact"
                title="문의"
                summary="제휴·진료 경로 관련 질문을 남겨주세요."
                imageSrc={stock.vet}
                imageAlt="상담"
              />
            </div>
          </div>

          <ProseBlock title="진료 연계 안내" eyebrow="NOTE">
            <p>
              본 페이지의 이미지는 이해를 돕기 위한 스톡 사진입니다. 실제 제휴 병원 정보는 전화·방문 상담 시
              안내드립니다.
            </p>
          </ProseBlock>
        </div>
        <BookingTeaser
          href="/hospital/contact"
          title="병원 문의"
          body="연락 가능한 시간대를 함께 적어주시면 빠르게 회신드립니다."
        />
      </div>
      <p className="mt-12 text-center text-sm text-muted">
        <Link href="/" className="font-semibold text-[var(--accent-dark)] hover:underline">
          ← 홈으로
        </Link>
      </p>
    </div>
  );
}
