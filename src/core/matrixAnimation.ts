import { Container, Rectangle, Sprite, Texture, type Renderer } from "pixi.js";
import type { CharacterArt } from "./gameAssets";

export const MATRIX_FRAME_COUNT = 24;
export const MATRIX_FRAME_WIDTH = 192;
export const MATRIX_FRAME_HEIGHT = 280;
const BASELINE = 268;
const STRIDE = 88;
const STANCE = 0.6;
type Point = { x: number; y: number };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// One foot remains planted while the opposite foot travels forward above the ground.
// The stance moves backwards at constant speed, cancelling the character's world speed.
export function walkingFoot(phase: number): Point {
  const p = ((phase % 1) + 1) % 1;
  if (p < STANCE) return { x: STRIDE / 2 - (p / STANCE) * STRIDE, y: BASELINE };
  const t = (p - STANCE) / (1 - STANCE);
  const eased = t * t * (3 - 2 * t);
  return {
    x: lerp(-STRIDE / 2, STRIDE / 2, eased),
    y: BASELINE - 24 * Math.sin(Math.PI * t),
  };
}

function kneeBetween(hip: Point, ankle: Point): Point {
  const dx = ankle.x - hip.x,
    dy = ankle.y - hip.y;
  const distance = Math.max(0.01, Math.hypot(dx, dy));
  const half = Math.min(distance / 2, 55.9);
  const bend = Math.sqrt(Math.max(0, 56 * 56 - half * half));
  return {
    x: hip.x + dx / 2 + (dy / distance) * bend,
    y: hip.y + dy / 2 - (dx / distance) * bend,
  };
}

