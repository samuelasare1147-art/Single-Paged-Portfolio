import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting);
    });

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      className={visible ? "back-to-top is-visible" : "back-to-top"}
      href="#top"
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? undefined : -1}
    >
      Back to top ↑
    </a>
  );
}
