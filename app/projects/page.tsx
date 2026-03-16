import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/lib/db-utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <main className="min-h-screen bg-background text-white pt-24">
            <Header />

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                        Architecting Intelligence.
                    </h1>
                    <p className="text-lg text-white/60">
                        A curated collection of SSD applications, AI modules, and high-performance interfaces.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
