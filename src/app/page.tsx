"use client";

import Hero from "@/components/Hero";
import SkillsMarquee from "@/components/SkillsMarquee";
import About from "@/components/About";
import ProjectRoadmap from "@/components/ProjectRoadmap";
import LetsConnect from "@/components/LetsConnect";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-background text-foreground overflow-x-hidden">
      <Preloader />
      <Navbar />
      <Hero />
      <SkillsMarquee />
      <About />
      <ProjectRoadmap />
      <LetsConnect />
      <Footer />
    </main>
  );
}
