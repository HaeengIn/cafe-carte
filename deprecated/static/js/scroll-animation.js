const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;

      element.classList.add("is-visible");
      element.style.setProperty("opacity", "1", "important");
      element.style.setProperty("transform", "none", "important");

      observer.unobserve(element);
    });
  },
  {
    threshold: 0.5,
  },
);

document
  .querySelectorAll(".fade-down, .fade-left, .fade-right")
  .forEach((element) => {
    observer.observe(element);
  });
