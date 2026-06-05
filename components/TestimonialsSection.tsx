"use client";

import { motion } from "framer-motion";

export function TestimonialsSection() {
    const testimonials = [
        {
            quote: "Phemiz provided a level of SSD architecture that radically optimized our backend systems. His AI integration is next-level.",
            author: "Director of Technology",
            role: "Financial Services Agency"
        },
        {
            quote: "The 'Mobile-First' approach to our documentary systems saved us months of manual legal drafting. A strategic architect.",
            author: "Founder & CEO",
            role: "NaijaDocs Ecosystem"
        }
    ];

    const partners = [
        "Axiom AI", "Aegis Systems", "Lagos Connect", "Abuja Properties", "SkyProperties"
    ];

    return (
        <section className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
            <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="md:col-span-1 max-w-sm">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-4 block">Social Proof</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tighter leading-[0.9]">
                        Strategic <br/> <span className="text-white/40">Collaborations.</span>
                    </h2>
                </div>

                <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                    {testimonials.map((t, i) => (
                        <div key={i} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 relative group">
                            <div className="absolute top-0 left-0 p-8 text-4xl opacity-5 italic font-serif">“</div>
                            <p className="text-lg font-medium text-white/80 mb-8 leading-relaxed italic">&quot;{t.quote}&quot;</p>
                            <div>
                                <p className="text-sm font-black uppercase tracking-widest text-white/40 mb-1">{t.author}</p>
                                <p className="text-[10px] font-bold text-white/20">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* PARTNER LOGO MARQUEE (SUBTLE) */}
            <div className="mt-24 pt-12 border-t border-white/5 opacity-30 group">
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 font-black uppercase tracking-[0.2em] text-xs">
                    {partners.map(p => (
                        <span key={p} className="hover:text-white transition-colors cursor-default">{p}</span>
                    ))}
                </div>
            </div>
        </section>
    );
}
