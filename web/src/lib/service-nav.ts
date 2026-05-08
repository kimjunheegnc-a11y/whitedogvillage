export type ServiceNavItem = { href: string; label: string };

export const groomingNav: ServiceNavItem[] = [
  { href: "/grooming", label: "미용 안내" },
  { href: "/grooming/book", label: "예약" },
];

export const hotelNav: ServiceNavItem[] = [
  { href: "/hotel", label: "호텔 안내" },
  { href: "/hotel/book", label: "예약" },
];

export const bunyangNav: ServiceNavItem[] = [
  { href: "/bunyang", label: "분양 안내" },
  { href: "/bunyang/book", label: "상담·예약" },
];

export const snacksNav: ServiceNavItem[] = [
  { href: "/snacks", label: "간식 안내" },
  { href: "/snacks/reserve", label: "간식 담기" },
  { href: "/snacks/contact", label: "문의" },
];

export const hospitalNav: ServiceNavItem[] = [
  { href: "/hospital", label: "병원 안내" },
  { href: "/hospital/contact", label: "문의" },
];
