"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { tokens, projects } from "@/lib/tokens";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";

const cardVariants = {
  hidden: { opacity: 0, y: 34, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function ProjectPreview({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <div className="project-preview">
      <div className="preview-topbar">
        <span />
        <span />
        <span />
      </div>
      <div className="preview-body">
        <div className="preview-sidebar">
          <strong>{project.icon}</strong>
          <i />
          <i />
          <i />
        </div>
        <div className="preview-main">
          <div className="preview-heading">
            <span>{project.category}</span>
            <b>{project.metric}</b>
          </div>
          <div className="preview-chart">
            {[62, 84, 48, 92, 76].map((height, i) => (
              <motion.em
                key={i}
                initial={{ height: 12 }}
                whileInView={{ height }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 + i * 0.05, duration: 0.55 }}
              />
            ))}
          </div>
          <div className="preview-rows">
            {project.highlights.slice(0, 3).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick, index }: {
  project: (typeof projects)[number];
  onClick?: () => void;
  index: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 18 });
  const springY = useSpring(y, { stiffness: 160, damping: 18 });
  const rotateX = useTransform(springY, [-240, 240], [5, -5]);
  const rotateY = useTransform(springX, [-240, 240], [-6, 6]);
  const featured = index === 0;

  return (
    <motion.article
      className={`project-bento-card premium-glass card-shine ${featured ? "project-featured" : ""}`}
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.01 }}
      style={{ rotateX, rotateY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onClick={onClick}
      data-hover
    >
      <div className="project-glow" />
      <ProjectPreview project={project} index={index} />

      <div className="project-card-content">
        <div className="project-card-top">
          <Badge variant={project.id === "placewise" ? "cyan" : "accent"}>{project.category}</Badge>
          <span>{project.year}</span>
        </div>

        <div>
          <h3>{project.name}</h3>
          <p className="project-impact">{project.impact}</p>
          <p className="project-description">{project.description}</p>
        </div>

        <div className="project-highlights">
          {project.highlights.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="project-stack">
          {project.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <div className="project-actions">
          <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} data-hover>
            Live Demo
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} data-hover>
            GitHub
          </a>
          <button type="button" onClick={(e) => { e.stopPropagation(); onClick?.(); }} data-hover>
            Case Study
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  const router = useRouter();

  return (
    <div className="premium-section-page">
      <div className="mesh-bg" />
      <SectionHeader
        label="Featured Projects"
        title="Startup-grade product showcases."
        sub="A focused collection of AI, SaaS, marketplace, and career products built with product thinking, systems design, and polished user experience."
      />

      <motion.div
        className="projects-bento-grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.1 }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onClick={() => router.push(`/projects/${project.slug}`)}
          />
        ))}
      </motion.div>

      <motion.div
        className="currently-building premium-glass"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div>
          <span>Currently Building</span>
          <h3>PlaceWise, Resume Analyzer, and Hackathon Platform workflows</h3>
        </div>
        <p>
          The current focus is AI-assisted student outcomes: resume intelligence, opportunity discovery, event infrastructure, and dashboards that feel production-ready from day one.
        </p>
        <div className="roadmap-strip">
          {["PlaceWise", "Eventara Improvements", "Campus Mart Expansion", "MicroInternship Ecosystem"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
