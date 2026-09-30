import {
  Application,
  Container,
  Graphics,
  Sprite,
  Text,
  Texture,
  Rectangle,
} from "pixi.js";
import { Character } from "../entities/Character";
import { MatrixRain } from "../fx/MatrixRain";
import type { VisualArt } from "../core/visualAssets";
import type { GameArt } from "../core/gameAssets";
import type { GameInput } from "../core/GameInput";
import type { Save } from "../core/save";
import { journey, type Phase } from "../data/journey";
import { themes, themeVisuals } from "../data/themes";
import { skills } from "../data/skills";
import { local, t } from "../core/i18n";
import type { Rect } from "../systems/collision";
export type Action = {
  kind: "portal" | "gate" | "npc" | "goal" | "trophy" | "briefcase";
  id: string;
};
interface Zone extends Action {
  x: number;
  y: number;
  label: string;
  marker: Text;
}
interface Enemy {
  body: Character;
  x: number;
  home: number;
  y: number;
  hp: number;
  max: number;
  cooldown: number;
  boss: boolean;
  bug: boolean;
}
interface Item {
  id: string;
  sprite: Sprite;
  x: number;
  y: number;
  taken: boolean;
  label: Text;
}
export interface GameEvents {
  action: (a: Action) => void;
  near: (text: string) => void;
  skill: (id: string) => void;
  toast: (text: string) => void;
  hud: (
    hp: number,
    slow: boolean,
    round: number,
    aim: number,
    bossHp: number,
    bossNear: boolean,
  ) => void;
  bug: (bug: boolean) => void;
  checkpoint: () => void;
}
export class JourneyGame {
  mode: "boot" | "construct" | "phase" = "boot";
  phase?: Phase;
  projectId?: string;
  paused = false;
  effects = true;
  root = new Container();
  scene = new Container();
  background = new Container();
  player: Character;
  x = 130;
  y = 400;
  vx = 0;
  vy = 0;
  hp = 100;
  grounded = true;
  private width = 2000;
  private floor = 410;
  private platforms: Rect[] = [];
  private zones: Zone[] = [];
  private enemies: Enemy[] = [];
  private items: Item[] = [];
  private rain: MatrixRain;
  private nearby?: Zone;
  private camera = 0;
  private time = 0;
  private attackTimer = 0;
  private cooldown = 0;
  private dodge = 0;
  private hurt = 0;
  private combo = 0;
  private lastAttack = -10;
  private lastMove = "";
  private checkpoint = 130;
  private checkpointSet = false;
  private completedBoss = false;
  private round = 1;
  private goalScore = 0;
  private pulse?: Graphics;
  private reduced = matchMedia("(prefers-reduced-motion: reduce)");
  private hudClock = 0;
  private backdrops: Sprite[] = [];
  private hitStop = 0;
  private hitFlash = new Graphics();
  private hitLife = 0;
  constructor(
    private app: Application,
    private art: GameArt,
    private input: GameInput,
    private save: Save,
    private events: GameEvents,
    private visuals: VisualArt,
  ) {
    this.root.addChild(this.background, this.scene);
    app.stage.addChild(this.root);
    this.player = new Character(
      art.player.loaded ? art.player : visuals.outfits.matrix,
    );
    this.rain = new MatrixRain(1000, 600);
    this.background.addChild(this.rain);
    this.effects = save.data.effects;
    app.ticker.maxFPS = 60;
    app.ticker.add((ticker) =>
      this.update(Math.min(0.04, ticker.deltaMS / 1000)),
    );
    new ResizeObserver(() => this.resize()).observe(app.canvas.parentElement!);
    this.resize();
  }
  resize() {
    const host = this.app.canvas.parentElement!;
    if (!host.clientWidth || !host.clientHeight) return;
    this.app.renderer.resize(host.clientWidth, host.clientHeight);
    this.root.y =
      this.mode === "boot"
        ? 0
        : Math.max(
            0,
            this.app.screen.height - (this.app.screen.width < 760 ? 560 : 490),
          );
    for (const b of this.backdrops) {
      b.height = (this.root.y + this.floor) / 0.8;
      b.width = Math.max(this.app.screen.width + 400, b.height * 1.5);
      b.y = this.floor - b.height * 0.8;
    }
    this.follow(1);
  }
  private clear() {
    this.scene.removeChild(this.player);
    if (this.hitFlash.parent) this.hitFlash.parent.removeChild(this.hitFlash);
    for (const c of this.scene.removeChildren()) c.destroy({ children: true });
    for (const c of this.background.removeChildren()) {
      if (c !== this.rain) c.destroy({ children: true });
    }
    this.backdrops = [];
    this.zones = [];
    this.enemies = [];
    this.items = [];
    this.platforms = [];
    this.nearby = undefined;
    this.events.near("");
    this.pulse = undefined;
    this.vx = this.vy = 0;
    this.hp = 100;
    this.y = this.floor;
    this.grounded = true;
    this.attackTimer = this.cooldown = this.dodge = this.hurt = 0;
    this.input.clear();
    this.events.hud(100, false, 0, 0, 0, false);
    this.checkpointSet = false;
    this.completedBoss = false;
    this.round = 1;
    this.goalScore = 0;
  }
  private label(
    text: string,
    x: number,
    y: number,
    color = 0xb5dcc5,
    size = 14,
  ) {
    const label = new Text({
      text,
      style: {
        fontFamily: "monospace",
        fontSize: size,
        fill: color,
        fontWeight: "bold",
      },
    });
    label.anchor.set(0.5);
    label.position.set(x, y);
    this.scene.addChild(label);
    return label;
  }
  private zone(
    kind: Zone["kind"],
    id: string,
    x: number,
    y: number,
    label: string,
  ) {
    const marker = this.label("◇", x, y - 75, 0xb0efc5, 19);
    this.zones.push({ kind, id, x, y, label, marker });
  }
  construct() {
    this.clear();
    this.mode = "construct";
    this.phase = undefined;
    this.projectId = undefined;
    this.width = Math.max(1800, journey.length * 210 + 420);
    this.x = 200;
    this.checkpoint = 200;
    this.player.setArt(
      this.art.player.loaded ? this.art.player : this.visuals.outfits.matrix,
    );
    this.app.renderer.background.color = 0xe1e8df;
    const g = new Graphics();
    g.rect(0, 0, this.width, 530).fill(0xe1e8df);
    for (let x = 0; x < this.width; x += 55)
      g.moveTo(x, 50)
        .lineTo(x, 500)
        .stroke({ color: 0xb8c9bf, alpha: 0.3, width: 1 });
    for (let y = 80; y < 530; y += 55)
      g.moveTo(0, y)
        .lineTo(this.width, y)
        .stroke({ color: 0xb8c9bf, alpha: 0.3, width: 1 });
    g.rect(0, this.floor, this.width, 100).fill(0xc9d6cb);
    g.rect(0, this.floor, this.width, 3).fill(0xa2b7a6);
    this.scene.addChild(g);
    this.label("THE CONSTRUCT", 215, 112, 0x5c796c, 24);
    this.label(t().select, 215, 148, 0x668372, 12);
    journey
      .slice()
      .sort((a, b) => a.order - b.order)
      .forEach((p, i) => {
        const x = 410 + i * 210,
          done = this.save.data.completed.includes(p.id),
          locked = p.themeId === "final" && !this.unlocked();
        g.rect(x - 43, 237, 86, 173).fill(0xaabdaf);
        g.rect(x - 38, 241, 76, 169).fill(locked ? 0x6f7e70 : 0x1b4436);
        g.rect(x - 29, 250, 58, 159).fill(
          done ? 0x91c99c : locked ? 0x6c7765 : 0x739b7e,
        );
        g.rect(x + 16, 326, 5, 5).fill(0xd9efd1);
        g.rect(x - 51, 410, 102, 8).fill(0xb1c0b0);
        this.label(String(p.order).padStart(2, "0"), x, 206, 0x5d7565, 17);
        this.label(local(p.chapterTitle), x, 448, 0x344f40, 13);
        const env =
          this.visuals.environments[themeVisuals[p.themeId].background];
        const view = new Sprite(
          new Texture({
            source: env.source,
            frame: new Rectangle(env.frame.x + 256, env.frame.y + 20, 200, 400),
          }),
        );
        view.position.set(x - 34, 247);
        view.width = 68;
        view.height = 155;
        view.alpha = locked ? 0.25 : 0.85;
        this.scene.addChild(view);
        this.zone("portal", p.id, x, this.floor, local(p.chapterTitle));
      });
    this.zone("trophy", "trophy", 160, this.floor, t().trophies);
    g.rect(114, 307, 92, 90).fill(0x8c9f8d);
    for (let row = 0; row < 2; row++) {
      g.rect(118, 342 + row * 40, 84, 4).fill(0x3d6651);
      for (let i = 0; i < 3; i++) {
        g.rect(126 + i * 26, 321 + row * 40, 12, 17).fill(0xd3bf80);
        g.rect(124 + i * 26, 339 + row * 40, 16, 4).fill(0xc4ac67);
      }
    }
    this.scene.addChild(this.player);
    this.player.position.set(this.x, this.y);
    this.player.animate("digitize_in");
    this.camera = 0;
    this.resize();
  }
  unlocked() {
    return journey
      .filter((p) => p.themeId !== "final")
      .every((p) => this.save.data.completed.includes(p.id));
  }
  enter(phase: Phase, projectId?: string) {
    this.clear();
    this.mode = "phase";
    this.phase = phase;
    this.projectId = projectId;
    this.width = phase.themeId === "final" ? 1100 : 2300;
    this.x = 130;
    this.player.setArt(
      this.art.player.loaded
        ? this.art.player
        : this.visuals.outfits[themeVisuals[phase.themeId].outfit],
    );
    const saved = this.save.data.checkpoint;
    if (saved?.phase === phase.id)
      this.x = Math.max(130, Math.min(saved.x, this.width - 180));
    this.checkpoint = this.x;
    const theme = themes[phase.themeId];
    this.app.renderer.background.color = theme.background;
    const environmentIndex = themeVisuals[phase.themeId].background;
    const backdrop = new Sprite(this.visuals.environments[environmentIndex]);
    this.scene.addChild(backdrop);
    this.backdrops.push(backdrop);
    const g = new Graphics();
    this.scene.addChild(g);
    this.platforms = [
      { x: 380, y: 335, w: 135, h: 17 },
      { x: 660, y: 280, w: 130, h: 17 },
      { x: 1000, y: 337, w: 150, h: 17 },
      { x: 1540, y: 325, w: 160, h: 17 },
      { x: 1840, y: 350, w: 130, h: 17 },
    ];
    if (["origin", "ranking", "ring", "final"].includes(phase.themeId))
      this.platforms = [];
    for (const p of this.platforms) {
      if (environmentIndex === 4) {
        g.rect(p.x + 10, p.y + p.h, 9, this.floor - p.y - p.h)
          .rect(p.x + p.w - 19, p.y + p.h, 9, this.floor - p.y - p.h)
          .fill(0x85988c);
      }
      g.rect(p.x, p.y, p.w, p.h).fill(0x25382e);
      g.rect(p.x, p.y, p.w, 4).fill(theme.accent);
      g.rect(p.x + 5, p.y + 6, p.w - 10, 3).fill({
        color: theme.accent,
        alpha: 0.3,
      });
      g.rect(p.x + 8, p.y + p.h, 6, 11).fill(theme.far);
    }
    phase.skillIds.forEach((id, i) => {
      const x = phase.themeId === "ring" ? 440 + i * 190 : 470 + i * 350,
        y = environmentIndex === 4 || i % 2 === 0 ? this.floor - 24 : 250;
      const taken = this.save.data.skills.includes(id);
      const s = new Sprite(this.art.star);
      s.anchor.set(0.5, 1);
      s.position.set(x, y);
      s.visible = !taken;
      this.scene.addChild(s);
      const skill = skills.find((s) => s.id === id);
      const label = this.label(skill?.name ?? id, x, y - 57, theme.accent, 13);
      label.visible = !taken;
      this.items.push({ id, x, y, sprite: s, taken, label });
    });
    if (theme.enemy) {
      const boss = theme.enemy === "boss";
      for (let i = 0; i < (boss ? 1 : 3); i++) {
        const x = boss ? 1500 : 770 + i * 480,
          kind = boss ? "boss" : theme.enemy === "bug" ? "bug" : "agent";
        const body = new Character(
          this.art[kind].loaded || kind === "bug"
            ? this.art[kind]
            : this.visuals.outfits.matrix,
          boss ? 1.25 : 1,
        );
        if (kind !== "bug") body.tint = boss ? 0xa6c4d9 : 0x83bd92;
        body.position.set(x, this.floor);
        this.scene.addChild(body);
        this.enemies.push({
          body,
          x,
          home: x,
          y: this.floor,
          hp: boss ? 13 : 3,
          max: boss ? 13 : 3,
          cooldown: 0,
          boss,
          bug: kind === "bug",
        });
      }
    }
    if (phase.themeId === "camp") {
      this.pulse = new Graphics()
        .poly([1060, 400, 1073, 359, 1080, 381, 1092, 348, 1100, 400])
        .fill(0xefa353);
      this.scene.addChild(this.pulse);
      const npc = new Character(
        this.art.npc.loaded ? this.art.npc : this.visuals.outfits.cowboy,
        0.95,
      );
      npc.position.set(1160, this.floor);
      this.scene.addChild(npc);
      this.zone("npc", phase.id, 1160, this.floor, t().about);
    }
    if (phase.themeId === "ranking") {
      g.rect(1320, 325, 6, 85)
        .rect(1320, 325, 85, 5)
        .rect(1399, 325, 6, 85)
        .fill(0xbce7dd);
      for (let j = 0; j < 7; j++)
        g.rect(1325 + j * 11, 330, 1, 80).fill({
          color: 0xc0e5da,
          alpha: 0.35,
        });
      g.circle(1100, 400, 10).fill(0xebeedb);
      this.zone("goal", phase.id, 1100, this.floor, t().goal);
    }
    if (phase.themeId === "ring") {
      for (const y of [313, 342, 371])
        g.rect(260, y, 1650, 2).fill({ color: theme.accent, alpha: 0.5 });
      g.rect(270, 290, 10, 120).rect(1890, 290, 10, 120).fill(0x8eb5ba);
      this.label(t().boss, 1490, 207, theme.accent, 23);
    }
    if (phase.themeId === "crew") {
      for (let i = 0; i < 5; i++) {
        g.rect(1100 + i * 35, 397, 29, 13).fill(0x998565);
        g.rect(1100 + i * 35, 375, 4, 23).fill(0xb3a16c);
      }
      g.rect(850, 140, 250, 150).fill({ color: 0xd9c58a, alpha: 0.13 });
      this.label("⚑", 970, 218, theme.accent, 55);
    }
    const end = this.width - 160;
    if (phase.themeId === "final") {
      g.rect(end - 34, 371, 68, 39).fill(0x766232);
      g.rect(end - 13, 360, 26, 12).fill(0xb8a56a);
      this.pulse = new Graphics()
        .ellipse(end, 378, 100, 25)
        .fill({ color: 0xf2d58b, alpha: 0.18 });
      this.scene.addChild(this.pulse);
      this.zone("briefcase", phase.id, end, this.floor, t().finalTitle);
    } else {
      g.rect(end - 31, 285, 62, 125).fill(theme.mid);
      g.rect(end - 26, 290, 52, 120).fill({ color: theme.accent, alpha: 0.5 });
      g.rect(end - 18, 297, 36, 113).fill({ color: 0xffffff, alpha: 0.15 });
      this.zone("gate", phase.id, end, this.floor, t().finish);
    }
    this.scene.addChild(this.player);
    this.player.position.set(this.x, this.y);
    this.camera = -this.x + 200;
    this.resize();
  }
  languageChanged() {
    if (this.mode === "construct") this.construct();
    else if (this.phase) this.enter(this.phase, this.projectId);
  }
  private follow(amount: number) {
    const target = Math.max(
      Math.min(0, this.app.screen.width - this.width),
      Math.min(0, this.app.screen.width * 0.35 - this.x),
    );
    this.camera += (target - this.camera) * amount;
    this.scene.x = Math.round(
      this.camera +
        (this.effects && !this.reduced.matches && this.hitLife > 0
          ? Math.sin(this.time * 170) * this.hitLife * 13
          : 0),
    );
    for (const b of this.backdrops)
      b.x =
        -this.scene.x +
        Math.max(this.app.screen.width - b.width, this.camera * 0.15);
  }
  private absorb(id: string) {
    if (this.save.add("skills", id)) this.events.skill(id);
  }
  private attack(kind: string) {
    if (this.cooldown > 0) return;
    this.cooldown = kind === "jab" ? 0.25 : 0.38;
    this.attackTimer = kind === "jab" ? 0.24 : 0.32;
    this.player.animate(kind);
    const timing = this.time - this.lastAttack;
    this.combo =
      timing > 0.16 && timing < 0.8 && kind !== this.lastMove
        ? Math.min(4, this.combo + 1)
        : 1;
    this.lastAttack = this.time;
    this.lastMove = kind;
    const reach = kind === "kick" ? 125 : kind === "knee" ? 80 : 95;
    for (const e of this.enemies) {
      if (
        e.hp <= 0 ||
        Math.abs(e.x - this.x) > reach ||
        Math.abs(e.y - this.y) > 65 ||
        (e.x - this.x) * this.player.facing < 0
      )
        continue;
      e.hp = Math.max(e.boss ? 1 : 0, e.hp - (this.combo >= 3 ? 2 : 1));
      e.body.tint = 0xbee4b5;
      e.cooldown = 0.6;
      this.hitStop = 0.055;
      this.hitLife = 0.18;
      this.hitFlash
        .clear()
        .star(e.x, this.y - 75, 7, 25, 7)
        .fill({ color: 0xf9e4a0, alpha: 0.9 });
      this.scene.addChild(this.hitFlash);
      if (e.boss) {
        this.round = Math.min(4, 1 + Math.floor((e.max - e.hp) / 3));
        if (e.hp === 1) this.events.toast(t().qte);
      }
      if (e.hp === 0) {
        e.body.visible = false;
        this.events.bug(e.bug);
        const list = this.phase?.skillIds ?? [];
        const next = list.find((id) => !this.save.data.skills.includes(id));
        if (next) this.absorb(next);
      }
    }
  }
  private update(dt: number) {
    if (this.paused) return;
    this.time += dt;
    if (this.hitStop > 0) {
      this.hitStop -= dt;
      return;
    }
    this.hitLife = Math.max(0, this.hitLife - dt);
    this.hitFlash.visible = this.hitLife > 0;
    this.hitFlash.alpha = this.hitLife / 0.18;
    this.player.tick(dt, this.reduced.matches);
    if (this.mode === "boot") {
      if (this.effects && !this.reduced.matches)
        this.rain.update(dt, this.app.screen.width, this.app.screen.height);
      this.rain.visible = this.effects;
      return;
    }
    const slow = this.input.is("shift");
    const wd = dt * (slow ? 0.28 : 1);
    this.cooldown = Math.max(0, this.cooldown - dt);
    this.attackTimer = Math.max(0, this.attackTimer - dt);
    this.dodge = Math.max(0, this.dodge - dt);
    this.hurt = Math.max(0, this.hurt - dt);
    if (this.input.take("j")) this.attack("jab");
    if (this.input.take("k")) this.attack("kick");
    if (this.input.take("l")) this.attack("knee");
    if (this.input.take("i")) this.attack("elbow");
    if (this.input.take("x") && this.dodge <= 0) this.dodge = 0.28;
    const move = this.input.move();
    if (move) this.player.facing = move > 0 ? 1 : -1;
    this.vx =
      this.dodge > 0
        ? this.player.facing * 440
        : move * (this.input.is("shift") ? 185 : 210);
    if (this.input.take(" ", "w", "arrowup") && this.grounded) {
      this.vy = -475;
      this.grounded = false;
    }
    const previousX = this.x;
    this.x = Math.max(25, Math.min(this.width - 30, this.x + this.vx * dt));
    const before = this.y;
    this.vy += 1050 * dt;
    this.y += this.vy * dt;
    this.grounded = false;
    if (this.y >= this.floor) {
      this.y = this.floor;
      this.vy = 0;
      this.grounded = true;
    }
    if (this.vy >= 0) {
      for (const p of this.platforms) {
        if (
          this.x + 12 > p.x &&
          this.x - 12 < p.x + p.w &&
          before <= p.y + 2 &&
          this.y >= p.y
        ) {
          this.y = p.y;
          this.vy = 0;
          this.grounded = true;
          break;
        }
      }
    }
    if (this.attackTimer <= 0)
      this.player.animate(
        this.hurt > 0
          ? "hurt"
          : this.dodge > 0
            ? "dodge"
            : this.input.is("c")
              ? "block"
              : !this.grounded
                ? this.vy < 0
                  ? "jump"
                  : "fall"
                : move && Math.abs(this.x - previousX) > 0.01
                  ? "walk"
                  : "idle",
        this.player.facing,
      );
    this.player.travel(this.x - previousX);
    this.player.position.set(Math.round(this.x), Math.round(this.y));
    this.player.alpha = this.hurt > 0 && !this.reduced.matches ? 0.6 : 1;
    this.follow(this.reduced.matches ? 1 : 1 - Math.exp(-9 * dt));
    for (const e of this.enemies) {
      if (e.hp <= 0) continue;
      e.cooldown -= wd;
      e.body.tint = e.cooldown > 0.3 ? 0xbee4b5 : 0xffffff;
      if (e.boss && e.hp === 1) {
        e.body.animate("block");
        continue;
      }
      const previousEnemyX = e.x;
      const dx = this.x - e.x;
      if (Math.abs(dx) < 370 && Math.abs(dx) > 43)
        e.x += Math.sign(dx) * (e.boss ? 48 : 60) * wd;
      else if (Math.abs(dx) >= 370)
        e.x = e.home + Math.sin(this.time * 0.8 + e.home) * 28;
      e.body.position.x = Math.round(e.x);
      e.body.animate(Math.abs(dx) > 43 ? "walk" : "jab", dx > 0 ? 1 : -1);
      e.body.travel(e.x - previousEnemyX);
      e.body.tick(dt, this.reduced.matches);
      if (
        Math.abs(dx) < 53 &&
        Math.abs(this.y - e.y) < 60 &&
        e.cooldown <= 0 &&
        this.dodge <= 0 &&
        this.hurt <= 0
      ) {
        e.cooldown = 1.2;
        if (!this.save.data.easy) {
          this.hp = Math.max(0, this.hp - (this.input.is("c") ? 2 : 12));
          this.hurt = 0.55;
          if (this.hp <= 0) {
            this.x = this.checkpoint;
            this.y = this.floor;
            this.hp = 100;
            this.events.toast(t().recover);
          }
        }
      }
    }
    const senses = this.input.is("q");
    for (const item of this.items) {
      if (item.taken) continue;
      item.sprite.y =
        item.y +
        (this.reduced.matches ? 0 : Math.sin(this.time * 3 + item.x) * 4);
      item.label.visible = senses || Math.abs(item.x - this.x) < 170;
      item.sprite.tint = senses ? 0xffff9a : 0xffffff;
      if (
        Math.abs(item.x - this.x) < 35 &&
        Math.abs(item.y - (this.y - 24)) < 55
      ) {
        item.taken = true;
        item.sprite.visible = item.label.visible = false;
        this.absorb(item.id);
      }
    }
    let nearest: Zone | undefined;
    for (const z of this.zones) {
      z.marker.alpha = senses ? 1 : 0.65;
      z.marker.y =
        z.y - 75 + (this.reduced.matches ? 0 : Math.sin(this.time * 2) * 3);
      if (Math.abs(this.x - z.x) < 58 && Math.abs(this.y - z.y) < 80)
        nearest = z;
    }
    if (nearest !== this.nearby) {
      this.nearby = nearest;
      this.events.near(nearest ? `${t().interact} · ${nearest.label}` : "");
    }
    if (this.input.take("e")) {
      const boss = this.enemies.find(
        (e) => e.boss && e.hp === 1 && Math.abs(e.x - this.x) < 160,
      );
      if (boss) {
        boss.hp = 0;
        boss.body.visible = false;
        this.completedBoss = true;
        this.events.toast(t().complete);
        this.absorb("git");
      } else if (nearest) {
        if (
          nearest.kind === "gate" &&
          this.phase?.themeId === "ring" &&
          !this.completedBoss
        )
          this.events.toast(t().boss + " · " + t().attack);
        else if (nearest.kind === "goal") {
          if (
            (Math.sin(this.time * 2.4) + 1) / 2 > 0.35 &&
            (Math.sin(this.time * 2.4) + 1) / 2 < 0.68
          ) {
            const id = skills[this.goalScore % skills.length].id;
            this.goalScore++;
            this.absorb(id);
            this.events.toast(t().scored);
          } else this.events.toast(t().missed);
        } else this.events.action(nearest);
      }
    }
    if (this.phase && !this.checkpointSet && this.x > this.width / 2) {
      this.checkpointSet = true;
      this.checkpoint = this.x;
      this.save.data.checkpoint = { phase: this.phase.id, x: this.x };
      this.save.write();
      this.events.checkpoint();
    }
    if (this.pulse)
      this.pulse.alpha = this.reduced.matches
        ? 0.8
        : 0.7 + Math.sin(this.time * 4) * 0.25;
    this.hudClock += dt;
    if (this.hudClock > 0.15) {
      this.hudClock = 0;
      let bossHp = 0,
        bossNear = false;
      for (const e of this.enemies)
        if (e.boss) {
          bossHp = e.hp;
          bossNear = Math.abs(e.x - this.x) < 120;
        }
      this.events.hud(
        this.hp,
        slow,
        this.phase?.themeId === "ring" ? this.round : 0,
        (Math.sin(this.time * 2.4) + 1) / 2,
        bossHp,
        bossNear,
      );
    }
    this.input.end();
  }
  trigger() {
    this.input.pressed.add("e");
  }
}
