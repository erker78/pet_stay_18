export type CitySlug = "kaohsiung" | "tainan" | "pingtung";

export type Hotel = {
  id: string;
  name: string;
  slug: string;
  city: {
    name: string;
    slug: CitySlug;
  };
  district: string;
  address: string;
  phone?: string;
  lineId?: string;
  lineUrl?: string;
  bookingUrl?: string;
  shareUrl?: string;
  websiteUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  googleMapUrl: string;
  description: string;
  priceDetails?: string[];
  stayRulesUrl?: string;
  priceMin: number;
  priceMax: number;
  priceLabel?: string;
  rating?: number;
  isFeatured: boolean;
  petTypes: string[];
  sizeLimits: string[];
  services: string[];
  tags: string[];
  hours: string;
  images: {
    url: string;
    alt: string;
  }[];
};

export const cities = [
  { name: "高雄", slug: "kaohsiung" as const, intro: "港都生活圈、捷運沿線與郊區寬敞旅宿一次看。" },
  { name: "台南", slug: "tainan" as const, intro: "從市區安親到近郊寵物住宿，幫毛孩找熟悉的節奏。" },
  { name: "屏東", slug: "pingtung" as const, intro: "適合長住、接送與戶外活動需求的南國寵物旅宿。" }
];

export const filterOptions = [
  "狗",
  "貓",
  "小型犬",
  "中型犬",
  "大型犬",
  "寵物住宿",
  "寵物安親",
  "寵物美容",
  "24小時監視器",
  "接送服務"
];

const imagePool = [
  "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=80"
];

