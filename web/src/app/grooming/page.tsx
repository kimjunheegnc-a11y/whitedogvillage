import Image from "next/image";
import Link from "next/link";
import { BookingTeaser } from "@/components/service/BookingTeaser";
import { NaturalCard } from "@/components/service/NaturalCard";
import { ProseBlock } from "@/components/service/ProseBlock";
import { loadContentMap } from "@/lib/content-load";
import { asText } from "@/lib/json-content";
import { KAKAO_PLACEHOLDER_HREF } from "@/lib/constants";
import { stock } from "@/lib/stock-photos";

export default async function GroomingOverviewPage() {
  const map = await loadContentMap();
  const intro = asText(
    map["page_grooming_intro"],
    "전문 미용사가 아이의 피모 상태와 체형에 맞춰 부드럽게 케어합니다."
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr,300px] lg:items-start">
        <div className="space-y-10">
          <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-sm">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative aspect-[5/4] min-h-[220px] w-full md:aspect-auto md:min-h-[320px]">
                <Image src={stock.dogGroom} alt="미용 중인 강아지" fill className="object-cover" priority />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-dark)]">미용 안내</p>
                <h2 className="mt-2 text-2xl font-extrabold text-[var(--text)]">부드러운 손길로 마무리까지</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{intro}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["#클리핑", "#목욕·드라이", "#발톱·귀", "#스포일링"].map((t) => (
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
                    href="/grooming/book"
                    className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-bold text-white shadow hover:bg-accent-dark"
                  >
                    예약하러 가기
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
            <h2 className="text-xl font-extrabold text-[var(--text)]">이런 분들께 추천해요</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <NaturalCard
                href="/grooming/course"
                title="클리핑 · 스타일링"
                summary="털 엉킴이 걱정이거나 계절마다 스타일을 바꾸고 싶을 때, 컨디션에 맞춰 단계적으로 진행합니다."
                imageSrc={stock.dogHappy}
                imageAlt="미용 후 산책하는 강아지"
              />
              <NaturalCard
                href="/grooming/safety"
                title="위생·피부 케어"
                summary="도구 소독, 타월 분리, 알러지 케어 등 위생 포인트를 안내합니다. 피부가 민감한 아이도 편안하게."
                imageSrc={stock.spaTowel}
                imageAlt="편안한 케어"
              />
              <NaturalCard
                href="/grooming/book"
                title="예약 · 준비물"
                summary="첫 방문 전 준비물과 예상 소요 시간을 정리했습니다. 챗봇으로도 빠르게 문의하세요."
                imageSrc={stock.puppy}
                imageAlt="강아지"
              />
            </div>
          </div>

          <ProseBlock title="미용 전 체크 포인트" eyebrow="TIP">
            <p>
              미용 전날은 과도한 산책을 줄이고, 급식은 평소대로 유지해 주세요. 컨디션이 좋지 않거나 피부
              트러블이 있으면 미리 알려주시면 케어 강도를 조절합니다.
            </p>
            <p>
              <Link href="/grooming/safety" className="font-bold text-[var(--accent-dark)] underline-offset-4 hover:underline">
                위생·안전 안내
              </Link>
              에서 소독 동선과 예약 변경 규정도 확인할 수 있어요.
            </p>
          </ProseBlock>
        </div>

        <BookingTeaser
          href="/grooming/book"
          title="미용 예약"
          body="날짜·아이 정보를 남겨주시면 확인 후 연락드립니다. 급하신 경우 전화 또는 카카오톡을 함께 이용해 주세요."
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
