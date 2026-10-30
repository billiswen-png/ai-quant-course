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

### 發布每週 PDF 講義

大型 PDF 請上傳 GitHub Releases 附件，勿放入 `public` 或 Git 歷史。公開附件可供任何人下載，不適合機密或限修課學生教材。

1. 到本專案 Releases → Draft a new release。
2. 建立 tag，例如 `week-01-v1.0`，target 選 `main`。第 1～8 週分別使用 `week-01`～`week-08`。
3. 填寫標題與版本說明，將 PDF 拖入附件區，等待上傳完成。
4. Publish release，勿勾選 pre-release。草稿與測試版不會顯示於網站。
5. 到網站 `/resources/#downloads` 重新整理，確認檔名、大小與下載內容。既有網站會查詢最近 100 筆 Releases，不需要重新部署。

修正版另建 `week-01-v1.1` 等 tag；同週採最近發布的正式 Release，該版本應包含完整 PDF 附件。請勿將只含說明、沒有 PDF 的版本當作最新正式講義。可保留歷史版本供追溯。

瀏覽器使用無憑證的 GitHub 公開 API，遇請求額度或網路問題會顯示前往 Releases 的備援連結。講義檔案從 GitHub 下載，不經 Cloudflare Pages，因此不占其單檔資產額度。

- 網站不收集學生姓名、學號、作業或成績。
- API 金鑰、帳號與敏感設定不得提交到 Repository。
- 學生作業使用師大指定教學平台或課堂公告管道繳交。
- 本網站內容僅供教學與研究使用，不構成投資建議。
