"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, site } from "@/src/data/site";
import { ClockIcon } from "./Icons";

type HeaderProps = {
  overlay?: boolean;
};

export function Header({ overlay = false }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={overlay ? "absolute inset-x-0 top-0 z-40 text-white" : "relative z-40 text-white"}>
      <div className="border-b border-white/80 bg-[rgba(240,66,92,0.72)]">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-4 md:px-8 lg:px-14">
          <Link href="/" aria-label="Heatcooltech domov" className="shrink-0" data-reveal>
            <Image src={site.logo} alt={site.name} width={186} height={112} className="h-[58px] w-auto md:h-[82px]" priority={overlay} />
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-4 md:flex" data-reveal>
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/85">
                <ClockIcon className="h-8 w-8" />
              </div>
              <div className="font-display leading-tight">
                <p className="text-[12px] font-semibold uppercase tracking-[0.03em]">{site.hoursLabel}</p>
                <p className="mt-1 text-[34px] font-semibold">{site.hours}</p>
              </div>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 md:hidden"
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      <nav className="hidden border-b border-white/80 bg-[rgba(240,66,92,0.72)] md:block">
        <div className="mx-auto max-w-[1440px] px-5 py-4 md:px-8 lg:px-14">
          <ul className="flex gap-4 overflow-x-auto whitespace-nowrap font-display text-[17px] font-normal uppercase md:flex-wrap md:justify-start md:gap-x-7 md:gap-y-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(item.href.slice(0, -1));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`transition-colors duration-300 hover:text-[#ff4b2b] ${isActive ? "text-[#ff4b2b]" : "text-white"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[50] bg-black/40 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "30%" }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[55] flex flex-col rounded-t-[32px] bg-white pt-10 md:hidden"
            >
              <div className="flex flex-col gap-6 px-10">
                <p className="font-display text-[12px] font-bold uppercase tracking-widest text-neutral-400">Navigácia</p>
                <ul className="flex flex-col gap-5">
                  {navItems.map((item) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname === item.href || pathname.startsWith(item.href.slice(0, -1));

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`font-display text-[26px] font-bold uppercase leading-none transition-colors ${isActive ? "text-[#f0425c]" : "text-black"}`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8 border-t pt-8">
                   <p className="font-display text-[12px] font-bold uppercase tracking-widest text-neutral-400">Kontakt</p>
                   <a href={site.phoneHref} className="mt-2 block font-display text-[22px] font-bold text-black">{site.phone}</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
