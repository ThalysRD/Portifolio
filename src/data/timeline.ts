import { certificates } from "./certificates";
import { timelineSkills, skillLabel } from "./timelineSkills";
import { showcaseHtml } from "./showcase";

export type Lang = "pt" | "en";

export type Copy = {
  pt: string;
  en: string;
};

export interface Milestone {
  id: string;
  date: Copy;
  title: Copy;
  summary: Copy;
  body: Copy[];
  tags: string[];
  photos?: { file: string; caption: Copy }[];
  link?: { url: string; label: Copy };
}

const c = (pt: string, en: string): Copy => ({ pt, en });

export const milestones: Milestone[] = [
  {
    id: "trybe",
    date: c("2022", "2022"),
    title: c("O começo na prática", "Learning by doing"),
    summary: c("Trybe · Desenvolvimento Web", "Trybe · Web Development"),
    body: [
      c(
        "Comecei minha trajetória buscando uma formação prática. Em 2022, entrei na Trybe, onde fiz uma formação de aproximadamente 1.500 horas em Desenvolvimento Web.",
        "I started by seeking practical training. In 2022, I joined Trybe and completed approximately 1,500 hours of Web Development training.",
      ),
      c(
        "A formação passou por fundamentos da web, interfaces com React, desenvolvimento de APIs, bancos de dados, testes e Ciência da Computação. Os módulos abaixo mostram essa base de estudos, com os certificados disponíveis ao final.",
        "The training covered web foundations, React interfaces, API development, databases, testing and Computer Science. The modules below show this learning foundation, with certificates available at the end.",
      ),
    ],
    tags: ["JavaScript", "React", "Node.js", "SQL", "MongoDB"],
  },
  {
    id: "ifrn",
    date: c("2024 → 2027.1", "2024 → 2027.1"),
    title: c("Um novo capítulo no IFRN", "A new chapter at IFRN"),
    summary: c(
      "Tecnologia em Sistemas para Internet",
      "Internet Systems degree",
    ),
    body: [
      c(
        "Em agosto de 2024, ingressei em Tecnologia em Sistemas para Internet no IFRN, Campus Natal-Zona Leste. Estou no 5º período, com previsão de conclusão em 2027.1.",
        "In August 2024, I enrolled in the Internet Systems degree at IFRN, Natal-Zona Leste campus. I am in my fifth semester, expecting to graduate in the first semester of 2027.",
      ),
      c(
        "Na graduação, continuo ampliando minha base e conhecendo diferentes áreas do desenvolvimento. É também onde estou desenvolvendo o Zé Resolve. Concluí cursos de Versionamento com Git (40 horas, 2025) e Introdução à Programação em Java (60 horas, 2026).",
        "At university, I continue broadening my foundations and exploring different areas of development. It is also where I am developing Zé Resolve. I completed courses in version control with Git (40 hours, 2025) and Introduction to Java Programming (60 hours, 2026).",
      ),
    ],
    tags: ["IFRN", "Graduação", "Sistemas para Internet"],
  },
  {
    id: "embarcatech",
    date: c("ABR 2025 — ABR 2026", "APR 2025 — APR 2026"),
    title: c(
      "API em Node.js para equipes em campo",
      "A Node.js API for field teams",
    ),
    summary: c(
      "Residência EmbarcaTech · 1.040 h · remunerada",
      "EmbarcaTech residency · 1,040 h · paid",
    ),
    body: [
      c(
        "Entre abril de 2025 e abril de 2026, fiz a residência tecnológica EmbarcaTech (Softex/IFRN), uma residência remunerada de 1.040 horas. Em equipe, construímos um sistema de monitoramento por RFID para equipes que trabalham em obras remotas.",
        "From April 2025 to April 2026, I took part in the EmbarcaTech technology residency (Softex/IFRN), a paid 1,040-hour programme. As a team, we built an RFID monitoring system for crews working at remote construction sites.",
      ),
      c(
        "Minha parte principal foi a API: Node.js e Express recebendo as leituras dos dispositivos, gravando no PostgreSQL, com consultas paginadas e processamento em lote para os registros que chegam depois de períodos sem conexão. Também trabalhei no firmware do ESP32, com armazenamento local e sincronização.",
        "My main part was the API: Node.js and Express receiving device readings and storing them in PostgreSQL, with paginated queries and batch processing for records that arrive after periods offline. I also worked on the ESP32 firmware, with local storage and synchronisation.",
      ),
      c(
        "O projeto foi avaliado por banca, apresentado à Softex e virou artigo publicado. Os resultados do sistema pertencem ao trabalho coletivo.",
        "The project was evaluated by a panel, presented to Softex and became a published article. The system’s results belong to the whole team.",
      ),
    ],
    tags: ["Node.js", "Express", "PostgreSQL", "API REST", "ESP32"],
    link: {
      url: "https://github.com/ThalysRD/rfid-server",
      label: c("Ver a API no GitHub", "View the API on GitHub"),
    },
    photos: [
      {
        file: "rfid-conjunto.png",
        caption: c(
          "Antena RFID e montagem do microcontrolador utilizadas no projeto.",
          "RFID antenna and microcontroller assembly used in the project.",
        ),
      },
      {
        file: "rfid-microcontrolador.png",
        caption: c(
          "Detalhe da montagem do microcontrolador.",
          "A close look at the microcontroller assembly.",
        ),
      },
    ],
  },
  {
    id: "publication",
    date: c("30 ABR 2026", "30 APR 2026"),
    title: c("O trabalho vira publicação", "Our work becomes a publication"),
    summary: c(
      "Pesquisa aplicada · Revista FT",
      "Applied research · Revista FT",
    ),
    body: [
      c(
        "Participei da publicação “Sistema IoT para monitoramento de equipes em obras de infraestrutura remotas”, publicada na Revista FT em 30 de abril de 2026.",
        "I co-authored “Sistema IoT para monitoramento de equipes em obras de infraestrutura remotas”, published in Revista FT on April 30, 2026.",
      ),
      c(
        "O artigo apresenta o sistema da equipe e sua validação, incluindo a estratégia de armazenamento local e posterior envio dos registros ao servidor. É uma evidência pública do projeto desenvolvido na residência.",
        "The article presents the team’s system and its validation, including local storage followed by transmission to a server. It is public documentation of the residency project.",
      ),
    ],
    tags: ["Coautoria", "Pesquisa aplicada", "IoT"],
    link: {
      url: "https://www.revistaft.com/ft/article/view/657",
      label: c("Ler a publicação", "Read the publication"),
    },
  },
  {
    id: "projects",
    date: c("2025.2 · 3º semestre", "2025.2 · 3rd semester"),
    title: c(
      "E-Play: construir de ponta a ponta",
      "E-Play: building end to end",
    ),
    summary: c("Marketplace de jogos usados", "Used-games marketplace"),
    body: [
      c(
        "E-Play é um marketplace de jogos usados desenvolvido em equipe no terceiro semestre do IFRN, para fins didáticos. Fui o maior contribuidor da equipe, com cerca de 110 dos 180 commits: montei a base do projeto (migrações do banco, Docker e testes de integração) e desenvolvi login e sessões, ativação de conta e recuperação de senha por e-mail, anúncios, busca e a finalização da compra. A stack reúne Next.js, React, Node.js, PostgreSQL, Docker e testes com Jest. O projeto está no ar.",
        "E-Play is a used-games marketplace built by a team during the third semester at IFRN, for educational purposes. I was the team’s top contributor, with about 110 of 180 commits: I set up the project foundations (database migrations, Docker and integration tests) and built login and sessions, e-mail account activation and password recovery, listings, search and checkout. The stack includes Next.js, React, Node.js, PostgreSQL, Docker and Jest. The project is live.",
      ),
    ],
    tags: ["Next.js", "React", "Node.js", "PostgreSQL", "Docker", "Jest"],
    link: {
      url: "https://e-play-inky.vercel.app",
      label: c("Ver o E-Play funcionando", "See E-Play live"),
    },
  },
  {
    id: "ze-resolve",
    date: c("Em desenvolvimento", "In development"),
    title: c("O próximo projeto ganha forma", "The next project takes shape"),
    summary: c(
      "Zé Resolve · Projeto Integrador II",
      "Zé Resolve · Integrative Project II",
    ),
    body: [
      c(
        "Na graduação, estou desenvolvendo o Zé Resolve: um MVP de marketplace de serviços com Flutter, FastAPI e PostgreSQL. Minha contribuição já inclui telas de autenticação em Flutter/Dart. O projeto reúne desenvolvimento mobile, backend, banco de dados e comunicação entre componentes, com entrega acadêmica prevista para dezembro de 2026.",
        "At university, I am developing Zé Resolve, a service-marketplace MVP using Flutter, FastAPI and PostgreSQL. My contribution already includes Flutter/Dart authentication screens. It combines mobile development, backend, a database and communication between components, with an academic delivery planned for December 2026.",
      ),
    ],
    tags: [
      "Flutter / Dart",
      "FastAPI",
      "PostgreSQL",
      "Mobile",
      "Sistemas distribuídos",
    ],
  },
  {
    id: "today",
    date: c("Hoje & próximos passos", "Today & next steps"),
    title: c("Uma história em construção", "A story still being written"),
    summary: c(
      "Foco em Backend e Full Stack",
      "Focused on Backend and Full Stack",
    ),
    body: [
      c(
        "Quero transformar essa experiência em uma carreira em desenvolvimento de software, principalmente Backend e Full Stack. Aprendo rápido, gosto de colocar tecnologia em prática e continuo aprofundando minha base.",
        "I want to turn this experience into a software development career, especially Backend and Full Stack. I learn quickly, enjoy putting technology into practice and keep strengthening my foundations.",
      ),
      c(
        "Tenho estudado e desenvolvido projetos com JavaScript, React, Next.js, Node.js, SQL, PostgreSQL, Java, Python, Docker, Git/GitHub e Linux. Estou aberto a oportunidades e a desenvolver novas habilidades conforme os desafios da equipe. Se a tecnologia que sua vaga pede ainda não aparece aqui, vamos conversar: tenho disposição para aprendê-la e colocá-la em prática.",
        "I have studied and built projects with JavaScript, React, Next.js, Node.js, SQL, PostgreSQL, Java, Python, Docker, Git/GitHub and Linux. I am open to opportunities and to developing new skills to meet the team’s challenges. If the technology your role requires is not listed here yet, let’s talk: I am willing to learn it and put it into practice.",
      ),
      c(
        "Fora do desenvolvimento, jogos, filmes, animes e Muay Thai também fazem parte de quem sou.",
        "Outside development, games, films, anime and Muay Thai are also part of who I am.",
      ),
    ],
    tags: ["Backend", "Full Stack"],
  },
];

