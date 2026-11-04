import { test } from "node:test";
import assert from "node:assert/strict";
import { getHandoutFiles, getWeekHandouts } from "../src/data/handouts.ts";

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
