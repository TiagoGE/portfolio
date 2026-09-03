import styles from "./Flag.module.css";

/**
 * Drawn as inline SVG rather than emoji on purpose: Windows ships no glyphs for
 * regional-indicator flag emoji, so a 🇨🇦 renders there as the bare letters "CA".
 * These also stay crisp at any size and take their stroke from the page, not the OS.
 *
 * Marked aria-hidden: the heading beside each flag already names the country, so
 * announcing "flag of Canada" would only repeat it, and it saves localising the label.
 */
export function Flag({ country }: { country: "ca" | "br" }) {
  if (country === "ca") {
    return (
      <svg
        className={styles.flag}
        viewBox="0 0 1000 500"
        aria-hidden="true"
      >
        <rect width="1000" height="500" fill="#fff" />
        <rect width="250" height="500" fill="#d52b1e" />
        <rect x="750" width="250" height="500" fill="#d52b1e" />
        <path
          fill="#d52b1e"
          transform="translate(244) scale(0.5)"
          d="M512 116l-48 102c-6 10-16 10-26 4l-70-36 18 94c4 16-6 20-12 12l-30-34-4 24-44-6 16 50c2 10 4 14-6 18l-22 10 94 76c10 8 14 14 10 28l-8 28 90-16c10-2 16 2 16 12l-4 90h40l-4-90c0-10 6-14 16-12l90 16-8-28c-4-14 0-20 10-28l94-76-22-10c-10-4-8-8-6-18l16-50-44 6-4-24-30 34c-6 8-16 4-12-12l18-94-70 36c-10 6-20 6-26-4z"
        />
      </svg>
    );
  }

  return (
    <svg
      className={styles.flag}
      viewBox="0 0 1000 700"
      aria-hidden="true"
    >
      <rect width="1000" height="700" fill="#009b3a" />
      <path d="M170 350 500 60 830 350 500 640Z" fill="#fedf00" />
      <circle cx="500" cy="350" r="175" fill="#002776" />
      {/* The band is drawn inside the globe's radius rather than clipped, which keeps
          the markup free of an id that would collide if the flag ever rendered twice. */}
      <path d="M355 405Q500 315 645 400L645 428Q500 343 355 433Z" fill="#fff" />
    </svg>
  );
}
