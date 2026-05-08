import { ServiceSubnav } from "@/components/service/ServiceSubnav";
import { hotelNav } from "@/lib/service-nav";

export default function HotelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto max-w-5xl px-4 pb-5 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-dark)]">HOTEL</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">애견 호텔</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            공간 소개부터 루틴·가격·준비물, 예약 가능 일정까지 이 페이지에서 확인하세요.
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
