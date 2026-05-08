import Image from "next/image";
import Link from "next/link";
import { PlateCard, PlateSection } from "@/components/ui/PlateSection";
import { stock } from "@/lib/stock-photos";

const courses = [
  { name: "베이직 클립", price: "3만 원대~", note: "목욕 · 드라이 · 클리핑 · 발톱" },
  { name: "풀 코스", price: "5만 원대~", note: "베이직 + 귀 · 항문낭 · 기본 스포일링" },
  { name: "스포일링", price: "별도 문의", note: "피모 상태에 맞춘 집중 케어" },
];

const breeds = [
  { name: "소형 · 장모", tip: "일상 빗질 5분으로 엉킴 예방", src: stock.poodle },
  { name: "중형 · 이중모", tip: "활동량에 맞춘 언더코트 케어", src: stock.shiba },
  { name: "민감 피부", tip: "저자극 샴푸 · 시간 단축", src: stock.spaTowel },
];

export default function GroomingPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-20 px-4 py-14">
      <PlateSection
        id="before-after"
        eyebrow="BEFORE / AFTER"
        title="비포 · 애프터"
        description="정리 전·후 컨디션을 사진으로 남겨 드립니다. (이미지는 예시입니다.)"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <PlateCard className="p-0 overflow-hidden">
            <div className="relative aspect-[4/3] w-full">
              <Image src={stock.groomBefore} alt="미용 전" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            </div>
            <p className="px-5 py-3 text-sm font-medium text-muted">Before — 털 엉킴·다듬기 전</p>
          </PlateCard>
          <PlateCard className="p-0 overflow-hidden">
            <div className="relative aspect-[4/3] w-full">
              <Image src={stock.dogGroom} alt="미용 후" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            </div>
            <p className="px-5 py-3 text-sm font-medium text-muted">After — 클리핑 후</p>
          </PlateCard>
        </div>
      </PlateSection>

      <PlateSection
        id="price"
        eyebrow="PRICE"
        title="미용 코스 및 가격"
        description="견종·체급·피모 상태에 따라 달라질 수 있어 방문 전 상담을 권장합니다."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {courses.map((c) => (
            <PlateCard key={c.name} className="!p-5">
              <p className="text-xs font-semibold text-muted">{c.name}</p>
              <p className="mt-2 text-lg font-bold text-[var(--text)]">{c.price}</p>
              <p className="mt-2 text-sm text-muted">{c.note}</p>
            </PlateCard>
          ))}
        </div>
      </PlateSection>

      <PlateSection
        id="breeds"
        eyebrow="BREED"
        title="견종별 추천"
        description="대표적인 피모 타입별로 미용 시 포인트를 정리했습니다."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {breeds.map((b) => (
            <PlateCard key={b.name} className="!p-0 overflow-hidden">
              <div className="relative aspect-square w-full">
                <Image src={b.src} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <p className="font-bold text-[var(--text)]">{b.name}</p>
                <p className="mt-2 text-sm text-muted">{b.tip}</p>
              </div>
            </PlateCard>
          ))}
        </div>
      </PlateSection>

      <PlateSection
        id="staff"
        eyebrow="STAFF"
        title="미용사 소개"
        description="애견 미용 자격과 매장 위생 교육을 이수한 스태프가 케어합니다."
      >
        <div className="grid items-center gap-8 md:grid-cols-[280px_1fr]">
          <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-3xl border border-[var(--border)]">
            <Image src={stock.groomStudio} alt="미용실" fill className="object-cover" sizes="280px" />
          </div>
          <PlateCard>
            <p className="text-sm leading-relaxed text-muted">
              스트레스를 줄이는 동선과 단계별 안내로 첫 방문 아이도 천천히 적응할 수 있게 돕습니다. 원하시는 스타일
              레퍼런스 이미지를 지참해 주시면 길이·실루엣을 맞춰 상담합니다.
            </p>
          </PlateCard>
        </div>
      </PlateSection>

      <PlateSection
        id="notice"
        eyebrow="NOTICE"
        title="미용 전 주의사항"
        description="안전한 케어를 위해 꼭 확인해 주세요."
      >
        <PlateCard>
          <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-muted">
            <li>예방접종·건강 이상이 있으면 미리 알려 주세요.</li>
            <li>식사는 미용 3시간 전 가볍게 조절해 주시면 좋아요.</li>
            <li>피부 트러블·외상이 있으면 진료 후 방문을 권장합니다.</li>
            <li>공격성이 강할 경우 마uzzle·단독 타임 등 별도 안내가 있을 수 있어요.</li>
          </ul>
        </PlateCard>
        <p className="mt-10 text-center">
          <Link
            href="/grooming/book"
            className="inline-flex rounded-2xl bg-[var(--text)] px-8 py-3.5 text-sm font-semibold text-white hover:opacity-90"
          >
            미용 예약하기
          </Link>
        </p>
      </PlateSection>
    </div>
  );
}
