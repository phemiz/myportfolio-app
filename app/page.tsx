import Link from "next/link";
import { ScrollSpeakerSequence } from "@/components/ScrollSpeakerSequence";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { TechStackRow } from "@/components/TechStackRow";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { getProjects, getSettings } from "@/lib/db-utils";

interface HomePageProps {
    searchParams: { view?: string };
}

export default async function Home({ searchParams }: HomePageProps) {
    const view = searchParams.view || "default";

    // Select all projects to filter them based on view
    const allProjects = await getProjects();
    const settings = await getSettings();

    // Define persona-specific content
    const personaConfig: Record<string, any> = {
        cyber: {
            title: "Securing the Digital Frontier.",
            subtitle: "Security Architect & Penetration Tester.",
            description: "I specialize in vulnerability assessment, network security, and building resilient systems that defend against modern cyber threats.",
            projectFilter: ["cybersecurity", "security", "network", "pentest", "ethical hacking"],
            viewTitle: "Cybersecurity Portfolio"
        },
        dev: {
            title: "Crafting Digital Experiences.",
            subtitle: "Full-Stack Web & Mobile Developer.",
            description: "I build high-performance web applications and fluid mobile experiences using React, Next.js, and modern cross-platform technologies.",
            projectFilter: ["web", "mobile", "react", "next.js", "frontend", "backend"],
            viewTitle: "Software Development Portfolio"
        },
        marketing: {
            title: "Data-Driven Growth.",
            subtitle: "Digital Strategist & Growth Marketer.",
            description: "I leverage analytics, SEO, and content strategy to scale brands and reach target audiences with precision and impact.",
            projectFilter: ["marketing", "seo", "analytics", "growth", "strategy"],
            viewTitle: "Digital Marketing Portfolio"
        },
        default: {
            title: "Beyond Code.",
            subtitle: "Senior SSD Software Architect & LLM Engineer.",
            description: "I build the platforms of tomorrow using advanced AI, robust distributed systems, and mission-critical software architecture.",
            projectFilter: ["ai", "llm", "system", "architecture", "ssd"],
            viewTitle: "Featured Projects"
        }
    };

    const config = personaConfig[view] || personaConfig.default;

    // Filter featured projects based on keywords in techStack or shortDesc
    const featuredProjects = allProjects
        .filter(p => {
            if (view === "default") return true;
            const content = `${p.title} ${p.shortDesc} ${p.techStack.join(" ")}`.toLowerCase();
            return config.projectFilter.some((keyword: string) => content.includes(keyword));
        })
        .slice(0, 3);

    // If no projects match, fallback to the latest projects
    const finalProjects = featuredProjects.length > 0 ? featuredProjects : allProjects.slice(0, 3);

    return (
        <main className="relative min-h-screen bg-background text-white">
            <Header />

            {/* Hero Section: Preserved Visual Hook */}
            <ScrollSpeakerSequence settings={settings} />

            {/* Introduction Section (Dynamic Based on View) */}
            <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
                    {config.title.split(".")[0]}. <br />
                    <span className="text-white/50">{config.subtitle}</span>
                </h2>
                <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
                    {config.description}
                </p>
                <div className="flex justify-center gap-6">
                    <Link href="/projects" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                        View Work
                    </Link>
                    <Link href="/about" className="px-8 py-4 border border-white/20 font-bold rounded-full hover:bg-white/10 transition-colors">
                        About Me
                    </Link>
                </div>
                
                {/* View Switcher (Subtle hint for visitors) */}
                <div className="mt-12 flex justify-center gap-4 text-xs font-semibold uppercase tracking-widest text-white/30">
                    <Link href="/" className={view === "default" ? "text-white" : "hover:text-white/60"}>General</Link>
                    <span>/</span>
                    <Link href="/?view=cyber" className={view === "cyber" ? "text-white" : "hover:text-white/60"}>Cybersecurity</Link>
                    <span>/</span>
                    <Link href="/?view=dev" className={view === "dev" ? "text-white" : "hover:text-white/60"}>Software Dev</Link>
                    <span>/</span>
                    <Link href="/?view=marketing" className={view === "marketing" ? "text-white" : "hover:text-white/60"}>Marketing</Link>
                </div>
            </section>

            {/* Services / Expertise */}
            <ServicesSection role={view} />

            {/* Strategic Collaborations */}
            <TestimonialsSection />

            {/* Tech Stack Marquee */}
            <section className="relative z-10 py-12">
                <TechStackRow technologies={settings.stackTechnology} />
            </section>

            {/* Featured Projects */}
            <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">{config.viewTitle}</h2>
                        <p className="text-white/60">Selected works matching your professional interest.</p>
                    </div>
                    <Link href="/projects" className="text-sm font-medium text-white/70 hover:text-white border-b border-white/20 pb-1">
                        View All Projects &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {finalProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
