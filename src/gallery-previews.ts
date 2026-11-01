import original0 from './assets/gallery/approved/espelho-banheiro.webp.asset.json';
import preview0 from './assets/gallery/approved/espelho-banheiro-preview.webp.asset.json';
import original1 from './assets/gallery/approved/box-ferragens.webp.asset.json';
import preview1 from './assets/gallery/approved/box-ferragens-preview.webp.asset.json';
import original2 from './assets/gallery/approved/box-nicho.webp.asset.json';
import preview2 from './assets/gallery/approved/box-nicho-preview.webp.asset.json';
import original3 from './assets/gallery/approved/portas-area-externa.webp.asset.json';
import preview3 from './assets/gallery/approved/portas-area-externa-preview.webp.asset.json';
import original4 from './assets/gallery/approved/porta-comercial.webp.asset.json';
import preview4 from './assets/gallery/approved/porta-comercial-preview.webp.asset.json';
import original5 from './assets/gallery/approved/guarda-corpo-sacada.webp.asset.json';
import preview5 from './assets/gallery/approved/guarda-corpo-sacada-preview.webp.asset.json';
import original6 from './assets/gallery/approved/fachada-envidracada.webp.asset.json';
import preview6 from './assets/gallery/approved/fachada-envidracada-preview.webp.asset.json';
import original7 from './assets/gallery/approved/fechamento-varanda.webp.asset.json';
import preview7 from './assets/gallery/approved/fechamento-varanda-preview.webp.asset.json';
import original8 from './assets/gallery/approved/espelho-sob-medida.webp.asset.json';
import preview8 from './assets/gallery/approved/espelho-sob-medida-preview.webp.asset.json';
import original9 from './assets/gallery/approved/guarda-corpo-escada.webp.asset.json';
import preview9 from './assets/gallery/approved/guarda-corpo-escada-preview.webp.asset.json';
import original10 from './assets/gallery/approved/photo-1.webp.asset.json';
import preview10 from './assets/gallery/approved/photo-1-preview.webp.asset.json';
import original11 from './assets/gallery/approved/photo-2.webp.asset.json';
import preview11 from './assets/gallery/approved/photo-2-preview.webp.asset.json';
import original12 from './assets/gallery/approved/photo-3.webp.asset.json';
import preview12 from './assets/gallery/approved/photo-3-preview.webp.asset.json';
import original13 from './assets/gallery/approved/photo-4.webp.asset.json';
import preview13 from './assets/gallery/approved/photo-4-preview.webp.asset.json';
import original14 from './assets/gallery/approved/photo-5.webp.asset.json';
import preview14 from './assets/gallery/approved/photo-5-preview.webp.asset.json';
import original15 from './assets/gallery/approved/photo-6.webp.asset.json';
import preview15 from './assets/gallery/approved/photo-6-preview.webp.asset.json';
import original16 from './assets/gallery/approved/photo-7.webp.asset.json';
import preview16 from './assets/gallery/approved/photo-7-preview.webp.asset.json';
import original17 from './assets/gallery/approved/photo-8.webp.asset.json';
import preview17 from './assets/gallery/approved/photo-8-preview.webp.asset.json';
import original18 from './assets/gallery/approved/photo-9.webp.asset.json';
import preview18 from './assets/gallery/approved/photo-9-preview.webp.asset.json';
import original19 from './assets/gallery/approved/photo-10.webp.asset.json';
import preview19 from './assets/gallery/approved/photo-10-preview.webp.asset.json';
import original20 from './assets/gallery/approved/photo-11.webp.asset.json';
import preview20 from './assets/gallery/approved/photo-11-preview.webp.asset.json';
import original21 from './assets/gallery/approved/photo-12.webp.asset.json';
import preview21 from './assets/gallery/approved/photo-12-preview.webp.asset.json';
import original22 from './assets/gallery/approved/photo-13.webp.asset.json';
import preview22 from './assets/gallery/approved/photo-13-preview.webp.asset.json';
import original23 from './assets/gallery/approved/photo-14.webp.asset.json';
import preview23 from './assets/gallery/approved/photo-14-preview.webp.asset.json';
import original24 from './assets/gallery/approved/photo-15.webp.asset.json';
import preview24 from './assets/gallery/approved/photo-15-preview.webp.asset.json';

export const galleryPreviews: Record<string, string> = {
  [original0.url]: preview0.url,
  [original1.url]: preview1.url,
  [original2.url]: preview2.url,
  [original3.url]: preview3.url,
  [original4.url]: preview4.url,
  [original5.url]: preview5.url,
  [original6.url]: preview6.url,
  [original7.url]: preview7.url,
  [original8.url]: preview8.url,
  [original9.url]: preview9.url,
  [original10.url]: preview10.url,
  [original11.url]: preview11.url,
  [original12.url]: preview12.url,
  [original13.url]: preview13.url,
  [original14.url]: preview14.url,
  [original15.url]: preview15.url,
  [original16.url]: preview16.url,
  [original17.url]: preview17.url,
  [original18.url]: preview18.url,
  [original19.url]: preview19.url,
  [original20.url]: preview20.url,
  [original21.url]: preview21.url,
  [original22.url]: preview22.url,
  [original23.url]: preview23.url,
  [original24.url]: preview24.url,
};

export function galleryPreviewUrl(original: string) {
  return galleryPreviews[original] ?? original;
}
