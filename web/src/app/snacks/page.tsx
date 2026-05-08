import Image from "next/image";
import Link from "next/link";
import { BookingTeaser } from "@/components/service/BookingTeaser";
import { NaturalCard } from "@/components/service/NaturalCard";
import { ProseBlock } from "@/components/service/ProseBlock";
import { loadContentMap } from "@/lib/content-load";
import { asText } from "@/lib/json-content";
import { stock } from "@/lib/stock-photos";

export default async function SnacksOverviewPage() {
  const map = await loadContentMap();
  const intro = asText(
    map["page_snacks_intro"],
    "대용량 간식·사료부터 덴탈껌까지 매장에서 골라보실 수 있습니다."
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr,300px] lg:items-start">
        <div className="space-y-10">
          <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-sm">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative min-h-[240px] w-full md:min-h-[300px]">
                <Image src={stock.treats} alt="간식" fill className="object-cover" priority />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-dark)]">매장 안내</p>
                <h2 className="mt-2 text-2xl font-extrabold text-[var(--text)]">매장에서 천천히 고르기</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{intro}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["#대용량간식", "#사료", "#애견용품"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[color-mix(in_srgb,var(--accent-2)_55%,white)] px-3 py-1 text-xs font-semibold text-[var(--text)] ring-1 ring-[var(--border)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="wave-divider" aria-hidden />

          <div>
            <h2 className="text-xl font-extrabold text-[var(--text)]">추천 코너</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <NaturalCard
                href="/snacks/picks"
                title="추천 간식 · 사료"
                summary="저알러지·노령·소형견까지 상황별로 고를 수 있는 라인업을 소개합니다."
                imageSrc={stock.kibble}
                imageAlt="사료"
              />
              <NaturalCard
                href="/snacks/tips"
                title="급여 · 보관 팁"
                summary="칼로리 조절·습기 관리·간식 급여 타이밍을 정리했습니다."
                imageSrc={stock.bowls}
                imageAlt="밥그릇"
              />
              <NaturalCard
                href="/snacks/contact"
                title="입고 문의"
                summary="찾으시는 제품이 있다면 남겨주세요. 챗봇으로도 접수됩니다."
                imageSrc={stock.treats}
                imageAlt="간식"
              />
            </div>
          </div>

          <ProseBlock title="매장 이용 팁" eyebrow="STORE">
            <p>대용량 제품은 개봉 전 상태를 확인해 드리니, 필요하면 직원에게 말씀해 주세요.</p>
          </ProseBlock>
        </div>
        <BookingTeaser
          href="/snacks/contact"
          title="문의 · 입고"
          body="제품명·브랜드·수량을 남겨주시면 확인 후 연락드립니다."
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
