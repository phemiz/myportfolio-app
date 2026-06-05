import { getProjects } from "@/lib/db-utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectRegistry } from "@/components/ProjectRegistry";

export default async function ProjectsPage() {
    // 1. Fetching on the Server (Safe from browser errors)
    const initialProjects = await getProjects();

    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20">
            <Header />

            {/* 2. Passing to Client Component for filtering */}
            <ProjectRegistry initialProjects={initialProjects} />

            <Footer />
        </main>
    );
}
