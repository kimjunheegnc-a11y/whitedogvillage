import Image from "next/image";
import Link from "next/link";
import { BookingTeaser } from "@/components/service/BookingTeaser";
import { NaturalCard } from "@/components/service/NaturalCard";
import { ProseBlock } from "@/components/service/ProseBlock";
import { loadContentMap } from "@/lib/content-load";
import { asText } from "@/lib/json-content";
import { KAKAO_PLACEHOLDER_HREF } from "@/lib/constants";
import { stock } from "@/lib/stock-photos";

export default async function BunyangOverviewPage() {
  const map = await loadContentMap();
  const intro = asText(
    map["page_bunyang_intro"],
    "책임 있는 분양을 위해 상담·관리 기록을 투명하게 안내드립니다."
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr,300px] lg:items-start">
        <div className="space-y-10">
          <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-sm">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative min-h-[260px] w-full md:min-h-[320px]">
                <Image src={stock.puppy} alt="강아지" fill className="object-cover" priority />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-dark)]">분양 소개</p>
                <h2 className="mt-2 text-2xl font-extrabold text-[var(--text)]">사랑으로 연결하는 분양</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{intro}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["#365일", "#전문분양", "#건강검진", "#책임분양"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[color-mix(in_srgb,var(--accent-2)_55%,white)] px-3 py-1 text-xs font-semibold text-[var(--text)] ring-1 ring-[var(--border)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/bunyang/book"
                    className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-bold text-white shadow hover:bg-accent-dark"
                  >
                    상담·예약
                  </Link>
                  <a
                    href={KAKAO_PLACEHOLDER_HREF}
                    className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-bold text-[var(--text)] hover:bg-[color-mix(in_srgb,white_70%,var(--accent-2))]"
                  >
                    카카오 상담
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="wave-divider" aria-hidden />

          <div>
            <h2 className="text-xl font-extrabold text-[var(--text)]">더 알아보기</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <NaturalCard
                href="/bunyang/health"
                title="건강 · 검진"
                summary="기본 검진·접종 기록 확인과 분양 후 케어 팁을 정리했습니다."
                imageSrc={stock.vet}
                imageAlt="건강 상담"
              />
              <NaturalCard
                href="/bunyang/responsible"
                title="책임 분양"
                summary="상담·계약·사후 관리까지 단계별로 안내드립니다."
                imageSrc={stock.dogCat}
                imageAlt="반려동물"
              />
              <NaturalCard
                href="/bunyang/book"
                title="상담 예약"
                summary="가정 환경·케어 경험을 남겨주시면 맞춤 상담이 가능합니다."
                imageSrc={stock.kitten}
                imageAlt="고양이"
              />
            </div>
          </div>

          <ProseBlock title="상담이 중요한 이유" eyebrow="NOTE">
            <p>
              분양은 한 번의 선택이 아니라 오랜 동행의 시작입니다. 생활 패턴·알러지·거주 환경을 함께
              점검해 아이와 가족 모두가 편안한 결정을 돕습니다.
            </p>
          </ProseBlock>
        </div>
        <BookingTeaser
          href="/bunyang/book"
          title="분양 상담 예약"
          body="관심 있는 아이의 정보와 방문 가능 일정을 남겨주세요."
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
