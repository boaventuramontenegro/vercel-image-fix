import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { content } from '@/content';
import { Button } from './ui/button';

export function ServiceSelector({ value, onChange, open, onOpenChange, invalid }: { value: string[]; onChange: (value: string[]) => void; open: boolean; onOpenChange: (open: boolean) => void; invalid: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (event.target instanceof Node && !root.current?.contains(event.target)) onOpenChange(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.preventDefault(); onOpenChange(false); trigger.current?.focus(); } };
    document.addEventListener('pointerdown', outside, true);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside, true); document.removeEventListener('keydown', escape); };
  }, [open, onOpenChange]);
  const finish = () => { onOpenChange(false); trigger.current?.focus(); };
  return <div ref={root} className="service-selector" onBlur={event => { if (open && event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) onOpenChange(false); }}>
    <input type="hidden" name="service" value={value.join(', ')}/>
    <Button ref={trigger} id="quote-service" type="button" variant="ghost" className="service-select-trigger" aria-labelledby="quote-service-label quote-service-value" aria-controls={open ? 'service-options' : undefined} aria-expanded={open} aria-invalid={invalid} aria-describedby={invalid ? 'quote-service-error' : undefined} onClick={() => onOpenChange(!open)}>
      <span id="quote-service-value" className={!value.length ? 'service-select-placeholder' : ''}>{value.length ? value.join(', ') : content.form.servicePlaceholder}</span><ChevronDown className={open ? 'select-chevron is-open' : 'select-chevron'} strokeWidth={1.5}/>
    </Button>
    {open && <div id="service-options" className="service-options" role="group" aria-labelledby="quote-service-label">
      {content.services.map((service, index) => <label key={service.title} className="service-checkbox-option" htmlFor={`service-checkbox-${index}`}><input id={`service-checkbox-${index}`} type="checkbox" checked={value.includes(service.title)} onChange={event => onChange(event.target.checked ? [...value, service.title] : value.filter(item => item !== service.title))}/><span>{service.title}</span></label>)}
      <div className="service-options-finish"><Button type="button" variant="ghost" size="sm" onClick={finish}>{content.actions.finishServices}</Button></div>
    </div>}
    {invalid && <p id="quote-service-error" className="service-error" role="alert">{content.form.serviceError}</p>}
  </div>;
}
