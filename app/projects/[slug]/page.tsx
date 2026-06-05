import { notFound } from "next/navigation";
import Image from "next/image";
import { getProjects } from "@/lib/db-utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Metadata } from "next";

interface ProjectPageProps {
    params: {
        slug: string;
    }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const projects = await getProjects();
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) return { title: "Project Not Found" };

    return {
        title: `${project.title} | Case Study`,
        description: project.shortDesc,
        openGraph: {
            images: project.images && project.images.length > 0 ? [project.images[0]] : [],
        },
    };
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
    const projects = await getProjects();
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) notFound();

    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20">
            <Header />

            <article className="max-w-7xl mx-auto px-6 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {/* HERO HEADER */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-white/20 ${
                                project.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                                project.status === 'in-progress' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-blue-500/10 text-blue-400'
                            }`}>
                                {project.status.replace("-", " ")}
                            </span>
                            {project.llmMetadata && (
                                <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                    AI Enabled
                                </span>
                            )}
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                            {project.title}
                        </h1>
                        <p className="text-xl text-white/40 max-w-xl font-medium leading-relaxed">
                            {project.shortDesc}
                        </p>
                    </div>

                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                        {project.images && project.images.length > 0 ? (
                            <Image
                                src={project.images[0]}
                                alt={project.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-8xl font-black text-white/5">
                                {project.title[0]}
                            </div>
                        )}
                    </div>
                </div>

                {/* MAIN CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    
                    {/* LEFT COLUMN: THE STORY (8 COLS) */}
                    <div className="lg:col-span-8 space-y-16">
                        <section className="prose prose-invert prose-lg max-w-none 
                            prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-headings:text-sm prose-headings:text-white/40
                            prose-p:text-white/80 prose-p:leading-relaxed prose-p:font-medium
                            prose-hr:border-white/10 prose-strong:text-white prose-strong:font-bold
                            prose-li:text-white/70">
                            
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {project.fullDesc}
                            </ReactMarkdown> section.    
                        </section>

                        {/* KEY FEATURES HIGHLIGHT */}
                        {project.features && project.features.length > 0 && (
                            <section>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8 border-b border-white/5 pb-4">
                                    CORE CAPABILITIES
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {project.features.map((feature, i) => (
                                        <div key={i} className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-500">
                                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                                                ⚡
                                            </div>
                                            <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                                            <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* RIGHT COLUMN: TECH SPECS & LINKS (4 COLS) */}
                    <aside className="lg:col-span-4 space-y-12 h-fit lg:sticky lg:top-32">
                        
                        {/* CALL TO ACTION */}
                        <div className="p-1.5 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                            <div className="p-8 rounded-[1.8rem] bg-gradient-to-br from-white/10 to-transparent space-y-4">
                                {project.demoUrl && (
                                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full py-4 bg-white text-black font-black text-sm uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5">
                                        Launch Project
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full py-4 bg-white/10 border border-white/10 font-bold text-sm tracking-tight rounded-2xl hover:bg-white/20 transition-all">
                                        Explrore Repository
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* TECH STACK WIDGET */}
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-6 px-4">THE CHOSEN STACK</h3>
                            <div className="flex flex-wrap gap-2 px-4 font-mono text-xs">
                                {project.techStack.map((tech) => (
                                    <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-full text-white/60">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* LLM / AI ARCHITECTURE */}
                        {project.llmMetadata && (
                            <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-6">AI ARCHITECTURE</h3>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between border-b border-indigo-500/10 pb-2">
                                        <span className="text-indigo-400/40">Base Model</span>
                                        <span className="font-bold">{project.llmMetadata.model}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-indigo-500/10 pb-2">
                                        <span className="text-indigo-400/40">Framework</span>
                                        <span className="font-bold">{project.llmMetadata.framework}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-indigo-400/40">Environment</span>
                                        <span className="font-bold">{project.llmMetadata.deployment}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </article>

            <Footer />
        </main>
    );
}
