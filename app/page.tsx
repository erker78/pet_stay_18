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
  title: "寵物旅館比較入口｜城市、住宿條件與指南",
  description: "找寵物旅館不只看價格。比較不關籠、24H 監視、大型犬、接送與貓咪專區等住宿條件。",
  alternates: { canonical: "/" },
  openGraph: {
    title: "18寵物旅宿網｜寵物旅館比較入口",
    description: "用城市、條件與指南找到適合毛孩的寵物旅館。",
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
            <Badge variant="accent">台灣寵物旅館資訊整合</Badge>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-normal md:text-6xl">找寵物旅館，不只看價格</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">比較不關籠、24H 監視、大型犬、接送、貓咪專區等條件，先找到適合毛孩的照護方式，再聯絡店家確認名額與規則。</p>
            <div className="mt-8"><SearchBox /></div>
            <div className="mt-6 flex flex-wrap gap-3"><Button size="lg" asChild><Link href="/city/kaohsiung">從城市開始<ArrowRight className="ml-2 h-4 w-4" /></Link></Button><Button size="lg" variant="outline" asChild><Link href="/guides/how-to-choose-pet-hotel">第一次怎麼選</Link></Button></div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-2xl border bg-muted shadow-sm">
            <Image src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=85" alt="寵物旅館比較入口" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
      <section className="container-px py-14">
        <h2 className="text-3xl font-bold tracking-normal">城市入口</h2>
        <p className="mt-3 text-muted-foreground">城市頁提供可索引的比較內容、熱門區域與相關條件入口。</p>
        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cityContent.map((city) => <Link key={city.slug} href={`/city/${city.slug}`} className="group"><Card className="h-full transition hover:-translate-y-1 hover:shadow-md"><CardContent className="p-6"><MapPin className="h-7 w-7 text-primary" /><h3 className="mt-4 text-2xl font-bold">{city.name}</h3><p className="mt-3 leading-7 text-muted-foreground">{city.intro}</p><span className="mt-4 inline-flex items-center font-semibold text-primary">查看城市頁<ArrowRight className="ml-1 h-4 w-4" /></span></CardContent></Card></Link>)}
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="container-px">
          <h2 className="text-3xl font-bold">熱門條件入口</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{tagContent.map((tag) => <Card key={tag.slug}><CardContent className="p-5"><h3 className="font-bold">{tag.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{tag.description}</p><Button className="mt-4" asChild variant="outline"><Link href={`/tag/${tag.slug}`}>條件頁</Link></Button></CardContent></Card>)}</div>
        </div>
      </section>
      <section className="container-px py-14">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-3xl font-bold">精選寵物旅館</h2><p className="mt-3 text-muted-foreground">付費曝光與編輯精選未來可在這個區塊分流。</p></div><Button variant="outline" asChild><Link href="/list-your-hotel">店家合作方案</Link></Button></div>
        <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featuredHotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}</div>
      </section>
      <section className="bg-white py-14">
        <div className="container-px grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <section><h2 className="text-3xl font-bold">最新更新</h2><div className="mt-6 grid gap-3">{latestHotels.map((hotel) => <Link key={hotel.slug} href={getHotelDetailUrl(hotel)} className="rounded-xl border p-5 transition hover:bg-muted"><p className="font-bold">{hotel.name}</p><p className="mt-1 text-sm text-muted-foreground">{hotel.city.name}{hotel.district}・更新 {getHotelLastUpdated(hotel)}</p></Link>)}</div></section>
          <section><h2 className="text-3xl font-bold">新手指南入口</h2><div className="mt-6 grid gap-4">{guideCards.map((guide) => <Card key={guide.slug}><CardContent className="p-5"><ShieldCheck className="h-6 w-6 text-primary" /><h3 className="mt-3 text-xl font-bold">{guide.title}</h3><p className="mt-2 leading-7 text-muted-foreground">{guide.description}</p><Button className="mt-4" asChild><Link href={`/guides/${guide.slug}`}>閱讀指南</Link></Button></CardContent></Card>)}</div></section>
        </div>
      </section>
      <section className="container-px py-14"><FaqSection items={homeFaq} /></section>
    </main>
  );
}
