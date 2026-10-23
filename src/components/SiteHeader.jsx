import { useState } from "react";
import { navLinks, profile } from "../data/content";
import { Icon, Pill } from "./ui";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <header className="nav">
      <a className="wordmark" href="#top" onClick={close}>
        {profile.name}
      </a>

      <nav className="nav-links" aria-label="Primary">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <Pill href={`mailto:${profile.email}`}>Let’s talk</Pill>
      </nav>

      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name={open ? "menu.svg" : "menu.svg"} width={24} height={24} alt="" />
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      {open ? (
        <div id="mobile-menu" className="mobile-menu">
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
