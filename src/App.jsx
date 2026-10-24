import { BackToTop } from "./components/BackToTop";
import { Hero } from "./components/Hero";
import { ArrowLink } from "./components/ui";
import { Icon } from "./components/ui";
import { DashboardPreview, InteriorPreview, TransitPreview } from "./components/Previews";
import {
  archive,
  disciplines,
  experience,
  featuredWork,
  processSteps,
  profile,
} from "./data/content";

const previews = {
  mytrotro: <TransitPreview />,
  exam: <DashboardPreview />,
  danges: <InteriorPreview />,
};

export default function App() {
  return (
    <>
      <Hero />

      <section className="band perspective">
        <Chapter number="01 /" label="The way I see it" />
        <div className="perspective-copy">
          <p className="statement">
            Good design doesn’t add complexity. It helps people find their way through it.
          </p>
          <p className="body">
            From education and fintech to transport, logistics and home services, I bring structure to the messy middle — connecting user needs, thoughtful interfaces and practical execution.
          </p>
        </div>
      </section>

      <section className="work" id="work">
        <div className="rule inset" />
        <div className="band work-heading">
          <Chapter number="02 /" label="Selected work" />
          <h2>
            Different contexts.
            <br />
            The same care.
          </h2>
        </div>

        {featuredWork.map((project) => (
          <article className="project" key={project.id}>
            {previews[project.id]}
            <div className="project-info">
              <div>
                <p className="eyebrow">{project.eyebrow}</p>
                <h3>{project.title}</h3>
                <ul className="tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <div className="project-summary">
                <p className="body">{project.summary}</p>
                <ArrowLink href={project.link.href}>{project.link.label}</ArrowLink>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="archive-section">
        <div className="rule inset" />
        <div className="band archive-heading">
          <Chapter number="03 /" label="More from the archive" />
          <h2>A wider field of work.</h2>
        </div>
        <ul className="archive">
          {archive.map((item) => (
            <li key={item.name}>
              <div>
                <p className="archive-name">{item.name}</p>
                <p className="eyebrow">{item.category}</p>
              </div>
              <p className="archive-summary">{item.summary}</p>
              <div className="archive-link">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                    <Icon name="arrow-up-right.svg" width={20} height={20} />
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
        <p className="body archive-note">
          Other web and mobile projects are in development and awaiting launch.
        </p>
      </section>

      <section className="capabilities">
        <div className="band">
          <Chapter number="04 /" label="What I bring" tone="lime" />
          <h2>
            Thoughtful from the
            <br />
            first flow to the final pixel.
          </h2>
        </div>
        <div className="discipline-grid">
          {disciplines.map((item) => (
            <article key={item.number}>
              <div className="rule rule-dark" />
              <div className="discipline-id">
                <p>{item.number}</p>
                <Icon name={item.icon} width={26} height={26} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <p className="skills">{item.skills}</p>
            </article>
          ))}
        </div>
        <div className="craft">
          <p className="eyebrow">Built with intention</p>
          <p>Mobile app design · Dashboard design · Figma · Product strategy · Documentation & reporting</p>
        </div>
      </section>

      <section className="process">
        <div className="band">
          <Chapter number="05 /" label="How I work" />
          <h2>
            Less assumption.
            <br />
            More understanding.
          </h2>
        </div>
        <ol className="steps">
          {processSteps.map((step) => (
            <li key={step.number}>
              <div className="rule" />
              <p className="step-number">{step.number}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="about" id="about">
        <div className="rule inset" />
        <Chapter number="06 /" label="The person behind the pixels" />
        <div className="about-grid">
          <figure>
            <img
              className="portrait portrait-large"
              src="/assets/portrait.png"
              alt="Samuel Asare"
              width={440}
              height={400}
            />
            <figcaption>
              <span>Samuel Asare</span>
              <span>Adenta, Accra / GH</span>
            </figcaption>
          </figure>
          <div>
            <h2>
              A designer’s eye.
              <br />
              An operator’s mindset.
            </h2>
            <p className="body">
              I’m Samuel, a creative and detail-oriented UI/UX designer based in Adenta, Accra. I design intuitive digital products and bring an engineering mindset to usability-driven problem solving.
            </p>
            <p className="body">
              At Benchfive, I bridge product design and operations — shaping user journeys while coordinating documentation, teams and execution. I care about what happens after a design leaves Figma, too.
            </p>
            <div className="strengths">
              <p className="eyebrow">The qualities I lean on</p>
              <p>
                Visual hierarchy & layout thinking · Analytical problem-solving · Cross-functional collaboration · Written communication · Process documentation · Adaptability
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="experience" id="experience">
        <div className="rule inset" />
        <div className="band experience-heading">
          <Chapter number="07 /" label="Experience & learning" />
          <h2>Where craft meets execution.</h2>
        </div>
        <div className="roles">
          {experience.map((role) => (
            <article key={role.company}>
              <div className="rule" />
              <div className="role">
                <div>
                  <h3>{role.company}</h3>
                  <p className="role-title">{role.role}</p>
                  <p className="eyebrow">{role.dates}</p>
                </div>
                <div className="role-copy">
                  {role.paragraphs.map((paragraph) => (
                    <p className="body" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="rule inset" />
        <div className="learning">
          <div>
            <p className="eyebrow">Learning</p>
            <p>
              UI/UX Design Training
              <br />
              Udemy
            </p>
          </div>
          <div>
            <p className="eyebrow">Tools & inspiration</p>
            <p className="tools">
              Figma / FigJam / Pinterest /
              <br />
              Awwwards / Behance
            </p>
          </div>
        </div>
      </section>

      <footer className="contact" id="contact">
        <div className="contact-intro">
          <Chapter number="08 /" label="The next chapter" />
          <p>
            Have a product in mind, a tricky workflow, or just a good question? Let’s start a conversation.
          </p>
        </div>
        <div className="closing">
          <h2>
            Let’s make
            <br />
            it make sense.
          </h2>
          <a className="contact-mark" href={`mailto:${profile.email}`} aria-label="Email Samuel">
            <Icon name="arrow-up-right-light.svg" width={80} height={80} />
          </a>
        </div>
        <div className="contact-details">
          <div>
            <p className="eyebrow">Say hello</p>
            <a className="email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
          <div className="contact-links">
            <a href={profile.phoneHref}>{profile.phone}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              {profile.linkedinLabel}
            </a>
          </div>
          <p className="contact-place">
            ADENTA, ACCRA
            <br />
            GHANA
          </p>
        </div>
        <div className="rule" />
        <div className="footer-bar">
          <p>© 2026 SAMUEL ASARE</p>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}

function Chapter({ number, label, tone }) {
  return (
    <p className={tone === "lime" ? "chapter chapter-lime" : "chapter"}>
      <span>{number}</span>
      <span>{label}</span>
    </p>
  );
}
