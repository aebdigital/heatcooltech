import { ContactForm } from "./ContactForm";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { FacebookIcon } from "./Icons";
import { site } from "@/src/data/site";

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
        <h2 className="font-display text-[48px] font-bold uppercase leading-none text-[#f0425c] md:text-[64px]" data-reveal>
          Kontakt
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(320px,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
          <div className="space-y-3 text-[18px] leading-8 text-[#4b4b4b]" data-reveal>
            <p className="font-semibold text-[#2f2f2f]">{site.name}</p>
            <p>{site.addressLines[0]}</p>
            <p>{site.addressLines[1]}</p>
            <p className="pt-4 font-semibold text-[#2f2f2f]">Otváracie hodiny:</p>
            <p>{site.hoursFull}</p>
            <p className="pt-1 font-semibold text-[#2f2f2f]">Vedenie spoločnosti:</p>
            <p>{site.manager}</p>
            <p>
              <strong>Tel:</strong>{" "}
              <a className="transition hover:text-[#f0425c]" href={site.phoneHref}>
                {site.phone}
              </a>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a className="transition hover:text-[#f0425c]" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
            <p>
              <span className="inline-block w-[58px]" />
              <a className="transition hover:text-[#f0425c]" href={`mailto:${site.secondaryEmail}`}>
                {site.secondaryEmail}
              </a>
            </p>
            <a
              href={site.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 pt-2 font-display text-[18px] font-semibold text-[#2454ff] transition hover:opacity-80"
            >
              <FacebookIcon className="h-9 w-9" />
              Heatcooltech s.r.o
            </a>
          </div>

          <div className="overflow-hidden rounded-[4px] bg-white shadow-[0_18px_48px_rgba(0,0,0,0.14)]" data-reveal>
            <div className="wp-map aspect-[16/8] min-h-[320px]">
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
