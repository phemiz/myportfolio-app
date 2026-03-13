import Link from "next/link";
import { ScrollSpeakerSequence } from "@/components/ScrollSpeakerSequence";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { TechStackRow } from "@/components/TechStackRow";
import { ServicesSection } from "@/components/ServicesSection";
import { getProjects, getSettings } from "@/lib/store";

export default async function Home() {
    // Select top 3 projects for the home page
    const projects = await getProjects();
    const settings = await getSettings();
    const featuredProjects = projects.slice(0, 3);

    return (
        <main className="relative min-h-screen bg-background text-white">
            <Header />

            {/* Hero Section: Preserved Visual Hook */}
            <ScrollSpeakerSequence settings={settings} />

            {/* Introduction Section */}
            <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
                    Beyond Code. <br />
                    <span className="text-white/50">Engineering Intelligence.</span>
                </h2>
                <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
                    I am a Senior SSD Software Architect & LLM Systems Engineer.
                    I build the platforms of tomorrow using advanced AI and robust distributed systems.
                </p>
                <div className="flex justify-center gap-6">
                    <Link href="/projects" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                        View Work
                    </Link>
                    <Link href="/about" className="px-8 py-4 border border-white/20 font-bold rounded-full hover:bg-white/10 transition-colors">
                        About Me
                    </Link>
                </div>
            </section>

            {/* Services / Expertise */}
            <ServicesSection />

            {/* Tech Stack Marquee */}
            <section className="relative z-10 py-12">
                <TechStackRow technologies={settings.stackTechnology} />
            </section>

            {/* Featured Projects */}
            <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
                        <p className="text-white/60">Selected works in AI and System Architecture.</p>
                    </div>
                    <Link href="/projects" className="text-sm font-medium text-white/70 hover:text-white border-b border-white/20 pb-1">
                        View All Projects &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
