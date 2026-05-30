"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { tokens, projects } from "@/lib/tokens";
import GlowButton from "@/components/ui/GlowButton";
import Badge from "@/components/ui/Badge";

const reveal = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const stack = ["RAG", "FastAPI", "Groq", "React", "Node.js", "MongoDB"];

function Magnetic({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });

  return (
    <motion.div
      style={{ x: springX, y: springY, display: "inline-flex" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.14);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.14);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

function HeroVisual() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-160, 160], [8, -8]);
  const rotateY = useTransform(x, [-160, 160], [-10, 10]);

  return (
    <motion.div
      className="hero-visual premium-glass"
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
      initial={{ opacity: 0, y: 38, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
    >
      <div className="hero-window-bar">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-console">
        <div>
          <p>product.pipeline</p>
          <h3>Placement Readiness AI</h3>
        </div>
        <Badge variant="green">live build</Badge>
      </div>
      <div className="hero-score">
        <div>
          <span>Resume Signal</span>
          <strong>87%</strong>
        </div>
        <motion.div
          className="hero-score-bar"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="hero-mini-grid">
        {["RAG", "Vector Search", "Roadmaps", "ATS"].map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 + index * 0.08 }}
          >
            {item}
          </motion.div>
        ))}
      </div>
      <div className="hero-visual-footer">
        <span>AI Engineer + Product Builder</span>
        <span>2026</span>
      </div>
    </motion.div>
  );
}

export default function HomePage({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <div className="premium-page-shell">
      <div className="mesh-bg" />
      <section className="hero-shell">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.09 }}
        >
          <motion.div variants={reveal} className="availability-pill">
            <span />
            Building AI products for real student workflows
          </motion.div>

          <motion.p variants={reveal} className="hero-kicker">
            Vishnu Mashalkar / AI Engineer + Product Builder
          </motion.p>
          <motion.h1 variants={reveal} className="hero-title">
            I Build <span>AI-Powered Products</span> That Solve Real Problems.
          </motion.h1>
          <motion.p variants={reveal} className="hero-subtitle">
            Full-stack developer building AI tools, campus products, and startup-grade systems across React, FastAPI, LLM integrations, and scalable backend architecture.
          </motion.p>

          <motion.div variants={reveal} className="hero-actions">
            <Magnetic>
              <GlowButton primary onClick={() => onNavigate("projects")}>
                Explore Work
                <span aria-hidden>↗</span>
              </GlowButton>
            </Magnetic>
            <Magnetic>
              <GlowButton onClick={() => onNavigate("contact")}>Start a Conversation</GlowButton>
            </Magnetic>
            <a className="resume-button" href="/resume.pdf" download="Vishnu_Mashalkar_Resume.pdf" data-hover>
              Resume
            </a>
          </motion.div>

          <motion.div variants={reveal} className="hero-stack">
            {stack.map((item) => (
              <Badge key={item} variant={item === "RAG" || item === "Groq" ? "cyan" : "default"}>
                {item}
              </Badge>
            ))}
          </motion.div>
        </motion.div>

        <HeroVisual />
      </section>

      <motion.section
        className="home-bento"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.08 }}
      >
        <motion.div variants={reveal} className="bento-panel bento-wide">
          <p>Featured Projects</p>
          <h2>{projects.length} product showcases</h2>
          <span>AI tooling, SaaS workflows, marketplace systems, and career platforms presented as products, not class assignments.</span>
        </motion.div>
        <motion.div variants={reveal} className="bento-panel">
          <p>Currently Building</p>
          <h2>PlaceWise</h2>
          <span>RAG resume analysis, ChromaDB search, FastAPI services, and Groq-powered roadmap generation.</span>
        </motion.div>
        <motion.div variants={reveal} className="bento-panel">
          <p>Focus</p>
          <h2>AI + Product</h2>
          <span>Turning rough student problems into polished tools with useful automation and refined interfaces.</span>
        </motion.div>
      </motion.section>
    </div>
  );
}
