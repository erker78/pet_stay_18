import { mkdir, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

type PlaceDetails = {
  id: string;
  displayName?: { text?: string; languageCode?: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  googleMapsUri?: string;
  regularOpeningHours?: {
    weekdayDescriptions?: string[];
  };
  rating?: number;
  userRatingCount?: number;
  businessStatus?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
};

type DraftHotel = {
  needsReview: true;
  reviewNotes: string[];
  source: {
    inputUrl: string;
    resolvedUrl?: string;
    placeId: string;
    googleMapsUri?: string;
    websiteUri?: string;
    importedAt: string;
  };
  hotel: {
    id: string;
    name: string;
    slug: string;
    city: { name: string; slug: "kaohsiung" | "tainan" | "pingtung" };
    district: string;
    address: string;
    phone?: string;
    websiteUrl?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    lineUrl?: string;
    googleMapUrl: string;
    description: string;
    priceMin: number;
    priceMax: number;
    priceLabel: string;
    rating?: number;
    reviewCount?: number;
    isFeatured: false;
    petTypes: string[];
    sizeLimits: string[];
    services: string[];
    tags: string[];
    highlights: string[];
    sourceUrl?: string;
    lastUpdated: string;
    hours: string;
    priceCandidates?: string[];
    images: { url: string; alt: string }[];
  };
};

const cityIdPrefix = {
  kaohsiung: "kh",
  tainan: "tn",
  pingtung: "pt"
} satisfies Record<DraftHotel["hotel"]["city"]["slug"], string>;

const placeFields = [
  "id",
  "displayName",
  "formattedAddress",
  "nationalPhoneNumber",
  "internationalPhoneNumber",
  "websiteUri",
  "googleMapsUri",
  "regularOpeningHours",
  "rating",
  "userRatingCount",
  "businessStatus",
  "location"
].join(",");

const cityMap = [
  { name: "高雄", slug: "kaohsiung" as const, aliases: ["高雄市", "高雄"] },
  { name: "台南", slug: "tainan" as const, aliases: ["台南市", "臺南市", "台南", "臺南"] },
  { name: "屏東", slug: "pingtung" as const, aliases: ["屏東縣", "屏東"] }
];

async function main() {
  loadEnv();

  const inputUrl = process.argv[2];
  if (!inputUrl) {
    throw new Error('請提供 Google Maps 連結，例如：npm run hotel:import -- "https://maps.app.goo.gl/..."');
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("找不到 GOOGLE_MAPS_API_KEY，請先加到 .env。");
  }

  const resolvedUrl = await resolveUrl(inputUrl);
  const textQuery = extractTextQuery(resolvedUrl) ?? inputUrl;
  const placeId = await findPlaceId(textQuery, apiKey);
  const place = await getPlaceDetails(placeId, apiKey);
  const websiteLinks = place.websiteUri ? await inspectWebsite(place.websiteUri) : {};
  const draft = buildDraft(inputUrl, resolvedUrl, place, websiteLinks);
  const outputPath = path.join("tmp", "imports", `${draft.hotel.slug}.json`);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(draft, null, 2)}\n`, "utf8");

  console.log(`已產生草稿：${outputPath}`);
  console.log(`店名：${draft.hotel.name}`);
  console.log(`城市：${draft.hotel.city.name} ${draft.hotel.district}`);
  console.log(`提醒：這是草稿，價格、可接待寵物與住宿條件仍需人工確認。`);
}

function loadEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!existsSync(envPath)) return;

  const content = readFileSync(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue;
    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}

async function resolveUrl(inputUrl: string) {
  try {
    const response = await fetch(inputUrl, { redirect: "follow" });
    return response.url || inputUrl;
  } catch {
    return inputUrl;
  }
}

function extractTextQuery(url: string) {
  try {
    const parsed = new URL(url);
    const query = parsed.searchParams.get("q") ?? parsed.searchParams.get("query");
    if (query) return query;

    const placeMatch = parsed.pathname.match(/\/place\/([^/]+)/);
    if (placeMatch?.[1]) {
      return decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
    }
  } catch {
    return undefined;
  }

  return undefined;
}

async function findPlaceId(textQuery: string, apiKey: string) {
  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress"
    },
    body: JSON.stringify({
      textQuery,
      languageCode: "zh-TW",
      regionCode: "TW"
    })
  });

  if (!response.ok) {
    throw new Error(`Places Text Search 失敗：${response.status} ${await response.text()}`);
  }

  const data = (await response.json()) as { places?: Array<{ id: string }> };
  const placeId = data.places?.[0]?.id;
  if (!placeId) {
    throw new Error(`找不到符合的 Google Place：${textQuery}`);
  }

  return placeId;
}

async function getPlaceDetails(placeId: string, apiKey: string) {
  const url = new URL(`https://places.googleapis.com/v1/places/${placeId}`);
  url.searchParams.set("languageCode", "zh-TW");
  url.searchParams.set("regionCode", "TW");

  const response = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": placeFields
    }
  });

  if (!response.ok) {
    throw new Error(`Places Details 失敗：${response.status} ${await response.text()}`);
  }

  return (await response.json()) as PlaceDetails;
}

