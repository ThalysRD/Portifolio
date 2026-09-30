export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
export function overlaps(a: Rect, b: Rect): boolean {
  return (
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  );
}
export function canMove(
  x: number,
  y: number,
  walls: Rect[],
  width: number,
  height: number,
): boolean {
  return (
    x > 24 &&
    y > 24 &&
    x < width - 24 &&
    y < height - 24 &&
    !walls.some((w) => overlaps({ x: x - 8, y: y - 5, w: 16, h: 12 }, w))
  );
}
