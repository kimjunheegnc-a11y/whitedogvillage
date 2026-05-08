import {
  DEFAULT_PHONE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  MOBILE_PHONE,
  SITE_NAME,
} from "@/lib/constants";

export function SiteFooter({
  phone,
  address,
  hours,
}: {
  phone: string;
  address: string;
  hours: string;
}) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--footer)_88%,white)] py-14 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-3">
        <div>
          <p className="text-xl font-extrabold tracking-tight">{SITE_NAME}</p>
          <p className="mt-2 text-sm text-white/85">애견용품 · 미용 · 호텔 · 전문분양</p>
          <p className="mt-4 text-xs leading-relaxed text-white/75">{hours}</p>
        </div>
        <div className="space-y-2 text-sm leading-relaxed text-white/90">
          <p className="font-semibold text-white">매장 안내</p>
          <p>{address}</p>
          <p>
            <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="font-semibold hover:underline">
              {phone}
            </a>
            <span className="mx-2 text-white/50">|</span>
            <a href={`tel:${MOBILE_PHONE.replace(/[^0-9+]/g, "")}`} className="font-semibold hover:underline">
              {MOBILE_PHONE}
            </a>
          </p>
          <p className="text-xs text-white/70">© {year} {SITE_NAME}. All rights reserved.</p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white/15 px-5 py-2 text-sm font-bold text-white ring-1 ring-white/25 hover:bg-white/25"
          >
            Instagram {INSTAGRAM_HANDLE}
          </a>
          <div className="w-full max-w-[200px] rounded-2xl bg-white/10 p-2 text-center text-[11px] text-white/80 ring-1 ring-white/20">
            <p className="font-semibold text-white">매장 전경</p>
            <p className="mt-1">이미지는 홈 상단 갤러리/브랜드 영역에서 교체 가능</p>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-center text-xs text-white/65">
        기본 안내 전화 {DEFAULT_PHONE} — 세부 카피는 관리자 페이지에서 수정할 수 있어요.
      </p>
    </footer>
  );
}
