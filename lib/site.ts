export const siteConfig = {
  name: "毛孩旅宿指南",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://maohai-stay-guide.example.com",
  description: "整理高雄、台南、屏東的寵物旅館資訊，幫飼主先看清楚價格、接待條件與聯絡方式。"
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
