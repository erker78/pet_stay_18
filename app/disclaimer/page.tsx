import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "免責聲明", description: "18寵物旅宿網寵物旅館資料與外部連結免責說明。", alternates: { canonical: "/disclaimer" }, openGraph: { title: "免責聲明", description: "旅館資料更新與外部連結說明。" } };

export default function DisclaimerPage() {
  return <main className="container-px py-14"><article className="max-w-3xl"><nav className="text-sm text-muted-foreground"><Link href="/">首頁</Link> / 免責聲明</nav><h1 className="mt-5 text-4xl font-black">免責聲明</h1><div className="mt-6 grid gap-5 text-lg leading-8 text-muted-foreground"><p>本站盡力整理公開與店家提供資訊，但價格、營業時間與住宿規則可能隨時調整。</p><p>外部網站、社群平台與地圖內容由第三方提供，本站不替其可用性與即時性背書。</p><p>寵物住宿涉及個別健康與行為評估，請以店家正式回覆與專業判斷為準。</p></div></article></main>;
}
