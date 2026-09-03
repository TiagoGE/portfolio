import { IntroController } from "./IntroController";
import styles from "./Intro.module.css";

/** Typed out on arrival. Kept here rather than in the dictionaries because it reads the
 *  same in every language. */
const URL_TEXT = "www.tiagoguerra.dev";
const GREETING = "welcome";

/**
 * Opening sequence: the address typed out, a greeting on the line below, then the
 * panels split to reveal the map.
 *
 * An earlier version flew a plane from GRU to YVR, which rehearsed the exact metaphor
 * the map delivers two seconds later. The first seconds are the most valuable on the
 * site and they should say "this person writes software", not repeat the geography.
 *
 * Server-rendered on purpose. If this only appeared after hydration the hero would
 * flash first and the intro would land on top of it. Because it ships in the HTML and
 * the whole timeline is CSS, it starts painting before any JavaScript runs.
 *
 * Whether it plays at all is decided by an inline script in the root layout, which
 * stamps data-intro="skip" on <html> before first paint for repeat visits within the
 * session and for prefers-reduced-motion.
 */
export function Intro({ name }: { name: string }) {
  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={`${styles.panel} ${styles.panelTop}`} />
      <div className={`${styles.panel} ${styles.panelBottom}`} />

      <div className={styles.content}>
        <p className={styles.name}>{name}</p>

        {/*
          Each line holds its full width from the first frame and is revealed by a clip
          that walks left to right. Animating width instead made the centred block grow,
          which slid the text leftwards while it was being read.

          The character counts come from the strings above, so editing them cannot leave
          the reveal stopping short or the caret landing in the wrong place.
        */}
        <div className={styles.terminal}>
          <div className={styles.row}>
            <span className={styles.prompt}>$</span>
            <span
              className={styles.line}
              style={{ "--chars": URL_TEXT.length } as React.CSSProperties}
            >
              <span className={`${styles.typed} ${styles.typedUrl}`}>{URL_TEXT}</span>
              <span className={`${styles.caret} ${styles.caretUrl}`} />
            </span>
          </div>

          <div className={styles.row}>
            <span
              className={styles.line}
              style={{ "--chars": GREETING.length } as React.CSSProperties}
            >
              <span className={`${styles.typed} ${styles.typedGreeting}`}>{GREETING}</span>
              <span className={`${styles.caret} ${styles.caretGreeting}`} />
            </span>
          </div>
        </div>
      </div>

      <IntroController />
    </div>
  );
}
