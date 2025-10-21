import type { MetadataRoute } from "next";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://aiwallpaper.shop";

const now = new Date().toISOString();

// 站点的主要路由（按你的项目结构，可自行增减或调整路径）
const routes = [
  { en: "/", zh: "/" }, // 根路径通常会被 locale 中间件重定向到 /en 或 /zh
  { en: "/en", zh: "/zh" },
  { en: "/en/pricing", zh: "/zh/pricing" },
  { en: "/en/privacy", zh: "/zh/privacy" },
  { en: "/en/terms", zh: "/zh/terms" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const r of routes) {
    // 英文页面
    urls.push({
      url: `${SITE}${r.en}`,
      lastModified: now
    });

    // 中文页面
    urls.push({
      url: `${SITE}${r.zh}`,
      lastModified: now
    });
  }

  return urls;
}