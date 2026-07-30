# 毛孩旅宿指南

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

開啟 [http://localhost:3001](http://localhost:3001)。

## 從 Google Maps 產生店家草稿

`.env` 加上 Google Maps Platform API key：

```env
GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
```

建議這把 key 只開啟 Places API，並在 Google Cloud Console 設定 API 限制，避免被其他用途濫用。

使用 Google Maps 店家連結產生草稿：

```bash
npm run hotel:import -- "https://maps.app.goo.gl/..."
```

匯入結果會輸出到 `tmp/imports/*.json`。這只是審核用草稿，不會直接寫進正式店家資料，因為 Google Maps 不一定會提供寵物類型、住宿價格、體型限制、LINE、FB、IG 等完整資訊。確認內容後，再把可用欄位整理到：

- `lib/hotels/kaohsiung.ts`
- `lib/hotels/tainan.ts`
- `lib/hotels/pingtung.ts`

若草稿內容確認可以上線，可用第二個指令寫入對應城市的店家列表：

```bash
npm run hotel:publish -- "tmp/imports/example.json"
```

`hotel:publish` 會依照草稿內的 `hotel.city.slug` 自動寫入高雄、台南或屏東資料檔，並自動產生下一個店家 ID。若遇到相同店名或相同 slug，指令會停止，避免同一家店被重複加入。

目前匯入工具會嘗試取得：

- 店名
- 地址與行政區
- 電話
- Google Maps 連結
- 官網
- 營業時間
- 評分與評論數
- 官網頁面中出現的 Facebook、Instagram、LINE 連結
- 官網文字中疑似價格的片段

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
- `/city/kaohsiung` 高雄寵物旅館列表
- `/city/tainan` 台南寵物旅館列表
- `/city/pingtung` 屏東寵物旅館列表
- `/pet-hotel/[city]/[slug]` 店家詳細頁
- `/tag/[tag]` 條件頁
- `/compare` 店家比較頁
- `/guides/pet-hotel-price` 寵物旅館價格指南
- `/guides/how-to-choose-pet-hotel` 寵物旅館挑選指南
- `/list-your-hotel` 店家刊登頁
- `/about` 關於我們
- `/contact` 聯絡我們
- `/privacy-policy` 隱私權政策
- `/terms` 服務條款
- `/disclaimer` 免責聲明

## 備註

目前頁面使用 `lib/data.ts` 的靜態資料渲染，Prisma schema 與 seed 已準備好。後續若要接上真實資料庫，可將列表與詳細頁資料來源改成 Prisma Client 查詢。
