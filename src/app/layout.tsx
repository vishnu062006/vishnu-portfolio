import type { Metadata } from "next";
import "./globals.css";
import SmoothScrolling from "@/components/layout/SmoothScrolling";

export const metadata: Metadata = {
  title: "Vishnu Mashalkar — Frontend Developer",
  description:
    "Frontend-focused MERN Stack Developer. I build clean, scalable web experiences with React, Node.js, and MongoDB.",
  keywords: ["Vishnu Mashalkar", "Frontend Developer", "MERN Stack", "React", "Portfolio"],
  authors: [{ name: "Vishnu Mashalkar" }],
  openGraph: {
    title: "Vishnu Mashalkar — Frontend Developer",
    description: "Frontend-focused MERN Stack Developer building clean, scalable web experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}