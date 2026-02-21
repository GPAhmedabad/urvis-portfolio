"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter, Instagram, Facebook, Send, MapPin, Phone } from 'lucide-react';

const socials = [
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/urvish-soni-803a1265/",
        icon: Linkedin,
        color: "#0077B5",
        bg: "bg-[#0077B5]",
        label: "Professional Network",
    },
    {
        name: "GitHub",
        href: "https://github.com/UrviSoni",
        icon: Github,
        color: "#24292E",
        bg: "bg-[#24292E]",
        label: "Code Repository",
    },
    {
        name: "Twitter / X",
        href: "https://x.com/urvishsoni",
        icon: Twitter,
        color: "#1DA1F2",
        bg: "bg-[#1DA1F2]",
        label: "Latest Updates",
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/urvishsoni/",
        icon: Instagram,
        color: "#E4405F",
        bg: "bg-[#E4405F]",
        label: "Behind the Scenes",
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/urvishsoni",
        icon: Facebook,
        color: "#1877F2",
        bg: "bg-[#1877F2]",
        label: "Community",
    },
];

const Contact = () => {
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: "273c4f56-e242-4203-82d2-f7f6a11eaafe",
                    ...formData,
                    subject: `New Portfolio Message from ${formData.name}`,
                    from_name: "Portfolio Inquiry",
                }),
            });
            const result = await response.json();
            if (result.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 6000);
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="w-full py-28 bg-background relative overflow-hidden border-t border-black/5">
            {/* Decorative gold blur circles */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-navy/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-gold text-sm font-black uppercase tracking-[0.3em] mb-4">Connect</h2>
                    <h3 className="text-5xl font-bold text-navy">Get In Touch</h3>
                    <div className="w-16 h-1 bg-gold mx-auto mt-6 rounded-full" />
                </motion.div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left — Info & Socials */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-gray-600 text-lg leading-relaxed mb-12">
                            Seeking innovation, research collaboration, or startup guidance? Reach out to discuss how we can shape the future of engineering together.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-5 mb-14">
                            <a href="mailto:upsoni@gpahmedabad.ac.in" className="flex items-center gap-5 group">
                                <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300 shadow-sm">
                                    <Mail size={22} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gold font-black uppercase tracking-[0.2em]">Email</p>
                                    <p className="text-navy font-semibold group-hover:text-gold transition-colors">upsoni@gpahmedabad.ac.in</p>
                                </div>
                            </a>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shadow-sm">
                                    <MapPin size={22} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gold font-black uppercase tracking-[0.2em]">Location</p>
                                    <p className="text-navy font-semibold">Ahmedabad, Gujarat, India</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div>
                            <p className="text-[10px] text-navy/40 font-black uppercase tracking-[0.25em] mb-6">Follow My Journey</p>
                            <div className="grid grid-cols-5 gap-4">
                                {socials.map((s) => (
                                    <a
                                        key={s.name}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={s.name}
                                        className="group flex flex-col items-center gap-2"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.15, y: -4 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`w-14 h-14 ${s.bg} rounded-2xl flex items-center justify-center text-white shadow-lg`}
                                            style={{ boxShadow: `0 8px 24px ${s.color}33` }}
                                        >
                                            <s.icon size={22} />
                                        </motion.div>
                                        <span className="text-[9px] font-bold text-navy/40 group-hover:text-gold transition-colors uppercase tracking-wider text-center">{s.name.split('/')[0].trim()}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="glass rounded-3xl border border-gold/10 shadow-2xl p-10 relative overflow-hidden">
                            {/* Gold accent line top */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

                            {/* Success Overlay */}
                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 bg-white/95 backdrop-blur-md z-30 flex flex-col items-center justify-center text-center p-8 rounded-3xl"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                        className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(162,123,49,0.3)]"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-10 h-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    </motion.div>
                                    <h4 className="text-2xl font-bold text-navy mb-2">Message Sent!</h4>
                                    <p className="text-gray-600 mb-6">Thank you for reaching out. Prof. Soni will get back to you soon.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="px-6 py-2.5 border-2 border-gold text-gold font-bold rounded-full hover:bg-gold hover:text-white transition-all text-sm"
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-navy/50 uppercase tracking-[0.15em]">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Your full name"
                                        className="w-full bg-white/60 border border-black/8 rounded-xl px-5 py-4 text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/60 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-navy/50 uppercase tracking-[0.15em]">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="your@email.com"
                                        className="w-full bg-white/60 border border-black/8 rounded-xl px-5 py-4 text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/60 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-navy/50 uppercase tracking-[0.15em]">Your Message</label>
                                    <textarea
                                        rows={5}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="How can I help you?"
                                        className="w-full bg-white/60 border border-black/8 rounded-xl px-5 py-4 text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/60 transition-all resize-none"
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                                    whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                                    className={`w-full font-bold py-5 rounded-xl transition-all flex items-center justify-center gap-3 text-lg ${status === 'loading'
                                            ? 'bg-gold/40 text-white cursor-not-allowed'
                                            : 'bg-gold text-white hover:shadow-[0_10px_40px_rgba(162,123,49,0.4)]'
                                        }`}
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                                {status === 'error' && (
                                    <p className="text-red-500 text-center text-sm font-semibold">Something went wrong. Please try again.</p>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
