import { IntroController } from "./IntroController";
import styles from "./Intro.module.css";

/**
 * Pre-flight sequence: the site boots like an instrument, draws the GRU → YVR route,
 * then splits open to reveal the map.
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
        <div className={styles.route}>
          <span className={`${styles.code} ${styles.codeFrom}`}>GRU</span>

          <span className={styles.track}>
            <span className={styles.plane}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  transform="rotate(90 12 12)"
                  d="M21 16v-2l-8-5V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                />
              </svg>
            </span>
          </span>

          <span className={`${styles.code} ${styles.codeTo}`}>YVR</span>
        </div>

        <p className={styles.name}>{name}</p>
        <p className={styles.hint}>11.051 km</p>
      </div>

      <IntroController />
    </div>
  );
}
