import type { Metadata } from "next";
import { RegionPage } from "@/components/region-page";

export const metadata: Metadata = {
  title: "屏東寵物旅館推薦｜毛孩旅宿指南",
  description: "精選屏東寵物旅館，支援狗、貓、寵物住宿、寵物安親、美容、24小時監視器與接送服務篩選。",
  alternates: { canonical: "/city/pingtung" },
  openGraph: { title: "屏東寵物旅館篩選", description: "依服務條件篩選屏東寵物旅館。" }
};

type PageProps = {
  searchParams?: Promise<{ filter?: string | string[]; service?: string; district?: string; sort?: string }>;
};

export default async function PingtungPage({ searchParams }: PageProps) {
  return <RegionPage citySlug="pingtung" searchParams={await searchParams} />;
}
