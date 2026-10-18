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
};

export function galleryPreviewUrl(original: string) {
  return galleryPreviews[original] ?? original;
}
