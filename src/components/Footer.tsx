"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-background pt-20 pb-10 px-6 md:px-12 relative z-10 border-t border-neutral-900">
            <div className="flex flex-col items-start justify-between min-h-[60vh]">
                <div className="w-full">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-[10vw] font-serif font-bold leading-none tracking-tighter text-neutral-800 hover:text-foreground transition-colors duration-500 cursor-pointer"
                    >
                        Let&apos;s Talk.
                    </motion.h2>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-end gap-10 mt-20">
                    <div className="flex flex-col gap-4">
                        <a
                            href="mailto:adityahavaldar07@gmail.com"
                            className="text-2xl md:text-3xl font-light text-foreground hover:text-neutral-400 transition-colors flex items-center gap-2"
                        >
                            adityahavaldar07@gmail.com
                            <ArrowUpRight className="w-6 h-6" />
                        </a>
                        <p className="text-secondary text-sm font-mono">
                            (+91) 8080297728
                        </p>
                    </div>

                    <div className="flex gap-8">
                        <a
                            href="https://www.linkedin.com/in/aditya-havaldar-205951288/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover:text-white transition-colors text-sm font-mono uppercase tracking-widest"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/Aditya0292"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover:text-white transition-colors text-sm font-mono uppercase tracking-widest"
                        >
                            GitHub
                        </a>
                    </div>
                </div>

                <div className="w-full h-px bg-neutral-900 mt-10 mb-6" />

                <div className="w-full flex justify-between items-center text-xs text-neutral-600 font-mono uppercase">
                    <span>© 2025 Aditya Havaldar</span>
                    <span>Kolhapur, India</span>
                </div>
            </div>
        </footer>
    );
}
