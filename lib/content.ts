import type { Hotel } from "@/lib/data";

export type FaqItem = {
  question: string;
  answer: string;
};

export const cityContent = [
  {
    name: "高雄",
    slug: "kaohsiung",
    intro: "高雄店家分布很散，前鎮、左營、三民、鳳山都有不同選擇。建議先看接送距離，再確認可接待寵物和價格級距。",
    areas: ["前鎮區", "左營區", "三民區", "鳳山區", "前金區"],
    faq: [
      { question: "高雄寵物旅館價格怎麼比較？", answer: "不要只看最低價。體重、房型、假日、特殊照護都可能加價，最好把規則一起問清楚。" },
      { question: "第一次住宿要準備什麼？", answer: "先準備疫苗紀錄、飲食習慣、用藥資訊，也要告訴店家毛孩怕什麼、會不會分離焦慮。" }
    ]
  },
  {
    name: "台南",
    slug: "tainan",
    intro: "台南目前資料還在慢慢補。可以先從東區、安平、中西區看起，再依照住宿、安親或貓咪需求縮小範圍。",
    areas: ["東區", "安平區", "中西區"],
    faq: [
      { question: "台南旅遊時可以安排寵物住宿嗎？", answer: "可以，但要先確認報到和接回時間。假日或連假通常更需要提早問。" }
    ]
  },
  {
    name: "屏東",
    slug: "pingtung",
    intro: "屏東常會搭配旅遊行程一起安排。屏東市、潮州、恆春的距離差很多，先看路線會比較省事。",
    areas: ["屏東市", "恆春鎮", "潮州鎮"],
    faq: [
      { question: "屏東長距離接送要注意什麼？", answer: "先問接送範圍、費用和車程安排。如果毛孩容易暈車，也要提前告知。" }
    ]
  }
] as const;

export type SeoCitySlug = (typeof cityContent)[number]["slug"];

export const tagContent = [
  {
    slug: "no-cage",
    name: "不關籠",
    title: "不關籠寵物旅館",
    description: "有些毛孩待在籠內會緊張，可以先看有沒有較自由的活動安排。",
    suitableFor: "適合不習慣長時間待籠內、需要活動或陪伴的毛孩，但仍要看店家的評估方式。",
    notice: "不關籠不代表完全放任。混群、分區、夜間休息和緊急隔離方式都要問清楚。",
    faq: [{ question: "不關籠一定比較好嗎？", answer: "不一定。不同毛孩需要的安全感不同，應以個性、健康與店家管理方式判斷。" }]
  },
  {
    slug: "cat-only",
    name: "貓咪專區",
    title: "貓咪住宿與貓咪專區旅館",
    description: "貓咪換環境壓力大，最好找清楚標示可接待貓咪或貓狗分區的店。",
    suitableFor: "適合容易緊張、怕狗叫聲，或需要比較安靜環境的貓咪。",
    notice: "要確認貓狗是否分區、貓砂怎麼處理、是否會回報食慾和排泄狀況。",
    faq: [{ question: "貓咪第一次住宿需要試住嗎？", answer: "若店家提供評估或短時適應，可降低首次長住的不確定性。" }]
  },
  {
    slug: "large-dog",
    name: "大型犬",
    title: "可接待大型犬的寵物旅館",
    description: "大型犬不是每間都能收，先看清楚體型限制可以省下很多來回詢問。",
    suitableFor: "適合 20kg 以上，或需要較大活動空間、散步安排的狗狗。",
    notice: "大型犬通常會看個性、體重、牽繩習慣和房型，價格也常分級。",
    faq: [{ question: "大型犬價格為什麼差很多？", answer: "體重、房型、人力、散步與清潔成本都可能影響價格。" }]
  },
  {
    slug: "cctv",
    name: "24H 監視",
    title: "有監視器的寵物旅館",
    description: "有監視器會讓人安心一點，但也要知道店家實際怎麼回報。",
    suitableFor: "適合想掌握住宿狀況、第一次讓毛孩外宿會比較不放心的飼主。",
    notice: "CCTV 不等於有人整晚看著。夜間是否有人、緊急狀況怎麼處理，要分開確認。",
    faq: [{ question: "有監視器就有夜間人員嗎？", answer: "不一定。CCTV 與夜間駐點是兩個條件，要分別確認。" }]
  },
  {
    slug: "pickup-service",
    name: "接送服務",
    title: "有接送服務的寵物旅館",
    description: "如果工作時間不好配合，或店家離家比較遠，接送服務會差很多。",
    suitableFor: "適合平日忙、跨區送宿，或旅遊途中不方便親自接送的家庭。",
    notice: "要先問接送範圍、費用、籠具規定，以及臨時改時間怎麼算。",
    faq: [{ question: "接送通常包含在住宿費嗎？", answer: "不一定，需看店家範圍與方案，有些店家會另行報價。" }]
  }
] as const;

export type TagSlug = (typeof tagContent)[number]["slug"];

export const guideCards = [
  {
    slug: "pet-hotel-price",
    title: "寵物旅館價格怎麼看？",
    description: "同樣寫住宿，一晚價格可能差很多。先看懂體重、房型、假日和加價項目。"
  },
  {
    slug: "how-to-choose-pet-hotel",
    title: "第一次選寵物旅館指南",
    description: "第一次外宿最怕漏問。這篇先列出預約前該確認的幾件事。"
  }
];

export const homeFaq: FaqItem[] = [
  { question: "寵物旅館要先看價格還是條件？", answer: "先看能不能住，再看住得舒不舒服。價格最後再和加價項目一起算。" },
  { question: "網站上的資訊可以直接當預約保證嗎？", answer: "不行。這裡是整理資料，實際名額、價格和入住規則仍要以店家回覆為準。" },
  { question: "怎麼判斷適不適合我的毛孩？", answer: "把毛孩個性、健康狀況、用藥、怕不怕狗或陌生環境都告訴店家，再看店家怎麼評估。" }
];

export function cityBySlug(slug: string) {
  return cityContent.find((city) => city.slug === slug);
}

export function tagBySlug(slug: string) {
  return tagContent.find((tag) => tag.slug === slug);
}

export function hotelTagSlugs(hotel: Hotel): TagSlug[] {
  const slugs: TagSlug[] = [];
  if (hotel.hasNoCage) slugs.push("no-cage");
  if (hotel.acceptsCat ?? hotel.petTypes.includes("貓")) slugs.push("cat-only");
  if (hotel.acceptsLargeDog ?? hotel.sizeLimits.includes("大型犬")) slugs.push("large-dog");
  if (hotel.hasCctv ?? hotel.services.includes("24小時監視器")) slugs.push("cctv");
  if (hotel.hasPickupService ?? hotel.services.includes("接送服務")) slugs.push("pickup-service");
  return slugs;
}

export function hotelsForTag(hotels: Hotel[], slug: TagSlug) {
  return hotels.filter((hotel) => hotelTagSlugs(hotel).includes(slug));
}
