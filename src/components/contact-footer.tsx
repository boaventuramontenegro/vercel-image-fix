import { useState } from 'react';
import { content, whatsappUrl, quoteFormMessage } from '@/content';
import { Logo } from './logo';
import { WhatsAppIcon } from './brand-icons';
import { ArrowUpIcon } from './footer-icons';
import { Clock, MapPin } from 'lucide-react';
import type { FormEvent } from 'react';
import { Button } from './ui/button';
import { ServiceSelector } from './service-selector';
import { AccentText } from './accent-text';

export function ContactSection() {
  const [name, setName] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [serviceError, setServiceError] = useState(false);
  const [place, setPlace] = useState('');
  const [measures, setMeasures] = useState<Record<string, string>>({});
  const [details, setDetails] = useState('');
  const [serviceOpen, setServiceOpen] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!services.length) { setServiceError(true); setServiceOpen(true); document.getElementById('quote-service')?.focus(); return; }
    if (!name.trim() || !place.trim()) return;
    const message = quoteFormMessage({ name, services, place, measures, details });
    window.open(whatsappUrl(message), '_blank', 'noreferrer');
  };
  return <section id="contato" className="section contact-section"><div className="container">
    <h2 className="contact-title"><AccentText text={content.contact.formTitle}/></h2>
    <form className="quote-form" onSubmit={submit}>
      <div className="form-field"><label htmlFor="quote-name">{content.form.nameLabel}</label><input id="quote-name" name="name" required value={name} onChange={e => setName(e.target.value)} placeholder={content.form.namePlaceholder}/></div>
      <div className="form-field"><label id="quote-service-label" htmlFor="quote-service">{content.form.serviceLabel}</label><ServiceSelector value={services} onChange={next => { setServices(next); if (next.length) setServiceError(false); setMeasures(current => Object.fromEntries(next.map(title => [title, current[title] ?? '']))); }} open={serviceOpen} onOpenChange={setServiceOpen} invalid={serviceError}/></div>
      <div className="form-field"><label htmlFor="quote-place">{content.form.placeLabel}</label><input id="quote-place" name="place" required value={place} onChange={e => setPlace(e.target.value)} placeholder={content.form.placePlaceholder}/></div>
      <fieldset className="measures-group form-field-wide"><legend>{content.form.measuresLabel}</legend>{services.length ? services.map(service => {
        const id = `quote-measures-${content.services.findIndex(item => item.title === service)}`;
        return <div className="measure-reveal" key={service}><div className="measure-reveal-inner"><div className="form-field"><label htmlFor={id}>{service}</label><input id={id} name={id} value={measures[service] ?? ''} onChange={event => setMeasures(current => ({ ...current, [service]: event.target.value }))} placeholder={content.form.measuresPlaceholder}/></div></div></div>;
      }) : <p className="measures-hint">{content.form.measuresHint}</p>}</fieldset>
      <div className="form-field form-field-wide"><label htmlFor="quote-details">{content.form.detailsLabel}</label><textarea id="quote-details" name="details" rows={4} value={details} onChange={e => setDetails(e.target.value)} placeholder={content.form.detailsPlaceholder}/></div>
      <div className="form-actions"><Button type="submit" variant="quote" className="form-submit"><WhatsAppIcon/>{content.actions.submit}</Button></div>
    </form>
  </div></section>;
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const c = content.contact;
  const [mapFailed, setMapFailed] = useState(false);
  const maps = `https://maps.google.com/maps?cid=${c.mapsPlaceId}&hl=pt-BR&z=17&output=embed`;
  const addressText = c.address || c.addressFallback;
  return <footer className="site-footer">
    <div className="container footer-top">
      <div className="footer-brand"><a href="#inicio" className="footer-logo" aria-label={content.brand.name}><Logo variant="light"/></a></div>
      <div className="footer-brand-line" aria-hidden="true"/>
      <div className="footer-contacts">
         <a href={whatsappUrl()} target="_blank" rel="noreferrer"><WhatsAppIcon size={18}/>{content.contact.phone}</a>
         {content.contact.openingHours && <span><Clock size={18} strokeWidth={1.5}/>{content.contact.openingHours}</span>}
        <a href={c.mapsLink} target="_blank" rel="noopener noreferrer"><MapPin size={18} strokeWidth={1.5}/>{addressText}</a>
      </div>
    </div>
    <div className="container footer-map-block">
      {mapFailed ? <a className="footer-map-fallback" href={c.mapsLink} target="_blank" rel="noopener noreferrer"><MapPin size={18} strokeWidth={1.5}/>{c.mapsUnavailable}</a> : <iframe className="footer-map" src={maps} title={c.mapTitle} loading="lazy" referrerPolicy="no-referrer-when-downgrade" width="600" height="260" onError={() => setMapFailed(true)}/>}
      <a className="footer-map-open" href={c.mapsLink} target="_blank" rel="noopener noreferrer"><MapPin size={16} strokeWidth={1.5}/>{c.mapsOpen}</a>
    </div>
    <div className="container footer-bottom">
      <small>© {year} {content.brand.copyright}</small>
       <Button variant="ghost" type="button" className="back-to-top" aria-label={content.actions.backToTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUpIcon width={20} height={20}/></Button>
    </div>
  </footer>;
}
