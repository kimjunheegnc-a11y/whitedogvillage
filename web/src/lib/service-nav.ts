export type ServiceNavItem = { href: string; label: string };

export const groomingNav: ServiceNavItem[] = [
  { href: "/grooming", label: "미용 안내" },
  { href: "/grooming/course", label: "코스·케어" },
  { href: "/grooming/safety", label: "위생·안전" },
  { href: "/grooming/book", label: "예약" },
];

export const hotelNav: ServiceNavItem[] = [
  { href: "/hotel", label: "호텔 안내" },
  { href: "/hotel/day", label: "하루 돌봄" },
  { href: "/hotel/checklist", label: "입실 체크리스트" },
  { href: "/hotel/book", label: "예약" },
];

export const bunyangNav: ServiceNavItem[] = [
  { href: "/bunyang", label: "분양 소개" },
  { href: "/bunyang/health", label: "건강·검진" },
  { href: "/bunyang/responsible", label: "책임 분양" },
  { href: "/bunyang/book", label: "상담·예약" },
];

export const snacksNav: ServiceNavItem[] = [
  { href: "/snacks", label: "매장 안내" },
  { href: "/snacks/picks", label: "추천 간식·사료" },
  { href: "/snacks/tips", label: "급여·보관 팁" },
  { href: "/snacks/contact", label: "문의" },
];

export const hospitalNav: ServiceNavItem[] = [
  { href: "/hospital", label: "제휴 안내" },
  { href: "/hospital/visit", label: "방문·예방" },
  { href: "/hospital/emergency", label: "응급 안내" },
  { href: "/hospital/contact", label: "문의" },
];
