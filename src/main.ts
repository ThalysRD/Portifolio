import "./style.css";
import { Application, Container, Graphics, Sprite } from "pixi.js";
import { loadVisualArt } from "./core/visualAssets";
import { Character } from "./entities/Character";
import { GameInput } from "./core/GameInput";
import { Dialog } from "./ui/Dialog";
import {
  milestones,
  detail,
  esc,
  photoUrl,
  timelineFallback,
  type Lang,
} from "./data/timeline";
const $ = <T extends HTMLElement>(id: string) =>
  document.getElementById(id) as T;
let lang: Lang = "pt",
  visited = new Set<string>();
try {
  const value = JSON.parse(localStorage.getItem("thalys-timeline-v2") ?? "{}");
  lang = value.lang === "en" ? "en" : "pt";
  visited = new Set(
    Array.isArray(value.visited)
      ? value.visited.filter((id: unknown) =>
          milestones.some((m) => m.id === id),
        )
      : [],
  );
} catch {
  /* Private browsing still supports the full journey. */
}
const save = () => {
  try {
    localStorage.setItem(
      "thalys-timeline-v2",
      JSON.stringify({ lang, visited: [...visited] }),
    );
  } catch {}
};
const input = new GameInput();
input.enabled = false;
const app = new Application();
const world = new Container();
let player: Character;
let bg: Sprite;
let scenery = new Graphics();
const spacing = 530,
  first = 280,
  total = first + (milestones.length - 1) * spacing + 400;
