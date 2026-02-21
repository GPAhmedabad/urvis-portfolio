"use client";

import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
    {
        name: "Engineering & Automation",
        skills: [
            { name: "PLC / DCS / SCADA", level: 95 },
            { name: "Industrial Automation", level: 92 },
            { name: "Instrumentation", level: 98 },
        ]
    },
    {
        name: "Programming & AI",
        skills: [
            { name: "Python / AI Tools", level: 90 },
            { name: "MATLAB / LabVIEW", level: 88 },
            { name: "Embedded Systems (C/C++)", level: 85 },
        ]
    },
    {
        name: "Leadership & Research",
        skills: [
            { name: "Startup Mentoring", level: 95 },
            { name: "Innovation Strategy", level: 94 },
            { name: "Technical Research", level: 90 },
        ]
    }
];

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
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

const Skills = () => {
    return (
        <section id="skills" className="w-full py-24 bg-background relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-gold text-sm font-bold uppercase tracking-[0.3em] mb-4">Technical Expertise</h2>
                    <h3 className="text-4xl font-bold">Skills & Proficiencies</h3>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12"
                >
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            variants={cardVariants}
                            className="glass p-8 rounded-3xl border border-gold/10"
                        >
                            <h4 className="text-xl font-bold text-gold mb-6 border-b border-gold/20 pb-2">{category.name}</h4>
                            <div className="space-y-6">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skillIndex}>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-600">{skill.name}</span>
                                            <span className="text-sm font-bold text-gold">{skill.level}%</span>
                                        </div>
                                        <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                                viewport={{ once: true }}
                                                className="h-full bg-gold shadow-[0_0_10px_rgba(197,160,89,0.5)]"
                                            ></motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
