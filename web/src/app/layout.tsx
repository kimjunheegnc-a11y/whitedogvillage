import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SiteHeader, MobileQuickBar } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { DEFAULT_ADDRESS, DEFAULT_HOURS, DEFAULT_PHONE, SITE_NAME } from "@/lib/constants";
import { loadContentMap } from "@/lib/content-load";
import { asText } from "@/lib/json-content";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

const sha = process.env.VERCEL_GIT_COMMIT_SHA;

export const metadata: Metadata = {
  title: `${SITE_NAME} | 반려동물 전문`,
  description: "분양, 호텔, 미용, 병원 제휴, 간식, 후기 — 하얀 개 마을",
  ...(sha ? { other: { "deployment-git-sha": sha } } : {}),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const map = await loadContentMap();
  const phone = asText(map["phone"], DEFAULT_PHONE);
  const address = asText(map["contact_address"], DEFAULT_ADDRESS);
  const hours = asText(map["contact_hours"], DEFAULT_HOURS);

  return (
    <html lang="ko">
      <body className={`${noto.variable} font-sans antialiased`}>
        <SiteHeader phone={phone} />
        <main className="min-h-[70vh] pb-28 lg:pb-0">{children}</main>
        <SiteFooter phone={phone} address={address} hours={hours} />
        <MobileQuickBar phone={phone} />
        <ChatbotWidget />
      </body>
    </html>
  );
}