const at = (i: number) => first + i * spacing;
let x = first - 90,
  camera = 0,
  floor = 400,
  target: number | undefined,
  openOnArrival: number | undefined,
  ready = false,
  reading = location.hash === "#traditional",
  near = -1,
  current = 0;
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const tr = (pt: string, en: string) => (lang === "pt" ? pt : en);
function sync() {
  const paused = dialog.element.open || reading || document.hidden;
  input.enabled = ready && !paused;
  if (!ready) return;
  if (paused) {
    input.clear();
    app.ticker.stop();
  } else if (ready) app.ticker.start();
}
const dialog = new Dialog(() => sync());
function contacts() {
  dialog.open(
    `<p class="eyebrow">THALYS RODRIGUES</p><h2 id="panel-title">${tr("Vamos construir o próximo capítulo?", "Let’s build the next chapter?")}</h2><p>${tr("Busco uma oportunidade de estágio ou júnior em desenvolvimento de software, com foco em Backend e Full Stack.", "I am looking for an internship or junior software development role, focused on Backend and Full Stack.")}</p><p>${tr("Sua vaga pede uma habilidade que ainda não aparece aqui? Estou disposto a aprender, desenvolver essa competência e contribuir com a equipe. Vamos conversar.", "Does your role call for a skill that is not listed here yet? I am willing to learn, develop that skill and contribute to the team. Let’s talk.")}</p><div class="contact-links"><a class="button primary" href="mailto:tgbr66@gmail.com">tgbr66@gmail.com</a><a class="button" href="https://github.com/ThalysRD" target="_blank" rel="noopener">GitHub</a></div>`,
  );
}
function openMemory(i: number) {
  target = undefined;
  openOnArrival = undefined;
  const m = milestones[i];
  visited.add(m.id);
  save();
  renderProgress();
  dialog.open(
    detail(m, lang) +
      `<div class="panel-bottom"><button id="continue-walk">${tr("← Continuar a caminhada", "← Continue walking")}</button>${i < milestones.length - 1 ? `<button id="next-memory">${tr("Próxima memória", "Next memory")} →</button>` : `<button id="talk">${tr("Vamos conversar", "Let’s talk")}</button>`}</div>`,
  );
  $("continue-walk").onclick = () => dialog.close();
  if (i < milestones.length - 1)
    $("next-memory").onclick = () => {
      dialog.close();
      go(i + 1, false);
    };
  else $("talk").onclick = contacts;
}
function go(i: number, instant: boolean) {
  if (!ready) return;
  input.clear();
  $("walk-hint").hidden = true;
  if (instant) {
    x = at(i) - 30;
    target = undefined;
    updateView(true);
    openMemory(i);
  } else {
    target = at(i) - 30;
    openOnArrival = i;
    $("game").focus({ preventScroll: true });
  }
}
function renderProgress() {
  document
    .querySelectorAll<HTMLElement>("[data-note]")
    .forEach((b) =>
      b.classList.toggle(
        "read",
        visited.has(milestones[Number(b.dataset.note)].id),
      ),
    );
  $("read-count").textContent = tr(
    `${visited.size} de ${milestones.length} memórias abertas`,
    `${visited.size} of ${milestones.length} memories opened`,
  );
}
function render() {
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  $("language").textContent = lang === "pt" ? "EN" : "PT";
  $("quick").textContent = reading
    ? tr("Voltar à caminhada", "Back to the walk")
    : tr("Versão em texto", "Text version");
  $("contact").textContent = tr("Vamos conversar", "Let’s talk");
  $("intro-label").textContent = tr(
    "UMA LINHA DO TEMPO PARA EXPLORAR",
    "A TIMELINE TO EXPLORE",
  );
  $("headline").textContent = tr(
    "Cada passo, uma história.",
    "Every step has a story.",
  );
  $("intro-text").textContent = tr(
    "Sou Thalys. Caminhe comigo pelos estudos, projetos e pessoas que fazem parte da minha trajetória.",
    "I’m Thalys. Walk with me through the studies, projects and people that have shaped my journey.",
  );
  $("role").textContent = tr(
    "Aberto a oportunidades. Backend & Full Stack.",
    "Open to opportunities. Backend & Full Stack.",
  );
  $("next-note").textContent = tr("Próxima memória →", "Next memory →");
  $("move-label").textContent = tr(
    "ou A / D para caminhar",
    "or A / D to walk",
  );
  $("open-label").textContent = tr("para interagir", "to interact");
  $("restart").title = tr("Voltar ao início", "Back to the beginning");
  $("restart").querySelector("span")!.textContent = tr("Início", "Start");
  $("footer-copy").textContent = tr(
    "Histórias reais. Aprendizado em movimento.",
    "Real stories. Learning in motion.",
  );
  $("walk-hint").textContent = tr(
    "Clique numa nota para caminhar até ela →",
    "Click a note to walk towards it →",
  );
  $("notes").innerHTML = milestones
    .map(
      (m, i) =>
        `<button class="memory" data-note="${i}" style="left:${at(i) - 125}px" aria-label="${tr("Caminhar até", "Walk to")} ${esc(m.title[lang])}"><span class="memory-date">${esc(m.date[lang])}</span>${m.photos ? `<img class="memory-thumb" src="${photoUrl(m.photos[0].file)}" alt="">` : ""}<h2>${esc(m.title[lang])}</h2><p>${esc(m.summary[lang])}</p><span class="memory-index">${String(i + 1).padStart(2, "0")} / ${tr("UMA MEMÓRIA PARA ABRIR", "A MEMORY TO OPEN")}</span></button>`,
    )
    .join("");
  document.querySelectorAll<HTMLButtonElement>("[data-note]").forEach(
    (b) =>
      (b.onclick = () => {
        const i = Number(b.dataset.note);
        if (Math.abs(at(i) - x) < 100) openMemory(i);
        else go(i, false);
      }),
  );
  $("timeline-nav").innerHTML = milestones
    .map(
      (m, i) =>
        `<button data-jump="${i}" aria-label="${tr("Abrir", "Open")} ${esc(m.title[lang])}">${esc(m.date[lang])}<small>${esc(m.summary[lang].split(" · ")[0])}</small></button>`,
    )
    .join("");
  document
    .querySelectorAll<HTMLButtonElement>("[data-jump]")
    .forEach((b) => (b.onclick = () => go(Number(b.dataset.jump), true)));
  $("traditional").innerHTML = timelineFallback(lang);
  renderProgress();
  if (ready) updateView(true);
}
function showReading(value: boolean) {
  reading = value;
  document.body.classList.toggle("reading", reading);
  history.replaceState(null, "", reading ? "#traditional" : location.pathname);
  render();
  sync();
  if (reading) $("traditional").focus();
  else {
    resize();
    $("game").focus({ preventScroll: true });
  }
}
function resize() {
  if (!ready) return;
  const host = $("game"),
    w = host.clientWidth,
    h = host.clientHeight;
  if (!w || !h) return;
  app.renderer.resize(w, h);
  floor = h - 90;
  host.style.setProperty("--floor", `${floor}px`);
  const bgScale = Math.max((w + 240) / 768, h / 512);
  bg.scale.set(bgScale);
  bg.y = h - bg.height;
  scenery.clear();
  scenery.rect(0, floor, total, h - floor).fill(0x0b211a);
  scenery.rect(0, floor, total, 3).fill(0x80b975);
  scenery.rect(0, floor + 30, total, 2).fill(0x284e3c);
  for (let i = 0; i < milestones.length; i++) {
    const px = at(i);
    scenery.circle(px, floor + 31, 6).fill(0xb4e695);
    for (let j = 0; j < 4; j++)
      scenery.rect(px + 100 + j * 60, floor + 30, 20, 2).fill(0x3e7454);
    scenery.roundRect(px + 86, floor - 48, 54, 8, 2).fill(0x244a3a);
    scenery
      .rect(px + 93, floor - 40, 5, 40)
      .rect(px + 128, floor - 40, 5, 40)
      .fill(0x183d2e);
  }
  updateView(true);
  app.render();
}
function updateView(snap = false) {
  current = Math.max(
    0,
    Math.min(milestones.length - 1, Math.round((x - first) / spacing)),
  );
  const w = app.screen.width;
  const focus = w < 760 && Math.abs(x - at(current)) < 125 ? at(current) : x;
  const desired = Math.max(
    Math.min(0, w - total),
    Math.min(0, w * (w < 760 ? 0.5 : 0.38) - focus),
  );
  camera =
    snap || reduced.matches ? desired : camera + (desired - camera) * 0.13;
  world.x = Math.round(camera);
  bg.x = Math.max(w - bg.width, camera * 0.07);
  $("notes").style.transform = `translateX(${Math.round(camera)}px)`;
  player.position.set(Math.round(x), floor);
  near = Math.abs(x - at(current)) < 105 ? current : -1;
  $("interact").hidden = near < 0;
  $("interact").querySelector("span")!.textContent = tr(
    "Abrir memória",
    "Open memory",
  );
  $("current-label").textContent =
    `${milestones[current].date[lang]} / ${String(current + 1).padStart(2, "0")}`;
  $("game").dataset.position = String(Math.round(x));
  document.querySelectorAll<HTMLElement>("[data-note]").forEach((b, i) => {
    b.classList.toggle("near", i === near);
    const visible = at(i) + camera > -140 && at(i) + camera < w + 140;
    b.inert = !visible;
    b.style.visibility = visible ? "visible" : "hidden";
  });
  document.querySelectorAll<HTMLElement>("[data-jump]").forEach((b, i) => {
    b.classList.toggle("active", i === current);
    if (i === current) b.setAttribute("aria-current", "step");
    else b.removeAttribute("aria-current");
  });
}
window.addEventListener("keydown", (e) => {
  if (
    e.key.toLowerCase() === "e" &&
    !e.repeat &&
    !e.ctrlKey &&
    !e.metaKey &&
    input.enabled &&
    near >= 0
  ) {
    e.preventDefault();
    openMemory(near);
  }
});
$("quick").onclick = () => showReading(!reading);
$("language").onclick = () => {
  dialog.close();
  lang = lang === "pt" ? "en" : "pt";
  save();
  render();
};
$("contact").onclick = contacts;
$("restart").onclick = () => {
  target = undefined;
  openOnArrival = undefined;
  x = first - 90;
  input.clear();
  updateView(true);
};
$("next-note").onclick = () =>
  go(near < 0 ? current : Math.min(current + 1, milestones.length - 1), false);
