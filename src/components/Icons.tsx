import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 3 2.5 5.5M19 3l2.5 2.5M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.3" />
      <path d="M10 5.5h4" strokeLinecap="round" />
      <path d="M12 18.5h.01" strokeLinecap="round" />
    </svg>
  );
}

export function ToolboxIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <path d="M8 7V5.8A1.8 1.8 0 0 1 9.8 4h4.4A1.8 1.8 0 0 1 16 5.8V7" strokeLinecap="round" />
      <path d="M4 9.3A2.3 2.3 0 0 1 6.3 7h11.4A2.3 2.3 0 0 1 20 9.3v7.4A2.3 2.3 0 0 1 17.7 19H6.3A2.3 2.3 0 0 1 4 16.7Z" />
      <path d="M4 12h16" strokeLinecap="round" />
      <path d="M10.5 12v2h3v-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BadgeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <path
        d="m12 2.8 1.7 1.3a2 2 0 0 0 1.65.35l2.07-.57.56 2.07a2 2 0 0 0 1.13 1.3l1.89.83-.84 1.88a2 2 0 0 0 0 1.69l.84 1.88-1.9.84a2 2 0 0 0-1.12 1.29l-.56 2.08-2.07-.57a2 2 0 0 0-1.65.35L12 21.2l-1.7-1.3a2 2 0 0 0-1.65-.35l-2.07.57-.56-2.08a2 2 0 0 0-1.13-1.29l-1.89-.84.84-1.88a2 2 0 0 0 0-1.69l-.84-1.88 1.9-.83a2 2 0 0 0 1.12-1.3l.56-2.07 2.07.57a2 2 0 0 0 1.65-.35Z"
        strokeLinejoin="round"
      />
      <path d="m9.2 12.3 1.8 1.8 3.8-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChecklistIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <path d="M9 4h6" strokeLinecap="round" />
      <rect x="6" y="2.8" width="12" height="18.4" rx="2.2" />
      <path d="M9 9h5.5M9 13h5.5M9 17h5.5" strokeLinecap="round" />
      <path d="m6.8 8.7.8.8 1.2-1.2M6.8 12.7l.8.8 1.2-1.2M6.8 16.7l.8.8 1.2-1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M24 12.07C24 5.403 18.627 0 12 0S0 5.403 0 12.07c0 6.026 4.388 11.02 10.125 11.93v-8.438H7.078V12.07h3.047V9.405c0-3.022 1.792-4.692 4.533-4.692 1.313 0 2.686.236 2.686.236v2.97h-1.514c-1.49 0-1.956.93-1.956 1.885v2.266h3.328l-.532 3.492h-2.796V24C19.612 23.09 24 18.096 24 12.07Z" />
    </svg>
  );
}

export function CookieIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <path
        d="M14.8 3.2a3.2 3.2 0 0 0 3.5 3.5 3.8 3.8 0 1 1-5.1 5.1 3.2 3.2 0 0 0-4.4 4.4A3.8 3.8 0 1 1 3.2 9.2a7.9 7.9 0 0 0 11.6-6Z"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.6" cy="12.1" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.8" cy="16.2" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
