"use client";

import Hero from "@/components/Hero";
import SkillsMarquee from "@/components/SkillsMarquee";
import About from "@/components/About";
import ProjectRoadmap from "@/components/ProjectRoadmap";
import EducationAchievements from "@/components/EducationAchievements";
import LetsConnect from "@/components/LetsConnect";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <SkillsMarquee />
      <About />
      <ProjectRoadmap />
      <EducationAchievements />
      <LetsConnect />
      <Footer />
    </main>
  );
}
