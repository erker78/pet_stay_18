import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HotelDetail } from "@/components/hotel-detail";
import { formatHotelPrice, getHotelBySlug, getHotelDetailUrl, hotels } from "@/lib/data";

type PageProps = {
  params: Promise<{ city: string; slug: string }>;
};

export function generateStaticParams() {
  return hotels.map((hotel) => ({ city: hotel.city.slug, slug: hotel.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, slug } = await params;
  const hotel = getHotelBySlug(slug);
  if (!hotel || hotel.city.slug !== city) return { title: "找不到店家" };

  const title = `${hotel.name}｜${hotel.city.name}${hotel.district}寵物旅館資訊`;
  const description = `比較${hotel.name}的服務條件、價格範圍、注意事項與官方聯絡方式。${hotel.city.name}${hotel.district}寵物旅館價格 ${formatHotelPrice(hotel)}。`;

  return {
    title,
    description,
    alternates: { canonical: getHotelDetailUrl(hotel) },
    openGraph: { title, description, type: "article", images: hotel.images[0]?.url }
  };
}

export default async function PetHotelPage({ params }: PageProps) {
  const { city, slug } = await params;
  const hotel = getHotelBySlug(slug);
  if (!hotel || hotel.city.slug !== city) notFound();
  return <HotelDetail hotel={hotel} />;
}
