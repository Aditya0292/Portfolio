"use client";

import React, { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    weight: ["300", "400", "500", "600"],
    subsets: ["latin"],
    display: "swap",
});

export default function LetsConnect() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globeRef = useRef<any>(null);
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        requirement: "Website",
        message: "",
    });

    useEffect(() => {
        let phi = 0;
        let width = 0;

        const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
        window.addEventListener('resize', onResize);
        onResize();

        if (!canvasRef.current) return;

        // Prevent double initialization
        if (globeRef.current) return;

        setTimeout(() => {
            if (!canvasRef.current) return;

            const isMobile = window.innerWidth < 768;

            globeRef.current = createGlobe(canvasRef.current, {
                devicePixelRatio: isMobile ? 1 : 2,
                width: 600 * 2,
                height: 600 * 2,
                phi: 0,
                theta: 0,
                dark: 1,
                diffuse: 1.2,
                mapSamples: isMobile ? 9000 : 16000,
                mapBrightness: 6,
                baseColor: [1, 1, 1],
                markerColor: [0.1, 0.8, 1],
                glowColor: [1.2, 1.2, 1.2],
                markers: [
                    { location: [20.5937, 78.9629], size: isMobile ? 0.05 : 0.1 }, // India
                ],
                onRender: (state) => {
                    state.phi = phi;
                    phi += 0.005;
                    state.width = width * 2;
                    state.height = width * 2;
                },
            });
        }, 100);

        return () => {
            if (globeRef.current) {
                globeRef.current.destroy();
                globeRef.current = null;
            }
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            });

            if (response.ok) {
                alert("Message sent successfully! I'll get back to you soon.");
                setFormState({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    requirement: "Website",
                    message: "",
                });
            } else {
                alert("Failed to send message. Please try again later.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className={`relative w-full min-h-screen bg-black py-32 overflow-hidden flex items-center justify-center ${poppins.className}`}>
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <h1 className="text-[12vw] font-bold text-neutral-900/50 whitespace-nowrap tracking-tighter">
                    LET&apos;S CONNECT
                </h1>
            </div>

            <div className="absolute top-10 left-4 md:left-10 z-20">
                <span className="text-lg font-mono text-neutral-500 uppercase tracking-widest">
                    ( / ) Contact
                </span>
            </div>

            <div className="container mx-auto px-4 md:px-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Left Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-4xl font-semibold text-white mb-8 tracking-tight">Connect with me</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">First name *</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your first name"
                                            className="w-full bg-neutral-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                                            value={formState.firstName}
                                            onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Last name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your last name"
                                            className="w-full bg-neutral-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                                            value={formState.lastName}
                                            onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Email *</label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full bg-neutral-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Phone</label>
                                        <input
                                            type="tel"
                                            placeholder="Enter your phone number"
                                            className="w-full bg-neutral-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                                            value={formState.phone}
                                            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Your Requirement</label>
                                    <div className="flex flex-wrap gap-3">
                                        {["Website", "Landing Pages", "UI Designs", "Data Analyze"].map((req) => (
                                            <button
                                                key={req}
                                                type="button"
                                                onClick={() => setFormState({ ...formState, requirement: req })}
                                                className={`px-6 py-2 rounded-full text-sm border transition-all duration-300 ${formState.requirement === req
                                                    ? "bg-white text-black border-white font-medium shadow-lg shadow-white/10"
                                                    : "bg-transparent text-neutral-400 border-white/10 hover:border-white/30 hover:text-white"
                                                    }`}
                                            >
                                                {req}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">How can I help?</label>
                                    <textarea
                                        placeholder="Feel free to outline your ideas or needs..."
                                        rows={4}
                                        className="w-full bg-neutral-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none text-sm"
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span>{isSubmitting ? "Sending..." : "Submit"}</span>
                                    {!isSubmitting && <FiArrowUpRight className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Right Column: Globe */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex items-center justify-center min-h-[350px] md:min-h-[500px] lg:min-h-full overflow-hidden"
                    >
                        <div style={{ width: '100%', maxWidth: 600, aspectRatio: 1, position: 'relative' }}>
                            <canvas
                                ref={canvasRef}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    contain: 'layout paint size',
                                    opacity: 1,
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
