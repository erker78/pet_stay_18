import type { Hotel } from "@/lib/data";

export type FaqItem = {
  question: string;
  answer: string;
};

export const cityContent = [
  {
    name: "台北",
    slug: "taipei",
    intro: "台北寵物旅館選擇密度高，適合先比較交通距離、是否有分區照護與每日回報方式。",
    areas: ["中山區", "大安區", "內湖區", "信義區"],
    faq: [
      { question: "台北寵物旅館要提早多久預約？", answer: "連假與寒暑假通常較早額滿，建議先確認入住條件、疫苗與試住安排。" },
      { question: "市區住宿要注意什麼？", answer: "可優先看接送、停車、散步安排與是否能提供即時聯絡方式。" }
    ]
  },
  {
    name: "新北",
    slug: "new-taipei",
    intro: "新北幅員較大，選旅館時除了服務條件，也要把通勤路線與接送範圍一起納入比較。",
    areas: ["板橋區", "新莊區", "中和區", "三重區"],
    faq: [
      { question: "新北跨區接送常見嗎？", answer: "不同店家接送範圍差異大，應在預約前確認費用、時間與交接方式。" },
      { question: "大型犬住宿怎麼篩選？", answer: "先看是否明確接受大型犬，再確認房型、活動時間與照護人力。" }
    ]
  },
  {
    name: "台中",
    slug: "taichung",
    intro: "台中寵物旅館適合依生活圈與服務特色挑選，住宿、美容、安親一站式店家不少。",
    areas: ["西屯區", "北屯區", "南屯區", "西區"],
    faq: [
      { question: "台中住宿和安親怎麼選？", answer: "過夜需求選住宿，白天工作或短時托育可先看安親服務與接送彈性。" },
      { question: "貓咪旅館要看哪些條件？", answer: "可看是否貓狗分區、是否有獨立空間、環境刺激是否可控。" }
    ]
  },
  {
    name: "高雄",
    slug: "kaohsiung",
    intro: "高雄寵物旅館可從前鎮、左營、三民、鳳山等生活圈找起，再比較 CCTV、LINE 聯絡與體型限制。",
    areas: ["前鎮區", "左營區", "三民區", "鳳山區", "前金區"],
    faq: [
      { question: "高雄寵物旅館價格怎麼比較？", answer: "價格會受體重、房型、假日、特殊照護與加購服務影響，應連同注意事項一起看。" },
      { question: "第一次住宿要準備什麼？", answer: "先確認疫苗、晶片或健康狀態要求，並提供飲食、用藥與個性資訊。" }
    ]
  },
  {
    name: "台南",
    slug: "tainan",
    intro: "台南店家資料目前持續整理中，可先依行政區、住宿服務與是否接受貓咪縮小範圍。",
    areas: ["東區", "安平區", "中西區"],
    faq: [
      { question: "台南旅遊時可以安排寵物住宿嗎？", answer: "可以先比對旅遊動線與接送需求，並確認報到與接回時段。" }
    ]
  },
  {
    name: "屏東",
    slug: "pingtung",
    intro: "屏東旅宿挑選常會連動旅行安排，恆春、潮州與屏東市的路線需求不同。",
    areas: ["屏東市", "恆春鎮", "潮州鎮"],
    faq: [
      { question: "屏東長距離接送要注意什麼？", answer: "需先確認接送區域、車程中照護安排與是否另計費用。" }
    ]
  }
] as const;

export type SeoCitySlug = (typeof cityContent)[number]["slug"];

export const tagContent = [
  {
    slug: "no-cage",
    name: "不關籠",
    title: "不關籠寵物旅館",
    description: "比較主打較自由活動安排的寵物旅館，並確認分區管理、安全與休息時間。",
    suitableFor: "適合會因封閉空間緊迫、需要較多活動安排的毛孩，但仍需看店家評估。",
    notice: "不關籠不代表全天無管理，務必確認混群規則、夜間安排與安全隔離流程。",
    faq: [{ question: "不關籠一定比較好嗎？", answer: "不一定。不同毛孩需要的安全感不同，應以個性、健康與店家管理方式判斷。" }]
  },
  {
    slug: "cat-only",
    name: "貓咪專區",
    title: "貓咪住宿與貓咪專區旅館",
    description: "找接受貓咪或提供貓咪友善空間的住宿選擇。",
    suitableFor: "適合容易受狗叫聲、陌生氣味或環境變化影響的貓咪家庭。",
    notice: "確認貓狗是否分區、貓砂與餵食紀錄方式，以及緊急聯絡流程。",
    faq: [{ question: "貓咪第一次住宿需要試住嗎？", answer: "若店家提供評估或短時適應，可降低首次長住的不確定性。" }]
  },
  {
    slug: "large-dog",
    name: "大型犬",
    title: "可接待大型犬的寵物旅館",
    description: "整理明確接受大型犬的店家，方便比較活動空間與體型限制。",
    suitableFor: "適合 20kg 以上或需要較大房型、散步與照護空間的犬隻。",
    notice: "大型犬常有額外評估、價格級距與交接規範，請先聯絡店家。",
    faq: [{ question: "大型犬價格為什麼差很多？", answer: "體重、房型、人力、散步與清潔成本都可能影響價格。" }]
  },
  {
    slug: "cctv",
    name: "24H 監視",
    title: "有監視器的寵物旅館",
    description: "找有 CCTV 或影像觀察安排的寵物旅館，理解回報方式與隱私界線。",
    suitableFor: "適合重視照護透明度與住宿期間狀態回報的飼主。",
    notice: "監視器不等同 24 小時人工值班，仍應確認夜間照護與緊急處理。",
    faq: [{ question: "有監視器就有夜間人員嗎？", answer: "不一定。CCTV 與夜間駐點是兩個條件，要分別確認。" }]
  },
  {
    slug: "pickup-service",
    name: "接送服務",
    title: "有接送服務的寵物旅館",
    description: "比較提供接送的寵物旅館，適合交通安排需要彈性的家庭。",
    suitableFor: "適合工作時間緊、跨區送宿或旅遊交接不方便的飼主。",
    notice: "確認接送區域、費用、寵物籠具與遲到取消規則。",
    faq: [{ question: "接送通常包含在住宿費嗎？", answer: "不一定，需看店家範圍與方案，有些店家會另行報價。" }]
  }
] as const;

export type TagSlug = (typeof tagContent)[number]["slug"];

export const guideCards = [
  {
    slug: "pet-hotel-price",
    title: "寵物旅館價格怎麼看？",
    description: "從體重級距、假日費、特殊照護與加購服務拆解價格差異。"
  },
  {
    slug: "how-to-choose-pet-hotel",
    title: "第一次選寵物旅館指南",
    description: "比較安全、照護條件、聯絡方式與毛孩適應度。"
  }
];

export const homeFaq: FaqItem[] = [
  { question: "寵物旅館要先看價格還是條件？", answer: "先確認可接待寵物、體型與照護條件，再把價格與加價項目一起比較。" },
  { question: "網站上的資訊可以直接當預約保證嗎？", answer: "不行。店家規則會更新，請透過官方網站、LINE 或電話做最後確認。" },
  { question: "如何知道店家是否適合我的毛孩？", answer: "把個性、健康、用藥、是否怕狗或怕陌生環境告訴店家，詢問評估與回報方式。" }
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
