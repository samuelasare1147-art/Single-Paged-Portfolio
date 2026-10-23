import { SiteHeader } from "./SiteHeader";
import { profile } from "../data/content";
import { Icon, Pill } from "./ui";

export function Hero() {
  return (
    <section className="intro" id="top">
      <SiteHeader />
      <div className="rule" />
      <div className="edition">
        <p>Independent perspective</p>
        <p>Folio / 2026</p>
      </div>
      <div className="hero">
        <h1>
          <span className="hero-line hero-line-primary">Useful by design.</span>
          <span className="hero-promise">
            <span className="hero-line hero-line-secondary">Human by default.</span>
            <span className="signature" aria-hidden="true">
              <Icon name="asterisk.svg" width={72} height={72} />
            </span>
          </span>
        </h1>
      </div>
      <div className="intro-grid">
        <div className="identity">
          <img
            className="portrait portrait-small"
            src="/assets/portrait.png"
            alt="Samuel Asare, seated, in a dark shirt"
            width={200}
            height={176}
          />
          <div>
            <p className="identity-name">{profile.greeting}</p>
            <p className="identity-roles">
              {profile.roles.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </p>
            <p className="location">
              <Icon name="location-marker.svg" width={6} height={6} />
              {profile.location}
            </p>
          </div>
        </div>
        <div className="intro-copy">
          <p>{profile.summary}</p>
          <Pill href="#work">Explore my work</Pill>
        </div>
        <p className="scroll-hint">
          SCROLL TO
          <br />
          DISCOVER ↓
        </p>
      </div>
      <div className="rule" />
    </section>
  );
}
