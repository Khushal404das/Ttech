import React from 'react';
import { CalendarCheck } from 'lucide-react';

/**
 * "Book a free 30-min call".
 * Set VITE_BOOKING_URL (e.g. your Calendly link) and the button opens that
 * scheduler. Until then it opens WhatsApp with a ready-written booking
 * message, so the button always works.
 */
const WHATSAPP_BOOKING =
  'https://wa.me/923489763998?text=' +
  encodeURIComponent("Hi Ttech! I'd like to book a free 30-minute call about my project. Which times work for you?");

export const BOOKING_URL: string = (import.meta.env.VITE_BOOKING_URL as string | undefined)?.trim() || WHATSAPP_BOOKING;

type Variant = 'primary' | 'secondary' | 'dark' | 'compact';

const STYLES: Record<Variant, string> = {
  primary:
    'gap-2.5 rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] px-7 py-4 text-sm font-bold text-white shadow-[0_8px_20px_rgba(37,99,235,.35)] hover:shadow-[0_12px_28px_rgba(37,99,235,.45)] hover:-translate-y-0.5',
  secondary:
    'gap-2.5 rounded-2xl border border-[#DCE8F8] bg-white px-7 py-4 text-sm font-semibold text-[#0B1220] shadow-sm hover:border-[#2563EB] hover:bg-[#F1F7FF]',
  dark: 'gap-2.5 rounded-2xl bg-white px-7 py-4 text-sm font-bold text-[#0B1220] shadow-lg hover:bg-[#EAF2FF] hover:-translate-y-0.5',
  compact:
    'gap-2 rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white shadow-[0_8px_20px_rgba(37,99,235,.4)] hover:bg-[#1D4ED8]',
};

interface BookCallButtonProps {
  variant?: Variant;
  className?: string;
  label?: string;
  onClick?: () => void;
}

export const BookCallButton: React.FC<BookCallButtonProps> = ({
  variant = 'primary',
  className = '',
  label = 'Book a free 30-min call',
  onClick,
}) => (
  <a
    href={BOOKING_URL}
    target="_blank"
    rel="noopener noreferrer"
    onClick={onClick}
    className={`inline-flex items-center justify-center no-underline transition-all cursor-pointer ${STYLES[variant]} ${className}`}
  >
    <CalendarCheck className={variant === 'compact' ? 'w-3.5 h-3.5' : 'w-4 h-4'} aria-hidden="true" />
    <span>{label}</span>
  </a>
);
