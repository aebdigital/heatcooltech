"use client";

import type { ButtonHTMLAttributes } from "react";

type RollingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  secondaryLabel?: string;
  tone?: "light" | "dark" | "ghost";
};

export function RollingButton({
  label,
  secondaryLabel,
  tone = "light",
  className = "",
  type = "button",
  ...props
}: RollingButtonProps) {
  const toneClass =
    tone === "dark"
      ? "bg-[#f0425c] text-white hover:bg-[#d93a52]"
      : tone === "ghost"
        ? "border border-white/25 bg-transparent text-white hover:bg-white/10"
        : "bg-white text-neutral-950 hover:bg-neutral-100";

  return (
    <button
      type={type}
      className={`rolling-button inline-flex h-14 items-center justify-center overflow-hidden rounded-[4px] px-10 font-display text-[15px] font-bold uppercase tracking-[0.02em] transition-colors duration-300 ${toneClass} ${className}`.trim()}
      {...props}
    >
      <span className="rolling-button__stack">
        <span className="rolling-button__label">{label}</span>
        <span className="rolling-button__label">{secondaryLabel ?? label}</span>
      </span>
    </button>
  );
}
