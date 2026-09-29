# Thalys Rodrigues — linha do tempo interativa

Portfólio em PixiJS, TypeScript e Vite. Um personagem caminha por dez memórias: Trybe, IFRN, EmbarcaTech, parceria com a doisA Engenharia, LAICA, SECITEX, publicação, E-Play, Zé Resolve e próximos passos. Notas abrem textos e fotografias reais. Não há combate, chefes, pontuação de habilidades ou desbloqueio obrigatório na experiência atual.

## Executar

Node22.12+ e npm: `npm install`, `npm run dev`. Alternativamente use pnpm com o lockfile incluído. O predev prepara o Pixi para desenvolvimento. Prévia local: http://127.0.0.1:5173/.

Produção: `npm run build` (verificação TypeScript e Vite). Hospede `dist/` por HTTP. `npm run preview` abre o build local. Configurações de Netlify e Vercel incluídas. Caminhos relativos permitem publicação em subpasta. Nenhum deploy externo foi realizado.

## Interagir

- Setas ou A/D: caminhar; E: abrir a nota próxima.
- Clicar numa nota: caminhar até ela e abrir a informação ao chegar.
- Botões inferiores da linha do tempo: acesso direto a qualquer memória.
- Celular: segurar as setas na tela e tocar em “Abrir memória”.
- Esc: fechar a leitura; personagem pausa durante a leitura.
- Versão em texto: conteúdo completo sem necessidade de jogar, também pré-renderizado para acesso sem JavaScript.

## Conteúdo e confiabilidade

Editar `src/data/timeline.ts`. Todos os marcos têm textos PT/EN, imagens opcionais e links. As fotos originais ficam em `public/assets/trajectory`. Não há links inventados. E-mail veio do currículo; GitHub e E-Play foram fornecidos pelo usuário. Conclusão2027.1 confirmada pelo usuário apesar da data2028.1 no currículo original. Histórico acadêmico não foi copiado para o site.

Datas exatas dos eventos de parceria e LAICA não foram informadas; ambos usam “Durante a residência”. Ordem desses registros é narrativa, não uma alegação de ordem cronológica entre os dois eventos. O conteúdo distingue residência acadêmica, contribuição individual e resultados do projeto em equipe. Consulte `FONTES.md`.

## Implementação

`src/main.ts`: caminhada, câmera, notas, diálogos, controles e idioma. `src/entities/Character.ts`: animação proporcional à distância percorrida. `src/style.css`: interface responsiva. `src/core/visualAssets.ts`: recortes dos atlas. `vite.config.mjs`: pré-renderiza a versão em texto a partir dos mesmos dados. Arquivos do protótipo anterior foram preservados, mas sua cena e seus projetos fictícios não são importados pelo aplicativo atual.

A animação Matrix atual usa sprites de corpo inteiro, criados com ImageGen a partir da referência do usuário: `matrix-idle-v4.png` (16 quadros), `matrix-gesture-v4.png` (8 quadros de ajuste dos óculos) e os dois atlas de caminhada v5 (`matrix-walk-keys-v5.png` e `matrix-walk-between-v5.png`), em `public/assets/art`. A caminhada combina oito poses-chave e sete intermediárias desenhadas, com uma breve sustentação na inversão do braço: 16 posições de reprodução. Um intermediário que elevava o pé antes da hora foi descartado da reprodução. O primeiro passo começa com a mão próxima à lateral do corpo. `src/core/matrixSprites.ts` recorta os quadros e alinha escala, cabeça e base. O idle respira lentamente e, depois de 8 segundos parado, faz o gesto dos óculos. Movimento interrompe o gesto; abrir uma nota pausa toda a animação; movimento reduzido fixa o primeiro quadro. A velocidade de deslocamento é de 160 pixels/s.

Progresso e idioma são salvos em localStorage sob `thalys-timeline-v2`; falhas de armazenamento não impedem a visita. Nenhuma foto ou dado é enviado a servidor. Fotos abrem em tamanho original ao clicar. Diálogos mantêm foco, suportam Esc e têm botões claros de retorno. Efeitos respeitam movimento reduzido. Fontes do sistema e imagens locais; nenhuma chave ou conta necessária.

## Validação

Consulte `TESTING.md`. Testes em Chrome automatizado com renderização por software não substituem teste em um celular físico nem representam benchmark de GPU.

## Certificados

Doze documentos ficam em `public/assets/certificates`, vinculados por `src/data/certificates.ts`. Cinco são cópias públicas de consulta com CPF e informações privadas ocultos. Na declaração da residência, a página de auditoria e o trecho financeiro foram omitidos. Originais fornecidos permanecem intactos fora da pasta do site. As cópias são identificadas como cópias, não substituem os originais para validação formal. A declaração1040h e o certificado FIC240h são apresentados separadamente, sem somar suas cargas.

Habilidades organizadas por área e contexto em `src/data/timelineSkills.ts`, com formação, aplicação em projetos e disciplinas em andamento identificadas. O último capítulo e o contato comunicam abertura a oportunidades e a aprender habilidades exigidas pela vaga.
