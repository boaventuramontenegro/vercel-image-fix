import { describe, expect, it } from 'vitest';
import { testimonialName } from '@/lib/testimonial-name';

describe('Customer name privacy', () => {
  it('removes email addresses', () => {
    expect(testimonialName('Brumate contato@example.com')).toBe('Brumate');
  });
  it('removes phone numbers', () => {
    expect(testimonialName('Roseli Machi +55 (19) 99167-3127')).toBe('Roseli Machi');
  });
  it('removes social handles', () => {
    expect(testimonialName('Roseli Machi @roseli')).toBe('Roseli Machi');
  });
  it('removes website links', () => {
    expect(testimonialName('Brumate https://example.com www.example.com')).toBe('Brumate');
  });
  it('preserves complete names with more than two terms', () => {
    expect(testimonialName('Itamara Rissardi Xavier')).toBe('Itamara Rissardi Xavier');
  });
  it('keeps the name when an email precedes it', () => {
    expect(testimonialName('ebrumatte@hotmail.com Brumate')).toBe('Brumate');
  });
});