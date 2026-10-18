import { describe, expect, it } from 'vitest';
import { content, quoteFormMessage, whatsappUrl } from '@/content';

describe('Official contact details', () => {
  it('stores the complete official residential address', () => {
    expect(content.contact.address).toBe('Rua Valeriano Antonio Benato, 120 - Dois Córregos, Piracicaba - SP, 13420-838');
  });
  it('uses the official number for a submitted quote', () => {
    const message = quoteFormMessage({ name: 'Ana', services: ['Espelhos'], place: 'Piracicaba', measures: {}, details: '' });
    expect(content.contact.phone).toBe('(19) 99167-3123');
    expect(new URL(whatsappUrl(message)).pathname).toBe('/5519991673123');
  });
});