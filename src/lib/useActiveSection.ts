"use client";

import { useEffect, useState } from "react";

/**
 * Which of the tracked sections currently occupies the middle of the viewport.
 *
 * Returns null while none of them do — which is exactly the case during the journey
 * section, and is what tells the mini map to stay hidden.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    const wanted = key.split(",");
    const elements = wanted
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }
        // Document order keeps the choice stable when two sections both cross the band.
        setActive(wanted.find((id) => intersecting.has(id)) ?? null);
      },
      // Only a thin band through the middle of the viewport counts as "in view".
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
