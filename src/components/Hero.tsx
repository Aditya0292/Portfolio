"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Oswald } from "next/font/google";
import Image from "next/image";

const oswald = Oswald({
    weight: ["200", "300", "400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
});

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="h-screen w-full flex flex-col justify-center items-center px-4 md:px-12 relative overflow-hidden bg-black text-white"
        >
            {/* Editorial Details - Top Left */}
            {/* Editorial Details - Top Left */}
            <div className="absolute top-28 md:top-10 left-4 md:left-10 z-20 text-left">
                <span className="text-sm md:text-lg font-mono text-neutral-500 uppercase tracking-widest block">
                    ( / ) Portfolio
                </span>
                <span className="text-xs md:text-sm font-mono text-neutral-600 uppercase tracking-widest mt-1 block">
                    © 2025
                </span>
            </div>

            {/* Editorial Details - Top Right */}
            <div className="absolute top-10 right-4 md:right-10 z-20 text-right hidden md:block">
                <span className="text-sm md:text-lg font-mono text-neutral-500 uppercase tracking-widest block">
                    Aditya Havaldar
                </span>
                <span className="text-xs md:text-sm font-mono text-neutral-600 uppercase tracking-widest mt-1 block">
                    AI & DS Enthusiast
                </span>
            </div>

            {/* Editorial Details - Bottom Left */}
            <div className="absolute bottom-10 left-4 md:left-10 z-20 text-left hidden md:block">
                <span className="text-xs font-mono text-neutral-600 uppercase tracking-widest block">
                    Coordinates
                </span>
                <span className="text-sm font-mono text-neutral-500 uppercase tracking-widest mt-1 block">
                    16° 41&apos; 49&quot; N | 74° 14&apos; 54&quot; E
                </span>
            </div>

            {/* Editorial Details - Bottom Right */}
            <div className="absolute bottom-10 right-4 md:right-10 z-20 text-right hidden md:block">
                <span className="text-sm font-mono text-neutral-500 uppercase tracking-widest block">
                    Scroll Down
                </span>
            </div>

            <motion.div style={{ y, opacity }} className="z-10 w-full h-full flex items-center justify-center relative">
                {/* Container for Overlapping Layout */}
                <div className={`relative flex items-center justify-center w-full h-full ${oswald.className}`}>
                    {/* Background Text Group - Perfectly Centered Gap */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none pb-[20vh] md:pb-0">
                        <div className="flex w-full items-center justify-center">
                            <div className="w-1/2 flex justify-end pr-0 md:pr-[4vw]">
                                <motion.h1
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-[18vw] md:text-[30vw] leading-none font-normal text-white tracking-tighter mix-blend-difference whitespace-nowrap"
                                >
                                    ADI
                                </motion.h1>
                            </div>
                            <div className="w-1/2 flex justify-start pl-0 md:pl-[4vw]">
                                <motion.h1
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-[18vw] md:text-[30vw] leading-none font-normal text-white tracking-tighter mix-blend-difference whitespace-nowrap"
                                >
                                    TYA
                                </motion.h1>
                            </div>
                        </div>

                        {/* Mobile Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-xs font-mono text-neutral-400 uppercase tracking-widest mt-4 text-center px-4 md:hidden"
                        >
                            Artificial Intelligence & Data Science Enthusiast<br />UI Designer
                        </motion.p>
                    </div>

                    {/* Foreground Image - Bottom Aligned */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bottom-0 left-[52%] -translate-x-1/2 w-[80vw] md:w-[40vw] h-[60vh] md:h-[85vh] z-10"
                    >
                        {/* Glow Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] blur-[60px] -z-10 pointer-events-none" />

                        <Image
                            src="/hero-image.png"
                            alt="Aditya Havaldar"
                            fill
                            quality={100}
                            priority
                            className="object-contain object-bottom opacity-100 transition-opacity duration-500 relative z-10"
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-20" />
                {/* Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>
        </section>
    );
}
