"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";

const poppins = Poppins({
    weight: ["300", "400", "500", "600"],
    subsets: ["latin"],
    display: "swap",
});

const navLinks = [
    { name: "Home", href: "#" },
    { name: "Work", href: "#work" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        setIsMenuOpen(false);
        const targetId = href.replace("#", "");
        const elem = document.getElementById(targetId);
        if (elem) {
            elem.scrollIntoView({ behavior: "smooth" });
        } else if (href === "#") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMenuOpen]);

    return (
        <>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-6 left-0 right-0 z-[60] flex justify-center px-4 ${poppins.className}`}
            >
                <div className="flex justify-between items-center w-full max-w-3xl bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-1.5 pl-3 pr-1.5 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    {/* Profile / Brand */}
                    <div className="flex items-center gap-3 justify-start">
                        <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/10">
                            <Image
                                src="/monogram.png"
                                alt="Aditya Havaldar Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-white font-bold tracking-tight text-sm md:text-base">
                            Aditya
                        </span>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center justify-center gap-8">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                onClick={(e) => handleScroll(e, link.href)}
                                className="text-sm text-neutral-400 hover:text-white transition-colors duration-300 font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Toggle / CTA */}
                    <div className="flex items-center gap-2">
                        <Link
                            href="#contact"
                            onClick={(e) => handleScroll(e, "#contact")}
                            className="hidden md:block bg-[#1a1a1a] hover:bg-[#222] text-white text-xs md:text-sm font-medium px-4 py-2 md:px-6 md:py-2.5 rounded-full border border-white/10 transition-colors duration-300"
                        >
                            Let&apos;s Connect
                        </Link>
                        
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex md:hidden flex-col gap-1.5 p-3 z-[70]"
                        >
                            <motion.span 
                                animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                className="w-6 h-0.5 bg-white rounded-full"
                            />
                            <motion.span 
                                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-6 h-0.5 bg-white rounded-full"
                            />
                            <motion.span 
                                animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                className="w-6 h-0.5 bg-white rounded-full"
                            />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
                    >
                        <nav className="flex flex-col items-center gap-10">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={(e) => handleScroll(e, link.href)}
                                        className="text-4xl font-bold text-white hover:text-purple-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Link
                                    href="#contact"
                                    onClick={(e) => handleScroll(e, "#contact")}
                                    className="mt-4 bg-white text-black px-10 py-4 rounded-full font-bold text-xl"
                                >
                                    Let&apos;s Connect
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
