import { useEffect, useState } from 'react';
import { content, whatsappUrl } from '@/content';
import { Button } from './ui/button';
import { WhatsAppIcon } from './brand-icons';

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('inicio');
    const footer = document.querySelector('.site-footer');
    if (!hero || !footer) return;
    let heroVisible = true;
    let footerVisible = false;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === footer) footerVisible = entry.isIntersecting;
      }
      setVisible(!heroVisible && !footerVisible);
    }, { threshold: 0 });
    observer.observe(hero);
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);
  return <Button variant="tool" className={`floating-whatsapp ${visible ? 'is-visible' : ''}`} asChild><a href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label={content.actions.whatsappLabel} title={content.actions.whatsappLabel} aria-hidden={!visible} tabIndex={visible ? 0 : -1}><WhatsAppIcon/></a></Button>;
}