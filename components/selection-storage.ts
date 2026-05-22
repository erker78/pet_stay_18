"use client";

export const compareStorageKey = "petstay:compare";
export const favoriteStorageKey = "petstay:favorites";
export const selectionStorageEvent = "petstay:storage";

export function readStoredSlugs(key: string) {
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function readStoredSlugValue(key: string) {
  try {
    return window.localStorage.getItem(key) ?? "[]";
  } catch {
    return "[]";
  }
}

export function writeStoredSlugs(key: string, slugs: string[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(slugs));
  } catch {
    return;
  }
  window.dispatchEvent(new Event(selectionStorageEvent));
}

export function subscribeToStoredSlugs(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(selectionStorageEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(selectionStorageEvent, onStoreChange);
  };
}
