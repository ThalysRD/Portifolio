# Proposta: uma trajetória que se pode explorar

Status: proposta de direção, ainda não implementada no jogo. A versão atual permanece disponível para comparação. Base: trajetória fornecida pelo usuário em 28/09/2026 e artigo da Revista FT.

## Mensagem principal

Desenvolvedor em formação, com foco em Backend e Full Stack, que conecta aprendizado a projetos aplicados e está buscando uma oportunidade para transformar essa experiência em carreira.

## Experiência proposta

Um passeio curto por espaços conectados: mesa de estudos, campus do IFRN, laboratório do EmbarcaTech e bancada de projetos atuais. Avatar casual como personagem principal; clique ou toque para caminhar/interagir, teclado opcional. Cada parada apresenta uma ação com resposta visível e três informações: problema, contribuição pessoal, evidência. Meta de projeto: percurso guiado opcional de aproximadamente três minutos; acesso direto a qualquer projeto, currículo e contato desde a entrada. A duração precisa ser validada com pessoas, não é uma medição existente.

### 1. Mesa de estudos — Trybe, 2022

Formação prática de aproximadamente1.500 horas em Desenvolvimento Web, conforme relato do usuário. Um computador mostra uma pequena interface que ganha comportamento quando o visitante aciona um controle. Representa o primeiro contato com transformar ideias em aplicações. JavaScript, React, Node.js, SQL e MongoDB aparecem vinculados ao aprendizado, sem percentuais de domínio.

### 2. Campus — IFRN, desde2024

Tecnologia em Sistemas para Internet, 5º período informado pelo usuário, conclusão prevista2027.1. Campus ilustrado como cenário principal e ponto de acesso às outras paradas. Não representar um campus específico sem referência. Não afirmar trabalho profissional remunerado a partir da graduação ou residência.

### 3. Laboratório — EmbarcaTech,2025–2026

Destaque principal. Demonstração didática do fluxo RFID → ESP32 → armazenamento local → API → PostgreSQL. Um botão simula uma leitura. Ao desligar a conexão simulada, novas leituras continuam na fila local. Ao restabelecer a conexão, os registros pendentes chegam ao servidor. Exibir estado pendente/sincronizado, sem fazer o usuário resolver um quiz nem escrever código.

A simulação do portfólio deve estar identificada como ilustrativa; ela não representa comunicação real com o equipamento. A implementação deve preservar a ordem das leituras, mostrar confirmação e impedir duplicações ao repetir a sincronização. Não apresentar essas garantias como prova da implementação original sem evidência.

Após interagir, conteúdo curto: contribuição relatada em firmware e API; integração com ESP32, comunicação serial, persistência local e PostgreSQL; desafios de conectividade e tratamento de falhas; links da publicação e demonstração. Separar claramente contribuição pessoal e resultados da equipe.

Fonte: Rodrigues et al.,2026. Sistema IoT para monitoramento de equipes em obras de infraestrutura remotas. Revista FT30(157),01–15. https://www.revistaft.com/ft/article/view/657 — DOI https://doi.org/10.69849/7d4h4767. O texto relata estratégia SD-First, API Node.js e testes com períodos offline. Resultados são do projeto em equipe e das condições descritas no artigo.

### 4. Bancada atual — E-Play e Zé Resolve

E-Play: mostrar uma tela real e o problema resolvido quando houver link/captura fornecido. Não presumir stack ou funcionalidades apenas pelo nome.

Zé Resolve: MVP de marketplace de serviços em desenvolvimento na graduação, usando Flutter, FastAPI e PostgreSQL. Demonstração curta e ilustrativa de uma solicitação atravessando app, API e banco. Distinguir recursos implementados dos planejados.

Fecho: foco em Backend/Full Stack, conhecimentos em aprofundamento em Spring Boot e Laravel, acesso direto a GitHub, currículo e contato. Manter links não fornecidos como pendências internas, nunca fabricar destinos.

## Personalidade

Livros, pôsteres, videogame e luvas de Muay Thai como objetos opcionais em um espaço pessoal. O visitante descobre interesses sem precisar dominar combate, combos ou plataformas. As outras roupas podem ser colecionáveis cosméticos opcionais; o avatar mantém identidade consistente, e somente o sobretudo usa óculos escuros.

