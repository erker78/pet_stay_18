"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cities, type CitySlug } from "@/lib/data";

export function SearchBox() {
  const router = useRouter();
  const [city, setCity] = useState<CitySlug>("kaohsiung");
  const [petType, setPetType] = useState("狗");
  const [service, setService] = useState("寵物住宿");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    params.set("filter", petType);
    params.set("service", service);
    router.push(`/${city}?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-xl border bg-white p-3 shadow-sm md:grid-cols-[1fr_1fr_1fr_auto]">
      <label className="grid gap-1 text-sm font-medium">
        地區
        <select
          name="city"
          value={city}
          onChange={(event) => setCity(event.target.value as CitySlug)}
          className="h-11 rounded-lg border bg-background px-3 text-sm"
        >
          {cities.map((city) => (
            <option key={city.slug} value={city.slug}>
              {city.name}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm font-medium">
        寵物類型
        <select
          name="filter"
          value={petType}
          onChange={(event) => setPetType(event.target.value)}
          className="h-11 rounded-lg border bg-background px-3 text-sm"
        >
          <option value="狗">狗</option>
          <option value="貓">貓</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm font-medium">
        服務類型
        <select
          name="service"
          value={service}
          onChange={(event) => setService(event.target.value)}
          className="h-11 rounded-lg border bg-background px-3 text-sm"
        >
          <option value="寵物住宿">寵物住宿</option>
          <option value="寵物安親">寵物安親</option>
          <option value="寵物美容">寵物美容</option>
        </select>
      </label>
      <Button type="submit" size="lg" className="self-end">
        <Search className="mr-2 h-4 w-4" />
        搜尋
      </Button>
    </form>
  );
}
