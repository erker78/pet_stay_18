import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隱私權政策",
  description: "18寵物旅宿網隱私權政策，說明聯絡表單與網站使用資料處理方式。",
  alternates: { canonical: "/privacy-policy" }
};

export default function PrivacyPage() {
  return (
    <main className="container-px py-14">
      <article className="max-w-3xl">
        <h1 className="text-4xl font-black tracking-normal">隱私權政策</h1>
        <div className="mt-6 grid gap-5 text-lg leading-8 text-muted-foreground">
          <p>
            18寵物旅宿網僅於使用者主動提交表單時蒐集姓名、聯絡方式、店家資訊與留言內容，用於回覆詢問、處理刊登需求或修正網站資料。
          </p>
          <p>
            我們不會出售或任意揭露個人資料。若因服務維護、法律要求或保護網站安全而需要處理資料，將以必要範圍為限。
          </p>
          <p>
            若需要查詢、修正或刪除已提交資料，請透過聯絡我們頁面提出申請。
          </p>
        </div>
      </article>
    </main>
  );
}
