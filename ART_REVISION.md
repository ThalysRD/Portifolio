# Revisão: caminhada, rostos e campus

ImageGen integrado, sem CLI. Somente o personagem de sobretudo usa óculos escuros. O atlas de poses corrigido substitui `public/assets/art/player-poses.png`.

A cadência de caminhada agora depende da distância percorrida (132 pixels por ciclo), com parada nas bordas e espelhamento à esquerda. Os quadros mantêm uma escala visual comum mesmo quando vêm de folhas com resoluções diferentes.

## Arquivos

- `public/assets/art/player-poses.png`: poses com os óculos corrigidos.
- `public/assets/art/ifrn-campus.png`: campus ilustrado.

## Prompts

### Correção de óculos
Edit this exact transparent sprite atlas. Change ONLY the eyes/eyewear in rows 2, 3 and 4: REMOVE ALL SUNGLASSES from EVERY character in those three rows, including jumping, jab, kick and knee poses. Show the same natural brown eyes and eyebrows as the idle character in each of those rows. Row 1 black long coat character MUST KEEP sunglasses in every frame. Preserve exactly the original pixel art, identity, outfits, all poses, positions, scale, feet baselines, row spacing, column spacing and transparent background. Canvas must remain 1448x1086, no repositioning, no new frames, no cropping. This is a precise eyewear consistency correction only. Check each of the 24 faces in rows 2-4 individually: no sunglasses, no dark eye band, visible natural eyes. Absolutely no other changes.

### Transições de caminhada
Create a supplementary transparent pixel-art sprite sheet using the supplied character atlas as reference for identity and style. EXACTLY 4 columns and 4 rows. All 16 characters face right in side view. These are ONLY the NARROW-STANCE transitional poses MISSING between long strides. DO NOT draw spread-legged contact poses. In ALL frames, the knees are close together horizontally, feet under the torso. Row1 long black coat sunglasses; row2 brown sword armor NO GLASSES; row3 cowboy hat cream shirt NO GLASSES; row4 black T-shirt blue jeans NO GLASSES. Four columns per row: (1) DOWN pose, supporting LEFT leg bent, trailing RIGHT foot just lifting behind heel, compact stance; (2) PASSING pose, supporting LEFT leg straight vertical, RIGHT knee raised and bent 90 degrees in front, RIGHT foot tucked directly under hips about20px off floor; (3) DOWN pose, supporting RIGHT leg bent, trailing LEFT foot just lifting behind heel; (4) PASSING pose, supporting RIGHT leg straight vertical, LEFT knee raised and bent90degrees in front, LEFT foot tucked directly under hips20px off floor. Profile view, full-body, arms swing opposite legs, same head and torso scale, same clothing details. No running, no jumping, one planted foot touches floor in EVERY frame. Natural subtle walk cycle transition. Fixed grid1024x1536: cells256x384; full body320pixels tall each, feet baseline360, hip atcenterx128. Entire silhouette inside each cell, generous transparent gaps between figures. Crisp pixel art, TRUE ALPHA transparent, NO labels, no lines, no ground shadows. This sheet is specifically for NARROW steps with overlapping legs, NOT any wide stride. Do not copy poses from reference; keep character appearance only.

### Recorte transparente das transições
undefined

### Campus
undefined

Referência institucional: [Portal do IFRN](https://portal.ifrn.edu.br/). O campus ilustrado é uma interpretação para o jogo, sem pretensão de reproduzir uma unidade específica.


## Estado ao discutir a nova direção

Óculos corrigidos e campus IFRN integrado. A animação passou a acompanhar a distância percorrida, mas ainda usa a sequência antiga de quatro quadros. As novas transições foram geradas com fundo indevido; as tentativas de extração ficaram sem resposta e foram interrompidas. Não foram integradas. O ciclo completo de oito quadros permanece pendente. A discussão de direção está em `DIRECAO_NARRATIVA.md`; nenhum redesenho da narrativa foi implementado ainda.
