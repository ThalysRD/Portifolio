import { Assets, Rectangle, Texture, type Spritesheet } from "pixi.js";
import { assetManifest } from "./assetManifest";
export interface CharacterArt {
  frames: Record<string, Texture[]>;
  loaded: boolean;
  displayHeight?: number;
  footAnchor?: number;
  walkCycleDistance?: number;
  walkStartFrame?: number;
  idleFps?: number;
  idleGesture?: { name: string; delay: number; fps: number };
}
export interface GameArt {
  player: CharacterArt;
  agent: CharacterArt;
  bug: CharacterArt;
  boss: CharacterArt;
  npc: CharacterArt;
  star: Texture;
}
export async function loadGameArt(
  progress: (n: number) => void,
): Promise<GameArt> {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const c = canvas.getContext("2d")!;
  const r = (x: number, y: number, w: number, h: number, color: string) => {
    c.fillStyle = color;
    c.fillRect(x, y, w, h);
  };
  const person = (
    x: number,
    shirt: string,
    skin = "#b99176",
    hair = "#162322",
  ) => {
    r(x + 25, 18, 16, 19, skin);
    r(x + 22, 12, 22, 12, hair);
    r(x + 21, 18, 8, 12, hair);
    r(x + 38, 27, 3, 3, "#07140f");
    r(x + 20, 37, 26, 20, shirt);
    r(x + 15, 38, 5, 16, skin);
    r(x + 46, 38, 5, 16, skin);
    r(x + 22, 57, 9, 7, "#0a1818");
    r(x + 37, 57, 9, 7, "#0a1818");
    r(x + 20, 62, 12, 2, "#aecfc5");
    r(x + 37, 62, 12, 2, "#aecfc5");
    r(x + 27, 43, 10, 3, "#a9f797");
  };
  person(0, "#4a7668");
  person(64, "#283b39", "#c7ac90");
  person(128, "#777c71", "#c5c9b5", "#b7c4ba");
  person(192, "#446a83", "#bb9881", "#354959");
  r(266, 30, 38, 22, "#091e12");
  r(270, 26, 30, 26, "#72a95e");
  r(267, 38, 7, 9, "#b5e983");
  r(296, 38, 7, 9, "#b5e983");
  r(275, 33, 4, 4, "#142b16");
  r(290, 33, 4, 4, "#142b16");
  for (let i = 0; i < 3; i++) {
    r(260, 31 + i * 9, 8, 3, "#679257");
    r(304, 31 + i * 9, 8, 3, "#679257");
  }
  r(338, 17, 6, 26, "#76e9ac");
  r(328, 27, 26, 6, "#76e9ac");
  r(337, 25, 8, 10, "#e3ffe7");
  progress(20);
  const atlas = await Assets.load<Texture>({
    src: canvas.toDataURL(),
    parser: "loadTextures",
  });
  atlas.source.scaleMode = "nearest";
  const texture = (x: number) =>
    new Texture({ source: atlas.source, frame: new Rectangle(x, 0, 64, 64) });
  const kinds = ["player", "agent", "npc", "boss", "bug"] as const;
  const offsets = { player: 0, agent: 64, npc: 128, boss: 192, bug: 256 };
  const loaded = {} as Omit<GameArt, "star">;
  await Promise.all(
    kinds.map(async (kind, i) => {
      const fallback = texture(offsets[kind]);
      const frames = Object.fromEntries(
        assetManifest.animations.map((a) => [a, [fallback]]),
      );
      loaded[kind] = { frames, loaded: false };
      // The presence index is produced by Vite. Missing optional files never trigger network 404s.
      if (__AVAILABLE_ASSETS__.includes(assetManifest[kind])) {
        try {
          const sheet = await Assets.load<Spritesheet>(
            new URL(assetManifest[kind], document.baseURI).href,
          );
          if (sheet.animations?.idle?.length) {
            for (const a of assetManifest.animations)
              frames[a] = sheet.animations[a]?.length
                ? sheet.animations[a]
                : sheet.animations.idle;
            Object.values(sheet.textures).forEach(
              (t) => (t.source.scaleMode = "nearest"),
            );
            loaded[kind].loaded = true;
          }
        } catch {
          /* Optional replacements retain the procedural character if invalid. */
        }
      }
      progress(30 + (i + 1) * 12);
    }),
  );
  return { ...loaded, star: texture(320) };
}
