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
                        whileHover={{ rotateY: 5, rotateX: -2, scale: 1.02 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex-1 w-full relative perspective-1000 mb-12 lg:mb-0"
                    >
                        <div className="relative w-full max-w-sm md:max-w-md mx-auto aspect-[4/5] rounded-[2.5rem] p-2 bg-white/40 border-2 border-gold/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-gray-100">
                                <Image
                                    src="/assets/profile.jpg"
                                    alt="Prof. Urvish Soni"
                                    fill
                                    className="object-cover object-top"
                                    unoptimized
                                />
                            </div>

                            {/* Award Badge Premium Design */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="absolute -bottom-8 right-0 md:-right-8 bg-gradient-to-br from-[#E6E4DD] to-[#D5D2C9] p-4 md:p-6 rounded-2xl border border-white shadow-2xl z-20 flex items-center gap-4 min-w-[260px] md:min-w-[300px]"
                            >
                                <div className="text-gold flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                                        <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 27.311 27.311 0 004.53-.002.75.75 0 00.152-1.488 25.845 25.845 0 01-4.22.002 5.253 5.253 0 01-4.757-4.303 52.067 52.067 0 013.812-.47v8.941c0 1.254.915 2.306 2.148 2.45v2.854a.75.75 0 001.5 0v-2.854c1.233-.144 2.148-1.196 2.148-2.45V2.973A53.682 53.682 0 0018.834 3.5a5.253 5.253 0 01-4.757 4.303 25.845 25.845 0 01-4.22-.002.75.75 0 00-.152 1.488 27.311 27.311 0 004.53.002 6.753 6.753 0 006.138-5.6.75.75 0 00-.584-.859 52.616 52.616 0 00-3.071-.543v-.858a.75.75 0 00-1.5 0v1.03A55.337 55.337 0 0012 2.25c-1.11 0-2.208.06-3.298.177v-1.03a.75.75 0 00-1.5 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-widest text-[#B48E3D] mb-0.5">National Award</p>
                                    <p className="text-[17px] md:text-[19px] font-bold text-[#1A1A1A] leading-tight tracking-tight">Teacher of the Year</p>
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
