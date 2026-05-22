import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/faq-section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "寵物旅館價格指南｜費用級距與加價項目",
  description: "了解寵物旅館價格如何受體重、房型、假日、特殊需求與美容安親加購影響。",
  alternates: { canonical: "/guides/pet-hotel-price" },
  openGraph: { title: "寵物旅館價格指南", description: "比較寵物住宿前，先拆解費用級距與常見加價項目。" }
};

export default function PetHotelPriceGuide() {
  return (
    <main className="container-px py-14">
      <article className="mx-auto max-w-4xl">
        <nav className="text-sm text-muted-foreground"><Link href="/">首頁</Link> / 價格指南</nav>
        <h1 className="mt-5 text-4xl font-black tracking-normal">寵物旅館價格怎麼看？</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">住宿價格不只是每晚費用。飼主需要一起看體重級距、房型、安全照護、假日費與特殊需求加價。</p>
        <div className="mt-10 grid gap-6">
          {[
            ["先看計價單位", "多數店家依每晚或每日計價，接送、美容、安親與延時接回可能分開計費。"],
            ["體重與體型常影響級距", "大型犬通常需要更大活動空間與照護人力，價格不宜直接和小型犬相比。"],
            ["特殊照護要明列", "餵藥、分餐、老犬照護、情緒適應與額外回報都有可能產生服務費。"],
            ["用條件比價格", "CCTV、夜間人員、不關籠安排、貓咪專區與官方聯絡透明度，都會改變住宿價值。"]
          ].map(([title, text]) => (
            <section key={title} className="rounded-xl border bg-white p-6">
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
            </section>
          ))}
        </div>
        <div className="mt-10"><FaqSection items={[
          { question: "價格最低就適合嗎？", answer: "不一定。先確認毛孩能否入住、照護方式是否合適，再比較總費用。" },
          { question: "為什麼網站價格和店家報價不同？", answer: "連假、體重、特殊需求與方案更新都可能改變實際報價，最後以官方確認為準。" }
        ]} /></div>
        <div className="mt-10 flex flex-wrap gap-3"><Button asChild><Link href="/city/kaohsiung">查看城市頁</Link></Button><Button asChild variant="outline"><Link href="/guides/how-to-choose-pet-hotel">選旅館指南</Link></Button></div>
      </article>
    </main>
  );
}
