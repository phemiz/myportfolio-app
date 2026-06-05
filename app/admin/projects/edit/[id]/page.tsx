import { getProjects } from "@/lib/db-utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditProjectForm from "@/components/admin/EditProjectForm";

interface EditProjectPageProps {
    params: {
        id: string;
    };
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
    const projects = await getProjects();
    const project = projects.find((p) => p.id === params.id);

    if (!project) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto px-4 pb-20">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">
                        Edit Project
                    </h1>
                    <p className="text-sm text-white/40 mt-1">{project.title}</p>
                </div>
                <Link
                    href="/admin"
                    className="px-6 py-2 bg-white/5 border border-white/10 font-bold rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                >
                    &larr; Back to Dashboard
                </Link>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <EditProjectForm project={project} />
            </div>
        </div>
    );
}
