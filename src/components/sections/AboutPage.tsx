"use client";
import { motion } from "framer-motion";
import { tokens } from "@/lib/tokens";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";

const MILESTONES = [
  { year: "2024", title: "B.E. Computer Science", sub: "BMS College of Engineering, Bengaluru", badge: "ongoing" },
  { year: "2025", title: "Campus Mart", sub: "Built a full-stack marketplace with auth, listings, APIs, and product workflows" },
  { year: "2026", title: "AI Product Direction", sub: "RAG pipelines, resume intelligence, FastAPI services, and LLM-integrated tools" },
  { year: "Now", title: "Seeking Product Engineering Roles", sub: "Open to internships, startup work, and product-focused engineering teams", badge: "open" },
];

const SOCIALS = [
  { label: "GitHub", val: "github.com/vishnu062006", href: "https://github.com/vishnu062006" },
  { label: "LinkedIn", val: "linkedin.com/in/vishnumashalkar", href: "https://linkedin.com/in/vishnumashalkar" },
  { label: "Email", val: "vishnumashalkar@gmail.com", href: "mailto:vishnumashalkar@gmail.com" },
  { label: "LeetCode", val: "leetcode.com/u/VishnuMashalkar", href: "https://leetcode.com/u/VishnuMashalkar/" },
];

const PROFILE_CARDS = [
  { title: "What I Build", body: "AI-assisted student tools, full-stack SaaS workflows, dashboards, marketplaces, and systems that can grow into real products." },
  { title: "Problems I Solve", body: "Turning scattered workflows into clear product experiences with automation, structured data, and interfaces people can actually use." },
  { title: "Current Focus", body: "RAG pipelines, resume parsing, vector search, LLM evaluations, FastAPI backends, and premium React interfaces." },
];

export default function AboutPage() {
  return (
    <div className="premium-section-page">
      <div className="mesh-bg" />
      <SectionHeader
        label="Builder Profile"
        title="I design and ship useful systems."
        sub="Computer science student at BMS College, focused on AI product engineering, full-stack systems, and startup-speed execution."
      />

      <div className="about-builder-grid">
        <motion.div
          className="about-identity premium-glass"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="identity-mark">VM</div>
          <p>AI Engineer + Product Builder</p>
          <h3>Vishnu Mashalkar</h3>
          <span>
            I learn by building products that force the full loop: problem framing, interface design, backend architecture, and shipping.
          </span>

          <div className="social-stack">
            {SOCIALS.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" data-hover>
                <small>{social.label}</small>
                <strong>{social.val}</strong>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about-profile-panels"
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08 }}
        >
          {PROFILE_CARDS.map((card) => (
            <motion.div
              key={card.title}
              className="profile-panel premium-glass"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <p>{card.title}</p>
              <h3>{card.body}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="timeline-panel premium-glass"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="timeline-heading">
          <span>Experience Timeline</span>
          <h3>From foundation to AI product systems</h3>
        </div>
        <div className="timeline-list">
          {MILESTONES.map((item, index) => (
            <motion.div
              key={`${item.year}-${item.title}`}
              className="timeline-item"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="timeline-dot" />
              <time>{item.year}</time>
              <div>
                <h4>
                  {item.title}
                  {item.badge && <Badge variant={item.badge === "open" ? "green" : "accent"}>{item.badge}</Badge>}
                </h4>
                <p>{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
