import { useState, useRef, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { Button } from './ui/button';
import { content, type Work } from '@/content';
import { GlassPlaceholder } from './glass-placeholder';
import { GalleryLightbox } from './gallery-lightbox';
import { useSuspenseQuery } from '@tanstack/react-query';
import { galleryQueryOptions } from '@/lib/gallery-query';
import { galleryPreviewUrl } from '@/gallery-previews';
import { AccentText } from './accent-text';

export function Gallery({ review = false }: { review?: boolean }) {
  const { data: savedItems } = useSuspenseQuery(galleryQueryOptions);
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set());
  const allWorks: Work[] = (savedItems.length ? savedItems.map(item => ({ src: item.src, alt: item.alt, categoria: item.category, legenda: item.caption })) : content.gallery.works).filter(item => !failedImages.has(item.src));
  const [selected, setSelected] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const active = useRef(0);
  const previous = useRef<HTMLButtonElement>(null);
  const next = useRef<HTMLButtonElement>(null);
  const works = allWorks;
  const work = selected === null ? undefined : works[selected];
  const motion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' as const : 'smooth' as const;
  const center = (index: number) => {
    const element = track.current;
    const card = element?.children[index];
    if (!element || !(card instanceof HTMLElement)) return;
    const trackBounds = element.getBoundingClientRect();
    const cardBounds = card.getBoundingClientRect();
    element.scrollTo({ left: element.scrollLeft + cardBounds.left + cardBounds.width / 2 - trackBounds.left - element.clientWidth / 2, behavior: motion() });
  };
  const openCard = (index: number, button: HTMLButtonElement) => { opener.current = button; setSelected(index); };
  const hideFailedImage = (src: string) => {
    setSelected(null);
    setFailedImages(current => new Set([...current, src]));
  };

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      const middle = bounds.left + element.clientWidth / 2;
      let nearest = 0;
      let distance = Infinity;
      Array.from(element.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement)) return;
        const cardBounds = child.getBoundingClientRect();
        const delta = Math.abs(cardBounds.left + cardBounds.width / 2 - middle);
        if (delta < distance) { distance = delta; nearest = index; }
      });
      active.current = nearest;
      Array.from(element.children).forEach((child, index) => { if (child instanceof HTMLElement) {
        child.dataset['active'] = String(index === nearest);
        child.dataset['position'] = index === nearest ? 'center' : index < nearest ? 'left' : 'right';
      } });
      const max = element.scrollWidth - element.clientWidth;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, element.scrollLeft / max)) : 1})`;
      if (counter.current) counter.current.textContent = `${works.length ? nearest + 1 : 0} ${content.gallery.countSeparator} ${works.length}`;
      if (previous.current) previous.current.disabled = nearest === 0;
      if (next.current) next.current.disabled = nearest >= works.length - 1;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    active.current = 0;
    element.scrollTo({ left: 0, behavior: 'instant' });
    update();
    element.addEventListener('scroll', schedule, { passive: true });
    const resize = new ResizeObserver(() => {
      // Desktop keeps the selected photograph centered after a container resize.
      // The mobile scroll position and gestures remain untouched.
      if (window.matchMedia('(min-width: 1024px)').matches) {
        const card = element.children[active.current];
        if (card instanceof HTMLElement) {
          element.scrollTo({ left: card.offsetLeft - element.clientWidth / 2 + card.offsetWidth / 2, behavior: 'instant' });
        }
      }
      schedule();
    });
    resize.observe(element);
    return () => { element.removeEventListener('scroll', schedule); resize.disconnect(); cancelAnimationFrame(frame); };
  }, [works.length]);

  return <section id="galeria" className="section gallery-section"><div className="container">
    <div className="section-heading"><h2><AccentText text={content.gallery.title}/></h2><p>{content.gallery.description}</p></div>
    <div id="gallery-panel" role="region" aria-roledescription="carrossel" aria-label={content.nav.find(item => item.id === 'galeria')?.label} className="gallery-carousel" tabIndex={0} onKeyDown={event => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault(); center(Math.max(0, Math.min(works.length - 1, active.current + (event.key === 'ArrowLeft' ? -1 : 1))));
      }
      if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); center(event.key === 'Home' ? 0 : works.length - 1); }
    }}>
      {works.length ? <>
        <Button ref={previous} variant="tool" className="gallery-arrow gallery-arrow-left" aria-label={content.actions.previous} onClick={() => center(Math.max(0, active.current - 1))}><ChevronLeft/></Button>
        <div className="work-grid" ref={track}>
           {works.map((item, index) => <article className="work-item" key={item.src}>
            <Button variant="photo" className="work-open" onClick={event => openCard(index, event.currentTarget)} aria-label={`${content.actions.openPhoto}: ${item.legenda}`}>
               {(item.src || item.comparison?.afterSrc) ? <img src={galleryPreviewUrl(item.src || item.comparison?.afterSrc || '')} alt={item.alt} width="1200" height="900" loading="lazy" decoding="async" onError={() => hideFailedImage(item.src)}/> : <GlassPlaceholder index={allWorks.indexOf(item)}/>}
               {review && <span className="gallery-review-number">{allWorks.indexOf(item) + 1}</span>}
              <span className="work-caption"><span>{item.legenda}<small>{item.categoria}</small></span></span>
            </Button>
          </article>)}
        </div>
        <Button ref={next} variant="tool" className="gallery-arrow gallery-arrow-right" aria-label={content.actions.next} onClick={() => center(Math.min(works.length - 1, active.current + 1))}><ChevronRight/></Button>
      </> : <p className="gallery-empty">{content.gallery.empty}</p>}
    </div>
    <div className="gallery-status"><div className="gallery-progress" aria-hidden="true"><span ref={progress}/></div><span className="gallery-counter" ref={counter} aria-live="polite" aria-atomic="true">{works.length ? 1 : 0} {content.gallery.countSeparator} {works.length}</span></div>
    <div className="gallery-end"><Button asChild variant="outline"><a href={content.contact.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={18}/>{content.actions.instagram}</a></Button></div>
    <Dialog.Root open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}>
      {work && <GalleryLightbox key={work.src} work={work} index={selected ?? 0} total={works.length} opener={opener} onClose={() => setSelected(null)} onImageError={() => hideFailedImage(work.src)} onNavigate={direction => setSelected(current => current === null ? null : Math.max(0, Math.min(works.length - 1, current + direction)))}/>}
    </Dialog.Root>
  </div></section>;
}
