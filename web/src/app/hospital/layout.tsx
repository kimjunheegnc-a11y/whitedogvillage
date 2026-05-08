import { ServiceSubnav } from "@/components/service/ServiceSubnav";
import { hospitalNav } from "@/lib/service-nav";

export default function HospitalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto max-w-5xl px-4 pb-5 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-dark)]">HOSPITAL</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">제휴 동물병원</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            진료 항목·절차·수의사 소개·응급·접종 안내를 한 페이지에 모았습니다.
          </p>
          <div className="mt-6">
            <ServiceSubnav items={hospitalNav} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
