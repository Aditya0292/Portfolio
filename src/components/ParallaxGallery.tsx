"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const images = [
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=500&auto=format&fit=crop", // Abstract 1
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop", // Abstract 2
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=500&auto=format&fit=crop", // Abstract 3
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=500&auto=format&fit=crop", // Abstract 4
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=500&auto=format&fit=crop", // Abstract 5
    "https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=500&auto=format&fit=crop", // Abstract 6
    "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=500&auto=format&fit=crop", // Abstract 7
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop", // Abstract 8
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=500&auto=format&fit=crop", // Abstract 9
];

export default function ParallaxGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const x1 = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
    const x2 = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);
    const x3 = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none bg-black">
            <div className="flex flex-col justify-center gap-4 md:gap-10 h-full py-10">
                <ParallaxRow x={x1} images={images.slice(0, 5)} />
                <ParallaxRow x={x2} images={images.slice(2, 7)} />
                <ParallaxRow x={x3} images={images.slice(4, 9)} />
            </div>
            {/* Gradient Overlay to fade edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
        </div>
    );
}

function ParallaxRow({ x, images }: { x: MotionValue<string>; images: string[] }) {
    return (
        <motion.div style={{ x }} className="flex gap-3 md:gap-6 whitespace-nowrap min-w-full">
            {[...images, ...images, ...images].map((src, index) => (
                <div
                    key={index}
                    className="relative w-[200px] h-[15vh] md:w-[400px] md:h-[25vh] rounded-xl overflow-hidden brightness-[0.6] hover:brightness-100 transition-all duration-500 shrink-0 border border-white/10"
                >
                    <Image
                        src={src}
                        alt="Gallery Image"
                        fill
                        className="object-cover"
                    />
                </div>
            ))}
        </motion.div>
    );
}
