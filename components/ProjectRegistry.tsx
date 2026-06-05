"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { useState } from "react";
import { Project } from "@/lib/data";

interface ProjectRegistryProps {
    initialProjects: Project[];
}

export function ProjectRegistry({ initialProjects }: ProjectRegistryProps) {
    const [filter, setFilter] = useState("all");

    const categories = [
        { id: "all", label: "Registry" },
        { id: "ai", label: "LLM & AI" },
        { id: "system", label: "SSD & Core" },
        { id: "web", label: "Tactical Web" },
        { id: "cyber", label: "Cybersecurity" },
        { id: "education", label: "EduFlow" }
    ];

    const filteredProjects = initialProjects.filter(p => {
        if (filter === "all") return true;
        const search = (p.title + " " + p.shortDesc + " " + (p.techStack || []).join(" ")).toLowerCase();
        if (filter === "ai") return search.includes("ai") || search.includes("llm") || search.includes("gpt");
        if (filter === "system") return search.includes("system") || search.includes("architecture") || search.includes("ssd");
        if (filter === "web") return search.includes("marketing") || search.includes("real estate") || search.includes("lifestyle");
        if (filter === "cyber") return search.includes("cybersecurity") || search.includes("security") || search.includes("malware") || search.includes("soc");
        if (filter === "education") return search.includes("school") || search.includes("eduflow") || search.includes("college");
        return true;
    });

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
            
            {/* PAGE HERO */}
            <section className="mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-4 block">Product Inventory</span>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-12 tracking-tighter leading-[0.8]">
                        Tactical <br/> <span className="text-white/40">Registry.</span>
                    </h1>
                    <p className="text-xl text-white/50 max-w-2xl font-medium">
                        A curated selection of SSD applications, AI modules, and specialized professional ecosystems across multiple industry nodes.
                    </p>
                </motion.div>

                {/* CATEGORY SELECTOR */}
                <motion.div 
                    className="mt-16 flex flex-wrap gap-4 border-b border-white/5 pb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                                filter === cat.id 
                                ? "bg-white text-black" 
                                : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </motion.div>
            </section>

            {/* PROJECTS GRID */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))
                ) : (
                    <div className="col-span-full py-24 text-center border border-dashed border-white/10 rounded-[3rem]">
                        <p className="text-white/20 font-black uppercase tracking-widest text-xs">No assets found in this sector.</p>
                    </div>
                )}
            </section>

            {/* CALL TO ACTION */}
            <section className="p-12 md:p-20 rounded-[4rem] bg-indigo-500/5 border border-indigo-500/10 text-center">
                <h3 className="text-3xl font-black mb-8 tracking-tight">Requirement: Custom Architecture?</h3>
                <p className="text-white/40 mb-12 max-w-lg mx-auto font-medium">
                    Looking for a specific capability not listed here? I build custom AI systems and SSD platforms for global founders.
                </p>
                <a href="mailto:hello@example.com" className="inline-flex py-4 px-12 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-all">
                    Initiate Connection
                </a>
            </section>

        </div>
    );
}
