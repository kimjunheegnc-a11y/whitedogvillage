import Link from "next/link";
import { BookingTeaser } from "@/components/service/BookingTeaser";
import { ProseBlock } from "@/components/service/ProseBlock";
import { stock } from "@/lib/stock-photos";
import Image from "next/image";

export default function GroomingCoursePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr,300px] lg:items-start">
        <div className="space-y-8">
          <ProseBlock title="코스 · 케어 가이드" eyebrow="COURSE">
            <p>
              <strong>기본 케어</strong>는 브러싱 → 클리핑/가위컷 → 샤워 → 드라이 → 발톱·패드·귀 정리 순으로
              진행합니다. 아이의 피모 타입(이중모/단모)과 체형에 맞춰 블레이드/가위 사용을 조절합니다.
            </p>
            <p>
              <strong>스포일링</strong>은 맞춤 스타일링이 필요할 때 추천드립니다. 얼굴 라인·다리 실루엣 등
              원하시는 이미지를 사진과 함께 남겨주시면 상담에 반영됩니다.
            </p>
          </ProseBlock>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                t: "STEP 1",
                h: "브러싱 & 전처리",
                d: "엉킴을 풀고 피부를 확인해요. 필요 시 언더코트 정리를 병행합니다.",
              },
              {
                t: "STEP 2",
                h: "클리핑 / 가위컷",
                d: "체형을 살리는 라인을 잡고, 미용 중 휴식 시간을 충분히 가져요.",
              },
              {
                t: "STEP 3",
                h: "목욕 · 드라이",
                d: "저자극 샴푸로 부드럽게 세정하고, 저온 드라이로 마무리합니다.",
              },
              {
                t: "STEP 4",
                h: "디테일 마무리",
                d: "발톱·패드·귀 주변 정리와 향·스킨 케어(선택)로 마무리해요.",
              },
            ].map((s) => (
              <div
                key={s.t}
                className="rounded-[1.75rem] border border-[var(--border)] bg-white/90 p-6 shadow-sm"
              >
                <p className="text-xs font-bold text-[var(--accent-dark)]">{s.t}</p>
                <h3 className="mt-2 text-lg font-extrabold text-[var(--text)]">{s.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-sm">
            <div className="relative aspect-[21/9] w-full min-h-[200px]">
              <Image src={stock.dogGroom} alt="미용 케어" fill className="object-cover" />
            </div>
          </div>
        </div>
        <BookingTeaser
          href="/grooming/book"
          title="예약으로 이어지기"
          body="희망 스타일·길이·민감 부위를 메모에 적어주시면 상담이 빨라져요."
        />
      </div>
      <p className="mt-12 text-center text-sm text-muted">
        <Link href="/grooming" className="font-semibold text-[var(--accent-dark)] hover:underline">
          ← 미용 안내
        </Link>
      </p>
    </div>
  );
}
