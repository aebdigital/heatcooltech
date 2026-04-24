"use client";

import { useEffect, useMemo, useState } from "react";
import { RollingButton } from "./RollingButton";

type CookieSettings = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "heatcooltech-cookie-settings";
const CONSENT_KEY = "heatcooltech-cookie-consent";

const defaultSettings: CookieSettings = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function Toggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-5 rounded-[6px] border border-neutral-200 p-4">
      <div>
        <h4 className="font-display text-[18px] font-semibold text-neutral-950">{label}</h4>
        <p className="mt-1 text-[15px] leading-6 text-neutral-600">{description}</p>
      </div>
      <button
        type="button"
        aria-pressed={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative mt-1 inline-flex h-7 w-12 shrink-0 rounded-full transition ${checked ? "bg-[#f0425c]" : "bg-neutral-300"} ${disabled ? "opacity-60" : ""}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${checked ? "left-6" : "left-1"}`}
        />
      </button>
    </div>
  );
}

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>(defaultSettings);

  useEffect(() => {
    const savedSettings = window.localStorage.getItem(STORAGE_KEY);
    const savedConsent = window.localStorage.getItem(CONSENT_KEY);
    const frame = window.requestAnimationFrame(() => {
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings) as CookieSettings;
          setSettings({
            necessary: true,
            analytics: Boolean(parsed.analytics),
            marketing: Boolean(parsed.marketing),
          });
        } catch {
          setSettings(defaultSettings);
        }
      }

      setShowBanner(savedConsent !== "true");
    });

    const openSettings = () => setIsOpen(true);
    window.addEventListener("open-cookie-settings", openSettings);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("open-cookie-settings", openSettings);
    };
  }, []);

  const hasOptionalCookies = useMemo(() => settings.analytics || settings.marketing, [settings.analytics, settings.marketing]);

  function persist(nextSettings: CookieSettings) {
    setSettings(nextSettings);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSettings));
    window.localStorage.setItem(CONSENT_KEY, "true");
    setShowBanner(false);
    setIsOpen(false);
  }

  return (
    <>
      {showBanner ? (
        <div className="fixed bottom-5 left-5 z-[80] max-w-[min(92vw,420px)] rounded-[8px] border border-neutral-200 bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fdf0f3] text-[22px]">
              🍪
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-[20px] font-semibold text-neutral-950">Cookies</h3>
              <p className="mt-2 text-[15px] leading-6 text-neutral-600">
                Používame nevyhnutné cookies a podľa vašich nastavení aj analytické alebo marketingové cookies.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <RollingButton
                  label="Prijať všetko"
                  secondaryLabel="Prijať všetko"
                  tone="dark"
                  className="h-11 px-6 !flex items-center justify-center"
                  onClick={() => persist({ necessary: true, analytics: true, marketing: true })}
                />
                <button
                  type="button"
                  className="inline-flex h-11 items-center px-1 font-display text-[14px] font-semibold uppercase text-[#f0425c] underline underline-offset-4 hover:opacity-80 transition-all cursor-pointer"
                  onClick={() => setIsOpen(true)}
                >
                  Nastavenia
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isOpen ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-xl overflow-auto rounded-[8px] bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-[28px] font-semibold uppercase text-neutral-950">Nastavenia cookies</h3>
                <p className="mt-2 text-[15px] leading-6 text-neutral-600">
                  Nevyhnutné cookies sú vždy zapnuté. Ostatné si môžete upraviť podľa toho, čo vám vyhovuje.
                </p>
              </div>
              <button type="button" className="text-2xl leading-none text-neutral-500" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              <Toggle
                label="Nevyhnutné"
                description="Zabezpečujú základné fungovanie stránky, formulárov a navigácie."
                checked
                disabled
                onChange={() => {}}
              />
              <Toggle
                label="Analytické"
                description="Pomáhajú nám pochopiť, ako sa web používa a čo je dobré ešte vylepšiť."
                checked={settings.analytics}
                onChange={(checked) => setSettings((current) => ({ ...current, analytics: checked }))}
              />
              <Toggle
                label="Marketingové"
                description="Používajú sa na meranie kampaní a prípadné reklamné účely."
                checked={settings.marketing}
                onChange={(checked) => setSettings((current) => ({ ...current, marketing: checked }))}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <RollingButton
                label="Uložiť nastavenia"
                secondaryLabel="Uložené"
                tone="dark"
                className="px-7"
                onClick={() => persist(settings)}
              />
              <RollingButton
                label="Len nevyhnutné"
                secondaryLabel="Len nevyhnutné"
                className="px-7"
                onClick={() => persist(defaultSettings)}
              />
              {hasOptionalCookies ? (
                <p className="self-center text-[14px] text-neutral-500">Voliteľné cookies sú momentálne povolené.</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
