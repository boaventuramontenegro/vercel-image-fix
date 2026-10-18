import { content, whatsappUrl } from '@/content';
import { Button } from './ui/button';
import { WhatsAppIcon } from './brand-icons';
import { AccentText } from './accent-text';

export function Hero() {
  return <section id="inicio" className="hero">
    <img className="hero-photo" src={content.hero.imageSrc} alt={content.hero.imageAlt} width="1920" height="1280" fetchPriority="high"/>
    <div className="hero-shade" aria-hidden="true"/>
    <div className="container hero-content"><div className="hero-copy"><div className="hero-brand">{content.brand.name}</div><h1><AccentText text={content.hero.title}/></h1><p>{content.hero.subtitle}</p><div className="hero-actions"><Button asChild variant="quote"><a href={whatsappUrl()} target="_blank" rel="noreferrer"><WhatsAppIcon/>{content.actions.quote}</a></Button><Button asChild variant="glass"><a href="#galeria">{content.actions.work}</a></Button></div></div></div>
  </section>;
}