const order = [
  "trybe",
  "ifrn",
  "embarcatech",
  "projects",
  "publication",
  "ze-resolve",
  "today",
];

milestones.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

export const photoUrl = (file: string) => `./assets/trajectory/${file}`;

export const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]!,
  );

function renderSkills(m: Milestone, l: Lang) {
  const groups = timelineSkills[m.id];

  if (!groups) {
    return `<div class="tags">${m.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>`;
  }

  return `<section class="skills-section"><h3>${l === "pt" ? "Conhecimentos ao longo deste capítulo" : "Skills in this chapter"}</h3><div class="skills-grid">${groups.map((group) => `<section class="skill-group"><h4>${esc(group.title[l])}</h4><p>${esc(group.context[l])}</p><ul class="tags">${group.items.map((tag) => `<li>${esc(skillLabel(tag, l))}</li>`).join("")}</ul></section>`).join("")}</div></section>`;
}

export function detail(m: Milestone, l: Lang, heading = "h2", modal = true) {
  return `<p class="eyebrow">${esc(m.date[l])} · ${esc(m.summary[l])}</p><${heading}${modal ? ' id="panel-title"' : ""}>${esc(m.title[l])}</${heading}>${m.body.map((paragraph) => `<p>${esc(paragraph[l])}</p>`).join("")}${renderSkills(m, l)}${m.photos ? `<div class="photo-grid">${m.photos.map((photo) => `<figure><a href="${photoUrl(photo.file)}" target="_blank" rel="noopener" aria-label="${esc(photo.caption[l])}"><img src="${photoUrl(photo.file)}" alt="${esc(photo.caption[l])}" loading="lazy"></a><figcaption>${esc(photo.caption[l])}</figcaption></figure>`).join("")}</div>` : ""}${certificates[m.id] ? `<section class="certificates"><h3>${l === "pt" ? "Certificados e comprovações" : "Certificates and evidence"}</h3>${m.id === "embarcatech" ? `<p class="proof-note">${l === "pt" ? "A declaração de 1.040 h refere-se à residência completa. O certificado FIC de 240 h é um documento distinto; as cargas não foram somadas." : "The 1,040-hour statement covers the full residency. The 240-hour FIC certificate is a separate document; the hours have not been added together."}</p>` : ""}${certificates[m.id].map((certificate) => `<a class="certificate-link" href="./assets/certificates/${certificate.file}.pdf" target="_blank" rel="noopener"><span></span><span>${esc(certificate[l])}<small>PDF${certificate.redacted ? (l === "pt" ? " · Cópia de consulta com dados pessoais ocultos" : " · Reading copy with personal data hidden") : ""}</small></span></a>`).join("")}</section>` : ""}${m.link ? `<a class="button primary" href="${m.link.url}" target="_blank" rel="noopener">${esc(m.link.label[l])}</a>` : ""}`;
}

export function timelineFallback(l: Lang = "pt") {
  return `<div class="reading-head"><p class="eyebrow">THALYS / ${l === "pt" ? "TRAJETÓRIA" : "JOURNEY"}</p><h1>Thalys Rodrigues</h1><p>${l === "pt" ? "Desenvolvedor Full Stack Júnior · Node.js, React e PostgreSQL · Natal/RN ou remoto." : "Junior Full Stack Developer · Node.js, React and PostgreSQL · Natal, Brazil or remote."}</p><p><a class="button primary" href="./assets/cv/Curriculo_Thalys_Rodrigues.pdf" download>${l === "pt" ? "Baixar currículo" : "Download résumé"}</a><a class="button" href="mailto:tgbr66@gmail.com">tgbr66@gmail.com</a><a class="button" href="https://www.linkedin.com/in/thalysrd/" target="_blank" rel="noopener">LinkedIn</a></p></div><section class="reading-note showcase">${showcaseHtml(l)}</section><h2 class="reading-section-title">${l === "pt" ? "Trajetória" : "Journey"}</h2>${milestones.map((milestone) => `<article class="reading-note">${detail(milestone, l, "h2", false)}</article>`).join("")}`;
}
