// ─────────────────────────────────────────────────────────────
// DIGITAL COSMOS — Content Data & Constants
// Replace placeholder content with your real information
// ─────────────────────────────────────────────────────────────

export const SITE_CONFIG = {
  name: "Digital Cosmos",
  title: "Digital Cosmos | Deepak Chandra Kalita — Software Engineer",
  description:
    "An immersive journey through the digital universe of a software engineer. Explore projects, skills, and experience through interactive storytelling.",
  url: "https://digitalcosmos.dev",
  ogImage: "/images/og/og-cover.jpg",
};

export const PERSONAL = {
  name: "Deepak Chandra Kalita",
  firstName: "DEEPAK",
  middleName: "CHANDRA",
  lastName: "KALITA",
  role: "Software Engineer",
  tagline: "Building intelligent systems\nfor the next generation.",
  email: "deepak@example.com",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/deepak",
    linkedin: "https://linkedin.com/in/deepak",
    twitter: "https://twitter.com/deepak",
  },
};

export const NAV_ITEMS = [
  { label: "Origin", href: "#hero", sectionId: "hero" },
  { label: "Star Map", href: "#projects", sectionId: "projects" },
  { label: "Nebula", href: "#skills", sectionId: "skills" },
  { label: "Orbit", href: "#experience", sectionId: "experience" },
  { label: "Signal", href: "#contact", sectionId: "contact" },
];

export const ABOUT = {
  paragraphs: [
    "In the vast expanse of the digital universe, I chart my course as a software engineer driven by curiosity and precision. Every system I build is a new star — engineered to illuminate, to endure, and to inspire.",
    "My journey began with a fascination for how things work beneath the surface. That spark evolved into a deep expertise in full-stack development, cloud architecture, and crafting seamless user experiences that feel inevitable.",
    "I believe the best software is invisible — it dissolves into the experience, leaving only the impact. Whether building scalable APIs, designing reactive interfaces, or architecting distributed systems, I bring the same philosophy: precision in the details, ambition in the vision.",
  ],
  quote:
    "Every line of code is a star in my universe — each one purposeful, each one part of something larger.",
};

export const PROJECTS = [
  {
    id: "project-1",
    title: "Nebula Engine",
    description:
      "A real-time data processing engine capable of handling millions of events per second with sub-millisecond latency. Built with event-driven architecture and optimized for cloud-native deployment.",
    tech: ["Go", "Apache Kafka", "Redis", "Kubernetes"],
    image: "/images/projects/nebula-engine.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true,
  },
  {
    id: "project-2",
    title: "Stellar Dashboard",
    description:
      "An analytics platform that transforms complex datasets into intuitive visual stories. Features real-time collaboration, custom chart builders, and AI-powered insights.",
    tech: ["React", "D3.js", "Node.js", "PostgreSQL"],
    image: "/images/projects/stellar-dashboard.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true,
  },
  {
    id: "project-3",
    title: "Quantum Auth",
    description:
      "A zero-trust authentication framework implementing cutting-edge cryptographic protocols. Designed for enterprise-grade security with developer-friendly APIs.",
    tech: ["Rust", "WebAuthn", "OAuth 2.0", "Docker"],
    image: "/images/projects/quantum-auth.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true,
  },
  {
    id: "project-4",
    title: "Cosmos CLI",
    description:
      "A developer productivity toolkit that automates repetitive workflows, generates boilerplate, and integrates with major cloud providers through a unified interface.",
    tech: ["TypeScript", "Node.js", "AWS SDK", "CLI"],
    image: "/images/projects/cosmos-cli.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    featured: true,
  },
];

export const ACHIEVEMENTS = [
  {
    id: "ach-1",
    icon: "Trophy",
    title: "50+ Projects Delivered",
    description: "Successfully shipped production-grade applications across multiple domains and industries.",
    metric: "50+",
  },
  {
    id: "ach-2",
    icon: "Users",
    title: "1M+ Users Impacted",
    description: "Built systems serving millions of users with 99.9% uptime and exceptional performance.",
    metric: "1M+",
  },
  {
    id: "ach-3",
    icon: "GitBranch",
    title: "Open Source Contributor",
    description: "Active contributor to major open-source projects with thousands of stars on GitHub.",
    metric: "2K+",
  },
  {
    id: "ach-4",
    icon: "Award",
    title: "Engineering Excellence",
    description: "Recognized for technical leadership, mentoring, and driving architectural best practices.",
    metric: "5x",
  },
];

export const SKILLS = [
  {
    category: "Frontend",
    icon: "Monitor",
    items: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    icon: "Server",
    items: ["Node.js", "Go", "Python", "Rust", "GraphQL", "REST APIs"],
  },
  {
    category: "Cloud & DevOps",
    icon: "Cloud",
    items: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Monitoring"],
  },
  {
    category: "Databases",
    icon: "Database",
    items: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB", "Elasticsearch"],
  },
  {
    category: "Tools & Workflow",
    icon: "Wrench",
    items: ["Git", "Linux", "Figma", "Jira", "VS Code", "Neovim"],
  },
  {
    category: "Architecture",
    icon: "Network",
    items: ["Microservices", "Event-Driven", "Serverless", "System Design", "API Design"],
  },
];

export const EXPERIENCE = [
  {
    id: "exp-1",
    company: "Stellar Systems Inc.",
    role: "Senior Software Engineer",
    period: "2023 — Present",
    description:
      "Leading the architecture and development of cloud-native platforms serving enterprise clients. Spearheading the migration to microservices, reducing deployment time by 70% and improving system reliability to 99.99%.",
    highlights: [
      "Architected event-driven platform processing 2M+ events/day",
      "Led team of 8 engineers across 3 product verticals",
      "Reduced infrastructure costs by 45% through optimization",
    ],
  },
  {
    id: "exp-2",
    company: "Nexus Technologies",
    role: "Full Stack Developer",
    period: "2021 — 2023",
    description:
      "Built and maintained customer-facing applications and internal tools. Collaborated with design and product teams to deliver features that increased user engagement by 60%.",
    highlights: [
      "Developed real-time collaboration features for 100K+ users",
      "Built CI/CD pipelines reducing release cycles from weeks to hours",
      "Implemented comprehensive testing strategy achieving 95% coverage",
    ],
  },
  {
    id: "exp-3",
    company: "Digital Forge",
    role: "Software Developer",
    period: "2019 — 2021",
    description:
      "Started as a junior developer and rapidly grew into a key contributor. Focused on frontend architecture and performance optimization across multiple client projects.",
    highlights: [
      "Improved Core Web Vitals scores by 40% across all projects",
      "Built reusable component library adopted by 5 product teams",
      "Mentored 3 junior developers through onboarding program",
    ],
  },
];

export const TESTIMONIALS = [
  {
    id: "test-1",
    quote:
      "Deepak doesn't just write code — he architects solutions. His ability to see the bigger picture while maintaining attention to detail is rare and invaluable.",
    name: "Sarah Chen",
    title: "VP of Engineering",
    company: "Stellar Systems",
  },
  {
    id: "test-2",
    quote:
      "Working with Deepak transformed how our team approaches technical challenges. His code is clean, his systems are resilient, and his communication is exceptional.",
    name: "Marcus Rivera",
    title: "CTO",
    company: "Nexus Technologies",
  },
  {
    id: "test-3",
    quote:
      "The attention to craft that Deepak brings to every project is extraordinary. He elevated our entire engineering culture through his work and mentorship.",
    name: "Anika Patel",
    title: "Product Director",
    company: "Digital Forge",
  },
];
