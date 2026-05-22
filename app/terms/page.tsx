import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "服務條款", description: "18寵物旅宿網內容使用與服務條款。", alternates: { canonical: "/terms" }, openGraph: { title: "服務條款", description: "網站內容與使用規範。" } };

export default function TermsPage() {
  return <main className="container-px py-14"><article className="max-w-3xl"><nav className="text-sm text-muted-foreground"><Link href="/">首頁</Link> / 服務條款</nav><h1 className="mt-5 text-4xl font-black">服務條款</h1><div className="mt-6 grid gap-5 text-lg leading-8 text-muted-foreground"><p>本網站提供寵物旅館資訊整理、內容比較與官方導流入口，不構成店家服務保證。</p><p>使用者應於預約前向店家確認名額、價格、入住規則與照護條件。</p><p>未經同意不得大量擷取、重製或冒用本站內容與識別。</p></div></article></main>;
}
