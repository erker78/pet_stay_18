import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { AdSenseScript } from "@/components/adsense-script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const notoSansTc = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-tc"
});

export const metadata: Metadata = {
  title: {
    default: "18寵物旅宿網｜南部寵物旅館推薦",
    template: "%s｜18寵物旅宿網"
  },
  description: "18寵物旅宿網提供高雄、台南、屏東寵物旅館推薦，支援地區、寵物類型與服務條件篩選。",
  metadataBase: new URL("https://petstay18.example.com"),
  openGraph: {
    title: "18寵物旅宿網",
    description: "幫毛孩找到安心住宿",
    locale: "zh_TW",
    siteName: "18寵物旅宿網",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant-TW">
      <body className={`${notoSansTc.className} min-h-screen antialiased`}>
        <AdSenseScript />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
