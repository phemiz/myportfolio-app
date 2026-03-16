import { getProjects } from "@/lib/db-utils";
import { updateProjectAction } from "@/lib/actions";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

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

    // Default existing image if present
    const currentImage = project.images && project.images.length > 0 ? project.images[0] : null;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Edit Project: {project.title}</h1>
                <Link
                    href="/admin"
                    className="px-6 py-2 border border-white/20 font-bold rounded-lg hover:bg-white/10 transition-colors"
                >
                    &larr; Back
                </Link>
            </div>

            <form action={updateProjectAction.bind(null, project.id)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-white/60 mb-2">Project Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={project.title}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Slug (URL)</label>
                    <input
                        type="text"
                        name="slug"
                        defaultValue={project.slug}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Status</label>
                    <select
                        name="status"
                        defaultValue={project.status}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 appearance-none"
                    >
                        <option value="completed" className="bg-black">Completed</option>
                        <option value="in-progress" className="bg-black">In Progress</option>
                        <option value="near-complete" className="bg-black">Near Complete</option>
                    </select>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-white/60 mb-2">Short Description</label>
                    <input
                        type="text"
                        name="shortDesc"
                        defaultValue={project.shortDesc}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-white/60 mb-2">Full Description</label>
                    <textarea
                        name="fullDesc"
                        rows={10}
                        defaultValue={project.fullDesc}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 font-mono text-sm"
                    ></textarea>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-white/60 mb-2">Tech Stack (comma separated)</label>
                    <input
                        type="text"
                        name="techStack"
                        defaultValue={project.techStack.join(', ')}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-white/60 mb-2">Feature Image</label>

                    {currentImage && (
                        <div className="mb-4">
                            <p className="text-xs text-white/40 mb-2">Current Image:</p>
                            <Image src={currentImage} alt="Current Feature" width={300} height={200} className="rounded border border-white/10 object-cover" />
                        </div>
                    )}

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-white/90"
                    />
                    <p className="text-xs text-white/40 mt-2">
                        Upload a new image to replace the current one.
                        <br />
                        <span className="text-white/30">Recommended: 1920x1080. Min: 800x600. Max: 5MB.</span>
                    </p>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-white/60 mb-2">GitHub URL</label>
                    <input
                        type="url"
                        name="githubUrl"
                        defaultValue={project.githubUrl}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30"
                    />
                </div>

                <div className="col-span-2 pt-6 border-t border-white/10 flex justify-end gap-4">
                    <Link
                        href="/admin"
                        className="px-8 py-3 bg-white/5 border border-white/10 font-bold rounded-lg hover:bg-white/10 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-colors"
                    >
                        Update Project
                    </button>
                </div>
            </form>
        </div>
    );
}
