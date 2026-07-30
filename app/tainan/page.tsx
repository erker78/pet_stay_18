import type { Metadata } from "next";
import { RegionPage } from "@/components/region-page";

export const metadata: Metadata = {
  title: "台南寵物旅館推薦｜毛孩旅宿指南",
  description: "精選台南寵物旅館，支援狗、貓、寵物住宿、寵物安親、美容、24小時監視器與接送服務篩選。",
  alternates: { canonical: "/city/tainan" },
  openGraph: { title: "台南寵物旅館篩選", description: "依服務條件篩選台南寵物旅館。" }
};

type PageProps = {
  searchParams?: Promise<{ filter?: string | string[]; service?: string; district?: string; sort?: string }>;
};

export default async function TainanPage({ searchParams }: PageProps) {
  return <RegionPage citySlug="tainan" searchParams={await searchParams} />;
}
