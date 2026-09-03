import type { Dictionary } from "@/content/types";
import styles from "./Contact.module.css";

/** Back to the cockpit climate — the site closes where it opened. */
export function Contact({ dict }: { dict: Dictionary }) {
  const t = dict.contact;

  const links = [
    { label: "Email", value: t.email, href: `mailto:${t.email}` },
    { label: "GitHub", value: "github.com/TiagoGE", href: t.github },
    { label: "LinkedIn", value: "tiago-guerra-endsfeldz", href: t.linkedin },
  ];

  return (
    <footer id="contato" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{t.title}</h2>
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.label}>
              <a
                className={styles.link}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer noopener"
              >
                <span className={styles.linkLabel}>{link.label}</span>
                <span className={styles.linkValue}>{link.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
