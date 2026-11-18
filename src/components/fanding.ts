const root = document.querySelector<HTMLElement>("[data-fanding]");

if (root) {
  const slides = Array.from(root.querySelectorAll<HTMLElement>("[data-slide]"));
  const length = slides.length;
  const half = Math.floor(length / 2);
  let currentIndex = 0;
  let prevIndex = 0;

  const getOffset = (index: number, current: number) =>
    ((index - current + length + half) % length) - half;

  const render = () => {
    slides.forEach((slide, index) => {
      const offset = getOffset(index, currentIndex);
      const prevOffset = getOffset(index, prevIndex);
      const distance = Math.abs(offset);

      if (Math.abs(offset - prevOffset) > 1) {
        slide.classList.add("no-transition");
        void slide.offsetWidth;
        requestAnimationFrame(() => slide.classList.remove("no-transition"));
      }

      slide.style.setProperty("--offset", String(offset));
      slide.style.setProperty(
        "--scale",
        String(distance === 0 ? 1.5 : distance === 1 ? 0.9 : 0.75),
      );
      slide.style.setProperty(
        "--shade",
        String(distance === 0 ? 0 : distance === 1 ? 0.45 : 0.75),
      );
      slide.style.setProperty("--z-index", String(length - distance));
      slide.style.opacity = distance <= 2 ? "1" : "0";
    });
    prevIndex = currentIndex;
  };

  const go = (next: number) => {
    currentIndex = (next + length) % length;
    render();
  };

  root.querySelector("[data-next]")?.addEventListener("click", () => {
    go(currentIndex + 1);
  });
  root.querySelector("[data-prev]")?.addEventListener("click", () => {
    go(currentIndex - 1);
  });

  window.setInterval(() => go(currentIndex + 1), 5000);
}
