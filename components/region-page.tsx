import Link from "next/link";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HotelCard } from "@/components/hotel-card";
import { filterOptions, getCity, getHotelsByCity, type CitySlug, type Hotel } from "@/lib/data";

type RegionPageProps = {
  citySlug: CitySlug;
  searchParams?: {
    filter?: string | string[];
    service?: string;
    district?: string;
    sort?: string;
  };
};

function hotelMatches(hotel: Hotel, selectedFilters: string[]) {
  if (selectedFilters.length === 0) return true;

  const available = new Set([
    ...hotel.petTypes,
    ...hotel.sizeLimits,
    ...hotel.services
  ]);

  return selectedFilters.every((filter) => available.has(filter));
}

function sortHotels(items: Hotel[], sort?: string) {
  return [...items].sort((a, b) => {
    if (sort === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
    if (sort === "price") {
      const priceA = a.priceLabel ? Number.MAX_SAFE_INTEGER : a.priceMin;
      const priceB = b.priceLabel ? Number.MAX_SAFE_INTEGER : b.priceMin;
      return priceA - priceB;
    }
    return Number(b.isFeatured) - Number(a.isFeatured) || (b.rating ?? 0) - (a.rating ?? 0);
  });
}

function getParams(currentFilters: string[], district?: string, sort?: string) {
  const params = new URLSearchParams();
  currentFilters.forEach((item) => params.append("filter", item));
  if (district) params.set("district", district);
  if (sort) params.set("sort", sort);
  return params;
}

function nextFilterHref(citySlug: CitySlug, current: string[], filter: string, district?: string, sort?: string) {
  const set = new Set(current);
  if (set.has(filter)) {
    set.delete(filter);
  } else {
    set.add(filter);
  }
  const params = getParams(Array.from(set), district, sort);
  const query = params.toString();
  return query ? `/${citySlug}?${query}` : `/${citySlug}`;
}

export function RegionPage({ citySlug, searchParams }: RegionPageProps) {
  const city = getCity(citySlug)!;
  const selected = [
    ...(Array.isArray(searchParams?.filter) ? searchParams?.filter : searchParams?.filter ? [searchParams.filter] : []),
    ...(searchParams?.service ? [searchParams.service] : [])
  ];
  const cityHotels = getHotelsByCity(citySlug);
  const districts = Array.from(new Set(cityHotels.map((hotel) => hotel.district)));
  const hotels = sortHotels(
    cityHotels.filter((hotel) => hotelMatches(hotel, selected) && (!searchParams?.district || hotel.district === searchParams.district)),
    searchParams?.sort
  );

  return (
    <main>
      <section className="border-b bg-white">
        <div className="container-px py-10 md:py-14">
          <Badge variant="accent">南部寵物旅館推薦</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-normal md:text-5xl">
            {city.name}寵物旅館推薦
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">{city.intro}</p>
        </div>
      </section>

      <section className="container-px grid gap-8 py-10 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-xl border bg-white p-5">
          <div className="flex items-center gap-2 font-bold">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            條件篩選
          </div>
          <div className="mt-5">
            <p className="text-sm font-semibold">行政區</p>
            <div className="mt-3 flex flex-wrap gap-2 lg:grid">
              <Button asChild variant={searchParams?.district ? "outline" : "default"} className="justify-start">
                <Link href={`/${citySlug}`}>全部行政區</Link>
              </Button>
              {districts.map((district) => {
                const params = getParams(selected, district, searchParams?.sort);
                return (
                  <Button
                    key={district}
                    asChild
                    variant={searchParams?.district === district ? "default" : "outline"}
                    className="justify-start"
                  >
                    <Link href={`/${citySlug}?${params.toString()}`}>{district}</Link>
                  </Button>
                );
              })}
            </div>
          </div>
          <p className="mt-6 text-sm font-semibold">服務條件</p>
          <div className="mt-4 flex flex-wrap gap-2 lg:grid">
            {filterOptions.map((filter) => {
              const active = selected.includes(filter);
              return (
                <Button
                  key={filter}
                  asChild
                  variant={active ? "default" : "outline"}
                  className="justify-start"
                >
                  <Link href={nextFilterHref(citySlug, selected, filter, searchParams?.district, searchParams?.sort)}>{filter}</Link>
                </Button>
              );
            })}
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">共找到 {hotels.length} 間符合條件的寵物旅館</p>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <Button asChild variant={searchParams?.sort ? "outline" : "default"} size="sm">
                <Link href={`/${citySlug}?${getParams(selected, searchParams?.district).toString()}`}>推薦優先</Link>
              </Button>
              <Button asChild variant={searchParams?.sort === "rating" ? "default" : "outline"} size="sm">
                <Link href={`/${citySlug}?${getParams(selected, searchParams?.district, "rating").toString()}`}>評分高到低</Link>
              </Button>
              <Button asChild variant={searchParams?.sort === "price" ? "default" : "outline"} size="sm">
                <Link href={`/${citySlug}?${getParams(selected, searchParams?.district, "price").toString()}`}>價格低到高</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
