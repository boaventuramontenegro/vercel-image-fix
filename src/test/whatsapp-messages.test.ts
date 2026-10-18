import { describe, expect, it } from 'vitest';
import { content, quoteFormMessage, serviceQuoteMessage, whatsappUrl } from '@/content';

describe('WhatsApp quote messages', () => {
  it('encodes the exact approved generic message and uses the official number', () => {
    const url = new URL(whatsappUrl());
    expect(url.searchParams.get('text')).toBe('Olá! Gostaria de solicitar um orçamento e saber mais sobre os serviços de vocês. Poderiam me ajudar?');
    expect(url.pathname).toBe('/5519991673123');
  });
  it('names every individual service', () => {
    for (const service of content.services) {
      expect(serviceQuoteMessage(service.title)).toBe(`Olá! Tenho interesse no serviço de ${service.title} e gostaria de solicitar um orçamento. Poderiam me passar mais informações?`);
      expect(new URL(whatsappUrl(serviceQuoteMessage(service.title))).pathname).toBe('/5519991673123');
    }
  });
  it('separates complete fields and individual measurements', () => {
    expect(quoteFormMessage({ name: ' Ana ', services: ['Box de banheiro', 'Espelhos'], place: ' Piracicaba, Centro ', measures: { 'Box de banheiro': '120 × 190 cm', Espelhos: '80 × 90 cm' }, details: ' Vidro transparente ' })).toBe('Olá! Me chamo Ana e gostaria de um orçamento.\n\nServiço: Box de banheiro, Espelhos\nCidade e bairro: Piracicaba, Centro\nMedidas aproximadas:\n- Box de banheiro: 120 × 190 cm\n- Espelhos: 80 × 90 cm\n\nDetalhes: Vidro transparente');
  });
  it('omits empty optional fields and deselected measurements', () => {
    expect(quoteFormMessage({ name: 'Ana', services: ['Espelhos'], place: 'Centro', measures: { Espelhos: ' ', 'Box de banheiro': '100 cm' }, details: ' ' })).toBe('Olá! Me chamo Ana e gostaria de um orçamento.\n\nServiço: Espelhos\nCidade e bairro: Centro');
  });
});