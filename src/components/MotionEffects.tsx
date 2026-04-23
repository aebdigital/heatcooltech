"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
    });

    let frame = 0;

    const animate = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    const parallaxTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax='hero']"));

    const updateParallax = () => {
      const offset = window.scrollY * 0.16;
      parallaxTargets.forEach((target) => {
        target.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
      });
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", updateParallax);
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
