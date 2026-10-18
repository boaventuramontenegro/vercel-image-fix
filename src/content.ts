export type Category = string;
export type Work = { src: string; alt: string; categoria: Category; legenda: string; comparison?: { beforeSrc: string; afterSrc: string } };
export type Testimonial = { name: string; text: string; service?: string; source?: string };

import logoSrc from './assets/logo-branca.png';
import heroImage from './assets/hero.jpg'; // SUBSTITUIR PELA FOTO REAL
import sobreImage from './assets/rita-nicoleti.webp.asset.json';
import skylightArtwork from './assets/icone-claraboia-trim.png';
import maintenanceArtwork from './assets/icone-manutencao-trim.png';
import mirrorBathroom from './assets/gallery/approved/espelho-banheiro.webp.asset.json';
import showerHardware from './assets/gallery/approved/box-ferragens.webp.asset.json';
import showerNiche from './assets/gallery/approved/box-nicho.webp.asset.json';
import slidingDoor from './assets/gallery/approved/portas-area-externa.webp.asset.json';
import commercialDoor from './assets/gallery/approved/porta-comercial.webp.asset.json';
import balconyRailing from './assets/gallery/approved/guarda-corpo-sacada.webp.asset.json';
import glassFacade from './assets/gallery/approved/fachada-envidracada.webp.asset.json';
import veranda from './assets/gallery/approved/fechamento-varanda.webp.asset.json';
import mirror from './assets/gallery/approved/espelho-sob-medida.webp.asset.json';
import stairRailing from './assets/gallery/approved/guarda-corpo-escada.webp.asset.json';

