// ─────────────────────────────────────────────────────────────
// DIGITAL COSMOS — Content Data & Constants
// Authentic information for Deepak Chandra Kalita
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
  tagline: "Every project is a step in the journey. Every challenge shapes the engineer.\nBuilding the systems that power tomorrow's digital experiences.",
  email: "deepakkalita102@gmail.com",
  resumeUrl: "/Deepak_Resume.pdf",
  socials: {
    github: "https://github.com/Deepak-techy",
    linkedin: "https://www.linkedin.com/in/deepak-kalita-88aa90252",
    twitter: "https://x.com/DeepakKalitaa",
    leetcode: "https://leetcode.com/u/DeKUser1/",
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
        "Software Development Internship (15th June 2024 – 15th July 2024). Focused on solving real-world challenges, software workflows, and building professional experience.",
      tech: ["Python", "Software Development", "Professional Dev"],
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
      tech: ["React", "Tailwind CSS", "Gemini AI API", "Google Places API"],
      position: { x: 65, y: 20 },
      size: "lg",
    },
    {
      id: "growth-3",
      title: "Smart India Hackathon",
      summary:
        "Led a development team as Team Lead to build and present an AI-powered academic ecosystem. Rapidly prototyped a unified educational platform under SIH guidelines.",
      tech: ["Team Lead", "Full Stack", "AI/ML", "Presentation"],
      position: { x: 30, y: 70 },
      size: "lg",
    },
    {
      id: "growth-4",
      title: "Deep Learning Projects",
      summary:
        "A series of advanced neural network implementations — from image classification to natural language processing and computer vision models.",
      tech: ["PyTorch", "Transformers", "NLP", "Computer Vision"],
      position: { x: 75, y: 62 },
      size: "lg",
    },
  ],
  // Constellation lines connecting growth achievements (index pairs)
  constellations: [
    [0, 1], // Emotion Detection → AI Trip Planner
    [1, 2], // AI Trip Planner → Smart India Hackathon
    [2, 3], // Smart India Hackathon → Deep Learning Projects
    [0, 3], // Emotion Detection → Deep Learning Projects
    [1, 3], // AI Trip Planner → Deep Learning Projects
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
    github: "https://github.com/Deepak-techy/EduOne",
    demo: "https://github.com/Deepak-techy/EduOne",
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
    title: "Digital Cosmos",
    description:
      "A futuristic, story-driven portfolio experience that visualizes my journey as a software engineer through an interactive digital universe. Features immersive animations, constellation-based storytelling, technology galaxies, project planets, and cinematic user interactions designed to transform a traditional portfolio into an exploration experience.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "GSAP", "Lenis", "shadcn/ui", "JavaScript"],
    image: "/images/projects/digital-cosmos.jpg",
    liveUrl: "https://digital-cosmos-portfolio.vercel.app/",
    githubUrl: "https://github.com/Deepak-techy/digital-cosmos-portfolio.git",
    featured: true,
  },
  {
    id: "project-2",
    title: "AI Trip Planner",
    description:
      "An AI-powered travel planning application that generates personalized trip itineraries based on user preferences, destination, duration, and budget. The platform helps travelers discover destinations, organize schedules, and plan trips more efficiently using intelligent recommendations.",
    tech: ["React", "Tailwind CSS", "Gemini AI API", "Firebase", "Google Places API"],
    image: "/images/projects/ai-trip-planner.jpg",
    liveUrl: "https://ai-trip-planner-tawny-eight.vercel.app/",
    githubUrl: "https://github.com/Deepak-techy/ai-trip-planner.git",
    featured: true,
  },
  {
    id: "project-3",
    title: "QuickLink URL Shortener",
    description:
      "A modern URL shortening platform that converts long URLs into concise, shareable links while providing a clean user experience. Designed with scalability and simplicity in mind, enabling users to create, manage, and share shortened links efficiently.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS", "REST API"],
    image: "/images/projects/quicklink.jpg",
    liveUrl: "https://quick-link-url-shortner.vercel.app/",
    githubUrl: "https://github.com/Deepak-techy/QuickLink_Url_Shortner.git",
    featured: true,
  },
];

export const ACHIEVEMENTS = [
  {
    id: "ach-1",
    icon: "GraduationCap",
    title: "8.92 CGPA",
    description: "Maintaining strong academic performance in Computer Science & Engineering.",
    metric: "8.92",
  },
  {
    id: "ach-2",
    icon: "Code2",
    title: "100+ LeetCode Solved",
    description: "Strengthening problem-solving skills through consistent algorithmic practice.",
    metric: "100+",
  },
  {
    id: "ach-3",
    icon: "Briefcase",
    title: "3+ Internships",
    description: "Gained industry experience in software development and cybersecurity.",
    metric: "3+",
  },
  {
    id: "ach-4",
    icon: "Users",
    title: "Hackathon Organizer",
    description: "Planned and coordinated a technical competition during the annual college fest.",
    metric: "1x",
  },
];

