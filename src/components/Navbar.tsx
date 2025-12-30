"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    weight: ["300", "400", "500", "600"],
    subsets: ["latin"],
    display: "swap",
});

const navLinks = [
    { name: "Home", href: "#" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-6 left-0 right-0 z-50 flex justify-center px-4 ${poppins.className}`}
        >
            <div className="flex justify-between md:grid md:grid-cols-3 items-center w-full max-w-3xl bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-2 pl-3 pr-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                {/* Profile / Brand */}
                <div className="flex items-center gap-3 justify-start">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
                        <Image
                            src="/profile-new.jpg"
                            alt="Aditya Havaldar"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="text-white font-bold tracking-tight">
                        Aditya
                    </span>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center justify-center gap-8">
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-sm text-neutral-400 hover:text-white transition-colors duration-300 font-medium"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* CTA Button */}
                <div className="flex justify-end">
                    <Link href="#contact">
                        <button className="bg-[#1a1a1a] hover:bg-[#222] text-white text-xs md:text-sm font-medium px-4 py-2 md:px-6 md:py-2.5 rounded-full border border-white/10 transition-colors duration-300">
                            Let&apos;s Connect
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
