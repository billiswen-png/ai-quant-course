# AI 量化交易｜師大研究所系列課程

師大研究所教學使用的課程入口網站，採 Astro 靜態網站架構，包含課程地圖、每日教材、作業與專題規範、資源中心。

## 本機開發

```bash
npm install
npm run dev
```

## 品質檢查

```bash
npm run check
npm run build
```

## Cloudflare Pages

| 設定 | 值 |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | 留白 |

每次推送到 `main` 後，Cloudflare Pages 會自動重新建置與部署。

## 教學資料原則

- 網站不收集學生姓名、學號、作業或成績。
- API 金鑰、帳號與敏感設定不得提交到 Repository。
- 學生作業使用師大指定教學平台或課堂公告管道繳交。
- 本網站內容僅供教學與研究使用，不構成投資建議。
