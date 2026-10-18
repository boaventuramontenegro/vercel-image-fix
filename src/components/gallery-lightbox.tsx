import { useEffect, useRef, useState, type RefObject } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, Instagram, X } from 'lucide-react';
import { TransformWrapper, TransformComponent, type ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { Button } from './ui/button';
import { content, type Work } from '@/content';

export function GalleryLightbox({ work, index, total, opener, onClose, onImageError, onNavigate }: {
  work: Work;
  index: number;
  total: number;
  opener: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onImageError: () => void;
  onNavigate: (direction: -1 | 1) => void;
}) {
  const close = useRef<HTMLButtonElement>(null);
  const scale = useRef(1);
  const zoom = useRef<ReactZoomPanPinchRef>(null);
  const picture = useRef<HTMLDivElement>(null);
  const tap = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastTap = useRef(0);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const pointer = useRef<{ x: number; y: number; scale: number } | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const toggleZoom = () => zoom.current?.centerView(scale.current > 1.001 ? 1 : 2.5, reducedMotion ? 0 : 200, 'easeOut');

  useEffect(() => {
    const element = picture.current;
    if (!element) return;
    const measure = () => element.style.setProperty('--lightbox-picture-height', `${element.clientHeight}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [loaded]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return <Dialog.Portal>
    <Dialog.Overlay className="modal-overlay"/>
    <Dialog.Content className="lightbox" aria-label={work.legenda} aria-describedby={undefined}
      onKeyDown={event => {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          event.stopPropagation();
          onNavigate(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}
      onOpenAutoFocus={event => { event.preventDefault(); close.current?.focus(); }}
      onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus({ preventScroll: true }); }}
      onPointerDownOutside={event => { if (scale.current > 1.001) event.preventDefault(); }}
      onPointerDown={event => {
        if (!(event.target instanceof Element) || event.target.closest('.lightbox-zoom-content, button, a, .lightbox-footer')) return;
        pointer.current = { x: event.clientX, y: event.clientY, scale: scale.current };
      }}
      onPointerUp={event => {
        const start = pointer.current;
        pointer.current = null;
        if (!start || start.scale > 1.001 || scale.current > 1.001 || !(event.target instanceof Element) || event.target.closest('.lightbox-zoom-content, button, a, .lightbox-footer')) return;
        if (Math.hypot(event.clientX - start.x, event.clientY - start.y) < 8) onClose();
      }} onPointerCancel={() => { pointer.current = null; }}>
      <Dialog.Title className="sr-only">{work.legenda}</Dialog.Title>
      <div className="lightbox-topbar">
        <span className="lightbox-counter" aria-live="polite">{index + 1} {content.gallery.countSeparator} {total}</span>
        <Dialog.Close asChild><Button ref={close} variant="tool" className="lightbox-close" aria-label={content.actions.close}><X/></Button></Dialog.Close>
      </div>
      <Button variant="tool" className="lightbox-arrow lightbox-arrow-left" aria-label={content.actions.previous} disabled={index === 0} onClick={() => onNavigate(-1)}><ChevronLeft/></Button>
      <Button variant="tool" className="lightbox-arrow lightbox-arrow-right" aria-label={content.actions.next} disabled={index >= total - 1} onClick={() => onNavigate(1)}><ChevronRight/></Button>
      <div ref={picture} className="lightbox-picture" onDoubleClick={event => { event.preventDefault(); toggleZoom(); }}
        onTouchStart={event => {
          const first = event.touches[0];
          tap.current = event.touches.length === 1 && first ? { x: first.clientX, y: first.clientY, time: Date.now() } : null;
          swipe.current = event.touches.length === 1 && first && scale.current <= 1.001 ? { x: first.clientX, y: first.clientY } : null;
          if (event.touches.length > 1) lastTap.current = 0;
        }}
        onTouchEnd={event => {
          const start = tap.current;
          const end = event.changedTouches[0];
          const swipeStart = swipe.current;
          tap.current = null;
          swipe.current = null;
          const now = Date.now();
          if (!start || !end || event.touches.length) { lastTap.current = 0; return; }
          const deltaX = end.clientX - start.x;
          const deltaY = end.clientY - start.y;
          if (swipeStart && scale.current <= 1.001 && Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
            lastTap.current = 0;
            onNavigate(deltaX < 0 ? 1 : -1);
            return;
          }
          if (now - start.time > 250 || Math.hypot(deltaX, deltaY) > 8) { lastTap.current = 0; return; }
          if (lastTap.current && now - lastTap.current < 300) { lastTap.current = 0; toggleZoom(); }
          else lastTap.current = now;
        }}>
        <TransformWrapper ref={zoom} key={loaded ? 'loaded' : 'loading'} initialScale={1} minScale={1} maxScale={4} centerOnInit centerZoomedOut limitToBounds disablePadding smooth={false}
          panning={{ velocityDisabled: true }}
          doubleClick={{ disabled: true }}
          zoomAnimation={{ disabled: true }} autoAlignment={{ animationTime: 0, velocityAlignmentTime: 0 }}
          onTransform={(_, state) => { scale.current = state.scale; }}>
          <TransformComponent wrapperClass="lightbox-zoom" contentClass="lightbox-zoom-content">
            <img src={work.src || work.comparison?.afterSrc} alt={work.legenda} draggable={false} decoding="async" onLoad={() => setLoaded(true)} onError={onImageError}/>
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div className="lightbox-footer">
        <p>{work.legenda}</p>
        <small>{work.categoria}</small>
        <a className="lightbox-instagram" href={content.contact.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={16}/>{content.actions.instagram}</a>
      </div>
    </Dialog.Content>
  </Dialog.Portal>;
}
