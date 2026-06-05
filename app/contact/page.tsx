"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { personalInfo } from "@/lib/data";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20">
            <Header />

            <div className="max-w-6xl mx-auto px-6 lg:px-12">
                
                {/* CONTACT HERO */}
                <section className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-4 block">Secure Communication</span>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-12 tracking-tighter leading-[0.8]">
                            Initiate <br/> <span className="text-white/40">Contact.</span>
                        </h1>
                        <p className="text-xl text-white/50 max-w-2xl font-medium">
                            Ready to architect your next high-performance system? Briefly describe your mission below, and I will respond within 24 hours.
                        </p>
                    </motion.div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* INFO SIDEBAR */}
                    <motion.div 
                        className="lg:col-span-5 space-y-12"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-6">Direct Channels</h3>
                            <div className="space-y-6">
                                <a href="mailto:contact@phemis.dev" className="group flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📧</div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-1">Encrypted Email</p>
                                        <p className="text-lg font-bold">contact@phemis.dev</p>
                                    </div>
                                </a>
                                <a href={personalInfo.socials.linkedin} target="_blank" className="group flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">💼</div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400/40 mb-1">Professional Network</p>
                                        <p className="text-lg font-bold">LinkedIn Profile</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 text-4xl opacity-10">💬</div>
                            <h4 className="text-xl font-bold mb-4">Availability Status</h4>
                            <p className="text-sm text-white/40 leading-relaxed font-medium"> Currently accepting high-impact contracts for **Q3 2026**. Priority given to AI Infrastructure and SSD System Architecture roles.</p>
                            <div className="mt-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60">Open for Briefing</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* FORM SECTION */}
                    <motion.div 
                        className="lg:col-span-7 bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-indigo-500/5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <h3 className="text-2xl font-black mb-8 tracking-tight">Mission Briefing</h3>
                        <ContactForm />
                    </motion.div>

                </div>

            </div>

            <Footer />
        </main>
    );
}
