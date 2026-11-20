const selector = ".fade-down, .fade-left, .fade-right";

let intersectionObserver: IntersectionObserver | null = null;
let mutationObserver: MutationObserver | null = null;

const Initialize = () => {
  intersectionObserver?.disconnect();
  mutationObserver?.disconnect();

  const observedElements = new WeakSet<Element>();

  intersectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target as HTMLElement;
        const style = getComputedStyle(element);

        element.animate(
          [
            {
              opacity: style.opacity,
              transform: style.transform,
            },
            {
              opacity: "1",
              transform: "none",
            },
          ],
          {
            duration: 600,
            easing: "ease",
            fill: "forwards",
          },
        );

        observer.unobserve(element);
      });
    },
    {
      threshold: 0.5,
    },
  );

  const observeElement = (element: Element) => {
    if (element.matches(selector) && !observedElements.has(element)) {
      observedElements.add(element);
      intersectionObserver?.observe(element);
    }

    element.querySelectorAll(selector).forEach((child) => {
      if (!observedElements.has(child)) {
        observedElements.add(child);
        intersectionObserver?.observe(child);
      }
    });
  };

  document.querySelectorAll(selector).forEach(observeElement);

  mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) {
          observeElement(node);
        }
      });
    });
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

document.addEventListener("astro:page-load", Initialize);

document.addEventListener("astro:before-swap", () => {
  intersectionObserver?.disconnect();
  mutationObserver?.disconnect();
});
