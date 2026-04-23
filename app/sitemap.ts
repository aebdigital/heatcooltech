import type { MetadataRoute } from "next";
import { blogPost, getPagePath, pages, site } from "@/src/data/site";

const lastModified = new Date("2026-04-23T00:00:00+02:00");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.source}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pages.map((page) => ({
      url: `${site.source}${getPagePath(page.slug)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${site.source}/${blogPost.slug}/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
