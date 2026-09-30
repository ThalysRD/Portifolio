export class Dialog {
  readonly element = document.getElementById("panel") as HTMLDialogElement;
  private content = document.getElementById("panel-content")!;
  private trigger: HTMLElement | null = null;
  private timer?: number;
  constructor(private onState: (open: boolean) => void) {
    document.getElementById("close-panel")!.onclick = () => this.close();
    this.element.addEventListener("cancel", (e) => {
      e.preventDefault();
      this.close();
    });
    this.element.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const targets = Array.from(
        this.element.querySelectorAll<HTMLElement>(
          'button:not(:disabled),a[href],input,select,textarea,[tabindex="0"]',
        ),
      ).filter((el) => el.getClientRects().length);
      const first = targets[0],
        last = targets[targets.length - 1];
      if (!first) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
    this.element.addEventListener("click", (e) => {
      if (e.target === this.element) {
        const r = this.element.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          this.close();
      }
    });
    this.element.addEventListener("close", () => {
      clearInterval(this.timer);
      this.onState(false);
      if (
        this.trigger?.isConnected &&
        this.trigger !== document.body &&
        this.trigger.getClientRects().length
      )
        this.trigger.focus();
      else document.getElementById("game")?.focus({ preventScroll: true });
    });
  }
  open(html: string) {
    clearInterval(this.timer);
    if (!this.element.open)
      this.trigger = document.activeElement as HTMLElement;
    this.content.innerHTML = html;
    this.content.classList.remove("world-fade");
    void this.content.offsetWidth;
    this.content.classList.add("world-fade");
    if (!this.element.open) this.element.showModal();
    this.element.scrollTop = 0;
    this.onState(true);
  }
  close() {
    this.element.close();
    this.onState(false);
  }
  type(text: string) {
    const target = this.content.querySelector<HTMLElement>("[data-dialogue]");
    if (!target) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      target.textContent = text;
      return;
    }
    let i = 0;
    this.timer = window.setInterval(() => {
      i += 2;
      target.textContent = text.slice(0, i);
      if (i >= text.length) clearInterval(this.timer);
    }, 20);
  }
}
