# Remix 5

Crie o site institucional (one-page, em português do Brasil) da R.N Vidraçaria, vidraçaria da Rita Nicoleti. Instagram: @r.n.vidros. WhatsApp: (19) 99167-3127 (link wa.me/5519991673127 com mensagem pré-preenchida: "Olá! Vim pelo site da R.N Vidraçaria e gostaria de um orçamento."). Stack: React + Tailwind. Não invente endereço, CNPJ, prêmios, depoimentos nem números. Todo conteúdo editável deve ficar centralizado em src/content.ts para eu trocar depois sem mexer nos componentes.



CONCEITO DE IDENTIDADE

O site inteiro é pensado como uma peça de vidro: transparência, a quina esverdeada do vidro, reflexo de luz e superfície jateada. Nada de visual genérico de template. O elemento memorável é o hero (painel de vidro com reflexo de luz). O resto fica silencioso e disciplinado.



PALETA (CSS variables)

- Branco gelo: #F6F8F7 (fundo claro)

- Preto: #000000 (seções escuras e texto principal)

- Verde-vidro: #6FA89B (acento principal: linhas finas, hover, foco)

- Névoa azulada: #D4E4E3 (superfícies de vidro jateado, bordas claras)

- Champagne: #B59F78 (detalhe mínimo, tipo ferragem/inox: um filete ou ícone, nunca grandes áreas)

Alterne seções claras e pretas. Sem gradientes coloridos decorativos.



TIPOGRAFIA

Títulos: "Bricolage Grotesque" (peso 600, tracking levemente negativo). Texto: "Hanken Grotesk". Escala tipográfica clara, linhas de texto com no máximo 70 caracteres. Sem textos em caixa alta espaçada acima de títulos, sem numeração 01/02/03, sem destacar só uma palavra do título em outra cor, sem seta "→" nos botões.



ESTRUTURA

1. Header: logo à esquerda (por enquanto monograma "RN" em texto, em um componente Logo isolado para eu trocar depois por PNG/SVG mudando só um caminho). Botão hambúrguer fixo no canto superior DIREITO (ícone de duas linhas finas que se cruzam e viram um X ao abrir). Ao abrir, menu em tela cheia de vidro jateado (backdrop-blur forte, fundo preto 70%) com os links: Serviços, Trabalhos, Sobre, Depoimentos (somente se showTestimonials for true), Contato. Animação de abertura suave (opacidade + leve deslizamento), fecha ao clicar num link ou ESC.



2. Hero: imagem de fundo em tela cheia (slot para foto de um trabalho, ex. sacada com vidro e vista) com overlay escuro. Enquanto não houver foto, usar placeholder de vidro jateado. Sobre ela, um painel de vidro (borda de 1px em verde-vidro com 40% de opacidade, backdrop-blur, sombra interna fina) contendo o título "Vidro bem instalado muda o ambiente.", um subtítulo curto ("Box, sacadas, portas, janelas e espelhos sob medida.") e dois botões: "Pedir orçamento" (WhatsApp) e "Ver trabalhos" (rola até a galeria). Um reflexo diagonal de luz atravessa o painel uma única vez ao carregar e acompanha levemente o movimento do mouse (desktop) ou do giroscópio (mobile). Respeitar prefers-reduced-motion.



3. Serviços: cards de vidro jateado (fundo névoa azulada 60%, borda fina de 1px, sombra suave em duas camadas, ícone de linha fina desenhado em SVG próprio, nada de emoji). Serviços: Box de banheiro, Fechamento de sacada e varanda, Portas e janelas de vidro, Espelhos, Divisórias e vidros para comércio, Manutenção e troca de vidros. Cada card tem título, 1 frase descritiva e link "Pedir orçamento deste serviço" que abre o WhatsApp com o nome do serviço na mensagem. Grid assimétrico no desktop (cards com tamanhos e hierarquia variados, não uma fileira de cards idênticos) e coluna única no mobile.



4. Trabalhos (galeria de produtos já feitos): seção em fundo preto. Grid em mosaico com filtros por categoria (Todos, Box, Sacadas, Portas e janelas, Espelhos, Comércio). Cada item abre um lightbox (pop-up) elegante com a foto grande, legenda, navegação por setas e swipe no mobile, fechar com X ou ESC. Usar 9 slots com placeholders neutros em vidro jateado. Todas as imagens ficam em um array em src/content.ts (src, alt, categoria, legenda) para eu só trocar os arquivos. Incluir um item "Antes e depois" com slider de comparação arrastável. Botão final: "Ver mais no Instagram" apontando para instagram.com/r.n.vidros.



5. Sobre: fundo claro. Duas colunas no desktop (foto da Rita ou de um trabalho + texto), coluna única no mobile. Texto curto e humano, na voz da empresa, sobre atendimento personalizado, medida certa e instalação cuidadosa, deixando o texto editável em src/content.ts para a história da Rita. Sem inventar anos de experiência nem quantidade de clientes.



6. Depoimentos: crie a seção completa (carrossel com swipe no mobile, citação grande, nome e tipo de serviço, sem estrelas genéricas), controlada pela flag showTestimonials em src/content.ts, com valor false. Enquanto for false, a seção e o link no menu não aparecem. Não inclua nenhum depoimento fictício; deixe a estrutura pronta para eu preencher depois com nome, serviço e texto reais.



7. Contato + Rodapé: fundo preto. Chamada "Fale com a Rita e receba seu orçamento" com botão do WhatsApp, link do Instagram e telefone (19) 99167-3127. Endereço, horário de atendimento e cidades atendidas são campos opcionais em src/content.ts: se estiverem vazios, o bloco não aparece (sem "em breve" nem lorem ipsum). Rodapé com monograma RN, links de navegação e "© R.N Vidraçaria".



8. Botão flutuante de WhatsApp fixo no canto inferior DIREITO (círculo de 56px, preto com borda fina verde-vidro, ícone de WhatsApp em branco, leve brilho no hover, sombra com profundidade). Respeitar safe-area do celular e não cobrir conteúdo importante.



DETALHES DE QUALIDADE

- Cards, botões e pop-ups: bordas de 1px, raios consistentes (12px cards, 999px botões), luz vinda do topo (highlight interno sutil), sombras em duas camadas, textura sutil de ruído/jateado (SVG noise com 4% de opacidade). Hover apenas em elementos clicáveis, transição de 200ms.

- Responsivo de verdade: mobile-first, testado em 360px, 768px, 1280px e 1920px. Alvos de toque de no mínimo 44px.

- Acessibilidade: contraste AA, foco visível em verde-vidro, alt nas imagens, aria-labels no hambúrguer e no WhatsApp, navegação por teclado no menu e no lightbox.

- Performance: imagens com lazy loading e dimensões definidas, fontes com display swap.

- SEO: title "R.N Vidraçaria | Box, sacadas, portas e espelhos sob medida", meta description, Open Graph e dados estruturados LocalBusiness (sem endereço até eu informar). Não referenciar domínio próprio; usar caminhos relativos.

- Animação: apenas uma sequência orquestrada na entrada do hero, mais as transições de abrir menu, lightbox e slider. Não usar fade-in em todas as seções.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/82ff4474-3b68-403c-9c25-d726248dcb89).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
