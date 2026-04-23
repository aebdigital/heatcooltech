import { mkdir, writeFile, readFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { dirname, join } from "node:path";
import { pipeline } from "node:stream/promises";

const BASE = "https://www.heatcooltech2.sk";
const ROOT = process.cwd();
const MIRROR_DIR = join(ROOT, "_source_mirror");
const PUBLIC_DIR = join(ROOT, "public");

const jsonEndpoints = [
  "/wp-json/",
  "/wp-json/wp/v2/settings",
  "/wp-json/wp/v2/types",
  "/wp-json/wp/v2/taxonomies",
  "/wp-json/wp/v2/categories?per_page=100",
  "/wp-json/wp/v2/tags?per_page=100",
  "/wp-json/wp/v2/users?per_page=100",
  "/wp-json/wp/v2/comments?per_page=100",
  "/wp-json/wp/v2/pages?per_page=100&_embed",
  "/wp-json/wp/v2/posts?per_page=100&_embed",
  "/wp-json/wp/v2/media?per_page=100",
  "/wp-json/wp/v2/menu-locations",
  "/wp-json/bricks/v1/",
  "/wp-json/bricks/v1/get-templates-data",
  "/wp-json/bricks/v1/get-templates",
  "/wp-json/bricks/v1/get-template-authors",
  "/wp-json/bricks/v1/get-template-bundles",
  "/wp-json/bricks/v1/get-template-tags",
];

const fetched = new Map();

async function ensureDir(path) {
  await mkdir(path, { recursive: true });
}

async function fetchText(url) {
  if (fetched.has(url)) {
    return fetched.get(url);
  }

  const response = await fetch(url, {
    headers: {
      "user-agent": "heatcooltech2-public-rebuild/1.0",
      accept: "*/*",
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }

  const text = await response.text();
  fetched.set(url, text);
  return text;
}

async function fetchJson(url) {
  const text = await fetchText(url);
  return JSON.parse(text);
}

function urlToFileStem(url) {
  const parsed = new URL(url);
  const path = parsed.pathname === "/" ? "home" : parsed.pathname.replace(/^\/|\/$/g, "").replaceAll("/", "__");
  const query = parsed.search
    ? `__${parsed.search.slice(1).replace(/[^a-z0-9_-]+/gi, "_").replace(/^_+|_+$/g, "")}`
    : "";
  return `${path || "home"}${query || ""}`;
}

function makeLocalAssetPath(url) {
  const parsed = new URL(url);
  return join(PUBLIC_DIR, decodeURIComponent(parsed.pathname));
}

function normalizeUrl(url) {
  return url.replace(/&amp;/g, "&").trim();
}

function extractUrls(text) {
  const urls = new Set();

  const add = (candidate) => {
    if (!candidate) return;
    const clean = normalizeUrl(candidate)
      .replace(/^["']|["']$/g, "")
      .replace(/\\\//g, "/");

    try {
      const absolute = new URL(clean, BASE).toString();
      if (absolute.startsWith(BASE) || absolute.startsWith("https://secure.gravatar.com/")) {
        urls.add(absolute);
      }
    } catch {
      // Ignore malformed CSS fragments and script snippets.
    }
  };

  for (const match of text.matchAll(/\b(?:src|href)=["']([^"']+)["']/gi)) {
    add(match[1]);
  }

  for (const match of text.matchAll(/\b(?:srcset)=["']([^"']+)["']/gi)) {
    for (const item of match[1].split(",")) {
      add(item.trim().split(/\s+/)[0]);
    }
  }

  for (const match of text.matchAll(/url\(([^)]+)\)/gi)) {
    add(match[1]);
  }

  for (const match of text.matchAll(/https?:\\?\/\\?\/[^\s"'<>),]+/gi)) {
    add(match[0]);
  }

  return urls;
}

function sitemapUrls(xml) {
  const urls = [];
  for (const match of xml.matchAll(/<loc>\s*(?:<!\[CDATA\[)?([^<\]]+)(?:\]\]>)?\s*<\/loc>/gi)) {
    urls.push(match[1].trim());
  }
  return urls;
}

function mediaUrlsFromJson(value, urls = new Set()) {
  if (Array.isArray(value)) {
    for (const item of value) mediaUrlsFromJson(item, urls);
    return urls;
  }

  if (value && typeof value === "object") {
    for (const item of Object.values(value)) mediaUrlsFromJson(item, urls);
    return urls;
  }

  if (typeof value === "string") {
    for (const url of extractUrls(value)) {
      if (isDownloadableAsset(url)) urls.add(url);
    }
  }

  return urls;
}

function isDownloadableAsset(url) {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === "www.heatcooltech2.sk" &&
      /\.(?:avif|css|gif|ico|jpeg|jpg|js|json|mp4|png|svg|webp|woff2?|ttf|eot)(?:$|\?)/i.test(parsed.pathname)
    );
  } catch {
    return false;
  }
}

async function downloadAsset(url) {
  const destination = makeLocalAssetPath(url);
  await ensureDir(dirname(destination));

  const response = await fetch(url, {
    headers: {
      "user-agent": "heatcooltech2-public-rebuild/1.0",
      accept: "*/*",
    },
  });

  if (!response.ok || !response.body) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }

  await pipeline(response.body, createWriteStream(destination));
  return destination;
}

async function saveText(path, text) {
  await ensureDir(dirname(path));
  await writeFile(path, text);
}

async function scrape() {
  await ensureDir(MIRROR_DIR);
  await ensureDir(PUBLIC_DIR);

  const rootSitemapUrl = `${BASE}/sitemap.xml`;
  const rootSitemapXml = await fetchText(rootSitemapUrl);
  await saveText(join(MIRROR_DIR, "sitemap.xml"), rootSitemapXml);

  const sitemapIndexUrls = sitemapUrls(rootSitemapXml).filter((url) => url.endsWith(".xml"));
  const childSitemaps = {};
  const publicPageUrls = new Set([`${BASE}/`]);

  for (const url of sitemapIndexUrls) {
    const xml = await fetchText(url);
    childSitemaps[url] = xml;
    await saveText(join(MIRROR_DIR, "sitemaps", `${urlToFileStem(url)}.xml`), xml);

    for (const publicUrl of sitemapUrls(xml)) {
      if (!publicUrl.endsWith(".xml")) {
        publicPageUrls.add(publicUrl);
      }
    }
  }

  const restData = {};
  const assetUrls = new Set();

  for (const endpoint of jsonEndpoints) {
    const url = `${BASE}${endpoint}`;
    try {
      const data = await fetchJson(url);
      const key = endpoint.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "_").replace(/_+$/g, "");
      restData[key] = data;
      mediaUrlsFromJson(data, assetUrls);
      await saveText(join(MIRROR_DIR, "rest", `${key}.json`), `${JSON.stringify(data, null, 2)}\n`);
    } catch (error) {
      restData[endpoint] = { error: String(error) };
    }
  }

  const pageSnapshots = [];

  for (const url of publicPageUrls) {
    const html = await fetchText(url);
    const fileStem = urlToFileStem(url);
    await saveText(join(MIRROR_DIR, "pages", `${fileStem}.html`), html);

    for (const assetUrl of extractUrls(html)) {
      if (isDownloadableAsset(assetUrl)) {
        assetUrls.add(assetUrl);
      }
    }

    pageSnapshots.push({
      url,
      file: `_source_mirror/pages/${fileStem}.html`,
      title: html.match(/<title>(.*?)<\/title>/i)?.[1] ?? "",
    });
  }

  const downloadResults = [];

  for (const url of [...assetUrls].sort()) {
    try {
      const path = await downloadAsset(url);
      downloadResults.push({ url, path: path.replace(`${ROOT}/`, "") });
    } catch (error) {
      downloadResults.push({ url, error: String(error) });
    }
  }

  const manifest = {
    source: BASE,
    scrapedAt: new Date().toISOString(),
    sitemaps: {
      root: "sitemap.xml",
      children: Object.keys(childSitemaps),
    },
    pages: pageSnapshots,
    restFiles: Object.keys(restData),
    assets: downloadResults,
  };

  await saveText(join(MIRROR_DIR, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(
    JSON.stringify(
      {
        pages: pageSnapshots.length,
        restEndpoints: Object.keys(restData).length,
        assets: downloadResults.length,
        failedAssets: downloadResults.filter((item) => item.error).length,
        manifest: "_source_mirror/manifest.json",
      },
      null,
      2,
    ),
  );
}

scrape().catch(async (error) => {
  console.error(error);

  try {
    const existing = await readFile(join(MIRROR_DIR, "manifest.json"), "utf8");
    console.error("Existing manifest was left untouched:", existing.slice(0, 200));
  } catch {
    // No prior manifest to mention.
  }

  process.exitCode = 1;
});
