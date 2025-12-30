"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const projects = [
    {
        title: "APEX Trade AI",
        category: "FinTech / LLMs",
        stack: ["Python", "Market APIs", "LLMs"],
        description:
            "AI-assisted market intelligence system for XAUUSD & Forex markets. Uses macro sentiment analysis and risk logic for high-confidence trading.",
    },
    {
        title: "MetaLearn AI",
        category: "EdTech / PWA",
        stack: ["React.js", "Supabase", "Next.js"],
        description:
            "AI-powered learning platform focusing on personalized learning flows. Features session-based logic and cross-platform PWA architecture.",
    },
    {
        title: "AI Virtual Try-On",
        category: "Computer Vision",
        stack: ["React.js", "Python", "Supabase"],
        description:
            "Real-time virtual try-on system using image-based inference. Seamless frontend AI pipeline integration.",
    },
    {
        title: "Feedback Analyzer",
        category: "NLP / Transformers",
        stack: ["Next.js", "Express.js", "Transformers"],
        description:
            "Automated sentiment and topic classification system. Reduced manual data processing by 80% using custom Transformer models.",
    },
];

export default function Work() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="py-32 px-6 md:px-12 w-full bg-background relative z-10">
            <div className="mb-20">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground">
                    Selected Work
                </h2>
                <div className="h-1 w-20 bg-neutral-800 mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="group relative flex flex-col gap-6 cursor-none"
                    >
                        {/* Card Image Placeholder */}
                        <div className="w-full aspect-[4/3] bg-[#111] rounded-lg overflow-hidden relative border border-neutral-900 group-hover:border-neutral-700 transition-colors duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                            {/* Abstract Wireframe / Gradient */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-105 transition-transform duration-700 ease-out">
                                <div className="w-[80%] h-[80%] border border-neutral-800 rounded-full blur-3xl bg-neutral-900/50" />
                            </div>

                            {/* Custom Cursor Follower (Simplified for this component) */}
                            <div
                                className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                                    }`}
                            >
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mix-blend-difference">
                                    <span className="text-black font-medium text-lg">View</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <h3 className="text-3xl font-serif font-medium text-foreground group-hover:text-white transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <ArrowUpRight className="text-neutral-500 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.stack.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="text-xs font-mono text-neutral-400 border border-neutral-800 px-2 py-1 rounded-full"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <p className="text-secondary text-sm leading-relaxed max-w-md">
                                {project.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
