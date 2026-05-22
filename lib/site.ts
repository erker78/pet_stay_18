export const siteConfig = {
  name: "18寵物旅宿網",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://petstay18.example.com",
  description: "整合台灣寵物旅館資訊，依城市、寵物類型、住宿條件與服務特色比較適合毛孩的旅宿。"
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
