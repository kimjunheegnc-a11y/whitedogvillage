import Image from "next/image";
import Link from "next/link";
import { NaturalCard } from "@/components/service/NaturalCard";
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
import { loadContentMap, loadMediaGallery, loadPublishedReviews } from "@/lib/content-load";
import { asStringArray, asText } from "@/lib/json-content";
import { publicMediaUrl } from "@/lib/storage-url";
import { stock } from "@/lib/stock-photos";

const galleryFallback = [
  stock.puppy,
  stock.kitten,
  stock.dogHappy,
  stock.treats,
  stock.hotelDog,
  stock.dogGroom,
];

export default async function HomePage() {
  const map = await loadContentMap();
  const heroTitle = asText(map["hero_title"], "하얀개마을은 '사랑을 분양'합니다!");
  const heroSub = asText(
    map["hero_subtitle"],
    "국가공인 전문 브리더 센터의 노하우로, 건강검진과 예방접종을 마친 아이들을 책임지고 안내합니다."
  );
  const badges = asStringArray(map["hero_badges"], [
    "#365일",
    "#21년경력",
    "#국가공인",
    "#수의검진",
    "#전문분양",
    "#책임분양",
    "#미용",
    "#호텔링",
    "#대용량간식사료",
    "#종합애견센터",
  ]);
  const hours = asText(map["contact_hours"], DEFAULT_HOURS);
  const phone = asText(map["phone"], DEFAULT_PHONE);
  const address = asText(map["contact_address"], DEFAULT_ADDRESS);
  const media = await loadMediaGallery();
  const reviewsAll = await loadPublishedReviews();
  const reviews = reviewsAll.slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_srgb,var(--accent-2)_55%,transparent),transparent_45%),radial-gradient(circle_at_80%_0%,color-mix(in_srgb,var(--accent)_35%,transparent),transparent_40%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)]">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-dark)]">WHITE DOG VILLAGE</p>
            <h1 className="mt-2 text-3xl font-extrabold leading-[1.15] text-[var(--text)] md:text-[2.35rem]">
              {heroTitle}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{heroSub}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-[var(--border)] bg-white/80 px-3 py-1 text-[11px] font-semibold text-[var(--text)] shadow-sm backdrop-blur sm:text-xs"
                >
                  {b}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={KAKAO_PLACEHOLDER_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-accent-dark"
              >
                카카오톡 상담하기
              </a>
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center rounded-full border border-[var(--border)] bg-white/90 px-5 py-3 text-sm font-bold text-[var(--text)] shadow-sm hover:bg-white"
              >
                전화 {phone}
              </a>
            </div>
            <p className="mt-4 text-xs text-muted">
              휴대폰:{" "}
              <a className="font-semibold text-[var(--accent-dark)] underline" href={`tel:${MOBILE_PHONE.replace(/-/g, "")}`}>
                {MOBILE_PHONE}
              </a>
            </p>
          </div>
          <div className="relative flex w-full justify-center md:justify-end">
            <div className="absolute right-0 top-0 z-[1] rounded-2xl border border-[var(--border)] bg-white/90 px-3 py-2 text-[11px] font-bold text-[var(--accent-dark)] shadow-sm backdrop-blur sm:right-2 sm:text-xs">
              사랑으로 키워요
            </div>
            <div className="grid w-full max-w-[min(100%,22rem)] grid-cols-2 gap-4 sm:max-w-[min(100%,28rem)] sm:gap-5 md:max-w-none md:gap-6 md:pl-2">
              <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] shadow-[var(--shadow)] ring-4 ring-white">
                <Image
                  src={stock.puppy}
                  alt="강아지"
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 42vw, (max-width:1024px) 38vw, 520px"
                  priority
                />
              </div>
              <div className="relative mt-6 aspect-square w-full overflow-hidden rounded-[2rem] shadow-[var(--shadow)] ring-4 ring-white sm:mt-8">
                <Image
                  src={stock.kitten}
                  alt="고양이"
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 42vw, (max-width:1024px) 38vw, 520px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        <div className="wave-divider" aria-hidden />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              href: "/bunyang",
              title: "분양",
              desc: "건강검진·접종 기록을 확인하고, 가정에 맞는 상담을 진행합니다.",
              emoji: "🐾",
            },
            {
              href: "/hotel",
              title: "호텔",
              desc: "산책·급식·휴식 리듬을 맞춰 안전하게 케어합니다.",
              emoji: "🏠",
            },
            {
              href: "/grooming",
              title: "미용",
              desc: "클리핑부터 스포일링까지, 피모 컨디션에 맞춰 진행합니다.",
              emoji: "✂️",
            },
          ].map((c) => (
            <div
              key={c.href}
              className="flex flex-col rounded-[2rem] border border-[var(--border)] bg-white/90 p-6 shadow-[var(--shadow)]"
            >
              <span className="text-3xl">{c.emoji}</span>
              <h3 className="mt-3 text-xl font-extrabold text-[var(--text)]">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.desc}</p>
              <Link
                href={c.href}
                className="mt-6 inline-flex justify-center rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,white_80%,var(--accent-2))] px-4 py-2 text-sm font-bold text-[var(--text)] hover:bg-[color-mix(in_srgb,white_65%,var(--accent-2))]"
              >
                자세히 보기
              </Link>
            </div>
          ))}
        </div>

        <aside className="mx-auto mt-8 max-w-md rounded-[2rem] border border-[var(--border)] bg-white/90 p-6 text-center shadow-[var(--shadow)] lg:float-right lg:ml-8 lg:mt-0 lg:w-80">
          <p className="text-sm font-extrabold text-[var(--text)]">{hours}</p>
          <p className="mt-2 text-xs text-muted">연중무휴 · {address}</p>
          <a
            href={KAKAO_PLACEHOLDER_HREF}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color-mix(in_srgb,#ffe76a_70%,#fff6bf)] py-3 text-sm font-extrabold text-stone-800 ring-1 ring-amber-200/60 hover:bg-[color-mix(in_srgb,#ffe76a_85%,white)]"
          >
            카카오톡 빠른 예약
          </a>
        </aside>
      </section>

      <section className="border-y border-[var(--border)] bg-[color-mix(in_srgb,white_86%,var(--accent-2))] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-extrabold text-[var(--text)]">왜 하얀 개 마을인가요?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted">
            전문 브리더 센터의 경험과, 호텔·미용·용품까지 한 공간에서 이어지는 케어를 지향합니다.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["전문 브리더", "분양 상담과 사후 케어까지"],
              ["수의 검진", "건강 상태를 투명하게 안내"],
              ["쾌적 환경", "위생·동선 관리로 스트레스 최소화"],
              ["종합 케어", "호텔·미용·간식까지 연결"],
            ].map(([t, s]) => (
              <div key={t} className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[var(--border)] bg-white text-2xl font-extrabold text-[var(--accent-dark)] shadow-sm">
                  ✓
                </div>
                <p className="mt-4 font-extrabold text-[var(--text)]">{t}</p>
                <p className="mt-1 text-sm text-muted">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--text)]">지금 둘러볼 만한 코너</h2>
            <p className="mt-2 text-sm text-muted">네츄럴코어 스타일의 “카드형 섹션”으로 주요 메뉴를 빠르게 연결했어요.</p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-bold text-[var(--accent-dark)] hover:underline"
          >
            Instagram {INSTAGRAM_HANDLE} →
          </a>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <NaturalCard
            href="/snacks/picks"
            title="간식 · 사료 픽"
            summary="매장에서 고르기 좋은 라인업을 소개합니다. (이미지: Unsplash 예시)"
            imageSrc={stock.treats}
            imageAlt="간식"
          />
          <NaturalCard
            href="/grooming/course"
            title="미용 코스 안내"
            summary="클리핑·목욕·드라이 단계와 준비물을 정리했습니다."
            imageSrc={stock.dogGroom}
            imageAlt="미용"
          />
          <NaturalCard
            href="/hotel/day"
            title="호텔 하루 돌봄"
            summary="산책·급식·휴식 타임라인을 미리 확인해 보세요."
            imageSrc={stock.hotelDog}
            imageAlt="호텔링"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-[var(--shadow)]">
            <div className="relative aspect-[16/11] w-full">
              <Image src="/brand/storefront.png" alt="매장 전경" fill className="object-cover" priority />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-[var(--text)]">매장 스토리</h2>
            <p className="text-sm leading-relaxed text-muted">
              간판에 안내된 서비스(애견용품·미용·호텔·전문분양)처럼, 웹에서도 각 메뉴별로 안내와 예약/문의를
              나눠 두었습니다. 우측 하단 <strong>+ 챗봇</strong>은 모든 페이지에서 열립니다.
            </p>
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-sm">
              <div className="relative aspect-[16/10] w-full">
                <Image src="/brand/banner-slogan.png" alt="브랜드 배너" fill className="object-contain bg-[color-mix(in_srgb,white_92%,var(--accent-2))]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[var(--text)]">갤러리</h2>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-sm font-bold text-[var(--accent-dark)] hover:underline">
            더보기
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
          {(media.length > 0 ? media : []).slice(0, 6).map((m) => (
            <div
              key={m.id}
              className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm"
            >
              <Image
                src={publicMediaUrl(m.path)}
                alt={m.alt ?? ""}
                fill
                className="object-cover"
                sizes="(max-width:768px) 50vw, 33vw"
              />
            </div>
          ))}
          {media.length === 0
            ? galleryFallback.map((src, i) => (
                <div
                  key={src + String(i)}
                  className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm"
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="(max-width:768px) 50vw, 33vw" />
                </div>
              ))
            : null}
        </div>
      </section>

      {reviews.length > 0 ? (
        <section className="border-y border-[var(--border)] bg-[color-mix(in_srgb,white_88%,var(--accent-2))] py-14">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-xl font-extrabold text-[var(--text)]">고객 후기</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {reviews.map((r) => (
                <div key={r.id} className="rounded-2xl border border-[var(--border)] bg-white/90 p-5 shadow-sm">
                  <p className="font-extrabold text-[var(--text)]">{r.title || "후기"}</p>
                  <p className="mt-2 text-sm text-muted">{r.body}</p>
                  {r.rating ? <p className="mt-3 text-xs font-bold text-[var(--accent-dark)]">★ {r.rating}.0</p> : null}
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/reviews" className="text-sm font-bold text-[var(--accent-dark)] hover:underline">
                후기 전체 보기
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-[2rem] border border-[var(--border)] bg-white/90 p-8 shadow-[var(--shadow)]">
          <h2 className="text-2xl font-extrabold text-[var(--text)]">오시는 길 · 연락처</h2>
          <p className="mt-4 text-muted">{address}</p>
          <p className="mt-3 text-sm font-semibold text-[var(--text)]">
            전화:{" "}
            <a className="text-[var(--accent-dark)] underline" href={`tel:${phone.replace(/[^0-9+]/g, "")}`}>
              {phone}
            </a>{" "}
            /{" "}
            <a className="text-[var(--accent-dark)] underline" href={`tel:${MOBILE_PHONE.replace(/-/g, "")}`}>
              {MOBILE_PHONE}
            </a>
          </p>
          <p className="mt-2 text-sm text-muted">{hours}</p>
          <a
            href={KAKAO_PLACEHOLDER_HREF}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white shadow hover:bg-accent-dark"
          >
            카카오톡 예약하기
          </a>
          <div className="mt-8 flex flex-wrap gap-2 text-xs text-muted">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,white_85%,var(--accent-2))] px-3 py-1 font-semibold hover:bg-white"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
