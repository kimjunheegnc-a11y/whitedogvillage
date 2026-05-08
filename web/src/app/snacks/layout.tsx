import { ServiceSubnav } from "@/components/service/ServiceSubnav";
import { snacksNav } from "@/lib/service-nav";

export default function SnacksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-[var(--border)] bg-[color-mix(in_srgb,white_88%,var(--accent-2))]">
        <div className="mx-auto max-w-6xl px-4 pb-4 pt-10">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-dark)]">SNACKS</p>
          <h1 className="mt-1 text-3xl font-extrabold text-[var(--text)] sm:text-4xl">간식 · 사료 · 용품</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            매장에서 직접 확인하고 담을 수 있도록 구성했습니다. 온라인 결제는 운영하지 않으며, 문의·입고
            확인은 우측 하단 <strong>+ 챗봇</strong>으로도 가능해요.
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
