"use client";

import { motion } from "framer-motion";
import {
    SiNextdotjs,
    SiReact,
    SiTailwindcss,
    SiPython,
    SiTensorflow,
    SiSupabase,
    SiGit,
    SiFigma,
    SiNumpy,
    SiPandas,
    SiScikitlearn,
    SiMongodb,
    SiMysql,
    SiN8N,
} from "react-icons/si";
import { ChartLine } from "lucide-react";

const skills = [
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
    { name: "NumPy", icon: SiNumpy, color: "#4DABCF" },
    { name: "Pandas", icon: SiPandas, color: "#E70488" },
    { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "n8n", icon: SiN8N, color: "#FF6D5A" },
    { name: "Matplotlib", icon: ChartLine, color: "#ffffff" },
    { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];

export default function SkillsMarquee() {
    return (
        <section id="skills" className="py-20 w-full overflow-hidden bg-background relative z-10">
            {/* Section Label */}
            <div className="absolute top-4 left-4 md:left-6 z-20 text-left">
                <span className="text-sm md:text-lg font-mono text-neutral-500 uppercase tracking-widest block">
                    ( / ) Skills
                </span>
            </div>

            <div className="flex w-full mask-image-linear-gradient">
                <motion.div
                    initial={{ x: "0%" }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="flex gap-16 pr-16 whitespace-nowrap"
                >
                    {[...skills, ...skills].map((skill, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 text-neutral-500 transition-colors duration-300 group cursor-default"
                            style={{ "--hover-color": skill.color } as React.CSSProperties}
                        >
                            <skill.icon
                                className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300 group-hover:text-[var(--hover-color)]"
                            />
                            <span className="text-xl font-mono font-medium tracking-tight hidden md:block group-hover:text-white">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
