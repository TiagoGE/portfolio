/**
 * The constants that hold the site together.
 *
 * Every section is free to change colour, texture and mood — but they all share these
 * easing curves, this spacing rhythm and this type scale. That shared skeleton is what
 * keeps five visually distinct sections reading as one site instead of five.
 */

export const EASING = {
  /** Default for anything entering the viewport. */
  enter: "cubic-bezier(0.16, 1, 0.3, 1)",
  /** Anything leaving. Faster out than in. */
  exit: "cubic-bezier(0.7, 0, 0.84, 0)",
  /** Continuous / scrubbed motion. Linear so it tracks the scrollbar honestly. */
  scrub: "linear",
} as const;

export const DURATION = {
  fast: 180,
  base: 420,
  slow: 900,
} as const;

/** Eased remap of a scrub value — cheap ease-in-out without a library. */
export function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Maps `value` from [inMin, inMax] onto [0, 1], clamped. */
export function progress(value: number, inMin: number, inMax: number): number {
  if (inMax === inMin) return 0;
  return Math.min(1, Math.max(0, (value - inMin) / (inMax - inMin)));
}
