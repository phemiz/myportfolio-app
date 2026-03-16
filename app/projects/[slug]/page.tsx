import { notFound } from "next/navigation";
import Image from "next/image";
import { getProjects } from "@/lib/db-utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface ProjectPageProps {
    params: {
        slug: string;
    }
}

import { Metadata } from "next";

// Generate dynamic metadata for the project
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const projects = await getProjects();
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        return { title: "Project Not Found" };
    }

    return {
        title: `${project.title} | Phemis Portfolio`,
        description: project.shortDesc || project.fullDesc?.substring(0, 160),
        openGraph: {
            title: project.title,
            description: project.shortDesc,
            images: project.images && project.images.length > 0 ? [project.images[0]] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description: project.shortDesc,
            images: project.images && project.images.length > 0 ? [project.images[0]] : [],
        },
    };
}

// Generate static params for all projects
export async function generateStaticParams() {
    const projects = await getProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
    const projects = await getProjects();
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background text-white pt-24">
            <Header />

            <article className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                {/* Header */}
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 uppercase tracking-wider">
                            {project.status.replace("-", " ")}
                        </span>
                        {project.llmMetadata && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 uppercase tracking-wider border border-indigo-500/30">
                                AI: {project.llmMetadata.model}
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">{project.title}</h1>
                    <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
                        {project.fullDesc}
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
                    {/* Left Column: Details & Specs */}
                    <div className="md:col-span-1 space-y-12">
                        {/* Tech Stack */}
                        <div>
                            <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span key={tech} className="text-sm text-white/70 bg-white/5 px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* LLM Details if present */}
                        {project.llmMetadata && (
                            <div>
                                <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">AI Architecture</h3>
                                <dl className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="text-white/50">Model</dt>
                                        <dd className="font-medium">{project.llmMetadata.model}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-white/50">Framework</dt>
                                        <dd className="font-medium">{project.llmMetadata.framework}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-white/50">Prompt Strategy</dt>
                                        <dd className="font-medium">{project.llmMetadata.promptType || "Standard"}</dd>
                                    </div>
                                </dl>
                            </div>
                        )}

                        {/* Links */}
                        <div className="flex flex-col gap-3">
                            {project.demoUrl && (
                                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black font-bold rounded hover:bg-white/90 transition-colors">
                                    Launch Demo
                                </a>
                            )}
                            <div className="flex gap-3">
                                {project.githubUrl && (
                                    <>
                                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/20 font-medium rounded hover:bg-white/5 transition-colors">
                                            View Source
                                        </a>
                                        <a href={`${project.githubUrl}#readme`} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/20 font-medium rounded hover:bg-white/5 transition-colors">
                                            View Docs
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Features & Story */}
                    <div className="md:col-span-2 space-y-16">
                        {/* Hero Image */}
                        {project.images && project.images.length > 0 && (
                            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 relative">
                                <Image
                                    src={project.images[0]}
                                    alt="Project Preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        {/* Features List */}
                        {project.features && (
                            <div>
                                <h2 className="text-2xl font-bold mb-8">Key Features</h2>
                                <div className="grid grid-cols-1 gap-6">
                                    {project.features.map((feature, i) => (
                                        <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/5">
                                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                            <p className="text-white/60">{feature.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Specs List if existing (Legacy Support) */}
                        {project.specs && (
                            <div>
                                <h2 className="text-2xl font-bold mb-8">Specifications</h2>
                                <div className="divide-y divide-white/10">
                                    {project.specs.map((spec, i) => (
                                        <div key={i} className="flex justify-between py-4">
                                            <span className="text-white/60">{spec.label}</span>
                                            <span className="font-medium">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
