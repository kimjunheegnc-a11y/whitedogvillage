import Image from "next/image";
import Link from "next/link";
import { BookingTeaser } from "@/components/service/BookingTeaser";
import { NaturalCard } from "@/components/service/NaturalCard";
import { ProseBlock } from "@/components/service/ProseBlock";
import { loadContentMap } from "@/lib/content-load";
import { asText } from "@/lib/json-content";
import { KAKAO_PLACEHOLDER_HREF } from "@/lib/constants";
import { stock } from "@/lib/stock-photos";

export default async function HotelOverviewPage() {
  const map = await loadContentMap();
  const intro = asText(
    map["page_hotel_intro"],
    "안전한 케이지·넓은 놀이 공간에서 하루 리듬에 맞춰 돌봄을 제공합니다."
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr,300px] lg:items-start">
        <div className="space-y-10">
          <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-sm">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative min-h-[260px] w-full md:min-h-[320px]">
                <Image src={stock.hotelDog} alt="호텔링 돌봄" fill className="object-cover" priority />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-dark)]">호텔 안내</p>
                <h2 className="mt-2 text-2xl font-extrabold text-[var(--text)]">편안한 하루 루틴</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{intro}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/hotel/book"
                    className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-bold text-white shadow hover:bg-accent-dark"
                  >
                    숙박 예약
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
            <h2 className="text-xl font-extrabold text-[var(--text)]">호텔링 가이드</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <NaturalCard
                href="/hotel/day"
                title="하루 돌봄 타임라인"
                summary="산책·급식·휴식·플레이 타임을 어떻게 배치하는지 안내드려요."
                imageSrc={stock.dogCat}
                imageAlt="강아지와 고양이"
              />
              <NaturalCard
                href="/hotel/checklist"
                title="입실 체크리스트"
                summary="사료·약·인식표·케이지 익숙도 등 미리 준비하면 체크인이 빨라져요."
                imageSrc={stock.dogHappy}
                imageAlt="산책하는 강아지"
              />
              <NaturalCard
                href="/hotel/book"
                title="예약 안내"
                summary="기간·픽업 시간·특이사항을 남겨주세요. 챗봇으로도 접수됩니다."
                imageSrc={stock.puppy}
                imageAlt="강아지"
              />
            </div>
          </div>

          <ProseBlock title="케어 철학" eyebrow="HOTEL">
            <p>
              호텔은 &apos;맡기는 곳&apos;이 아니라 아이가 익숙한 리듬을 최대한 유지하는 공간이라고 생각합니다.
              첫날은 적응 시간을 충분히 가지며, 식사·배변 패턴을 기록해 드립니다.
            </p>
          </ProseBlock>
        </div>
        <BookingTeaser
          href="/hotel/book"
          title="호텔 예약"
          body="입실·퇴실 시간과 급여 지침을 적어주시면 맞춤 돌봄에 반영됩니다."
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
