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

// ─────────────────────────────────────────────────────────────
// JOURNEY TIMELINE — Origin & Growth
// ─────────────────────────────────────────────────────────────

export const ORIGIN = {
  year: "2024",
  narrative:
    "The journey started with small Python projects, curiosity, and countless hours of learning.",
  projects: [
    {
      id: "origin-1",
      title: "Temperature Converter",
      summary:
        "A clean utility to convert between Celsius, Fahrenheit, and Kelvin — the first spark of building something functional from scratch.",
      tech: ["Python", "CLI"],
      // Position in the star field (percentage of container)
      position: { x: 18, y: 32 },
      size: "sm",
    },
    {
      id: "origin-2",
      title: "Contact Management System",
      summary:
        "A CRUD application for managing contacts with file-based persistence. Learning the fundamentals of data handling and user input.",
      tech: ["Python", "File I/O", "OOP"],
      position: { x: 72, y: 24 },
      size: "sm",
    },
    {
      id: "origin-3",
      title: "Sudoku Solver",
      summary:
        "An algorithmic puzzle solver using backtracking. The first deep dive into computational thinking and recursive problem-solving.",
      tech: ["Python", "Algorithms", "Backtracking"],
      position: { x: 45, y: 58 },
      size: "md",
    },
    {
      id: "origin-4",
      title: "Web Scraping Projects",
      summary:
        "Automated data extraction from websites using Python libraries. Learning to interact with the web programmatically.",
      tech: ["Python", "BeautifulSoup", "Requests"],
      position: { x: 28, y: 72 },
      size: "sm",
    },
    {
      id: "origin-5",
      title: "Prodigy Infotech Internship",
      summary:
        "Professional internship experience applying Python skills to real-world problems. A turning point from learning to building.",
      tech: ["Python", "Data Analysis", "Professional Dev"],
      position: { x: 78, y: 65 },
      size: "md",
    },
  ],
};

export const GROWTH = {
  year: "2025",
  narrative:
    "The projects became larger. The challenges became harder. The vision became clearer.",
  projects: [
    {
      id: "growth-1",
      title: "Emotion Detection System",
      summary:
        "A deep learning model that detects human emotions from facial expressions in real-time using convolutional neural networks.",
      tech: ["Python", "TensorFlow", "OpenCV", "CNN"],
      position: { x: 22, y: 28 },
      size: "lg",
    },
    {
      id: "growth-2",
      title: "AI Trip Planner",
      summary:
        "An intelligent travel planning assistant powered by AI that generates personalized itineraries based on user preferences and constraints.",
      tech: ["Python", "LLM", "API Integration", "Streamlit"],
      position: { x: 65, y: 20 },
      size: "lg",
    },
    {
      id: "growth-3",
      title: "Warehouse Management System",
      summary:
        "A full-stack inventory management platform with real-time tracking, automated reordering, and analytics dashboards.",
      tech: ["React", "Node.js", "MongoDB", "REST API"],
      position: { x: 50, y: 50 },
      size: "xl",
    },
    {
      id: "growth-4",
      title: "Smart India Hackathon",
      summary:
        "National-level hackathon project solving a real government challenge. Built a prototype under extreme time pressure with a cross-functional team.",
      tech: ["Full Stack", "AI/ML", "Teamwork", "Presentation"],
      position: { x: 30, y: 70 },
      size: "lg",
    },
    {
      id: "growth-5",
      title: "Deep Learning Projects",
      summary:
        "A series of advanced neural network implementations — from image classification to natural language processing and generative models.",
      tech: ["PyTorch", "Transformers", "NLP", "Computer Vision"],
      position: { x: 75, y: 62 },
      size: "lg",
    },
  ],
  // Constellation lines connecting achievements (index pairs)
  constellations: [
    [0, 2], // Emotion Detection → Warehouse
    [1, 2], // AI Trip Planner → Warehouse
    [2, 3], // Warehouse → Smart India
    [2, 4], // Warehouse → Deep Learning
    [3, 4], // Smart India → Deep Learning
    [0, 4], // Emotion Detection → Deep Learning
  ],
};

// ─────────────────────────────────────────────────────────────
// FLAGSHIP — EduOne
// ─────────────────────────────────────────────────────────────

