"use client";
import { projects } from "@/lib/tokens";
import ProjectCaseStudy from "@/components/sections/ProjectCaseStudy";

interface DetailPageProps {
  onNavigate: (p: string) => void;
}

export default function DetailPage({ onNavigate }: DetailPageProps) {
  const project = projects.find((item) => item.id === "campusmart") ?? projects[0];

  return <ProjectCaseStudy project={project} onBack={() => onNavigate("projects")} />;
}
