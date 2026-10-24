import { profile } from "../data/content";
import { motionProps } from "./sectionMotion";
import { Icon, Pill } from "./ui";

export function Hero() {
  return (
    <section className="intro" id="top">
      <div className="edition" {...motionProps(0)}>
        <p>Independent perspective</p>
        <p>Folio / 2026</p>
      </div>
      <div className="hero" {...motionProps(1)}>
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
        <div className="identity" {...motionProps(2)}>
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
        <div className="intro-copy" {...motionProps(3)}>
          <p>{profile.summary}</p>
          <Pill href="#work">Explore my work</Pill>
        </div>
        <a className="scroll-hint" href="#perspective" {...motionProps(4)}>
          SCROLL TO
          <br />
          DISCOVER ↓
        </a>
      </div>
      <div className="rule" />
    </section>
  );
}
