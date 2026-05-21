import type { Metadata } from "next";
import { RegionPage } from "@/components/region-page";

export const metadata: Metadata = {
  title: "屏東寵物旅館推薦｜18寵物旅宿網",
  description: "精選屏東寵物旅館，支援狗、貓、寵物住宿、寵物安親、美容、24小時監視器與接送服務篩選。"
};

type PageProps = {
  searchParams?: Promise<{ filter?: string | string[]; service?: string; sort?: string }>;
};

export default async function PingtungPage({ searchParams }: PageProps) {
  return <RegionPage citySlug="pingtung" searchParams={await searchParams} />;
}
