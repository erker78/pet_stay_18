import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarCheck, ExternalLink, Facebook, Instagram, LineChart, MapPin, Phone, Share2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HotelCard } from "@/components/hotel-card";
import { formatHotelPrice, getHotelBySlug, getRelatedHotels, hotels } from "@/lib/data";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return hotels.map((hotel) => ({ slug: hotel.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const hotel = getHotelBySlug(slug);
  if (!hotel) {
    return {
      title: "找不到店家"
    };
  }

  return {
    title: `${hotel.name}｜${hotel.city.name}寵物旅館推薦`,
    description: `${hotel.name}位於${hotel.city.name}${hotel.district}，提供${hotel.services.join("、")}，價格 ${formatHotelPrice(hotel)}。`
  };
}

export default async function HotelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const hotel = getHotelBySlug(slug);
  if (!hotel) notFound();

  const relatedHotels = getRelatedHotels(hotel);

  return (
    <main>
      <section className="bg-white">
        <div className="container-px py-8">
          <Link href={`/${hotel.city.slug}`} className="text-sm font-semibold text-primary">
            回到{hotel.city.name}寵物旅館列表
          </Link>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="flex flex-wrap gap-2">
                {hotel.tags.map((tag) => (
                  <Badge key={tag} variant="accent">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="mt-4 text-3xl font-black tracking-normal md:text-5xl">{hotel.name}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {hotel.city.name}・{hotel.district}
                </span>
                {hotel.rating ? (
                  <span className="flex items-center gap-1 font-semibold text-amber-700">
                    <Star className="h-4 w-4 fill-current" />
                    {hotel.rating.toFixed(1)}
                  </span>
                ) : null}
              </div>
            </div>
            <Card className="h-fit">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">每日價格</p>
                <p className="mt-1 text-2xl font-black text-primary">
                  {formatHotelPrice(hotel)}
                </p>
                <div className="mt-5 grid gap-3">
                  {hotel.bookingUrl ? (
                    <Button size="lg" asChild>
                      <a href={hotel.bookingUrl} target={hotel.bookingUrl.startsWith("http") ? "_blank" : undefined} rel={hotel.bookingUrl.startsWith("http") ? "noreferrer" : undefined}>
                        <CalendarCheck className="mr-2 h-5 w-5" />
                        立即預約
                      </a>
                    </Button>
                  ) : null}
                  {hotel.lineId ? (
                    <Button size="lg" variant="outline" asChild>
                      <a href={hotel.lineUrl ?? `https://line.me/R/ti/p/${hotel.lineId}`} target="_blank" rel="noreferrer">
                        <LineChart className="mr-2 h-5 w-5" />
                        LINE 詢問
                      </a>
                    </Button>
                  ) : null}
                  {hotel.shareUrl ? (
                    <Button size="lg" variant="secondary" asChild>
                      <a href={hotel.shareUrl} target="_blank" rel="noreferrer">
                        <Share2 className="mr-2 h-5 w-5" />
                        分享店家
                      </a>
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-[2fr_1fr]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border bg-muted">
              <Image src={hotel.images[0].url} alt={hotel.images[0].alt} fill priority sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
              {hotel.images.slice(1, 3).map((image) => (
                <div key={image.url} className="relative aspect-[16/9] overflow-hidden rounded-xl border bg-muted">
                  <Image src={image.url} alt={image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-px grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>店家介紹</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-8 text-muted-foreground">{hotel.description}</p>
              {hotel.priceDetails ? (
                <div className="mt-5 rounded-xl bg-muted p-4">
                  <h3 className="font-bold">{hotel.priceDetails[0]}</h3>
                  <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                    {hotel.priceDetails.slice(1).map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {hotel.stayRulesUrl ? (
                <Button className="mt-5" variant="outline" asChild>
                  <a href={hotel.stayRulesUrl} target="_blank" rel="noreferrer">
                    查看住宿規則
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>服務與接待條件</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-3">
              <InfoGroup title="可接待寵物" items={hotel.petTypes} />
              <InfoGroup title="體型限制" items={hotel.sizeLimits} />
              <InfoGroup title="服務項目" items={hotel.services} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Google Map</CardTitle>
            </CardHeader>
            <CardContent>
              <iframe
                title={`${hotel.name} Google Map`}
                src={hotel.googleMapUrl}
                className="h-80 w-full rounded-xl border"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </CardContent>
          </Card>
        </div>

        <aside className="grid h-fit gap-6">
          <Card>
            <CardHeader>
              <CardTitle>聯絡資訊</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm">
              <p>
                <span className="block font-semibold">地址</span>
                <span className="text-muted-foreground">{hotel.address}</span>
              </p>
              {hotel.phone ? (
                <p>
                  <span className="block font-semibold">電話</span>
                  <a className="inline-flex items-center gap-1 text-primary" href={`tel:${hotel.phone}`}>
                    <Phone className="h-4 w-4" />
                    {hotel.phone}
                  </a>
                </p>
              ) : null}
              {hotel.lineId ? (
                <p>
                  <span className="block font-semibold">LINE</span>
                  <span className="text-muted-foreground">{hotel.lineId}</span>
                </p>
              ) : null}
              <p>
                <span className="block font-semibold">營業時間</span>
                <span className="text-muted-foreground">{hotel.hours}</span>
              </p>
              {hotel.websiteUrl ? (
                <Button variant="outline" asChild>
                  <a href={hotel.websiteUrl} target="_blank" rel="noreferrer">
                    店家網站
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              ) : null}
              {hotel.facebookUrl ? (
                <Button variant="outline" asChild>
                  <a href={hotel.facebookUrl} target="_blank" rel="noreferrer">
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </a>
                </Button>
              ) : null}
              {hotel.instagramUrl ? (
                <Button variant="outline" asChild>
                  <a href={hotel.instagramUrl} target="_blank" rel="noreferrer">
                    <Instagram className="mr-2 h-4 w-4" />
                    Instagram
                  </a>
                </Button>
              ) : null}
            </CardContent>
          </Card>
        </aside>
      </section>

      <section className="bg-white py-12">
        <div className="container-px">
          <h2 className="text-2xl font-bold tracking-normal">相關推薦店家</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedHotels.map((item) => (
              <HotelCard key={item.id} hotel={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-bold">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item} variant="secondary">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
