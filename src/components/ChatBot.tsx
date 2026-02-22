"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronDown, MessageSquare, Briefcase } from 'lucide-react';
import Image from 'next/image';

interface ChatMessage {
    text: string;
    isBot: boolean;
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { text: "Hi, I'm Prof. Urvish Soni. Thank you for visiting my portfolio. How can I help you today?", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isLoading]);

    // Auto-focus input when chatbot opens or finishes loading
    useEffect(() => {
        if (isOpen && !isLoading && inputRef.current) {
            // Small timeout to ensure the animation/render completes first
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen, isLoading]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        const currentMessages = [...messages, { text: userMsg, isBot: false }];

        setMessages(currentMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: currentMessages })
            });

            const data = await response.json();

            if (response.ok && data.reply) {
                setMessages(prev => [...prev, { text: data.reply, isBot: true }]);
            } else {
                setMessages(prev => [...prev, { text: data.error || "I'm having trouble connecting to my network right now, please try the contact form!", isBot: true }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { text: "Sorry, I'm currently unavailable. Feel free to use the Contact section below.", isBot: true }]);
        } finally {
            setIsLoading(false);
        }
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
                        className="mb-4 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/10 overflow-hidden flex flex-col"
                        style={{ height: '500px' }}
                    >
                        {/* Header */}
                        <div className="bg-[#09090B] p-4 flex items-center justify-between text-white border-b border-gold/20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 relative rounded-full overflow-hidden border-2 border-gold/50">
                                    <Image src="/assets/profile.jpg" alt="Prof. Soni" fill className="object-cover object-top" unoptimized />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-sm tracking-wide text-white flex items-center gap-2">
                                        Prof. Urvish Soni
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    </h3>
                                    <p className="text-[10px] text-gold font-medium uppercase tracking-wider flex items-center gap-1">
                                        <Briefcase size={10} /> Educator & Innovator
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1">
                                <ChevronDown size={22} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-[#FCFBF9]">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex max-w-[85%] ${msg.isBot ? 'self-start' : 'self-end'}`}>
                                    <div className={`p-3.5 text-[13.5px] leading-relaxed shadow-sm ${msg.isBot
                                        ? 'bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-100'
                                        : 'bg-gold text-white rounded-2xl rounded-tr-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex max-w-[85%] self-start">
                                    <div className="p-4 bg-white rounded-2xl rounded-tl-sm border border-gray-100 flex items-center gap-1.5 shadow-sm">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Message Prof. Soni..."
                                disabled={isLoading}
                                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 text-navy transition-all disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className={`p-2.5 rounded-full flex items-center justify-center transition-all ${input.trim() && !isLoading
                                    ? 'bg-gold text-white shadow-md hover:scale-105'
                                    : 'bg-gray-100 text-gray-400'
                                    }`}
                            >
                                <Send size={18} className={input.trim() && !isLoading ? 'ml-0.5' : ''} />
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
                className="w-[60px] h-[60px] bg-navy rounded-full flex flex-col items-center justify-center shadow-2xl border-2 border-gold text-white hover:shadow-[0_10px_40px_rgba(162,123,49,0.3)] transition-all relative group z-50 overflow-hidden"
            >
                {isOpen ? (
                    <X size={26} className="text-gold" />
                ) : (
                    <MessageSquare size={26} className="text-gold" />
                )}

                {/* Online indicator ping */}
                {!isOpen && (
                    <span className="absolute top-2 right-2 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-navy"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
}
