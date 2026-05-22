"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Heart, GitCompareArrows } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  compareStorageKey,
  favoriteStorageKey,
  readStoredSlugs,
  subscribeToStoredSlugs,
  writeStoredSlugs
} from "@/components/selection-storage";

type HotelActionsProps = {
  slug: string;
};

export function HotelActions({ slug }: HotelActionsProps) {
  const favorite = useStoredSelection(favoriteStorageKey, slug);
  const compare = useStoredSelection(compareStorageKey, slug);

  function toggle(key: string, selected: boolean) {
    const current = new Set(readStoredSlugs(key));
    if (selected) {
      current.delete(slug);
    } else {
      current.add(slug);
    }
    writeStoredSlugs(key, Array.from(current));
  }

  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-2 gap-2">
        <Button variant={favorite ? "secondary" : "outline"} onClick={() => toggle(favoriteStorageKey, favorite)}>
          <Heart className={`mr-2 h-4 w-4 ${favorite ? "fill-current" : ""}`} />
          {favorite ? "已收藏" : "收藏"}
        </Button>
        <Button variant={compare ? "secondary" : "outline"} onClick={() => toggle(compareStorageKey, compare)}>
          <GitCompareArrows className="mr-2 h-4 w-4" />
          {compare ? "比較中" : "加入比較"}
        </Button>
      </div>
      {compare ? (
        <Button variant="ghost" asChild>
          <Link href="/compare">前往比較清單</Link>
        </Button>
      ) : null}
    </div>
  );
}

function useStoredSelection(key: string, slug: string) {
  return useSyncExternalStore(
    subscribeToStoredSlugs,
    () => readStoredSlugs(key).includes(slug),
    () => false
  );
}
