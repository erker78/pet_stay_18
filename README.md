# 18寵物旅宿網

台灣南部寵物旅館推薦平台 MVP，第一階段提供高雄、台南、屏東三個地區的旅館列表、條件篩選、店家詳細頁與刊登導流。

## 技術棧

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- shadcn/ui 風格共用元件
- lucide-react icons

## 安裝

```bash
npm install
```

## 資料庫設定

1. 複製環境變數範本：

```bash
cp .env.example .env
```

2. 修改 `.env` 的 `DATABASE_URL`，指向你的 PostgreSQL 資料庫。

若要部署到正式網域，也請設定：

```env
NEXT_PUBLIC_SITE_URL="https://your-domain.example"
```

這個網址會用於 canonical、sitemap 與 robots 產生的絕對網址。

3. 建立資料表並匯入 seed data：

```bash
npm run prisma:migrate
npm run db:seed
```

seed data 會建立 9 筆假資料：高雄 3 筆、台南 3 筆、屏東 3 筆。

## 啟動

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)。

## Google AdSense

全站已預留 Google AdSense Auto ads script。取得 AdSense publisher ID 後，在 `.env` 或部署平台環境變數設定：

```env
NEXT_PUBLIC_ADSENSE_CLIENT="ca-pub-xxxxxxxxxxxxxxxx"
```

未設定這個變數時，網站不會載入 AdSense script。

## 建置

```bash
npm run build
npm run start
```

## 主要路由

- `/` 首頁
- `/kaohsiung` 高雄寵物旅館列表
- `/tainan` 台南寵物旅館列表
- `/pingtung` 屏東寵物旅館列表
- `/hotels/[slug]` 店家詳細頁
- `/list-your-hotel` 店家刊登頁
- `/about` 關於我們
- `/contact` 聯絡我們
- `/privacy` 隱私權政策

## 備註

目前頁面使用 `lib/data.ts` 的靜態資料渲染，Prisma schema 與 seed 已準備好。後續若要接上真實資料庫，可將列表與詳細頁資料來源改成 Prisma Client 查詢。
