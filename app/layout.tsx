import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CookieConsent } from "@/src/components/CookieConsent";
import { MotionEffects } from "@/src/components/MotionEffects";
import { site } from "@/src/data/site";
import "./globals.css";

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.source}/#organization`,
      name: site.brandName,
      url: `${site.source}/`,
      telephone: site.phone,
      email: site.email,
      logo: {
        "@type": "ImageObject",
        "@id": `${site.source}/#organizationLogo`,
        url: `${site.source}${site.logo}`,
      },
      sameAs: [site.facebook],
    },
    {
      "@type": "HVACBusiness",
      "@id": `${site.source}/#localbusiness`,
      name: site.name,
      url: `${site.source}/`,
      image: `${site.source}${site.socialImage}`,
      telephone: site.phone,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.streetAddress,
        postalCode: site.postalCode,
        addressLocality: site.addressLocality,
        addressCountry: site.addressCountry,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      sameAs: [site.facebook],
      parentOrganization: {
        "@id": `${site.source}/#organization`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.source}/#website`,
      url: `${site.source}/`,
      name: site.brandName,
      inLanguage: "sk-SK",
      publisher: {
        "@id": `${site.source}/#organization`,
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.source),
  title: {
    default: "Heatcooltech s.r.o. - montáž, klimatizácie, tepelné čerpadlá",
    template: "%s - Heatcooltech klimatizácie, tepelné čerpadlá, vykurovanie",
  },
  description: site.description,
  keywords: [
    "tepelné čerpadlá",
    "klimatizácie",
    "podlahové vykurovanie",
    "kurenárske práce",
    "výmena radiátorov",
    "Heatcooltech",
    "Malachov",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: site.googleVerification,
  },
  icons: {
    icon: "/wp-content/uploads/2025/04/cropped-cropped-LOGO-32x32.png",
    apple: "/wp-content/uploads/2025/04/cropped-cropped-LOGO-180x180.png",
  },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    siteName: site.brandName,
    title: "Heatcooltech s.r.o. - montáž, klimatizácie, tepelné čerpadlá",
    description: site.description,
    url: site.source,
    images: [
      {
        url: site.socialImage,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heatcooltech s.r.o. - montáž, klimatizácie, tepelné čerpadlá",
    description: site.description,
    images: [site.socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="sk-SK">
      <body>
        <MotionEffects />
        {children}
        <CookieConsent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }} />
      </body>
    </html>
  );
}
