"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Language entry point. Static export can't do a server redirect, so we pick the
 * visitor's language client-side and hand off. The <noscript> link keeps the site
 * reachable without JS.
 */
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const prefersEnglish = !navigator.language.toLowerCase().startsWith("pt");
    router.replace(prefersEnglish ? "/en" : "/pt");
  }, [router]);

  return (
    <noscript>
      <p style={{ padding: "2rem", fontFamily: "system-ui" }}>
        <a href="/pt/">Português</a> · <a href="/en/">English</a>
      </p>
    </noscript>
  );
}