export const EDUONE = {
  title: "EDUONE",
  subtitle: "AI Powered Academic Ecosystem",
  description:
    "A comprehensive academic platform that brings together AI-powered tools for students, educators, and institutions — transforming how learning happens at scale.",
  problemStatement:
    "Modern education is fragmented — students juggle multiple tools for notes, planning, resume building, and collaboration. There's no unified, intelligent system that adapts to individual academic needs while fostering community learning.",
  solution:
    "EduOne unifies the entire academic experience into a single AI-powered ecosystem. From intelligent document analysis to automated academic planning, every tool is interconnected and learns from user behavior to provide personalized recommendations.",
  architecture: [
    "React frontend with modular micro-feature architecture",
    "Node.js/Express API layer with JWT authentication",
    "MongoDB for flexible document storage",
    "Python microservices for AI/ML pipelines",
    "Redis for caching and session management",
    "WebSocket for real-time collaboration features",
  ],
  techStack: [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Python",
    "TensorFlow",
    "LangChain",
    "Redis",
    "WebSocket",
    "Tailwind CSS",
  ],
  features: [
    "AI-powered PDF question answering with context-aware responses",
    "Automated academic planner with deadline tracking and smart scheduling",
    "Resume analysis with AI feedback and industry benchmarking",
    "Intelligent note organization with auto-tagging and search",
    "Community platform with discussion forums and peer collaboration",
    "Admin dashboard with analytics, user management, and content moderation",
  ],
  links: {
    github: "https://github.com/example/eduone",
    demo: "https://eduone.example.com",
  },
  satellites: [
    {
      id: "sat-1",
      name: "PDF Q&A",
      icon: "FileText",
      orbitRadius: 42,
      orbitSpeed: 45,
      startAngle: 0,
      description:
        "Upload any academic PDF and ask questions in natural language. The AI extracts context, understands structure, and delivers precise answers with page references.",
      features: [
        "Context-aware question answering",
        "Multi-document cross-referencing",
        "Citation extraction and formatting",
        "Summary generation at multiple detail levels",
      ],
    },
    {
      id: "sat-2",
      name: "Academic Planner",
      icon: "Calendar",
      orbitRadius: 42,
      orbitSpeed: 45,
      startAngle: 60,
      description:
        "An intelligent planner that understands your course load, deadlines, and study patterns to create optimized schedules that adapt in real-time.",
      features: [
        "AI-generated study schedules",
        "Deadline tracking with smart reminders",
        "Workload balancing across courses",
        "Integration with university calendars",
      ],
    },
    {
      id: "sat-3",
      name: "Resume Analyzer",
      icon: "ScanText",
      orbitRadius: 42,
      orbitSpeed: 45,
      startAngle: 120,
      description:
        "AI-powered resume analysis that scores, critiques, and suggests improvements based on industry standards and target role requirements.",
      features: [
        "ATS compatibility scoring",
        "Section-by-section feedback",
        "Industry-specific keyword suggestions",
        "Before/after improvement tracking",
      ],
    },
    {
      id: "sat-4",
      name: "AI Note Organizer",
      icon: "Brain",
      orbitRadius: 42,
      orbitSpeed: 45,
      startAngle: 180,
      description:
        "Transform messy notes into structured knowledge. Auto-tags, categorizes, and creates searchable knowledge graphs from your academic content.",
      features: [
        "Automatic categorization and tagging",
        "Knowledge graph visualization",
        "Smart search with semantic understanding",
        "Flashcard generation from notes",
      ],
    },
    {
      id: "sat-5",
      name: "Community Platform",
      icon: "Users",
      orbitRadius: 42,
      orbitSpeed: 45,
      startAngle: 240,
      description:
        "A collaborative space where students connect, share resources, discuss topics, and form study groups — powered by intelligent matching.",
      features: [
        "Discussion forums with AI moderation",
        "Study group matching by subject and schedule",
        "Resource sharing with quality ratings",
        "Peer tutoring marketplace",
      ],
    },
    {
      id: "sat-6",
      name: "Admin Dashboard",
      icon: "LayoutDashboard",
      orbitRadius: 42,
      orbitSpeed: 45,
      startAngle: 300,
      description:
        "Comprehensive administrative control panel with real-time analytics, user management, content moderation, and platform health monitoring.",
      features: [
        "Real-time user analytics and engagement metrics",
        "Content moderation with AI assistance",
        "Role-based access control",
        "Platform performance monitoring",
      ],
    },
  ],
};

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
