"use client";
import { useState, useCallback } from "react";
import React from "react";
import { tokens } from "@/lib/tokens";

import Cursor         from "@/components/layout/Cursor";
import Nav            from "@/components/layout/Nav";
import Footer         from "@/components/layout/Footer";
import LoadingScreen  from "@/components/layout/LoadingScreen";
import Marquee        from "@/components/layout/Marquee";
import CommandPalette from "@/components/layout/CommandPalette";
import MobileNav      from "@/components/layout/MobileNav";

import HomePage     from "@/components/sections/HomePage";
import ProjectsPage from "@/components/sections/ProjectsPage";
import DetailPage   from "@/components/sections/DetailPage";
import AboutPage    from "@/components/sections/AboutPage";
import SkillsPage   from "@/components/sections/SkillsPage";
import ContactPage  from "@/components/sections/ContactPage";

type Page = "home" | "projects" | "detail" | "about" | "skills" | "contact";

const PAGE_COMPONENTS: Record<Page, (props: { onNavigate: (p: string) => void }) => React.ReactElement> = {
  home:     (p) => <HomePage     onNavigate={p.onNavigate} />,
  projects: (p) => <ProjectsPage onNavigate={p.onNavigate} />,
  detail:   (p) => <DetailPage   onNavigate={p.onNavigate} />,
  about:    ()  => <AboutPage />,
  skills:   ()  => <SkillsPage />,
  contact:  ()  => <ContactPage />,
};

export default function Portfolio() {
  const [page, setPage] = useState<Page>("home");

  const navigate = useCallback((p: string) => {
    setPage(p as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const Component = PAGE_COMPONENTS[page];

  return (
    <div className="grain" style={{ minHeight: "100vh", background: tokens.bg0, position: "relative" }}>
      {/* Loading screen */}
      <LoadingScreen />

      {/* Spotlight */}
      <div className="spotlight" />

      {/* Cursor (desktop only) */}
      <Cursor />

      {/* Command palette — works everywhere */}
      <CommandPalette onNavigate={navigate} />

      {/* Nav */}
      <Nav active={page as Exclude<Page, "detail">} onNavigate={(p) => navigate(p)}>
        <MobileNav active={page as Exclude<Page, "detail">} onNavigate={(p) => navigate(p)} />
      </Nav>

      {/* Page */}
      <main key={page} style={{ position: "relative", zIndex: 2, animation: "fadeUp 0.45s cubic-bezier(0.4,0,0.2,1) both" }}>
        <Component onNavigate={navigate} />
      </main>

      {/* Marquee between content and footer */}
      <Marquee />

      {/* Footer */}
      <Footer onNavigate={(p) => navigate(p)} />
    </div>
  );
}