export const hotels: Hotel[] = [
  {
    id: "kh-01",
    name: "橘屋毛孩旅宿",
    slug: "orange-paws-kaohsiung",
    city: { name: "高雄", slug: "kaohsiung" },
    district: "左營區",
    address: "高雄市左營區文自路 18 號",
    phone: "07-345-1818",
    lineId: "@orange-paws",
    bookingUrl: "tel:07-345-1818",
    shareUrl: "https://petstay18.example.com/hotels/orange-paws-kaohsiung",
    websiteUrl: "https://example.com/orange-paws",
    googleMapUrl: "https://www.google.com/maps?q=高雄市左營區文自路18號&output=embed",
    description: "鄰近高鐵與捷運，提供獨立房型、全天候攝影機與每日散步回報。適合第一次外宿或需要穩定作息的狗狗。",
    priceMin: 900,
    priceMax: 1800,
    rating: 4.8,
    isFeatured: true,
    petTypes: ["狗", "貓"],
    sizeLimits: ["小型犬", "中型犬"],
    services: ["寵物住宿", "寵物安親", "24小時監視器", "接送服務"],
    tags: ["近高鐵", "每日照片回報", "獨立套房"],
    hours: "週一至週日 09:00-21:00",
    images: imagePool.slice(0, 3).map((url, index) => ({ url, alt: `橘屋毛孩旅宿照片 ${index + 1}` }))
  },
  {
    id: "kh-02",
    name: "河堤寵物安親館",
    slug: "riverside-pet-care",
    city: { name: "高雄", slug: "kaohsiung" },
    district: "三民區",
    address: "高雄市三民區明哲路 68 號",
    phone: "07-395-2020",
    lineId: "@riversidepet",
    googleMapUrl: "https://www.google.com/maps?q=高雄市三民區明哲路68號&output=embed",
    description: "主打白天安親與短期住宿，室內遊戲區採防滑地墊，照護人員會依毛孩個性安排活動時間。",
    priceMin: 650,
    priceMax: 1500,
    rating: 4.6,
    isFeatured: true,
    petTypes: ["狗"],
    sizeLimits: ["小型犬", "中型犬", "大型犬"],
    services: ["寵物住宿", "寵物安親", "接送服務"],
    tags: ["防滑地墊", "分區活動", "短住友善"],
    hours: "週一至週六 08:30-20:30",
    images: [imagePool[1], imagePool[3], imagePool[0]].map((url, index) => ({ url, alt: `河堤寵物安親館照片 ${index + 1}` }))
  },
  {
    id: "kh-03",
    name: "森呼吸貓狗旅店",
    slug: "forest-breathe-pet-hotel",
    city: { name: "高雄", slug: "kaohsiung" },
    district: "鳳山區",
    address: "高雄市鳳山區青年路二段 120 號",
    phone: "07-777-6120",
    lineId: "@forestpet",
    googleMapUrl: "https://www.google.com/maps?q=高雄市鳳山區青年路二段120號&output=embed",
    description: "貓狗分層照護，附設美容服務與空氣清淨設備，適合需要美容加住宿的一站式需求。",
    priceMin: 800,
    priceMax: 2000,
    rating: 4.7,
    isFeatured: false,
    petTypes: ["狗", "貓"],
    sizeLimits: ["小型犬", "中型犬"],
    services: ["寵物住宿", "寵物美容", "24小時監視器"],
    tags: ["貓狗分層", "美容加購", "空氣清淨"],
    hours: "週二至週日 10:00-20:00",
    images: [imagePool[4], imagePool[2], imagePool[3]].map((url, index) => ({ url, alt: `森呼吸貓狗旅店照片 ${index + 1}` }))
  },
  {
    id: "kh-04",
    name: "Luca寵物旅宿",
    slug: "luca-petstay-kaohsiung",
    city: { name: "高雄", slug: "kaohsiung" },
    district: "前金區",
    address: "高雄市前金區成功一路 352 號",
    phone: "0916-809-181",
    websiteUrl: "https://www.instagram.com/luca_petstay/",
    googleMapUrl: "https://www.google.com/maps?q=高雄市前金區成功一路352號&output=embed",
    description: "提供狗狗住宿服務，依體重區間安排住宿價格，特殊需求服務會依實際照護內容另行加價。",
    priceDetails: [
      "狗狗住宿價格",
      "1-7kg NT$ 500 / 晚",
      "7-14kg NT$ 800 / 晚",
      "14-21kg NT$ 1,200 / 晚",
      "21kg 以上 NT$ 1,600 / 晚",
      "特殊需求服務加價 NT$ 50-100 不等"
    ],
    priceMin: 500,
    priceMax: 1600,
    rating: 5,
    isFeatured: false,
    petTypes: ["狗"],
    sizeLimits: ["小型犬", "中型犬", "大型犬"],
    services: ["寵物住宿"],
    tags: ["狗狗住宿", "體重分級價格", "前金區"],
    hours: "請洽店家確認",
    images: [imagePool[1], imagePool[0], imagePool[2]].map((url, index) => ({ url, alt: `Luca寵物旅宿照片 ${index + 1}` }))
  },
  {
    id: "kh-05",
    name: "妮蘿毛孩沙龍旅店",
    slug: "niro-pet-salon-hotel",
    city: { name: "高雄", slug: "kaohsiung" },
    district: "前鎮區",
    address: "806高雄市前鎮區振興里文林街 43 號",
    phone: "0978-829-128",
    lineId: "@797cxdrc",
    facebookUrl: "https://www.facebook.com/p/%E5%A6%AE%E8%98%BF%E6%AF%9B%E5%AD%A9%E6%B2%99%E9%BE%8D%E6%97%85%E5%BA%97-61563294481634/",
    instagramUrl: "https://www.instagram.com/niropet.hotel",
    googleMapUrl: "https://www.google.com/maps?q=妮蘿毛孩沙龍旅店&output=embed",
    description: "提供寵物住宿、美容與安親服務，重視毛孩在寄宿與整理過程中的舒適感，讓飼主可透過 LINE 先確認照護需求。",
    priceDetails: [
      "狗狗住宿價格",
      "5kg 以下 NT$ 550 / 晚",
      "6-12kg NT$ 650 / 晚",
      "13-20kg NT$ 800 / 晚",
      "21kg 以上 NT$ 2,100 / 晚"
    ],
    stayRulesUrl: "https://www.facebook.com/photo?fbid=122210904380443149&set=pcb.122210906666443149",
    priceMin: 550,
    priceMax: 2100,
    rating: 5,
    isFeatured: false,
    petTypes: ["狗", "貓"],
    sizeLimits: ["請洽店家"],
    services: ["寵物住宿", "寵物安親", "寵物美容"],
    tags: ["美容服務", "寵物安親", "前鎮區"],
    hours: "週一 10:00-18:00、週二休息、週三至週日 10:00-18:00",
    images: [imagePool[3], imagePool[0], imagePool[4]].map((url, index) => ({ url, alt: `妮蘿毛孩沙龍旅店照片 ${index + 1}` }))
  },
  {
    id: "kh-06",
    name: "毛絨絨澡堂x貓茸茸旅館",
    slug: "pet-bathing-cat-hotel",
    city: { name: "高雄", slug: "kaohsiung" },
    district: "前鎮區",
    address: "806高雄市前鎮區忠孝里民權二路 613 號",
    phone: "07-330-0313",
    lineId: "monono_613",
    lineUrl: "https://line.me/ti/p/4S_Xqz8btq",
    websiteUrl: "https://www.pet-bathing.com.tw/",
    googleMapUrl: "https://www.google.com/maps?q=806高雄市前鎮區民權二路613號&output=embed",
    description: "提供寵物美容、住宿與安親服務，毛絨絨澡堂以陪伴與舒適照護為核心，貓茸茸旅館另設貓咪住宿空間，適合先透過 LINE 或電話確認美容與住宿安排。",
    priceMin: 0,
    priceMax: 0,
    priceLabel: "請洽店家",
    isFeatured: false,
    petTypes: ["狗", "貓"],
    sizeLimits: ["請洽店家"],
    services: ["寵物住宿", "寵物安親", "寵物美容"],
    tags: ["貓咪住宿", "美容服務", "前鎮區"],
    hours: "週一至週日 10:00-19:00",
    images: [imagePool[4], imagePool[1], imagePool[0]].map((url, index) => ({ url, alt: `毛絨絨澡堂x貓茸茸旅館照片 ${index + 1}` }))
  },
  {
    id: "tn-01",
    name: "府城毛旅社",
    slug: "tainan-fur-inn",
    city: { name: "台南", slug: "tainan" },
    district: "東區",
    address: "台南市東區崇學路 88 號",
    phone: "06-290-1818",
    lineId: "@furinn",
    googleMapUrl: "https://www.google.com/maps?q=台南市東區崇學路88號&output=embed",
    description: "位於東區生活圈，提供小班制安親、住宿前評估與睡前回報，適合重視細節照護的家庭。",
    priceMin: 700,
    priceMax: 1650,
    rating: 4.9,
    isFeatured: true,
    petTypes: ["狗"],
    sizeLimits: ["小型犬", "中型犬"],
    services: ["寵物住宿", "寵物安親", "24小時監視器"],
    tags: ["小班制", "住宿前評估", "睡前回報"],
    hours: "週一至週日 09:30-21:00",
    images: [imagePool[2], imagePool[0], imagePool[1]].map((url, index) => ({ url, alt: `府城毛旅社照片 ${index + 1}` }))
  },
  {
    id: "tn-02",
    name: "安平日光寵物會館",
    slug: "anping-sun-pet-resort",
    city: { name: "台南", slug: "tainan" },
    district: "安平區",
    address: "台南市安平區健康三街 36 號",
    phone: "06-299-3688",
    lineId: "@sunpet",
    googleMapUrl: "https://www.google.com/maps?q=台南市安平區健康三街36號&output=embed",
    description: "房間採自然採光，提供接送、洗澡美容與長住優惠，假期出遊前可一次安排完整照護。",
    priceMin: 850,
    priceMax: 2100,
    rating: 4.5,
    isFeatured: false,
    petTypes: ["狗", "貓"],
    sizeLimits: ["小型犬", "中型犬", "大型犬"],
    services: ["寵物住宿", "寵物美容", "接送服務"],
    tags: ["自然採光", "長住優惠", "可接大型犬"],
    hours: "週一至週六 09:00-19:30",
    images: [imagePool[3], imagePool[1], imagePool[4]].map((url, index) => ({ url, alt: `安平日光寵物會館照片 ${index + 1}` }))
  },
  {
    id: "tn-03",
    name: "赤崁貓寓",
    slug: "chihkan-cat-lodge",
    city: { name: "台南", slug: "tainan" },
    district: "中西區",
    address: "台南市中西區民權路二段 18 號",
    phone: "06-221-0618",
    lineId: "@chikhancat",
    googleMapUrl: "https://www.google.com/maps?q=台南市中西區民權路二段18號&output=embed",
    description: "專注貓咪住宿，設有垂直跳台、獨立貓房與每日食慾紀錄，讓敏感貓也能慢慢適應。",
    priceMin: 600,
    priceMax: 1300,
    rating: 4.7,
    isFeatured: true,
    petTypes: ["貓"],
    sizeLimits: ["小型犬"],
    services: ["寵物住宿", "24小時監視器"],
    tags: ["貓咪專門", "獨立貓房", "食慾紀錄"],
    hours: "週三至週一 10:00-20:00",
    images: [imagePool[4], imagePool[0], imagePool[2]].map((url, index) => ({ url, alt: `赤崁貓寓照片 ${index + 1}` }))
  },
  {
    id: "pt-01",
    name: "屏東暖窩寵物旅館",
    slug: "pingtung-warm-nest",
    city: { name: "屏東", slug: "pingtung" },
    district: "屏東市",
    address: "屏東縣屏東市自由路 168 號",
    phone: "08-736-1818",
    lineId: "@warmnest",
    googleMapUrl: "https://www.google.com/maps?q=屏東縣屏東市自由路168號&output=embed",
    description: "屏東市中心交通便利，提供住宿、安親與即時訊息回報，適合臨時出差或假日旅遊安排。",
    priceMin: 650,
    priceMax: 1500,
    rating: 4.6,
    isFeatured: true,
    petTypes: ["狗", "貓"],
    sizeLimits: ["小型犬", "中型犬"],
    services: ["寵物住宿", "寵物安親", "24小時監視器"],
    tags: ["市中心", "即時回報", "環境明亮"],
    hours: "週一至週日 09:00-20:30",
    images: [imagePool[0], imagePool[2], imagePool[3]].map((url, index) => ({ url, alt: `屏東暖窩寵物旅館照片 ${index + 1}` }))
  },
  {
    id: "pt-02",
    name: "恆春慢慢住寵物民宿",
    slug: "hengchun-slow-stay-pets",
    city: { name: "屏東", slug: "pingtung" },
    district: "恆春鎮",
    address: "屏東縣恆春鎮省北路 52 號",
    phone: "08-889-2052",
    lineId: "@slowstay",
    googleMapUrl: "https://www.google.com/maps?q=屏東縣恆春鎮省北路52號&output=embed",
    description: "靠近墾丁旅遊動線，可安排接送與戶外散步，適合南下旅行時讓毛孩有安穩落腳處。",
    priceMin: 900,
    priceMax: 2200,
    rating: 4.8,
    isFeatured: true,
    petTypes: ["狗"],
    sizeLimits: ["小型犬", "中型犬", "大型犬"],
    services: ["寵物住宿", "接送服務", "24小時監視器"],
    tags: ["近墾丁", "戶外散步", "旅行友善"],
    hours: "週一至週日 08:30-21:00",
    images: [imagePool[1], imagePool[3], imagePool[0]].map((url, index) => ({ url, alt: `恆春慢慢住寵物民宿照片 ${index + 1}` }))
  },
  {
    id: "pt-03",
    name: "潮州小太陽寵物館",
    slug: "chaozhou-little-sun-pet",
    city: { name: "屏東", slug: "pingtung" },
    district: "潮州鎮",
    address: "屏東縣潮州鎮延平路 99 號",
    phone: "08-789-1199",
    lineId: "@littlesunpet",
    googleMapUrl: "https://www.google.com/maps?q=屏東縣潮州鎮延平路99號&output=embed",
    description: "附設美容與安親服務，照護流程透明，適合平日托育、過夜住宿與定期整理毛髮。",
    priceMin: 550,
    priceMax: 1400,
    rating: 4.4,
    isFeatured: false,
    petTypes: ["狗", "貓"],
    sizeLimits: ["小型犬", "中型犬"],
    services: ["寵物住宿", "寵物安親", "寵物美容"],
    tags: ["美容服務", "平日托育", "價格親切"],
    hours: "週二至週日 09:00-19:00",
    images: [imagePool[2], imagePool[4], imagePool[1]].map((url, index) => ({ url, alt: `潮州小太陽寵物館照片 ${index + 1}` }))
  }
];

export function getCity(slug: CitySlug) {
  return cities.find((city) => city.slug === slug);
}

export function getHotelsByCity(slug: CitySlug) {
  return hotels.filter((hotel) => hotel.city.slug === slug);
}

export function getHotelBySlug(slug: string) {
  return hotels.find((hotel) => hotel.slug === slug);
}

export function getRelatedHotels(hotel: Hotel) {
  return hotels
    .filter((item) => item.slug !== hotel.slug && item.city.slug === hotel.city.slug)
    .slice(0, 3);
}

export function formatPrice(min: number, max: number) {
  return `NT$ ${min.toLocaleString("zh-TW")} - ${max.toLocaleString("zh-TW")} / 日`;
}

export function formatHotelPrice(hotel: Hotel) {
  return hotel.priceLabel ?? formatPrice(hotel.priceMin, hotel.priceMax);
}
