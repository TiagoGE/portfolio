"use client";

import { useEffect } from "react";

/**
 * Everything the intro needs JavaScript for, and nothing more: remember that it ran,
 * and let the visitor cut it short. The animation itself is pure CSS.
 */
export function IntroController() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro === "skip") return;

    // Mark it played immediately, not on completion — a visitor who navigates away
    // mid-intro has still seen it and should not sit through it again.
    try {
      sessionStorage.setItem("intro-played", "1");
    } catch {
      // Private mode or blocked storage: the intro simply plays again next time.
    }

    const skip = () => {
      root.dataset.intro = "skip";
      teardown();
    };

    const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, skip, { passive: true, once: true }));

    // When the timeline ends, drop the overlay out of the render tree entirely — a
    // full-screen fixed element left behind costs a compositing layer for nothing.
    const timer = window.setTimeout(() => {
      if (root.dataset.intro !== "skip") root.dataset.intro = "done";
      teardown();
    }, 2900);

    function teardown() {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, skip));
    }

    return teardown;
  }, []);

  return null;
}
