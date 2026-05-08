import { ServiceSubnav } from "@/components/service/ServiceSubnav";
import { snacksNav } from "@/lib/service-nav";

export default function SnacksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto max-w-5xl px-4 pb-5 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-dark)]">SNACKS</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">간식 · 사료</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            인기·추천·건강 목적까지 한 페이지에서 보고, 매장 픽업 예약은 &lsquo;간식 담기&rsquo; 탭을 이용해 주세요.
          </p>
          <div className="mt-6">
            <ServiceSubnav items={snacksNav} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
