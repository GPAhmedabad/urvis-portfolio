"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const portals = [
    {
        title: "Origin Electricity",
        url: "https://originelectricity.wordpress.com/",
        category: "Basic Engineering",
        image: "/assets/portals/electricity_v2.png",
        description: "Exploring the fundamentals of electricity and electrical engineering principles."
    },
    {
        title: "Pi Classic",
        url: "https://piclassic.wordpress.com/",
        category: "Classic Engineering",
        image: "/assets/portals/engineering_v2.png",
        description: "A deep dive into classical engineering disciplines and time-tested methodologies."
    },
    {
        title: "Control Class",
        url: "https://controlclass.wordpress.com/",
        category: "Automation",
        image: "/assets/portals/control_v2.png",
        description: "Comprehensive resources on control systems, feedback loops, and automation logic."
    },
    {
        title: "Hello IC",
        url: "https://helloic.wordpress.com/",
        category: "Instrumentation",
        image: "/assets/portals/instrumentation_v2.png",
        description: "Introduction to instrumentation and control, perfect for students and beginners."
    },
    {
        title: "Borlove",
        url: "https://borlove.wordpress.com/",
        category: "Research",
        image: "/assets/portals/engineering_v2.png",
        description: "Innovative research and general engineering insights from an academic perspective."
    },
    {
        title: "AR Sensor",
        url: "https://arsensor.wordpress.com/",
        category: "Emerging Tech",
        image: "/assets/portals/communication_v2.png",
        description: "Investigating the intersection of Augmented Reality and advanced sensor technologies."
    },
    {
        title: "Transducer IC",
        url: "https://transduceric.wordpress.com/",
        category: "Instrumentation",
        image: "/assets/portals/transducer_v2.png",
        description: "Specialized focus on transducer technology, its types, and industrial applications."
    },
    {
        title: "Communication IC",
        url: "https://communicationic.wordpress.com/",
        category: "Industrial Networking",
        image: "/assets/portals/communication_v2.png",
        description: "Understanding industrial communication protocols and network infrastructure."
    },
    {
        title: "Hot PLC",
        url: "https://hotplc.wordpress.com/",
        category: "Automation",
        image: "/assets/portals/instrumentation_v2.png",
        description: "Advanced techniques for Programmable Logic Controllers and industrial HMI."
    },
    {
        title: "Solution IC",
        url: "https://solutionic.wordpress.com/",
        category: "Problem Solving",
        image: "/assets/portals/engineering_v2.png",
        description: "Practical engineering solutions and case studies for complex industrial challenges."
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

const EducationalPortals = () => {
    return (
        <section id="portals" className="w-full py-24 bg-background relative border-t border-black/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-gold text-sm font-bold uppercase tracking-[0.3em] mb-4">Academic Resources</h2>
                    <h3 className="text-4xl font-bold">Subject Portals</h3>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    {portals.map((portal) => (
                        <motion.a
                            key={portal.title}
                            href={portal.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={cardVariants}
                            whileHover={{ y: -8 }}
                            className="group flex flex-col glass rounded-3xl overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-300 shadow-sm hover:shadow-xl"
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <Image
                                    src={portal.image}
                                    alt={portal.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity"></div>
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="inline-block text-[9px] font-black text-white uppercase tracking-[0.2em] bg-gold/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
                                        {portal.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1 bg-white/40">
                                <h4 className="text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors line-clamp-1">
                                    {portal.title}
                                </h4>
                                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-6 flex-1">
                                    {portal.description}
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gold/10">
                                    <span className="text-[10px] font-bold text-gold uppercase tracking-widest">
                                        Open Resource
                                    </span>
                                    <motion.span
                                        className="text-gold"
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        →
                                    </motion.span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default EducationalPortals;
