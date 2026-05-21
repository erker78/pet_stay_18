import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "聯絡我們",
  description: "聯絡18寵物旅宿網，提供店家推薦、資料修正或合作需求。"
};

export default function ContactPage() {
  return (
    <main className="container-px py-14">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h1 className="text-4xl font-black tracking-normal">聯絡我們</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            歡迎提供店家推薦、資料修正或合作需求。若你是店家，也可以透過刊登頁留下更完整的資訊。
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>留言給我們</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <Input name="name" placeholder="姓名" />
              <Input name="email" type="email" placeholder="Email" />
              <Input name="phone" placeholder="電話" />
              <Textarea name="message" placeholder="請輸入你的訊息" />
              <Button type="submit">送出訊息</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
