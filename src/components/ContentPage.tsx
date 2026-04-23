"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getPagePath, type ContentPage as ContentPageType, site, navItems } from "@/src/data/site";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Lightbox } from "./Lightbox";
import { ArrowRight } from "lucide-react";

type Props = {
  page: ContentPageType;
};

export function ContentPage({ page }: Props) {
  const [lightbox, setLightbox] = useState<{ index: number } | null>(null);
  const pathname = usePathname();
  const pageUrl = `${site.source}${getPagePath(page.slug)}`;
  
  // Get all service links for the sidebar
  const serviceLinks = navItems.find(item => item.label === "Služby")?.children || [];
  
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

  // Limit gallery items on service pages
  const displayGallery = page.gallery?.slice(0, 6) || [];
  const hasMoreImages = (page.gallery?.length || 0) > 6;

  return (
    <>
      <Header />
      
      {page.dotacieImage ? (
        <div className="mx-auto mt-10 px-5 max-w-[970px]" data-reveal>
          <div className="relative aspect-[6/1] w-full overflow-hidden rounded-[4px] bg-white shadow-[0_18px_44px_rgba(0,0,0,0.12)]">
            <Image
              src={page.dotacieImage.src}
              alt={page.dotacieImage.alt}
              fill
              sizes="(max-width: 991px) 100vw, 930px"
              className="object-contain"
            />
          </div>
        </div>
      ) : null}

      <main className="bg-white px-5 py-14 md:px-8 lg:px-14 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 lg:flex-row">
          
          {/* Sidebar */}
          <aside className="shrink-0 lg:w-80">
            <div className="sticky top-24 space-y-8">
              <div>
                <p className="font-display text-[12px] font-bold uppercase tracking-widest text-neutral-400">Naše Služby</p>
                <nav className="mt-4 flex flex-col gap-2">
                  {serviceLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`group flex items-center justify-between rounded-xl px-5 py-4 transition-all ${
                          isActive 
                            ? "bg-[#f0425c] text-white shadow-lg shadow-[#f0425c]/20" 
                            : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        <span className="font-display text-[15px] font-bold uppercase">{link.label}</span>
                        <ArrowRight size={18} className={`transition-transform duration-300 ${isActive ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Call to Action in Sidebar */}
              <div className="rounded-2xl bg-neutral-900 p-8 text-white">
                <p className="font-display text-[20px] font-bold leading-tight">Máte záujem o naše služby?</p>
                <p className="mt-3 text-[14px] text-neutral-400 leading-relaxed">Kontaktujte nás a vypracujeme Vám nezáväznú cenovú ponuku na mieru.</p>
                <Link 
                  href="/kontakt/" 
                  className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#f0425c] px-6 font-display text-[13px] font-bold uppercase tracking-wider text-white transition-transform hover:scale-105 active:scale-95"
                >
                  Kontaktovať
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <article className="flex-1 min-w-0">
            {page.partnerHeading ? (
              <section className="pb-12">
                <h1 className="font-display text-[44px] font-bold uppercase leading-tight text-[#f0425c] md:text-[64px]" data-reveal>
                  {page.partnerHeading}
                </h1>
                <p className="mt-5 text-[18px] leading-8 text-[#666]" data-reveal>
                  IVT Tepelné čerpadlá
                </p>
              </section>
            ) : (
              <h1 className="font-display text-[44px] font-bold uppercase leading-tight text-[#f0425c] md:text-[64px]" data-reveal>
                {page.title}
              </h1>
            )}

            {page.paragraphs.length > 0 ? (
              <div className="prose-copy mt-10 text-[19px] leading-[2] text-[#555]" data-reveal>
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
              <ul className="mt-8 space-y-3 text-[19px] leading-[2] text-[#555]" data-reveal>
                {page.listItems.map((item) => (
                  <li key={item} className="flex gap-4">
                    <span className="mt-[0.8em] h-[2px] w-5 shrink-0 bg-[#f0425c]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {page.gallery?.length ? (
              <section className="mt-16">
                <div className="flex items-end justify-between border-b border-neutral-100 pb-6">
                  <h2 className="font-display text-[32px] font-bold uppercase leading-none text-black md:text-[42px]" data-reveal>
                    Ukážky práce
                  </h2>
                  <Link 
                    href="/realizacie/" 
                    className="group hidden items-center gap-2 font-display text-[14px] font-bold uppercase tracking-wider text-[#f0425c] md:flex"
                  >
                    <span>Všetky realizácie</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
                
                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {displayGallery.map((image, index) => (
                    <button
                      key={image.src}
                      onClick={() => setLightbox({ index })}
                      className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100 shadow-md cursor-pointer text-left"
                      data-reveal
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 1023px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  ))}
                </div>

                <div className="mt-12 md:hidden">
                  <Link 
                    href="/realizacie/" 
                    className="flex items-center justify-center gap-2 rounded-full border-2 border-[#f0425c] py-4 font-display text-[14px] font-bold uppercase tracking-wider text-[#f0425c]"
                  >
                    <span>Všetky realizácie</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>

                {hasMoreImages && (
                  <div className="mt-12 hidden md:block">
                     <Link 
                      href="/realizacie/" 
                      className="inline-flex items-center gap-3 rounded-full bg-neutral-100 px-8 py-4 font-display text-[14px] font-bold uppercase tracking-wider text-neutral-600 transition-colors hover:bg-neutral-200"
                    >
                      Pozrieť ďalších {page.gallery.length - 6} fotografií
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                )}
              </section>
            ) : null}
          </article>
        </div>
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
