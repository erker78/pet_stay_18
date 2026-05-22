import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於我們",
  description: "了解18寵物旅宿網如何整理台灣寵物旅館資訊、城市入口與住宿條件內容。",
  alternates: { canonical: "/about" },
  openGraph: { title: "關於18寵物旅宿網", description: "了解本站的資訊整理目標與內容原則。" }
};

export default function AboutPage() {
  return (
    <main className="container-px py-14">
      <article className="max-w-3xl">
        <h1 className="text-4xl font-black tracking-normal">關於18寵物旅宿網</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          18寵物旅宿網是一個聚焦台灣南部的寵物旅館推薦平台。第一階段整理高雄、台南、屏東三個地區的寵物住宿、安親與美容資訊，讓飼主能用更少時間找到適合毛孩個性與需求的店家。
        </p>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          我們重視資訊清楚、預約便利與在地搜尋體驗，未來會逐步擴充更多店家資料、真實評價與刊登管理功能。
        </p>
      </article>
    </main>
  );
}
