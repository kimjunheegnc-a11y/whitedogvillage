import { ServiceSubnav } from "@/components/service/ServiceSubnav";
import { hotelNav } from "@/lib/service-nav";

export default function HotelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-[var(--border)] bg-[color-mix(in_srgb,white_88%,var(--accent-2))]">
        <div className="mx-auto max-w-6xl px-4 pb-4 pt-10">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-dark)]">HOTEL</p>
          <h1 className="mt-1 text-3xl font-extrabold text-[var(--text)] sm:text-4xl">애견 호텔</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            체크인부터 하우스키핑까지 안전한 동선으로 케어합니다. 산책·놀이·휴식 리듬을 맞춰 스트레스를
            줄이고, 우측 하단 <strong>+ 챗봇</strong>으로도 예약 문의가 가능해요.
          </p>
          <div className="mt-6">
            <ServiceSubnav items={hotelNav} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
