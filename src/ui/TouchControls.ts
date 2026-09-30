import type { GameInput } from "../core/GameInput";
export function touchControls(input: GameInput) {
  const pad = document.getElementById("joystick")!,
    stick = document.getElementById("stick")!;
  let pointer: number | undefined;
  const move = (e: PointerEvent) => {
    if (pointer !== e.pointerId) return;
    const r = pad.getBoundingClientRect();
    const x = Math.max(-28, Math.min(28, e.clientX - r.left - r.width / 2));
    input.axis = x / 28;
    stick.style.transform = `translateX(${x}px)`;
  };
  pad.addEventListener("pointerdown", (e) => {
    if (pointer !== undefined) return;
    pointer = e.pointerId;
    pad.setPointerCapture(pointer);
    move(e);
  });
  pad.addEventListener("pointermove", move);
  const end = () => {
    pointer = undefined;
    input.axis = 0;
    stick.style.transform = "";
  };
  pad.addEventListener("pointerup", end);
  pad.addEventListener("pointercancel", end);
  pad.addEventListener("lostpointercapture", end);
  window.addEventListener("blur", end);
  document.querySelectorAll<HTMLButtonElement>("[data-touch]").forEach((b) => {
    const key = b.dataset.touch!;
    const up = () => input.keys.delete(key);
    b.addEventListener("pointerdown", (e) => {
      if (!input.enabled) return;
      e.preventDefault();
      b.setPointerCapture(e.pointerId);
      input.keys.add(key);
      input.pressed.add(key);
    });
    b.addEventListener("pointerup", up);
    b.addEventListener("pointercancel", up);
    b.addEventListener("lostpointercapture", up);
  });
}
