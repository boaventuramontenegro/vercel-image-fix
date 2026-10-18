import { content } from '@/content';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';
import { AccentText } from './accent-text';

export function FAQ() {
  return <section id="faq" className="section faq-section" aria-labelledby="faq-title">
    <div className="container">
      <div className="section-heading"><h2 id="faq-title"><AccentText text={content.faq.title}/></h2></div>
      <Accordion type="single" collapsible className="faq-list">
        {content.faq.items.map((item, index) => <AccordionItem key={item.question} value={`faq-${index}`} className="faq-item">
          <AccordionTrigger className="faq-question">{item.question}</AccordionTrigger>
          <AccordionContent className="faq-answer"><p>{item.answer}</p></AccordionContent>
        </AccordionItem>)}
      </Accordion>
    </div>
  </section>;
}