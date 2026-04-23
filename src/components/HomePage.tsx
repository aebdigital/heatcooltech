"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { aboutParagraphs, certificates, heroHeadline, heroSlides, homeFeatureItems, serviceCards, site } from "@/src/data/site";
import { BadgeIcon, ChecklistIcon, PhoneIcon, ToolboxIcon } from "./Icons";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Lightbox } from "./Lightbox";

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${site.source}/#webpage`,
      url: `${site.source}/`,
      name: "Heatcooltech s.r.o. - montáž, klimatizácie, tepelné čerpadlá",
      description: site.description,
      isPartOf: { "@id": `${site.source}/#website` },
      inLanguage: "sk-SK",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${site.source}/#breadcrumblist`,
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Domov", item: `${site.source}/` }],
    },
  ],
};

const featureIcons = [
  <ToolboxIcon key="toolbox" className="h-10 w-10" />,
  <BadgeIcon key="badge" className="h-10 w-10" />,
  <ChecklistIcon key="checklist" className="h-10 w-10" />,
];

export function HomePage() {
  const [lightbox, setLightbox] = useState<{ index: number } | null>(null);
  return (
    <>
      <Header overlay />
      <main>
        <section className="relative min-h-[92svh] overflow-hidden bg-neutral-950 text-white md:min-h-[100svh]">
          <div className="absolute inset-0" data-parallax="hero">
            {heroSlides.map((slide, index) => (
              <div key={slide} className={`hero-slide absolute inset-0 ${index === 0 ? "hero-slide--initial" : ""}`}>
                <Image src={slide} alt="" fill sizes="100vw" priority={index === 0} className="object-cover" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-black/42" />

          <div className="relative z-10 mx-auto flex min-h-[92svh] w-full max-w-[1440px] items-center px-5 md:min-h-[100svh] md:px-8 lg:px-14">
            <div className="max-w-[880px]">
              <h1 className="font-display text-[34px] font-bold uppercase leading-[1.16] md:text-[52px] lg:text-[60px]" data-reveal>
                <span className="block">{heroHeadline.firstLine}</span>
                <span className="mt-1 block">{heroHeadline.secondLine}</span>
                <span className="mt-1 inline-block border-b-[6px] border-white pb-1">{heroHeadline.highlight}</span>
              </h1>

              <div className="mt-12 flex items-center gap-5" data-reveal>
                <div className="flex h-[116px] w-[72px] items-center justify-center text-white">
                  <PhoneIcon className="h-[90px] w-[54px]" />
                </div>
                <div className="font-display">
                  <p className="text-[15px] font-semibold uppercase tracking-[0.04em]">Objednávky</p>
                  <a href={site.phoneHref} className="mt-1 block text-[34px] font-semibold leading-none md:text-[58px]">
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 -mt-20 bg-white pb-12 md:-mt-32 md:pb-16 lg:-mt-40">
          <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 pt-16 md:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.8fr)] lg:gap-14 lg:px-14 lg:pt-24">
            <div className="max-w-[930px]">
              <h2 className="font-display text-[48px] font-bold uppercase leading-none text-[#f0425c] md:text-[64px]" data-reveal>
                O nás
              </h2>
              <div className="prose-copy mt-10 max-w-[930px] text-[19px] leading-[2.05] text-[#555]" data-reveal>
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="lg:relative lg:-mt-48">
              <div className="feature-panel" data-reveal>
                {homeFeatureItems.map((item, index) => (
                  <div key={item} className="flex items-center gap-5 py-4">
                    <div className="feature-panel__icon">{featureIcons[index]}</div>
                    <p className="font-display text-[22px] leading-[1.3] text-white">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 overflow-hidden rounded-[6px] bg-white shadow-[0_22px_55px_rgba(0,0,0,0.12)]" data-reveal>
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src={site.youtubeEmbed}
                    title="Heatcooltech video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-8 md:px-8 md:py-14 lg:px-14 lg:py-20">
          <div className="mx-auto w-full max-w-[1440px]">
            <h2 className="font-display text-[44px] font-bold uppercase leading-none text-[#f0425c] md:text-[60px]" data-reveal>
              Naše certifikáty
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {certificates.map((certificate, index) => (
                <button
                  key={certificate.src}
                  onClick={() => setLightbox({ index })}
                  className="certificate-card block overflow-hidden rounded-[4px] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)] cursor-pointer text-left"
                  data-reveal
                >
                  <div className="relative aspect-[3/4] w-full">
                    <Image src={certificate.src} alt={certificate.alt} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover object-top" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7fafc] px-5 py-8 md:px-8 md:py-14 lg:px-14 lg:py-20">
          <div className="mx-auto w-full max-w-[1440px]">
            <h2 className="font-display text-[44px] font-bold uppercase leading-none text-[#f0425c] md:text-[60px]" data-reveal>
              Naše služby
            </h2>
            <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
              {serviceCards.map((service) => (
                <Link key={service.href} href={service.href} className="service-card group" data-reveal>
                  <div className="relative aspect-[1/0.84] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex min-h-[140px] items-center justify-center px-6 py-8">
                    <h3 className="font-display text-center text-[20px] font-semibold leading-[1.25] text-[#333] md:text-[24px]">{service.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      <Footer />
      {lightbox !== null && (
        <Lightbox
          images={certificates}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
