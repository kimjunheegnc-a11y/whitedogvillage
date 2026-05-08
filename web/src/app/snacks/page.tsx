import Image from "next/image";
import Link from "next/link";
import { PlateCard, PlateSection } from "@/components/ui/PlateSection";
import { stock } from "@/lib/stock-photos";

export default function SnacksPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-20 px-4 py-14">
      <PlateSection
        id="popular"
        eyebrow="BEST"
        title="인기 간식"
        description="매장에서 회전이 빠른 라인업입니다. (이미지는 예시 스톡입니다.)"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <PlateCard className="!p-0 overflow-hidden">
            <div className="relative aspect-[16/10] w-full">
              <Image src={stock.snackShelf} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            </div>
            <div className="p-5">
              <p className="font-bold text-[var(--text)]">저알러지 져키</p>
              <p className="mt-2 text-sm text-muted">소프트 타입 · 노령견 문의 많음</p>
            </div>
          </PlateCard>
          <PlateCard className="!p-0 overflow-hidden">
            <div className="relative aspect-[16/10] w-full">
              <Image src={stock.treats} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            </div>
            <div className="p-5">
              <p className="font-bold text-[var(--text)]">동결건조 트릿</p>
              <p className="mt-2 text-sm text-muted">훈련 보상용으로 인기</p>
            </div>
          </PlateCard>
        </div>
      </PlateSection>

      <PlateSection
        id="recommend"
        eyebrow="PICK"
        title="추천 간식 — 연령 · 종별"
        description="생애 주기와 체형에 맞춰 매장에서 안내드립니다."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <PlateCard>
            <p className="text-xs font-semibold text-[var(--accent-dark)]">퍼피</p>
            <p className="mt-2 text-sm text-muted">작은 입 크기, 연한 질감의 트릿·소프트 타입.</p>
          </PlateCard>
          <PlateCard>
            <p className="text-xs font-semibold text-[var(--accent-dark)]">시니어</p>
            <p className="mt-2 text-sm text-muted">저염·관절 케어 성분이 들어간 라인.</p>
          </PlateCard>
          <PlateCard>
            <p className="text-xs font-semibold text-[var(--accent-dark)]">소형견</p>
            <p className="mt-2 text-sm text-muted">한 입 크기와 칼로리 밸런스를 맞춘 제품.</p>
          </PlateCard>
          <PlateCard>
            <p className="text-xs font-semibold text-[var(--accent-dark)]">중대형</p>
            <p className="mt-2 text-sm text-muted">씹는 만족감이 있는 덴탈·건조껌류.</p>
          </PlateCard>
        </div>
      </PlateSection>

      <PlateSection
        id="health"
        eyebrow="HEALTH"
        title="건강 목적 간식"
        description="피모·관절·소화 등 목적에 맞는 제품을 골라 담아 드립니다."
      >
        <PlateCard>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex gap-2">
              <span className="font-bold text-[var(--text)]">피모</span>
              <span>오메가가 보강된 사료·트릿 병행 안내</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[var(--text)]">관절</span>
              <span>글루코사민·MSM 함유 제품 라인</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[var(--text)]">소화</span>
              <span>단일 단백·저지방 스낵 추천</span>
            </li>
          </ul>
        </PlateCard>
      </PlateSection>

      <PlateSection
        id="staff"
        eyebrow="DEAL"
        title="직원 추천 · 할인"
        description="월별 프로모션은 매장 포스터와 챗봇 안내를 확인해 주세요."
      >
        <div className="grid gap-4 md:grid-cols-[1fr_200px] md:items-center">
          <PlateCard>
            <p className="text-sm leading-relaxed text-muted">
              &ldquo;입맛 까다로운 아이에게 부드러운 동결건조를 먼저 드려 보세요.&rdquo; — 매장 추천 픽 예시입니다. 실제 할인
              품목은 방문 시 확인 가능합니다.
            </p>
          </PlateCard>
          <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-3xl border border-[var(--border)]">
            <Image src={stock.kibble} alt="" fill className="object-cover" sizes="200px" />
          </div>
        </div>
      </PlateSection>

      <PlateSection
        id="guide"
        eyebrow="GUIDE"
        title="급여 가이드"
        description="하루 간식 칼로리는 본식의 10% 이내를 권장합니다."
      >
        <PlateCard>
          <ol className="list-decimal space-y-2 pl-4 text-sm text-muted">
            <li>본식 사료량과 겹치지 않게 간식 시간을 정합니다.</li>
            <li>새 제품은 소량으로 시작해 설사·가스 여부를 봅니다.</li>
            <li>덴탈껌은 감시 하에 급여하고 잔여는 치웁니다.</li>
            <li>포장·유통기한은 매장에서 함께 확인해 드립니다.</li>
          </ol>
        </PlateCard>
        <p className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/snacks/reserve"
            className="inline-flex items-center justify-center rounded-2xl bg-accent px-8 py-3.5 text-sm font-semibold shadow-sm hover:bg-accent-dark"
          >
            <span className="text-white">간식 담아두기</span>
          </Link>
          <Link
            href="/snacks/contact"
            className="inline-flex rounded-2xl border border-[var(--border)] bg-white px-8 py-3.5 text-sm font-semibold hover:bg-[color-mix(in_srgb,white_92%,var(--accent-2))]"
          >
            문의하기
          </Link>
        </p>
      </PlateSection>
    </div>
  );
}
