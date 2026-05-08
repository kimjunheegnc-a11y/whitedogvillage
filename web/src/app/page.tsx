import Image from "next/image";
import { DEFAULT_PHONE, KAKAO_PLACEHOLDER_HREF, MOBILE_PHONE } from "@/lib/constants";
import { loadContentMap } from "@/lib/content-load";
import { asText } from "@/lib/json-content";
import { stock } from "@/lib/stock-photos";

/** 홈만 예전 HTML이 CDN에 남는 경우 방지 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const map = await loadContentMap();
  /** 홈 히어로는 기획 문구 고정 */
  const heroTitle = "가족처럼 사랑으로 케어한다";
  const heroSub =
    "용인에서 분양·호텔·미용·간식까지 한곳에 모아, 가족처럼 케어합니다. 방문과 통화로 편하게 문의해 주세요.";
  const phone = asText(map["phone"], DEFAULT_PHONE);

  return (
    <div>
      <section className="min-h-[calc(100dvh-8rem)] border-b border-[var(--border)] bg-[color-mix(in_srgb,white_92%,var(--accent-2))] lg:min-h-[calc(100dvh-6rem)]">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:py-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-dark)]">WHITE DOG VILLAGE</p>
            <h1 className="mt-3 text-[1.85rem] font-bold leading-snug tracking-tight text-[var(--text)] sm:text-4xl">{heroTitle}</h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">{heroSub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={KAKAO_PLACEHOLDER_HREF}
                className="inline-flex items-center justify-center rounded-2xl bg-[#FEE500] px-5 py-3.5 text-sm font-bold text-[#191919] shadow-sm ring-1 ring-black/5 hover:brightness-[0.97]"
              >
                카카오톡
              </a>
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center justify-center rounded-2xl border border-[var(--border)] bg-white px-5 py-3.5 text-sm font-semibold text-[var(--text)] hover:bg-[color-mix(in_srgb,white_88%,var(--accent-2))]"
              >
                전화 {phone}
              </a>
            </div>
            <p className="mt-4 text-xs text-muted">
              휴대폰{" "}
              <a className="font-semibold text-[var(--accent-dark)] underline" href={`tel:${MOBILE_PHONE.replace(/-/g, "")}`}>
                {MOBILE_PHONE}
              </a>
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-sm md:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-sm">
              <Image src={stock.puppy} alt="" fill className="object-cover" sizes="(max-width:768px) 90vw, 420px" priority />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
