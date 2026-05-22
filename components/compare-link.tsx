"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { GitCompareArrows } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  compareStorageKey,
  readStoredSlugValue,
  subscribeToStoredSlugs
} from "@/components/selection-storage";

type CompareLinkProps = {
  compact?: boolean;
};

export function CompareLink({ compact = false }: CompareLinkProps) {
  const rawSlugs = useSyncExternalStore(
    subscribeToStoredSlugs,
    () => readStoredSlugValue(compareStorageKey),
    () => "[]"
  );
  const count = useMemo(() => parseSlugs(rawSlugs).length, [rawSlugs]);

  return (
    <Button variant="ghost" size={compact ? "icon" : "default"} asChild aria-label={compact ? `比較清單 ${count} 間` : undefined}>
      <Link href="/compare">
        <GitCompareArrows className={compact ? "h-5 w-5" : "mr-2 h-4 w-4"} aria-hidden="true" />
        {compact ? null : "比較"}
        {count ? <span className={compact ? "sr-only" : "ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground"}>{count}</span> : null}
      </Link>
    </Button>
  );
}

function parseSlugs(rawSlugs: string) {
  try {
    return JSON.parse(rawSlugs) as string[];
  } catch {
    return [];
  }
}
