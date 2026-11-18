"use client";

import { useEffect } from "react";

export default function ScrollAnimation() {
  useEffect(() => {
    const selector = ".fade-down, .fade-left, .fade-right";
    const observedElements = new WeakSet<Element>();

    const intersectionObserver = new IntersectionObserver(
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
        intersectionObserver.observe(element);
      }

      element.querySelectorAll(selector).forEach((child) => {
        if (!observedElements.has(child)) {
          observedElements.add(child);
          intersectionObserver.observe(child);
        }
      });
    };

    document.querySelectorAll(selector).forEach(observeElement);

    const mutationObserver = new MutationObserver((mutations) => {
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

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
