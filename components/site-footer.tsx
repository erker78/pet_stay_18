import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="container-px grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold">毛孩旅宿指南</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            以城市、照護條件與內容指南整理台灣寵物旅館資訊，協助飼主先比較再聯絡官方。
          </p>
        </div>
        <div>
          <p className="font-semibold">地區入口</p>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <Link href="/city/kaohsiung">高雄寵物旅館</Link>
            <Link href="/city/tainan">台南寵物旅館</Link>
            <Link href="/city/pingtung">屏東寵物旅館</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold">網站資訊</p>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <Link href="/contact">聯絡我們</Link>
            <Link href="/privacy-policy">隱私權政策</Link>
            <Link href="/terms">服務條款</Link>
            <Link href="/disclaimer">免責聲明</Link>
            <Link href="/list-your-hotel">推薦店家刊登</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
