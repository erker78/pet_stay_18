import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "隱私權政策", description: "毛孩旅宿指南的資料蒐集、聯絡表單與網站分析使用說明。", alternates: { canonical: "/privacy-policy" }, openGraph: { title: "隱私權政策", description: "了解毛孩旅宿指南如何處理使用者資料。" } };

export default function PrivacyPolicyPage() {
  return <Policy title="隱私權政策" paragraphs={["我們僅在使用者主動提交表單或聯絡需求時蒐集必要資訊，用於回覆、資料修正與合作處理。", "網站可能使用分析與廣告技術改善內容體驗。若啟用第三方服務，相關服務可能依其政策處理 cookie 或裝置資訊。", "若需查詢、修正或刪除已提交資料，請透過聯絡頁提出。"]} />;
}

function Policy({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return <main className="container-px py-14"><article className="max-w-3xl"><nav className="text-sm text-muted-foreground"><Link href="/">首頁</Link> / {title}</nav><h1 className="mt-5 text-4xl font-black tracking-normal">{title}</h1><div className="mt-6 grid gap-5 text-lg leading-8 text-muted-foreground">{paragraphs.map((text) => <p key={text}>{text}</p>)}</div></article></main>;
}
