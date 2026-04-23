"use client";

import { useState } from "react";
import Image from "next/image";
import { getPagePath, type ContentPage as ContentPageType, site } from "@/src/data/site";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Lightbox } from "./Lightbox";

type Props = {
  page: ContentPageType;
};

export function ContentPage({ page }: Props) {
  const [lightbox, setLightbox] = useState<{ index: number } | null>(null);
  const pageUrl = `${site.source}${getPagePath(page.slug)}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumblist`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Domov",
            item: `${site.source}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.browserTitle ?? page.title,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${page.browserTitle ?? page.title} - ${site.brandName}`,
        description: page.description,
        inLanguage: "sk-SK",
        isPartOf: { "@id": `${site.source}/#website` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumblist` },
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="bg-white px-5 py-14 md:px-8 lg:px-14 lg:py-20">
        <article className="mx-auto w-full max-w-[1440px]">
          {page.dotacieImage ? (
            <div className="mx-auto mb-12 max-w-[930px]" data-reveal>
              <div className="relative aspect-[6/1] w-full overflow-hidden rounded-[4px] bg-white shadow-[0_18px_44px_rgba(0,0,0,0.12)]">
                <Image src={page.dotacieImage.src} alt={page.dotacieImage.alt} fill sizes="(max-width: 991px) 100vw, 930px" className="object-contain" />
              </div>
            </div>
          ) : null}

          {page.partnerHeading ? (
            <section className="py-16 md:py-24">
              <div className="max-w-[940px]">
                <h1 className="font-display text-[44px] font-bold uppercase leading-none text-[#f0425c] md:text-[64px]" data-reveal>
                  {page.partnerHeading}
                </h1>
                <p className="mt-5 text-[18px] leading-8 text-[#666]" data-reveal>
                  IVT Tepelné čerpadlá
                </p>
              </div>
            </section>
          ) : (
            <div className="max-w-[1320px]">
              <h1 className="font-display text-[44px] font-bold uppercase leading-none text-[#f0425c] md:text-[64px]" data-reveal>
                {page.title}
              </h1>
            </div>
          )}

          {page.paragraphs.length > 0 ? (
            <div className="prose-copy mt-10 max-w-[1320px] text-[19px] leading-[2] text-[#555]" data-reveal>
              {page.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  {page.slug === "dotacie" && paragraph.includes("až do výšky 4 370 €") ? (
                    <>
                      Získajte s nami <strong>finančný príspevok na obnoviteľné zdroje energií až do výšky 4 370 €</strong> v rámci
                      dotačného programu „Zelená domácnostiam“ a ušetrite si energiu, čas a aj peniaze. Spoločnosť Heatcooltech s.r.o.
                      Vám pomôže pohodlne získať túto dotáciu.
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>
          ) : null}

          {page.listItems?.length ? (
            <ul className="mt-6 max-w-[1320px] space-y-2 text-[19px] leading-[2] text-[#555]" data-reveal>
              {page.listItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[0.8em] h-[2px] w-4 shrink-0 bg-[#777]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {page.gallery?.length ? (
            <section className="mt-16">
              {page.slug === "tepelne-cerpadla" ? (
                <h2 className="font-display text-[42px] font-bold uppercase leading-none text-[#f0425c] md:text-[56px]" data-reveal>
                  Galéria
                </h2>
              ) : null}
              <div className={`grid gap-8 ${page.slug === "tepelne-cerpadla" ? "mt-10" : "mt-4"} md:grid-cols-2 xl:grid-cols-3`}>
                {page.gallery.map((image, index) => (
                  <button
                    key={image.src}
                    onClick={() => setLightbox({ index })}
                    className="gallery-tile group block overflow-hidden rounded-[4px] bg-white shadow-[0_14px_34px_rgba(0,0,0,0.10)] cursor-pointer text-left"
                    data-reveal
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Footer />
      {lightbox !== null && page.gallery && (
        <Lightbox
          images={page.gallery}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