async function inspectWebsite(websiteUrl: string) {
  try {
    const response = await fetch(websiteUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MaohaiStayGuideImporter/1.0)"
      }
    });
    if (!response.ok) return {};

    const html = await response.text();
    return {
      facebookUrl: firstUrl(html, /https?:\/\/(?:www\.)?facebook\.com\/[^"'<>\s)]+/i),
      instagramUrl: firstUrl(html, /https?:\/\/(?:www\.)?instagram\.com\/[^"'<>\s)]+/i),
      lineUrl: firstUrl(html, /https?:\/\/line\.me\/[^"'<>\s)]+/i) ?? firstUrl(html, /https?:\/\/lin\.ee\/[^"'<>\s)]+/i),
      priceCandidates: extractPriceCandidates(html)
    };
  } catch {
    return {};
  }
}

function firstUrl(text: string, pattern: RegExp) {
  const match = text.match(pattern)?.[0];
  return match ? cleanupUrl(match) : undefined;
}

function cleanupUrl(url: string) {
  return url.replace(/&amp;/g, "&").replace(/[),.，。]+$/g, "");
}

function extractPriceCandidates(html: string) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&");

  const candidates = Array.from(
    new Set(
      text
        .split(/\r?\n/)
        .map((line) => line.trim().replace(/\s+/g, " "))
        .filter((line) => /(住宿|房型|價格|平日|假日|NT\$|元|\$)/.test(line))
        .filter((line) => line.length >= 6 && line.length <= 120)
    )
  );

  return candidates.slice(0, 20);
}

function buildDraft(
  inputUrl: string,
  resolvedUrl: string,
  place: PlaceDetails,
  websiteLinks: {
    facebookUrl?: string;
    instagramUrl?: string;
    lineUrl?: string;
    priceCandidates?: string[];
  }
): DraftHotel {
  const name = place.displayName?.text ?? "未命名店家";
  const address = place.formattedAddress ?? "";
  const city = detectCity(address);
  const district = detectDistrict(address);
  const today = new Date().toISOString().slice(0, 10);
  const slug = makeSlug(name, place.websiteUri, place.id);
  const phone = place.nationalPhoneNumber ?? place.internationalPhoneNumber;
  const hours = place.regularOpeningHours?.weekdayDescriptions?.join("、") ?? "請洽店家確認";
  const googleMapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address || name)}&output=embed`;

  return {
    needsReview: true,
    reviewNotes: [
      "Google Places 不一定提供寵物住宿細節，petTypes、sizeLimits、services 需人工確認。",
      "價格資料若只出現在社群圖片或貼文，通常需要人工補上。",
      "Facebook、Instagram、LINE 為官網 HTML 中自動偵測結果，仍需打開確認是否為官方帳號。"
    ],
    source: {
      inputUrl,
      resolvedUrl,
      placeId: place.id,
      googleMapsUri: place.googleMapsUri,
      websiteUri: place.websiteUri,
      importedAt: new Date().toISOString()
    },
    hotel: {
      id: `${cityIdPrefix[city.slug]}-TODO`,
      name,
      slug,
      city: { name: city.name, slug: city.slug },
      district,
      address,
      phone,
      websiteUrl: place.websiteUri,
      facebookUrl: websiteLinks.facebookUrl,
      instagramUrl: websiteLinks.instagramUrl,
      lineUrl: websiteLinks.lineUrl,
      googleMapUrl,
      description: `${name}位於${city.name}${district}，目前已整理 Google Maps 上的地址、電話、營業時間與官方連結。實際住宿價格、可接待寵物與入住規則，建議預約前再向店家確認。`,
      priceMin: 0,
      priceMax: 0,
      priceLabel: "請洽店家",
      rating: place.rating,
      reviewCount: place.userRatingCount,
      isFeatured: false,
      petTypes: [],
      sizeLimits: ["請洽店家"],
      services: ["寵物住宿"],
      tags: [district].filter(Boolean),
      highlights: ["Google Maps 基本資料已匯入", "價格與入住條件待人工確認"],
      sourceUrl: place.websiteUri ?? place.googleMapsUri,
      lastUpdated: today,
      hours,
      priceCandidates: websiteLinks.priceCandidates,
      images: []
    }
  };
}

function detectCity(address: string) {
  const city = cityMap.find((item) => item.aliases.some((alias) => address.includes(alias)));
  if (!city) {
    throw new Error(`目前只支援高雄、台南、屏東，無法從地址判斷城市：${address}`);
  }
  return city;
}

function detectDistrict(address: string) {
  const match = address.match(/(?:高雄市|台南市|臺南市|屏東縣)?([^0-9\s,，]{2,4}(?:區|鎮|鄉|市))/);
  return match?.[1] ?? "請補行政區";
}

function makeSlug(name: string, websiteUrl: string | undefined, placeId: string) {
  const hostSlug = websiteUrl ? slugifyHost(websiteUrl) : undefined;
  if (hostSlug) return hostSlug;

  const asciiName = name
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

  return asciiName || `google-place-${placeId.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24)}`;
}

function slugifyHost(websiteUrl: string) {
  try {
    const hostname = new URL(websiteUrl).hostname.replace(/^www\./, "");
    return hostname
      .split(".")
      .filter((part) => !["com", "tw", "net", "org"].includes(part))
      .join("-")
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  } catch {
    return undefined;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
