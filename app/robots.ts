import type { MetadataRoute } from "next";
import { site } from "@/src/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/template/", "/category/"],
      },
    ],
    sitemap: `${site.source}/sitemap.xml`,
    host: site.source,
  };
}