## O que eu retiraria da próxima versão

Combate obrigatório, chefe como condição de conclusão, sete mundos desconectados, barras de poder autodeclaradas, colecionáveis sem relação com evidências e projetos fictícios Orbit/Verde/Pulse. Essa remoção ainda é proposta, não foi executada neste documento.

## Primeiro protótipo para avaliar a direção

Uma única cena: laboratório com o avatar casual e a simulação de perda de conexão. Os demais capítulos só devem ser expandidos depois de verificar que essa interação comunica o projeto e desperta curiosidade.

Critérios: uma pessoa encontra a interação sem explicação; entende o papel do armazenamento local; distingue o que o autor fez do que a equipe entregou; alcança repositório/artigo/contato sem desbloquear nada. Não depender de reflexos, áudio ou cor para compreender os estados. Texto alternativo oferece o mesmo conteúdo sem jogar.

Pendências para implementação fiel: nome de apresentação confirmado, campus do IFRN, links de E-Play e Zé Resolve, contatos/currículo, contribuição exata por integrante quando necessário e capturas reais dos projetos.

## Registros reais enviados

- `public/assets/trajectory/laica-equipe.png`: fotografia de grupo no laboratório.
- `public/assets/trajectory/laica-apresentacao.png`: fotografia de apresentação/conversa no laboratório.

Contexto informado pelo usuário: inauguração do laboratório LAICA e apresentação do projeto ao diretor da Softex. Não foram inferidas identidades das pessoas retratadas. Legenda proposta: “Apresentação do projeto na inauguração do laboratório LAICA, com participação da direção da Softex.” Não apresentar o encontro como prêmio, contratação, parceria formal ou endosso institucional. Usar as fotografias originais na seção de evidências do EmbarcaTech, com descrição acessível e ampliação opcional.

### Parceria com a doisA Engenharia

Foto `public/assets/trajectory/doisa-parceria.png`, enviada pelo usuário e identificada por ele como registro da parceria público-privada com a doisA Engenharia. Usar esse contexto na trajetória do EmbarcaTech sem inferir vínculo empregatício ou atribuir identidades às pessoas da foto. Legenda proposta: “Registro da parceria com a doisA Engenharia durante a residência EmbarcaTech.” No percurso, conectar o problema de campo, o desenvolvimento em equipe, a apresentação no LAICA e a publicação.

### Referência pessoal: uniforme EmbarcaTech

Foto `public/assets/trajectory/embarcatech-uniforme.png`, identificada pelo próprio usuário como retrato seu com o uniforme do EmbarcaTech. Referência para o avatar do capítulo: camiseta roxa do programa, jeans escuro, cabelo curto, bigode e barba no queixo, óculos de grau de armação escura e lentes transparentes. A mochila azul aparece na referência, podendo compor a chegada ao laboratório. Não confundir os óculos de grau desta roupa com óculos escuros: estes continuam exclusivos do sobretudo. Esta referência não altera automaticamente as roupas casual, cowboy e armadura. Foto preservada sem edição; novo sprite ainda não produzido.

### Equipamento real do projeto RFID

Fotos fornecidas pelo usuário: `public/assets/trajectory/rfid-microcontrolador.png` (detalhe da montagem na placa) e `public/assets/trajectory/rfid-conjunto.png` (antena com a montagem do microcontrolador). Preservadas sem edição. Usar como referência visual da bancada e como imagens ampliáveis na parada EmbarcaTech. A representação interativa pode conectar leitura RFID, processamento, persistência local e sincronização; componentes e funções devem seguir a documentação do projeto, sem inferir especificações ou resultados apenas pelas fotografias.

### Crachá da residência

Foto `public/assets/trajectory/embarcatech-cracha.png`, enviada pelo usuário, com identidade visual do EmbarcaTech e nome manuscrito “Thalys”. Preservada sem edição. Proposta: objeto interativo de entrada do capítulo, abrindo a apresentação da residência e a foto original. Não inferir que este crachá utiliza RFID; a simulação técnica do projeto continua associada às etiquetas e ao equipamento documentados. Interação ainda não implementada.
