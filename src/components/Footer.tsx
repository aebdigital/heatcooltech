"use client";

import { ContactForm } from "./ContactForm";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { FacebookIcon } from "./Icons";
import { site } from "@/src/data/site";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, User } from "lucide-react";

export function OrderForm() {
  return (
    <section id="objednavka" className="bg-[#df5b6f] px-5 py-16 text-white md:px-8 lg:px-14 lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-[1220px]">
          <h2 className="font-display text-[48px] font-bold uppercase leading-none md:text-[64px]" data-reveal>
            Objednávka
          </h2>
          <p className="mt-6 max-w-[760px] text-[18px] leading-8 text-white/92" data-reveal>
            V prípade záujmu nás neváhajte kontaktovať cez tento formulár.
          </p>
          <div className="mt-10 max-w-[1040px]">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FooterCredits() {
  return (
    <div className="mt-14 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-[15px] text-[#444] md:flex-row md:items-center md:justify-between">
      <p>Copyright © {site.copyrightYear} Heatcooltech s.r.o., všetky práva vyhradené</p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <Link href="/ochrana-osobnych-udajov/" className="underline underline-offset-4 transition hover:text-[#f0425c]">
          Ochrana osobných údajov
        </Link>
        <CookieSettingsButton className="underline underline-offset-4 transition hover:text-[#f0425c]">
          Cookies
        </CookieSettingsButton>
        <p>
          Tvorba stránky -{" "}
          <a
            className="underline underline-offset-4 transition hover:text-[#f0425c]"
            href={site.footerCreditUrl}
            target="_blank"
            rel="noreferrer"
          >
            {site.footerCreditName}
          </a>
        </p>
      </div>
    </div>
  );
}

export function ContactSection() {
  return (
    <section id="kontakt" className="bg-white px-5 py-16 md:px-8 lg:px-14 lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="font-display text-[44px] font-bold uppercase leading-none text-[#f0425c] md:text-[60px]" data-reveal>
          Kontakt
        </h2>
        <div className="mt-12 grid gap-16 lg:grid-cols-[minmax(320px,0.7fr)_minmax(0,1.3fr)] lg:items-start lg:gap-20">
          
          <div className="space-y-10" data-reveal>
            
            {/* Address */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#f0425c]">
                <MapPin size={20} strokeWidth={2.5} />
                <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">Sídlo</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[24px] font-bold text-black">{site.name}</p>
                <div className="text-[17px] text-[#555]">
                  <p>{site.addressLines[0]}</p>
                  <p>{site.addressLines[1]}</p>
                </div>
              </div>
            </div>

            {/* Hours & Management */}
            <div className="grid gap-10 sm:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#f0425c]">
                  <Clock size={20} strokeWidth={2.5} />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">Otváracie hodiny</p>
                </div>
                <p className="text-[18px] font-bold text-black">{site.hoursFull}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#f0425c]">
                  <User size={20} strokeWidth={2.5} />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">Vedenie</p>
                </div>
                <p className="text-[18px] font-bold text-black">{site.manager}</p>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="space-y-6 pt-6 border-t border-neutral-100">
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

               <a
                href={site.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 pt-4 font-display text-[18px] font-bold text-[#2454ff] transition hover:opacity-80"
              >
                <FacebookIcon className="h-8 w-8" />
                Heatcooltech s.r.o
              </a>
            </div>

          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_64px_rgba(0,0,0,0.1)]" data-reveal>
            <div className="wp-map aspect-[16/9] min-h-[320px] lg:aspect-[16/10]">
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

        <FooterCredits />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <OrderForm />
      <ContactSection />
    </footer>
  );
}
