"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/src/components/Header";
import { Footer } from "@/src/components/Footer";
import { Lightbox } from "@/src/components/Lightbox";
import { allRealizations, realizationCategories, site } from "@/src/data/site";
import { ChevronRight } from "lucide-react";

export default function RealizaciePage() {
  const [activeCategory, setActiveCategory] = useState("Všetko");
  const [lightbox, setLightbox] = useState<{ index: number } | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === "Všetko") return allRealizations;
    return allRealizations.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <Header overlay />
      <main className="bg-white">
        {/* Hero Section - 35vh */}
        <section className="relative h-[35vh] min-h-[300px] w-full overflow-hidden bg-neutral-900">
          <Image 
            src={allRealizations[5].src} 
            alt="Realizácie" 
            fill 
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center px-5 md:px-8 lg:px-14">
            <div className="mx-auto w-full max-w-[1440px] text-center">
              <h1 className="font-display text-[48px] font-bold uppercase leading-none text-white md:text-[72px]" data-reveal>
                Naše realizácie
              </h1>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="px-5 py-12 md:px-8 lg:px-14">
          <div className="mx-auto max-w-[1440px]">
            {/* Breadcrumbs inside content */}
            <div className="flex flex-wrap items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-neutral-400 mb-12">
              <Link href="/" className="transition-colors hover:text-[#f0425c]">Domov</Link>
              <ChevronRight size={12} />
              <span className="text-[#f0425c]">Realizácie</span>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-12">
              {realizationCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-6 py-2.5 font-display text-[13px] font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat
                      ? "bg-[#f0425c] text-white shadow-lg shadow-[#f0425c]/20"
                      : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
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
                    <div className="absolute bottom-4 left-4 text-white opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 text-left">
                       <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">{image.category}</p>
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
