'use client';

import { useState } from 'react';
import { addProjectAction, fetchGitHubRepoAction, fetchGitHubReadmeAction } from '@/lib/actions';
import Link from 'next/link';

export default function AddProjectPage() {
    const [loading, setLoading] = useState(false);
    const [githubUrl, setGithubUrl] = useState('');
    const [localPreview, setLocalPreview] = useState<string | null>(null);
    const [features, setFeatures] = useState<{ title: string; desc: string }[]>([]);
    
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        shortDesc: '',
        fullDesc: '',
        status: 'in-progress',
        techStack: '',
        githubUrl: '',
        demoUrl: ''
    });

    const handleFetchGitHub = async () => {
        if (!githubUrl) return alert('Please enter a GitHub URL');
        setLoading(true);
        const result = await fetchGitHubRepoAction(githubUrl);
        setLoading(false);

        if (result.success && result.data) {
            setFormData({
                ...formData,
                title: result.data.title,
                slug: result.data.slug,
                shortDesc: result.data.shortDesc,
                fullDesc: result.data.fullDesc,
                techStack: result.data.techStack.join(', '),
                githubUrl: result.data.githubUrl
            });
        } else if (result.error) alert(result.error);
    };

    const handleFetchReadme = async () => {
        if (!githubUrl) return alert('Please enter a GitHub URL');
        setLoading(true);
        const res = await fetchGitHubReadmeAction(githubUrl);
        setLoading(false);
        if (res.success && res.content) {
            setFormData(prev => ({ ...prev, fullDesc: res.content }));
        } else if (res.error) alert(res.error);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setLocalPreview(URL.createObjectURL(file));
        else setLocalPreview(null);
    };

    const addFeature = () => setFeatures([...features, { title: '', desc: '' }]);
    const removeFeature = (idx: number) => setFeatures(features.filter((_, i) => i !== idx));
    const updateFeature = (idx: number, field: 'title'|'desc', val: string) => {
        const newF = [...features];
        newF[idx][field] = val;
        setFeatures(newF);
    };

    const insertTemplate = (t: string) => {
        const templates: Record<string, string> = {
            mission: "\n## 🎯 The Mission\nTo solve [Problem X] by providing [Solution Y] for [Audience Z].",
            challenge: "\n## 🛠️ The Challenge\nThe Problem: [Description of technical or business hurdle].",
            solution: "\n## 🚀 The Solution\nI engineered a [System Type] that features: \n- [Key Benefit 1]\n- [Key Benefit 2]",
            metrics: "\n## ⚡ High-Impact Metrics\n- Speed: [X] to [Y] improvement\n- Scale: [X] concurrent users",
            cta: "\n---\n\n## 👋 Hire a Tactical Developer\nLooking for a [Expertise]? [Let's build your next project.](LINK)"
        };
        setFormData(prev => ({ ...prev, fullDesc: prev.fullDesc + (templates[t] || '') }));
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex items-center gap-4 mb-12">
                <Link href="/admin" className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5m7 7l-7-7 7-7"></path></svg>
                </Link>
                <h1 className="text-4xl font-black tracking-tighter uppercase">New Tactical Asset</h1>
            </div>

            <form action={(fd) => {
                fd.append('featuresJson', JSON.stringify(features));
                return addProjectAction(fd);
            }} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                <div className="lg:col-span-2 space-y-8">
                    {/* GITHUB IMPORT */}
                    <div className="p-8 bg-blue-500/5 border border-indigo-500/20 rounded-3xl space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Import Engineering Intel</h3>
                            <span className="text-[10px] text-indigo-400/40">GitHub Integration</span>
                        </div>
                        <div className="flex gap-4">
                            <input
                                type="url"
                                placeholder="https://github.com/phemiz/repo"
                                value={githubUrl}
                                onChange={(e) => setGithubUrl(e.target.value)}
                                className="flex-1 px-4 py-3 bg-black/20 border border-indigo-500/10 rounded-xl text-sm focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={handleFetchGitHub}
                                disabled={loading}
                                className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-400 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Fetching...' : 'Fetch Repo'}
                            </button>
                        </div>
                    </div>

                    {/* CORE INFO */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 border-b border-white/5 pb-4">General Data</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Project Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Slug (URL)</label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none font-mono text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none appearance-none"
                                >
                                    <option value="in-progress">In Progress</option>
                                    <option value="near-complete">Near Complete</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Short Description</label>
                                <input
                                    type="text"
                                    name="shortDesc"
                                    value={formData.shortDesc}
                                    onChange={(e) => setFormData({...formData, shortDesc: e.target.value})}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* DOCUMENTATION */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Case Study Documentation</h3>
                            <div className="flex gap-2">
                                <button type="button" onClick={handleFetchReadme} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[9px] font-bold uppercase hover:bg-indigo-500/20">Fetch Readme</button>
                                {['mission', 'challenge', 'solution', 'metrics', 'cta'].map(t => (
                                    <button key={t} type="button" onClick={() => insertTemplate(t)} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase hover:bg-white/10">+ {t}</button>
                                ))}
                            </div>
                        </div>
                        <textarea
                            name="fullDesc"
                            rows={15}
                            value={formData.fullDesc}
                            onChange={(e) => setFormData({...formData, fullDesc: e.target.value})}
                            required
                            className="w-full px-6 py-4 bg-black/40 border border-white/5 rounded-2xl text-white/80 focus:outline-none font-mono text-xs leading-relaxed"
                            placeholder="# Detailed Report..."
                        ></textarea>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* LINKS */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 border-b border-white/5 pb-4">Deployment Assets</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">GitHub URL</label>
                                <input
                                    type="url"
                                    name="githubUrl"
                                    value={formData.githubUrl}
                                    onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none font-mono text-[10px]"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Demo URL</label>
                                <input
                                    type="url"
                                    name="demoUrl"
                                    value={formData.demoUrl}
                                    onChange={(e) => setFormData({...formData, demoUrl: e.target.value})}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none font-mono text-[10px]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* TECH STACK */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 border-b border-white/5 pb-4">Tech Stack</h3>
                        <input
                            type="text"
                            name="techStack"
                            value={formData.techStack}
                            onChange={(e) => setFormData({...formData, techStack: e.target.value})}
                            placeholder="React, Next.js, AI"
                            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-[10px] font-mono"
                        />
                    </div>

                    {/* FEATURE IMAGE */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 border-b border-white/5 pb-4">Visual Identity</h3>
                        <div className="aspect-video relative rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                            {localPreview ? <img src={localPreview} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-white/10">NO PREVIEW</div>}
                        </div>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full text-[10px] text-white/30 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[9px] file:font-black file:bg-white file:text-black"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-[2rem] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5"
                    >
                        Deploy New Project
                    </button>
                    <Link href="/admin" className="block text-center text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-all">Cancel Mission</Link>
                </div>
            </form>
        </div>
    );
}
