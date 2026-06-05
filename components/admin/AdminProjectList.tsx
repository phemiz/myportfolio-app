'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/lib/data';
import { deleteProjectAction } from '@/lib/actions';

interface AdminProjectListProps {
    initialProjects: Project[];
}

export function AdminProjectList({ initialProjects }: AdminProjectListProps) {
    const [search, setSearch] = useState('');
    
    const filtered = initialProjects.filter(p => 
        p.title.toLowerCase().includes(search.toLowerCase()) || 
        p.techStack.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );

    const stats = {
        total: initialProjects.length,
        completed: initialProjects.filter(p => p.status === 'completed').length,
        nearComplete: initialProjects.filter(p => p.status === 'near-complete').length,
        inProgress: initialProjects.filter(p => p.status === 'in-progress').length,
    };

    return (
        <div className="space-y-12">
            {/* TACTICAL STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Assets', val: stats.total, color: 'text-white' },
                    { label: 'Deployed', val: stats.completed, color: 'text-emerald-400' },
                    { label: 'Refining', val: stats.nearComplete, color: 'text-blue-400' },
                    { label: 'Drafting', val: stats.inProgress, color: 'text-yellow-400' },
                ].map(s => (
                    <div key={s.label} className="p-6 rounded-3xl bg-white/5 border border-white/10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">{s.label}</p>
                        <p className={`text-3xl font-black ${s.color}`}>{s.val}</p>
                    </div>
                ))}
            </div>

            {/* SEARCH BAR */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-white/20 group-focus-within:text-white/60 transition-colors">
                    🔍
                </div>
                <input 
                    type="text" 
                    placeholder="Search tactical assets by name or technology..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-14 pr-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-white/20 transition-all font-medium"
                />
            </div>

            {/* PROJECT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((project) => (
                    <div 
                        key={project.id} 
                        id={`project-${project.id}`}
                        className="p-6 rounded-3xl border border-white/10 bg-white/5 relative group scroll-mt-20 hover:bg-white/[0.07] transition-all"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                project.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                                project.status === 'near-complete' ? 'bg-blue-500/10 text-blue-400' :
                                'bg-yellow-500/10 text-yellow-400'
                            }`}>
                                {project.status.replace('-', ' ')}
                            </span>
                            <div className="flex gap-2">
                                <Link
                                    href={`/admin/projects/edit/${project.id}`}
                                    className="text-[10px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors"
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>

                        {/* Project Image */}
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-white/5 border border-white/5">
                            {project.images && project.images.length > 0 ? (
                                <Image
                                    src={project.images[0]}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-white/10 text-4xl font-black">{project.title[0]}</span>
                                </div>
                            )}
                        </div>

                        <h3 className="text-xl font-black mb-2 tracking-tight">{project.title}</h3>
                        <p className="text-xs text-white/40 line-clamp-2 mb-6 font-medium leading-relaxed">{project.shortDesc}</p>

                        <div className="flex gap-3 mt-auto pt-6 border-t border-white/5">
                            <Link
                                href={`/projects/${project.slug}`}
                                target="_blank"
                                className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-center text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                            >
                                Preview
                            </Link>
                            <form action={deleteProjectAction.bind(null, project.id)} className="flex-1" onSubmit={(e) => {
                                if(!confirm('Archive this asset permanently?')) e.preventDefault();
                            }}>
                                <button className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-red-400/60 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all">
                                    Archive
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="py-24 text-center border border-dashed border-white/10 rounded-[3rem]">
                    <p className="text-white/20 font-black uppercase tracking-widest text-xs">No matching assets found.</p>
                </div>
            )}
        </div>
    );
}
