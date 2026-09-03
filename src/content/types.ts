export const LANGUAGES = ["pt", "en"] as const;
export type Lang = (typeof LANGUAGES)[number];

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Photo {
  /** Path under /public. */
  src: string;
  /** Describes the image for anyone who can't see it. Not a duplicate of the caption. */
  alt: string;
  caption: string;
  /** Intrinsic size, so the browser reserves space and the page never jumps. */
  width: number;
  height: number;
}

/**
 * Deliberately NOT a job entry. These render as chapters of one four-year period, never
 * as a chronological list beside dev roles — that framing would invite exactly the
 * comparison the site should not invite.
 */
export interface GroundChapter {
  title: string;
  period: string;
  body: string;
  /** Optional: Douglas College has no photograph, and inventing one would be worse
      than the asymmetry. */
  photo?: Photo;
}

/** A clickable node orbiting a city on the map. */
export interface MapNodeDef {
  id: string;
  label: string;
  /** Element id further down the page, without the leading '#'. */
  target: string;
}

export interface Dictionary {
  locale: string;
  meta: { title: string; description: string };
  hero: {
    name: string;
    role: string;
    tagline: string;
    scrollHint: string;
  };
  hud: {
    title: string;
    /** Row labels. */
    leg: string;
    statusLabel: string;
    year: string;
    distance: string;
    altitude: string;
    /** Row values for the status row, chosen by flight phase. */
    status: {
      outbound: string;
      grounded: string;
      returning: string;
    };
  };
  nodes: {
    vancouver: MapNodeDef[];
    saoPaulo: MapNodeDef[];
    /** Screen-reader label for the node cluster. */
    clusterLabel: string;
  };
  miniMap: {
    label: string;
    inView: string;
  };
  canada: {
    kicker: string;
    title: string;
    education: {
      school: string;
      program: string;
      period: string;
      body: string;
      /** Label plus the languages studied. Plain text, not pills: these are keywords
          for scanning, not a claim about daily use. */
      alsoStudiedLabel: string;
      alsoStudied: string[];
      photo?: Photo;
    };
    ground: GroundChapter[];
  };
  brazil: {
    kicker: string;
    title: string;
    certification: {
      title: string;
      issuer: string;
      date: string;
      body: string;
      /** Microsoft's own verification page. A claimed certification that can be checked
          in one click is worth more than the image beside it. */
      credentialUrl: string;
      credentialLabel: string;
      image: Photo;
    };
    /**
     * Everything that is not Trampocerto. Rendered deliberately quieter: these are
     * real projects worth showing, but giving them equal weight would flatten the one
     * that actually carries the section.
     */
    sideProjects: {
      label: string;
      items: { name: string; body: string; meta: string; href: string }[];
      moreLabel: string;
      moreHref: string;
    };
    trampocerto: {
      title: string;
      role: string;
      period: string;
      status: string;
      body: string;
      platforms: string[];
      stack: SkillGroup[];
      /** The engineering decisions worth defending in an interview. */
      highlights: { title: string; body: string }[];
      repoUrl: string;
      repoLabel: string;
      /** Live product URL. Empty string renders the status as plain text, never a
          dead link. */
      siteUrl: string;
      /** Accessible name for the status link, since "Em produção" alone says nothing
          about where it goes. */
      siteLabel: string;
      /** The call to action shown beside the status. The status alone reads as a fact,
          not as something you can click. */
      siteCta: string;
      /** Live store listings. */
      stores: { label: string; href: string }[];
      /** The engineering problems that were genuinely hard. Separate from `highlights`:
          those state what the system does, these state what it cost to get there. */
      challengesLabel: string;
      challenges: { title: string; body: string }[];
    };
  };
  contact: {
    title: string;
    email: string;
    github: string;
    linkedin: string;
  };
}
