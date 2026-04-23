import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Heatcooltech s.r.o.",
    short_name: "Heatcooltech",
    description: "Tepelné čerpadlá, klimatizácie, podlahové vykurovanie a kurenárske práce.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f0425c",
    icons: [
      {
        src: "/wp-content/uploads/2025/04/cropped-cropped-LOGO-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/wp-content/uploads/2025/04/cropped-cropped-LOGO-300x300.png",
        sizes: "300x300",
        type: "image/png",
      },
    ],
  };
}
