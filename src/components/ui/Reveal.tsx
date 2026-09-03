"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Reveal.module.css";

interface RevealProps {
  children: ReactNode;
  /** Stagger, in ms. Pass index * step from the parent. */
  delay?: number;
  /** Rendered element. Keeps the wrapper semantically neutral where it matters. */
  as?: "div" | "li" | "article" | "span";
  /**
   * "rise" for blocks of text, "pop" for small chips — a chip rising 34px looks broken,
   * and a paragraph scaling up looks cheap.
   */
  variant?: "rise" | "pop" | "media";
  className?: string;
  id?: string;
}

/**
 * Reveals its children once, when they first cross into view.
 *
 * Uses IntersectionObserver rather than a scroll handler so the browser does the work
 * off the main thread, and unobserves after firing — nothing here re-runs on scroll.
 * The CSS honours prefers-reduced-motion by rendering the final state outright, so no
 * media query is needed in JS.
 */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  variant = "rise",
  className,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      /*
       * Fire only once the element is properly inside the viewport, not the instant its
       * top edge appears. With a 400vh section above, a fast scroll would otherwise run
       * the whole animation while the content was still flying past — the visitor stops
       * scrolling and finds everything already settled, as if nothing animated at all.
       */
      { rootMargin: "0px 0px -22% 0px", threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      id={id}
      className={`${styles.reveal} ${styles[variant]} ${className ?? ""}`}
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
