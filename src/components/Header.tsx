"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

  // If overlay is true, we might still want white text in some hero situations, 
  // but the user explicitly asked for "white bg blur and black links".
  // So I'll default to white bg blur regardless, but maybe slightly transparent if overlay is active.
  const headerBg = overlay ? "bg-white/85 backdrop-blur-md" : "bg-white border-b border-neutral-100";
  const textColor = "text-black";

  return (
    <header className={`relative z-40 ${textColor}`}>
      {/* Top Bar with Info */}
      <div className={`border-b border-neutral-100 ${headerBg}`}>
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-4 md:px-8 lg:px-14">
          <Link href="/" aria-label="Heatcooltech domov" className="shrink-0">
            <Image 
              src={site.logo} 
              alt={site.name} 
              width={186} 
              height={112} 
              className="h-[52px] w-auto md:h-[72px]" 
              priority 
            />
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-4 md:flex">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200 text-[#f0425c]">
                <Clock size={24} />
              </div>
              <div className="font-display leading-tight">
                <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">{site.hoursLabel}</p>
                <p className="text-[28px] font-bold text-black">{site.hours}</p>
              </div>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 md:hidden"
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={24} className="text-black" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={24} className="text-black" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`hidden border-b border-neutral-100 md:block ${headerBg}`}>
        <div className="mx-auto max-w-[1440px] px-5 py-0 md:px-8 lg:px-14">
          <ul className="flex items-center gap-8 font-display text-[15px] font-bold uppercase tracking-wider">
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
                    <div className="flex items-center gap-1 py-5 cursor-pointer transition-colors hover:text-[#f0425c]">
                      <span>{item.label}</span>
                      <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === item.label ? "rotate-180" : ""}`} />
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block py-5 transition-colors hover:text-[#f0425c] ${isActive ? "text-[#f0425c]" : "text-black"}`}
                    >
                      {item.label}
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
                          className="absolute left-0 top-full w-64 rounded-b-xl bg-white p-4 shadow-xl ring-1 ring-black/5"
                        >
                          <ul className="flex flex-col gap-2">
                            {item.children?.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={`block rounded-lg px-4 py-3 text-[14px] transition-colors hover:bg-neutral-50 hover:text-[#f0425c] ${pathname === child.href ? "bg-neutral-50 text-[#f0425c]" : "text-neutral-600"}`}
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
              className="fixed inset-0 z-[55] flex flex-col rounded-t-[32px] bg-white pt-10 md:hidden overflow-y-auto"
            >
              <div className="flex flex-col gap-6 px-10 pb-10">
                <p className="font-display text-[12px] font-bold uppercase tracking-widest text-neutral-400">Menu</p>
                <ul className="flex flex-col gap-4">
                  {navItems.map((item) => {
                    const hasChildren = item.children && item.children.length > 0;
                    
                    return (
                      <li key={item.label}>
                        {hasChildren ? (
                          <div className="space-y-4">
                            <p className="font-display text-[24px] font-bold uppercase text-neutral-300">{item.label}</p>
                            <ul className="flex flex-col gap-4 pl-4 border-l-2 border-neutral-100">
                              {item.children?.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`font-display text-[22px] font-bold uppercase leading-none transition-colors ${pathname === child.href ? "text-[#f0425c]" : "text-black"}`}
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
                            className={`font-display text-[24px] font-bold uppercase leading-none transition-colors ${pathname === item.href ? "text-[#f0425c]" : "text-black"}`}
                          >
                            {item.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-4 border-t pt-8">
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
