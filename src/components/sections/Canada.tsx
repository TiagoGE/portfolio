import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { Flag } from "@/components/ui/Flag";
import type { Dictionary, Photo } from "@/content/types";
import styles from "./Canada.module.css";

/**
 * The photograph belongs to the card it documents. A detached strip of images had no
 * relationship to the text above it, which is why it never sat right at any size.
 */
function CardPhoto({ photo }: { photo: Photo }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        <img
          className={styles.photo}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className={styles.figCaption}>{photo.caption}</figcaption>
    </figure>
  );
}

/**
 * Cold climate. Deliberately not a chronological job list — Vancouver reads as one
 * four-year chapter (study, site, pitch), which is the honest shape of it.
 */
export function Canada({ dict }: { dict: Dictionary }) {
  const t = dict.canada;

  return (
    <section id="canada" className={`climate-canada ${styles.section}`}>
      <div className={styles.inner}>
        {/* Sticks while the column beside it scrolls past. */}
        <header className={styles.header}>
          <Reveal className={styles.headerInner}>
            <p className={styles.kicker}>{t.kicker}</p>
            <h2 className={styles.title}>
              <Flag country="ca" />
              {t.title}
            </h2>
          </Reveal>
        </header>

        <div className={styles.content}>
        <div className={styles.grid}>
          <Reveal as="article" id="educacao" className={styles.education}>
            <p className={styles.period}>{t.education.period}</p>
            <h3 className={styles.school}>{t.education.school}</h3>
            <p className={styles.program}>{t.education.program}</p>
            <RichText className={styles.body} text={t.education.body} />
            <p className={styles.alsoStudied}>
              <span className={styles.alsoStudiedLabel}>{t.education.alsoStudiedLabel}</span>{" "}
              {t.education.alsoStudied.join(", ")}
            </p>

            {t.education.photo && <CardPhoto photo={t.education.photo} />}
          </Reveal>

          {t.ground.map((chapter, i) => (
            <Reveal
              key={chapter.title}
              as="article"
              /* Both ground chapters are map-node targets. */
              id={i === 0 ? "campo" : "futebol"}
              className={styles.chapter}
              delay={(i + 1) * 110}
            >
              <p className={styles.period}>{chapter.period}</p>
              <h3 className={styles.chapterTitle}>{chapter.title}</h3>
              <RichText className={styles.body} text={chapter.body} />

              {chapter.photo && <CardPhoto photo={chapter.photo} />}
            </Reveal>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
