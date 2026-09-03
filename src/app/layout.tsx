import type { ReactNode } from "react";
import localFont from "next/font/local";
import "@/styles/globals.css";

/**
 * Both faces are self-hosted from src/fonts rather than pulled from a CDN: no
 * third-party request in the critical path, and no visitor IP handed to Google, which
 * matters under GDPR. next/font/local also generates fallback metrics, so swapping the
 * real face in doesn't shift the layout.
 *
 * Only the `latin` subset is shipped — it spans U+0000–00FF, which covers every
 * Portuguese diacritic, so latin-ext would be dead weight.
 *
 * Licences (both SIL OFL) ship alongside the files in src/fonts.
 */
const display = localFont({
  src: "../fonts/SpaceGrotesk-Variable.woff2",
  variable: "--font-display",
  weight: "300 700",
  display: "swap",
});

const mono = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-mono-var",
  weight: "100 800",
  display: "swap",
});

/*
 * Runs before the intro overlay is parsed, so the decision to skip is made before the
 * first paint — no flash of an intro that should not have played. Deliberately inline
 * and tiny: a deferred module would arrive too late to matter.
 */
const INTRO_GATE = `try{
  if(sessionStorage.getItem('intro-played')||matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.documentElement.dataset.intro='skip';
  }
}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    /* suppressHydrationWarning: INTRO_GATE stamps data-intro on <html> before React
       hydrates, so the server markup legitimately differs by that one attribute.
       This is the sanctioned escape hatch for pre-paint scripts; it suppresses the
       warning for this element only, not for its subtree. */
    <html
      lang="pt-BR"
      className={`${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: INTRO_GATE }} />
        {children}
      </body>
    </html>
  );
}
