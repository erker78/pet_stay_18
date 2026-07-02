import { kaohsiungHotels } from "@/lib/hotels/kaohsiung";
import { pingtungHotels } from "@/lib/hotels/pingtung";
import { tainanHotels } from "@/lib/hotels/tainan";

export type CitySlug = "taipei" | "new-taipei" | "taichung" | "kaohsiung" | "tainan" | "pingtung";

export type HotelFaq = {
  question: string;
  answer: string;
};

export type Hotel = {
  id: string;
  name: string;
  slug: string;
  city: {
    name: string;
    slug: CitySlug;
  };
  district: string;
  address: string;
  phone?: string;
  lineId?: string;
  lineUrl?: string;
  bookingUrl?: string;
  shareUrl?: string;
  websiteUrl?: string;
  website?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  googleMapUrl: string;
  description: string;
  serviceTags?: string[];
  priceRange?: string;
  hasNoCage?: boolean;
  hasCctv?: boolean;
  hasPickupService?: boolean;
  acceptsLargeDog?: boolean;
  acceptsCat?: boolean;
  hasNightStaff?: boolean;
  hasVetSupport?: boolean;
  highlights?: string[];
  notices?: string[];
  faq?: HotelFaq[];
  reviewCount?: number;
  sourceUrl?: string;
  lastUpdated?: string;
  priceDetails?: string[];
  stayRulesUrl?: string;
  priceMin: number;
  priceMax: number;
  priceLabel?: string;
  rating?: number;
  isFeatured: boolean;
  petTypes: string[];
  sizeLimits: string[];
  services: string[];
  tags: string[];
  hours: string;
  images: {
    url: string;
    alt: string;
  }[];
};

export const cities = [
  { name: "高雄", slug: "kaohsiung" as const, intro: "港都生活圈、捷運沿線與郊區寬敞旅宿一次看。" },
  { name: "台南", slug: "tainan" as const, intro: "從市區安親到近郊寵物住宿，幫毛孩找熟悉的節奏。" },
  { name: "屏東", slug: "pingtung" as const, intro: "適合長住、接送與戶外活動需求的南國寵物旅宿。" }
];

export const filterOptions = [
  "狗",
  "貓",
  "小型犬",
  "中型犬",
  "大型犬",
  "寵物住宿",
  "寵物安親",
  "寵物美容",
  "24小時監視器",
  "接送服務"
];

export const hotels: Hotel[] = [...kaohsiungHotels, ...tainanHotels, ...pingtungHotels];

export function getCity(slug: CitySlug) {
  return cities.find((city) => city.slug === slug);
}

export function getHotelsByCity(slug: CitySlug) {
  return hotels.filter((hotel) => hotel.city.slug === slug);
}

export function getHotelBySlug(slug: string) {
  return hotels.find((hotel) => hotel.slug === slug);
}

export function getRelatedHotels(hotel: Hotel) {
  return hotels
    .filter((item) => item.slug !== hotel.slug && item.city.slug === hotel.city.slug)
    .slice(0, 3);
}

export function formatPrice(min: number, max: number) {
  return `NT$ ${min.toLocaleString("zh-TW")} - ${max.toLocaleString("zh-TW")} / 日`;
}

export function formatHotelPrice(hotel: Hotel) {
  return hotel.priceLabel ?? hotel.priceRange ?? formatPrice(hotel.priceMin, hotel.priceMax);
}

export function getHotelDetailUrl(hotel: Hotel) {
  return `/pet-hotel/${hotel.city.slug}/${hotel.slug}`;
}

export function getHotelHighlights(hotel: Hotel) {
  return hotel.highlights ?? hotel.tags;
}

export function getHotelNotices(hotel: Hotel) {
  return hotel.notices ?? [
    "店家入住條件、加價項目與可接待名額可能調整，預約前請再向官方確認。",
    "請主動告知毛孩個性、健康狀態、飲食與用藥需求。"
  ];
}

export function getHotelFaq(hotel: Hotel): HotelFaq[] {
  return hotel.faq ?? [
    {
      question: `${hotel.name}適合哪些毛孩？`,
      answer: `目前資料顯示可接待${hotel.petTypes.join("、")}，體型條件為${hotel.sizeLimits.join("、")}，仍以店家入住評估為準。`
    },
    {
      question: `${hotel.name}要如何預約？`,
      answer: hotel.lineId || hotel.lineUrl ? "可先使用 LINE 詢問名額、價格與入住規則。" : "可透過店家電話或官方連結確認名額與入住規則。"
    }
  ];
}

export function getHotelLastUpdated(hotel: Hotel) {
  return hotel.lastUpdated ?? "2026-05-22";
}
