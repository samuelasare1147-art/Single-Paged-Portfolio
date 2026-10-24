import { useEffect, useRef, useState } from "react";
import { navLinks, profile } from "../data/content";
import { Icon, Pill } from "./ui";

const HIDE_AFTER_MS = 5000;

export function SiteHeader({ fixed = false, shown = false, onOpenChange }) {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const onOpenChangeRef = useRef(onOpenChange);
  const headerRef = useRef(null);
  const menuId = fixed ? "mobile-menu-fixed" : "mobile-menu";
  const revealed = fixed ? shown : true;

  onOpenChangeRef.current = onOpenChange;

  function setMenu(next) {
    if (openRef.current === next) return;
    openRef.current = next;
    setOpen(next);
    onOpenChangeRef.current?.(next);
  }

  function close() {
    setMenu(false);
  }

  useEffect(() => {
    if (!fixed || shown || !openRef.current) return;
    openRef.current = false;
    setOpen(false);
    onOpenChangeRef.current?.(false);
  }, [fixed, shown]);

  useEffect(() => {
    if (!fixed || shown) return;
    const header = headerRef.current;
    if (header?.contains(document.activeElement)) {
      document.activeElement.blur();
    }
  }, [fixed, shown]);

  return (
    <header
      ref={headerRef}
      className={fixed ? `nav is-fixed${revealed ? " is-shown" : ""}` : "nav"}
      inert={fixed && !revealed ? true : undefined}
    >
      <a className="wordmark" href="#top" onClick={close}>
        {profile.name}
      </a>

      <nav className="nav-links" aria-label="Primary">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
        <Pill href={`mailto:${profile.email}`}>Let’s talk</Pill>
      </nav>

      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setMenu(!open)}
      >
        <Icon name={open ? "menu.svg" : "menu.svg"} width={24} height={24} alt="" />
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      {open ? (
        <div id={menuId} className="mobile-menu">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
          <Pill href={`mailto:${profile.email}`}>Let’s talk</Pill>
        </div>
      ) : null}
    </header>
  );
}

function heroInView() {
  const hero = document.getElementById("top");
  if (!hero) return window.scrollY < 120;
  return hero.getBoundingClientRect().bottom > 1;
}

export function FixedSiteHeader() {
  const [shown, setShown] = useState(true);
  const menuOpenRef = useRef(false);
  const idleRef = useRef(0);
  const shownRef = useRef(true);

  function showNav() {
    if (shownRef.current) return;
    shownRef.current = true;
    setShown(true);
  }

  function hideNav() {
    if (menuOpenRef.current || !shownRef.current) return;
    shownRef.current = false;
    setShown(false);
  }

  useEffect(() => {
    let anchorY = window.scrollY;
    let frame = 0;
    let heroWasInView = heroInView();

    function clearIdle() {
      window.clearTimeout(idleRef.current);
    }

    function armIdle() {
      clearIdle();
      idleRef.current = window.setTimeout(() => {
        if (!menuOpenRef.current && !heroInView()) hideNav();
      }, HIDE_AFTER_MS);
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const delta = y - anchorY;
        const onHero = heroInView();
        const enteredHero = onHero && !heroWasInView;
        heroWasInView = onHero;

        if (menuOpenRef.current) {
          anchorY = y;
          clearIdle();
          showNav();
          return;
        }

        // Downward movement hides immediately, even while the hero is
        // still on screen. Sub-4px jitter does not count as a gesture.
        if (delta > 4) {
          anchorY = y;
          clearIdle();
          hideNav();
          return;
        }

        // Upward movement slides the nav back in. On the hero it stays;
        // below the hero it hides again after the idle delay.
        if (delta < -4) {
          anchorY = y;
          showNav();
          if (onHero) clearIdle();
          else armIdle();
          return;
        }

        // Resting on the hero, or drifting back onto it: no idle hide.
        if (onHero) {
          clearIdle();
          if (enteredHero) {
            anchorY = y;
            showNav();
          }
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearIdle();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  function handleOpenChange(open) {
    menuOpenRef.current = open;
    window.clearTimeout(idleRef.current);
    if (open) {
      showNav();
      return;
    }
    if (heroInView()) return;
    idleRef.current = window.setTimeout(() => {
      if (!menuOpenRef.current && !heroInView()) hideNav();
    }, HIDE_AFTER_MS);
  }

  return <SiteHeader fixed shown={shown} onOpenChange={handleOpenChange} />;
}
