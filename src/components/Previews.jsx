import { chartBars, stops } from "../data/content";
import { Icon } from "./ui";

export function TransitPreview() {
  return (
    <article className="showcase showcase-sage">
      <p className="preview-note">ILLUSTRATIVE PREVIEW  /  Concept UI, not delivered screens</p>
      <div className="transit">
        <div className="transit-copy">
          <p className="eyebrow">Designed around everyday journeys</p>
          <p className="transit-title">
            Less guesswork.
            <br />
            More going.
          </p>
          <p className="transit-route">ADENTA  —  ACCRA  —  EVERYDAY</p>
          <Icon name="arrow-right.svg" width={96} height={56} />
        </div>

        <div className="phone">
          <div className="phone-screen">
            <div className="app-top">
              <p className="app-wordmark">MyTroTro</p>
              <Icon name="user.svg" width={18} height={18} />
            </div>
            <p className="app-prompt">
              Where are
              <br />
              you headed?
            </p>
            <div className="search-field">
              <Icon name="search.svg" width={14} height={14} />
              <span>Find a stop or destination</span>
            </div>
            <div className="route-map" aria-hidden="true">
              <span className="street street-h street-h-1" />
              <span className="street street-h street-h-2" />
              <span className="street street-h street-h-3" />
              <span className="street street-v street-v-1" />
              <span className="street street-v street-v-2" />
              <span className="street street-v street-v-3" />
              <img className="route-line" src="/assets/route.svg" width="149" height="99" alt="" />
              <img className="pin-destination" src="/assets/pin-destination.svg" width="14" height="14" alt="" />
              <img className="pin-departure" src="/assets/pin-departure.svg" width="12" height="12" alt="" />
            </div>
            <div className="route-suggestion">
              <p>EXPLORE ROUTES</p>
              <p>Adenta → Circle</p>
              <p>Find your stop. Plan your commute.</p>
            </div>
            <p className="route-action">Explore this route →</p>
          </div>
        </div>

        <aside className="journey">
          <p>YOUR JOURNEY</p>
          <p className="journey-title">
            One route.
            <br />
            A clearer way.
          </p>
          <ul>
            {stops.map((stop) => (
              <li key={stop.name}>
                <Icon
                  name={stop.filled ? "stop-filled.svg" : "stop-ring.svg"}
                  width={10}
                  height={10}
                />
                {stop.name}
              </li>
            ))}
          </ul>
          <p className="journey-note">
            Public transport information,
            <br />
            made easier to navigate.
          </p>
        </aside>
      </div>
    </article>
  );
}

export function DashboardPreview() {
  return (
    <article className="showcase showcase-ink">
      <p className="preview-note">ILLUSTRATIVE PREVIEW  /  Concept UI, not delivered screens</p>
      <div className="dashboard-canvas">
        <div className="dashboard">
          <div className="browser-chrome">
            <Icon name="browser-dot.svg" width={5} height={5} />
            <Icon name="browser-dot.svg" width={5} height={5} />
            <Icon name="browser-dot.svg" width={5} height={5} />
            <p>PERSONAL EXAM DASHBOARD / CONCEPT</p>
          </div>
          <div className="dashboard-body">
            <aside className="sidebar">
              <p className="sidebar-title">Exam space.</p>
              <p className="sidebar-active">Overview</p>
              <p>Question bank</p>
              <p>Performance</p>
              <p>Students</p>
              <p>Settings</p>
            </aside>
            <div className="analytics">
              <div className="analytics-head">
                <p>A clearer view of learning.</p>
                <p>SAMPLE DATA ↓</p>
              </div>
              <div className="shortcuts">
                <div>
                  <p>Sessions</p>
                  <p>Practice</p>
                </div>
                <div>
                  <p>Question bank</p>
                  <p>Review</p>
                </div>
                <div>
                  <p>Topics</p>
                  <p>Explore</p>
                </div>
              </div>
              <div className="chart">
                <div className="chart-head">
                  <p>Question performance</p>
                  <p>ILLUSTRATIVE</p>
                </div>
                <div className="bars">
                  {chartBars.map((height, index) => (
                    <span
                      key={height + index}
                      className={index === chartBars.length - 1 ? "bar bar-ink" : "bar"}
                      style={{ "--bar": `${height}px` }}
                    />
                  ))}
                </div>
                <div className="axis">
                  <p>SESSION 01</p>
                  <p>SESSION 08</p>
                </div>
              </div>
              <p className="dashboard-flow">
                Review questions  →  Understand performance  →  Plan the next session
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function InteriorPreview() {
  return (
    <article className="showcase showcase-mist">
      <p className="preview-note">ILLUSTRATIVE PREVIEW  /  Concept UI, not delivered screens</p>
      <div className="interior">
        <div className="interior-nav">
          <p>D’anges.</p>
          <p>STUDIO     SERVICES     PROJECTS     CONTACT ↗</p>
        </div>
        <div className="interior-body">
          <div>
            <p className="interior-kicker">INTERIOR DESIGN & DECOR</p>
            <p className="interior-title">
              A place to
              <br />
              feel at home.
            </p>
            <p className="interior-copy">
              Thoughtful interiors. Considered details.
              <br />
              Discover a space shaped around you.
            </p>
            <p className="interior-link">Explore the studio ↗</p>
          </div>
          <img
            className="interior-art"
            src="/assets/interior.svg"
            width={500}
            height={314}
            alt="Illustrated living room with a sofa, side table, window, and framed artwork"
          />
        </div>
      </div>
    </article>
  );
}
