export const tokens = {
  bg0: "#04060a",
  bg1: "#080c12",
  bg2: "#0c1018",
  bg3: "#10151f",
  surface: "#141926",
  border: "rgba(255,255,255,0.06)",
  borderActive: "rgba(255,255,255,0.12)",
  text1: "#eef0f7",
  text2: "#8892a8",
  text3: "#3e4557",
  accent: "#3d7eff",
  accentDim: "rgba(61,126,255,0.10)",
  accentBorder: "rgba(61,126,255,0.22)",
  accentGlow: "rgba(61,126,255,0.50)",
  cyan: "#22d3ee",
  green: "#10b981",
  amber: "#f59e0b",
} as const;

export const projects = [
  {
    id: "campusmart",
    name: "CampusMart",
    icon: "🛒",
    featured: true,
    hasDetail: true,
    description:
      "Full-stack college marketplace where students buy, sell, and trade within their campus. Complete CRUD, JWT auth, REST API, Cloudinary for media.",
    stack: ["React", "Tailwind", "Node.js", "Express.js", "MongoDB", "JWT"],
    year: "2024",
    github: "https://github.com/vishnu",
    demo: "#",
  },
  {
    id: "sms",
    name: "Student Mgmt System",
    icon: "📋",
    featured: false,
    hasDetail: false,
    description:
      "Academic record and enrollment management system with relational data model, grade tracking, and course management built for institutional scale.",
    stack: ["Java", "Python", "MySQL", "REST API"],
    year: "2024",
    github: "https://github.com/vishnu",
    demo: "#",
  },
] as const;

export const skillGroups = [
  {
    title: "Frontend",
    color: "#3d7eff",
    skills: [
      { name: "React.js",          pct: 88, level: "Proficient" },
      { name: "Tailwind CSS",      pct: 85, level: "Proficient" },
      { name: "JavaScript ES6+",   pct: 83, level: "Proficient" },
      { name: "HTML5 / CSS3",      pct: 91, level: "Strong"     },
      { name: "React Router",      pct: 74, level: "Familiar"   },
    ],
  },
  {
    title: "Backend",
    color: "#22d3ee",
    skills: [
      { name: "Node.js",           pct: 70, level: "Familiar" },
      { name: "Express.js",        pct: 68, level: "Familiar" },
      { name: "REST API Design",   pct: 73, level: "Familiar" },
      { name: "Java",              pct: 56, level: "Learning" },
      { name: "Python",            pct: 55, level: "Learning" },
    ],
  },
  {
    title: "Databases",
    color: "#10b981",
    skills: [
      { name: "MongoDB",           pct: 70, level: "Familiar" },
      { name: "MySQL",             pct: 65, level: "Familiar" },
      { name: "Mongoose ODM",      pct: 68, level: "Familiar" },
    ],
  },
  {
    title: "Tools & Workflow",
    color: "#f59e0b",
    skills: [
      { name: "Git & GitHub",      pct: 82, level: "Proficient" },
      { name: "VS Code",           pct: 92, level: "Daily"      },
      { name: "Postman",           pct: 72, level: "Familiar"   },
      { name: "Vercel / Netlify",  pct: 66, level: "Familiar"   },
    ],
  },
] as const;
