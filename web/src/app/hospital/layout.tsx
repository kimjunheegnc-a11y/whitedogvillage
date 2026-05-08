import { ServiceSubnav } from "@/components/service/ServiceSubnav";
import { hospitalNav } from "@/lib/service-nav";

export default function HospitalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-[var(--border)] bg-[color-mix(in_srgb,white_88%,var(--accent-2))]">
        <div className="mx-auto max-w-6xl px-4 pb-4 pt-10">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-dark)]">HOSPITAL</p>
          <h1 className="mt-1 text-3xl font-extrabold text-[var(--text)] sm:text-4xl">병원 · 제휴 안내</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            제휴 동물병원 연계와 예방·건강 상담을 안내합니다. 응급 상황은 전화 연결이 가장 빠릅니다. 우측 하단{" "}
            <strong>+ 챗봇</strong>으로도 문의를 받습니다.
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
