"use client";

import { Header } from "@/src/components/Header";
import { Footer } from "@/src/components/Footer";
import { site } from "@/src/data/site";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function GDPRPage() {
  return (
    <>
      <Header overlay />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[35vh] min-h-[300px] w-full overflow-hidden bg-neutral-900">
          <Image 
            src={site.socialImage} 
            alt="Ochrana osobných údajov" 
            fill 
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center px-5 md:px-8 lg:px-14">
            <div className="mx-auto w-full max-w-[1440px] text-center">
              <h1 className="font-display text-[42px] font-bold uppercase leading-none text-white md:text-[64px]" data-reveal>
                Ochrana osobných údajov
              </h1>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 md:px-8 lg:px-14 lg:py-24">
          <div className="mx-auto max-w-[900px]">
             {/* Breadcrumbs inside content */}
             <div className="flex flex-wrap items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-neutral-400 mb-12">
              <Link href="/" className="transition-colors hover:text-[#f0425c]">Domov</Link>
              <ChevronRight size={12} />
              <span className="text-[#f0425c]">GDPR</span>
            </div>

            <div className="prose-copy text-[18px] leading-[1.8] text-[#444] space-y-12">
              <div>
                <p className="font-bold text-black text-[22px] mb-2">{site.name}</p>
                <p>{site.addressLines[0]}, {site.addressLines[1]}</p>
                <p>Konateľ: {site.manager}</p>
                <p>E-mail: {site.email}</p>
                <p>Tel.: {site.phone}</p>
              </div>

              <p>
                Tieto Zásady ochrany osobných údajov (ďalej len „Zásady“) popisujú, aké osobné údaje spracúvame v súvislosti s používaním našej webovej stránky a kontaktných formulárov.
              </p>

              <div className="space-y-6">
                <h2 className="font-display text-[28px] font-bold uppercase text-black">I. Kontaktný formulár</h2>
                <p>Na stránke {site.source.replace("https://", "")} prevádzkujeme kontaktný formulár, ktorého účelom je umožniť vám:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Položiť otázku k našim produktom a službám</li>
                  <li>Požiadať o cenovú ponuku</li>
                </ul>
                
                <div className="pt-4 space-y-4">
                  <p className="font-bold text-black">Rozsah spracúvaných údajov:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Meno a priezvisko</li>
                    <li>E-mailová adresa</li>
                    <li>Telefónne číslo</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <p className="font-bold text-black">Účel spracovania:</p>
                  <p>Spracúvame uvedené údaje, aby sme vás mohli kontaktovať a reagovať na váš dopyt.</p>
                </div>

                <div className="space-y-4">
                  <p className="font-bold text-black">Právny základ:</p>
                  <p>Článok 6 ods. 1 písm. b) GDPR – plnenie opatrení pred uzavretím zmluvy na žiadosť dotknutej osoby.</p>
                </div>

                <div className="space-y-4">
                  <p className="font-bold text-black">Doba uchovávania:</p>
                  <p>Osobné údaje budeme uchovávať maximálne 10 rokov od odozvy na váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah.</p>
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-neutral-100">
                <h2 className="font-display text-[28px] font-bold uppercase text-black">II. Súbory cookies</h2>
                <p>Na našej webovej stránke používame cookies výlučne na nasledujúce účely:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Nevyhnutné cookies</strong> – zabezpečujú základnú funkčnosť stránky (napr. ukladanie relácie, nastavení prehliadača).</li>
                  <li><strong>Štatistické (analytické) cookies</strong> – pomáhajú nám pochopiť, ako návštevníci stránku používajú (nasadzujeme ich len so súhlasom používateľa).</li>
                </ul>
                <div className="space-y-4 pt-4">
                  <p className="font-bold text-black">Správa súhlasov:</p>
                  <p>Používateľ môže kedykoľvek odvolať súhlas s využívaním štatistických cookies prostredníctvom nastavení cookie lišty alebo priamo v prehliadači.</p>
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-neutral-100">
                <h2 className="font-display text-[28px] font-bold uppercase text-black">III. Práva dotknutej osoby</h2>
                <p>Podľa nariadenia GDPR máte nasledujúce práva:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Prístup k osobným údajom, ktoré spracúvame</li>
                  <li>Oprava nepresných alebo neúplných údajov</li>
                  <li>Vymazanie („právo zabudnutia“), ak na spracovanie už nie je právny základ</li>
                  <li>Obmedzenie spracovania</li>
                  <li>Prenosnosť údajov</li>
                  <li>Odvolanie súhlasu – stane sa účinným dňom odvolania</li>
                  <li>Podanie sťažnosti u Úradu na ochranu osobných údajov SR (Hraničná 12, 820 07 Bratislava, www.dataprotection.gov.sk)</li>
                </ul>
                <p className="pt-4">
                  V prípade otázok alebo uplatnenia Vašich práv nás môžete kontaktovať na <a href={`mailto:${site.email}`} className="font-bold text-[#f0425c] hover:underline">{site.email}</a> alebo telefónnom čísle <a href={site.phoneHref} className="font-bold text-[#f0425c] hover:underline">{site.phone}</a>.
                </p>
              </div>

              <p className="pt-12 text-neutral-400 text-[14px]">
                Tieto Zásady nadobúdajú účinnosť dňom 25. 4. 2025.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
