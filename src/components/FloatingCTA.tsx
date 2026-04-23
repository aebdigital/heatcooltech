"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export function FloatingCTA() {
  const scrollToForm = () => {
    const element = document.getElementById("objednavka");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // If the section isn't on the current page, navigate to contact or home
      window.location.href = "/#objednavka";
    }
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", damping: 15 }}
      onClick={scrollToForm}
      className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0425c] text-white shadow-[0_16px_40px_rgba(240,66,92,0.4)] transition-transform hover:scale-110 active:scale-95 group"
      aria-label="Cenová ponuka"
    >
      <MessageSquare size={28} />
      
      {/* Tooltip-like label */}
      <span className="absolute right-full mr-4 whitespace-nowrap rounded-lg bg-neutral-900 px-4 py-2 text-[13px] font-bold uppercase tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none shadow-xl">
        Cenová ponuka
      </span>
    </motion.button>
  );
}
