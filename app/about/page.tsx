import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於我們",
  description: "毛孩旅宿指南整理南部寵物旅館資訊，讓飼主預約前先看懂價格、條件與聯絡方式。",
  alternates: { canonical: "/about" },
  openGraph: { title: "關於毛孩旅宿指南", description: "我們怎麼整理寵物旅館資料，以及為什麼先從南部開始。" }
};

export default function AboutPage() {
  return (
    <main className="container-px py-14">
      <article className="max-w-3xl">
        <h1 className="text-4xl font-black tracking-normal">關於毛孩旅宿指南</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          我們一開始只是想解決一個很實際的問題：臨時要出門時，要去哪裡找一間能安心托付毛孩的旅館？所以這個網站先從高雄、台南、屏東開始，把店家的價格、服務、聯絡方式和注意事項整理在一起。
        </p>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          網站上的資料會盡量標明來源與更新時間，但寵物旅館的名額、價格和入住規則常會調整。真正預約前，還是建議直接和店家確認一次。
        </p>
      </article>
    </main>
  );
}
