import type { Metadata } from "next";
import { HomePage } from "@/src/components/HomePage";
import { site } from "@/src/data/site";

export const metadata: Metadata = {
  title: "Heatcooltech s.r.o. - montáž, klimatizácie, tepelné čerpadlá",
  description: site.description,
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return <HomePage />;
}
