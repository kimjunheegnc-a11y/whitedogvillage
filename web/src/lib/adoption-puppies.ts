/** 분양 카드 예시 데이터 (데모 4건) */
export type AdoptionPuppy = {
  id: string;
  name: string;
  breed: string;
  gender: "남아" | "여아";
  months: number;
  keywords: string[];
  image: string;
  detail: {
    summary: string;
    personality: string;
    health: string;
    note: string;
  };
};

export const ADOPTION_PUPPIES: AdoptionPuppy[] = [
  {
    id: "p1",
    name: "두부",
    breed: "말티즈",
    gender: "남아",
    months: 3,
    keywords: ["#활발", "#사람좋아함", "#1차접종완료"],
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80",
    detail: {
      summary: "작고 포근한 말티즈 남아. 가족 품에서 자란 아이입니다.",
      personality: "사람 손길을 좋아하고 산책 시 동선 익히는 중입니다.",
      health: "1차 접종 완료, 기생충 예방 진행. 건강검진 기록 제공.",
      note: "실제 분양 시 계약·책임 분양 절차를 안내드립니다.",
    },
  },
  {
    id: "p2",
    name: "모카",
    breed: "포메라니안",
    gender: "여아",
    months: 4,
    keywords: ["#차분", "#털관리필수", "#2차접종완료"],
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",
    detail: {
      summary: "부드러운 성향의 포메 여아. 실내 환경에 잘 적응합니다.",
      personality: "낯선 소리에 예민할 수 있어 천천히 적응을 도와주세요.",
      health: "2차 접종 완료. 치아·피부 상태 양호.",
      note: "포메 특성상 이중모 관리 루틴을 상담 시 안내드립니다.",
    },
  },
  {
    id: "p3",
    name: "솔",
    breed: "토이 푸들",
    gender: "남아",
    months: 5,
    keywords: ["#똑똑함", "#트레이닝용이", "#건강검진완료"],
    image: "https://images.unsplash.com/photo-1516734212186-a967f63f3f60?auto=format&fit=crop&w=900&q=80",
    detail: {
      summary: "학습 욕구가 높은 토이 푸들. 간식 보상 훈련에 반응이 좋습니다.",
      personality: "호기심이 많아 새 장난감·코스에 빠르게 흥미를 보입니다.",
      health: "종합 건강검진·혈청 검사 이상 없음.",
      note: "미용 주기 맞춤 상담 가능합니다.",
    },
  },
  {
    id: "p4",
    name: "하늘",
    breed: "비숑 프리제",
    gender: "여아",
    months: 3,
    keywords: ["#알러지적음", "#가족친화", "#1차접종완료"],
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=900&q=80",
    detail: {
      summary: "둥근 인상의 비숑 여아. 가족과의 교감을 좋아합니다.",
      personality: "다른 반려견과도 천천히 친해지는 편입니다.",
      health: "1차 접종 완료, 체중·관절 이상 없음.",
      note: "털 스타일(클립·테디) 상담 시 샘플 이미지와 함께 안내합니다.",
    },
  },
];
