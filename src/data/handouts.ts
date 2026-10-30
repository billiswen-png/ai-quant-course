export type HandoutRelease = {
  body?: string | null;
  assets: {name: string; size: number; browser_download_url: string; state: string}[];
};
export type HandoutFile = {name: string; url: string; size?: number};

// Never render release Markdown as HTML. Only accept PDF links hosted by GitHub.
export function getHandoutFiles(release: HandoutRelease): HandoutFile[] {
  const files: HandoutFile[] = release.assets
    .filter(a => a.state === "uploaded" && /\.pdf$/i.test(a.name) && a.browser_download_url.startsWith("https://github.com/billiswen-png/ai-quant-course/releases/download/"))
    .map(a => ({name: a.name, url: a.browser_download_url, size: a.size}));
  for (const match of (release.body || "").matchAll(/\[([^\]\r\n]+)\]\((https:\/\/github\.com\/user-attachments\/files\/\d+\/[^\s)]+)\)/g)) {
    const [, name, url] = match;
    if (!/\.pdf$/i.test(new URL(url).pathname)) continue;
    if (files.some(file => file.url === url || file.name === name)) continue;
    files.push({name, url});
  }
  return files;
}
