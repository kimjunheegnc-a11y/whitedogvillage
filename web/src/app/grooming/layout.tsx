import { ServiceSubnav } from "@/components/service/ServiceSubnav";
import { groomingNav } from "@/lib/service-nav";

export default function GroomingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto max-w-5xl px-4 pb-5 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-dark)]">GROOMING</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">애견 미용</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            비포·애프터, 코스·가격, 견종 추천까지 한 페이지에서 확인하고 예약은 별도 탭으로 이동합니다.
          </p>
          <div className="mt-6">
            <ServiceSubnav items={groomingNav} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
