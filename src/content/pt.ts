import type { Dictionary } from "./types";

export const pt: Dictionary = {
  locale: "pt-BR",
  meta: {
    title: "Tiago Guerra Endsfeldz, desenvolvedor e co-fundador",
    description:
      "Do canteiro de obras em Vancouver ao marketplace que conecta trabalhadores da construção civil a empresas.",
  },
  hero: {
    name: "Tiago Guerra Endsfeldz",
    role: "Desenvolvedor · Co-fundador & CTO, Trampocerto",
    tagline:
      "Quatro anos no Canadá. Um diploma e um problema que retornei ao Brasil para resolver.",
    scrollHint: "role para decolar",
  },
  hud: {
    title: "Plano de voo",
    leg: "Trecho",
    statusLabel: "Status",
    year: "Ano",
    distance: "Percorrido",
    altitude: "Altitude",
    status: {
      outbound: "Em rota",
      grounded: "Em solo",
      returning: "Retornando",
    },
  },
  nodes: {
    clusterLabel: "Pontos de interesse no mapa",
    vancouver: [
      { id: "edu", label: "Educação", target: "educacao" },
      { id: "field", label: "Canteiro", target: "campo" },
      { id: "ball", label: "Futebol", target: "futebol" },
    ],
    saoPaulo: [
      { id: "azure", label: "Azure", target: "azure" },
      { id: "tc", label: "Trampocerto", target: "trampocerto" },
      { id: "proj", label: "Projetos", target: "outros-projetos" },
    ],
  },
  miniMap: {
    label: "Rota",
    inView: "Você está em",
  },
  canada: {
    kicker: "2022 a 2026 · Vancouver, Canadá",
    title: "O que o Canadá me ensinou",
    education: {
      school: "Douglas College",
      program: "Computing Studies & Information Systems",
      period: "2022 a 2024",
      body:
        "Base sólida em fundamentos de computação e sistemas de informação, construída enquanto eu estudava e trabalhava em um segundo idioma. Foram quatro anos longe de casa, que cobraram [[resiliência]] e [[análise crítica]] para decidir onde investir tempo a cada semana.",
      photo: {
        src: "/fotos/douglas-campus.webp",
        alt: "Notebook aberto sobre uma mesa no átrio do Douglas College, com um editor de código mostrando CSS ao lado do PDF do trabalho",
        caption: "Trabalho de desenvolvimento web no campus",
        width: 900,
        height: 1200,
      },
      alsoStudiedLabel: "Também estudei",
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
        title: "Construção civil",
        period: "2023 a 2026",
        body:
          "Três anos na construção civil, durante e depois da faculdade. Nenhum dia era igual ao anterior: alguns exigiam esforço físico intenso, outros um ritmo acelerado com a equipe inteira dividindo o mesmo espaço. Foi nesse ambiente que desenvolvi [[organização]], [[comunicação]], [[resolução de problemas]] e [[autonomia]].",
        photo: {
          src: "/fotos/obra-equipe.webp",
          alt: "Quatro trabalhadores da construção civil sorrindo na frente de uma escavadeira, com roupa de trabalho suja de barro",
          caption: "A equipe, em obra em Vancouver",
          width: 900,
          height: 1200,
        },
      },
      {
        title: "Professor de futebol",
        period: "Vancouver",
        body:
          "Treinei crianças e adolescentes em inglês, idioma que não era o meu nem o deles. Ensinar nessas condições exigiu [[clareza]], [[paciência]] e [[liderança]] em cada sessão.",
        photo: {
          src: "/fotos/futebol-campo.webp",
          alt: "Tiago de costas, com a camisa da academia de futebol e uma bola aos pés, em um campo vazio sob céu nublado",
          caption: "Campo de treino, VOLF Soccer Academy",
          width: 675,
          height: 1200,
        },
      },
    ],
  },
  brazil: {
    kicker: "Janeiro de 2026 até hoje · São Paulo, Brasil",
    title: "O que construí desde que voltei",
    certification: {
      title: "Azure Fundamentals (AZ-900)",
      issuer: "Microsoft",
      date: "8 de janeiro de 2026",
      credentialUrl:
        "https://learn.microsoft.com/en-us/users/tiagoguerraendsfeldz-8571/credentials/4a7b9e91bd9b7d33",
      credentialLabel: "Verificar na Microsoft",
      image: {
        src: "/fotos/azure-certificado.webp",
        alt: "Certificado Microsoft Certified: Azure Fundamentals em nome de Tiago Guerra Endsfeldz, obtido em 8 de janeiro de 2026",
        caption: "",
        width: 1100,
        height: 517,
      },
      body:
        "Fundamentos de nuvem: modelos de serviço (IaaS, PaaS, SaaS), regiões e zonas de disponibilidade, identidade e controle de acesso, e os modelos de custo e de responsabilidade compartilhada. O Trampocerto não é executado em Azure, e sim em uma stack serverless gerenciada, mas os conceitos são os mesmos. É a responsabilidade compartilhada que define onde termina a proteção do provedor e começa a minha.",
    },
    sideProjects: {
      label: "Outros projetos",
      items: [
        {
          name: "RacconWeb",
          body:
            "Site e serviço de criação de páginas para negócios locais. O cliente preenche um formulário e recebe o protótipo pronto em 24 horas, antes de qualquer reunião. A página inteira é um único arquivo HTML, sem framework e sem build, com contraste AAA e funcionamento mesmo sem JavaScript.",
          meta: "HTML, CSS e JavaScript puro · No ar em racconweb.com.br",
          href: "https://github.com/TiagoGE/racconWeb",
        },
        {
          name: "RecordVAR",
          body:
            "Gravação retroativa para quadras esportivas. A câmera grava sem parar em segmentos de dois segundos e, quando alguém aperta o botão, o sistema monta um clipe de vinte segundos com o lance que acabou de acontecer. Os segmentos são concatenados sem recodificar, e áudio nunca é gravado, por privacidade.",
          meta: "Python e FFmpeg · Em desenvolvimento",
          href: "https://github.com/TiagoGE/Rec-field",
        },
        {
          name: "Automação remota no Android",
          body:
            "Aplicativo Android que recebe comandos remotos por Firebase Cloud Messaging e digita texto dentro de outros aplicativos usando o AccessibilityService, funcionando mesmo com a tela desligada. A escrita tem três caminhos em cascata, com nova tentativa e espera progressiva, porque a interface do aplicativo alvo nem sempre renderiza no mesmo tempo.",
          meta: "Kotlin e Jetpack Compose · Projeto de demonstração",
          href: "https://github.com/TiagoGE/AccessibilityApp-android",
        },
        {
          name: "CS2 Utilities",
          body:
            "Aplicativo de desktop que encontra vídeos de line-up de granada em quatro cliques, em vez de sair da partida para procurar no YouTube. Cliente e API separados, então a biblioteca cresce sem precisar de uma nova versão do aplicativo. Comecei ainda no Canadá. A engenharia está pronta e o executável publicado, mas a biblioteca ficou incompleta: faltava gravar e editar os vídeos, e essa nunca foi a parte que eu queria fazer.",
          meta: "Python, CustomTkinter e Flask · Biblioteca incompleta",
          href: "https://github.com/TiagoGE/CS2-Utilities",
        },
      ],
      moreLabel: "O restante dos meus projetos está no GitHub",
      moreHref: "https://github.com/TiagoGE",
    },
    trampocerto: {
      title: "Trampocerto",
      role: "Co-fundador & CTO",
      period: "Janeiro de 2026 até hoje",
      status: "Em produção",
      body:
        "Marketplace de mão de obra para a construção civil. Conecta pedreiros, ajudantes e eletricistas a empresas que precisam contratar rápido, com perfil verificado, controle de presença diária e pagamento automático. Os problemas que ele resolve eu conheci trabalhando: contratação informal, sem contrato claro, sem garantia de pagamento e sem histórico que o trabalhador possa levar para o próximo serviço. Cada uma dessas falhas se tornou uma decisão de produto.",
      platforms: [
        "App mobile (iOS e Android)",
        "Dashboard web para empresas",
        "Painel administrativo",
      ],
      stack: [
        { label: "Mobile", items: ["React Native", "Expo", "Expo Router", "NativeWind"] },
        { label: "Web", items: ["Next.js 15", "Tailwind CSS", "shadcn/ui"] },
        {
          label: "Back-end & dados",
          items: ["Supabase", "PostgreSQL", "Edge Functions (Deno)", "Realtime"],
        },
        { label: "Pagamentos", items: ["Asaas", "Split de marketplace", "PIX", "Cartão tokenizado"] },
        { label: "Infraestrutura", items: ["Vercel", "Cloudflare (WAF + DNS)", "EAS Build"] },
      ],
      highlights: [
        {
          title: "Row Level Security em todas as tabelas",
          body:
            "Autorização no banco, não na aplicação. A regra de negócio fica em funções SECURITY DEFINER, de modo que, mesmo com o cliente comprometido, os dados permanecem protegidos.",
        },
        {
          title: "Pagamentos com split e tokenização server-side",
          body:
            "Cartão tokenizado fora do meu servidor, repasse ao trabalhador via PIX disparado por Edge Function. Dado de cartão nunca toca a minha infraestrutura.",
        },
        {
          title: "Autenticação endurecida",
          body:
            "Fluxo PKCE, MFA por e-mail para empresas, sessão de admin assinada com HMAC e WAF na borda. Um marketplace movimenta dinheiro, portanto a superfície de ataque é real.",
        },
        {
          title: "Ciclo de vida automatizado",
          body:
            "Confirmação de vaga, encerramento automático, prorrogação de contrato, disputas e remoções rodam sozinhos. Menos operação manual conforme a base cresce.",
        },
        {
          title: "TypeScript de ponta a ponta",
          body:
            "85+ telas entre mobile, dashboard e admin compartilhando um único back-end e os mesmos tipos. Mudança de contrato quebra no build, não em produção.",
        },
      ],
      siteUrl: "https://www.trampocertoapp.com/",
      siteLabel: "Abrir o Trampocerto em uma nova aba",
      siteCta: "Ver o app",
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
      challengesLabel: "O que foi difícil",
      challenges: [
        {
          title: "Autorização que não pode falhar",
          body:
            "Row Level Security protege os dados, mas uma política que consulta a própria tabela que está protegendo entra em recursão e derruba a consulta. A saída foi mover a regra de negócio para funções SECURITY DEFINER, sabendo que uma função privilegiada mal escrita abre exatamente o buraco que a política deveria fechar.",
        },
        {
          title: "Movimentar dinheiro sem guardar cartão",
          body:
            "Um marketplace cobra de um lado e repassa para o outro. Guardar dado de cartão traria uma obrigação de conformidade que um time de uma pessoa não sustenta. A tokenização acontece fora do meu servidor e o repasse ao trabalhador sai por PIX, disparado por Edge Function. Custou mais tempo de integração e eliminou uma categoria inteira de risco.",
        },
        {
          title: "Quando as duas partes discordam",
          body:
            "A presença diária é onde o produto encosta em dinheiro real. Empresa e trabalhador podem lembrar o mesmo dia de formas diferentes, e o sistema precisa decidir. Construí confirmação, disputa e trilha de auditoria antes de automatizar o pagamento, porque automatizar primeiro seria automatizar o conflito.",
        },
        {
          title: "Ser o time inteiro",
          body:
            "Mais de 85 telas entre aplicativo, dashboard e painel administrativo, com uma pessoa só. O que segurou foi TypeScript de ponta a ponta com tipos compartilhados, porque assim uma mudança de contrato quebra no build e não na mão do usuário. A parte difícil não foi escrever, foi decidir todo dia o que não fazer.",
        },
      ],
      repoUrl: "https://github.com/TiagoGE/trampocerto-showcase",
      repoLabel: "Ver o showcase técnico",
    },
  },
  contact: {
    title: "Vamos conversar",
    email: "tiago.guerrae@gmail.com",
    github: "https://github.com/TiagoGE",
    linkedin: "https://www.linkedin.com/in/tiago-guerra-endsfeldz/",
  },
};