export const content = {
  brand: { name: 'R.N Vidraçaria', owner: 'Rita Nicoleti', logoSrc: logoSrc, logoAlt: 'R.N Vidraçaria', signature: 'Vidros sob medida', copyright: 'R.N Vidraçaria. Todos os direitos reservados.' },
  contact: {
    phone: '(19) 99167-3123', whatsappNumber: '5519991673123',
    message: 'Olá! Gostaria de solicitar um orçamento e saber mais sobre os serviços de vocês. Poderiam me ajudar?',
    serviceMessage: 'Olá! Tenho interesse no serviço de {service} e gostaria de solicitar um orçamento. Poderiam me passar mais informações?',
    instagram: '@r.n.vidros', instagramUrl: 'https://instagram.com/r.n.vidros',
    // SEM ATENDIMENTO POR E-MAIL: campo removido a pedido do proprietário
    address: 'Rua Valeriano Antonio Benato, 120 - Dois Córregos, Piracicaba - SP, 13420-838',
    mapsPlaceId: '17307641232484132283',
    mapsLink: 'https://maps.app.goo.gl/1o7CuiF6ZYuy4zes5',
    mapTitle: 'Localização da R.N Vidraçaria',
    addressFallback: 'Piracicaba, SP',
    mapsOpen: 'Abrir no Google Maps',
    mapsUnavailable: 'Ver localização no Google Maps',
    hours: '', cities: '',
     // HORÁRIO DE EXEMPLO, SUBSTITUIR PELO REAL
     openingHours: 'Seg a Sex: 8h às 18h | Sáb: 8h às 12h',
    formTitle: 'Peça seu orçamento',
    addressLabel: 'Endereço', hoursLabel: 'Atendimento', citiesLabel: 'Cidades atendidas',
  },
  seo: { title: 'R.N Vidraçaria em Piracicaba | Box, portas, janelas e espelhos sob medida', description: 'Vidraçaria em Piracicaba, SP. Box de banheiro, portas e janelas de vidro, sacadas, espelhos e vidros sob medida. Peça seu orçamento pelo WhatsApp.', city: 'Piracicaba', region: 'SP', country: 'BR' },
  visual: { accentPhrases: ['muda o ambiente', 'cada espaço', 'nos detalhes', 'nossos clientes', 'frequentes', 'orçamento'] },
  nav: [ { id: 'inicio', label: 'Início' }, { id: 'sobre', label: 'Sobre' }, { id: 'servicos', label: 'Serviços' }, { id: 'galeria', label: 'Galeria' }, { id: 'depoimentos', label: 'Depoimentos' }, { id: 'contato', label: 'Contato' } ],
  hero: {
    // heroImage — SUBSTITUIR PELA FOTO REAL: troque imageSrc por um import em src/assets quando enviar a foto de um trabalho (ex. sacada com vidro e vista)
    imageSrc: heroImage as string, imageAlt: 'Sacada de apartamento com fechamento em vidro incolor e vista aberta',
    title: 'Vidro bem instalado muda o ambiente.', subtitle: 'Box, sacadas, portas, janelas e espelhos sob medida.', detail: 'Transparência em cada detalhe.', scrollLabel: 'Conheça nossos serviços' },
  actions: {
    quote: 'Pedir orçamento', work: 'Ver galeria', serviceQuote: 'Pedir orçamento deste serviço', instagram: 'Ver mais no Instagram', instagramLabel: 'Instagram',
    submit: 'Enviar pelo WhatsApp', whatsappLabel: 'Conversar com Rita pelo WhatsApp', openMenu: 'Abrir menu', closeMenu: 'Fechar menu',
    close: 'Fechar foto', previous: 'Foto anterior', next: 'Próxima foto', openPhoto: 'Abrir foto', before: 'Antes', after: 'Depois',
    comparison: 'Arraste para comparar antes e depois', backToTop: 'Voltar ao topo',
    nextTestimonial: 'Próximo depoimento', previousTestimonial: 'Depoimento anterior', finishServices: 'Concluir' },
  form: {
    greeting: 'Olá! Me chamo {name} e gostaria de um orçamento.',
    nameLabel: 'Nome', namePlaceholder: 'Seu nome', serviceLabel: 'Serviço', servicePlaceholder: 'Escolha um ou mais serviços', serviceError: 'Escolha pelo menos um serviço.', messageServicesLabel: 'Serviço', messagePlaceLabel: 'Cidade e bairro', messageMeasuresLabel: 'Medidas aproximadas', messageDetailsLabel: 'Detalhes',
    placeLabel: 'Cidade e bairro', placePlaceholder: 'Ex.: Campinas, Centro', measuresLabel: 'Medidas aproximadas', measuresPlaceholder: 'Largura × altura, em cm', measuresHint: 'Escolha os serviços para informar as medidas de cada um.',
    detailsLabel: 'Detalhes do que você precisa', detailsPlaceholder: 'Descreva o que você imagina para o seu espaço',
    notInformed: 'não informei' },
  servicesTitle: 'Uma solução para cada espaço.',
  serviceArtwork: { skylight: skylightArtwork, maintenance: maintenanceArtwork },
  faq: {
    title: 'Perguntas frequentes',
    items: [
      { question: 'Quais serviços de vidraçaria vocês oferecem?', answer: 'São oferecidos serviços de instalação e substituição de vidros, projetos sob medida, espelhos personalizados, fechamentos de sacadas e varandas, claraboias e outros serviços relacionados à vidraçaria. Cada solicitação é avaliada de acordo com as necessidades do projeto.' },
      { question: 'Como posso solicitar um orçamento?', answer: 'Entre em contato pelo WhatsApp e explique qual serviço você deseja realizar. Se possível, envie fotos do local, as medidas aproximadas e os detalhes do projeto. Essas informações ajudam a entender sua necessidade e a orientar a elaboração do orçamento.' },
      { question: 'Como funciona a instalação de vidros sob medida?', answer: 'A instalação de vidros sob medida é planejada de acordo com as dimensões, as características do ambiente e a finalidade do vidro. Cada projeto precisa ser avaliado para definir a solução mais adequada, considerando o espaço disponível e o resultado desejado.' },
      { question: 'Quais são as opções de fechamento de sacadas e varandas?', answer: 'As opções de fechamento variam conforme o espaço, a estrutura existente e o resultado desejado. Para entender qual solução pode atender melhor às suas necessidades, envie fotos da sacada ou varanda e descreva o que pretende fazer. A viabilidade e as opções adequadas deverão ser confirmadas durante o atendimento.' },
      { question: 'Como funcionam a instalação e a manutenção de claraboias?', answer: 'A instalação ou manutenção de uma claraboia depende do tipo de estrutura, das condições do local e do serviço necessário. Informe o que precisa ser feito e, se possível, envie fotos para facilitar a avaliação inicial. Os detalhes do serviço deverão ser confirmados durante o atendimento.' },
      { question: 'Quais espelhos podem ser feitos sob medida?', answer: 'Os espelhos sob medida podem ser planejados de acordo com as dimensões e a finalidade do ambiente. Para consultar as possibilidades, informe o local de instalação, as medidas aproximadas e o formato desejado. As opções disponíveis serão confirmadas durante o atendimento.' },
      { question: 'Como funciona a manutenção e a troca de vidros?', answer: 'O procedimento depende do tipo de vidro, das condições em que ele se encontra e da necessidade de reparo ou substituição. Entre em contato explicando o problema e, se possível, envie fotos do vidro e do local. Assim, será possível compreender melhor a situação e orientar os próximos passos.' },
      { question: 'Quais informações devo enviar para pedir um orçamento?', answer: 'Informe qual serviço deseja realizar, o local de instalação e as dimensões aproximadas, se disponíveis. Fotografias do ambiente e referências do resultado desejado também podem ajudar. Caso ainda não tenha todas essas informações, explique sua ideia para receber orientações sobre como prosseguir.' },
      { question: 'Como funciona o atendimento?', answer: 'O atendimento pode ser realizado por ligação telefônica ou WhatsApp, conforme a preferência e a disponibilidade de Rita e do cliente. Durante a conversa, é possível explicar a ideia, esclarecer dúvidas e discutir os detalhes do projeto. Quando necessário e combinado com o cliente, Rita também pode ir até o local para conhecer o espaço e compreender melhor o que será realizado.' },
      { question: 'Como entrar em contato com a R.N Vidraçaria?', answer: 'Você pode entrar em contato pelo WhatsApp, enviar sua dúvida e explicar qual serviço procura. Se já tiver fotos, medidas ou referências do projeto, poderá compartilhá-las para facilitar o atendimento.' },
      { question: 'Qual é o endereço e onde o atendimento é realizado?', answer: 'Rita Nicoletti trabalha em casa, no endereço Rua Valeriano Antonio Benato, 120 - Dois Córregos, Piracicaba - SP, 13420-838. O atendimento acontece principalmente por ligação telefônica ou WhatsApp, de acordo com a preferência e a disponibilidade de ambos. Não é necessário que o cliente vá até a residência. Se o projeto exigir uma avaliação mais prática do espaço, Rita poderá combinar com o cliente uma visita ao local.' },
    ],
  },
  servicesDescription: 'Da medida ao acabamento, cuidado em cada etapa para o vidro fazer parte do seu ambiente.',
  services: [
    { title: 'Box de banheiro', description: 'Box em vidro temperado sob medida, com portas de correr e de abrir.', icon: 'box' },
    { title: 'Portas de vidro', description: 'Instalação e reparo de portas de vidro, incluindo portas de correr.', icon: 'door' },
    { title: 'Janelas de vidro', description: 'Instalação e reparo de janelas de vidro.', icon: 'window' },
    { title: 'Fechamento de sacada e varanda', description: 'Envidraçamento com vidro incolor para sacadas e varandas.', icon: 'balcony' },
    { title: 'Espelhos', description: 'Espelhos sob medida para banheiros, salas, quartos e comércio.', icon: 'mirror' },
    { title: 'Divisórias e vidros para comércio', description: 'Divisórias, portas e vitrines em vidro para o seu negócio.', icon: 'commerce' },
    { title: 'Claraboias', description: 'Instalação de claraboias e aberturas de vidro para entrada de luz natural.', icon: 'skylight' },
    { title: 'Vidros sob medida', description: 'Dimensionamento e instalação de vidros para o que você precisa.', icon: 'custom' },
    { title: 'Manutenção e troca de vidros', description: 'Troca, reparo e ajuste de vidros e ferragens.', icon: 'maintenance' },
  ],
  gallery: {
    title: 'O cuidado aparece nos detalhes.', description: 'Box, sacadas, espelhos e muito mais. Cada projeto, uma nova perspectiva.',
    categories: ['Todos', 'Box', 'Sacadas', 'Portas e janelas', 'Espelhos', 'Guarda-corpos', 'Fachadas'] as Category[],
    placeholder: 'Espaço reservado para foto', empty: 'Em breve, novos trabalhos nesta categoria.', countSeparator: 'de',
    works: [
      { src: mirrorBathroom.url, alt: 'Espelho sob medida para banheiro', legenda: 'Espelho sob medida para banheiro', categoria: 'Espelhos' },
      { src: showerHardware.url, alt: 'Box de banheiro em vidro transparente', legenda: 'Box de banheiro em vidro transparente', categoria: 'Box' },
      { src: showerNiche.url, alt: 'Box de banheiro com porta de vidro', legenda: 'Box de banheiro com porta de vidro', categoria: 'Box' },
      { src: slidingDoor.url, alt: 'Portas de correr de vidro', legenda: 'Portas de correr de vidro', categoria: 'Portas e janelas' },
      { src: commercialDoor.url, alt: 'Porta de vidro para comércio', legenda: 'Porta de vidro para comércio', categoria: 'Portas e janelas' },
      { src: balconyRailing.url, alt: 'Guarda-corpo de vidro para sacada', legenda: 'Guarda-corpo de vidro para sacada', categoria: 'Guarda-corpos' },
      { src: glassFacade.url, alt: 'Fachada comercial envidraçada', legenda: 'Fachada comercial envidraçada', categoria: 'Fachadas' },
      { src: veranda.url, alt: 'Fechamento de varanda em vidro', legenda: 'Fechamento de varanda em vidro', categoria: 'Sacadas' },
      { src: mirror.url, alt: 'Espelho sob medida', legenda: 'Espelho sob medida', categoria: 'Espelhos' },
      { src: stairRailing.url, alt: 'Guarda-corpo de vidro para escada', legenda: 'Guarda-corpo de vidro para escada', categoria: 'Guarda-corpos' },
    ] as Work[],
  },
  aboutImage: sobreImage.url,
  about: { imageAlt: 'Rita Nicoleti', paragraphs: ['Rita Nicoleti atende Piracicaba com vidro sob medida para casas, apartamentos e comércios: box de banheiro, fechamento de sacadas e varandas, portas e janelas de vidro, espelhos e claraboias.', 'O trabalho começa no dimensionamento do vidro e segue até a instalação, com a escolha do modelo e do acabamento que combinam com o espaço. Também faz reparo e troca em portas, janelas e vidros já instalados.'] },
  showTestimonials: true,
  testimonialsTitle: 'O que dizem nossos clientes',
  testimonials: [
    { name: 'Roseli Machi', text: 'O trabalho foi feito no prazo,e ficou maravilhoso super indico RN vidraçaria' },
    { name: 'Brumate', text: 'Profissionais de confiança atencioso, indico o trabalho' },
    { name: 'Itamara Rissardi Xavier', text: 'Excelente atendimento do início ao fim.\nMelhor vidraçaria de Piracicaba.\nTop 10' },
    { name: 'Denilson Vilasboa', text: 'Super indico comprei um box instalação rápida atendimento super bem' },
  ] as Testimonial[],
};

export function whatsappUrl(message?: string) {
  return `https://wa.me/${content.contact.whatsappNumber}?text=${encodeURIComponent(message ?? content.contact.message)}`;
}

export function serviceQuoteMessage(service: string) {
  return content.contact.serviceMessage.replace('{service}', service);
}

export function quoteFormMessage({ name, services, place, measures, details }: { name: string; services: string[]; place: string; measures: Record<string, string>; details: string }) {
  const f = content.form;
  const filledMeasures = services.flatMap(service => {
    const value = measures[service]?.trim();
    return value ? [`- ${service}: ${value}`] : [];
  });
  const fields = [`${f.messageServicesLabel}: ${services.join(', ')}`, `${f.messagePlaceLabel}: ${place.trim()}`];
  if (filledMeasures.length) fields.push(`${f.messageMeasuresLabel}:\n${filledMeasures.join('\n')}`);
  return [f.greeting.replace('{name}', name.trim()), fields.join('\n'), ...(details.trim() ? [`${f.messageDetailsLabel}: ${details.trim()}`] : [])].join('\n\n');
}
