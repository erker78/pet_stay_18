import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { FaqSection } from "@/components/faq-section";
import { HotelCard } from "@/components/hotel-card";
import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cityBySlug, cityContent, tagContent } from "@/lib/content";
import { getHotelsByCity, type CitySlug } from "@/lib/data";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageProps = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return cityContent.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const city = cityBySlug((await params).city);
  if (!city) return { title: "找不到城市" };
  const title = `${city.name}寵物旅館推薦｜住宿條件與店家資訊`;
  const description = `${city.intro} 比較寵物住宿、安親、美容與熱門服務條件。`;
  return {
    title,
    description,
    alternates: { canonical: `/city/${city.slug}` },
    openGraph: { title, description, type: "website" }
  };
}

export default async function CityPage({ params }: PageProps) {
  const city = cityBySlug((await params).city);
  if (!city) notFound();
  const hotels = getHotelsByCity(city.slug as CitySlug);
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${city.name}寵物旅館推薦`,
      description: city.intro,
      url: absoluteUrl(`/city/${city.slug}`)
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteConfig.name, item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: `${city.name}寵物旅館`, item: absoluteUrl(`/city/${city.slug}`) }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: city.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } }))
    }
  ];

  return (
    <main>
      <JsonLd data={schema} />
      <section className="border-b bg-white">
        <div className="container-px py-12">
          <nav className="text-sm text-muted-foreground"><Link href="/">首頁</Link> / {city.name}寵物旅館</nav>
          <Badge className="mt-5" variant="accent">城市入口</Badge>
          <h1 className="mt-4 text-4xl font-black tracking-normal">{city.name}寵物旅館推薦</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">{city.intro}</p>
        </div>
      </section>
      <div className="container-px grid gap-10 py-12">
        <section>
          <h2 className="text-2xl font-bold">熱門區域</h2>
          <div className="mt-5 flex flex-wrap gap-2">{city.areas.map((area) => <Badge key={area} variant="secondary"><MapPin className="mr-1 h-3 w-3" />{area}</Badge>)}</div>
        </section>
        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div><h2 className="text-2xl font-bold">推薦店家列表</h2><p className="mt-2 text-muted-foreground">{hotels.length ? `目前整理 ${hotels.length} 間可比較店家。` : "店家資料持續整理中，先用條件指南建立比較基準。"}</p></div>
            {hotels.length ? <Button asChild variant="outline"><Link href={`/${city.slug}`}>使用篩選列表</Link></Button> : null}
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}</div>
        </section>
        <section>
          <h2 className="text-2xl font-bold">常見篩選條件</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tagContent.map((tag) => <Card key={tag.slug}><CardContent className="p-5"><h3 className="font-bold">{tag.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{tag.description}</p><Button className="mt-4" variant="outline" asChild><Link href={`/tag/${tag.slug}`}>查看條件頁</Link></Button></CardContent></Card>)}
          </div>
        </section>
        <FaqSection items={[...city.faq]} />
        <section className="flex flex-wrap gap-3">
          <Button asChild><Link href="/guides/how-to-choose-pet-hotel">新手選旅館指南</Link></Button>
          <Button asChild variant="outline"><Link href="/guides/pet-hotel-price">寵物旅館價格指南</Link></Button>
        </section>
      </div>
    </main>
  );
}