$("interact").onclick = () => {
  if (near >= 0) openMemory(near);
};
document.querySelector<HTMLAnchorElement>(".skip")!.onclick = (e) => {
  e.preventDefault();
  showReading(true);
};
document.addEventListener("visibilitychange", sync);
for (const [id, axis] of [
  ["left", -1],
  ["right", 1],
] as const) {
  const b = $(id);
  b.onpointerdown = (e) => {
    if (!input.enabled) return;
    b.setPointerCapture(e.pointerId);
    target = undefined;
    openOnArrival = undefined;
    input.axis = axis;
  };
  const release = () => {
    input.axis = 0;
  };
  b.onpointerup = release;
  b.onpointercancel = release;
  b.onlostpointercapture = release;
}
render();
showReading(reading);
async function start() {
  await app.init({
    background: 0x06110e,
    antialias: false,
    roundPixels: true,
    resolution: 1,
    preference: "webgl",
  });
  const art = await loadVisualArt();
  bg = new Sprite(art.environments[0]);
  bg.alpha = 0.85;
  app.stage.addChild(bg);
  app.stage.addChild(
    new Graphics()
      .rect(0, 0, 10000, 10000)
      .fill({ color: 0x02100a, alpha: 0.18 }),
  );
  app.stage.addChild(world);
  world.addChild(scenery);
  player = new Character(art.outfits.matrix);
  world.addChild(player);
  $("game").prepend(app.canvas);
  app.canvas.setAttribute("aria-hidden", "true");
  ready = true;
  new ResizeObserver(resize).observe($("game"));
  resize();
  $("loading").remove();
  sync();
  app.ticker.maxFPS = 60;
  app.ticker.add((t) => {
    const dt = Math.min(0.04, t.deltaMS / 1000);
    let move = input.move();
    if (move) {
      target = undefined;
      openOnArrival = undefined;
      $("walk-hint").hidden = true;
    }
    if (target !== undefined) {
      const dx = target - x;
      move = Math.sign(dx);
      if (Math.abs(dx) < 160 * dt) {
        x = target;
        move = 0;
        target = undefined;
        const i = openOnArrival;
        openOnArrival = undefined;
        updateView();
        if (i !== undefined) {
          openMemory(i);
          return;
        }
      }
    }
    const before = x;
    x = Math.max(50, Math.min(total - 150, x + move * 160 * dt));
    player.animate(
      Math.abs(x - before) > 0.01 ? "walk" : "idle",
      move === 0 ? player.facing : move > 0 ? 1 : -1,
    );
    player.travel(x - before);
    player.tick(dt, reduced.matches);
    updateView();
    if (input.take("e") && near >= 0) openMemory(near);
    input.end();
  });
}
void start().catch(() => {
  const loading = $("loading");
  if (loading)
    loading.textContent = tr(
      "A caminhada não carregou. A versão em texto está disponível.",
      "The walk could not load. The text version is available.",
    );
  showReading(true);
});
