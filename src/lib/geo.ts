import { geoEquirectangular, geoInterpolate, geoPath, geoDistance } from "d3-geo";
import type { GeoProjection, GeoPermissibleObjects } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import worldTopo from "world-atlas/countries-110m.json";

/** [longitude, latitude] — the order d3-geo expects. */
export type Coord = [number, number];

export const CITIES = {
  saoPaulo: {
    id: "gru",
    name: "São Paulo",
    iata: "GRU",
    coord: [-46.633, -23.55] as Coord,
  },
  vancouver: {
    id: "yvr",
    name: "Vancouver",
    iata: "YVR",
    coord: [-123.116, 49.283] as Coord,
  },
} as const;

/** Great-circle distance between the two cities, in kilometres. */
export const ROUTE_DISTANCE_KM = Math.round(
  geoDistance(CITIES.saoPaulo.coord, CITIES.vancouver.coord) * 6371,
);

/**
 * The Americas only. The 110m world atlas is the whole globe, so we keep just the
 * features whose centroid sits in the western hemisphere band. Cheaper and more robust
 * than maintaining a hardcoded list of ISO country codes.
 */
export function americasFeatures(): FeatureCollection<Geometry> {
  const topology = worldTopo as unknown as Topology;
  const world = feature(
    topology,
    topology.objects.countries,
  ) as unknown as FeatureCollection<Geometry>;

  const path = geoPath();
  const features = world.features.filter((f) => {
    const [lon, lat] = path.centroid(f as GeoPermissibleObjects) as [number, number];
    if (!Number.isFinite(lon) || !Number.isFinite(lat)) return false;
    return lon >= -170 && lon <= -30 && lat >= -60 && lat <= 84;
  });

  return { type: "FeatureCollection", features };
}

/**
 * Equirectangular, fitted to the Americas.
 *
 * Chosen over azimuthal/conic specifically for the arc. Azimuthal projections render
 * great circles through their centre as near-straight lines, which flattened the
 * SP–Vancouver route to ~9px of bow and killed the airline-route read; equirectangular
 * gives ~48px over the same chord and fills the frame more fully. The trade is
 * horizontal stretch at high latitude, acceptable for a stylised instrument map.
 */
export function makeProjection(
  width: number,
  height: number,
  land: FeatureCollection<Geometry>,
  padding = 24,
): GeoProjection {
  return geoEquirectangular()
    .fitExtent(
      [
        [padding, padding],
        [width - padding, height - padding],
      ],
      land as unknown as GeoPermissibleObjects,
    );
}

/**
 * Samples the great-circle path between two points as a GeoJSON LineString, so geoPath
 * can draw it with the projection's own curvature applied.
 */
export function greatCircle(from: Coord, to: Coord, steps = 128): Feature<Geometry> {
  const interpolate = geoInterpolate(from, to);
  const coordinates = Array.from({ length: steps + 1 }, (_, i) =>
    interpolate(i / steps),
  );
  return {
    type: "Feature",
    properties: {},
    geometry: { type: "LineString", coordinates },
  };
}

/** Point along the great circle at progress `t` (0 = from, 1 = to). */
export function pointAt(from: Coord, to: Coord, t: number): Coord {
  return geoInterpolate(from, to)(clamp01(t)) as Coord;
}

/**
 * Heading of the plane in screen space at progress `t`, in degrees. Derived from a
 * short forward step through the projection so the icon follows the drawn arc rather
 * than the raw geographic bearing — those diverge once the projection curves.
 */
export function headingAt(
  projection: GeoProjection,
  from: Coord,
  to: Coord,
  t: number,
): number {
  const eps = 0.001;
  const t0 = clamp01(t - eps);
  const t1 = clamp01(t + eps);
  const a = projection(pointAt(from, to, t0));
  const b = projection(pointAt(from, to, t1));
  if (!a || !b) return 0;
  return (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
}

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}
