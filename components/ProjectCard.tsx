"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Project } from "@/lib/data";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-white/5 hover:border-white/20"
        >
            <div className={`aspect-video w-full bg-black/50 relative overflow-hidden transition-all duration-300 ${isCollapsed ? 'h-24' : ''}`}>
                {/* Image Placeholder or Actual Image */}
                {project.images && project.images.length > 0 ? (
                    <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className={`object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 ${isCollapsed ? 'object-center' : ''}`}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-black">
                        <span className="text-white/20 text-4xl font-bold">{project.title[0]}</span>
                    </div>
                )}

                {/* Status Badge */}
                {!isCollapsed && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-black/60 border border-white/10 backdrop-blur-md uppercase tracking-wider">
                        {project.status.replace("-", " ")}
                    </div>
                )}

                {/* Toggle Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white/80"
                    aria-label={isCollapsed ? "Expand card" : "Collapse card"}
                >
                    <svg
                        className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? '-rotate-90' : 'rotate-0'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-full">
                        <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                        {!isCollapsed && (
                            <p className="text-sm text-white/60 line-clamp-2 min-h-[40px]">{project.shortDesc}</p>
                        )}
                    </div>
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {(isCollapsed ? project.techStack.slice(0, 3) : project.techStack.slice(0, 4)).map((tech) => (
                        <span key={tech} className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded">
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > (isCollapsed ? 3 : 4) && (
                        <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded">
                            +{project.techStack.length - (isCollapsed ? 3 : 4)}
                        </span>
                    )}
                </div>

                {!isCollapsed && (
                    <div className="flex gap-4">
                        <Link
                            href={`/projects/${project.slug}`}
                            className="flex-1 text-center px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-white/90 transition-colors"
                        >
                            View Case Study
                        </Link>
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                                aria-label="View Source Code"
                            >
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
