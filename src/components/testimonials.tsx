import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { content } from '@/content';
import { Button } from './ui/button';
import { testimonialName } from '@/lib/testimonial-name';
import { AccentText } from './accent-text';

export function Testimonials() {
  const items = content.testimonials;
  const [index, setIndex] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const current = items[index];
  if (!content.showTestimonials || !current) return null;
  const previous = () => setIndex(current => Math.max(0, current - 1));
  const next = () => setIndex(current => Math.min(items.length - 1, current + 1));
  return <section id="depoimentos" className="section testimonial-section"><div className="container">
    <div className="section-heading"><h2><AccentText text={content.testimonialsTitle}/></h2></div>
    <div className="testimonial-stage" role="region" aria-label={content.testimonialsTitle} aria-roledescription="carrossel" tabIndex={0} onKeyDown={event => { if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); } if (event.key === 'ArrowRight') { event.preventDefault(); next(); } }} onTouchStart={event => { const start = event.touches[0]; touch.current = start ? { x: start.clientX, y: start.clientY } : null; }} onTouchEnd={event => {
      const end = event.changedTouches[0]; const start = touch.current; touch.current = null;
      if (!start || !end) return;
      const delta = end.clientX - start.x;
      if (Math.abs(delta) > 45 && Math.abs(delta) > Math.abs(end.clientY - start.y)) { if (delta < 0) next(); else previous(); }
    }}>
      {items.map((item, position) => <div className="testimonial testimonial-measure" aria-hidden="true" key={position}>
        <blockquote>{item.text}</blockquote><div className="testimonial-name">{testimonialName(item.name)}{(item.service || item.source) && <small>{item.service || item.source}</small>}</div>
      </div>)}
      <figure className="testimonial testimonial-visible" key={index} aria-live="polite" aria-atomic="true">
        <blockquote>{current.text}</blockquote>
        <figcaption>{testimonialName(current.name)}{(current.service || current.source) && <small>{current.service || current.source}</small>}</figcaption>
      </figure>
    </div>
    {items.length > 1 && <div className="testimonial-controls">
      <div className="testimonial-navigation"><Button variant="tool" className="testimonial-arrow" aria-label={content.actions.previousTestimonial} disabled={index === 0} onClick={previous}><ChevronLeft/></Button><Button variant="tool" className="testimonial-arrow" aria-label={content.actions.nextTestimonial} disabled={index === items.length - 1} onClick={next}><ChevronRight/></Button></div>
    </div>}
  </div></section>;
}
