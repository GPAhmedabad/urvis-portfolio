"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 30, stiffness: 250 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            // Check if hovering over an interactive element
            const target = e.target as HTMLElement;
            const isInteractive = target.closest('a, button, [role="button"], .interactive');
            setIsHovering(!!isInteractive);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible, mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
                x: springX,
                y: springY,
                translateX: '-50%',
                translateY: '-50%',
            }}
        >
            <div className="relative flex items-center justify-center">
                {/* Central Precision Point */}
                <motion.div
                    className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_rgba(162,123,49,0.8)] z-20"
                    animate={{ scale: isHovering ? 1.5 : 1 }}
                />

                {/* Technical Outer Gauge Ring */}
                <motion.div
                    className="absolute w-10 h-10 border-2 border-gold/20 rounded-full border-t-gold/80"
                    animate={{
                        rotate: 360,
                        scale: isHovering ? 1.4 : 1,
                        opacity: isHovering ? 0.8 : 0.4
                    }}
                    transition={{
                        rotate: { repeat: Infinity, duration: 3, ease: "linear" },
                        default: { duration: 0.3 }
                    }}
                />

                {/* Instrumentation Brackets (Crosshairs) */}
                {[0, 90, 180, 270].map((rotation) => (
                    <motion.div
                        key={rotation}
                        className="absolute w-2 h-[1px] bg-gold"
                        style={{
                            rotate: rotation,
                            originX: "50%",
                        }}
                        animate={{
                            translateY: isHovering ? -18 : -14,
                            scaleX: isHovering ? 1.5 : 1,
                            backgroundColor: isHovering ? "#C5A059" : "#A27B31"
                        }}
                    />
                ))}

                {/* Scanning Laser Effect (Minimalist) */}
                <motion.div
                    className="absolute w-full h-[1px] bg-gold/10"
                    animate={{
                        translateY: [-12, 12, -12],
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />

                {/* Coordinate Readout Brackets */}
                <motion.div
                    className="absolute -top-6 -right-6 w-3 h-3 border-t border-r border-gold/40"
                    animate={{ scale: isHovering ? 0.8 : 1 }}
                />
                <motion.div
                    className="absolute -bottom-6 -left-6 w-3 h-3 border-b border-l border-gold/40"
                    animate={{ scale: isHovering ? 0.8 : 1 }}
                />
            </div>
        </motion.div>
    );
};

export default CustomCursor;
