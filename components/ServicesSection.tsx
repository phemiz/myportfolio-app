"use client";

import { motion } from "framer-motion";

const services = [
    {
        title: "SSD Software Architecture",
        description: "Designing resilient, high-performance firmware and storage architectures that operate reliably in extreme, mission-critical environments.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
        ),
    },
    {
        title: "LLM Systems Engineering",
        description: "Building autonomous AI agents and scalable retrieval-augmented generation (RAG) pipelines that push the boundaries of enterprise intelligence.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.792 0-5.484-.36-8.035-1.03-1.72-.45-2.298-2.535-1.067-3.612L5 14.5" />
            </svg>
        ),
    },
    {
        title: "Distributed Platforms & Cloud",
        description: "Deploying globally distributed systems and serverless infrastructures optimizing observability, latency, and fault tolerance at scale.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
        ),
    },
];

export function ServicesSection() {
    return (
        <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
            <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold mb-4 tracking-tight">Capabilities <span className="text-white/40">& Expertise</span></h2>
                <p className="text-white/60 max-w-2xl mx-auto">
                    Focused on bridging the gap between hardware execution limits and advanced generative AI possibilities.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2, duration: 0.6 }}
                        whileHover={{ y: -5 }}
                        className="group p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                        <p className="text-white/60 leading-relaxed text-sm">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
