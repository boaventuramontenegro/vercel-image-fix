import { createFileRoute } from '@tanstack/react-router';
import { content, whatsappUrl, serviceQuoteMessage } from '@/content';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';
import { Hero } from '@/components/hero';
import { Gallery } from '@/components/gallery';
import { Testimonials } from '@/components/testimonials';
import { ContactSection, SiteFooter } from '@/components/contact-footer';
import { ServiceIcon } from '@/components/brand-icons';
import { FloatingWhatsApp } from '@/components/floating-whatsapp';
import { FAQ } from '@/components/faq';
import { galleryQueryOptions } from '@/lib/gallery-query';
import { About } from '@/components/about';
import { galleryPreviewUrl } from '@/gallery-previews';
import { ScrollReveal } from '@/components/scroll-reveal';
import { AccentText } from '@/components/accent-text';

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>) => ({ revisao: String(search['revisao'] ?? '') === '1' ? 1 : undefined }),
  loader: ({ context }) => context.queryClient.ensureQueryData(galleryQueryOptions),
  head: ({ loaderData }) => ({
    meta: [
      { title: content.seo.title },
      { name: 'description', content: content.seo.description },
      { property: 'og:title', content: content.seo.title },
      { property: 'og:description', content: content.seo.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: '/' },
      { property: 'og:locale', content: 'pt_BR' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: content.seo.title },
      { name: 'twitter:description', content: content.seo.description },
      { property: 'og:image', content: galleryPreviewUrl(content.gallery.works[0]?.src ?? '') },
      { name: 'twitter:image', content: galleryPreviewUrl(content.gallery.works[0]?.src ?? '') },
      { property: 'og:image:alt', content: content.gallery.works[0]?.alt ?? content.brand.name },
    ],
    links: [{ rel: 'canonical', href: '/' }, { rel: 'preload', as: 'image', href: content.hero.imageSrc, fetchPriority: 'high' }],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', name: content.brand.name, description: content.seo.description, telephone: `+${content.contact.whatsappNumber}`, sameAs: [content.contact.instagramUrl], image: content.gallery.works[0]?.src, address: { '@type': 'PostalAddress', streetAddress: 'Rua Valeriano Antonio Benato, 120 - Dois Córregos', postalCode: '13420-838', addressLocality: content.seo.city, addressRegion: content.seo.region, addressCountry: content.seo.country }, hasOfferCatalog: { '@type': 'OfferCatalog', name: content.servicesTitle, itemListElement: content.services.map(service => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: service.title, description: service.description } })) } }) }],
  }),
  component: Index,
});

function Index() {
  const { revisao } = Route.useSearch();
  return <><SiteHeader/><ScrollReveal><main><Hero/>
    <About/>
    <section id="servicos" className="section services-section"><div className="container">
      <div className="section-heading"><h2><AccentText text={content.servicesTitle}/></h2><p>{content.servicesDescription}</p></div>
      <div className="service-grid">{content.services.map((service, i) => <article className={`service-card service-card-${i}`} key={service.title}><ServiceIcon name={service.icon}/><div className="service-copy"><h3>{service.title}</h3><p>{service.description}</p></div><Button variant="service" asChild><a href={whatsappUrl(serviceQuoteMessage(service.title))} target="_blank" rel="noreferrer">{content.actions.serviceQuote}</a></Button></article>)}</div>
    </div></section>
    <Gallery review={revisao === 1}/>
    <Testimonials/>
    <FAQ/>
    <ContactSection/>
  </main><SiteFooter/></ScrollReveal>
   <FloatingWhatsApp/></>;
}
