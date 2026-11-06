// Revelar seções ao rolar
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Chuva de código discreta no fundo do hero
const canvas = document.getElementById("rain");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (canvas && !reduced) {
  const ctx = canvas.getContext("2d");
  const glyphs = "アイウエオカキクケコサシスセソ0123456789{}<>/=;$#ﾊﾐﾋｰｳｼﾅﾓﾆ";
  const size = 16;
  let cols, drops;

  const resize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    cols = Math.ceil(canvas.width / size);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
  };
  resize();
  addEventListener("resize", resize);

  let last = 0;
  const draw = (t) => {
    requestAnimationFrame(draw);
    if (t - last < 60) return; // ~16 fps, leve
    last = t;
    ctx.fillStyle = "rgba(7, 9, 12, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${size}px monospace`;
    for (let i = 0; i < cols; i++) {
      const y = drops[i] * size;
      ctx.fillStyle = Math.random() > 0.97 ? "#7dffd0" : "#1f8f68";
      ctx.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * size, y);
      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 1;
    }
  };
  requestAnimationFrame(draw);
}

// Vídeo só carrega o player do YouTube quando a pessoa clica (página mais leve, sem cookies antes do clique)
document.querySelectorAll(".video[data-video]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.video;
    const frame = document.createElement("iframe");
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    frame.title = "Zé Resolve · demo narrada";
    frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    const box = document.createElement("div");
    box.className = "video playing";
    box.append(frame);
    btn.replaceWith(box);
    frame.focus();
  }, { once: true });
});
