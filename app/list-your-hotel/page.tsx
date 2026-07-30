import type { Metadata } from "next";
import { CheckCircle2, Home, Megaphone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "推薦店家刊登",
  description: "如果你的店有提供寵物住宿、安親或美容服務，歡迎補充資料，讓飼主更容易找到你。",
  alternates: { canonical: "/list-your-hotel" },
  openGraph: { title: "推薦店家刊登", description: "補齊店家資料，讓飼主在搜尋前就看懂你的服務。" }
};

const plans = [
  { icon: CheckCircle2, title: "免費刊登", text: "先把店名、地址、電話、服務項目和官方連結補上，讓飼主找得到正確資訊。" },
  { icon: Star, title: "精選曝光", text: "資料較完整、適合被優先看到的店家，可以放到城市頁或條件頁較前面的位置。" },
  { icon: Home, title: "首頁推薦", text: "如果有新開幕、空房檔期或想推特定服務，可以再討論首頁曝光。" }
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
            <h1 className="mt-5 text-4xl font-black tracking-normal md:text-5xl">讓正在找住宿的飼主，看懂你的店</h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              很多飼主不是不想預約，而是不知道你的店能不能收貓、能不能收大型犬、價格怎麼算、要從哪裡問。把資料整理清楚，詢問會少一點來回，也更容易找到合適的客人。
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
