import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="container-px grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold">18寵物旅宿網</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            專注台灣南部寵物旅館推薦，協助飼主用地區、服務與寵物需求找到更安心的住宿選擇。
          </p>
        </div>
        <div>
          <p className="font-semibold">地區入口</p>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <Link href="/kaohsiung">高雄寵物旅館</Link>
            <Link href="/tainan">台南寵物旅館</Link>
            <Link href="/pingtung">屏東寵物旅館</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold">網站資訊</p>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <Link href="/contact">聯絡我們</Link>
            <Link href="/privacy">隱私權政策</Link>
            <Link href="/list-your-hotel">推薦店家刊登</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
