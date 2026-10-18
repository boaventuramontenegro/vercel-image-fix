import type { Category, Work } from '@/content';

export function availableGalleryCategories(works: Work[], preferred: Category[]): Category[] {
  const present = new Set(works.map(work => work.categoria).filter(category => category !== 'Todos'));
  return ['Todos', ...preferred.filter(category => category !== 'Todos' && present.delete(category)), ...present];
}