"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
    {
        title: "Lecturer & CEO, Project & Innovation Lab",
        company: "Government Polytechnic Ahmedabad",
        period: "2015 - Present",
        description: "Leading technical education and spearheading student-led innovations & startup incubation. Recognized with the National Teacher Award (2025).",
        icon: "🎓",
        image: "/assets/national_award.jpg"
    },
    {
        title: "Startup Mentor & Innovation Leader",
        company: "Innovation Hub",
        period: "2018 - Present",
        description: "Mentoring student startups and researchers in AI, Automation, and Embedded Systems.",
        icon: "🚀",
        image: "/assets/with_modi.jpg"
    },
    {
        title: "Manager, Instrumentation",
        company: "Reliance Industries Jamnagar",
        period: "2008 - 2015",
        description: "Managed complex instrumentation and control systems for one of the world's largest refinery complexes.",
        icon: "⚙️",
        image: "/assets/jamnagar_facility.jpg"
    }
];

const ExperienceItem = ({ exp, index }: { exp: typeof experiences[0], index: number }) => {
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center", "end start"]
    });

    // Grayscale: 100% when entering (0), 0% at center (0.5), 100% when leaving (1)
    const grayscale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], ["100%", "0%", "0%", "100%"]);
    const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.9, 1, 1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.3, 1, 1, 0.3]);
    const glow = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], ["0px 0px 0px rgba(197,160,89,0)", "0px 0px 20px rgba(197,160,89,0.2)", "0px 0px 20px rgba(197,160,89,0.2)", "0px 0px 0px rgba(197,160,89,0)"]);

    return (
        <motion.div
            ref={containerRef}
            style={{ opacity }}
            className={`relative flex flex-col md:flex-row items-center mb-32 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Dot */}
            <motion.div
                style={{
                    scale,
                    backgroundColor: useTransform(scrollYProgress, [0.4, 0.5, 0.6], ["#4a5568", "#A27B31", "#4a5568"])
                }}
                className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background z-10 shadow-[0_0_10px_rgba(162,123,49,0.3)]"
            ></motion.div>

            {/* Content Card Side */}
            <div className={`w-full md:w-1/2 p-4 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <motion.div
                    style={{ scale, boxShadow: glow }}
                    className="glass p-8 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all duration-300 cursor-default"
                >
                    <span className="text-3xl mb-4 block">{exp.icon}</span>
                    <span className="text-gold text-sm font-bold block mb-2">{exp.period}</span>
                    <h4 className="text-xl font-bold mb-1">{exp.title}</h4>
                    <p className="text-gray-600 text-sm font-semibold mb-4">{exp.company}</p>
                    <p className="text-gray-600 leading-relaxed italic">{exp.description}</p>
                </motion.div>
            </div>

            {/* Image Side */}
            <div className={`w-full md:w-1/2 p-4 flex justify-center ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                {exp.image && (
                    <motion.div
                        style={{ scale, filter: useTransform(grayscale, (val) => `grayscale(${val})`) }}
                        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20 glass"
                    >
                        <img
                            src={exp.image}
                            alt={exp.title}
                            className="w-full h-full object-cover object-top transition-all duration-700"
                        />
                        <motion.div
                            style={{ opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0.2, 0, 0.2]) }}
                            className="absolute inset-0 bg-gold/10"
                        ></motion.div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

const Experience = () => {
    const sectionRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end center"]
    });

    return (
        <section ref={sectionRef} id="experience" className="w-full py-24 bg-background relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-gold text-sm font-bold uppercase tracking-[0.3em] mb-4">Professional Odyssey</h2>
                    <h3 className="text-4xl font-bold">Work Experience</h3>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gold/10"></div>
                    <motion.div
                        style={{ scaleY: scrollYProgress }}
                        className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gold origin-top z-0 hidden md:block"
                    ></motion.div>

                    {experiences.map((exp, index) => (
                        <ExperienceItem key={index} exp={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
