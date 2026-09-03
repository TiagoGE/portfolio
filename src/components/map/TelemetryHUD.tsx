"use client";

import { ROUTE_DISTANCE_KM } from "@/lib/geo";
import { flightState } from "./FlightMap";
import type { Dictionary } from "@/content/types";
import styles from "./TelemetryHUD.module.css";

interface TelemetryHUDProps {
  progress: number;
  dict: Dictionary;
}

/**
 * Flight-instrument readout beside the map. Every number is derived from the real
 * route or the real timeline — nothing here is decorative filler.
 */
export function TelemetryHUD({ progress, dict }: TelemetryHUDProps) {
  const state = flightState(progress);
  const t = dict.hud;

  const legLabel =
    state.phase === "outbound"
      ? "GRU → YVR"
      : state.phase === "return"
        ? "YVR → GRU"
        : "YVR"; // on the ground

  const statusLabel =
    state.phase === "outbound"
      ? t.status.outbound
      : state.phase === "return"
        ? t.status.returning
        : t.status.grounded;

  const distance = Math.round(ROUTE_DISTANCE_KM * state.legProgress);

  // Grounded years tick 2022 → 2026 while the plane sits in Vancouver.
  const year =
    state.phase === "outbound"
      ? 2022
      : state.phase === "grounded"
        ? 2022 + Math.floor(state.legProgress * 4)
        : 2026;

  // Cruise profile: climb, cruise, descend.
  const altitude =
    state.phase === "grounded"
      ? 0
      : Math.round(11_500 * Math.sin(Math.PI * state.legProgress));

  const rows: Array<[string, string]> = [
    [t.leg, legLabel],
    [t.statusLabel, statusLabel],
    [t.year, String(year)],
    [t.distance, `${distance.toLocaleString(dict.locale)} km`],
    [t.altitude, `${altitude.toLocaleString(dict.locale)} m`],
  ];

  return (
    <aside className={styles.hud} aria-live="polite">
      <div className={styles.header}>
        <span className={styles.dot} data-active={state.phase !== "grounded"} />
        {t.title}
      </div>
      <dl className={styles.readout}>
        {rows.map(([label, value]) => (
          <div key={label} className={styles.row}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
