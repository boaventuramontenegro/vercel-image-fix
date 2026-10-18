import type { IconBaseProps } from 'react-icons';
import { FaWhatsapp } from 'react-icons/fa';
import { content } from '@/content';
import { MaskIcon } from './mask-icon';

// Shared official brand icon for every WhatsApp link.
export function WhatsAppIcon(props: IconBaseProps) {
  return <FaWhatsapp aria-hidden="true" {...props}/>;
}

const paths: Record<string, React.ReactNode> = {
  box: <><path d="M6 4h19v25H6zM17 4v25M6 10h19M21 16v4"/><path d="M3 29h25M10 7h3"/></>,
  balcony: <><path d="M3 5h26v22H3zM11 5v22M21 5v22M3 21h26M6 30h20"/><path d="M5 14h22"/></>,
  window: <><path d="M5 3h22v27H5zM16 3v27M5 15h22M12 18v4M20 18v4"/></>,
  door: <><path d="M8 3h18v28H8zM8 6h18M8 9h18M22 18v4"/></>,
  custom: <><path d="M6 5h9v9H6zM19 5h9v9h-9zM6 20h9v9H6zM19 20h9v9h-9zM12 9h3v3h-3zM21 9h3v3h-3zM9 24h3v3H9zM22 24h3v3h-3z"/></>,
  mirror: <><rect x="7" y="3" width="18" height="26" rx="8"/><path d="m12 17 8-8M12 22l8-8M12 31h8"/></>,
  commerce: <><path d="M3 7h26v22H3zM3 12h26M10 12v17M22 12v17M14 29V18h5v11M1 7l3-4h24l3 4"/></>,
};
export function ServiceIcon({ name }: { name: string }) {
  if (name === 'skylight' || name === 'maintenance') {
    return <MaskIcon src={content.serviceArtwork[name]} name={name}/>;
  }
  return <svg viewBox="0 0 32 34" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
