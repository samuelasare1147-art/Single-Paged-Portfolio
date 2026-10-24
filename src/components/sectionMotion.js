import { useEffect } from "react";

export function motionProps(index = 0) {
  const delay = Math.min(index, 6) * 90;
  return {
    "data-reveal": "",
    style: { "--reveal-delay": `${delay}ms` },
  };
}

export function useSectionReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      nodes.forEach((node) => node.classList.add("is-in"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}
