import type { Metadata } from "next";
import { CheckCircle2, Home, Megaphone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "推薦店家刊登",
  description: "寵物旅館、寵物安親與寵物美容店家可申請刊登於18寵物旅宿網，提升搜尋曝光。",
  alternates: { canonical: "/list-your-hotel" },
  openGraph: { title: "推薦店家刊登", description: "申請免費刊登、精選曝光與合作導流。" }
};

const plans = [
  { icon: CheckCircle2, title: "免費刊登", text: "建立基本店家資料頁，包含地址、電話、服務項目與預約導流。" },
  { icon: Star, title: "精選曝光", text: "在地區列表獲得較高排序與精選標籤，適合想提高詢問量的店家。" },
  { icon: Home, title: "首頁推薦", text: "出現在首頁精選寵物旅館區塊，適合新開幕、活動檔期或品牌曝光。" }
];

export default function ListYourHotelPage() {
  return (
    <main>
      <section className="bg-white">
        <div className="container-px grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
              <Megaphone className="h-4 w-4" />
              推薦店家刊登
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-normal md:text-5xl">讓南部飼主更快找到你的寵物旅館</h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              歡迎寵物住宿、安親、美容與接送服務店家申請刊登。我們會協助整理店家資訊，讓飼主能清楚比較並直接聯絡預約。
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>聯絡表單</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <Input name="name" placeholder="聯絡人姓名" />
                <Input name="hotelName" placeholder="店家名稱" />
                <Input name="email" type="email" placeholder="Email" />
                <Input name="phone" placeholder="電話或 LINE ID" />
                <Input name="city" placeholder="所在城市，例如：高雄市" />
                <Textarea name="message" placeholder="請簡單說明店家服務、房型或想刊登的方案" />
                <Button type="submit" size="lg">送出刊登需求</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container-px py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.title}>
              <CardContent className="p-6">
                <plan.icon className="h-9 w-9 text-primary" />
                <h2 className="mt-5 text-xl font-bold">{plan.title}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{plan.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
