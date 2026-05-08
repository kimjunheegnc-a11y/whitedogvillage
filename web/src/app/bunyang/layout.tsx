import { ServiceSubnav } from "@/components/service/ServiceSubnav";
import { bunyangNav } from "@/lib/service-nav";

export default function BunyangLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-[var(--border)] bg-[color-mix(in_srgb,white_96%,var(--accent-2))]">
        <div className="mx-auto max-w-5xl px-4 pb-5 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-dark)]">ADOPTION</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">분양</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            카드에서 아이를 선택하면 상세 정보를 볼 수 있습니다. 상담·예약은 별도 탭으로 이동합니다.
          </p>
          <div className="mt-6">
            <ServiceSubnav items={bunyangNav} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
