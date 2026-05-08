export const SITE_NAME = "하얀 개 마을";
export const SITE_TAGLINE = "분양 · 호텔 · 미용 · 간식 — 가족처럼 돌보는 애견 센터";
export const DEFAULT_PHONE = "031-334-3336";
export const MOBILE_PHONE = "010-2926-5400";
export const DEFAULT_ADDRESS = "경기 용인시 처인구 금령로 1 (김량장동)";
export const DEFAULT_HOURS = "OPEN 10:00 — CLOSE 21:30 (연중무휴)";
export const INSTAGRAM_HANDLE = "@white_dog_village";
export const INSTAGRAM_URL = "https://www.instagram.com/white_dog_village/";
/** 기본값(미설정). 실제 채널은 환경 변수로 두는 것을 권장 */
export const KAKAO_PLACEHOLDER_HREF = "#kakao-chat-placeholder";

/** 카카오 채널 채팅 URL. `NEXT_PUBLIC_KAKAO_CHAT_URL` 이 있으면 우선( Vercel / .env.local ) */
export const KAKAO_CHAT_HREF =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_KAKAO_CHAT_URL?.trim()) ||
  KAKAO_PLACEHOLDER_HREF;

export const NAV = [
  { href: "/", label: "홈" },
  { href: "/hospital", label: "병원" },
  { href: "/grooming", label: "미용" },
  { href: "/snacks", label: "간식" },
  { href: "/reviews", label: "후기" },
  { href: "/hotel", label: "호텔" },
  { href: "/bunyang", label: "분양" },
] as const;
