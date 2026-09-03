import { pt } from "./pt";
import { en } from "./en";
import { LANGUAGES, type Dictionary, type Lang } from "./types";

const DICTIONARIES: Record<Lang, Dictionary> = { pt, en };

export function isLang(value: string): value is Lang {
  return (LANGUAGES as readonly string[]).includes(value);
}

export function getDictionary(lang: Lang): Dictionary {
  return DICTIONARIES[lang];
}

export { LANGUAGES };
export type { Dictionary, Lang };
