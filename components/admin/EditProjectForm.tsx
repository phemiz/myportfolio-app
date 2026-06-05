'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/data';
import { updateProjectAction } from '@/lib/actions';

interface EditProjectFormProps {
    project: Project;
}

export default function EditProjectForm({ project }: EditProjectFormProps) {
    const [images, setImages] = useState<string[]>(project.images || []);
    const [features, setFeatures] = useState<{ title: string; desc: string }[]>(project.features || []);
    const [localPreview, setLocalPreview] = useState<string | null>(null);
    const [description, setDescription] = useState(project.fullDesc);

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setLocalPreview(url);
        } else {
            setLocalPreview(null);
        }
    };

    const addFeature = () => {
        setFeatures([...features, { title: '', desc: '' }]);
    };

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    const updateFeature = (index: number, field: 'title' | 'desc', value: string) => {
        const newFeatures = [...features];
        newFeatures[index][field] = value;
        setFeatures(newFeatures);
    };

    const insertTemplate = (templateName: string) => {
        const templates: Record<string, string> = {
            mission: "\n## 🎯 The Mission\nTo solve [Problem X] by providing [Solution Y] for [Audience Z].",
            challenge: "\n## 🛠️ The Challenge\nThe Problem: [Description of technical or business hurdle].",
            solution: "\n## 🚀 The Solution\nI engineered a [System Type] that features: \n- [Key Benefit 1]\n- [Key Benefit 2]",
            metrics: "\n## ⚡ High-Impact Metrics\n- Speed: [X] to [Y] improvement\n- Scale: [X] concurrent users",
            cta: "\n---\n\n## 👋 Hire a Tactical Developer\nLooking for a [Expertise]? [Let's build your next project.](LINK)"
        };

        const text = templates[templateName];
        if (text) {
            setDescription(description + text);
        }
    };

    return (
        <form action={(formData) => {
            formData.append('existingImagesJson', JSON.stringify(images));
            formData.append('featuresJson', JSON.stringify(features));
            formData.set('fullDesc', description);
            return updateProjectAction(project.id, formData);
        }} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* LEFT: CORE INFO (2 COLS) */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 border-b border-white/5 pb-4">General Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Project Title</label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={project.title}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-all font-medium"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Slug (URL)</label>
                            <input
                                type="text"
                                name="slug"
                                defaultValue={project.slug}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 font-mono text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Status</label>
                            <select
                                name="status"
                                defaultValue={project.status}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 appearance-none font-medium"
                            >
                                <option value="completed" className="bg-black">Completed</option>
                                <option value="in-progress" className="bg-black">In Progress</option>
                                <option value="near-complete" className="bg-black">Near Complete</option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Short Description (Marketing Hook)</label>
                            <input
                                type="text"
                                name="shortDesc"
                                defaultValue={project.shortDesc}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* DOCUMENTATION ASSISTANT */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Case Study Documentation (Markdown)</h3>
                        <div className="flex gap-2">
                            {['mission', 'challenge', 'solution', 'metrics', 'cta'].map(t => (
                                <button 
                                    key={t}
                                    type="button"
                                    onClick={() => insertTemplate(t)}
                                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase hover:bg-white/10 transition-all"
                                >
                                    + {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <textarea
                        name="fullDesc"
                        rows={15}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full px-6 py-4 bg-black/40 border border-white/5 rounded-2xl text-white/80 focus:outline-none focus:border-white/20 font-mono text-xs leading-relaxed"
                        placeholder="# Project Documentation..."
                    ></textarea>
                    <p className="text-[10px] text-white/20 italic">Tip: Use the buttons above to quickly insert professional formatting blocks.</p>
                </div>

                {/* KEY FEATURES EDITOR */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Strategic Features</h3>
                        <button 
                            type="button" 
                            onClick={addFeature}
                            className="text-[10px] font-black text-white px-4 py-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                        >
                            ADD FEATURE
                        </button>
                    </div>

                    <div className="space-y-4">
                        {features.map((f, i) => (
                            <div key={i} className="group p-4 bg-white/5 border border-white/5 rounded-xl relative">
                                <button 
                                    type="button" 
                                    onClick={() => removeFeature(i)}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ×
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input 
                                        type="text" 
                                        placeholder="Feature Title (e.g. AI Engine)" 
                                        value={f.title}
                                        onChange={(e) => updateFeature(i, 'title', e.target.value)}
                                        className="md:col-span-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none"
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Description (e.g. Powered by GPT-4 for precision)" 
                                        value={f.desc}
                                        onChange={(e) => updateFeature(i, 'desc', e.target.value)}
                                        className="md:col-span-2 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT: ASSETS & TECH (1 COL) */}
            <div className="space-y-8">
                
                {/* PROJECT LINKS */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 border-b border-white/5 pb-4">Tactical Links</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">GitHub Repo URL</label>
                            <input
                                type="url"
                                name="githubUrl"
                                defaultValue={project.githubUrl}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none font-mono text-[10px]"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Live Demo URL (Launch Link)</label>
                            <input
                                type="url"
                                name="demoUrl"
                                defaultValue={project.demoUrl}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none font-mono text-[10px]"
                            />
                        </div>
                    </div>
                </div>

                {/* TECH STACK */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 border-b border-white/5 pb-4">Technology Stack</h3>
                    <input
                        type="text"
                        name="techStack"
                        defaultValue={project.techStack.join(', ')}
                        className="w-full px-4 py-1.5 bg-black/20 border border-white/10 rounded-lg text-white/60 focus:outline-none text-[10px] font-mono"
                    />
                    <p className="text-[9px] text-white/20 italic">Comma separated (e.g. React, TypeScript, Prisma)</p>
                </div>

                {/* IMAGES GALLERY */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Asset Gallery</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {images.map((img, index) => (
                            <div key={index} className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5 group">
                                <Image src={img} alt="" fill className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg>
                                </button>
                                {index === 0 && (
                                    <div className="absolute bottom-0 inset-x-0 bg-black/80 py-1 text-[8px] font-black text-center uppercase tracking-tighter text-white/60">FEATURE</div>
                                )}
                            </div>
                        ))}
                        {localPreview && (
                            <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-dashed border-blue-500/50 bg-blue-500/10 animate-pulse">
                                <Image src={localPreview} alt="" fill className="object-cover opacity-50" />
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl border-dashed">
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full text-[10px] text-white/30 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[9px] file:font-black file:bg-white file:text-black hover:file:bg-white/80"
                        />
                    </div>
                </div>

                {/* CTA BUTTONS */}
                <div className="grid grid-cols-2 gap-4">
                    <Link
                        href="/admin"
                        className="flex items-center justify-center py-4 bg-white/5 border border-white/10 font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all"
                    >
                        Discard
                    </Link>
                    <button
                        type="submit"
                        className="flex items-center justify-center py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}
