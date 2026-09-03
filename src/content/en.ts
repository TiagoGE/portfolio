import type { Dictionary } from "./types";

export const en: Dictionary = {
  locale: "en-CA",
  meta: {
    title: "Tiago Guerra Endsfeldz, developer and co-founder",
    description:
      "From a Vancouver construction site to the marketplace connecting construction workers with companies.",
  },
  hero: {
    name: "Tiago Guerra Endsfeldz",
    role: "Developer · Co-founder & CTO, Trampocerto",
    tagline:
      "Four years in Canada. A degree and a problem I returned to Brazil to solve.",
    scrollHint: "scroll to take off",
  },
  hud: {
    title: "Flight plan",
    leg: "Leg",
    statusLabel: "Status",
    year: "Year",
    distance: "Travelled",
    altitude: "Altitude",
    status: {
      outbound: "En route",
      grounded: "On the ground",
      returning: "Returning",
    },
  },
  nodes: {
    clusterLabel: "Points of interest on the map",
    vancouver: [
      { id: "edu", label: "Education", target: "educacao" },
      { id: "field", label: "On site", target: "campo" },
      { id: "ball", label: "Football", target: "futebol" },
    ],
    saoPaulo: [
      { id: "azure", label: "Azure", target: "azure" },
      { id: "tc", label: "Trampocerto", target: "trampocerto" },
      { id: "proj", label: "Projects", target: "outros-projetos" },
    ],
  },
  miniMap: {
    label: "Route",
    inView: "You are in",
  },
  canada: {
    kicker: "2022 to 2026 · Vancouver, Canada",
    title: "What Canada taught me",
    education: {
      school: "Douglas College",
      program: "Computing Studies & Information Systems",
      period: "2022 to 2024",
      body:
        "A solid grounding in computing fundamentals and information systems, built while studying and working in a second language. Four years away from home demanded [[resilience]] and [[critical thinking]] to decide where to invest time each week.",
      photo: {
        src: "/fotos/douglas-campus.webp",
        alt: "A laptop open on a table in the Douglas College atrium, a code editor showing CSS next to the assignment PDF",
        caption: "Web development coursework on campus",
        width: 900,
        height: 1200,
      },
      alsoStudiedLabel: "Also studied",
      alsoStudied: [
        "Java",
        "Spring Boot",
        "Python",
        "PHP",
        "Express",
        "SQL Server",
        "MongoDB",
      ],
    },
    ground: [
      {
        title: "Construction",
        period: "2023 to 2026",
        body:
          "Three years in construction, during and after college. No two days were alike: some demanded intense physical work, others a fast pace with the entire crew sharing one space. That environment is where I developed [[organisation]], [[communication]], [[problem solving]] and [[self-reliance]].",
        photo: {
          src: "/fotos/obra-equipe.webp",
          alt: "Four construction workers smiling in front of an excavator, in work clothes covered in mud",
          caption: "The crew, on site in Vancouver",
          width: 900,
          height: 1200,
        },
      },
      {
        title: "Football coach",
        period: "Vancouver",
        body:
          "Coached children and teenagers in English, a language that was neither mine nor theirs. Teaching under those conditions demands [[clarity]], [[patience]] and [[leadership]] in every session.",
        photo: {
          src: "/fotos/futebol-campo.webp",
          alt: "Tiago from behind in an academy shirt with a ball at his feet on an empty pitch under an overcast sky",
          caption: "Training ground, VOLF Soccer Academy",
          width: 675,
          height: 1200,
        },
      },
    ],
  },
  brazil: {
    kicker: "January 2026 to today · São Paulo, Brazil",
    title: "What I have built since coming back",
    certification: {
      title: "Azure Fundamentals (AZ-900)",
      issuer: "Microsoft",
      date: "8 January 2026",
      credentialUrl:
        "https://learn.microsoft.com/en-us/users/tiagoguerraendsfeldz-8571/credentials/4a7b9e91bd9b7d33",
      credentialLabel: "Verify with Microsoft",
      image: {
        src: "/fotos/azure-certificado.webp",
        alt: "Microsoft Certified: Azure Fundamentals certificate issued to Tiago Guerra Endsfeldz on 8 January 2026",
        caption: "",
        width: 1100,
        height: 517,
      },
      body:
        "Cloud fundamentals: service models (IaaS, PaaS, SaaS), regions and availability zones, identity and access control, and the cost and shared-responsibility models. Trampocerto does not run on Azure, but on a managed serverless stack. The concepts carry over regardless. Shared responsibility is what defines where the provider's protection ends and mine begins.",
    },
    sideProjects: {
      label: "Other projects",
      items: [
        {
          name: "RacconWeb",
          body:
            "A site and a service building web pages for local businesses. The client fills in a form and gets a finished prototype within 24 hours, before any meeting. The whole page is a single HTML file, no framework and no build step, with AAA contrast and full functionality without JavaScript.",
          meta: "Plain HTML, CSS and JavaScript · Live at racconweb.com.br",
          href: "https://github.com/TiagoGE/racconWeb",
        },
        {
          name: "RecordVAR",
          body:
            "Retroactive recording for sports courts. The camera records continuously in two-second segments, and when someone presses the button the system assembles a twenty-second clip of the play that just happened. Segments are concatenated without re-encoding, and audio is never recorded, for privacy.",
          meta: "Python and FFmpeg · In development",
          href: "https://github.com/TiagoGE/Rec-field",
        },
        {
          name: "Remote Android automation",
          body:
            "An Android app that takes remote commands over Firebase Cloud Messaging and types text into other apps through the AccessibilityService, working even with the screen off. Writing follows three cascading paths with retries and backoff, because the target app's interface does not always render at the same speed.",
          meta: "Kotlin and Jetpack Compose · Demo project",
          href: "https://github.com/TiagoGE/AccessibilityApp-android",
        },
        {
          name: "CS2 Utilities",
          body:
            "A desktop app that finds grenade line-up videos in four clicks, instead of leaving the match to search YouTube. Client and API are separate, so the library grows without shipping a new build. I started it back in Canada. The engineering is done and the executable is published, but the library stayed incomplete: it needed the videos recorded and edited, and that was never the part I wanted to do.",
          meta: "Python, CustomTkinter and Flask · Library incomplete",
          href: "https://github.com/TiagoGE/CS2-Utilities",
        },
      ],
      moreLabel: "The rest of my projects are on GitHub",
      moreHref: "https://github.com/TiagoGE",
    },
    trampocerto: {
      title: "Trampocerto",
      role: "Co-founder & CTO",
      period: "January 2026 to today",
      status: "In production",
      body:
        "A labour marketplace for the construction industry. It connects bricklayers, helpers and electricians with companies that need to hire fast, with verified profiles, daily attendance tracking and automatic payment. I learned the problems it solves by doing the work: informal hiring, no clear contract, no guarantee of payment, and no record a worker can carry to the next job. Each of those failures became a product decision.",
      platforms: ["Mobile app (iOS and Android)", "Company web dashboard", "Admin panel"],
      stack: [
        { label: "Mobile", items: ["React Native", "Expo", "Expo Router", "NativeWind"] },
        { label: "Web", items: ["Next.js 15", "Tailwind CSS", "shadcn/ui"] },
        {
          label: "Back-end & data",
          items: ["Supabase", "PostgreSQL", "Edge Functions (Deno)", "Realtime"],
        },
        { label: "Payments", items: ["Asaas", "Marketplace split", "PIX", "Tokenised cards"] },
        { label: "Infrastructure", items: ["Vercel", "Cloudflare (WAF + DNS)", "EAS Build"] },
      ],
      highlights: [
        {
          title: "Row Level Security on every table",
          body:
            "Authorisation lives in the database, not the application. Business rules run in SECURITY DEFINER functions, so that even with a compromised client the data remains protected.",
        },
        {
          title: "Split payments with server-side tokenisation",
          body:
            "Cards are tokenised off my server; worker payouts go out over PIX from an Edge Function. Card data never touches my infrastructure.",
        },
        {
          title: "Hardened authentication",
          body:
            "PKCE flow, email MFA for companies, HMAC-signed admin sessions, WAF at the edge. A marketplace moves money, therefore the attack surface is real.",
        },
        {
          title: "Automated lifecycle",
          body:
            "Job confirmation, auto-close, contract extensions, disputes and removals all run themselves. Less manual operations as the user base grows.",
        },
        {
          title: "End-to-end TypeScript",
          body:
            "85+ screens across mobile, dashboard and admin sharing one back-end and the same types. A contract change breaks the build, not production.",
        },
      ],
      siteUrl: "https://www.trampocertoapp.com/",
      siteLabel: "Open Trampocerto in a new tab",
      siteCta: "See it live",
      stores: [
        {
          label: "App Store",
          href: "https://apps.apple.com/br/app/trampocerto/id6801587837",
        },
        {
          label: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.trampocerto.app",
        },
      ],
      challengesLabel: "What was hard",
      challenges: [
        {
          title: "Authorisation that cannot fail",
          body:
            "Row Level Security protects the data, but a policy that queries the very table it protects recurses and takes the query down with it. The way out was moving business rules into SECURITY DEFINER functions, knowing that one badly written privileged function opens exactly the hole the policy was meant to close.",
        },
        {
          title: "Moving money without storing cards",
          body:
            "A marketplace charges one side and pays the other. Storing card data would bring a compliance burden a one-person team cannot carry. Tokenisation happens off my server and worker payouts go out over PIX from an Edge Function. It cost more integration time and removed an entire category of risk.",
        },
        {
          title: "When the two sides disagree",
          body:
            "Daily attendance is where the product touches real money. A company and a worker can remember the same day differently, and the system has to decide. I built confirmation, disputes and an audit trail before automating payment, because automating first would have meant automating the conflict.",
        },
        {
          title: "Being the whole team",
          body:
            "More than 85 screens across the app, the dashboard and the admin panel, with one person. What held it together was end-to-end TypeScript with shared types, so a contract change breaks the build instead of breaking in a user's hands. The hard part was not writing it, it was deciding every day what not to build.",
        },
      ],
      repoUrl: "https://github.com/TiagoGE/trampocerto-showcase",
      repoLabel: "See the technical showcase",
    },
  },
  contact: {
    title: "Let's talk",
    email: "tiago.guerrae@gmail.com",
    github: "https://github.com/TiagoGE",
    linkedin: "https://www.linkedin.com/in/tiago-guerra-endsfeldz/",
  },
};
