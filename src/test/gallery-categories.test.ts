import { describe, expect, it } from 'vitest';
import { content } from '@/content';
import { availableGalleryCategories } from '@/lib/gallery-categories';
import type { Work } from '@/content';

describe('Gallery category rules', () => {
  it('keeps Todos and hides all empty filters', () => {
    expect(availableGalleryCategories([], content.gallery.categories)).toEqual(['Todos']);
  });
  it('shows populated categories in preferred order and adds real new categories', () => {
    const works: Work[] = ['Espelhos', 'Box', 'Box', 'Guarda-corpos', 'Nova categoria'].map(categoria => ({ categoria, src: '', alt: '', legenda: '' }));
    expect(availableGalleryCategories(works, content.gallery.categories)).toEqual(['Todos', 'Box', 'Espelhos', 'Guarda-corpos', 'Nova categoria']);
    expect(availableGalleryCategories(works.filter(work => work.categoria !== 'Box'), content.gallery.categories)).not.toContain('Box');
  });
  it('excludes the discarded storefront from fallback photos', () => {
    expect(content.gallery.works.some(work => work.src.includes('39b3c54b-1906-4c34-a3d1-55ac921f5f98'))).toBe(false);
  });
  it('preserves the commerce quote service', () => {
    expect(content.services.some(service => service.title === 'Divisórias e vidros para comércio')).toBe(true);
  });
});