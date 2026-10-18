import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { content } from '@/content';

// Read-only public endpoint. Collection and all writes are deliberately absent.
export const listGalleryItems = createServerFn({ method: 'GET' }).handler(async () => {
  // Owner-approved collection is authoritative, not a fallback mixed with imported rows.
  if (content.gallery.works.length) return content.gallery.works.map((work, position) => ({
    id: work.src, src: work.src, category: work.categoria, caption: work.legenda, alt: work.alt, position,
  }));
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) return [];
  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
      headers.set('apikey', key);
      return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await client.from('gallery_items').select('id, src, category, caption, alt, position').order('position').order('created_at');
  if (error || !data) return [];
  // Files live in the private "gallery" bucket; only storage paths are served, as signed URLs.
  const valid = data.filter(item => !/^https?:/i.test(item.src));
  if (!valid.length) return [];
  const { data: signed } = await client.storage.from('gallery').createSignedUrls(valid.map(item => item.src), 60 * 60 * 24 * 7);
  return valid.flatMap((item, i) => signed?.[i]?.signedUrl ? [{ ...item, src: signed[i].signedUrl }] : []);
});