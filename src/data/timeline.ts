import { certificates } from "./certificates";
import { timelineSkills, skillLabel } from "./timelineSkills";

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
    title: c("Código encontra o mundo real", "Code meets the real world"),
    summary: c(
      "Residência EmbarcaTech · Projeto RFID",
      "EmbarcaTech residency · RFID project",
    ),
    body: [
      c(
        "Concluí a residência tecnológica EmbarcaTech, com 1.040 horas de atividades entre abril de 2025 e abril de 2026. Participei de um projeto aplicado de monitoramento por RFID, conectando desenvolvimento de software e hardware. Minha contribuição envolveu firmware e API.",
        "I completed the 1,040-hour EmbarcaTech residency between April 2025 and April 2026. I participated in an applied RFID monitoring project, connecting software and hardware. My contribution involved firmware and an API.",
      ),
      c(
        "Trabalhei com ESP32, comunicação serial, armazenamento local, sincronização com servidor, API e PostgreSQL. A conectividade limitada exigiu atenção à persistência dos dados, confiabilidade e tratamento de falhas.",
        "I worked with ESP32, serial communication, local storage, server synchronization, an API and PostgreSQL. Limited connectivity required attention to persistence, reliability and failure handling.",
      ),
      c(
        "O projeto foi desenvolvido em equipe, avaliado por banca e teve resultado funcional. Os resultados do sistema pertencem ao trabalho coletivo.",
        "The team project was evaluated by a panel and produced a functional result. The system’s results belong to the collective work.",
      ),
    ],
    tags: ["ESP32", "Firmware", "API", "PostgreSQL", "RFID"],
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
      {
        file: "embarcatech-uniforme.png",
        caption: c(
          "Eu com o uniforme do EmbarcaTech.",
          "Me wearing the EmbarcaTech uniform.",
        ),
      },
      {
        file: "embarcatech-cracha.png",
        caption: c("Meu crachá da residência.", "My residency badge."),
      },
    ],
  },
  {
    id: "secitex",
    date: c("14 — 16 OUT 2025", "14 — 16 OCT 2025"),
    title: c(
      "Ciência, tecnologia e extensão",
      "Science, technology and outreach",
    ),
    summary: c("VII SECITEX · IFRN", "VII SECITEX · IFRN"),
    body: [
      c(
        "Participei da VII Semana de Ciência, Tecnologia e Extensão (SECITEX), realizada de 14 a 16 de outubro de 2025 no IFRN, Campus Natal-Zona Norte. O certificado registra 24 horas de participação.",
        "I attended the seventh Science, Technology and Outreach Week (SECITEX), held from October 14 to 16, 2025 at IFRN, Natal-Zona Norte campus. The certificate records 24 hours of participation.",
      ),
    ],
    tags: ["SECITEX", "IFRN", "24 horas"],
  },
  {
    id: "partnership",
    date: c("Durante a residência", "During the residency"),
    title: c("Construção em equipe", "Building together"),
    summary: c(
      "Parceria com a doisA Engenharia",
      "Partnership with doisA Engenharia",
    ),
    body: [
      c(
        "A residência também incluiu a parceria público-privada com a doisA Engenharia. Este registro faz parte dessa experiência de aproximação entre formação e um contexto real de aplicação.",
        "The residency also included a public-private partnership with doisA Engenharia. This photo records that connection between education and a real application context.",
      ),
      c(
        "Essa experiência integra minha formação prática na residência, conectando trabalho em equipe e desenvolvimento aplicado.",
        "This experience is part of my practical residency training, connecting teamwork and applied development.",
      ),
    ],
    tags: ["EmbarcaTech", "doisA Engenharia", "Colaboração"],
    photos: [
      {
        file: "doisa-parceria.png",
        caption: c(
          "Registro da parceria com a doisA Engenharia durante a residência.",
          "A record of the partnership with doisA Engenharia during the residency.",
        ),
      },
    ],
  },
  {
    id: "laica",
    date: c("Durante a residência", "During the residency"),
    title: c("Apresentar também é construir", "Sharing what we built"),
    summary: c(
      "Inauguração do laboratório LAICA",
      "Opening of the LAICA laboratory",
    ),
    body: [
      c(
        "Na inauguração do laboratório LAICA, participei da apresentação do projeto ao diretor da Softex. As fotos registram esse momento e a presença da equipe.",
        "At the opening of the LAICA laboratory, I participated in presenting the project to the director of Softex. These photos document the moment and the team.",
      ),
      c(
        "Foi uma oportunidade de compartilhar o trabalho desenvolvido na residência e explicar a solução para além do código.",
        "It was an opportunity to share our residency work and explain the solution beyond the code.",
      ),
    ],
    tags: ["LAICA", "Softex", "Apresentação"],
    photos: [
      {
        file: "laica-apresentacao.png",
        caption: c(
          "Apresentação do projeto na inauguração do laboratório LAICA.",
          "Presenting the project at the opening of the LAICA laboratory.",
        ),
      },
      {
        file: "laica-equipe.png",
        caption: c(
          "Registro da equipe no laboratório.",
          "A photo of the team in the laboratory.",
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
        "E-Play é um marketplace de jogos usados desenvolvido em equipe no terceiro semestre do IFRN, para fins didáticos. Contribuí para autenticação, cadastro, sessões, ativação de conta, recuperação de senha, anúncios, busca, carrinho e fluxo de compra, integrando interface, API e banco. A stack reúne Next.js, React, Node.js, PostgreSQL, Docker e testes com Jest.",
        "E-Play is a used-games marketplace built by a team during the third semester at IFRN, for educational purposes. I contributed to authentication, registration, sessions, account activation, password recovery, listings, search, cart and checkout, integrating interface, API and database. The stack includes Next.js, React, Node.js, PostgreSQL, Docker and Jest.",
      ),
    ],
    tags: ["Next.js", "React", "Node.js", "PostgreSQL", "Docker", "Jest"],
    link: {
      url: "https://github.com/ThalysRD/e-play",
      label: c("Ver E-Play no GitHub", "View E-Play on GitHub"),
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
  "secitex",
  "partnership",
  "laica",
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
  return `<div class="reading-head"><p class="eyebrow">THALYS / ${l === "pt" ? "TRAJETÓRIA" : "JOURNEY"}</p><h1>${l === "pt" ? "Minha história, no seu ritmo." : "My story, at your pace."}</h1><p>${l === "pt" ? "Desenvolvedor em formação, com foco em Backend e Full Stack." : "Developer in training, focused on Backend and Full Stack."}</p></div>${milestones.map((milestone) => `<article class="reading-note">${detail(milestone, l, "h2", false)}</article>`).join("")}`;
}
