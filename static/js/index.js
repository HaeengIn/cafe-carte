const profiles = document.querySelectorAll(".members-list a.profile");
const memberName = document.getElementById("memberName");

profiles.forEach((profile) => {
  profile.addEventListener("mouseenter", () => {
    memberName.textContent = profile.dataset.name;
    memberName.className = `member-name ${profile.dataset.en}`;
  });

  profile.addEventListener("mouseleave", () => {
    memberName.textContent = "";
    memberName.className = "member-name";
  });
});

// Fanding Carousel

const carousel = document.getElementById("fandingCarousel");

if (carousel) {
  const imageCount = 5;

  const images = Array.from(
    { length: imageCount },
    (_, index) =>
      `https://static.cafe-carte.fans/img/cafe-carte/fanding/${index + 1}.jpg`,
  );

  let currentIndex = 0;

  const slides = images.map((src, index) => {
    const slide = document.createElement("div");
    slide.className = "fanding-carousel-slide";

    const image = document.createElement("img");
    image.src = src;
    image.alt = `팬딩 이미지 ${index + 1}`;
    image.draggable = false;

    slide.appendChild(image);
    carousel.appendChild(slide);

    return slide;
  });

  function updateSlides(animate = true) {
    const length = slides.length;
    const half = Math.floor(length / 2);

    slides.forEach((slide, index) => {
      const previousOffset = Number(slide.dataset.offset ?? 0);

      const offset = ((index - currentIndex + length + half) % length) - half;

      const distance = Math.abs(offset);

      const scale = distance === 0 ? 1.5 : distance === 1 ? 0.9 : 0.75;

      const shade = distance === 0 ? 0 : distance === 1 ? 0.45 : 0.75;

      const zIndex = length - distance;

      if (animate && Math.abs(offset - previousOffset) > 1) {
        slide.classList.add("no-transition");
      }

      slide.dataset.offset = offset;

      slide.style.setProperty("--offset", offset);
      slide.style.setProperty("--scale", scale);
      slide.style.setProperty("--shade", shade);
      slide.style.setProperty("--z-index", zIndex);

      slide.style.opacity = distance <= 2 ? "1" : "0";
    });

    if (animate) {
      void carousel.offsetWidth;

      requestAnimationFrame(() => {
        slides.forEach((slide) => {
          slide.classList.remove("no-transition");
        });
      });
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;

    updateSlides();
  }

  document.getElementById("carouselNext").addEventListener("click", nextSlide);

  document.getElementById("carouselPrev").addEventListener("click", prevSlide);

  updateSlides(false);

  setInterval(nextSlide, 5000);
}
