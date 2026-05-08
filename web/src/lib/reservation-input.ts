/** DB·API와 동일한 상한 */
export const RESERVATION_LIMITS = {
  customerNameMax: 100,
  phoneDigitsMax: 15,
  petInfoMax: 500,
  notesMax: 2000,
} as const;

/** 숫자만 남김. +82 → 0 변환 */
export function normalizeKoreanPhone(raw: string): string {
  let t = raw.trim().replace(/[\s.-]/g, "");
  if (t.startsWith("+82")) t = "0" + t.slice(3);
  return t.replace(/\D/g, "");
}

/**
 * 한국 휴대(010 등) 또는 지역번호 형태로 보이는지.
 * (엄격하지 않게: 9~11자리 0 시작 국내 번호)
 */
export function isLikelyKoreanPhone(digits: string): boolean {
  if (digits.length < 9 || digits.length > 11) return false;
  if (!/^0/.test(digits)) return false;
  if (/^01[016789]\d{7,8}$/.test(digits)) return true;
  if (/^0[2-6]\d{7,9}$/.test(digits)) return true;
  return false;
}

export function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max);
}

export function validateCustomerName(name: string): string | null {
  const t = name.trim();
  if (t.length < 2) return "보호자 이름은 2글자 이상 입력해 주세요.";
  if (t.length > RESERVATION_LIMITS.customerNameMax) return `이름은 ${RESERVATION_LIMITS.customerNameMax}자 이내로 적어 주세요.`;
  return null;
}

export function validatePetName(name: string): string | null {
  const t = name.trim();
  if (t.length < 1) return "아이 이름을 입력해 주세요.";
  if (t.length > 80) return "아이 이름은 80자 이내로 적어 주세요.";
  return null;
}

export function validatePhone(raw: string): string | null {
  const d = normalizeKoreanPhone(raw);
  if (d.length < 9) return "전화번호를 입력해 주세요.";
  if (!isLikelyKoreanPhone(d)) {
    return "전화번호 형식을 확인해 주세요. (예: 010-1234-5678, 031-123-4567)";
  }
  if (d.length > RESERVATION_LIMITS.phoneDigitsMax) return "전화번호가 너무 깁니다.";
  return null;
}

export function validateNotes(notes: string, minLen: number): string | null {
  const t = notes.trim();
  if (minLen > 0 && t.length < minLen) {
    return `문의·요청 내용은 ${minLen}글자 이상 입력해 주세요.`;
  }
  if (t.length > RESERVATION_LIMITS.notesMax) {
    return `내용은 ${RESERVATION_LIMITS.notesMax}자 이내로 적어 주세요.`;
  }
  return null;
}

export function validateAgeText(age: string): string | null {
  const t = age.trim();
  if (t.length < 1) return "나이를 입력해 주세요.";
  if (t.length > 40) return "나이는 40자 이내로 적어 주세요.";
  return null;
}

export function validatePreferredWhen(when: string): string | null {
  if (!when.trim()) return null;
  const d = new Date(when);
  if (Number.isNaN(d.getTime())) return "희망 일시가 올바르지 않습니다.";
  return null;
}

export function parseApiErrorPayload(data: unknown): string {
  if (!data || typeof data !== "object") return "전송에 실패했습니다.";
  const o = data as Record<string, unknown>;
  if (o.error && typeof o.error === "object") return "입력 형식을 확인해 주세요.";
  const main = typeof o.error === "string" ? o.error : "전송에 실패했습니다.";
  const hint = typeof o.hint === "string" && o.hint.trim() ? o.hint.trim() : "";
  const detail = typeof o.detail === "string" && o.detail.trim() ? o.detail.trim() : "";
  const extra = hint || detail;
  if (extra && extra !== main) return `${main}\n${extra}`;
  return extra || main;
}

export function supabaseUserHint(code: string | undefined, message: string): string {
  if (code === "42P01" || message.includes("does not exist"))
    return "DB에 reservations 테이블이 없을 수 있습니다. Supabase SQL Editor에서 SUPABASE_ALL_IN_ONE.sql 을 실행해 주세요.";
  if (code === "23514") return "입력값이 길이 제한을 넘었습니다. 문의 내용을 줄이거나 다시 시도해 주세요.";
  if (code === "42501" || message.toLowerCase().includes("permission") || message.includes("RLS"))
    return "서버에 설정된 SUPABASE_SERVICE_ROLE_KEY(service_role)를 확인해 주세요.";
  if (code === "PGRST116") return "저장 직후 응답을 받지 못했습니다. 잠시 후 목록에서 확인하거나 다시 시도해 주세요.";
  if (/invalid path/i.test(message)) {
    return "Supabase URL이 잘못되었을 수 있습니다. Vercel의 NEXT_PUBLIC_SUPABASE_URL 은 https://프로젝트.supabase.co 형태만 넣고(/rest/v1 없이) 저장 후 다시 배포해 주세요.";
  }
  return message.length > 200 ? `${message.slice(0, 200)}…` : message;
}
