import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { AdSenseScript } from "@/components/adsense-script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

const notoSansTc = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-tc"
});

export const metadata: Metadata = {
  title: {
    default: "18寵物旅宿網｜台灣寵物旅館資訊與比較指南",
    template: "%s｜18寵物旅宿網"
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
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
