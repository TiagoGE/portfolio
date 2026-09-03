import styles from "./SectionFade.module.css";

/**
 * Bridges the red of the Canada section into the green of the Brazil one.
 *
 * A strip of its own rather than a gradient on either section: both carry a sticky
 * header painted with their own solid background, and a colour ramp inside either one
 * would leave that bar the wrong colour as it passed over the ramp.
 */
export function SectionFade() {
  return <div className={styles.fade} aria-hidden="true" />;
}
