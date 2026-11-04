import { test } from "node:test";
import assert from "node:assert/strict";
import { getHandoutFiles, getWeekHandouts, getHandoutTimestamp } from "../src/data/handouts.ts";

const asset = (name) => ({name, size: 100, state: "uploaded", browser_download_url: "https://github.com/billiswen-png/ai-quant-course/releases/download/week-01-v1.0/" + encodeURIComponent(name)});
const release = (names, date = "2026-11-04T00:58:22Z") => ({tag_name: "week-01-v1.0", draft: false, prerelease: false, published_at: date, assets: names.map(asset)});

test("PDF, presentations and all supported raster image types coexist", () => {
  const names = ["W01_.pdf", "W01T.pptx", "slides.ppt", "a.PNG", "b.jpg", "c.jpeg", "d.webp", "e.gif", "f.avif", "g.bmp", "h.tif", "i.tiff", "j.heic", "k.heif", "practice.zip"];
  assert.equal(getWeekHandouts([release(names)], 1).length, names.length);
});
test("new images and presentations preserve prior PDF; multiple images remain", () => {
  const result = getWeekHandouts([release(["W01_.pdf"], "2026-10-30T00:00:00Z"), release(["W01T.pptx", "1.png", "2.png"])], 1);
  assert.deepEqual(result.map(x => x.name), ["W01_.pdf", "W01T.pptx", "1.png", "2.png"]);
});
test("teacher-only, active files, drafts and untrusted hosts stay excluded", () => {
  assert.equal(getHandoutFiles(release(["教師.pptx", "answer.png", "active.svg", "code.html", "macro.pptm", "program.exe"])).length, 0);
  assert.equal(getWeekHandouts([{...release(["test.pptx"]), draft: true}], 1).length, 0);
  assert.equal(getHandoutFiles({assets: [{...asset("test.png"), browser_download_url:"https://evil.example/test.png"}]}).length, 0);
});
test("GitHub description attachments accept presentation and image links", () => {
  const files = getHandoutFiles({assets: [], body: "[slides](https://github.com/user-attachments/files/123/slides.pptx)\n[figure](https://github.com/user-attachments/files/124/figure.png)"});
  assert.deepEqual(files.map(x => x.format), ["PPTX", "PNG"]);
});

test("each file keeps its own timestamps rather than the release date", () => {
  const data = release([]);
  data.published_at = "2026-10-30T15:03:42Z";
  data.assets = [
    {...asset("W01_.pdf"), created_at:"2026-10-30T16:23:20Z", updated_at:"2026-10-30T16:24:19Z"},
    {...asset("W01T.pptx"), created_at:"2026-11-04T00:58:08Z", updated_at:"2026-11-04T00:58:19Z"}
  ];
  const files = getWeekHandouts([data], 1);
  assert.equal(getHandoutTimestamp(files[0]).value, "2026-10-30T16:24:19Z");
  assert.equal(getHandoutTimestamp(files[1]).value, "2026-11-04T00:58:19Z");
  assert.equal(getHandoutTimestamp(files[1]).label, "檔案更新");
  const format = value => new Date(value).toLocaleString("zh-TW", {timeZone:"Asia/Taipei",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"});
  assert.equal(format(getHandoutTimestamp(files[0]).value).replace(/\s+/gu, " "), "2026/10/31 00:24");
  assert.equal(format(getHandoutTimestamp(files[1]).value).replace(/\s+/gu, " "), "2026/11/04 08:58");
});
test("missing or invalid asset timestamps fall back with an accurate label", () => {
  const file = getWeekHandouts([release(["test.png"])],1)[0];
  assert.equal(getHandoutTimestamp(file).label, "版本發布（未提供檔案時間）");
  assert.equal(getHandoutTimestamp({...file, updatedAt:"invalid", uploadedAt:"2026-11-04T00:58:08Z"}).label, "檔案上傳");
  assert.equal(getHandoutTimestamp({...file, updatedAt:"invalid", uploadedAt:"invalid"}).value, file.publishedAt);
});
