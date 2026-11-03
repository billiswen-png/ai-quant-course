import test from "node:test";
import assert from "node:assert/strict";
import { getHandoutFiles, getWeekHandouts, formatHandoutSize } from "../src/data/handouts.ts";

const origin = "https://github.com/billiswen-png/ai-quant-course/releases/download/";

function asset(name, tag = "week-01-v1.0", props = {}) {
  return {name, size: 44818483, state: "uploaded", browser_download_url: origin + tag + "/" + encodeURIComponent(name), ...props};
}

function release(tag, assets = [], props = {}) {
  return {tag_name: tag, published_at: "2026-10-30T15:03:42Z",
    draft: false, prerelease: false, assets, body: "", ...props};
}

test("existing published W01 PDF remains visible without a ZIP", () => {
  const r = release("week-01-v1.0", [asset("W01_.pdf")]);
  const files = getWeekHandouts([r], 1);
  assert.equal(files.length, 1);
  assert.equal(files[0].name, "W01_.pdf");
  assert.equal(files[0].format, "PDF");
  assert.equal(files[0].releaseTag, "week-01-v1.0");
});

test("PDF and student ZIP in the same release are both available", () => {
  const r = release("week-02-v1.0", [asset("W02_學生講義.pdf", "week-02-v1.0"), asset("W02_學生實作.zip", "week-02-v1.0")]);
  assert.deepEqual(getWeekHandouts([r], 2).map(file => file.format), ["PDF", "ZIP"]);
  assert.equal(getWeekHandouts([r], 1).length, 0);
});

test("a newer ZIP-only release does not hide the older published PDF", () => {
  const older = release("week-02-v1.0", [asset("W02_講義.pdf", "week-02-v1.0")]);
  const newer = release("week-02-v1.1", [asset("W02_學生程式.zip", "week-02-v1.1")],
    {published_at: "2026-11-01T12:00:00Z"});
  const files = getWeekHandouts([older, newer], 2);
  assert.deepEqual(files.map(file => [file.format, file.releaseTag]), [["PDF", "week-02-v1.0"], ["ZIP", "week-02-v1.1"]]);
});

test("latest empty release does not suppress the previously valid file", () => {
  const older = release("week-03-v1.0", [asset("W03_學生講義.pdf", "week-03-v1.0")]);
  const empty = release("week-03-v1.1", [], {published_at: "2026-11-01T12:00:00Z"});
  assert.equal(getWeekHandouts([empty, older], 3)[0].releaseTag, "week-03-v1.0");
});

test("draft and pre-release are never shown", () => {
  const draft = release("week-04-v1.0", [asset("W04_學生.pdf", "week-04-v1.0")], {draft: true});
  const early = release("week-04-v1.1", [asset("W04_學生.zip", "week-04-v1.1")], {prerelease: true});
  assert.deepEqual(getWeekHandouts([draft, early], 4), []);
});

test("teacher-only material is excluded from the student list", () => {
  const r = release("week-05-v1.0", [
    asset("W05_教師解答.zip", "week-05-v1.0"),
    asset("W05_teacher_answers.pdf", "week-05-v1.0"),
    asset("W05_學生練習.zip", "week-05-v1.0")
  ]);
  assert.deepEqual(getWeekHandouts([r], 5).map(file => file.name), ["W05_學生練習.zip"]);
});

test("unsupported extensions and untrusted destinations cannot be listed", () => {
  const r = release("week-01-v1.0", [
    asset("W01.pptx"),
    asset("W01.pdf", "week-01-v1.0", {browser_download_url: "https://evil.example.com/file.pdf"}),
    asset("W01.zip", "week-01-v1.0", {browser_download_url: "https://github.com/another-owner/repo/releases/download/x/W01.zip"}),
    asset("W01_學生.pdf")
  ]);
  assert.deepEqual(getHandoutFiles(r).map(file => file.name), ["W01_學生.pdf"]);
});

test("the existing GitHub user-attachments PDF convention remains supported", () => {
  const r = release("week-01-v1.0", [], {
    body: "[W01 課堂 PDF](https://github.com/user-attachments/files/123456/W01.pdf)"
  });
  const files = getHandoutFiles(r);
  assert.equal(files.length, 1);
  assert.equal(files[0].format, "PDF");
  assert.equal(files[0].size, undefined);
});

test("teacher-only link in the release body is ignored", () => {
  const r = release("week-01-v1.0", [], {
    body: "[教師版](https://github.com/user-attachments/files/123456/teacher.pdf)"
  });
  assert.deepEqual(getHandoutFiles(r), []);
});

test("malformed attachment paths and non-string release bodies cannot crash the listing", () => {
  const r = release("week-01-v1.0", [], {
    body: "[W01](https://github.com/user-attachments/files/123456/%E6.pdf) [W02](javascript:alert(1))"
  });
  assert.equal(getHandoutFiles(r).length, 1);
  const corrupted = {...r, body: {unexpected: true}, assets: null};
  assert.deepEqual(getHandoutFiles(corrupted), []);
});

test("duplicate URLs and pending asset uploads are ignored", () => {
  const a = asset("W01_學生.pdf");
  const r = release("week-01-v1.0", [a, a, asset("pending.pdf", "week-01-v1.0", {state: "new"})]);
  assert.deepEqual(getHandoutFiles(r).map(file => file.name), ["W01_學生.pdf"]);
});

test("unrelated, invalid, and future-week tags do not surface", () => {
  const fake = release("week-09-v1.0", [asset("W09.pdf", "week-09-v1.0")]);
  const unversioned = release("week-01-latest", [asset("W01.pdf", "week-01-latest")]);
  const invalidDate = release("week-01-v1.0", [asset("W01.pdf")], {published_at: "invalid"});
  assert.deepEqual(getWeekHandouts([fake, unversioned, invalidDate], 1), []);
  assert.deepEqual(getWeekHandouts([fake], 9), []);
});

test("newer PDF replaces older PDF but keeps one latest ZIP", () => {
  const old = release("week-06-v1.0", [asset("W06_old.pdf", "week-06-v1.0"), asset("W06_學生.zip", "week-06-v1.0")]);
  const updated = release("week-06-v1.1", [asset("W06_new.pdf", "week-06-v1.1")],
    {published_at: "2026-11-01T12:00:00Z"});
  const files = getWeekHandouts([old, updated], 6);
  assert.deepEqual(files.map(f => [f.name, f.releaseTag]), [
    ["W06_new.pdf", "week-06-v1.1"], ["W06_學生.zip", "week-06-v1.0"]
  ]);
});


test("small ZIP sizes show KB instead of 0.0 MB, PDFs remain in MB", () => {
  assert.equal(formatHandoutSize(undefined), "");
  assert.equal(formatHandoutSize(-1), "");
  assert.equal(formatHandoutSize(Number.NaN), "");
  assert.equal(formatHandoutSize(0), "（0 B）");
  assert.equal(formatHandoutSize(999), "（999 B）");
  assert.equal(formatHandoutSize(18324), "（18.3 KB）");
  assert.equal(formatHandoutSize(16124744), "（16.1 MB）");
  assert.equal(formatHandoutSize(44818483), "（44.8 MB）");
});
