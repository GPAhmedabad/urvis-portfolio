"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ThreeBackground = () => {
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorGlowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;
            mousePos.current = { x, y };

            if (cursorGlowRef.current) {
                // Instantly update the radial gradient mask position for absolute 0-latency tracking
                cursorGlowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(162, 123, 49, 0.08), transparent 40%)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#FFFFFF] pointer-events-none">
            {/* Static Soft Background Gradients */}
            <div className="absolute top-0 left-[-10%] w-[50%] h-[70%] bg-[radial-gradient(ellipse_at_center,_rgba(197,160,89,0.1)_0%,_transparent_70%)] rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[80%] bg-[radial-gradient(ellipse_at_center,_rgba(45,74,143,0.05)_0%,_transparent_70%)] rounded-full blur-3xl opacity-60"></div>

            {/* Slowly Floating Premium Orbs */}
            <motion.div
                animate={{
                    y: [0, -40, 0],
                    x: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[20%] right-[20%] w-[30%] h-[40%] bg-gold/10 rounded-full blur-[100px] opacity-40 mix-blend-multiply"
            />

            <motion.div
                animate={{
                    y: [0, 50, 0],
                    x: [0, -40, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute bottom-[20%] left-[20%] w-[35%] h-[45%] bg-[#C5A02E]/10 rounded-full blur-[120px] opacity-30 mix-blend-multiply"
            />

            {/* Mouse Tracking Soft Light Mask */}
            <div
                ref={cursorGlowRef}
                className="absolute inset-0 z-10 transition-colors duration-200"
                style={{ background: 'radial-gradient(600px circle at center, rgba(162, 123, 49, 0), transparent 40%)' }}
            />
        </div>
    );
};

export default ThreeBackground;
