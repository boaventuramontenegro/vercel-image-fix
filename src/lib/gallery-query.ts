import { queryOptions } from '@tanstack/react-query';
import { listGalleryItems } from './gallery.functions';

export const galleryQueryOptions = queryOptions({ queryKey: ['public-gallery', 'approved-20261016'], queryFn: () => listGalleryItems(), staleTime: 10 * 60_000, refetchOnWindowFocus: false });