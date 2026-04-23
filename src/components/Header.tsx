"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClockIcon } from "./Icons";
import { navItems, site } from "@/src/data/site";

type HeaderProps = {
  overlay?: boolean;
};

export function Header({ overlay = false }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className={overlay ? "absolute inset-x-0 top-0 z-40 text-white" : "relative z-40 text-white"}>
      <div className="border-b border-white/80 bg-[rgba(240,66,92,0.72)]">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-4 md:px-8 lg:px-14">
          <Link href="/" aria-label="Heatcooltech domov" className="shrink-0" data-reveal>
            <Image src={site.logo} alt={site.name} width={186} height={112} className="h-[58px] w-auto md:h-[82px]" priority={overlay} />
          </Link>

          <div className="hidden items-center gap-4 md:flex" data-reveal>
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/85">
              <ClockIcon className="h-8 w-8" />
            </div>
            <div className="font-display leading-tight">
              <p className="text-[12px] font-semibold uppercase tracking-[0.03em]">{site.hoursLabel}</p>
              <p className="mt-1 text-[34px] font-semibold">{site.hours}</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="border-b border-white/80 bg-[rgba(240,66,92,0.72)]">
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
    </header>
  );
}
