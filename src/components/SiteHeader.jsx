import { useEffect, useRef, useState } from "react";
import { navLinks, profile } from "../data/content";
import { Icon, Pill } from "./ui";

const HIDE_AFTER_MS = 5000;

export function SiteHeader({ fixed = false, shown = false, onOpenChange }) {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const onOpenChangeRef = useRef(onOpenChange);
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

  return (
    <header
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

export function FixedSiteHeader() {
  const [shown, setShown] = useState(false);
  const menuOpenRef = useRef(false);
  const idleRef = useRef(0);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    function clearIdle() {
      window.clearTimeout(idleRef.current);
    }

    function armIdle() {
      clearIdle();
      idleRef.current = window.setTimeout(() => {
        if (!menuOpenRef.current) setShown(false);
      }, HIDE_AFTER_MS);
    }

    function inFlowStillVisible() {
      const header = document.querySelector(".intro .nav");
      if (!header) return window.scrollY < 120;
      const top = header.getBoundingClientRect().top + window.scrollY;
      return window.scrollY <= top + header.offsetHeight;
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;

        if (inFlowStillVisible()) {
          lastY = y;
          clearIdle();
          setShown(false);
          return;
        }

        if (menuOpenRef.current) {
          lastY = y;
          clearIdle();
          setShown(true);
          return;
        }

        const delta = y - lastY;
        if (Math.abs(delta) < 4) return;
        lastY = y;

        if (delta < 0) {
          setShown(true);
          armIdle();
        } else {
          clearIdle();
          setShown(false);
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
      setShown(true);
      return;
    }
    idleRef.current = window.setTimeout(() => {
      if (!menuOpenRef.current) setShown(false);
    }, HIDE_AFTER_MS);
  }

  return <SiteHeader fixed shown={shown} onOpenChange={handleOpenChange} />;
}
