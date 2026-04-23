"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/src/data/site";
import { Header } from "@/src/components/Header";
import { FooterCredits, OrderForm } from "@/src/components/Footer";
import { FacebookIcon } from "@/src/components/Icons";
import { ChevronRight, Mail, Phone, MapPin, Clock, User } from "lucide-react";
import Image from "next/image";

export default function KontaktPage() {
  return (
    <>
      <Header overlay />
      <main className="bg-white">
        {/* Hero Section */}
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
        <section className="bg-white px-5 py-12 md:px-8 lg:px-14 lg:py-20">
          <div className="mx-auto max-w-[1440px]">
            {/* Breadcrumbs inside content */}
            <div className="flex flex-wrap items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-neutral-400 mb-16">
              <Link href="/" className="transition-colors hover:text-[#f0425c]">Domov</Link>
              <ChevronRight size={12} />
              <span className="text-[#f0425c]">Kontakt</span>
            </div>

            <div className="grid gap-16 lg:grid-cols-[minmax(320px,0.7fr)_minmax(0,1.3fr)] lg:items-start lg:gap-24">
              
              <div className="space-y-10" data-reveal>
                
                {/* Sídlo */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#f0425c]">
                    <MapPin size={20} strokeWidth={2.5} />
                    <p className="font-display text-[11px] font-bold uppercase tracking-widest text-neutral-400">Sídlo spoločnosti</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-display text-[24px] font-bold text-black">{site.name}</p>
                    <div className="text-[17px] text-[#555]">
                      <p>{site.addressLines[0]}</p>
                      <p>{site.addressLines[1]}</p>
                    </div>
                  </div>
                </div>
                
                {/* Hours & Management - Grid like homepage */}
                <div className="grid gap-10 sm:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[#f0425c]">
                      <Clock size={20} strokeWidth={2.5} />
                      <p className="font-display text-[11px] font-bold uppercase tracking-widest text-neutral-400">Otváracie hodiny</p>
                    </div>
                    <p className="text-[18px] font-bold text-black leading-snug">{site.hoursFull}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[#f0425c]">
                      <User size={20} strokeWidth={2.5} />
                      <p className="font-display text-[11px] font-bold uppercase tracking-widest text-neutral-400">Vedenie</p>
                    </div>
                    <p className="text-[18px] font-bold text-black leading-snug">{site.manager}</p>
                  </div>
                </div>

                {/* Direct Contact Links */}
                <div className="space-y-6 pt-10 border-t border-neutral-100">
                  <div className="flex flex-col gap-6">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">Telefón</p>
                      <a href={site.phoneHref} className="mt-1 flex items-center gap-3 text-[22px] font-bold text-black transition-colors hover:text-[#f0425c]">
                        <Phone size={18} className="text-[#f0425c]" />
                        {site.phone}
                      </a>
                    </div>

                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">E-mail</p>
                      <div className="mt-1 space-y-2">
                        <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-[19px] font-bold text-black transition-colors hover:text-[#f0425c]">
                          <Mail size={18} className="text-[#f0425c]" />
                          {site.email}
                        </a>
                        <a href={`mailto:${site.secondaryEmail}`} className="flex items-center gap-3 text-[17px] font-medium text-neutral-500 transition-colors hover:text-[#f0425c]">
                          <div className="w-[18px]" />
                          {site.secondaryEmail}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Social */}
                  <div className="pt-4">
                    <a
                      href={site.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 font-display text-[18px] font-bold text-[#2454ff] transition hover:opacity-80"
                    >
                      <FacebookIcon className="h-8 w-8" />
                      Heatcooltech s.r.o
                    </a>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_32px_80px_rgba(0,0,0,0.12)] lg:sticky lg:top-32" data-reveal>
                <div className="wp-map aspect-[16/10] min-h-[400px] md:aspect-[16/9] lg:aspect-[16/13]">
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
