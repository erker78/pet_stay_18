import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, ExternalLink, Facebook, Instagram, LineChart, MapPin, Phone, Share2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaqSection } from "@/components/faq-section";
import { HotelActions } from "@/components/hotel-actions";
import { HotelCard } from "@/components/hotel-card";
import { JsonLd } from "@/components/json-ld";
import { hotelTagSlugs, tagBySlug } from "@/lib/content";
import {
  formatHotelPrice,
  getHotelDetailUrl,
  getHotelFaq,
  getHotelHighlights,
  getHotelLastUpdated,
  getHotelNotices,
  getRelatedHotels,
  type Hotel
} from "@/lib/data";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function HotelDetail({ hotel }: { hotel: Hotel }) {
  const relatedHotels = getRelatedHotels(hotel);
  const faq = getHotelFaq(hotel);
  const detailUrl = getHotelDetailUrl(hotel);
  const lineHref = hotel.lineUrl ?? (hotel.lineId ? `https://line.me/R/ti/p/${hotel.lineId}` : undefined);
  const relatedTags = hotelTagSlugs(hotel).map((slug) => tagBySlug(slug)).filter(Boolean);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "PetService",
      name: hotel.name,
      description: hotel.description,
      url: absoluteUrl(detailUrl),
      telephone: hotel.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: hotel.address,
        addressLocality: hotel.city.name,
        addressRegion: hotel.city.name,
        addressCountry: "TW"
      },
      image: hotel.images.map((image) => image.url),
      priceRange: formatHotelPrice(hotel),
      sameAs: [hotel.websiteUrl, hotel.facebookUrl, hotel.instagramUrl, hotel.lineUrl].filter(Boolean)
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteConfig.name, item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: `${hotel.city.name}寵物旅館`, item: absoluteUrl(`/city/${hotel.city.slug}`) },
        { "@type": "ListItem", position: 3, name: hotel.name, item: absoluteUrl(detailUrl) }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer }
      }))
    }
  ];

  return (
    <main>
      <JsonLd data={jsonLd} />
      <section className="bg-white">
        <div className="container-px py-8">
          <nav className="text-sm text-muted-foreground" aria-label="麵包屑">
            <Link href="/">首頁</Link> / <Link href={`/city/${hotel.city.slug}`}>{hotel.city.name}寵物旅館</Link> / {hotel.name}
          </nav>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="flex flex-wrap gap-2">
                {hotel.tags.map((tag) => <Badge key={tag} variant="accent">{tag}</Badge>)}
              </div>
              <h1 className="mt-4 text-3xl font-black tracking-normal md:text-5xl">{hotel.name}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{hotel.city.name}・{hotel.district}</span>
                {hotel.rating ? <span className="flex items-center gap-1 font-semibold text-amber-700"><Star className="h-4 w-4 fill-current" />{hotel.rating.toFixed(1)}{hotel.reviewCount ? ` (${hotel.reviewCount})` : ""}</span> : null}
              </div>
            </div>
            <Card className="h-fit">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">價格範圍</p>
                <p className="mt-1 text-2xl font-black text-primary">{formatHotelPrice(hotel)}</p>
                <div className="mt-5 grid gap-3">
                  {hotel.bookingUrl ? <Cta href={hotel.bookingUrl} icon={CalendarCheck}>預約導流</Cta> : null}
                  {lineHref ? <Cta href={lineHref} icon={LineChart} variant="outline">LINE 詢問</Cta> : null}
                  {hotel.websiteUrl ? <Cta href={hotel.websiteUrl} icon={ExternalLink} variant="outline">前往官方網站</Cta> : null}
                  {hotel.shareUrl ? <Cta href={hotel.shareUrl} icon={Share2} variant="secondary">分享店家</Cta> : null}
                  <HotelActions slug={hotel.slug} />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-[2fr_1fr]">
            <Media image={hotel.images[0]} priority className="aspect-[16/9]" />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
              {hotel.images.slice(1, 3).map((image) => <Media key={image.url} image={image} className="aspect-[16/9]" />)}
            </div>
          </div>
        </div>
      </section>
      <section className="container-px grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
        <article className="grid gap-6">
          <InfoCard title="店家介紹"><p className="leading-8 text-muted-foreground">{hotel.description}</p>{hotel.priceDetails ? <PriceDetails items={hotel.priceDetails} /> : null}</InfoCard>
          <InfoCard title="特色介紹"><TagList items={getHotelHighlights(hotel)} /></InfoCard>
          <InfoCard title="適合哪些寵物與服務條件">
            <div className="grid gap-6 md:grid-cols-3">
              <InfoGroup title="可接待寵物" items={hotel.petTypes} />
              <InfoGroup title="體型限制" items={hotel.sizeLimits} />
              <InfoGroup title="服務特色" items={hotel.serviceTags ?? hotel.services} />
            </div>
          </InfoCard>
          <InfoCard title="注意事項">
            <ul className="grid gap-2 leading-7 text-muted-foreground">{getHotelNotices(hotel).map((notice) => <li key={notice}>{notice}</li>)}</ul>
            {hotel.stayRulesUrl ? <Button className="mt-5" variant="outline" asChild><a href={hotel.stayRulesUrl} target="_blank" rel="noreferrer">查看住宿規則<ExternalLink className="ml-2 h-4 w-4" /></a></Button> : null}
          </InfoCard>
          <InfoCard title="Google Map"><iframe title={`${hotel.name} Google Map`} src={hotel.googleMapUrl} className="h-80 w-full rounded-xl border" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></InfoCard>
          <FaqSection items={faq} />
        </article>
        <aside className="grid h-fit gap-6">
          <InfoCard title="聯絡資訊">
            <div className="grid gap-4 text-sm">
              <p><span className="block font-semibold">地址</span><span className="text-muted-foreground">{hotel.address}</span></p>
              {hotel.phone ? <p><span className="block font-semibold">電話</span><a className="inline-flex items-center gap-1 text-primary" href={`tel:${hotel.phone}`}><Phone className="h-4 w-4" />{hotel.phone}</a></p> : null}
              {lineHref ? <p><span className="block font-semibold">LINE</span><a className="text-primary" href={lineHref} target="_blank" rel="noreferrer">{hotel.lineId ?? "LINE 詢問"}</a></p> : null}
              <p><span className="block font-semibold">營業時間</span><BusinessHours hours={hotel.hours} /></p>
              {hotel.facebookUrl ? <Social href={hotel.facebookUrl} icon={Facebook}>Facebook</Social> : null}
              {hotel.instagramUrl ? <Social href={hotel.instagramUrl} icon={Instagram}>Instagram</Social> : null}
            </div>
          </InfoCard>
          <InfoCard title="資料狀態">
            <p className="text-sm text-muted-foreground">最後更新：{getHotelLastUpdated(hotel)}</p>
            {hotel.sourceUrl ? <Button className="mt-4 w-full" variant="outline" asChild><a href={hotel.sourceUrl} target="_blank" rel="noreferrer">資料來源<ExternalLink className="ml-2 h-4 w-4" /></a></Button> : <p className="mt-3 text-sm text-muted-foreground">資料來源整理中，預約前請再次確認。</p>}
          </InfoCard>
          <InfoCard title="相關入口">
            <div className="grid gap-2 text-sm font-semibold text-primary">
              <Link href={`/city/${hotel.city.slug}`}>{hotel.city.name}寵物旅館推薦</Link>
              {relatedTags.map((tag) => tag ? <Link key={tag.slug} href={`/tag/${tag.slug}`}>{tag.title}</Link> : null)}
            </div>
          </InfoCard>
        </aside>
      </section>
      <section className="bg-white py-12">
        <div className="container-px">
          <h2 className="text-2xl font-bold tracking-normal">附近或相似寵物旅館推薦</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{relatedHotels.map((item) => <HotelCard key={item.id} hotel={item} />)}</div>
        </div>
      </section>
    </main>
  );
}

