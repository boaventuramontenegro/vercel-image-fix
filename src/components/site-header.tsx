import { useEffect, useRef, useState } from 'react';
import { content } from '@/content';
import { Logo } from './logo';
import { Button } from './ui/button';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const dismiss = () => { setOpen(false); trigger.current?.focus(); };
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss();
      if (event.key === 'Tab') {
        const elements = header.current?.querySelectorAll<HTMLElement>('a, button');
        if (!elements?.length) return;
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const outside = (event: MouseEvent) => { if (event.target instanceof Node && !header.current?.contains(event.target)) dismiss(); };
    document.addEventListener('keydown', keyboard);
    document.addEventListener('click', outside);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', keyboard); document.removeEventListener('click', outside); };
  }, [open]);
  const navigation = content.nav;
  return <>{open && <div className="menu-backdrop" aria-hidden="true"/>}<header ref={header} className="site-topbar">
    <a href="#inicio" aria-label={content.brand.name} className="topbar-logo"><Logo variant="dark"/></a>
    <nav className="desktop-navigation" aria-label={content.brand.name}>{navigation.map(item => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav>
    <Button ref={trigger} variant="ghost" type="button" className={`menu-toggle ${open ? 'menu-open' : ''}`} aria-expanded={open} aria-controls="site-menu" aria-label={open ? content.actions.closeMenu : content.actions.openMenu} onClick={() => setOpen(v => !v)}><span className="menu-lines"><i/><i/></span></Button>
    <div id="site-menu" className={`menu-panel ${open ? 'is-open' : ''}`} inert={!open}>
      <nav className="menu-navigation" aria-label={content.brand.name}>
        {navigation.map(item => <a href={`#${item.id}`} key={item.id} onClick={e => { setOpen(false); if (item.id === 'inicio') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}>{item.label}</a>)}
         <div className="menu-extra"><Button asChild variant="quote" className="menu-quote"><a href="#contato" onClick={() => setOpen(false)}>{content.actions.quote}</a></Button></div>
      </nav>
    </div>
  </header></>;
}
