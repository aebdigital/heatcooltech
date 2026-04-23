import type { Metadata } from "next";
import { site } from "@/src/data/site";
import { Header } from "@/src/components/Header";
import { FooterCredits, OrderForm } from "@/src/components/Footer";
import { FacebookIcon } from "@/src/components/Icons";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Kontaktujte ${site.name} ohľadom montáže klimatizácií, tepelných čerpadiel alebo podlahového vykurovania v Malachove a okolí.`,
  alternates: {
    canonical: "/kontakt/",
  },
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="bg-white px-5 pt-24 pb-12 md:px-8 md:pt-32 lg:px-14 lg:pt-40 lg:pb-16">
          <div className="mx-auto max-w-[1440px]">
            <h1 className="font-display text-[48px] font-bold uppercase leading-none text-[#f0425c] md:text-[72px]" data-reveal>
              Kontaktujte nás
            </h1>
            <p className="mt-8 max-w-[800px] text-[19px] leading-[1.8] text-[#555]" data-reveal>
              Sme pripravení pomôcť vám s výberom, montážou aj servisom vašej tepelnej techniky. 
              Či už ide o klimatizáciu, tepelné čerpadlo alebo podlahové vykurovanie, naši odborníci sú tu pre vás.
            </p>
          </div>
        </section>

        {/* Info & Map Section */}
        <section className="bg-white px-5 py-8 md:px-8 lg:px-14">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-12 lg:grid-cols-[minmax(320px,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16">
              <div className="space-y-4 text-[19px] leading-8 text-[#4b4b4b]" data-reveal>
                <div className="space-y-1">
                  <p className="font-display text-[22px] font-bold text-[#171717]">{site.name}</p>
                  <p>{site.addressLines[0]}, {site.addressLines[1]}</p>
                </div>
                
                <div className="pt-4 space-y-1">
                  <p className="font-semibold text-[#171717]">Otváracie hodiny:</p>
                  <p>{site.hoursFull}</p>
                </div>

                <div className="pt-4 space-y-1">
                  <p className="font-semibold text-[#171717]">Vedenie spoločnosti:</p>
                  <p>{site.manager}</p>
                </div>

                <div className="pt-4 space-y-2">
                  <p>
                    <strong className="text-[#171717]">Tel:</strong>{" "}
                    <a className="transition hover:text-[#f0425c] font-medium" href={site.phoneHref}>
                      {site.phone}
                    </a>
                  </p>
                  <p>
                    <strong className="text-[#171717]">Email:</strong>{" "}
                    <a className="transition hover:text-[#f0425c] font-medium" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </p>
                  <p>
                    <span className="inline-block w-[64px]" />
                    <a className="transition hover:text-[#f0425c] font-medium" href={`mailto:${site.secondaryEmail}`}>
                      {site.secondaryEmail}
                    </a>
                  </p>
                </div>

                <div className="pt-6">
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

              <div className="overflow-hidden rounded-[8px] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.12)] transition hover:shadow-[0_32px_70px_rgba(0,0,0,0.16)]" data-reveal>
                <div className="wp-map aspect-[16/10] min-h-[360px] md:aspect-[16/9]">
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
        <div className="mt-12 lg:mt-20">
          <OrderForm />
        </div>

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
