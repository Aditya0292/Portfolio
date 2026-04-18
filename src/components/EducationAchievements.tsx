"use client";

import { motion, useAnimationControls } from "framer-motion";
import { Poppins, Anton } from "next/font/google";
import { useEffect, useState } from "react";

const poppins = Poppins({
    weight: ["300", "400", "500", "600"],
    subsets: ["latin"],
    display: "swap",
});

const anton = Anton({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

const educationData = [
    {
        degree: "B.Tech. in Artificial Intelligence and Data Science",
        institution: "Government College of Engineering, Kolhapur",
        year: "2023 – 2027",
        description: "Expected Graduation: 2027. Focusing on core AI concepts, Data Structures, and scalable system design.",
    },
];

const achievementsData = [
    {
        title: "Finalist | Dimension X Hackathon",
        description: "Recognized as a finalist at the event organized by Google Developer Student Clubs (GDSC) on campus at DIT, Kolhapur. Selected for the final round based on the innovative implementation of Smart_Workflow, an AI-first automation platform.",
        year: "2026",
    },
    {
        title: "Top 8 Finalist | SKN Sinhgad College of Engineering, Pandharpur",
        description: "Ranked in the Top 8 out of 125+ finalists in a regional technical competition, demonstrating high-level problem-solving and technical execution.",
        year: "2026",
    },
    {
        title: "Rank #3 | Technotza 2K26 (DIT, Kolhapur)",
        description: "Secured 3rd Place in a competitive field of participants, showcasing technical proficiency and project presentation skills.",
        year: "2026",
    },
    {
        title: "Hackathon 2025: Token of Appreciation",
        description: "Received formal recognition for the \"AI Feedback Analysis System,\" which utilized Transformer models to reduce data processing time by 80%.",
        year: "2025",
    },
    {
        title: "Generative AI Certification | YBI Foundation",
        description: "Completed hands-on training in Large Language Models (LLMs), prompt engineering, and applied generative AI use cases.",
        year: "2024",
    },
];

export default function EducationAchievements() {
    const controls = useAnimationControls();
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!isHovered) {
            controls.start({
                y: "-50%",
                transition: {
                    duration: 30,
                    ease: "linear",
                    repeat: Infinity,
                },
            });
        } else {
            controls.stop();
        }
    }, [isHovered, controls]);

    return (
        <section id="education" className={`relative w-full bg-black py-20 px-4 md:px-10 text-white ${poppins.className}`}>
            {/* Section Label */}
            <div className="absolute top-10 left-4 md:left-10 z-20 text-left">
                <span className="text-lg font-mono text-neutral-500 uppercase tracking-widest">
                    ( / ) Edu & Achievements
                </span>
            </div>

            <div className="container mx-auto max-w-6xl mt-16 md:mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
                    {/* Education Column */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`text-3xl md:text-5xl mb-10 flex items-center gap-3 uppercase tracking-wide ${anton.className}`}
                        >
                            <span className="text-cyan-400">/</span> Education
                        </motion.h2>

                        <div className="space-y-12 relative border-l border-white/10 ml-3 pl-8">
                            {educationData.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border border-cyan-400 rounded-full" />

                                    <span className="text-sm font-mono text-cyan-400 mb-2 block">{edu.year}</span>
                                    <h3 className="text-xl font-semibold mb-1">{edu.degree}</h3>
                                    <p className="text-neutral-400 text-sm mb-2">{edu.institution}</p>
                                    <p className="text-neutral-500 text-sm leading-relaxed">{edu.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Achievements Column */}
                    <div className="relative">
                        <motion.h2
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`text-3xl md:text-5xl mb-10 flex items-center gap-3 uppercase tracking-wide ${anton.className}`}
                        >
                            <span className="text-purple-400">/</span> Achievements
                        </motion.h2>

                        {/* Scrolling Container */}
                        <div
                            className="relative h-[420px] overflow-hidden"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onTouchStart={() => setIsHovered(true)}
                            onTouchEnd={() => setIsHovered(false)}
                        >
                            {/* Vertical Gradient Masks */}
                            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

                            <motion.div
                                animate={controls}
                                className="flex flex-col gap-6"
                            >
                                {/* Duplicate the data for seamless looping */}
                                {[...achievementsData, ...achievementsData].map((award, index) => (
                                    <div
                                        key={index}
                                        className="bg-neutral-900/50 border border-white/5 p-6 rounded-2xl hover:border-purple-400/50 transition-colors duration-300 group"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-semibold group-hover:text-purple-300 transition-colors">{award.title}</h3>
                                            <span className="text-xs font-mono text-neutral-500 border border-white/10 px-2 py-1 rounded-full">{award.year}</span>
                                        </div>
                                        <p className="text-neutral-400 text-sm">{award.description}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

