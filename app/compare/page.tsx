import type { Metadata } from "next";
import Link from "next/link";
import { CompareTable } from "@/components/compare-table";
import { Button } from "@/components/ui/button";
import { hotels } from "@/lib/data";

export const metadata: Metadata = {
  title: "寵物旅館比較清單",
  description: "比較已選寵物旅館的價格、接待寵物、體型限制、服務條件與官方聯絡入口。",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "寵物旅館比較清單｜18寵物旅宿網",
    description: "把候選寵物旅館並排比較，再前往店家頁確認入住資訊。"
  },
  robots: {
    index: false,
    follow: true
  }
};

export default function ComparePage() {
  return (
    <main className="container-px py-10 md:py-14">
      <nav className="text-sm text-muted-foreground" aria-label="麵包屑">
        <Link href="/">首頁</Link> / 比較清單
      </nav>
      <div className="mt-5 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black tracking-normal md:text-5xl">寵物旅館比較清單</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            把你挑中的店家放在同一張表裡，先比較價格、接待條件與服務特色，再回到店家頁查看來源與預約入口。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild><Link href="/city/kaohsiung">繼續找店家</Link></Button>
          <Button asChild><Link href="/guides/how-to-choose-pet-hotel">查看挑選指南</Link></Button>
        </div>
      </div>
      <div className="mt-8">
        <CompareTable hotels={hotels} />
      </div>
    </main>
  );
}
