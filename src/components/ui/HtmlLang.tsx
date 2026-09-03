"use client";

import { useEffect } from "react";

/**
 * Static export renders a single <html> from the root layout, so the lang attribute is
 * synced client-side once the locale is known. Screen readers pick up the change.
 */
export function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
