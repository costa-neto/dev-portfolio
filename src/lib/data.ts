/* ============================================================
   Content model — bilingual (pt / en).

   Profile + résumé are the user's REAL data (migrated from the
   previous site). Projects and blog posts are placeholders from
   the design handoff until real case studies / articles land.
   ============================================================ */
import type { Localized } from "./i18n";

export type ProjectStatus = "production" | "archived" | "wip";

export interface Project {
  id: string;
  name: string;
  year: string;
  status: ProjectStatus;
  tag: Localized;
  blurb: Localized;
  stack: string[];
  metric: { v: string; l: Localized };
  nodes: string[];
}

export interface Post {
  id: string;
  title: Localized;
  date: string; // YYYY-MM-DD
  read: number;
  tags: string[];
  featured?: boolean;
  excerpt: Localized;
}

export interface Job {
  role: Localized;
  org: string;
  period: string;
  current?: boolean;
  bullets: Localized<string[]>;
  stack: string[];
}

export interface SkillGroup {
  group: Localized;
  items: string[];
}

export interface Education {
  degree: Localized;
  org: string;
  period: string;
  note?: Localized;
}

export interface Certification {
  title: Localized;
  org: string;
}

export interface Profile {
  name: string;
  handle: string;
  role: Localized;
  location: Localized;
  email: string;
  github: string;
  linkedin: string;
  years: string;
  freelance: string;
  uptime: string;
  stack: string[];
  studying: Localized<string[]>;
  funfact: Localized;
}

export interface SiteData {
  profile: Profile;
  nav: Record<"home" | "projects" | "blog" | "resume", Localized>;
  home: Record<string, Localized>;
  projects: {
    title: Localized;
    subtitle: Localized;
    statusLabels: Record<ProjectStatus, Localized>;
    items: Project[];
  };
  blog: {
    title: Localized;
    subtitle: Localized;
    readLabel: Localized;
    items: Post[];
  };
  resume: {
    title: Localized;
    subtitle: Localized;
    download: Localized;
    summary: Localized;
    sections: Record<"experience" | "skills" | "education" | "certifications" | "now", Localized>;
    experience: Job[];
    skills: SkillGroup[];
    education: Education[];
    certifications: Certification[];
  };
  footer: Record<string, Localized>;
}

