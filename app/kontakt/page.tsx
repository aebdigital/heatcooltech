"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/src/data/site";
import { Header } from "@/src/components/Header";
import { FooterCredits, OrderForm } from "@/src/components/Footer";
import { FacebookIcon } from "@/src/components/Icons";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function KontaktPage() {
  return (
    <>
      <Header overlay />
      <main className="bg-white">
        {/* Hero Section - 35vh */}
        <section className="relative h-[35vh] min-h-[300px] w-full overflow-hidden bg-neutral-900">
          <Image 
            src={site.socialImage} 
            alt="Kontakt" 
            fill 
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center px-5 md:px-8 lg:px-14">
            <div className="mx-auto w-full max-w-[1440px] text-center">
              <h1 className="font-display text-[48px] font-bold uppercase leading-none text-white md:text-[72px]" data-reveal>
                Kontaktujte nás
              </h1>
            </div>
          </div>
        </section>

        {/* Info & Map Section */}
        <section className="bg-white px-5 py-12 md:px-8 lg:px-14 lg:py-16">
          <div className="mx-auto max-w-[1440px]">
            {/* Breadcrumbs inside content */}
            <div className="flex flex-wrap items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-neutral-400 mb-12">
              <Link href="/" className="transition-colors hover:text-[#f0425c]">Domov</Link>
              <ChevronRight size={12} />
              <span className="text-[#f0425c]">Kontakt</span>
            </div>

            <div className="grid gap-16 lg:grid-cols-[minmax(320px,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-24">
              <div className="space-y-4 text-[19px] leading-8 text-[#4b4b4b]" data-reveal>
                <div className="space-y-1">
                  <p className="font-display text-[24px] font-bold text-[#171717]">{site.name}</p>
                  <p>{site.addressLines[0]}, {site.addressLines[1]}</p>
                </div>
                
                <div className="pt-6 space-y-1">
                  <p className="font-semibold text-neutral-400 uppercase text-[12px] tracking-widest">Otváracie hodiny:</p>
                  <p className="text-black font-bold">{site.hoursFull}</p>
                </div>

                <div className="pt-6 space-y-1">
                  <p className="font-semibold text-neutral-400 uppercase text-[12px] tracking-widest">Vedenie spoločnosti:</p>
                  <p className="text-black font-bold">{site.manager}</p>
                </div>

                <div className="pt-6 space-y-4">
                  <div>
                    <p className="font-semibold text-neutral-400 uppercase text-[12px] tracking-widest">Telefón:</p>
                    <a className="transition hover:text-[#f0425c] text-[24px] font-bold text-black" href={site.phoneHref}>
                      {site.phone}
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-400 uppercase text-[12px] tracking-widest">Email:</p>
                    <a className="transition hover:text-[#f0425c] text-[24px] font-bold text-black" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </div>
                </div>

                <div className="pt-10">
                  <a
                    href={site.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-4 font-display text-[20px] font-bold text-[#2454ff] transition hover:opacity-80"
                  >
                    <FacebookIcon className="h-10 w-10" />
                    Heatcooltech s.r.o
                  </a>
                </div>
              </div>

              <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_32px_80px_rgba(0,0,0,0.12)]" data-reveal>
                <div className="wp-map aspect-[16/10] min-h-[400px] md:aspect-[16/9]">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    src={site.mapEmbedUrl}
                    allowFullScreen
                    title={site.name}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <OrderForm />

        {/* Minimal Footer Credits */}
        <section className="bg-white px-5 py-10 md:px-8 lg:px-14">
          <div className="mx-auto max-w-[1440px]">
            <FooterCredits />
          </div>
        </section>
      </main>
    </>
  );
}
