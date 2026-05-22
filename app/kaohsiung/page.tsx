import type { Metadata } from "next";
import { RegionPage } from "@/components/region-page";

export const metadata: Metadata = {
  title: "高雄寵物旅館推薦｜18寵物旅宿網",
  description: "精選高雄寵物旅館，支援狗、貓、寵物住宿、寵物安親、美容、24小時監視器與接送服務篩選。",
  alternates: { canonical: "/city/kaohsiung" },
  openGraph: { title: "高雄寵物旅館篩選", description: "依行政區與服務條件篩選高雄寵物旅館。" }
};

type PageProps = {
  searchParams?: Promise<{ filter?: string | string[]; service?: string; district?: string; sort?: string }>;
};

export default async function KaohsiungPage({ searchParams }: PageProps) {
  return <RegionPage citySlug="kaohsiung" searchParams={await searchParams} />;
}
