import type { Copy, Lang } from "./timeline";

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!,
  );

const c = (pt: string, en: string): Copy => ({ pt, en });

export const hero = {
  eyebrow: c(
    "DESENVOLVEDOR FULL STACK JÚNIOR · NATAL/RN OU REMOTO",
    "JUNIOR FULL STACK DEVELOPER · NATAL, BRAZIL OR REMOTE",
  ),
  headline: c(
    "Construo APIs e aplicações web de ponta a ponta.",
    "I build APIs and web applications end to end.",
  ),
  text: c(
    "Node.js, React e PostgreSQL. Um ano de residência tecnológica remunerada desenvolvendo em equipe a API de um sistema de monitoramento de equipes em campo, formação Full Stack pela Trybe (1.500 h) e graduação em Sistemas para Internet no IFRN.",
    "Node.js, React and PostgreSQL. One year in a paid technology residency building, as part of a team, the API for a field-team monitoring system, a 1,500-hour Full Stack program at Trybe and an Internet Systems degree at IFRN.",
  ),
  status: c(
    "Disponível agora · tempo integral · CLT ou PJ",
    "Available now · full time",
  ),
};

export const resumeFile = "./assets/cv/Curriculo_Thalys_Rodrigues.pdf";

interface ShowcaseProject {
  id: string;
  label: Copy;
  title: Copy;
  problem: Copy;
  contribution: Copy[];
  stack: string[];
  repo: string;
  image?: { file: string; alt: Copy };
}

export const showcase: ShowcaseProject[] = [
  {
    id: "rfid-api",
    label: c(
      "Residência EmbarcaTech · 2025–2026 · equipe",
      "EmbarcaTech residency · 2025–2026 · team",
    ),
    title: c(
      "API de monitoramento de equipes em campo",
      "Field team monitoring API",
    ),
    problem: c(
      "Equipes em obras remotas registram presença com crachás RFID, muitas vezes sem internet. Os registros não podem se perder.",
      "Teams at remote construction sites check in with RFID badges, often without internet access. No record can be lost.",
    ),
    contribution: [
      c(
        "Desenvolvi a API em Node.js e Express que recebe as leituras dos dispositivos e grava no PostgreSQL.",
        "Built the Node.js and Express API that receives device readings and stores them in PostgreSQL.",
      ),
      c(
        "Consultas paginadas e processamento em lote para os registros que chegam depois de períodos sem conexão.",
        "Paginated queries and batch processing for records that arrive after periods offline.",
      ),
      c(
        "O sistema foi avaliado por banca e virou artigo publicado na Revista FT (2026).",
        "The system was evaluated by a panel and published as an article in Revista FT (2026).",
      ),
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "API REST", "ESP32"],
    repo: "https://github.com/ThalysRD/rfid-server",
  },
  {
    id: "e-play",
    label: c("IFRN · 2025.2 · equipe", "IFRN · 2025.2 · team"),
    title: c("E-Play · marketplace de jogos usados", "E-Play · used-games marketplace"),
    problem: c(
      "Uma loja on-line completa: contas de usuário, anúncios, busca, carrinho e compra.",
      "A complete online store: user accounts, listings, search, cart and checkout.",
    ),
    contribution: [
      c(
        "Implementei cadastro, login, sessões, ativação de conta e recuperação de senha.",
        "Implemented sign-up, login, sessions, account activation and password recovery.",
      ),
      c(
        "Criei as rotas de busca e de anúncios e contribuí no carrinho e nas regras de compra.",
        "Built the search and listing routes and contributed to the cart and checkout rules.",
      ),
      c(
        "Upload de imagens (Firebase Storage), envio de e-mails e ambiente com Docker.",
        "Image uploads (Firebase Storage), transactional e-mail and a Docker setup.",
      ),
    ],
    stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Docker", "Jest"],
    repo: "https://github.com/ThalysRD/e-play",
  },
  {
    id: "tfc",
    label: c("Trybe · projeto de formação", "Trybe · training project"),
    title: c(
      "Trybe Futebol Clube · API REST com testes",
      "Trybe Futebol Clube · tested REST API",
    ),
    problem: c(
      "Back-end de um placar de futebol: partidas, login e tabela de classificação calculada a partir dos jogos.",
      "Back end for a football scoreboard: matches, login and a league table computed from the results.",
    ),
    contribution: [
      c(
        "API REST em TypeScript e Express, com Sequelize e MySQL.",
        "REST API in TypeScript and Express, with Sequelize and MySQL.",
      ),
      c(
        "Testes automatizados com Mocha para as rotas implementadas.",
        "Automated tests with Mocha for the implemented routes.",
      ),
      c("Ambiente em Docker.", "Runs in Docker."),
    ],
    stack: ["TypeScript", "Express", "Sequelize", "MySQL", "Mocha", "Docker"],
    repo: "https://github.com/ThalysRD/Trybe-Futebol-Clube",
  },
];

export function showcaseHtml(l: Lang, heading = "h2") {
  const cards = showcase
    .map(
      (p) =>
        `<article class="project-card">${p.image ? `<img class="project-shot" src="${p.image.file}" alt="${esc(p.image.alt[l])}" loading="lazy">` : ""}<p class="eyebrow">${esc(p.label[l])}</p><h3>${esc(p.title[l])}</h3><p class="project-problem">${esc(p.problem[l])}</p><ul class="project-points">${p.contribution.map((x) => `<li>${esc(x[l])}</li>`).join("")}</ul><ul class="tags">${p.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul><a class="button" href="${p.repo}" target="_blank" rel="noopener">${l === "pt" ? "Ver código no GitHub" : "View code on GitHub"} →</a></article>`,
    )
    .join("");
  return `<div class="showcase-head"><p class="eyebrow">${l === "pt" ? "PROJETOS" : "PROJECTS"}</p><${heading}>${l === "pt" ? "O que eu já construí" : "What I have built"}</${heading}></div><div class="project-grid">${cards}</div>`;
}
