# Arte e animação — revisão de 28/09/2026

As quatro referências de personagem foram fornecidas pelo usuário: sobretudo preto com óculos, armadura marrom com espadas, cowboy e camiseta preta com jeans. Foram usadas como referência visual, preservando cabelo, rosto e roupas.

## Arquivos entregues

- `public/assets/art/player-poses.png`: atlas RGBA, 1448×1086, oito poses por roupa, quatro roupas.
- `public/assets/art/environments.png`: atlas RGB, 1536×1024, quatro cenários em grade 2×2.
- `src/core/visualAssets.ts`: recortes e alinhamento dos pés no Pixi, sem reescrever os PNGs.
- `src/data/themes.ts`: associação entre capítulos, roupas e cenários.

Ferramenta: ImageGen integrado ao Codex; não foi usada a CLI. Os arquivos gerados foram copiados sem edição raster posterior. Os tamanhos efetivos diferem dos tamanhos solicitados nos prompts.

## Prompts de geração

### Personagens

Create a production-ready transparent pixel-art character animation spritesheet from these FOUR supplied character reference images. This is a single precisely aligned sprite atlas, NO scenery, NO black background, NO glows, NO labels, NO grid lines. True alpha transparent canvas. Preserve the same man's face, dark short curly hair, mustache/goatee and each outfit exactly, with crisp coherent detailed pixel-art. Canvas requested 2048 x 1536. EXACT grid 8 equal columns x 4 equal rows. Each cell 256x384, feet baseline at 350 pixels within every cell, horizontal center at128. Entire silhouette stays inside cell with at least12px empty margin. Each row is one outfit: ROW1 black cyberpunk long coat and sunglasses reference1; ROW2 brown monster-hunter armor and two sheathed swords reference2; ROW3 western hat cream shirt dark vest reference3; ROW4 black T-shirt blue jeans reference4. All characters face RIGHT, full body, same scale and same anatomical proportions as supplied. Columns for EVERY row in exact sequence: 1 relaxed idle pose; 2 walking contact left leg forward; 3 walking passing pose; 4 walking contact right leg forward; 5 jumping with knees slightly bent; 6 strong right-facing straight jab (free hands, weapons stay sheathed); 7 powerful right-facing Muay Thai roundhouse kick; 8 raised-knee Muay Thai strike with high guard. Movement poses should be natural and distinct. Preserve character identity and finely shaded cloth/armor from references. Sprite sheet only, 32 isolated full-body sprites, regular grid, actual transparency.

### Cenários

Use case: stylized-concept. Asset type: environment atlas for a detailed pixel art side-scrolling action adventure game, original artwork. Create ONE image containing EXACTLY FOUR equal rectangular environment backgrounds in a strict 2 by 2 grid, no gaps, no borders, no labels, no UI, no text, NO characters. Requested canvas 3072x2048 (each quadrant 1536x1024). Each quadrant a complete side view game environment with camera looking horizontally, no isometric perspective. The bottom 18 percent of each quadrant is a clean, continuous horizontal walkable ground plane with its top at the SAME height. Leave the middle open for the playable character. Rich 32-bit pixel art with deliberately crisp pixels, cinematic depth layers, nuanced light and handmade environmental details, no blurry painting. TOP LEFT: rainy midnight cyberpunk city rooftop, emerald digital light, layered skyscrapers with windows and antennas, power cables, air conditioner vents on rooftops, luminous distant haze, deep nearly black greens, horizontal roof ground. TOP RIGHT: monster-hunter forest ruins at twilight, huge layered pines, weathered stone arches, hanging ivy, lanterns, mossy stone ground; teal woodland shadows and amber lanterns. BOTTOM LEFT: western campsite at night in pine mountains, canvas tents at the edges, wagon silhouettes, small orange campfire near center-right, atmospheric blue night sky and amber firelight, flat dirt ground. BOTTOM RIGHT: mountain martial arts training courtyard at dawn, distant rocky peaks, warm orange sky, cherry blossom trees at far edges, simple wooden training posts, tiled temple silhouettes, flat stone courtyard ground. Original environments, no recognizable franchise emblems or characters. Scene art only, absolutely no typography or interface.

## Limites da primeira passagem

A caminhada combina três poses; salto, jab, chute e joelhada têm poses próprias. Corrida reutiliza caminhada; cotovelada reutiliza jab; defesa reutiliza guarda da joelhada. Ainda não há sequências completas de antecipação, contato e recuperação desenhadas individualmente. Há pequenas inconsistências entre poses geradas. O manifesto permite substituir o avatar por um atlas revisado manualmente. Os fundos usam paralaxe suave; elementos de colisão e interação são desenhados separadamente.
