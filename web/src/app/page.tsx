import Image from "next/image";
import Link from "next/link";
import {
  DEFAULT_ADDRESS,
  DEFAULT_HOURS,
  DEFAULT_PHONE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  KAKAO_PLACEHOLDER_HREF,
  MOBILE_PHONE,
  NAV,
} from "@/lib/constants";
import { loadContentMap } from "@/lib/content-load";
import { asText } from "@/lib/json-content";
import { stock } from "@/lib/stock-photos";

const serviceLinks = [
  { href: "/bunyang", label: "분양", desc: "건강한 아이를 가족처럼" },
  { href: "/hotel", label: "호텔", desc: "안전한 돌봄 공간" },
  { href: "/grooming", label: "미용", desc: "클리핑 · 스포일링" },
  { href: "/snacks", label: "간식", desc: "매장 픽 · 급여 안내" },
  { href: "/hospital", label: "병원", desc: "제휴 진료 · 예방" },
  { href: "/reviews", label: "후기", desc: "고객 이야기" },
] as const;

export default async function HomePage() {
  const map = await loadContentMap();
  const heroTitle = asText(map["hero_title"], "가족처럼 사랑으로 분양한다");
  const heroSub = asText(
    map["hero_subtitle"],
    "용인에서 분양·호텔·미용·간식까지 한곳에 모았습니다. 복잡한 설명 대신, 방문과 통화로 바로 이야기 나눌 수 있게 준비했습니다."
  );
  const hours = asText(map["contact_hours"], DEFAULT_HOURS);
  const phone = asText(map["phone"], DEFAULT_PHONE);
  const address = asText(map["contact_address"], DEFAULT_ADDRESS);

  return (
    <div className="pb-16">
      <section className="border-b border-[var(--border)] bg-[color-mix(in_srgb,white_92%,var(--accent-2))]">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-dark)]">WHITE DOG VILLAGE</p>
            <h1 className="mt-3 text-[1.85rem] font-bold leading-snug tracking-tight text-[var(--text)] sm:text-4xl">{heroTitle}</h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">{heroSub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={KAKAO_PLACEHOLDER_HREF}
                className="inline-flex items-center justify-center rounded-2xl bg-[var(--text)] px-5 py-3.5 text-sm font-semibold text-white hover:opacity-90"
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

      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="text-lg font-bold text-[var(--text)]">메뉴</h2>
        <p className="mt-1 text-sm text-muted">자세한 안내는 각 탭에서 확인해 주세요.</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {serviceLinks.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="flex flex-col rounded-3xl border border-[var(--border)] bg-white px-5 py-5 transition hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--border))] hover:shadow-sm"
              >
                <span className="text-base font-bold text-[var(--text)]">{s.label}</span>
                <span className="mt-1 text-sm text-muted">{s.desc}</span>
                <span className="mt-4 text-xs font-semibold text-[var(--accent-dark)]">이동 →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[var(--border)] bg-[color-mix(in_srgb,white_94%,var(--accent-2))]">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-lg font-bold text-[var(--text)]">연락처</h2>
          <div className="mt-6 grid gap-6 rounded-3xl border border-[var(--border)] bg-white p-6 sm:grid-cols-2 sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">주소</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">{address}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">영업</p>
              <p className="mt-2 text-sm font-medium text-[var(--text)]">{hours}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">SNS</p>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-semibold text-[var(--accent-dark)] hover:underline">
                Instagram {INSTAGRAM_HANDLE}
              </a>
              <p className="mt-6 text-xs text-muted">상단 메뉴</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {NAV.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,white_92%,var(--accent-2))] px-3 py-1 text-xs font-medium hover:bg-white"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
