export type HandoutFormat = "PDF" | "ZIP";

export type HandoutRelease = {
  tag_name: string;
  draft: boolean;
  prerelease: boolean;
  published_at: string;
  body?: string | null;
  assets: Array<{
    name: string;
    size: number;
    browser_download_url: string;
    state: string;
  }>;
};

export type HandoutFile = {
  name: string;
  url: string;
  size?: number;
  format: HandoutFormat;
};

export type WeeklyHandoutFile = HandoutFile & {
  releaseTag: string;
  publishedAt: string;
};

/** Display small downloadable ZIP assets in KB instead of misleading '0.0 MB'. */
export function formatHandoutSize(size: number | undefined): string {
  if (typeof size !== "number" || !Number.isFinite(size) || size < 0) return "";
  if (size < 1000) return "（" + Math.round(size) + " B）";
  if (size < 1000000) return "（" + (size / 1000).toFixed(1) + " KB）";
  return "（" + (size / 1000000).toFixed(1) + " MB）";
}

const releasePath = "/billiswen-png/ai-quant-course/releases/download/";
const privateMaterial = /教師|解答|答案|標準解|teacher|solution|answer|private|internal/i;

function formatOf(filename: string): HandoutFormat | null {
  if (/\.pdf$/i.test(filename)) return "PDF";
  if (/\.zip$/i.test(filename)) return "ZIP";
  return null;
}

function decodedPath(pathname: string): string {
  try { return decodeURIComponent(pathname); }
  catch { return pathname; }
}

function safeUrl(rawUrl: string, releaseAsset: boolean): URL | null {
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== "https:" || url.hostname !== "github.com" || url.username || url.password) return null;
    if (releaseAsset && url.pathname.startsWith(releasePath)) return url;
    if (!releaseAsset && /^\/user-attachments\/files\/\d+\/[^/]+$/i.test(url.pathname)) return url;
    return null;
  } catch {
    return null;
  }
}

// The public download area must not automatically expose teacher-only files.
// Only PDF and ZIP assets on approved GitHub paths are eligible.
export function getHandoutFiles(release: Pick<HandoutRelease, "assets" | "body">): HandoutFile[] {
  const files: HandoutFile[] = [];
  const usedUrls = new Set<string>();
  for (const asset of Array.isArray(release.assets) ? release.assets : []) {
    if (!asset || asset.state !== "uploaded" || typeof asset.name !== "string" ||
        typeof asset.browser_download_url !== "string" || privateMaterial.test(asset.name)) continue;
    const format = formatOf(asset.name);
    const url = safeUrl(asset.browser_download_url, true);
    if (!format || !url || privateMaterial.test(decodedPath(url.pathname)) || usedUrls.has(url.href)) continue;
    files.push({name: asset.name, url: url.href, format,
      ...(Number.isFinite(asset.size) && asset.size >= 0 ? {size: asset.size} : {})});
    usedUrls.add(url.href);
  }
  const description = typeof release.body === "string" ? release.body : "";
  for (const match of description.matchAll(/\[([^\]\r\n]+)\]\((https:\/\/github\.com\/user-attachments\/files\/\d+\/[^\s)]+)\)/g)) {
    const [, name, rawUrl] = match;
    const url = safeUrl(rawUrl, false);
    const format = url ? formatOf(decodedPath(url.pathname)) : null;
    if (!url || !format || privateMaterial.test(name) || privateMaterial.test(decodedPath(url.pathname)) || usedUrls.has(url.href)) continue;
    files.push({name, url: url.href, format});
    usedUrls.add(url.href);
  }
  return files;
}

// Choose the newest published attachment *per format*. A later ZIP-only release
// does not make the earlier PDF disappear, and an empty release is ignored.
export function getWeekHandouts(releases: HandoutRelease[], week: number): WeeklyHandoutFile[] {
  if (!Array.isArray(releases) || !Number.isInteger(week) || week < 1 || week > 8) return [];
  const matches = releases.filter(release => {
    if (!release || release.draft || release.prerelease || typeof release.tag_name !== "string") return false;
    const tag = /^week-0?([1-8])-v\d+(?:\.\d+)*$/.exec(release.tag_name);
    return tag !== null && Number(tag[1]) === week && Number.isFinite(Date.parse(release.published_at));
  }).sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at));

  const chosen = new Map<HandoutFormat, WeeklyHandoutFile[]>();
  for (const release of matches) {
    for (const format of ["PDF", "ZIP"] as const) {
      if (chosen.has(format)) continue;
      const files = getHandoutFiles(release).filter(file => file.format === format);
      if (files.length) {
        chosen.set(format, files.map(file => ({...file, releaseTag: release.tag_name, publishedAt: release.published_at})));
      }
    }
    if (chosen.size === 2) break;
  }
  return [...(chosen.get("PDF") || []), ...(chosen.get("ZIP") || [])];
}
