export class GameInput {
  keys = new Set<string>();
  pressed = new Set<string>();
  axis = 0;
  enabled = true;
  constructor() {
    window.addEventListener("keydown", (e) => {
      if (
        !this.enabled ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        (e.target as HTMLElement).matches("input,textarea,select")
      )
        return;
      const k = e.key.toLowerCase();
      if (k === " " && (e.target as HTMLElement).closest("button,a")) return;
      if (
        [
          " ",
          "arrowup",
          "arrowdown",
          "arrowleft",
          "arrowright",
          "shift",
          "a",
          "d",
          "w",
          "e",
          "q",
          "j",
          "k",
          "l",
          "i",
          "c",
          "x",
        ].includes(k)
      ) {
        e.preventDefault();
        if (!this.keys.has(k)) this.pressed.add(k);
        this.keys.add(k);
      }
    });
    window.addEventListener("keyup", (e) =>
      this.keys.delete(e.key.toLowerCase()),
    );
    window.addEventListener("blur", () => this.clear());
  }
  clear() {
    this.keys.clear();
    this.pressed.clear();
    this.axis = 0;
  }
  is(a: string, b?: string) {
    return this.enabled && (this.keys.has(a) || (!!b && this.keys.has(b)));
  }
  take(a: string, b?: string, c?: string) {
    return (
      this.enabled &&
      (this.pressed.delete(a) ||
        (!!b && this.pressed.delete(b)) ||
        (!!c && this.pressed.delete(c)))
    );
  }
  move() {
    return this.enabled
      ? Math.max(
          -1,
          Math.min(
            1,
            Number(this.is("d", "arrowright")) -
              Number(this.is("a", "arrowleft")) +
              this.axis,
          ),
        )
      : 0;
  }
  end() {
    this.pressed.clear();
  }
}
