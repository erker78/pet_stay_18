import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import { FaqSection } from "@/components/faq-section";
import { HotelCard } from "@/components/hotel-card";
import { JsonLd } from "@/components/json-ld";
import { SearchBox } from "@/components/search-box";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cityContent, guideCards, homeFaq, tagContent } from "@/lib/content";
import { getHotelDetailUrl, getHotelLastUpdated, hotels } from "@/lib/data";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "寵物旅館怎麼選｜高雄、台南、屏東住宿整理",
  description: "整理南部寵物旅館的價格、可接待寵物、服務條件與官方聯絡方式，預約前先有個底。",
  alternates: { canonical: "/" },
  openGraph: {
    title: "毛孩旅宿指南｜南部寵物旅館整理",
    description: "把高雄、台南、屏東的寵物旅館資訊先整理好，方便飼主慢慢比較。",
    type: "website"
  }
};

export default function HomePage() {
  const featuredHotels = hotels.filter((hotel) => hotel.isFeatured).slice(0, 6);
  const latestHotels = [...hotels]
    .sort((a, b) => getHotelLastUpdated(b).localeCompare(getHotelLastUpdated(a)))
    .slice(0, 4);
  const schema = [
    { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: absoluteUrl("/"), description: siteConfig.description },
    { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") }
  ];

  return (
    <main>
      <JsonLd data={schema} />
      <section className="relative overflow-hidden bg-white">
        <div className="container-px grid min-h-[620px] items-center gap-10 py-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Badge variant="accent">高雄、台南、屏東先整理</Badge>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-normal md:text-6xl">出門幾天，也讓牠住得安心</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">我們把寵物旅館的價格、可接待寵物、LINE、官網和注意事項放在一起。先看一輪，再決定要問哪幾間，會安心很多。</p>
            <div className="mt-8"><SearchBox /></div>
            <div className="mt-6 flex flex-wrap gap-3"><Button size="lg" asChild><Link href="/city/kaohsiung">先看高雄<ArrowRight className="ml-2 h-4 w-4" /></Link></Button><Button size="lg" variant="outline" asChild><Link href="/guides/how-to-choose-pet-hotel">第一次住宿怎麼準備</Link></Button></div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-2xl border bg-muted shadow-sm">
            <Image src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=85" alt="寵物旅館比較入口" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
      <section className="container-px py-14">
        <h2 className="text-3xl font-bold tracking-normal">先從你方便接送的城市找</h2>
        <p className="mt-3 text-muted-foreground">目前先整理南部三個地區。每個城市頁會放店家列表、常見區域和幾個預約前要看的條件。</p>
        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cityContent.map((city) => <Link key={city.slug} href={`/city/${city.slug}`} className="group"><Card className="h-full transition hover:-translate-y-1 hover:shadow-md"><CardContent className="p-6"><MapPin className="h-7 w-7 text-primary" /><h3 className="mt-4 text-2xl font-bold">{city.name}</h3><p className="mt-3 leading-7 text-muted-foreground">{city.intro}</p><span className="mt-4 inline-flex items-center font-semibold text-primary">看看有哪些店<ArrowRight className="ml-1 h-4 w-4" /></span></CardContent></Card></Link>)}
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="container-px">
          <h2 className="text-3xl font-bold">有些條件，預約前最好先問清楚</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{tagContent.map((tag) => <Card key={tag.slug}><CardContent className="p-5"><h3 className="font-bold">{tag.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{tag.description}</p><Button className="mt-4" asChild variant="outline"><Link href={`/tag/${tag.slug}`}>看看相關店家</Link></Button></CardContent></Card>)}</div>
        </div>
      </section>
      <section className="container-px py-14">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-3xl font-bold">最近整理的店家</h2><p className="mt-3 text-muted-foreground">先放幾間資料比較完整的店，之後會慢慢補上更多實際價格和規則。</p></div><Button variant="outline" asChild><Link href="/list-your-hotel">我是店家，想補資料</Link></Button></div>
        <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featuredHotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}</div>
      </section>
      <section className="bg-white py-14">
        <div className="container-px grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <section><h2 className="text-3xl font-bold">最近有更新的資料</h2><div className="mt-6 grid gap-3">{latestHotels.map((hotel) => <Link key={hotel.slug} href={getHotelDetailUrl(hotel)} className="rounded-xl border p-5 transition hover:bg-muted"><p className="font-bold">{hotel.name}</p><p className="mt-1 text-sm text-muted-foreground">{hotel.city.name}{hotel.district}・更新 {getHotelLastUpdated(hotel)}</p></Link>)}</div></section>
          <section><h2 className="text-3xl font-bold">第一次讓毛孩外宿，可以先看這裡</h2><div className="mt-6 grid gap-4">{guideCards.map((guide) => <Card key={guide.slug}><CardContent className="p-5"><ShieldCheck className="h-6 w-6 text-primary" /><h3 className="mt-3 text-xl font-bold">{guide.title}</h3><p className="mt-2 leading-7 text-muted-foreground">{guide.description}</p><Button className="mt-4" asChild><Link href={`/guides/${guide.slug}`}>閱讀</Link></Button></CardContent></Card>)}</div></section>
        </div>
      </section>
      <section className="container-px py-14"><FaqSection items={homeFaq} /></section>
    </main>
  );
}
