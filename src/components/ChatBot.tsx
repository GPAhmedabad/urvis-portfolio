"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Cpu, ChevronDown } from 'lucide-react';

const QA_DATA = [
    {
        keywords: ["who", "about", "profile", "urvish", "soni", "background"],
        answer: "I am Prof. Urvish Soni, a National Award-winning educator and innovator. I currently serve as a Lecturer at Government Polytechnic Ahmedabad and CEO of the Project & Innovation Lab."
    },
    {
        keywords: ["award", "president", "national", "achievement", "recognition"],
        answer: "I received the prestigious National Teacher Award in 2025, honored directly by the President of India for transformative contributions to technical education."
    },
    {
        keywords: ["experience", "reliance", "industry", "manager", "jamnagar"],
        answer: "I have over 15 years of experience. A significant part of my industrial journey was with Reliance Industries Jamnagar, where I served as an Instrumentation Manager before transitioning to academics."
    },
    {
        keywords: ["startup", "mentor", "innovation", "lab", "ceo"],
        answer: "I am deeply involved in the startup ecosystem. As the CEO of the Project & Innovation Lab, I have mentored over 50+ startups and showcased innovations to PM Narendra Modi."
    },
    {
        keywords: ["skills", "expertise", "instrumentation", "ai", "automation", "tech"],
        answer: "My core expertise lies in Instrumentation & Control Engineering, Artificial Intelligence (AI), and Industrial Automation. I focus on bridging the gap between industrial excellence and academic innovation."
    },
    {
        keywords: ["contact", "email", "reach", "hire", "collaborate", "phone"],
        answer: "You can reach out to me via email at upsoni@gpahmedabad.ac.in or connect with me on LinkedIn. You can also use the contact form at the bottom of this portfolio!"
    },
    {
        keywords: ["education", "qualification", "degree", "study"],
        answer: "I hold strong academic foundations in Instrumentation and Control Engineering, combining years of deep industrial experience with passionate teaching methodologies."
    },
    {
        keywords: ["hello", "hi", "hey", "greetings"],
        answer: "Hello! I am Prof. Soni's virtual assistant. You can ask me about his experience, awards, skills, or how to contact him!"
    }
];

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string, isBot: boolean }[]>([
        { text: "Hi! I am the I&C Virtual Assistant for Prof. Urvish Soni. How can I help you today?", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
        setInput('');

        // Simple Keyword Matching AI
        setTimeout(() => {
            const lowerInput = userMsg.toLowerCase();
            let foundAnswer = "I'm not quite sure about that. You can ask me about his 'experience', 'awards', 'startups', or 'skills'!";

            // Scrutinize QA Data
            let maxMatches = 0;
            for (const qa of QA_DATA) {
                let matches = 0;
                for (const kw of qa.keywords) {
                    if (lowerInput.includes(kw)) matches++;
                }
                if (matches > maxMatches) {
                    maxMatches = matches;
                    foundAnswer = qa.answer;
                }
            }

            setMessages(prev => [...prev, { text: foundAnswer, isBot: true }]);
        }, 600); // simulate thinking
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-80 sm:w-96 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gold/20 overflow-hidden flex flex-col"
                        style={{ height: '480px' }}
                    >
                        {/* Header */}
                        <div className="bg-navy p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gold/20 rounded-lg">
                                    <Cpu size={20} className="text-gold" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">I&C Virtual Assistant</h3>
                                    <p className="text-[10px] text-gray-300">Prof. Soni's AI Bot</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <ChevronDown size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={`max-w-[85%] ${msg.isBot ? 'self-start' : 'self-end'}`}>
                                    <div className={`p-3 rounded-2xl text-sm ${msg.isBot ? 'bg-gray-100 text-gray-800 rounded-tl-sm' : 'bg-gold text-white rounded-tr-sm shadow-md'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-3 border-t border-gray-100 bg-gray-50 flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about awards, experience..."
                                className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 text-navy"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className={`p-2 rounded-full flex items-center justify-center transition-colors ${input.trim() ? 'bg-gold text-white shadow-md' : 'bg-gray-200 text-gray-400'}`}
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-navy rounded-full flex items-center justify-center shadow-2xl border-2 border-gold text-gold hover:bg-gold hover:text-white transition-all relative group z-50"
            >
                {isOpen ? <X size={24} /> : <Cpu size={28} />}

                {/* Ping animation indicator when closed */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-gold border border-white"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
}