function Cta({ href, icon: Icon, variant, children }: { href: string; icon: typeof CalendarCheck; variant?: "outline" | "secondary"; children: React.ReactNode }) {
  return <Button size="lg" variant={variant} asChild><a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}><Icon className="mr-2 h-5 w-5" />{children}</a></Button>;
}

function Social({ href, icon: Icon, children }: { href: string; icon: typeof Facebook; children: React.ReactNode }) {
  return <Button variant="outline" asChild><a href={href} target="_blank" rel="noreferrer"><Icon className="mr-2 h-4 w-4" />{children}</a></Button>;
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <Card><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent>{children}</CardContent></Card>;
}

function Media({ image, priority, className }: { image: Hotel["images"][number]; priority?: boolean; className: string }) {
  return <div className={`relative overflow-hidden rounded-xl border bg-muted ${className}`}><Image src={image.url} alt={image.alt} fill priority={priority} sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" /></div>;
}

function PriceDetails({ items }: { items: string[] }) {
  return <div className="mt-5 rounded-xl bg-muted p-4"><h3 className="font-bold">{items[0]}</h3><ul className="mt-3 grid gap-2 text-sm text-muted-foreground">{items.slice(1).map((detail) => <li key={detail}>{detail}</li>)}</ul></div>;
}

function BusinessHours({ hours }: { hours: string }) {
  const items = hours.split("、").map((item) => item.trim()).filter(Boolean);

  if (items.length <= 1) {
    return <span className="text-muted-foreground">{hours}</span>;
  }

  return <span className="mt-1 grid gap-1 text-muted-foreground">{items.map((item) => <span key={item}>{item}</span>)}</span>;
}

function TagList({ items }: { items: string[] }) {
  return <div className="flex flex-wrap gap-2">{items.map((item) => <Badge key={item} variant="secondary">{item}</Badge>)}</div>;
}

function InfoGroup({ title, items }: { title: string; items: string[] }) {
  return <div><h3 className="font-bold">{title}</h3><div className="mt-3 flex flex-wrap gap-2">{items.map((item) => <Badge key={item} variant="secondary">{item}</Badge>)}</div></div>;
}
