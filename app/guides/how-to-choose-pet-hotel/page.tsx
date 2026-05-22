import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/faq-section";
import { Button } from "@/components/ui/button";
import { tagContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "如何選寵物旅館｜第一次住宿比較指南",
  description: "第一次選寵物旅館，從接待條件、安全、照護回報、注意事項與官方聯絡方式開始比較。",
  alternates: { canonical: "/guides/how-to-choose-pet-hotel" },
  openGraph: { title: "第一次選寵物旅館指南", description: "找寵物旅館，不只看價格。" }
};

export default function ChoosePetHotelGuide() {
  return (
    <main className="container-px py-14">
      <article className="mx-auto max-w-4xl">
        <nav className="text-sm text-muted-foreground"><Link href="/">首頁</Link> / 新手指南</nav>
        <h1 className="mt-5 text-4xl font-black tracking-normal">如何選適合毛孩的寵物旅館</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">先確認能不能住，再比較住得好不好。城市距離只是入口，照護條件與毛孩個性才是決策核心。</p>
        <ol className="mt-10 grid gap-4">
          {[
            "確認寵物類型、體型、疫苗與健康限制。",
            "閱讀住宿規則與加價項目，避免只看每晚低價。",
            "詢問回報方式、夜間安排與緊急狀況處理。",
            "第一次長住前，可評估安親或短住適應。"
          ].map((step, index) => <li key={step} className="rounded-xl border bg-white p-6"><h2 className="text-xl font-bold">步驟 {index + 1}</h2><p className="mt-3 leading-7 text-muted-foreground">{step}</p></li>)}
        </ol>
        <section className="mt-10"><h2 className="text-2xl font-bold">從條件頁開始比較</h2><div className="mt-5 flex flex-wrap gap-2">{tagContent.map((tag) => <Button key={tag.slug} asChild variant="outline"><Link href={`/tag/${tag.slug}`}>{tag.name}</Link></Button>)}</div></section>
        <div className="mt-10"><FaqSection items={[
          { question: "第一次住宿要不要帶熟悉物品？", answer: "可先詢問店家是否允許自備飼料、墊子或有氣味的小物，避免影響管理安全。" },
          { question: "要怎麼比較店家透明度？", answer: "看是否提供官方聯絡入口、住宿規則、價格級距、注意事項與最後更新資訊。" }
        ]} /></div>
      </article>
    </main>
  );
}
