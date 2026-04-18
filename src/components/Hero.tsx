import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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

    // Mouse tracking for spotlight effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Global mouse & touch tracking for immersive spotlight
    useEffect(() => {
        const handleInteraction = (e: MouseEvent | TouchEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            
            let clientX, clientY;
            if ('touches' in e) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            mouseX.set(clientX - rect.left);
            mouseY.set(clientY - rect.top);
        };

        window.addEventListener("mousemove", handleInteraction);
        window.addEventListener("touchmove", handleInteraction, { passive: false });
        window.addEventListener("touchstart", handleInteraction, { passive: false });

        return () => {
            window.removeEventListener("mousemove", handleInteraction);
            window.removeEventListener("touchmove", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
        };
    }, [mouseX, mouseY]);

    // Enhanced Mask: Smoother falloff to remove "boxy" edges
    const maskImage = useTransform(
        [springX, springY],
        ([x, y]) => `radial-gradient(circle 450px at ${x}px ${y}px, black 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0) 70%)`
    );

    // Glow Animation: Defined at top level to avoid hook errors
    const glowBackground = useTransform(
        [springX, springY],
        ([x, y]) => `radial-gradient(circle 600px at ${x}px ${y}px, rgba(255,100,20,0.35) 0%, rgba(255,100,20,0.1) 30%, transparent 70%)`
    );

    return (
        <section
            ref={containerRef}
            className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-black text-white"
        >
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
                <div className={`relative flex flex-col items-center justify-center w-full h-full ${oswald.className}`}>
                    
                    {/* 1. BACKGROUND TEXT LAYER */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none pb-[20vh] md:pb-0">
                        <div className="flex w-full h-full items-center justify-center">
                            <div className="w-1/2 flex justify-end pr-0 md:pr-[4vw]">
                                <h1
                                    className={`text-[18vw] md:text-[30vw] leading-none font-normal tracking-normal whitespace-nowrap ${isMobile ? "text-white" : "text-transparent opacity-30"}`}
                                    style={!isMobile ? { WebkitTextStroke: "2.5px rgba(255,255,255,0.45)" } : {}}
                                >
                                    ADI
                                </h1>
                            </div>
                            <div className="w-1/2 flex justify-start pl-0 md:pl-[4vw]">
                                <h1
                                    className={`text-[18vw] md:text-[30vw] leading-none font-normal tracking-normal whitespace-nowrap ${isMobile ? "text-white" : "text-transparent opacity-30"}`}
                                    style={!isMobile ? { WebkitTextStroke: "2.5px rgba(255,255,255,0.45)" } : {}}
                                >
                                    TYA
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* 2. REVEALED TEXT LAYER (Desktop Only) */}
                    {!isMobile && (
                        <motion.div
                            style={{ 
                                WebkitMaskImage: maskImage, 
                                maskImage,
                                WebkitMaskRepeat: "no-repeat",
                                maskRepeat: "no-repeat"
                            }}
                            className="absolute inset-0 z-10"
                        >
                            <div className="w-full h-full flex items-center justify-center relative">
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-1/2 flex justify-end pr-0 md:pr-[4vw]">
                                        <h1
                                            className="text-[18vw] md:text-[30vw] leading-none font-normal tracking-normal whitespace-nowrap bg-cover bg-center text-transparent bg-clip-text"
                                            style={{ backgroundImage: 'url("/textures/brushed_metal.png")' }}
                                        >
                                            ADI
                                        </h1>
                                    </div>
                                    <div className="w-1/2 flex justify-start pl-0 md:pl-[4vw]">
                                        <h1
                                            className="text-[18vw] md:text-[30vw] leading-none font-normal tracking-normal whitespace-nowrap bg-cover bg-center text-transparent bg-clip-text"
                                            style={{ backgroundImage: 'url("/textures/brushed_metal.png")' }}
                                        >
                                            TYA
                                        </h1>
                                    </div>
                                </div>
                                <motion.div
                                    style={{ background: glowBackground }}
                                    className="absolute inset-0 z-20 pointer-events-none mix-blend-color-dodge"
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* 3. MOBILE DESCRIPTION */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-[10px] md:text-xs font-mono text-neutral-400 uppercase tracking-[0.2em] mt-8 text-center px-4 md:hidden relative z-30"
                    >
                        Artificial Intelligence & Data Science Enthusiast<br />
                        <span className="text-neutral-500">UI Designer</span>
                    </motion.p>

                    {/* 4. FOREGROUND IMAGE */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bottom-0 left-[52%] -translate-x-1/2 w-[80vw] md:w-[40vw] h-[60vh] md:h-[85vh] z-10 will-change-transform"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] blur-[60px] -z-10 pointer-events-none" />
                        <Image
                            src="/hero-image-new.png"
                            alt="Aditya Havaldar"
                            fill
                            quality={100}
                            priority
                            className="object-contain object-bottom opacity-100 transition-opacity duration-500 relative z-10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20" />
                    </motion.div>

                </div>
            </motion.div>

            {/* BACKGROUND ELEMENTS */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-20" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>
        </section>
    );
}
