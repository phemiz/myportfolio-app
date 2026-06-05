"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { personalInfo } from "@/lib/data";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20">
            <Header />

            <div className="max-w-6xl mx-auto px-6 lg:px-12">
                
                {/* TACTICAL HERO */}
                <section className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-4 block">Personal Architecture</span>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-12 tracking-tighter leading-[0.8]">
                            The <br/> <span className="text-white/40">Architect.</span>
                        </h1>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
                        <motion.div 
                            className="md:col-span-8"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <p className="text-2xl md:text-3xl text-white/80 leading-relaxed font-medium">
                                {personalInfo.bio}
                            </p>
                        </motion.div>

                        <motion.div 
                            className="md:col-span-4 flex flex-col gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <a href={personalInfo.socials.linkedin} target="_blank" className="w-full flex items-center justify-center py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5">
                                LinkedIn Network
                            </a>
                            <a href={`mailto:hello@example.com`} className="w-full flex items-center justify-center py-4 bg-white/5 border border-white/10 font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">
                                Command: Message
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* CAPABILITY GRID */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    
                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="p-10 rounded-[3rem] bg-indigo-500/5 border border-indigo-500/10 group transition-all"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform">
                            🛡️
                        </div>
                        <h3 className="text-2xl font-black mb-6 tracking-tight">Tactical SSD Engineering</h3>
                        <p className="text-white/50 leading-relaxed mb-8 font-medium">
                            I architect secure, distributed, and high-concurrency systems designed to maintain uptime in unpredictable environments.
                        </p>
                        <ul className="space-y-4 text-sm font-bold text-white/40 group-hover:text-white/60 transition-colors">
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                                Multi-Tenant Architecture
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                                Distributed Database Design
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                                Cloud-Native Deployment
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="p-10 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/10 group transition-all"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform">
                            🧠
                        </div>
                        <h3 className="text-2xl font-black mb-6 tracking-tight">AI & LLM Orchestration</h3>
                        <p className="text-white/50 leading-relaxed mb-8 font-medium">
                            Integrating advanced intelligence models into practical, product-ready workflows for high-growth businesses.
                        </p>
                        <ul className="space-y-4 text-sm font-bold text-white/40 group-hover:text-white/60 transition-colors">
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                Agentic Workflow Pipelines
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                RAG Systems & Vector Indices
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                Large-Scale Prompt Optimization
                            </li>
                        </ul>
                    </motion.div>

                </section>

                {/* THE PHILOSOPHY */}
                <section className="relative p-12 md:p-20 rounded-[4rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 overflow-hidden text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-8 block">Foundational Axiom</span>
                        <blockquote className="text-4xl md:text-6xl font-black tracking-tighter mb-12 leading-[1.1]">
                            &quot;True intelligence is <br/> <span className="text-white/30 italic">seamless anticipation.</span>&quot;
                        </blockquote>
                        <Link href="/projects" className="inline-flex py-4 px-12 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-all">
                            View Tactical Registry
                        </Link>
                    </motion.div>
                </section>

            </div>

            <Footer />
        </main>
    );
}
