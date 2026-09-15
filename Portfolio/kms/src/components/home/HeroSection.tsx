import Image from "next/image";
import Link from "next/link";
import { ContentDocument } from "@/types/content";

function period(s: unknown, e: unknown, status: unknown) {
  const start = String(s || "").replace("-", ".");

  return String(status) === "ongoing" || !e
    ? `${start} — PRESENT`
    : `${start} — ${String(e).replace("-", ".")}`;
}

export default function HeroSection({
  doc,
  career,
}: {
  doc: ContentDocument;
  career?: ContentDocument;
}) {
  const headline = Array.isArray(doc.meta.headline)
    ? doc.meta.headline.join(" / ")
    : "";

  const actions = Array.isArray(doc.meta.actions)
    ? (doc.meta.actions as Array<Record<string, string>>)
    : [];

  const roles = Array.isArray(career?.meta.roles)
    ? career.meta.roles
    : [];

  const skills = Array.isArray(career?.meta.skills)
    ? career.meta.skills
    : [];

  const labels = (doc.meta.labels || {}) as Record<string, string>;

  const foot = Array.isArray(doc.meta.footerMessages)
    ? doc.meta.footerMessages.map(String)
    : [];

  return (
    <div className="identityPrimary">
      <section className="identityIntro">
        <div className="identityTopline">
          <span>&gt;_</span>
          <span>{String(doc.meta.eyebrow || "")}</span>
        </div>

        <h1 className="identityName">
          {String(doc.meta.name || "")}
          <span>{String(doc.meta.englishName || "")}</span>
        </h1>

        <p className="heroText">{doc.content.trim()}</p>

        <p className="heroRole">{headline}</p>

        <div className="heroActions">
          {actions.map((a, i) => (
            <Link
              key={`${a.href}-${i}`}
              className={i === 0 ? "primary" : ""}
              href={a.href}
            >
              {a.label} <span>→</span>
            </Link>
          ))}
        </div>

        <div className="terminalQuote">
          <span>// {String(doc.meta.missionLabel || "")}</span>
          <strong>{String(doc.meta.mission || "")}</strong>
        </div>
      </section>

      {career && (
        <section className="identityCard identityCardWithImage">
          <div className="identityCardHead">
            <span>{String(doc.meta.identityPath || "")}</span>
            <span className="statusDot">
              ● {String(doc.meta.activeLabel || "")}
            </span>
          </div>

          <div className="identityCardBody identityCardBodyVisual">
            <div className="identityMain">
              <div className="identityCompany">
                <small>{labels.company}</small>
                <strong>{String(career.meta.company || "")}</strong>
              </div>

              {Boolean(career.meta.client) && (
                <div className="identityCompany clientRow">
                  <small>{labels.client}</small>
                  <strong>{String(career.meta.client)}</strong>
                </div>
              )}

              <div className="identityDivider" />

              <div className="identityFacts">
                <div>
                  <span>{labels.role}</span>
                  <strong>
                    {String(
                      career.meta.position ||
                        career.meta.title ||
                        ""
                    )}
                  </strong>
                </div>

                <div>
                  <span>{labels.position}</span>
                  <strong>
                    {roles.map(String).join(" · ")}
                  </strong>
                </div>

                <div>
                  <span>{labels.period}</span>
                  <strong>
                    {period(
                      career.meta.startDate,
                      career.meta.endDate,
                      career.meta.status
                    )}
                  </strong>
                </div>

                <div>
                  <span>{labels.stack}</span>
                  <strong>
                    {skills
                      .slice(0, 5)
                      .map(String)
                      .join(" / ")}
                  </strong>
                </div>
              </div>
            </div>

            {Boolean(doc.meta.image) && (
              <div className="identityVisual">
                <Image
                  src={String(doc.meta.image)}
                  alt={String(doc.meta.imageAlt || "")}
                  fill
                  sizes="(max-width: 900px) 100vw, 320px"
                  priority
                />
              </div>
            )}
          </div>

          <div className="identityCardFoot">
            {foot.map((x, i) => (
              <span key={i}>
                {i === 0 ? ">_ " : ""}
                {x}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}