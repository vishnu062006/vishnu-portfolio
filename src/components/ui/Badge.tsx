import { tokens } from "@/lib/tokens";

type Variant = "default" | "accent" | "green" | "cyan" | "amber";

const variantMap: Record<Variant, { bg: string; border: string; color: string }> = {
  default: { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.10)", color: tokens.text2 },
  accent:  { bg: tokens.accentDim,         border: tokens.accentBorder,      color: "#6aa3ff"     },
  green:   { bg: "rgba(16,185,129,0.10)",  border: "rgba(16,185,129,0.25)", color: "#34d399"      },
  cyan:    { bg: "rgba(34,211,238,0.10)",  border: "rgba(34,211,238,0.25)", color: tokens.cyan    },
  amber:   { bg: "rgba(245,158,11,0.10)",  border: "rgba(245,158,11,0.25)", color: tokens.amber   },
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const v = variantMap[variant];
  return (
    <span
      className={className}
      style={{
        display: "inline-flex", alignItems: "center",
        padding: "3px 10px", borderRadius: 20,
        fontSize: 11.5, fontFamily: "'Geist Mono', monospace",
        fontWeight: 400, letterSpacing: "0.02em",
        whiteSpace: "nowrap",
        background: v.bg, border: `1px solid ${v.border}`, color: v.color,
      }}
    >
      {children}
    </span>
  );
}
