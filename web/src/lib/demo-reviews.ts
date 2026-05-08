/** 공개 후기 페이지용 예시 후기 (DB 게시 건이 적을 때 10개까지 채움) */

export type PublicReviewRow = {
  id: string;
  title: string | null;
  body: string;
  rating: number | null;
  created_at: string;
};

const DEMO: Omit<PublicReviewRow, "created_at">[] = [
  {
    id: "demo-1",
    title: "분양 상담이 차분해서 좋았어요",
    body: "첫 분양이라 걱정이 많았는데, 접종 기록이랑 생활 패턴도 자세히 알려주셨어요.",
    rating: 5,
  },
  {
    id: "demo-2",
    title: "호텔 맡기고 여행 다녀왔어요",
    body: "매일 사진 보내주셔서 안심했습니다. 다음에도 이용할게요!",
    rating: 5,
  },
  {
    id: "demo-3",
    title: "미용 스타일 만족",
    body: "원하는 길이로 딱 맞춰 주셨고 아이도 스트레스 없이 잘 다녀왔어요.",
    rating: 5,
  },
  {
    id: "demo-4",
    title: "간식 추천이 도움됐어요",
    body: "알러지 있는 아이라 소프트 타입으로 골라 주셔서 잘 먹어요.",
    rating: 4,
  },
  {
    id: "demo-5",
    title: "응대가 빨라요",
    body: "챗봇으로 문의했다가 전화로 이어져서 일정 조율이 편했습니다.",
    rating: 5,
  },
  {
    id: "demo-6",
    title: "시니어견 케어 안내",
    body: "관절 이야기까지 짚어 주셔서 집에서 할 수 있는 것들이 정리됐어요.",
    rating: 5,
  },
  {
    id: "demo-7",
    title: "미용 대기 공간 깔끔",
    body: "냄새 관리 잘 되어 있고 대기할 만한 공간이 넓어서 좋았어요.",
    rating: 4,
  },
  {
    id: "demo-8",
    title: "병원 제휴 안내가 명확",
    body: "제휴 병원 위치랑 진료 가능 항목을 한눈에 볼 수 있어서 준비하기 쉬웠습니다.",
    rating: 5,
  },
  {
    id: "demo-9",
    title: "중형견 미용 잘해요",
    body: "이중모라 브러싱 포인트를 잘 설명해 주셨어요. 다음 예약도 잡았습니다.",
    rating: 5,
  },
  {
    id: "demo-10",
    title: "가족 같이 대해 주세요",
    body: "아이 이름도 기억해 주시고 작은 변화도 물어봐 주셔서 감사했습니다.",
    rating: 5,
  },
];

/** DB 후기가 10개 미만이면 예시 후기로 채워 최소 10개 노출 */
export function mergeReviewsForDisplay(db: PublicReviewRow[]): PublicReviewRow[] {
  if (db.length >= 10) return db;
  const out: PublicReviewRow[] = [...db];
  const sig = new Set(out.map((r) => `${(r.title ?? "").trim()}|${r.body.slice(0, 48)}`));
  const stale = "1970-01-01T00:00:00.000Z";
  for (const d of DEMO) {
    if (out.length >= 10) break;
    const key = `${(d.title ?? "").trim()}|${d.body.slice(0, 48)}`;
    if (sig.has(key)) continue;
    sig.add(key);
    out.push({ ...d, created_at: stale });
  }
  return out;
}
