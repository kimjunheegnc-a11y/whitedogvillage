import { ServiceSubnav } from "@/components/service/ServiceSubnav";
import { bunyangNav } from "@/lib/service-nav";

export default function BunyangLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-[var(--border)] bg-[color-mix(in_srgb,white_88%,var(--accent-2))]">
        <div className="mx-auto max-w-6xl px-4 pb-4 pt-10">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-dark)]">ADOPTION</p>
          <h1 className="mt-1 text-3xl font-extrabold text-[var(--text)] sm:text-4xl">분양 상담</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            건강검진과 기본 접종·면역 상태를 확인한 뒤, 가정 환경에 맞는 상담을 진행합니다. 우측 하단{" "}
            <strong>+ 챗봇</strong>으로도 분양 문의를 받습니다.
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
