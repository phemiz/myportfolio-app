"use client";

import { motion } from "framer-motion";

const serviceMap: Record<string, any[]> = {
    cyber: [
        {
            title: "Vulnerability Assessment",
            description: "Identifying and mitigating security loopholes in enterprise networks and web applications before they can be exploited.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            title: "Network Security",
            description: "Implementing robust firewall configurations, intrusion detection systems, and encrypted communication protocols.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
        },
        {
            title: "Ethical Hacking",
            description: "Simulating cyber attacks to test the resilience of systems and providing actionable feedback for defense hardening.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
        },
    ],
    dev: [
        {
            title: "Full-Stack Development",
            description: "Building scalable web applications from scratch using modern frameworks like Next.js, React, and Node.js.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
        },
        {
            title: "Mobile App Engineering",
            description: "Creating fluid, cross-platform mobile experiences that feel native and perform seamlessly on iOS and Android.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            title: "API & Backend Design",
            description: "Architecting high-performance REST and GraphQL APIs that serve as a reliable backbone for complex digital platforms.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
            ),
        },
    ],
    marketing: [
        {
            title: "SEO & Growth Strategy",
            description: "Optimizing digital presence to rank higher on search engines and reach organic growth milestones sustainably.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
        },
        {
            title: "Content & Copywriting",
            description: "Crafting compelling narratives and calls-to-action that resonate with audiences and drive conversions.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
        },
        {
            title: "Data & Ad Analytics",
            description: "Analyzing user behavior and campaign performance to refine strategies and maximize marketing ROI.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
        },
    ],
    default: [
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
    ]
};

export function ServicesSection({ role = "default" }: { role?: string }) {
    const services = serviceMap[role] || serviceMap.default;

    return (
        <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
            <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold mb-4 tracking-tight">Capabilities <span className="text-white/40">& Expertise</span></h2>
                <p className="text-white/60 max-w-2xl mx-auto">
                    {role === "cyber" ? "Defending critical infrastructure and ensuring data integrity in an evolving threat landscape." :
                     role === "dev" ? "Bridging the gap between creative concepts and high-performance engineering." :
                     role === "marketing" ? "Connecting products with people through data-backed strategies and creative storytelling." :
                     "Focused on bridging the gap between hardware execution limits and advanced generative AI possibilities."}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, idx) => (
                    <motion.div
                        key={`${role}-${idx}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
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
