export function Icon({ name, width, height, alt = "" }) {
  return (
    <img
      className="icon"
      src={`/assets/${name}`}
      width={width}
      height={height}
      alt={alt}
    />
  );
}

export function ArrowLink({ href, children }) {
  const className = "text-link";
  const inner = (
    <>
      <span>{children}</span>
      <Icon name="arrow-up-right.svg" width={20} height={20} />
    </>
  );

  if (!href) {
    return <p className={className}>{children}</p>;
  }

  const external = href.startsWith("http");
  return (
    <a
      className={className}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {inner}
    </a>
  );
}

export function Pill({ href, children }) {
  const content = (
    <>
      <span>{children}</span>
      <Icon name="arrow-up-right.svg" width={20} height={20} />
    </>
  );

  if (!href) return <span className="pill">{content}</span>;

  const external = href.startsWith("http") || href.startsWith("mailto");
  return (
    <a
      className="pill"
      href={href}
      {...(external ? { target: href.startsWith("http") ? "_blank" : undefined, rel: href.startsWith("http") ? "noreferrer" : undefined } : {})}
    >
      {content}
    </a>
  );
}
