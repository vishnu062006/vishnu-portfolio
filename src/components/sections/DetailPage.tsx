"use client";
import { useInView } from "@/hooks";
import { tokens } from "@/lib/tokens";
import Badge from "@/components/ui/Badge";

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  return (
    <div style={{
      background: "#060a0f", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 14, padding: 28, position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(61,126,255,0.3),transparent)" }} />
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c, display: "inline-block" }} />
        ))}
        <span style={{ marginLeft: 8, fontFamily: "'Geist Mono',monospace", fontSize: 11, color: tokens.text3 }}>{lang}</span>
      </div>
      <pre style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, lineHeight: 1.8, color: "#abb2bf", overflow: "auto", margin: 0 }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

const ARCH_CODE = `// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate college email domain
  if (!email.endsWith('@bmsit.in')) {
    return res.status(403).json({
      error: 'Only college emails allowed'
    });
  }

  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token, user: { id: user._id, name: user.name } });
});`;

interface DetailPageProps {
  onNavigate: (p: string) => void;
}

export default function DetailPage({ onNavigate }: DetailPageProps) {
  const [ref, inView] = useInView(0.05);

  const archBlocks = [
    {
      title: "Frontend", color: tokens.accent,
      items: ["React.js + Hooks", "Tailwind CSS", "React Router v6",  "REST APIs"],
    },
    {
      title: "Backend", color: tokens.cyan,
      items: ["Node.js + Express", "MongoDB + Mongoose", "JWT Authentication"],
    },
  ];

  const learnings = [
    { tag: "Architecture", text: "Design the API contract before writing a single component. Prevents rework at scale." },
    { tag: "Auth",         text: "JWT stateless auth is powerful, but refresh token strategy matters enormously." },
    { tag: "UX",           text: "Mobile-first forces ruthless prioritization. Everything else is progressive enhancement." },
    { tag: "State",        text: "Context API works until it doesn't. Know when to reach for Zustand or Redux Toolkit." },
    { tag: "MongoDB",      text: "Schema flexibility is a trap. Mongoose validators are non-negotiable in production." },
    { tag: "Perf",         text: "Pagination + lazy image loading cut initial load time by ~60%. Measure before optimizing." },
  ];

  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", padding: "100px 24px 80px" }} ref={ref}>
      {/* Back */}
      <button
        onClick={() => onNavigate("projects")}
        data-hover
        style={{ background: "none", border: "none", cursor: "none", display: "flex", alignItems: "center", gap: 8, color: tokens.text3, fontSize: 13, fontFamily: "'Geist Mono',monospace", marginBottom: 56, transition: "color 0.2s" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = tokens.accent)}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = tokens.text3)}
      >
        ← back to projects
      </button>

      {/* Hero */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 48, marginBottom: 64, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "all 0.6s ease" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, fontFamily: "'Geist Mono',monospace", fontSize: 11, color: tokens.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          <span style={{ width: 20, height: 1, background: tokens.accent }} />
          Case Study
        </div>
        <h1 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: 900, letterSpacing: "-0.05em", marginBottom: 16 }}>CampusMart</h1>
        <p style={{ fontSize: 17, color: tokens.text2, maxWidth: 560, lineHeight: 1.75, marginBottom: 28 }}>
          A closed-loop college marketplace authenticated by campus email — enabling secure peer-to-peer trading within institutional networks.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Badge variant="accent">MERN Stack</Badge>
          <Badge variant="green">Completed</Badge>
          <Badge>2025</Badge>
          <Badge>Group Project</Badge>
          <Badge variant="cyan">Full-Stack</Badge>
        </div>
      </div>

      {/* Architecture */}
      <section style={{ marginBottom: 64 }}>
        <h3 style={{ fontSize: 13, fontFamily: "'Geist Mono',monospace", color: tokens.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          Architecture
          <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, alignItems: "center" }}>
          {archBlocks.map((block) => (
            <div key={block.title} style={{ background: `rgba(${block.color === tokens.accent ? "61,126,255" : "34,211,238"},0.05)`, border: `1px solid rgba(${block.color === tokens.accent ? "61,126,255" : "34,211,238"},0.14)`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, color: block.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>{block.title}</div>
              {block.items.map((item) => (
                <div key={item} style={{ fontSize: 13.5, color: tokens.text2, padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: block.color, opacity: 0.5, fontSize: 10 }}>→</span> {item}
                </div>
              ))}
            </div>
          ))}
          <div style={{ textAlign: "center", color: tokens.text3, fontSize: 11, fontFamily: "'Geist Mono',monospace" }}>
            <div>REST</div>
            <div style={{ fontSize: 22, color: tokens.accent }}>⇄</div>
            <div>JSON</div>
          </div>
        </div>
      </section>

      {/* Code sample */}
      <section style={{ marginBottom: 64 }}>
        <h3 style={{ fontSize: 13, fontFamily: "'Geist Mono',monospace", color: tokens.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          Sample — Auth Route
          <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        </h3>
        <CodeBlock lang="node.js / express" code={ARCH_CODE} />
      </section>

      {/* Learnings */}
      <section>
        <h3 style={{ fontSize: 13, fontFamily: "'Geist Mono',monospace", color: tokens.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          Key Learnings
          <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {learnings.map(({ tag, text }) => (
            <div key={tag} style={{ padding: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12 }}>
              <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10, color: tokens.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{tag}</div>
              <div style={{ fontSize: 13.5, color: tokens.text2, lineHeight: 1.6 }}>{text}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
