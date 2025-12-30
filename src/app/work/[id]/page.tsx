"use client";

import { use, useState } from "react";
import { projects } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiChevronLeft, FiChevronRight, FiExternalLink, FiSmartphone } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { Oswald } from "next/font/google";

const oswald = Oswald({
    weight: ["400", "500"],
    subsets: ["latin"],
    display: "swap",
});

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const project = projects.find((p) => p.slug === id);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!project) {
        notFound();
    }

    const images = project.images && project.images.length > 0 ? project.images : [project.image];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-10">
            <Link
                href="/#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900/50 border border-white/10 text-sm text-neutral-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-md mb-12 group"
            >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Work</span>
            </Link>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left Column: Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4 block">
                        {project.category}
                    </span>
                    <h1 className={`text-5xl md:text-7xl font-normal uppercase tracking-tight mb-8 ${oswald.className}`}>
                        {project.title}
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-10 max-w-xl">
                        {project.description}
                    </p>

                    <div className="mb-12">
                        <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-4">
                            Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-3 mb-10">
                            {project.techStack.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-neutral-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            {project.demoUrl && (
                                <Link
                                    href={project.demoUrl}
                                    target="_blank"
                                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-colors"
                                >
                                    <FiExternalLink className="text-xl" />
                                    <span>Live Demo</span>
                                </Link>
                            )}
                            {project.appUrl && (
                                <Link
                                    href={project.appUrl}
                                    target="_blank"
                                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-neutral-800 text-white font-medium hover:bg-neutral-700 transition-colors border border-white/10"
                                >
                                    <FiSmartphone className="text-xl" />
                                    <span>Download App</span>
                                </Link>
                            )}
                            {project.githubUrl && (
                                <Link
                                    href={project.githubUrl}
                                    target="_blank"
                                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors"
                                >
                                    <SiGithub className="text-xl" />
                                    <span>View Repository</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Image Carousel */}
                <div className="relative w-full aspect-[16/10]">
                    <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl shadow-cyan-900/10">
                        <AnimatePresence initial={false} mode="wait">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);

                                    if (swipe < -swipeConfidenceThreshold) {
                                        nextImage();
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        prevImage();
                                    }
                                }}
                                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
                            >
                                <Image
                                    src={images[currentImageIndex]}
                                    alt={`${project.title} screenshot`}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    {images.length > 1 && (
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={prevImage}
                                className="p-3 rounded-full bg-neutral-800 text-white hover:bg-neutral-700 transition-colors border border-white/10"
                            >
                                <FiChevronLeft className="text-xl" />
                            </button>
                            <div className="flex items-center gap-2">
                                {images.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? "bg-cyan-400" : "bg-neutral-700"
                                            }`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={nextImage}
                                className="p-3 rounded-full bg-neutral-800 text-white hover:bg-neutral-700 transition-colors border border-white/10"
                            >
                                <FiChevronRight className="text-xl" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
