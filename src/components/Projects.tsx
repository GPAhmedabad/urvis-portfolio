"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projectCategories = ["All", "Electricity", "Instrumentation", "Control Systems", "Innovation", "Research"];

const manualProjects = [
    {
        title: "Advanced Electrical Load Balancer",
        category: "Electricity",
        description: "A smart system for balancing electrical loads in industrial microgrids to optimize energy consumption.",
        tech: ["Power Electronics", "Control Theory", "Embedded Systems"],
        link: "#"
    },
    {
        title: "Precision Sensor Calibration Kit",
        category: "Instrumentation",
        description: "Development of a portable calibration system for industrial pressure and temperature transducers.",
        tech: ["Instrumentation", "Calibration", "Data Acquisition"],
        link: "#"
    },
    {
        title: "Smart Innovation Lab Hub",
        category: "Control Systems",
        description: "Centralized automation system for research labs, integrating PLC and IoT for real-time monitoring.",
        tech: ["PLC", "IoT", "Scada"],
        link: "#"
    },
    {
        title: "AI Camera Support Gear",
        category: "Innovation",
        description: "Advanced stabilization and tracking research for industrial and professional camera gear using AI algorithms.",
        tech: ["Python", "Computer Vision", "Hardware Design"],
        link: "#"
    },
    {
        title: "Industrial Automation Framework",
        category: "Control Systems",
        description: "Custom framework for rapid deployment of DCS and PLC systems in manufacturing environments.",
        tech: ["DCS", "PLC", "Industrial IoT"],
        link: "#"
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

const projectVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5 }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.3 }
    }
};

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [fetchedProjects, setFetchedProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/github');
                if (response.ok) {
                    const data = await response.json();
                    const formatted = data.map((repo: any) => ({
                        title: repo.name,
                        category: "Research", // Default category for GitHub repos
                        description: repo.description || "Experimental research and development project.",
                        tech: repo.language ? [repo.language] : ["Github"],
                        link: repo.html_url
                    }));
                    setFetchedProjects(formatted);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const allProjects = [...manualProjects, ...fetchedProjects];

    const filteredProjects = activeCategory === "All"
        ? allProjects
        : allProjects.filter(p => p.category === activeCategory);

    return (
        <section id="projects" className="w-full py-24 bg-background relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-gold text-sm font-bold uppercase tracking-[0.3em] mb-4">Innovation Portfolio</h2>
                    <h3 className="text-4xl font-bold mb-8">Featured Projects</h3>

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {projectCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full border transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-gold border-gold text-navy font-bold'
                                    : 'border-white/10 hover:border-gold/50 text-gray-400'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                layout
                                variants={projectVariants}
                                className="glass group p-8 rounded-3xl border border-gold/10 hover:border-gold/40 transition-all duration-500 overflow-hidden relative"
                            >
                                {/* Background Glow */}
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-all"></div>

                                <div className="relative z-10">
                                    <span className="text-xs font-bold text-gold uppercase tracking-tighter bg-gold/10 px-3 py-1 rounded-sm mb-4 inline-block">
                                        {project.category}
                                    </span>
                                    <h4 className="text-2xl font-bold mb-4">{project.title}</h4>
                                    <p className="text-gray-600 mb-6 line-clamp-2">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tech.map((t: string) => (
                                            <span key={t} className="text-[10px] text-gray-600 border border-black/5 px-2 py-0.5 rounded-sm uppercase font-semibold">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        <button className="flex items-center gap-2 text-gold font-bold text-sm hover:underline">
                                            View Details <span>→</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
