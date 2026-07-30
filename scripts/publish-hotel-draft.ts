import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

type SupportedCitySlug = "kaohsiung" | "tainan" | "pingtung";

type DraftHotel = {
  needsReview?: boolean;
  hotel?: Record<string, unknown> & {
    id?: string;
    name?: string;
    slug?: string;
    city?: {
      name?: string;
      slug?: SupportedCitySlug;
    };
  };
};

type PublishableHotel = Record<string, unknown> & {
  id?: string;
  name: string;
  slug: string;
  city: {
    name?: string;
    slug: SupportedCitySlug;
  };
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=1200&q=80"
];

const cityFiles: Record<SupportedCitySlug, string> = {
  kaohsiung: path.join("lib", "hotels", "kaohsiung.ts"),
  tainan: path.join("lib", "hotels", "tainan.ts"),
  pingtung: path.join("lib", "hotels", "pingtung.ts")
};

const cityPrefixes: Record<SupportedCitySlug, string> = {
  kaohsiung: "kh",
  tainan: "tn",
  pingtung: "pt"
};

const hotelOnlyFields = [
  "id",
  "name",
  "slug",
  "city",
  "district",
  "address",
  "phone",
  "lineId",
  "lineUrl",
  "bookingUrl",
  "shareUrl",
  "websiteUrl",
  "website",
  "facebookUrl",
  "instagramUrl",
  "googleMapUrl",
  "description",
  "serviceTags",
  "priceRange",
  "hasNoCage",
  "hasCctv",
  "hasPickupService",
  "acceptsLargeDog",
  "acceptsCat",
  "hasNightStaff",
  "hasVetSupport",
  "highlights",
  "notices",
  "faq",
  "reviewCount",
  "sourceUrl",
  "lastUpdated",
  "priceDetails",
  "stayRulesUrl",
  "priceMin",
  "priceMax",
  "priceLabel",
  "rating",
  "isFeatured",
  "petTypes",
  "sizeLimits",
  "services",
  "tags",
  "hours",
  "images"
] as const;

async function main() {
  const draftPath = process.argv[2];
  if (!draftPath) {
    throw new Error('請提供草稿 JSON 路徑，例如：npm run hotel:publish -- "tmp/imports/example.json"');
  }

  const fullDraftPath = path.resolve(process.cwd(), draftPath);
  if (!existsSync(fullDraftPath)) {
    throw new Error(`找不到草稿檔：${draftPath}`);
  }

  const draft = JSON.parse(readFileSync(fullDraftPath, "utf8")) as DraftHotel;
  const hotel = sanitizeHotel(draft);
  const citySlug = hotel.city.slug;
  const targetFile = cityFiles[citySlug];
  const targetPath = path.resolve(process.cwd(), targetFile);
  const source = readFileSync(targetPath, "utf8");

  assertNoDuplicate(source, hotel.name as string, hotel.slug as string);

  hotel.id = nextHotelId(source, cityPrefixes[citySlug]);

  const nextSource = insertHotel(source, formatHotelObject(hotel));
  writeFileSync(targetPath, nextSource, "utf8");

  console.log(`已加入店家：${hotel.name}`);
  console.log(`寫入檔案：${targetFile}`);
  console.log(`店家 ID：${hotel.id}`);
  console.log(`店家 slug：${hotel.slug}`);
}

function sanitizeHotel(draft: DraftHotel): PublishableHotel {
  if (!draft.hotel) {
    throw new Error("草稿格式錯誤：找不到 hotel 欄位。");
  }

  const citySlug = draft.hotel.city?.slug;
  if (!citySlug || !(citySlug in cityFiles)) {
    throw new Error("草稿格式錯誤：目前只支援 kaohsiung、tainan、pingtung。");
  }

  const requiredFields = ["name", "slug", "district", "address", "googleMapUrl", "description", "priceMin", "priceMax", "isFeatured", "petTypes", "sizeLimits", "services", "tags", "hours", "images"];
  for (const field of requiredFields) {
    if (draft.hotel[field] === undefined || draft.hotel[field] === null) {
      throw new Error(`草稿缺少必要欄位：hotel.${field}`);
    }
  }

  const hotel = Object.fromEntries(
    hotelOnlyFields
      .filter((field) => draft.hotel?.[field] !== undefined)
      .map((field) => [field, draft.hotel?.[field]])
  );

  normalizeLineUrl(hotel);
  ensureImages(hotel);

  return hotel as PublishableHotel;
}

function normalizeLineUrl(hotel: Record<string, unknown>) {
  if (typeof hotel.websiteUrl !== "string") return;

  const isLineUrl = /^https?:\/\/(?:line\.me|lin\.ee)\//i.test(hotel.websiteUrl);
  if (!isLineUrl) return;

  hotel.lineUrl = typeof hotel.lineUrl === "string" ? hotel.lineUrl : hotel.websiteUrl;
  delete hotel.websiteUrl;
}

function ensureImages(hotel: Record<string, unknown>) {
  const images = Array.isArray(hotel.images) ? hotel.images : [];
  if (images.length > 0) return;

  const name = typeof hotel.name === "string" ? hotel.name : "店家";
  hotel.images = fallbackImages.map((url, index) => ({
    url,
    alt: `${name}照片 ${index + 1}`
  }));
}

function assertNoDuplicate(source: string, name: string, slug: string) {
  if (new RegExp(`slug:\\s*["']${escapeRegExp(slug)}["']`).test(source)) {
    throw new Error(`已存在相同 slug：${slug}。請先修改草稿 slug，或確認是否為同一家店。`);
  }

  if (new RegExp(`name:\\s*["']${escapeRegExp(name)}["']`).test(source)) {
    throw new Error(`已存在相同店名：${name}。請確認是否已經加入過。`);
  }
}

function nextHotelId(source: string, prefix: string) {
  const matches = Array.from(source.matchAll(new RegExp(`id:\\s*["']${prefix}-(\\d+)["']`, "g")));
  const numbers = matches.map((match) => Number(match[1])).filter(Number.isFinite);
  const next = Math.max(0, ...numbers) + 1;
  return `${prefix}-${String(next).padStart(2, "0")}`;
}

function insertHotel(source: string, objectText: string) {
  if (!/\n\];\s*$/.test(source)) {
    throw new Error("找不到店家陣列結尾，無法安全寫入。");
  }

  return source.replace(/\n\];\s*$/, `\n${objectText}\n];\n`);
}

function formatHotelObject(hotel: Record<string, unknown>) {
  const text = JSON.stringify(hotel, null, 2)
    .replace(/"([^"]+)":/g, "$1:")
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");

  return `${text},`;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