export const TECH_GALAXY = {
  // Three orbital rings: inner (core), middle (framework), outer (frontier)
  rings: [
    {
      id: "inner",
      label: "Core",
      radius: 28, // percentage of container
      technologies: [
        {
          id: "react",
          name: "React",
          years: "2+",
          projectCount: 3,
          relatedProjects: ["AI Trip Planner", "QuickLink URL Shortener", "EduOne"],
          color: "#61DAFB",
          size: 14,
        },
        {
          id: "python",
          name: "Python",
          years: "2+",
          projectCount: 6,
          relatedProjects: ["Emotion Detection", "AI Trip Planner", "Web Scraping", "Sudoku Solver", "IIT Guwahati Research Internship"],
          color: "#3776AB",
          size: 14,
        },
        {
          id: "nodejs",
          name: "Node.js",
          years: "2+",
          projectCount: 2,
          relatedProjects: ["QuickLink URL Shortener", "EduOne"],
          color: "#539E43",
          size: 13,
        },
        {
          id: "nextjs",
          name: "Next.js",
          years: "1+",
          projectCount: 1,
          relatedProjects: ["Digital Cosmos"],
          color: "#FFFFFF",
          size: 12,
        },
      ],
    },
    {
      id: "middle",
      label: "Framework",
      radius: 48,
      technologies: [
        {
          id: "express",
          name: "Express.js",
          years: "2+",
          projectCount: 2,
          relatedProjects: ["QuickLink URL Shortener", "EduOne"],
          color: "#FFFFFF",
          size: 10,
        },
        {
          id: "mongodb",
          name: "MongoDB",
          years: "2+",
          projectCount: 2,
          relatedProjects: ["QuickLink URL Shortener", "EduOne"],
          color: "#47A248",
          size: 11,
        },
        {
          id: "tailwind",
          name: "Tailwind CSS",
          years: "1+",
          projectCount: 4,
          relatedProjects: ["Digital Cosmos", "EduOne", "AI Trip Planner", "QuickLink URL Shortener"],
          color: "#06B6D4",
          size: 10,
        },
        {
          id: "flask",
          name: "Flask",
          years: "1+",
          projectCount: 2,
          relatedProjects: ["AI Trip Planner", "Emotion Detection"],
          color: "#FFFFFF",
          size: 9,
        },
      ],
    },
    {
      id: "outer",
      label: "Frontier",
      radius: 68,
      technologies: [
        {
          id: "ml",
          name: "Machine Learning",
          years: "1+",
          projectCount: 3,
          relatedProjects: ["Emotion Detection", "Smart India Hackathon", "IIT Guwahati Research Internship"],
          color: "#FF6F61",
          size: 11,
        },
        {
          id: "dl",
          name: "Deep Learning",
          years: "1+",
          projectCount: 2,
          relatedProjects: ["Emotion Detection", "IIT Guwahati Research Internship"],
          color: "#A78BFA",
          size: 11,
        },
        {
          id: "genai",
          name: "Generative AI",
          years: "1+",
          projectCount: 2,
          relatedProjects: ["AI Trip Planner", "EduOne"],
          color: "#F59E0B",
          size: 10,
        },
        {
          id: "git",
          name: "Git",
          years: "2+",
          projectCount: 5,
          relatedProjects: ["All Projects"],
          color: "#F05032",
          size: 9,
        },
      ],
    },
  ],
  // Connections between technologies (visualized as animated lines)
  connections: [
    { from: "react", to: "nextjs" },
    { from: "react", to: "tailwind" },
    { from: "nodejs", to: "express" },
    { from: "nodejs", to: "mongodb" },
    { from: "python", to: "flask" },
    { from: "python", to: "ml" },
    { from: "ml", to: "dl" },
    { from: "dl", to: "genai" },
    { from: "python", to: "genai" },
    { from: "react", to: "mongodb" },
  ],
};

export const EXPERIENCE = [
  {
    id: "exp-1",
    company: "IIT Guwahati",
    role: "Research Intern — Monocular Depth Estimation",
    period: "Jun 2025 – Aug 2025",
    description:
      "Researched computer vision techniques for monocular depth estimation using deep learning architectures.",
    highlights: [
      "Trained and evaluated deep learning models for depth prediction from RGB imagery using the NYU Depth V2 dataset.",
      "Investigated state-of-the-art model architectures and optimization strategies to improve depth estimation accuracy.",
    ],
  },
  {
    id: "exp-2",
    company: "Arodos Technologies",
    role: "Web Development Intern",
    period: "Jul 2025 – Jul 2025",
    description:
      "Built and optimized responsive web applications, collaborating on features, debugging, and performance.",
    highlights: [
      "Built responsive web applications using modern frameworks and tools, improving speed and accessibility.",
      "Collaborated on feature development, API integration, and user-centric design enhancements.",
    ],
  },
  {
    id: "exp-3",
    company: "NIELIT",
    role: "Cybersecurity Intern",
    period: "Jul 2024 – Jul 2024",
    description:
      "Explored cybersecurity fundamentals, working with network security and threat mitigation tools.",
    highlights: [
      "Explored network security, vulnerability assessment, threat mitigation, and system security fundamentals.",
      "Hands-on practice with security tools to analyze real-world cyber defense mechanisms and best practices.",
    ],
  },
];

export const TESTIMONIALS = []; // Testimonials removed completely

export const NEXT_DESTINATION = {
  title: "NEXT DESTINATION",
  tagline: "Looking for opportunities to build meaningful products.",
  items: [
    "AI Engineering",
    "Machine Learning",
    "Scalable Systems",
    "Open Source",
    "Innovation",
  ],
};
