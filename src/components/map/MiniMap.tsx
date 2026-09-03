"use client";

import { useMemo } from "react";
import { geoPath } from "d3-geo";
import type { GeoPermissibleObjects } from "d3-geo";
import { CITIES, americasFeatures, greatCircle, makeProjection } from "@/lib/geo";
import { useActiveSection } from "@/lib/useActiveSection";
import type { Dictionary } from "@/content/types";
import styles from "./MiniMap.module.css";

const LAND = americasFeatures();
/*
 * Kept deliberately small. This panel is fixed over the page, and the content column is
 * centred — anything wider than this reaches past the gutter and covers body text,
 * which is exactly what the first version did.
 */
const WIDTH = 120;
const HEIGHT = 84;

/** Which city each detail section belongs to. */
const SECTION_CITY: Record<string, "yvr" | "gru"> = {
  canada: "yvr",
  brasil: "gru",
  contato: "gru",
};

const SECTIONS = ["canada", "brasil", "contato"];

/**
 * The persistent anchor. Once the big map scrolls away the visitor keeps a compass:
 * where they are on the route, and one click back to the other end of it.
 *
 * Country outlines are drawn hairline-thin here — at this size they read as texture
 * and context rather than as a legible map, which is the intent.
 */
export function MiniMap({ dict }: { dict: Dictionary }) {
  const active = useActiveSection(SECTIONS);

  const { path, points, route } = useMemo(() => {
    const projection = makeProjection(WIDTH, HEIGHT, LAND, 8);
    const p = geoPath(projection);
    const gru = projection(CITIES.saoPaulo.coord);
    const yvr = projection(CITIES.vancouver.coord);
    return {
      path: p,
      route: greatCircle(CITIES.saoPaulo.coord, CITIES.vancouver.coord),
      points: {
        gru: gru ? { x: gru[0], y: gru[1] } : null,
        yvr: yvr ? { x: yvr[0], y: yvr[1] } : null,
      },
    };
  }, []);

  const activeCity = active ? SECTION_CITY[active] : null;

  const jumpTo = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cities = [
    { key: "yvr" as const, city: CITIES.vancouver, point: points.yvr, target: "canada" },
    { key: "gru" as const, city: CITIES.saoPaulo, point: points.gru, target: "brasil" },
  ];

  return (
    <aside className={styles.mini} data-visible={active !== null} aria-hidden={active === null}>
      <div className={styles.header}>{dict.miniMap.label}</div>

      <svg width={WIDTH} height={HEIGHT} className={styles.svg} aria-hidden="true">
        <g className={styles.land}>
          {LAND.features.map((f, i) => (
            <path key={i} d={path(f as GeoPermissibleObjects) ?? undefined} />
          ))}
        </g>
        <path className={styles.route} d={path(route as GeoPermissibleObjects) ?? undefined} />
        {cities.map(({ key, point }) =>
          point ? (
            <circle
              key={key}
              className={styles.dot}
              data-active={activeCity === key}
              cx={point.x}
              cy={point.y}
              r={activeCity === key ? 4 : 2.5}
            />
          ) : null,
        )}
      </svg>

      {/* The "you are in" wording lives on the group label — at this width there is no
          room for it on screen without wrapping. */}
      <div className={styles.legend} role="group" aria-label={dict.miniMap.inView}>
        {cities.map(({ key, city, target }) => (
          <button
            key={key}
            type="button"
            className={styles.jump}
            data-active={activeCity === key}
            tabIndex={active === null ? -1 : 0}
            onClick={() => jumpTo(target)}
          >
            {city.iata}
          </button>
        ))}
      </div>
    </aside>
  );
}
