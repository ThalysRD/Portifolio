import { projects, projectEnglish, type Project } from "../data/projects.ts";
import { profile } from "../data/profile.ts";
import { skills } from "../data/skills.ts";
import { getLanguage, local, t } from "../core/i18n.ts";
export const esc = (value: string) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
export const currentProfile = () =>
  getLanguage() === "en" ? { ...profile, ...profile.en } : profile;
export const currentProject = (p: Project) =>
  getLanguage() === "en" ? { ...p, ...projectEnglish[p.id] } : p;
function url(value: string | undefined) {
  return value && /^(https:\/\/|mailto:|\.\/|\/[^/])/.test(value)
    ? esc(value)
    : undefined;
}
function link(label: string, href: string | undefined, download = false) {
  const safe = url(href);
  return safe
    ? `<a class="button green" href="${safe}" ${download ? "download" : 'target="_blank" rel="noopener noreferrer"'}>${esc(label)}</a>`
    : `<span class="unavailable">${esc(label)} · ${t().missing}</span>`;
}
export function projectContent(
  raw: Project,
  heading = "h2",
  titleId = "panel-title",
) {
  const p = currentProject(raw),
    m = t();
  return `<span class="panel-eyebrow">${esc(p.category)}${p.todo ? " / " + m.example : ""}</span><${heading} id="${titleId}">${esc(p.title)}</${heading}><p>${esc(p.description)}</p><div class="project-visual">${url(p.image) ? `<img loading="lazy" src="${url(p.image)}" alt="${esc(p.imageAlt)}">` : `<span>${m.screenshot}</span>`}</div><div class="tags">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div><div class="detail-grid"><div><h3>${m.problem}</h3><p>${esc(p.problem)}</p></div><div><h3>${m.solution}</h3><p>${esc(p.description)}</p></div><div><h3>${m.role}</h3><p>${esc(p.role)}</p></div><div><h3>${m.result}</h3><p>${esc(p.result)}</p></div></div><div class="panel-links">${link(m.demo, p.demo)}${link(m.repo, p.repository)}</div>`;
}
export function contactContent() {
  const p = currentProfile(),
    m = t();
  return `<p>${m.contactText}</p><div class="panel-links">${link(m.email, p.email ? `mailto:${p.email}` : undefined)}${link(m.linkedin, p.linkedin)}${link(m.github, p.github)}${link(m.cv, p.resume, true)}</div>${p.email ? `<p>${esc(p.email)}</p>` : ""}`;
}
export function skillContent(absorbed?: string[]) {
  const m = t();
  return `<div class="skill-grid">${skills
    .map(
      (s) =>
        `<article class="skill-card"><strong>${absorbed?.includes(s.id) ? "✓ " : ""}${esc(s.name)}</strong><small>${absorbed && !absorbed.includes(s.id) ? m.locked : esc(local(s.level))} · ${m.power} ${s.power}</small><div class="power-bar"><i style="width:${Math.max(0, Math.min(100, s.power))}%"></i></div><p>${esc(local(s.context))}</p><div class="tags">${s.projectIds
          .map((id) => projects.find((p) => p.id === id))
          .filter((p): p is Project => !!p)
          .map((p) => `<span>${esc(p.title)}</span>`)
          .join("")}</div></article>`,
    )
    .join("")}</div>`;
}
export function fallbackPortfolio() {
  const p = currentProfile(),
    m = t();
  return `<div class="traditional-top"><span class="eyebrow">${m.tradition}</span><button id="back-game" class="button green">${m.back}</button></div><h1>${esc(p.name)}</h1><p>${esc(p.role)} · ${esc(p.tagline)}</p><p>${esc(p.bio)}</p><h2>${m.projects}</h2>${projects.some((p) => p.todo) ? `<p class="unavailable">${m.projectTodo}</p>` : ""}<div class="traditional-grid">${projects.map((p) => `<article class="traditional-card">${projectContent(p, "h3", `project-${esc(p.id)}`)}</article>`).join("")}</div><h2>${m.tech}</h2>${skillContent()}<h2>${m.experience}</h2><p>${esc(p.experience)}</p><h2>${m.education}</h2><p>${esc(p.education)}</p><h2>${m.trophyTitle}</h2><div class="trophy-grid">${profile.favorites.map((f) => `<article class="trophy-card"><strong>${esc(f.title)}</strong><p>${esc(local(f.note))}</p></article>`).join("")}</div><h2>${m.contactTitle}</h2>${contactContent()}`;
}
