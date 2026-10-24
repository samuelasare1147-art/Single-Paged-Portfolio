import { useEffect, useRef, useState } from "react";
import { Icon } from "./ui";

export function Loader() {
  const [phase, setPhase] = useState("spin");
  const markRef = useRef(null);
  const spinRef = useRef(null);
  const screenRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      root.classList.remove("is-loading");
      setPhase("done");
      return undefined;
    }

    root.classList.add("is-loading");
    const spin = spinRef.current;
    let finished = false;
    let fallbackId = 0;
    let screenEl = null;
    let onScreenFadeEnd = null;

    function finish() {
      if (finished) return;
      finished = true;
      window.clearTimeout(fallbackId);
      setPhase("done");
    }

    function beginTravel() {
      const mark = markRef.current;
      const target = document.querySelector(".intro .signature");
      const targetRect = target?.getBoundingClientRect();
      const canLand = targetRect && targetRect.width > 1 && targetRect.height > 1;

      if (!mark || !canLand) {
        screenEl = screenRef.current;
        setPhase("dismiss");

        onScreenFadeEnd = (event) => {
          if (event.target !== screenEl || event.propertyName !== "opacity") return;
          screenEl.removeEventListener("transitionend", onScreenFadeEnd);
          finish();
        };

        screenEl?.addEventListener("transitionend", onScreenFadeEnd);
        fallbackId = window.setTimeout(finish, 2100);
        return;
      }

      setPhase("travel");

      const markRect = mark.getBoundingClientRect();
      const dx = targetRect.left + targetRect.width / 2 - (markRect.left + markRect.width / 2);
      const dy = targetRect.top + targetRect.height / 2 - (markRect.top + markRect.height / 2);
      const scale = targetRect.width / markRect.width;

      window.requestAnimationFrame(() => {
        mark.style.transition = "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)";
        window.requestAnimationFrame(() => {
          mark.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${scale})`;
        });
      });

      function onMoveEnd(event) {
        if (event.target !== mark || event.propertyName !== "transform") return;
        mark.removeEventListener("transitionend", onMoveEnd);
        finish();
      }

      mark.addEventListener("transitionend", onMoveEnd);
      fallbackId = window.setTimeout(finish, 1200);
    }

    function onSpinEnd(event) {
      if (event.target !== spin || event.animationName !== "loader-turn") return;
      beginTravel();
    }

    spin.addEventListener("animationend", onSpinEnd);
    return () => {
      finished = true;
      window.clearTimeout(fallbackId);
      spin.removeEventListener("animationend", onSpinEnd);
      screenEl?.removeEventListener("transitionend", onScreenFadeEnd);
    };
  }, []);

  if (phase === "done") {
    document.documentElement.classList.remove("is-loading");
    return null;
  }

  document.documentElement.classList.add("is-loading");

  const screenClass =
    phase === "dismiss" ? "loader-screen is-dismiss" : phase === "travel" ? "loader-screen is-travel" : "loader-screen";
  const markClass =
    phase === "dismiss" ? "loader-mark is-dismiss" : phase === "travel" ? "loader-mark is-travel" : "loader-mark";

  return (
    <>
      <div className={screenClass} ref={screenRef}>
        <p className="sr-only">Loading</p>
      </div>
      <div className={markClass} ref={markRef}>
        <div className="loader-spin" ref={spinRef}>
          <span className="signature">
            <Icon name="asterisk.svg" width={72} height={72} />
          </span>
        </div>
      </div>
    </>
  );
}
