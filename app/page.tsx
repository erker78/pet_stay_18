import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HotelCard } from "@/components/hotel-card";
import { SearchBox } from "@/components/search-box";
import { cities, hotels } from "@/lib/data";

export const metadata: Metadata = {
  title: "18寵物旅宿網｜高雄、台南、屏東寵物旅館推薦",
  description: "幫毛孩找到安心住宿。精選高雄、台南、屏東寵物旅館，快速比較價格、服務、寵物類型與地區。"
};

export default function HomePage() {
  const featuredHotels = hotels.filter((hotel) => hotel.isFeatured).slice(0, 6);

  return (
    <main>
      <section className="relative overflow-hidden bg-white">
        <div className="container-px grid min-h-[620px] items-center gap-10 py-12 lg:grid-cols-[1fr_0.9fr]">
          <div className="relative z-10">
            <Badge variant="accent">台灣南部寵物旅館推薦平台</Badge>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-normal md:text-6xl">
              18寵物旅宿網
            </h1>
            <p className="mt-4 text-2xl font-bold text-primary md:text-3xl">幫毛孩找到安心住宿</p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              從高雄、台南到屏東，依地區、寵物類型與服務需求快速找到可信任的寵物住宿、安親與美容店家。
            </p>
            <div className="mt-8">
              <SearchBox />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/kaohsiung">
                  開始找旅館
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/list-your-hotel">推薦店家刊登</Link>
              </Button>
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-2xl border bg-muted shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=85"
              alt="寵物旅宿中的狗狗"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-px py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <Badge variant="secondary">地區入口</Badge>
            <h2 className="mt-3 text-3xl font-bold tracking-normal">先選擇毛孩住宿地區</h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {cities.map((city) => (
            <Link key={city.slug} href={`/${city.slug}`} className="group">
              <Card className="h-full transition hover:-translate-y-1 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold">{city.name}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{city.intro}</p>
                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
                    查看{city.name}店家
                    <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-px">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge variant="accent">精選寵物旅館</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-normal">近期推薦店家</h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/kaohsiung">瀏覽全部店家</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-px py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "安心資訊", text: "整理電話、LINE、價格、服務與特色標籤，讓比較更有效率。" },
            { icon: Building2, title: "店家導流", text: "詳細頁提供預約與分享按鈕，協助飼主快速聯絡店家。" },
            { icon: Sparkles, title: "南部優先", text: "第一階段聚焦高雄、台南、屏東，後續可擴充更多城市。" }
          ].map((item) => (
            <Card key={item.title}>
              <CardContent className="p-6">
                <item.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
