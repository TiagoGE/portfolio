"use client";

import { FlightMap, flightState } from "@/components/map/FlightMap";
import { TelemetryHUD } from "@/components/map/TelemetryHUD";
import { MapNodes } from "@/components/map/MapNodes";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { progress as remap } from "@/lib/motion";
import type { Dictionary } from "@/content/types";
import styles from "./Journey.module.css";

/**
 * The spine of the site: one tall section, a sticky map inside it, and the whole
 * journey scrubbed by scroll position. Everything below this section is the detail
 * view for whichever node the visitor picks.
 */
export function Journey({ dict }: { dict: Dictionary }) {
  const { ref, progress, reducedMotion } = useScrollProgress<HTMLElement>();

  /*
   * The hero copy dims as the plane departs but never leaves — it settles at a floor
   * that stays readable over the map instead of fading to nothing. The scroll hint is
   * the exception: it's an instruction, so once you've scrolled it has done its job and
   * goes all the way out.
   */
  const HERO_FLOOR = 0.5;
  const fade = remap(progress, 0, 0.12);
  const heroOpacity = 1 - fade * (1 - HERO_FLOOR);
  const hintOpacity = 1 - fade;

  const state = flightState(progress);

  // Vancouver's nodes unfold the moment the plane lands and stay up for the whole
  // grounded stretch; São Paulo's only appear once the return leg finishes.
  //
  // Reduced motion pins progress at 1, which would leave Vancouver's cluster forever
  // closed and strand those users without that half of the navigation — so both open.
  const vancouverOpen = reducedMotion || state.phase === "grounded";
  const saoPauloOpen =
    reducedMotion || (state.phase === "return" && state.legProgress > 0.92);

  return (
    <section ref={ref} className={styles.journey}>
      <div className={styles.sticky}>
        <FlightMap progress={progress}>
          {({ positions, size }) => {
            const radius = Math.max(96, Math.min(168, size.width * 0.16));
            return (
              <>
                <MapNodes
                  origin={positions.yvr}
                  nodes={dict.nodes.vancouver}
                  visible={vancouverOpen}
                  baseAngle={196}
                  spread={30}
                  radius={radius}
                  clusterLabel={dict.nodes.clusterLabel}
                  reducedMotion={reducedMotion}
                  bounds={size}
                />
                <MapNodes
                  origin={positions.gru}
                  nodes={dict.nodes.saoPaulo}
                  visible={saoPauloOpen}
                  baseAngle={-28}
                  spread={38}
                  radius={radius}
                  clusterLabel={dict.nodes.clusterLabel}
                  reducedMotion={reducedMotion}
                  bounds={size}
                />
              </>
            );
          }}
        </FlightMap>

        {/* No aria-hidden: the copy stays on screen, so it stays in the a11y tree too. */}
        <div className={styles.hero} style={{ opacity: heroOpacity }}>
          <p className={styles.role}>{dict.hero.role}</p>
          <h1 className={styles.name}>{dict.hero.name}</h1>
          <p className={styles.tagline}>{dict.hero.tagline}</p>
          {!reducedMotion && (
            <p className={styles.hint} style={{ opacity: hintOpacity }}>
              {dict.hero.scrollHint}
            </p>
          )}
        </div>

        <div className={styles.hudSlot}>
          <TelemetryHUD progress={progress} dict={dict} />
        </div>
      </div>
    </section>
  );
}
