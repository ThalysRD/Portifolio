# Validação da linha do tempo

## Caminhada v5

Revisão concentrada nos braços, conforme pedido do usuário. Novos sprites completos com arco do braço, intermediários desenhados e uma sustentação curta na inversão; nenhuma articulação por partes. Inspeção da sequência identificou um intermediário com elevação prematura do pé, excluído da reprodução. Testados: caminhada nos dois sentidos, início na pose de passagem, 16 posições de reprodução, fechamento do ciclo, imobilidade sem deslocamento e interrupção do gesto de óculos. Sem erros de JavaScript; build aprovado. A referência a Street Fighter II Turbo orienta o estilo desejado, sem afirmar equivalência à animação do jogo.

## Revisão vigente: sprites de corpo inteiro v4

O vídeo enviado pelo usuário foi examinado em quatro momentos e motivou a substituição da articulação por sprites completos. Foram inspecionados o repouso com pernas retas, o gesto dos óculos e as transições de tamanho no jogo. Teste da implementação atual: 16 quadros de repouso, 8 de gesto e 16 de caminhada; todos os recortes dentro dos atlas; pausa sem avanço; gesto após espera; retorno ao repouso; interrupção imediata por movimento; movimento reduzido sem gesto. Build TypeScript/Vite aprovado. As verificações de v2 e v3 abaixo são históricas e não descrevem a arte ativa.

Executada em28/09/2026, em Chrome automatizado com WebGL por software. Build de produção aprovado com TypeScript estrito e Vite.

## Fluxos verificados

- Dez notas: Trybe, IFRN, EmbarcaTech, E-Play, SECITEX, parceria, LAICA, publicação, Zé Resolve e próximos passos.
- Clique em nota distante movimenta o personagem e abre a informação ao chegar; avanço maior que400px verificado no build.
- E abre nota próxima, Esc fecha; movimento bloqueado durante a leitura; foco permanece no diálogo ao navegar por Tab.
- Navegação direta pelos dez marcos e retorno à caminhada.
- Dez memórias abertas persistem após recarregar.
- PT/EN, versão em texto e acesso direto ao hash traditional, incluindo recarregamento.
- Celular390×844: setas movem o personagem, sem rolagem horizontal da página. A régua inferior tem rolagem própria intencional.
- LocalStorage bloqueado: caminhada continua disponível.
- HTML sem JavaScript contém os dez marcos e os certificados; verificado no build servido por HTTP.
- Doze links de PDF retornam200 e conteúdo começando por%PDF.
- E-Play identificado como projeto didático do terceiro semestre; IFRN com previsão2027.1.
- Sem erros de JavaScript nas sessões verificadas.

## Certificados

Doze documentos conferidos. Cinco cópias públicas editadas foram renderizadas novamente e inspecionadas visualmente. CPFs não estão na camada textual dos PDFs públicos. Nas cinco cópias, os pixels sensíveis foram removidos antes da criação do PDF, sem texto/arquivos originais embutidos. Página de auditoria da declaração não publicada. Original de todos os documentos preservado fora de public/dist. Histórico acadêmico não publicado.

## Limites

Nenhum teste em celular físico ou benchmark de GPU. O repositório E-Play não foi auditado: a contribuição descrita vem do currículo e do relato. Prévia local e build estão prontos; nenhum deploy externo realizado.

## Atualização de 29/09/2026

Tema Matrix e atlas do personagem de sobretudo aplicados. Build aprovado; fluxos de caminhada, dez notas, PT/EN, pausa, controles móveis, persistência, versão sem JavaScript e doze PDFs revalidados sem erros. Quatro grupos de habilidades da Trybe e mensagens de abertura a oportunidades verificados. Capturas desktop e mobile inspecionadas; diálogo de habilidades sem overflow horizontal a 390 px.

O atlas Matrix v2 foi carregado com sucesso, com 16 quadros de idle e 16 de caminhada. A resposta HTTP do novo asset foi 200, a cena criou o canvas normalmente e não houve erros de JavaScript durante uma caminhada automatizada.

Essa checagem da v2 não verificava a qualidade do ciclo e não detectou a repetição da mesma passada. A v2 foi substituída pela animação articulada v3, conforme `ART_MATRIX_V3.md`. Agora foram verificados 24 quadros visualmente distintos (comparação dos pixels), duas pernas em fases opostas, passagem com elevação do pé, imobilidade na pausa, idle com movimento reduzido e caminhada por teclado. Também foram repetidos os fluxos de dez notas, celular, idiomas, versão em texto e os doze links de certificados: todos aprovados sem erros de JavaScript.
