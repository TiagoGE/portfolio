"use client";

import { useMemo } from "react";
import { geoPath, geoGraticule10 } from "d3-geo";
import type { GeoPermissibleObjects } from "d3-geo";
import {
  CITIES,
  americasFeatures,
  greatCircle,
  headingAt,
  makeProjection,
  pointAt,
  type Coord,
} from "@/lib/geo";
import { useElementSize } from "@/lib/useScrollProgress";
import styles from "./FlightMap.module.css";

/** Parsed once per page load, not per render — the topology never changes. */
const LAND = americasFeatures();
const GRATICULE = geoGraticule10();

/**
 * The journey is scrubbed as three phases across a single 0..1 progress value:
 * outbound, four years on the ground in Vancouver, then the return.
 */
const OUTBOUND_END = 0.45;
const RETURN_START = 0.6;

export type FlightPhase = "outbound" | "grounded" | "return";

export interface FlightState {
  phase: FlightPhase;
  /** Progress within the current leg, 0..1. */
  legProgress: number;
  from: Coord;
  to: Coord;
}

export function flightState(t: number): FlightState {
  const sp = CITIES.saoPaulo.coord;
  const yvr = CITIES.vancouver.coord;

  if (t <= OUTBOUND_END) {
    return { phase: "outbound", legProgress: t / OUTBOUND_END, from: sp, to: yvr };
  }
  if (t < RETURN_START) {
    return { phase: "grounded", legProgress: 1, from: sp, to: yvr };
  }
  return {
    phase: "return",
    legProgress: (t - RETURN_START) / (1 - RETURN_START),
    from: yvr,
    to: sp,
  };
}

export interface ScreenPoint {
  x: number;
  y: number;
}

export interface FlightMapOverlay {
  /** Projected screen positions, so HTML overlays can anchor to real geography. */
  positions: Record<"gru" | "yvr", ScreenPoint>;
  size: { width: number; height: number };
}

interface FlightMapProps {
  /** 0..1 across the whole journey. */
  progress: number;
  /**
   * Render prop rather than plain children: overlays need the projected city
   * coordinates, which only exist once the container has been measured.
   */
  children?: (overlay: FlightMapOverlay) => React.ReactNode;
}

export function FlightMap({ progress, children }: FlightMapProps) {
  const { ref, size } = useElementSize<HTMLDivElement>();
  const { width, height } = size;

  const projection = useMemo(
    () => (width && height ? makeProjection(width, height, LAND) : null),
    [width, height],
  );

  const path = useMemo(() => (projection ? geoPath(projection) : null), [projection]);

  const state = flightState(progress);

  // The full route, drawn faint underneath as the "planned" path.
  const routeOutbound = useMemo(
    () => greatCircle(CITIES.saoPaulo.coord, CITIES.vancouver.coord),
    [],
  );

  // The travelled portion of the current leg, redrawn as the scrub advances.
  const travelled = useMemo(() => {
    const steps = Math.max(2, Math.round(128 * state.legProgress));
    const coordinates = Array.from({ length: steps + 1 }, (_, i) =>
      pointAt(state.from, state.to, (i / steps) * state.legProgress),
    );
    return {
      type: "Feature" as const,
      properties: {},
      geometry: { type: "LineString" as const, coordinates },
    };
  }, [state.from, state.to, state.legProgress]);

  const plane = useMemo(() => {
    if (!projection) return null;
    const coord = pointAt(state.from, state.to, state.legProgress);
    const screen = projection(coord);
    if (!screen) return null;
    return {
      x: screen[0],
      y: screen[1],
      heading: headingAt(projection, state.from, state.to, state.legProgress),
    };
  }, [projection, state.from, state.to, state.legProgress]);

  const cityPoints = useMemo(() => {
    if (!projection) return [];
    return [CITIES.saoPaulo, CITIES.vancouver].flatMap((city) => {
      const screen = projection(city.coord);
      return screen ? [{ ...city, x: screen[0], y: screen[1] }] : [];
    });
  }, [projection]);

  const arrived =
    (state.phase === "outbound" && state.legProgress >= 1) || state.phase !== "outbound";

  const overlay: FlightMapOverlay | null = useMemo(() => {
    if (!projection) return null;
    const gru = projection(CITIES.saoPaulo.coord);
    const yvr = projection(CITIES.vancouver.coord);
    if (!gru || !yvr) return null;
    return {
      positions: {
        gru: { x: gru[0], y: gru[1] },
        yvr: { x: yvr[0], y: yvr[1] },
      },
      size: { width, height },
    };
  }, [projection, width, height]);

  return (
    <div ref={ref} className={styles.container}>
      {projection && path && (
        <svg
          className={styles.svg}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Mapa das Américas com a rota de voo entre São Paulo e Vancouver"
        >
          <defs>
            <radialGradient id="node-glow">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g className={styles.graticule}>
            <path d={path(GRATICULE as GeoPermissibleObjects) ?? undefined} />
          </g>

          <g className={styles.land}>
            {LAND.features.map((f, i) => (
              <path key={i} d={path(f as GeoPermissibleObjects) ?? undefined} />
            ))}
          </g>

          <path
            className={styles.routePlanned}
            d={path(routeOutbound as GeoPermissibleObjects) ?? undefined}
          />
          <path
            className={styles.routeTravelled}
            d={path(travelled as GeoPermissibleObjects) ?? undefined}
          />

          {cityPoints.map((city) => {
            const isActive =
              city.id === "yvr" ? arrived : state.phase === "return" && state.legProgress >= 1;
            return (
              <g
                key={city.id}
                className={`${styles.city} ${isActive ? styles.cityActive : ""}`}
                transform={`translate(${city.x} ${city.y})`}
              >
                <circle className={styles.cityGlow} r={34} fill="url(#node-glow)" />
                <circle className={styles.cityRing} r={11} />
                <circle className={styles.cityDot} r={3.5} />
                <text className={styles.cityLabel} x={18} y={-8}>
                  {city.iata}
                </text>
                <text className={styles.cityName} x={18} y={6}>
                  {city.name}
                </text>
              </g>
            );
          })}

          {plane && (
            /*
             * The silhouette is authored nose-up in a 24x24 box, so it rotates by
             * heading + 90 (screen heading 0 points right) and is re-centred on its own
             * middle before being placed on the arc.
             */
            <g
              className={styles.plane}
              transform={`translate(${plane.x} ${plane.y}) rotate(${plane.heading + 90}) scale(1.35) translate(-12 -12)`}
            >
              <path d="M21 16v-2l-8-5V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </g>
          )}
        </svg>
      )}
      {overlay && children?.(overlay)}
    </div>
  );
}
