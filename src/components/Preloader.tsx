"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const duration = 4500; // 4.5 seconds
        const interval = 30;
        const steps = duration / interval;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setCount((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsVisible(false), 800);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white"
                    style={{ perspective: 1000 }}
                >
                    <div className="relative flex flex-col items-center justify-center">
                        {/* 3D Rotating Image Monogram */}
                        <motion.div
                            initial={{ rotateY: 0, opacity: 1 }}
                            animate={{ rotateY: 360 }}
                            transition={{
                                duration: 2.5,
                                ease: "easeInOut",
                                repeat: Infinity,
                            }}
                            className="mb-4 relative w-80 h-80"
                        >
                            <Image
                                src="/monogram.png"
                                alt="Monogram Loader"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        {/* Loading Line Line Effect */}
                        <div className="w-64 h-[1px] bg-white/10 overflow-hidden relative">
                            <motion.div
                                className="absolute left-0 top-0 h-full bg-white"
                                initial={{ width: "0%" }}
                                animate={{ width: `${count}%` }}
                                transition={{ type: "spring", stiffness: 40, damping: 20 }}
                            />
                        </div>
                    </div>

                    {/* Percentage Counter - Bottom Right Position */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed bottom-10 right-10"
                    >
                        <span className="text-6xl md:text-8xl font-mono font-bold tracking-tighter">
                            {Math.round(count)}%
                        </span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
