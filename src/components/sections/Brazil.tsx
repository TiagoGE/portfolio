import { Reveal } from "@/components/ui/Reveal";
import { Flag } from "@/components/ui/Flag";
import type { Dictionary } from "@/content/types";
import styles from "./Brazil.module.css";

/**
 * Warm climate, and the heaviest section on the site. The Vancouver years only read as
 * a continuous chapter if what came after has real technical depth — so Trampocerto
 * gets the engineering decisions in full, not a screenshot and a tagline.
 */
export function Brazil({ dict }: { dict: Dictionary }) {
  const t = dict.brazil;
  const project = t.trampocerto;

  return (
    <section id="brasil" className={`climate-brasil ${styles.section}`}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <Reveal className={styles.headerInner}>
            <p className={styles.kicker}>{t.kicker}</p>
            <h2 className={styles.title}>
              <Flag country="br" />
              {t.title}
            </h2>
          </Reveal>
        </header>

        <div className={styles.content}>
        <Reveal as="article" id="azure" className={styles.cert}>
          <div className={styles.certBadge}>
            <span className={styles.certIssuer}>{t.certification.issuer}</span>
            <span className={styles.certDate}>{t.certification.date}</span>
          </div>
          <div>
            <h3 className={styles.certTitle}>{t.certification.title}</h3>
            <p className={styles.body}>{t.certification.body}</p>

            <img
              className={styles.certImage}
              src={t.certification.image.src}
              alt={t.certification.image.alt}
              width={t.certification.image.width}
              height={t.certification.image.height}
              loading="lazy"
              decoding="async"
            />

            {/* The picture shows the certificate; this proves it. */}
            <a
              className={styles.certVerify}
              href={t.certification.credentialUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              {t.certification.credentialLabel}
              <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
        </Reveal>

        <article id="trampocerto" className={styles.project}>
          <div className={styles.projectHead}>
            <div>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectRole}>
                {project.role} · {project.period}
              </p>
            </div>
            {/* A live product is the strongest thing on this page, so the status
                doubles as the way in. Falls back to plain text when no URL is set,
                rather than shipping a dead link. */}
            {project.siteUrl ? (
              <a
                className={`${styles.status} ${styles.statusLink}`}
                href={project.siteUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={project.siteLabel}
              >
                <span className={styles.statusDot} />
                <span className={styles.statusText}>{project.status}</span>
                <span className={styles.statusSep} aria-hidden="true">
                  &middot;
                </span>
                <span className={styles.statusCta}>{project.siteCta}</span>
                <span className={styles.statusArrow} aria-hidden="true">
                  &#8599;
                </span>
              </a>
            ) : (
              <span className={styles.status}>
                <span className={styles.statusDot} />
                {project.status}
              </span>
            )}
          </div>

          {/* Two columns: the story on the left, the stack on the right where it lines
              up under the status pill and fills a column that was otherwise empty. */}
          <div className={styles.projectBody}>
            <div className={styles.projectMain}>
              <p className={styles.lede}>{project.body}</p>

              <ul className={styles.platforms}>
                {project.platforms.map((platform) => (
                  <li key={platform}>{platform}</li>
                ))}
              </ul>

              <div className={styles.stores}>
                {project.stores.map((store) => (
                  <a
                    key={store.label}
                    className={styles.store}
                    href={store.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {store.label}
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Plain text, not pills. Nineteen bordered boxes took more room than the
                description beside them, and the site already reads a tech list this way
                in the Canada section. */}
            <div className={styles.stack}>
              {project.stack.map((group, g) => (
                <Reveal key={group.label} className={styles.stackGroup} delay={g * 80}>
                  <h4 className={styles.stackLabel}>{group.label}</h4>
                  <p className={styles.stackItems}>{group.items.join("  ·  ")}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className={styles.highlights}>
            {project.highlights.map((highlight, i) => (
              <Reveal as="article" key={highlight.title} delay={i * 110}>
                <h4 className={styles.highlightTitle}>{highlight.title}</h4>
                <p className={styles.body}>{highlight.body}</p>
              </Reveal>
            ))}
          </div>

          <section className={styles.challenges} aria-labelledby="dificuldades">
            <Reveal>
              <h4 className={styles.challengesLabel} id="dificuldades">
                {project.challengesLabel}
              </h4>
            </Reveal>
            {project.challenges.map((item, i) => (
              <Reveal as="article" key={item.title} className={styles.challenge} delay={i * 90}>
                <span className={styles.challengeIndex}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h5 className={styles.challengeTitle}>{item.title}</h5>
                  <p className={styles.challengeBody}>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </section>

          <a
            className={styles.repoLink}
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            {project.repoLabel} <span aria-hidden="true">→</span>
          </a>
        </article>

        <section className={styles.side} aria-labelledby="outros-projetos">
          <Reveal>
            <h3 className={styles.sideLabel} id="outros-projetos">
              {t.sideProjects.label}
            </h3>
          </Reveal>

          {t.sideProjects.items.map((item, i) => (
            <Reveal as="article" key={item.name} className={styles.sideItem} delay={i * 90}>
              <a
                className={styles.sideName}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                {item.name}
                <span className={styles.sideArrow} aria-hidden="true">
                  &#8599;
                </span>
              </a>
              <p className={styles.sideBody}>{item.body}</p>
              <p className={styles.sideMeta}>{item.meta}</p>
            </Reveal>
          ))}

          <Reveal>
            <a
              className={styles.sideMore}
              href={t.sideProjects.moreHref}
              target="_blank"
              rel="noreferrer noopener"
            >
              {t.sideProjects.moreLabel}
              <span aria-hidden="true">&#8599;</span>
            </a>
          </Reveal>
        </section>
        </div>
      </div>
    </section>
  );
}
