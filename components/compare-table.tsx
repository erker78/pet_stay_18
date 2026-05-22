"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useSyncExternalStore, type ReactNode } from "react";
import { Check, MapPin, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatHotelPrice, getHotelDetailUrl, type Hotel } from "@/lib/data";
import {
  compareStorageKey,
  readStoredSlugValue,
  readStoredSlugs,
  subscribeToStoredSlugs,
  writeStoredSlugs
} from "@/components/selection-storage";

type CompareTableProps = {
  hotels: Hotel[];
};

const booleanRows = [
  { label: "可接待貓咪", getValue: (hotel: Hotel) => hotel.acceptsCat ?? hotel.petTypes.includes("貓") },
  { label: "可接待大型犬", getValue: (hotel: Hotel) => hotel.acceptsLargeDog ?? hotel.sizeLimits.includes("大型犬") },
  { label: "24H 監視器", getValue: (hotel: Hotel) => hotel.hasCctv ?? hotel.services.includes("24小時監視器") },
  { label: "接送服務", getValue: (hotel: Hotel) => hotel.hasPickupService ?? hotel.services.includes("接送服務") },
  { label: "不關籠", getValue: (hotel: Hotel) => Boolean(hotel.hasNoCage) },
  { label: "夜間人員", getValue: (hotel: Hotel) => Boolean(hotel.hasNightStaff) },
  { label: "獸醫支援", getValue: (hotel: Hotel) => Boolean(hotel.hasVetSupport) }
];

export function CompareTable({ hotels }: CompareTableProps) {
  const rawSlugs = useSyncExternalStore(
    subscribeToStoredSlugs,
    () => readStoredSlugValue(compareStorageKey),
    () => "[]"
  );
  const selectedSlugs = useMemo(() => parseSlugs(rawSlugs), [rawSlugs]);
  const selectedHotels = useMemo(
    () => selectedSlugs.map((slug) => hotels.find((hotel) => hotel.slug === slug)).filter((hotel): hotel is Hotel => Boolean(hotel)),
    [hotels, selectedSlugs]
  );

  function removeHotel(slug: string) {
    writeStoredSlugs(compareStorageKey, readStoredSlugs(compareStorageKey).filter((item) => item !== slug));
  }

  function clearHotels() {
    writeStoredSlugs(compareStorageKey, []);
  }

  if (!selectedHotels.length) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold">比較清單還是空的</h2>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">
            到城市頁或店家頁按下「加入比較」，這裡會把價格、接待條件與聯絡入口排在一起。
          </p>
          <Button className="mt-6" asChild>
            <Link href="/city/kaohsiung">先看高雄寵物旅館</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <section aria-label="寵物旅館比較清單">
      <div className="flex flex-col justify-between gap-4 rounded-xl border bg-card p-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-primary">已選 {selectedHotels.length} 間</p>
          <h2 className="mt-1 text-2xl font-bold">並排比較住宿條件</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">價格與服務可能依體重、日期和店家規則調整，送出預約前仍要向官方確認。</p>
        </div>
        <Button variant="outline" onClick={clearHotels}>
          <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
          清空比較
        </Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {selectedHotels.map((hotel) => (
          <Card key={hotel.slug} className="overflow-hidden">
            <div className="relative aspect-[16/10] bg-muted">
              <Image src={hotel.images[0].url} alt={hotel.images[0].alt} fill sizes="(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 100vw" className="object-cover" />
            </div>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold">
                    <Link href={getHotelDetailUrl(hotel)}>{hotel.name}</Link>
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {hotel.city.name}・{hotel.district}
                  </p>
                </div>
                <Button variant="ghost" size="icon" aria-label={`移除 ${hotel.name}`} onClick={() => removeHotel(hotel.slug)}>
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
              <p className="mt-4 font-semibold text-primary">{formatHotelPrice(hotel)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[...hotel.petTypes, ...hotel.services].slice(0, 4).map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
              <Button className="mt-5 w-full" asChild>
                <Link href={getHotelDetailUrl(hotel)}>查看店家資訊</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border bg-card">
        <table className="min-w-[760px] w-full border-collapse text-left">
          <caption className="sr-only">已選寵物旅館比較表</caption>
          <thead className="bg-muted/70">
            <tr>
              <th scope="col" className="w-44 border-b px-5 py-4 font-semibold">比較項目</th>
              {selectedHotels.map((hotel) => (
                <th key={hotel.slug} scope="col" className="min-w-56 border-b px-5 py-4 align-top font-semibold">
                  {hotel.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <CompareRow label="城市與區域" hotels={selectedHotels} render={(hotel) => `${hotel.city.name}・${hotel.district}`} />
            <CompareRow label="價格範圍" hotels={selectedHotels} render={formatHotelPrice} />
            <CompareRow label="可接待寵物" hotels={selectedHotels} render={(hotel) => hotel.petTypes.join("、")} />
            <CompareRow label="體型限制" hotels={selectedHotels} render={(hotel) => hotel.sizeLimits.join("、")} />
            <CompareRow label="服務項目" hotels={selectedHotels} render={(hotel) => hotel.services.join("、")} />
            {booleanRows.map((row) => (
              <CompareRow key={row.label} label={row.label} hotels={selectedHotels} render={(hotel) => <BooleanMark value={row.getValue(hotel)} />} />
            ))}
            <CompareRow label="營業時間" hotels={selectedHotels} render={(hotel) => hotel.hours} />
            <CompareRow
              label="官方入口"
              hotels={selectedHotels}
              render={(hotel) => (
                <div className="flex flex-wrap gap-2">
                  {hotel.websiteUrl || hotel.website ? <Button size="sm" variant="outline" asChild><a href={hotel.websiteUrl ?? hotel.website} target="_blank" rel="noreferrer">官網</a></Button> : null}
                  {hotel.lineUrl ? <Button size="sm" variant="outline" asChild><a href={hotel.lineUrl} target="_blank" rel="noreferrer">LINE</a></Button> : null}
                  {hotel.bookingUrl ? <Button size="sm" asChild><a href={hotel.bookingUrl}>預約</a></Button> : null}
                  {!hotel.websiteUrl && !hotel.website && !hotel.lineUrl && !hotel.bookingUrl ? <span className="text-sm text-muted-foreground">請查看店家頁</span> : null}
                </div>
              )}
            />
          </tbody>
        </table>
      </div>
    </section>
  );
}

type CompareRowProps = {
  label: string;
  hotels: Hotel[];
  render: (hotel: Hotel) => ReactNode;
};

function CompareRow({ label, hotels, render }: CompareRowProps) {
  return (
    <tr className="border-b last:border-b-0">
      <th scope="row" className="px-5 py-4 align-top font-semibold">{label}</th>
      {hotels.map((hotel) => <td key={`${label}-${hotel.slug}`} className="px-5 py-4 align-top text-sm leading-6 text-muted-foreground">{render(hotel)}</td>)}
    </tr>
  );
}

function BooleanMark({ value }: { value: boolean }) {
  return value ? (
    <span className="inline-flex items-center gap-1 font-medium text-emerald-700"><Check className="h-4 w-4" aria-hidden="true" />有</span>
  ) : (
    <span className="inline-flex items-center gap-1 text-muted-foreground"><X className="h-4 w-4" aria-hidden="true" />未標示</span>
  );
}

function parseSlugs(rawSlugs: string) {
  try {
    return JSON.parse(rawSlugs) as string[];
  } catch {
    return [];
  }
}
