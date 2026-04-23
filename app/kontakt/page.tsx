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
              
              {/* Contact Details with Hierarchy */}
              <div className="space-y-12" data-reveal>
                
                {/* Company & Address */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-[#f0425c]">
                    <MapPin size={24} />
                    <h2 className="font-display text-[14px] font-bold uppercase tracking-widest text-neutral-400">Sídlo spoločnosti</h2>
                  </div>
                  <div className="space-y-1">
                    <p className="font-display text-[28px] font-bold leading-tight text-black">{site.name}</p>
                    <div className="text-[19px] leading-relaxed text-[#555]">
                      <p>{site.addressLines[0]}</p>
                      <p>{site.addressLines[1]}</p>
                    </div>
                  </div>
                </div>
                
                {/* Hours */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-[#f0425c]">
                    <Clock size={24} />
                    <h2 className="font-display text-[14px] font-bold uppercase tracking-widest text-neutral-400">Otváracie hodiny</h2>
                  </div>
                  <p className="text-[22px] font-bold text-black">{site.hoursFull}</p>
                </div>

                {/* Management */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-[#f0425c]">
                    <User size={24} />
                    <h2 className="font-display text-[14px] font-bold uppercase tracking-widest text-neutral-400">Vedenie spoločnosti</h2>
                  </div>
                  <p className="text-[22px] font-bold text-black">{site.manager}</p>
                </div>

                {/* Contact Links */}
                <div className="space-y-10 pt-4 border-t border-neutral-100">
                  <div className="group flex items-start gap-6">
                    <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-50 text-[#f0425c] transition-colors group-hover:bg-[#f0425c] group-hover:text-white">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold uppercase tracking-widest text-neutral-400">Telefón</p>
                      <a href={site.phoneHref} className="mt-1 block text-[26px] font-bold text-black transition-colors hover:text-[#f0425c]">
                        {site.phone}
                      </a>
                    </div>
                  </div>

                  <div className="group flex items-start gap-6">
                    <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-50 text-[#f0425c] transition-colors group-hover:bg-[#f0425c] group-hover:text-white">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold uppercase tracking-widest text-neutral-400">E-mail</p>
                      <div className="mt-1 flex flex-col gap-1">
                        <a href={`mailto:${site.email}`} className="block text-[22px] font-bold text-black transition-colors hover:text-[#f0425c]">
                          {site.email}
                        </a>
                        <a href="mailto:juraj.jombik@gmail.com" className="block text-[18px] font-medium text-neutral-500 transition-colors hover:text-[#f0425c]">
                          juraj.jombik@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="pt-6">
                  <a
                    href={site.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-4 rounded-2xl bg-neutral-50 px-6 py-4 transition-all hover:bg-[#2454ff]/5 hover:translate-y-[-2px]"
                  >
                    <FacebookIcon className="h-10 w-10" />
                    <div className="text-left">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">Sledujte nás</p>
                      <p className="font-display text-[18px] font-bold text-[#2454ff]">Heatcooltech s.r.o</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_32px_80px_rgba(0,0,0,0.1)] lg:sticky lg:top-32" data-reveal>
                <div className="wp-map aspect-[16/10] min-h-[450px] md:aspect-[16/9] lg:aspect-[4/5]">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    src={site.mapEmbedUrl}
                    allowFullScreen
                    title={site.name}
                    className="grayscale contrast-125"
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
