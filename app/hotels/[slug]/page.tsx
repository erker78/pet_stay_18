import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HotelDetail } from "@/components/hotel-detail";
import { formatHotelPrice, getHotelBySlug, getHotelDetailUrl, hotels } from "@/lib/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return hotels.map((hotel) => ({ slug: hotel.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const hotel = getHotelBySlug((await params).slug);
  if (!hotel) return { title: "找不到店家" };

  return {
    title: `${hotel.name}｜${hotel.city.name}寵物旅館推薦`,
    description: `${hotel.name}位於${hotel.city.name}${hotel.district}，提供${hotel.services.join("、")}，價格 ${formatHotelPrice(hotel)}。`,
    alternates: { canonical: getHotelDetailUrl(hotel) },
    openGraph: {
      title: `${hotel.name}｜${hotel.city.name}寵物旅館推薦`,
      description: hotel.description,
      images: hotel.images[0]?.url
    }
  };
}

export default async function LegacyHotelPage({ params }: PageProps) {
  const hotel = getHotelBySlug((await params).slug);
  if (!hotel) notFound();
  return <HotelDetail hotel={hotel} />;
}
