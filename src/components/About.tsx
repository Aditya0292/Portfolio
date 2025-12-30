"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ParallaxGallery from "./ParallaxGallery";

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={containerRef}
            className="min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 relative overflow-hidden text-center bg-neutral-950 py-20"
        >
            {/* Parallax Background Gallery */}
            <ParallaxGallery />

            {/* Section Label */}
            <div className="absolute top-10 left-4 md:left-10 z-20 text-left">
                <span className="text-lg font-mono text-neutral-500 uppercase tracking-widest">
                    ( / ) About Me
                </span>
            </div>

            <motion.div style={{ y, opacity }} className="z-10 flex flex-col items-center max-w-4xl mx-auto relative">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-cyan-400 font-medium tracking-wider uppercase mb-4"
                >
                    About Me
                </motion.span>

                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        whileInView={{ y: "0%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        className="text-5xl md:text-8xl font-serif font-bold text-white tracking-tight mb-8"
                    >
                        Hi There!
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="max-w-3xl text-center"
                >
                    <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-8">
                        I am a B.Tech student in AI & Data Science.
                        Passionate AI Engineer & Interface Architect focused on solving real-world problems through <span className="text-white">Generative AI</span> and <span className="text-white">LLM integration</span>.
                        I build scalable, intelligent systems that combine high-performance data science with practical application.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-neutral-300 hover:text-white hover:border-cyan-500/50 transition-colors">
                            Advanced Machine Learning
                        </span>
                        <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-neutral-300 hover:text-white hover:border-purple-500/50 transition-colors">
                            Generative AI & LLMs
                        </span>
                        <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-neutral-300 hover:text-white hover:border-pink-500/50 transition-colors">
                            Interface Architecture
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-12 flex flex-col items-center gap-3"
                >
                    <p className="text-sm text-neutral-500">Want to know more about me?</p>
                    <div className="flex items-center gap-4 text-white font-medium">
                        <a href="#contact" className="hover:text-cyan-400 transition-colors">Let&apos;s Connect</a>
                        <span className="text-neutral-700">|</span>
                        <a href="/resume.pdf" target="_blank" className="hover:text-cyan-400 transition-colors">Resume</a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
