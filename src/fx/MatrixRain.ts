import { Container, Text } from "pixi.js";
export class MatrixRain extends Container {
  private drops: Text[] = [];
  private speeds: number[] = [];
  constructor(width: number, height: number) {
    super();
    for (let i = 0; i < 46; i++) {
      const text = new Text({
        text: Array.from({ length: 12 }, (_, j) =>
          (i * 31 + j * 7) % 3 ? "1" : "0",
        ).join("\n"),
        style: {
          fontFamily: "monospace",
          fontSize: 13,
          lineHeight: 19,
          fill: i % 4 ? 0x347349 : 0x80c986,
        },
      });
      text.x = (i / 46) * width;
      text.y = ((i * 137) % height) - height;
      text.alpha = 0.14 + (i % 4) * 0.04;
      this.drops.push(text);
      this.speeds.push(22 + (i % 5) * 11);
      this.addChild(text);
    }
  }
  update(dt: number, width: number, height: number) {
    for (let i = 0; i < this.drops.length; i++) {
      const d = this.drops[i];
      d.x = (i / 46) * width;
      d.y += this.speeds[i] * dt;
      if (d.y > height) d.y = -250;
    }
  }
}
