"use client";
import { motion } from "framer-motion";
import { tokens, skillGroups } from "@/lib/tokens";
import SectionHeader from "@/components/ui/SectionHeader";

function SkillGroup({ title, color, skills, index }: (typeof skillGroups)[number] & { index: number }) {
  return (
    <motion.div
      className="skill-bento-card premium-glass card-shine"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.07, duration: 0.55 }}
      whileHover={{ y: -6, borderColor: `${color}55` }}
    >
      <div className="skill-card-heading">
        <span style={{ background: color, boxShadow: `0 0 18px ${color}` }} />
        <p style={{ color }}>{title}</p>
      </div>
      <div className="skill-list">
        {[...skills].map((skill, skillIndex) => (
          <div key={skill.name} className="skill-row">
            <div>
              <strong>{skill.name}</strong>
              <small>{skill.level}</small>
            </div>
            <div className="skill-meter">
              <motion.span
                style={{ background: `linear-gradient(90deg, ${color}, ${tokens.cyan})` }}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.pct}%` }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 + skillIndex * 0.05, duration: 0.8 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const HIGHLIGHTS = [
  { label: "Product UI", value: "React systems, dashboards, premium interaction design" },
  { label: "AI Workflows", value: "RAG, vector search, LLM evaluation, resume intelligence" },
  { label: "Backend", value: "REST APIs, auth, data models, FastAPI and Node services" },
  { label: "Shipping", value: "GitHub, Vercel, Postman, iterative product delivery" },
];

export default function SkillsPage() {
  return (
    <div className="premium-section-page">
      <div className="mesh-bg" />
      <SectionHeader
        label="Tech Stack Bento Grid"
        title="A practical stack for AI products."
        sub="Grouped by product layer instead of badge spam: frontend, backend, AI, databases, and developer tooling."
      />

      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <SkillGroup key={group.title} {...group} index={index} />
        ))}
      </div>

      <motion.div
        className="github-highlight-grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.08 }}
      >
        {HIGHLIGHTS.map((item) => (
          <motion.div
            key={item.label}
            className="github-highlight-card premium-glass"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <p>{item.label}</p>
            <h3>{item.value}</h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