export function createMatrixAnimation(
  renderer: Renderer,
  atlas: Texture,
): CharacterArt {
  atlas.source.scaleMode = "nearest";
  // Measured component bounds, not approximate equal cells or per-frame rescaling.
  const bounds = [
    [47, 23, 326, 477],
    [512, 92, 163, 375],
    [909, 88, 121, 410],
    [1198, 187, 308, 289],
    [116, 537, 178, 438],
    [523, 553, 149, 403],
    [835, 767, 270, 175],
    [1252, 521, 257, 486],
  ];
  const textures = bounds.map(
    ([x, y, w, h]) =>
      new Texture({ source: atlas.source, frame: new Rectangle(x, y, w, h) }),
  );
  const rig = new Container();
  const sprite = (part: number, w: number, h: number, tint = 0xffffff) => {
    const s = new Sprite(textures[part]);
    s.width = w;
    s.height = h;
    s.tint = tint;
    rig.addChild(s);
    return s;
  };
  const farTail = sprite(7, 31, 107, 0xaaaaaa);
  farTail.anchor.set(0.5, 0);
  const limb = (part: number, width: number, tint: number) => {
    const s = sprite(part, width, 56, tint);
    s.anchor.set(0.5, 0.035);
    return s;
  };
  const farThigh = limb(4, 26, 0xaaaaaa),
    farShin = limb(5, 23, 0xaaaaaa);
  const farBoot = sprite(6, 36, 24, 0xaaaaaa);
  farBoot.anchor.set(0.27, 1);
  const nearTail = sprite(7, 35, 111);
  nearTail.anchor.set(0.5, 0);
  const nearThigh = limb(4, 29, 0xffffff),
    nearShin = limb(5, 25, 0xffffff);
  const nearBoot = sprite(6, 38, 25);
  nearBoot.anchor.set(0.27, 1);
  const pelvis = sprite(3, 57, 36);
  pelvis.anchor.set(0.5, 0);
  const farUpper = limb(1, 17, 0xaaaaaa),
    farLower = limb(2, 13, 0xaaaaaa);
  const torso = sprite(0, 86, 130);
  torso.anchor.set(0.5, 1);
  const nearUpper = limb(1, 21, 0xffffff),
    nearLower = limb(2, 15, 0xffffff);

  function segment(s: Sprite, from: Point, to: Point) {
    s.position.set(from.x, from.y);
    s.height = Math.hypot(to.x - from.x, to.y - from.y) + 5;
    s.rotation = Math.atan2(to.y - from.y, to.x - from.x) - Math.PI / 2;
  }
  function leg(
    thigh: Sprite,
    shin: Sprite,
    boot: Sprite,
    hip: Point,
    foot: Point,
  ) {
    const ankle = { x: foot.x, y: foot.y - 20 };
    const knee = kneeBetween(hip, ankle);
    segment(thigh, hip, knee);
    segment(shin, knee, ankle);
    boot.position.set(foot.x, foot.y);
    boot.rotation = 0;
  }
  function arm(upper: Sprite, lower: Sprite, shoulder: Point, swing: number) {
    const elbow = {
      x: shoulder.x + Math.sin(swing) * 43,
      y: shoulder.y + Math.cos(swing) * 43,
    };
    const hand = {
      x: elbow.x + Math.sin(swing + 0.12) * 44,
      y: elbow.y + Math.cos(swing + 0.12) * 44,
    };
    segment(upper, shoulder, elbow);
    segment(lower, elbow, hand);
  }
  function pose(phase: number, walk: boolean) {
    const cycle = phase * Math.PI * 2;
    const bob = walk ? -1.4 * Math.cos(cycle * 2) : -0.65 * Math.sin(cycle);
    const hipY = 138 + bob;
    const near = walk ? walkingFoot(phase) : { x: 13, y: BASELINE };
    const far = walk ? walkingFoot(phase + 0.5) : { x: -12, y: BASELINE };
    leg(
      farThigh,
      farShin,
      farBoot,
      { x: 93, y: hipY },
      { x: 96 + far.x, y: far.y },
    );
    leg(
      nearThigh,
      nearShin,
      nearBoot,
      { x: 101, y: hipY },
      { x: 96 + near.x, y: near.y },
    );
    pelvis.position.set(97, 125 + bob);
    farTail.position.set(123, 130 + bob);
    nearTail.position.set(68, 127 + bob);
    farTail.rotation = walk
      ? 0.08 + 0.06 * Math.sin(cycle - 0.8)
      : -0.045 + 0.012 * Math.sin(cycle);
    nearTail.rotation = walk
      ? 0.17 + 0.075 * Math.sin(cycle - 0.5)
      : 0.06 + 0.016 * Math.sin(cycle + 0.4);
    torso.position.set(94, 137 + bob);
    // Arm opposing the near leg is in front when that leg trails.
    const nearSwing = walk ? (-near.x / 44) * 0.44 : 0.025 * Math.sin(cycle);
    const farSwing = walk ? (-far.x / 44) * 0.44 : -0.025 * Math.sin(cycle);
    arm(farUpper, farLower, { x: 121, y: 70 + bob }, farSwing);
    arm(nearUpper, nearLower, { x: 67, y: 69 + bob }, nearSwing);
  }
  const renderCycle = (walk: boolean) =>
    Array.from({ length: MATRIX_FRAME_COUNT }, (_, i) => {
      pose(i / MATRIX_FRAME_COUNT, walk);
      const texture = renderer.generateTexture({
        target: rig,
        frame: new Rectangle(0, 0, MATRIX_FRAME_WIDTH, MATRIX_FRAME_HEIGHT),
        resolution: 1,
        antialias: false,
      });
      texture.source.scaleMode = "nearest";
      return texture;
    });
  const idle = renderCycle(false),
    walk = renderCycle(true);
  rig.destroy({ children: true });
  return {
    loaded: true,
    displayHeight: 190,
    footAnchor: BASELINE / MATRIX_FRAME_HEIGHT,
    // Equivalent world distance to the fixed planted-foot displacement in one cycle.
    walkCycleDistance: ((STRIDE / STANCE) * 190) / MATRIX_FRAME_HEIGHT,
    idleFps: 10,
    frames: {
      idle,
      walk,
      run: walk,
      jump: [idle[0]],
      fall: [idle[0]],
      jab: [idle[0]],
      kick: [idle[0]],
      knee: [idle[0]],
      elbow: [idle[0]],
      block: [idle[0]],
      dodge: [idle[0]],
      hurt: [idle[0]],
      defeat: [idle[0]],
      digitize_in: [idle[0]],
      digitize_out: [idle[0]],
    },
  };
}
