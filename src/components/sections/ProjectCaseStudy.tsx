"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects, tokens } from "@/lib/tokens";
import Badge from "@/components/ui/Badge";

type Project = (typeof projects)[number];

const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function ProductMockup({ project }: { project: Project }) {
  return (
    <div className="case-mockup premium-glass">
      <div className="preview-topbar">
        <span />
        <span />
        <span />
      </div>
      <div className="case-mockup-body">
        <aside>
          <strong>{project.icon}</strong>
          {project.highlights.slice(0, 4).map((item) => (
            <i key={item} />
          ))}
        </aside>
        <main>
          <div className="case-mockup-header">
            <span>{project.category}</span>
            <b>{project.status}</b>
          </div>
          <div className="case-mockup-score">
            <small>{project.metric}</small>
            <strong>{project.id === "placewise" ? "87" : project.id === "eventara" ? "12" : project.id === "campusmart" ? "48" : "24"}</strong>
          </div>
          <div className="case-mockup-grid">
            {project.highlights.slice(0, 4).map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function CaseBlock({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      className="case-block premium-glass"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {children}
    </motion.section>
  );
}

export default function ProjectCaseStudy({
  project,
  onBack,
}: {
  project: Project;
  onBack?: () => void;
}) {
  return (
    <div className="case-study-page">
      <div className="mesh-bg" />
      <div className="case-back-row">
        {onBack ? (
          <button type="button" onClick={onBack} data-hover>
            ← Back to projects
          </button>
        ) : (
          <Link href="/" data-hover>
            ← Back home
          </Link>
        )}
      </div>

      <motion.header
        className="case-hero"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08 }}
      >
        <motion.div className="case-hero-copy" variants={fadeUp}>
          <div className="case-eyebrow">
            <Badge variant={project.id === "placewise" ? "cyan" : "accent"}>{project.category}</Badge>
            <span>{project.year}</span>
            <span>{project.status}</span>
          </div>
          <h1>{project.name}</h1>
          <p className="case-impact">{project.impact}</p>
          <p className="case-description">{project.description}</p>
          <div className="case-actions">
            <a href={project.demo} target="_blank" rel="noopener noreferrer" data-hover>
              Visit Live Product
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer" data-hover>
              View Source Code
            </a>
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          <ProductMockup project={project} />
        </motion.div>
      </motion.header>

      <motion.div
        className="case-meta-grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.07 }}
      >
        {[
          ["Role", "Product engineering, interface design, full-stack architecture"],
          ["Stack", project.stack.join(" / ")],
          ["Focus", project.metric],
        ].map(([label, value]) => (
          <motion.div key={label} className="case-meta-card premium-glass" variants={fadeUp}>
            <p>{label}</p>
            <h3>{value}</h3>
          </motion.div>
        ))}
      </motion.div>

      <div className="case-content-grid">
        <CaseBlock eyebrow="Problem" title="The user problem">
          <p>{project.problem}</p>
        </CaseBlock>
        <CaseBlock eyebrow="Solution" title="The product response">
          <p>{project.solution}</p>
        </CaseBlock>
      </div>

      <CaseBlock eyebrow="Architecture" title="System overview">
        <div className="architecture-flow">
          {project.architecture.map((item, index) => (
            <div key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </CaseBlock>

      <div className="case-content-grid">
        <CaseBlock eyebrow="Features" title="What the product does">
          <ul>
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseBlock>
        <CaseBlock eyebrow="Challenges" title="Engineering tradeoffs">
          <ul>
            {project.challenges.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseBlock>
      </div>

      <div className="case-content-grid">
        <CaseBlock eyebrow="Outcomes" title="What it delivers">
          <ul>
            {project.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseBlock>
        <CaseBlock eyebrow="Roadmap" title="Where it goes next">
          <ul>
            {project.roadmap.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseBlock>
      </div>
    </div>
  );
}
