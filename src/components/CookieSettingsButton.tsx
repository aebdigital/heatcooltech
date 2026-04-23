"use client";

type CookieSettingsButtonProps = {
  className?: string;
  children?: string;
};

export function CookieSettingsButton({ className = "", children = "Cookies" }: CookieSettingsButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.dispatchEvent(new Event("open-cookie-settings"));
      }}
    >
      {children}
    </button>
  );
}
