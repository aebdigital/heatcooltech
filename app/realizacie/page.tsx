"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/src/components/Header";
import { Footer } from "@/src/components/Footer";
import { Lightbox } from "@/src/components/Lightbox";
import { allRealizations, realizationCategories, site } from "@/src/data/site";

export default function RealizaciePage() {
  const [activeCategory, setActiveCategory] = useState("Všetko");
  const [lightbox, setLightbox] = useState<{ index: number } | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === "Všetko") return allRealizations;
    return allRealizations.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="px-5 pt-20 pb-12 md:px-8 md:pt-32 lg:px-14 lg:pb-16">
          <div className="mx-auto max-w-[1440px]">
            <h1 className="font-display text-[48px] font-bold uppercase leading-none text-[#f0425c] md:text-[72px]" data-reveal>
              Naše realizácie
            </h1>
            <p className="mt-8 max-w-[800px] text-[19px] leading-[1.8] text-[#555]" data-reveal>
              Pozrite si ukážky našej práce. Od montáže tepelných čerpadiel a klimatizácií až po kompletné podlahové vykurovanie.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="px-5 py-6 md:px-8 lg:px-14">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-wrap gap-3">
              {realizationCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-6 py-2.5 font-display text-[14px] font-bold uppercase tracking-wider transition-all ${
                    activeCategory === cat
                      ? "bg-[#f0425c] text-white shadow-lg shadow-[#f0425c]/20"
                      : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="px-5 py-12 md:px-8 lg:px-14 lg:py-16">
          <div className="mx-auto max-w-[1440px]">
            <motion.div 
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image, index) => (
                  <motion.button
                    layout
                    key={image.src}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setLightbox({ index })}
                    className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100 shadow-md"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-4 left-4 text-white opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                       <p className="text-[11px] font-bold uppercase tracking-widest opacity-70">{image.category}</p>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredImages.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-neutral-400">V tejto kategórii zatiaľ nie sú žiadne fotografie.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {lightbox !== null && (
        <Lightbox
          images={filteredImages}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