export const DATA: SiteData = {
  profile: {
    name: "Neto Costa",
    handle: "costa-neto",
    role: {
      en: "Software Engineer · back-end focused",
      pt: "Engenheiro de Software · foco em back-end",
    },
    location: { en: "São Paulo, Brazil", pt: "São Paulo, Brasil" },
    email: "neto1809costa@gmail.com",
    github: "https://github.com/costa-neto",
    linkedin: "https://linkedin.com/in/costa-neto",
    years: "5+",
    freelance: "3+",
    uptime: "5y 4mo",
    stack: ["Golang", "Java", "Quarkus", "Node.js", "TypeScript", "PostgreSQL", "Redis", "Kafka", "Docker", "AWS"],
    studying: {
      en: ["Blockchain", "Software Engineering", "Functional Programming"],
      pt: ["Blockchain", "Engenharia de Software", "Programação Funcional"],
    },
    funfact: {
      en: "🐶 I have a dog named after a candy.",
      pt: "🐶 Tenho uma cachorra com nome de doce.",
    },
  },

  nav: {
    home: { en: "Home", pt: "Home" },
    projects: { en: "Projects", pt: "Projetos" },
    blog: { en: "Blog", pt: "Blog" },
    resume: { en: "Resume", pt: "Currículo" },
  },

  home: {
    intro: {
      en: "passionate about building reliable systems and shipping software that lasts.",
      pt: "apaixonado por construir sistemas confiáveis e entregar software que dura.",
    },
    about: {
      en: "Software engineer with 5+ years of experience, specialized in back-end with solid front-end skills. I design APIs, services, and the infrastructure that keeps them online.",
      pt: "Engenheiro de software com 5+ anos de experiência, especializado em back-end com boa base em front-end. Projeto APIs, serviços e a infraestrutura que os mantém no ar.",
    },
    available: { en: "Available for new projects", pt: "Disponível para novos projetos" },
    ctaPrimary: { en: "Get in touch", pt: "Entre em contato" },
    ctaSecondary: { en: "View projects", pt: "Ver projetos" },
    sectionStack: { en: "Stack & tooling", pt: "Stack & ferramentas" },
    sectionArch: { en: "How I think about systems", pt: "Como penso em sistemas" },
    archNote: {
      en: "A request's journey — from the edge, through the services I build, down to storage and async work.",
      pt: "A jornada de uma requisição — da borda, pelos serviços que construo, até o armazenamento e o trabalho assíncrono.",
    },
    sectionWork: { en: "Selected work", pt: "Trabalhos selecionados" },
    sectionWriting: { en: "Latest writing", pt: "Últimos textos" },
    studyingNow: { en: "Currently studying", pt: "Atualmente estudando" },
    ctaBig: { en: "Got a project in mind?", pt: "Tem um projeto em mente?" },
    ctaBigSub: {
      en: "Let's build something solid together. Reach out and let's talk.",
      pt: "Vamos construir algo sólido juntos. Entre em contato e vamos conversar.",
    },
  },

  projects: {
    title: { en: "Projects", pt: "Projetos" },
    subtitle: {
      en: "Back-end systems, services and developer tooling. Sample selection — real case studies coming soon.",
      pt: "Sistemas back-end, serviços e ferramentas para devs. Seleção de exemplo — estudos de caso reais em breve.",
    },
    statusLabels: {
      production: { en: "production", pt: "produção" },
      archived: { en: "archived", pt: "arquivado" },
      wip: { en: "in progress", pt: "em progresso" },
    },
    items: [
      {
        id: "job-runner", name: "Distributed Job Runner", year: "2025", status: "production",
        tag: { en: "Scheduling · Go", pt: "Agendamento · Go" },
        blurb: {
          en: "Horizontally-scalable task scheduler processing 2M+ jobs/day with at-least-once delivery and backpressure.",
          pt: "Agendador de tarefas escalável processando 2M+ jobs/dia com entrega at-least-once e backpressure.",
        },
        stack: ["Go", "gRPC", "Redis", "Postgres"], metric: { v: "2M+", l: { en: "jobs / day", pt: "jobs / dia" } },
        nodes: ["API", "Scheduler", "Workers", "Redis"],
      },
      {
        id: "ledger", name: "Realtime Ledger API", year: "2024", status: "production",
        tag: { en: "Fintech · Java", pt: "Fintech · Java" },
        blurb: {
          en: "Double-entry financial ledger with idempotent transactions and sub-50ms balance reads.",
          pt: "Razão financeiro de partidas dobradas com transações idempotentes e leituras de saldo sub-50ms.",
        },
        stack: ["Java", "Spring", "Postgres", "Kafka"], metric: { v: "<50ms", l: { en: "balance reads", pt: "leitura de saldo" } },
        nodes: ["Gateway", "Ledger", "Postgres", "Kafka"],
      },
      {
        id: "auth-gateway", name: "Edge Auth Gateway", year: "2024", status: "production",
        tag: { en: "Security · Node", pt: "Segurança · Node" },
        blurb: {
          en: "JWT/OAuth gateway with per-tenant rate limiting and token rotation at the edge.",
          pt: "Gateway JWT/OAuth com rate limiting por tenant e rotação de tokens na borda.",
        },
        stack: ["Node.js", "TypeScript", "Redis", "Docker"], metric: { v: "12ms", l: { en: "p99 auth", pt: "auth p99" } },
        nodes: ["Edge", "Auth", "Redis", "Core"],
      },
      {
        id: "event-pipe", name: "Event Pipeline", year: "2023", status: "production",
        tag: { en: "Data · Go", pt: "Dados · Go" },
        blurb: {
          en: "Streaming ETL moving domain events into the warehouse with exactly-once semantics.",
          pt: "ETL em streaming levando eventos de domínio para o data warehouse com semântica exactly-once.",
        },
        stack: ["Go", "Kafka", "ClickHouse"], metric: { v: "40k/s", l: { en: "events", pt: "eventos" } },
        nodes: ["Producers", "Pipeline", "ClickHouse"],
      },
      {
        id: "notify", name: "Notification Service", year: "2023", status: "archived",
        tag: { en: "Messaging · Node", pt: "Mensageria · Node" },
        blurb: {
          en: "Multi-channel (email / SMS / push) fan-out with retries, dedupe and delivery tracking.",
          pt: "Fan-out multicanal (email / SMS / push) com retries, dedupe e rastreio de entrega.",
        },
        stack: ["Node.js", "RabbitMQ", "Redis"], metric: { v: "99.95%", l: { en: "delivery", pt: "entrega" } },
        nodes: ["API", "Queue", "Channels"],
      },
      {
        id: "cli", name: "Service CLI Toolkit", year: "2022", status: "wip",
        tag: { en: "Tooling · Go", pt: "Ferramentas · Go" },
        blurb: {
          en: "Internal CLI to scaffold services, run migrations and wire observability in one command.",
          pt: "CLI interno para scaffolding de serviços, rodar migrations e plugar observabilidade num comando.",
        },
        stack: ["Go", "Cobra", "Docker"], metric: { v: "8", l: { en: "teams using", pt: "times usando" } },
        nodes: ["CLI", "Templates", "CI"],
      },
    ],
  },

  blog: {
    title: { en: "Blog", pt: "Blog" },
    subtitle: {
      en: "Notes on back-end engineering, reliability and the craft. Sample posts — real writing coming soon.",
      pt: "Notas sobre engenharia back-end, confiabilidade e o ofício. Posts de exemplo — textos reais em breve.",
    },
    readLabel: { en: "min read", pt: "min de leitura" },
    items: [
      {
        id: "idempotent", title: { en: "Designing idempotent APIs in Go", pt: "Projetando APIs idempotentes em Go" },
        date: "2026-05-12", read: 9, tags: ["Go", "API", "Reliability"], featured: true,
        excerpt: {
          en: "Idempotency keys are easy to bolt on and hard to get right. A practical pattern for safe retries across distributed services.",
          pt: "Chaves de idempotência são fáceis de adicionar e difíceis de acertar. Um padrão prático para retries seguros entre serviços distribuídos.",
        },
      },
      {
        id: "grpc-errors", title: { en: "A practical guide to gRPC error handling", pt: "Um guia prático para tratamento de erros em gRPC" },
        date: "2026-03-28", read: 7, tags: ["gRPC", "Go"],
        excerpt: {
          en: "Status codes, error details and retries — mapping domain errors to gRPC without leaking internals.",
          pt: "Status codes, detalhes de erro e retries — mapeando erros de domínio para gRPC sem vazar detalhes internos.",
        },
      },
      {
        id: "postgres-first", title: { en: "Why I reach for Postgres before anything else", pt: "Por que eu escolho Postgres antes de tudo" },
        date: "2026-02-09", read: 6, tags: ["Postgres", "Databases"],
        excerpt: {
          en: "Queues, search, JSON, full-text — Postgres does more than people expect. When boring is the right call.",
          pt: "Filas, busca, JSON, full-text — Postgres faz mais do que esperam. Quando o 'chato' é a escolha certa.",
        },
      },
      {
        id: "fp-backend", title: { en: "Functional patterns that survive in backend code", pt: "Padrões funcionais que sobrevivem no back-end" },
        date: "2025-12-15", read: 8, tags: ["FP", "Architecture"],
        excerpt: {
          en: "Pure cores, imperative shells, and the patterns from FP that actually pay off in production services.",
          pt: "Núcleos puros, cascas imperativas e os padrões de FP que realmente compensam em produção.",
        },
      },
      {
        id: "queues-prod", title: { en: "Notes on running queues in production", pt: "Notas sobre rodar filas em produção" },
        date: "2025-11-02", read: 10, tags: ["Queues", "Ops"],
        excerpt: {
          en: "Dead letters, visibility timeouts, poison messages — the operational realities nobody warns you about.",
          pt: "Dead letters, visibility timeouts, mensagens-veneno — as realidades operacionais que ninguém avisa.",
        },
      },
    ],
  },

  resume: {
    title: { en: "Resume", pt: "Currículo" },
    subtitle: { en: "Software engineer, back-end focused. São Paulo, Brazil.", pt: "Engenheiro de software, foco em back-end. São Paulo, Brasil." },
    download: { en: "Download PDF", pt: "Baixar PDF" },
    summary: {
      en: "Software engineer with 5+ years of experience, specialized in back-end with Golang, Java (Quarkus) and Node.js, plus solid front-end skills. Comfortable across relational and non-relational databases (PostgreSQL, MySQL, MongoDB) and the messaging/caching tooling common to microservice ecosystems (Kafka, Redis). Pragmatic and reliability-minded.",
      pt: "Engenheiro de software com 5+ anos de experiência, especializado em back-end com Golang, Java (Quarkus) e Node.js, além de boa base em front-end. Confortável com bancos relacionais e não relacionais (PostgreSQL, MySQL, MongoDB) e com o ferramental de mensageria/cache comum em ecossistemas de microsserviços (Kafka, Redis). Pragmático e focado em confiabilidade.",
    },
    sections: {
      experience: { en: "Experience", pt: "Experiência" },
      skills: { en: "Skills", pt: "Habilidades" },
      education: { en: "Education", pt: "Formação" },
      certifications: { en: "Certifications", pt: "Certificações" },
      now: { en: "Studying now", pt: "Estudando agora" },
    },
    experience: [
      {
        role: { en: "IT Advisor III", pt: "Assessor de TI III" }, org: "Banco do Brasil", period: "2024 — present", current: true,
        bullets: {
          en: [
            "Designed and implemented a scalable, high-performance platform for blockchain solutions using Java/Quarkus and Node.js with Express and TypeScript.",
            "Integrated OracleDB and Apache Kafka for reliable data processing and an event-driven architecture.",
          ],
          pt: [
            "Projetei e implementei uma plataforma escalável e de alta performance para soluções blockchain usando Java/Quarkus e Node.js com Express e TypeScript.",
            "Integrei OracleDB e Apache Kafka para processamento confiável de dados e arquitetura orientada a eventos.",
          ],
        },
        stack: ["Java", "Quarkus", "Node.js", "Express", "TypeScript", "OracleDB", "Kafka"],
      },
      {
        role: { en: "Back-end Developer", pt: "Desenvolvedor Back-End" }, org: "StudioSol", period: "2022 — 2023",
        bullets: {
          en: [
            "Built and maintained scalable REST and GraphQL APIs in Golang, ensuring efficient data processing and system reliability.",
            "Optimized MySQL interactions and improved cache performance with Memcached for more responsive applications.",
          ],
          pt: [
            "Desenvolvi e mantive APIs REST e GraphQL escaláveis em Golang, garantindo processamento eficiente de dados e confiabilidade do sistema.",
            "Otimizei interações com MySQL e melhorei a performance de cache com Memcached para aplicações mais responsivas.",
          ],
        },
        stack: ["Golang", "GraphQL", "REST", "MySQL", "Memcached"],
      },
      {
        role: { en: "Junior Full-stack Developer", pt: "Desenvolvedor FullStack Jr" }, org: "Zipper", period: "2021 — 2022",
        bullets: {
          en: [
            "Designed, built and maintained web applications using Node.js (Nest), Vue.js and Nuxt, with GraphQL for efficient data queries.",
            "Integrated MongoDB and used AWS services (Lambda, S3, SQS) to optimize scalability and performance.",
          ],
          pt: [
            "Projetei, desenvolvi e mantive aplicações web usando Node.js (Nest), Vue.js e Nuxt, com GraphQL para consultas eficientes de dados.",
            "Integrei MongoDB e usei serviços AWS (Lambda, S3, SQS) para otimizar escalabilidade e performance.",
          ],
        },
        stack: ["Node.js", "NestJS", "Vue.js", "Nuxt", "GraphQL", "MongoDB", "AWS"],
      },
      {
        role: { en: "Full-stack Web Developer", pt: "Desenvolvedor FullStack Web" }, org: "Code49", period: "2020 — 2021",
        bullets: {
          en: [
            "Developed and maintained a real-estate CRM, improving features and performance with PHP, JavaScript, jQuery, Vue.js and MySQL.",
            "Designed efficient database structures and optimized queries for better responsiveness and reliability.",
          ],
          pt: [
            "Desenvolvi e mantive um CRM imobiliário, aprimorando funcionalidades e performance com PHP, JavaScript, jQuery, Vue.js e MySQL.",
            "Projetei estruturas de banco eficientes e otimizei consultas para melhor responsividade e confiabilidade.",
          ],
        },
        stack: ["PHP", "JavaScript", "jQuery", "Vue.js", "MySQL"],
      },
    ],
    skills: [
      { group: { en: "Languages", pt: "Linguagens" }, items: ["Go", "Java", "TypeScript", "JavaScript", "PHP", "SQL"] },
      { group: { en: "Back-end", pt: "Back-end" }, items: ["Quarkus", "Node.js", "NestJS", "Express", "GraphQL", "REST"] },
      { group: { en: "Data", pt: "Dados" }, items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "Memcached"] },
      { group: { en: "Infra & Cloud", pt: "Infra & Cloud" }, items: ["AWS", "Docker", "Git", "GitHub Actions"] },
      { group: { en: "Front-end", pt: "Front-end" }, items: ["Vue.js", "Nuxt", "React", "Astro", "Tailwind"] },
    ],
    education: [
      {
        degree: { en: "B.Sc. in Information Systems", pt: "Bacharelado em Sistemas de Informação" }, org: "UNESP/FMU", period: "2020 — 2025",
        note: {
          en: "Focused on administration and computing skills across a range of Information Systems environments.",
          pt: "Focado em habilidades de administração e computação para uma diversidade de ambientes de Sistemas de Informação.",
        },
      },
    ],
    certifications: [
      { title: { en: "English C1+", pt: "Inglês C1+" }, org: "LinguaSkill" },
      { title: { en: "Spanish B2", pt: "Espanhol B2" }, org: "LANGUAGECERT USAL esPro" },
    ],
  },

  footer: {
    about: {
      en: "Software engineer passionate about learning more every day and collaborating on solid, innovative projects.",
      pt: "Engenheiro de software apaixonado por aprender cada vez mais e colaborar em projetos sólidos e inovadores.",
    },
    built: { en: "Built with care · Geist + Geist Mono", pt: "Feito com carinho · Geist + Geist Mono" },
    rights: { en: "All rights reserved.", pt: "Todos os direitos reservados." },
    linksTitle: { en: "Links", pt: "Links" },
    connectTitle: { en: "Connect", pt: "Conecte-se" },
  },
};
