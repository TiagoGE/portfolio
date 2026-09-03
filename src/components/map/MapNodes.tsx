"use client";

import { useCallback } from "react";
import type { MapNodeDef } from "@/content/types";
import type { ScreenPoint } from "./FlightMap";
import styles from "./MapNodes.module.css";

interface MapNodesProps {
  origin: ScreenPoint;
  nodes: MapNodeDef[];
  visible: boolean;
  /** Fan direction in screen degrees: 0 = right, 90 = down. */
  baseAngle: number;
  /** Degrees between adjacent nodes. */
  spread: number;
  radius: number;
  clusterLabel: string;
  reducedMotion: boolean;
  bounds: { width: number; height: number };
}

/**
 * Real HTML buttons positioned over the SVG rather than SVG elements — keyboard focus,
 * hit targets and text rendering all behave properly this way, and the connector lines
 * are the only part that needs to be drawn.
 */
export function MapNodes({
  origin,
  nodes,
  visible,
  baseAngle,
  spread,
  radius,
  clusterLabel,
  reducedMotion,
  bounds,
}: MapNodesProps) {
  const jumpTo = useCallback(
    (target: string) => {
      const element = document.getElementById(target);
      if (!element) return;
      element.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
      // Move focus so keyboard and screen-reader users land where the click pointed.
      element.setAttribute("tabindex", "-1");
      element.focus({ preventScroll: true });
    },
    [reducedMotion],
  );

  const placed = nodes.map((node, i) => {
    const angle = baseAngle + (i - (nodes.length - 1) / 2) * spread;
    const radians = (angle * Math.PI) / 180;
    const x = origin.x + Math.cos(radians) * radius;
    const y = origin.y + Math.sin(radians) * radius;
    // Keep clusters inside the frame on narrow viewports.
    return {
      ...node,
      x: Math.min(bounds.width - 16, Math.max(16, x)),
      y: Math.min(bounds.height - 16, Math.max(16, y)),
    };
  });

  return (
    <div
      className={styles.cluster}
      data-visible={visible}
      aria-hidden={!visible}
      role="group"
      aria-label={clusterLabel}
    >
      <svg className={styles.connectors} width={bounds.width} height={bounds.height}>
        {placed.map((node) => (
          <line key={node.id} x1={origin.x} y1={origin.y} x2={node.x} y2={node.y} />
        ))}
      </svg>

      {placed.map((node, i) => (
        <button
          key={node.id}
          type="button"
          className={styles.node}
          style={{
            left: `${node.x}px`,
            top: `${node.y}px`,
            transitionDelay: reducedMotion ? "0ms" : `${i * 70}ms`,
          }}
          tabIndex={visible ? 0 : -1}
          onClick={() => jumpTo(node.target)}
        >
          <span className={styles.nodeDot} />
          {node.label}
        </button>
      ))}
    </div>
  );
}
