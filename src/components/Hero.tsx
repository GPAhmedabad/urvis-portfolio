"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThreeBackground from './ThreeBackground';

const TypewriterText = ({ texts }: { texts: string[] }) => {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % texts.length;
            const fullText = texts[i];

            setDisplayText(isDeleting
                ? fullText.substring(0, displayText.length - 1)
                : fullText.substring(0, displayText.length + 1)
            );

            setTypingSpeed(isDeleting ? 75 : 150);

            if (!isDeleting && displayText === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, loopNum, texts, typingSpeed]);

    return <span className="text-gold border-r-2 border-gold animate-pulse">{displayText}</span>;
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8
        }
    }
};

const Hero = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
            {/* 3D Animated Background */}
            <ThreeBackground />

            {/* Interactive Tech Grid Overlay */}
            <div
                className="absolute inset-0 z-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #A27B31 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                    transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)`,
                    transition: 'transform 0.1s ease-out'
                }}
            ></div>

            {/* Gradient Glow Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.4)_0%,_rgba(255,255,255,0)_100%)] z-0 pointer-events-none"></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 text-center px-4 max-w-5xl"
            >
                <motion.div variants={itemVariants} className="mb-8">
                    <div className="inline-block px-4 py-1 border border-gold/30 rounded-full mb-6 glass">
                        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase">
                            National Award-Winning Educator
                        </p>
                    </div>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
                >
                    Prof. <span className="text-gold">Urvish Soni</span>
                </motion.h1>

                <motion.div
                    variants={itemVariants}
                    className="text-xl md:text-2xl font-serif text-gray-600 mb-6 h-8"
                >
                    <TypewriterText texts={[
                        "Lecturer",
                        "Innovator",
                        "Startup Mentor",
                        "AI & Automation Expert"
                    ]} />
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    Shaping future engineers through innovation, research, and startup incubation.
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-6"
                >
                    <button
                        onClick={() => document.getElementById('portals')?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn-premium"
                    >
                        Explore Portals
                    </button>
                    <button
                        onClick={() => {
                            const element = document.getElementById('contact');
                            if (element) {
                                const yOffset = -20; // Slight offset to frame the "Get In Touch" perfectly
                                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                window.scrollTo({ top: y, behavior: 'smooth' });
                            }
                        }}
                        className="px-8 py-3 glass hover:bg-black/5 transition-all font-semibold rounded-sm border border-black/10 text-navy"
                    >
                        Contact Me
                    </button>
                    <a
                        href="https://github.com/GPAhmedabad/urvis-portfolio/raw/main/RESUME_Urvish_15_10_25.pdf"
                        download
                        className="px-8 py-3 bg-navy text-white font-bold hover:bg-gray-800 transition-all rounded-sm flex items-center gap-2"
                    >
                        Download CV <span>↓</span>
                    </a>
                </motion.div>
            </motion.div>

            {/* Decorative Dynamic Blur Circles */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 -left-20 w-80 h-80 bg-gold/5 blur-[120px] rounded-full z-0"
            ></motion.div>
            <motion.div
                animate={{
                    y: [0, 25, 0],
                    x: [0, -15, 0],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gray-100 blur-[120px] rounded-full z-0"
            ></motion.div>

            {/* Fade Out Edge to prevent hard lines between sections */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none flex"></div>
        </section>
    );
};

export default Hero;
