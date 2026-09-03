import Link from "next/link";
import { LANGUAGES, type Lang } from "@/content";
import styles from "./LanguageToggle.module.css";

const FLAG_LABEL: Record<Lang, string> = { pt: "PT", en: "EN" };

export function LanguageToggle({ current }: { current: Lang }) {
  return (
    <nav className={styles.toggle} aria-label="Language">
      {LANGUAGES.map((lang) => (
        <Link
          key={lang}
          href={`/${lang}`}
          className={styles.option}
          data-active={lang === current}
          aria-current={lang === current ? "true" : undefined}
        >
          {FLAG_LABEL[lang]}
        </Link>
      ))}
    </nav>
  );
}
