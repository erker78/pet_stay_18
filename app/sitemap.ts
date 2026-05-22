import type { MetadataRoute } from "next";
import { cityContent, guideCards, tagContent } from "@/lib/content";
import { getHotelDetailUrl, hotels } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer", "/list-your-hotel"];
  return [
    ...pages.map((path) => ({ url: absoluteUrl(path), lastModified: new Date("2026-05-22") })),
    ...cityContent.map((city) => ({ url: absoluteUrl(`/city/${city.slug}`), lastModified: new Date("2026-05-22") })),
    ...tagContent.map((tag) => ({ url: absoluteUrl(`/tag/${tag.slug}`), lastModified: new Date("2026-05-22") })),
    ...guideCards.map((guide) => ({ url: absoluteUrl(`/guides/${guide.slug}`), lastModified: new Date("2026-05-22") })),
    ...hotels.map((hotel) => ({ url: absoluteUrl(getHotelDetailUrl(hotel)), lastModified: new Date(hotel.lastUpdated ?? "2026-05-22") }))
  ];
}
