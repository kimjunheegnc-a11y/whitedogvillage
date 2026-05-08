import { ServiceSubnav } from "@/components/service/ServiceSubnav";
import { groomingNav } from "@/lib/service-nav";

export default function GroomingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-[var(--border)] bg-[color-mix(in_srgb,white_88%,var(--accent-2))]">
        <div className="mx-auto max-w-6xl px-4 pb-4 pt-10">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-dark)]">GROOMING</p>
          <h1 className="mt-1 text-3xl font-extrabold text-[var(--text)] sm:text-4xl">애견 미용</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            클리핑·목욕·스포일링까지 단계별 케어.             스트레스를 줄이는 동선과 위생 관리로 아이가 편안한 시간을
            갖도록 돕습니다. 우측 하단 <strong>+ 챗봇</strong>으로도 빠르게 문의할 수 있어요.
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
