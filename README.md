# AI × 量化交易｜師大研究所課程

七週授課完成 Paper Trading 原型，第八週為修正後的正式成果發表。每週 14:20–17:20，共三堂各 50 分鐘；主環境為 VS Code 與本機 Jupyter。

師大研究所教學使用的課程入口網站，採 Astro 靜態網站架構，包含課程地圖、每日教材、作業與專題規範、資源中心。

## 本機開發

```bash
npm install
npm run dev
```

## 品質檢查

```bash
npm test        # Node.js 22.18+：教材發布邏輯回歸測試
npm run check   # Astro/TypeScript 檢查
npm run build   # Cloudflare Pages 靜態網站建置
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

### 依課程進度逐週發布學生教材（PDF／ZIP）

教材上傳 GitHub Releases，學員從課程網站的資源中心下載；大型 PDF 與學生練習 ZIP 不放進 `public` 或 Git 歷史。只有已公開發布且檔案符合類型的版本才會顯示；未來週次不需提前發布。GitHub 公開附件任何人都能下載，教師答案、API 金鑰、學生個資或受授權限制資料不得放入公開 Release。

1. 到本專案 Releases → Draft a new release（先存草稿，勿先公開）。
2. 建立 tag，例如 `week-02-v1.0`，target 選 `main`。第 1～8 週使用 `week-01`～`week-08`；僅在該週準備發布時操作。
3. 先檢查附件內容與權限，再上傳學生版 PDF（例如 `W02_學生講義.pdf`）及選用的學生版 ZIP（例如 `W02_學生實作.zip`）。不得包含教師版、完成解答、私有歷史行情、API 憑證、帳戶或個資。
4. 確認附件已完整上傳後 Publish release，勿勾選 pre-release。Draft／pre-release 不在資源中心列出。亦支援版本說明中的 GitHub `user-attachments` PDF／ZIP 連結，但沒有附件檔案大小。
5. 到網站 `/resources/#downloads` 點選「重新查詢」，確認顯示該週的 PDF／ZIP、版本與實際下載內容；必要時以另一台裝置測試。無須為單純新增附件重新部署網站。

修正教材請建立新 tag（例如 `week-02-v1.1`），不要覆蓋已發布的原始證據。網站分別選取同一週最新版的 PDF 與 ZIP；若新 Release 只有 ZIP，舊版有效 PDF 仍可下載，畫面會標示各自的版本。空白附件不會遮蔽已發布教材。

瀏覽器使用 GitHub 公開 API；同一分頁會暫存查詢結果 5 分鐘，避免每次重新整理都消耗請求額度。想立即檢查新教材可按「重新查詢」。API 無法連線時使用前次結果或 GitHub Releases 備援連結；檔案由 GitHub 提供，不占 Cloudflare Pages 單檔資產配額。

- 網站不收集學生姓名、學號、作業或成績。
- API 金鑰、帳號與敏感設定不得提交到 Repository。
- 學生作業使用師大指定教學平台或課堂公告管道繳交。
- 本網站內容僅供教學與研究使用，不構成投資建議。
