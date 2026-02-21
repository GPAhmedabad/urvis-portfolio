"use client";

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8
        }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const About = () => {
    return (
        <section id="about" className="w-full py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Image Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ rotateY: 15, rotateX: -5, scale: 1.02 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex-1 relative cursor-pointer perspective-1000"
                    >
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            {/* Glass Frame */}
                            <div className="absolute inset-0 border-2 border-gold/30 rounded-2xl transform rotate-3 z-0"></div>
                            <div className="absolute inset-0 glass rounded-2xl z-10 overflow-hidden">
                                <Image
                                    src="/assets/profile.jpg"
                                    alt="Prof. Urvish Soni"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Award Badge */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="absolute -bottom-6 -right-6 glass p-4 rounded-xl border border-gold/50 z-20 flex items-center gap-3"
                            >
                                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold">
                                    🏆
                                </div>
                                <div>
                                    <p className="text-xs text-gold font-bold uppercase tracking-tighter">National Award</p>
                                    <p className="text-sm font-semibold">Teacher of the Year</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Container */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <h2 className="text-gold text-sm font-bold uppercase tracking-[0.3em] mb-4">A Visionary Journey</h2>
                        <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                            Bridging Industrial Excellence <br /> with Academic Innovation
                        </h3>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="space-y-6 text-gray-600 text-lg leading-relaxed"
                        >
                            <motion.p variants={revealVariants}>
                                Prof. Urvish Soni is a National Award-winning educator and innovator, recognized by the <span className="text-navy font-bold">President of India</span> for his transformative contributions to technical education.
                            </motion.p>
                            <motion.p variants={revealVariants}>
                                Currently serving as a Lecturer at <span className="text-navy font-bold">Government Polytechnic Ahmedabad</span> and CEO of the <span className="text-navy font-bold">Project & Innovation Lab</span>, he specializes in Instrumentation, AI, and Automation.
                            </motion.p>
                            <motion.p variants={revealVariants}>
                                His journey spans from the high-stakes industrial environment of <span className="text-navy font-bold">Reliance Industries</span> to the forefront of AI research and startup mentorship, shaping the next generation of engineers and entrepreneurs.
                            </motion.p>
                        </motion.div>

                        <div className="mt-10 grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-3xl font-bold text-gold">15+</p>
                                <p className="text-gray-500 text-sm uppercase tracking-wider">Years Experience</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gold">50+</p>
                                <p className="text-gray-500 text-sm uppercase tracking-wider">Startups Mentored</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Milestone Gallery */}
                <div className="mt-32">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold mb-4">Awards & Milestones</h3>
                        <div className="w-20 h-1 bg-gold mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* National Award */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-4 group"
                        >
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass border border-gold/20">
                                <Image
                                    src="/assets/national_award.jpg"
                                    alt="Receiving National Award"
                                    fill
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="px-1">
                                <p className="text-gold font-bold text-[10px] uppercase tracking-widest mb-1">Honored by President of India</p>
                                <h4 className="text-lg font-bold text-navy leading-tight">National Teacher Award 2025</h4>
                            </div>
                        </motion.div>

                        {/* With PM Modi */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-4 group"
                        >
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass border border-gold/20">
                                <Image
                                    src="/assets/with_modi.jpg"
                                    alt="With PM Narendra Modi"
                                    fill
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="px-1">
                                <p className="text-gold font-bold text-[10px] uppercase tracking-widest mb-1">Startup India Initiative</p>
                                <h4 className="text-lg font-bold text-navy leading-tight">Showcasing Innovations to PM Narendra Modi</h4>
                            </div>
                        </motion.div>

                        {/* Reliance Jamnagar */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-4 group"
                        >
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass border border-gold/20">
                                <Image
                                    src="/assets/reliance_award_v2.jpg"
                                    alt="Reliance Industries Jamnagar"
                                    fill
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="px-1">
                                <p className="text-gold font-bold text-[10px] uppercase tracking-widest mb-1">Industrial Leadership</p>
                                <h4 className="text-lg font-bold text-navy leading-tight">Instrumentation Manager @ Reliance</h4>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
