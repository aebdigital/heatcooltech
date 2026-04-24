"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Clock } from "lucide-react";
import { navItems, site } from "@/src/data/site";

type HeaderProps = {
  overlay?: boolean;
};

export function Header({ overlay = false }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBg = scrolled || !overlay ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent";
  const textColor = scrolled || !overlay ? "text-black" : "text-white";
  const borderColor = scrolled || !overlay ? "border-white/10" : "border-white/20";

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${headerBg} ${textColor}`}>
        <div className={`border-b transition-colors duration-300 ${borderColor}`}>
          <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-4 md:px-8 lg:px-14">
            
            {/* Logo */}
            <Link href="/" aria-label="Heatcooltech domov" className="shrink-0 relative z-[70]">
              <Image 
                src={site.logo} 
                alt={site.name} 
                width={186} 
                height={112} 
                className={`h-[48px] w-auto transition-all duration-300 md:h-[60px] ${scrolled || !overlay ? "" : "brightness-0 invert"}`} 
                priority 
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:block">
              <ul className="flex items-center gap-7 font-display text-[14px] font-bold uppercase tracking-wider">
                {navItems.map((item) => {
                  const hasChildren = item.children && item.children.length > 0;
                  const isActive = pathname === item.href || (hasChildren && item.children?.some(child => pathname === child.href));

                  return (
                    <li 
                      key={item.label} 
                      className="relative group"
                      onMouseEnter={() => hasChildren && setActiveDropdown(item.label)}
                      onMouseLeave={() => hasChildren && setActiveDropdown(null)}
                    >
                      {hasChildren ? (
                        <div className={`relative flex items-center gap-1 py-2 cursor-pointer transition-colors hover:text-[#f0425c] ${isActive ? "text-[#f0425c]" : ""}`}>
                          <span>{item.label}</span>
                          <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === item.label ? "rotate-180" : ""}`} />
                          
                          {/* Animated Underline */}
                          <div className={`absolute bottom-0 left-0 h-0.5 bg-[#f0425c] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`relative block py-2 transition-colors hover:text-[#f0425c] ${isActive ? "text-[#f0425c]" : ""}`}
                        >
                          {item.label}
                          
                          {/* Animated Underline */}
                          <div className={`absolute bottom-0 left-0 h-0.5 bg-[#f0425c] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                        </Link>
                      )}

                      {/* Dropdown Menu */}
                      {hasChildren && (
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 rounded-xl bg-white p-4 shadow-2xl ring-1 ring-black/5 text-black"
                            >
                              <ul className="flex flex-col gap-1">
                                {item.children?.map((child) => (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      className={`block rounded-lg px-4 py-2.5 text-[13px] transition-colors hover:bg-neutral-50 hover:text-[#f0425c] ${pathname === child.href ? "bg-neutral-50 text-[#f0425c]" : "text-neutral-600"}`}
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right Side: Hours & Hamburger */}
            <div className="flex items-center gap-6">
              <div className="hidden items-center gap-3 sm:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100/10 transition-colors">
                  <Clock size={18} className={scrolled || !overlay ? "text-[#f0425c]" : "text-white"} />
                </div>
                <div className="text-[12px] leading-tight">
                  <p className="font-bold uppercase tracking-wide opacity-60">{site.hoursLabel}</p>
                  <p className="mt-0.5 font-bold">{site.hours}</p>
                </div>
              </div>

              {/* Hamburger Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-[#f0425c] text-white transition-transform hover:scale-105 active:scale-95 xl:hidden"
                aria-label={isMenuOpen ? "Zatvoriť menu" : "Otvoriť menu"}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide-up (70vh from bottom) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[65] bg-black/40 backdrop-blur-sm xl:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[68] flex flex-col rounded-t-[32px] bg-white pt-10 xl:hidden overflow-y-auto shadow-2xl h-[70vh]"
            >
              <div className="flex flex-col gap-6 px-10 pb-12">
                <div className="flex items-center justify-between">
                  <p className="font-display text-[12px] font-bold uppercase tracking-widest text-neutral-400">Menu</p>
                  <button onClick={() => setIsMenuOpen(false)} className="h-8 w-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
                    <X size={18} />
                  </button>
                </div>

                <ul className="flex flex-col gap-5">
                  {navItems.map((item) => {
                    const hasChildren = item.children && item.children.length > 0;
                    
                    return (
                      <li key={item.label}>
                        {hasChildren ? (
                          <div className="space-y-4">
                            <p className="font-display text-[11px] font-bold uppercase tracking-widest text-neutral-400">Služby</p>
                            <ul className="flex flex-col gap-6 pl-4 border-l-2 border-neutral-100">
                              {item.children?.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`font-display text-[24px] font-bold uppercase leading-none transition-colors ${pathname === child.href ? "text-[#f0425c]" : "text-black"}`}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`font-display text-[26px] font-bold uppercase leading-none transition-colors ${pathname === item.href ? "text-[#f0425c]" : "text-black"}`}
                          >
                            {item.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6 border-t border-neutral-100 pt-8">
                   <p className="font-display text-[12px] font-bold uppercase tracking-widest text-neutral-400">Kontakt</p>
                   <a href={site.phoneHref} className="mt-2 block font-display text-[24px] font-bold text-black">{site.phone}</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
