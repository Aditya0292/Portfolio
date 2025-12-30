"use client";

import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import React, { useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import { Anton } from "next/font/google";

const anton = Anton({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

import { projects } from "../data/projects";

export default function ProjectRoadmap() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="work" className="relative w-full bg-black py-32 overflow-hidden">
            <div className="absolute top-10 left-4 md:left-10 z-20">
                <span className="text-lg font-mono text-neutral-500 uppercase tracking-widest">
                    ( / ) My Work
                </span>
            </div>
            <div className="container mx-auto px-4 md:px-10 relative z-10">
                <div className="flex flex-col items-center justify-center gap-0">
                    {projects.map((project, index) => (
                        <ProjectItem
                            key={index}
                            project={project}
                            index={index}
                            hoveredIndex={hoveredIndex}
                            setHoveredIndex={setHoveredIndex}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectItem({
    project,
    index,
    hoveredIndex,
    setHoveredIndex
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    project: any;
    index: number;
    hoveredIndex: number | null;
    setHoveredIndex: (index: number | null) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Removed 3D tilt logic (rotateX, rotateY) as requested

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = ref.current?.getBoundingClientRect();

        if (rect) {
            const width = rect.width;
            const height = rect.height;

            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const xPct = mouseX / width - 0.5;
            const yPct = mouseY / height - 0.5;

            x.set(xPct);
            y.set(yPct);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setHoveredIndex(null);
    };

    const isHovered = hoveredIndex === index;

    return (
        <Link href={`/work/${project.slug}`} className="block w-full relative z-20">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={handleMouseLeave}
                initial="initial"
                whileHover="hover"
                className="group relative flex flex-col items-center justify-center py-2 cursor-pointer transition-all duration-500"
            >
                <motion.div
                    className="relative z-10 text-center transition-transform duration-300"
                >
                    <h3 className={`text-4xl sm:text-5xl md:text-8xl lg:text-[8rem] uppercase tracking-wide text-neutral-400 group-hover:text-white transition-all duration-300 leading-none md:leading-[0.8] group-hover:blur-sm group-hover:opacity-20 ${anton.className}`}>
                        {project.title}
                    </h3>

                    {/* Category Label */}
                    <div className="flex items-center justify-center gap-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <span className="text-lg md:text-xl font-mono text-cyan-400 tracking-widest uppercase">
                            {project.category}
                        </span>
                    </div>
                </motion.div>

                {/* Rotating "VIEW SITE" Badge */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                x: x,
                                y: y,
                                translateX: "-50%",
                                translateY: "-50%",
                                left: "50%",
                                top: "50%"
                            }}
                            className="absolute pointer-events-none z-50 w-20 h-20 flex items-center justify-center"
                        >
                            <div className="relative w-full h-full animate-[spin_6s_linear_infinite]">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <path
                                        id="circlePath"
                                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                        fill="none"
                                    />
                                    <text className="text-[12px] font-bold uppercase fill-cyan-400 tracking-widest">
                                        <textPath href="#circlePath" startOffset="0%">
                                            VIEW PROJECT • VIEW PROJECT •
                                        </textPath>
                                    </text>
                                </svg>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FiArrowUpRight className="text-2xl text-white" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Hover Background Glow */}
                <motion.div
                    variants={{
                        initial: { opacity: 0, scale: 0.8 },
                        hover: { opacity: 1, scale: 1 }
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 blur-3xl rounded-full -z-10"
                />
            </motion.div>
        </Link>
    );
}
