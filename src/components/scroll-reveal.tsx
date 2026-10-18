import { useEffect, useRef, type ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';
const targets = '.hero-copy > h1, .hero-copy > p, .hero-actions, .section-heading > *, .service-card, .gallery-carousel, .gallery-status, .gallery-end, .about-picture, .about-copy > p, .testimonial-stage, .testimonial-controls, .faq-item, .contact-title, .form-field, .form-actions, .footer-brand, .footer-contacts, .footer-map-block, .footer-bottom';

// Content is visible in SSR and remains visible if observer initialization fails.
export function ScrollReveal({ children, direction = 'up', delay = 0 }: { children: ReactNode; direction?: Direction; delay?: number }) {
  const scope = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = scope.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const elements = Array.from(root.querySelectorAll<HTMLElement>(targets));
    const restore = () => elements.forEach(element => { element.dataset['revealState'] = 'visible'; });
    let observer: IntersectionObserver | undefined;
    try {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset['revealState'] = 'visible';
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      if (!media.matches) elements.forEach((element, index) => {
        element.dataset['revealDirection'] = element.dataset['revealDirection'] ?? direction;
        element.style.setProperty('--reveal-delay', `${delay + Number(element.dataset['revealDelay'] ?? (element.matches('.service-card,.faq-item') ? index % 3 * 60 : 0))}ms`);
        observer?.observe(element);
        element.dataset['revealState'] = element.getBoundingClientRect().bottom <= 0 ? 'visible' : 'pending';
      });
    } catch { observer?.disconnect(); restore(); }
    const motionChange = () => { if (media.matches) { observer?.disconnect(); restore(); } };
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>('[data-reveal-state="pending"]');
      if (element) { element.dataset['revealState'] = 'visible'; observer?.unobserve(element); }
    };
    media.addEventListener('change', motionChange);
    root.addEventListener('focusin', focus);
    return () => { observer?.disconnect(); media.removeEventListener('change', motionChange); root.removeEventListener('focusin', focus); restore(); };
  }, [direction, delay]);
  return <div ref={scope} className="scroll-reveal-scope">{children}</div>;
}