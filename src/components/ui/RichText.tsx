import styles from "./RichText.module.css";

/**
 * Renders body copy in which soft-skill terms are wrapped in [[double brackets]].
 *
 * The marker lives in the content files so the copy stays one readable sentence for
 * whoever edits it, instead of being chopped into an array of fragments. Marked terms
 * get the section accent and an underline that draws itself in once the surrounding
 * card is revealed.
 */
export function RichText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\[\[[^\]]+\]\])/g);
  let markIndex = 0;

  return (
    <p className={className}>
      {parts.map((part, i) => {
        if (!part.startsWith("[[") || !part.endsWith("]]")) return part;
        const delay = 420 + markIndex * 190;
        markIndex += 1;
        return (
          <em key={i} className={styles.mark} style={{ transitionDelay: `${delay}ms` }}>
            {part.slice(2, -2)}
          </em>
        );
      })}
    </p>
  );
}
