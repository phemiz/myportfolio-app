import Link from 'next/link';
import Image from 'next/image';
import { getProjects } from '@/lib/db-utils';
import { deleteProjectAction } from '@/lib/actions';

export default async function AdminDashboard() {
    const projects = await getProjects();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Project Manager</h1>
                <div className="flex gap-4">

                    <Link
                        href="/admin/content"
                        className="px-6 py-2 bg-white/10 border border-white/20 font-bold rounded-lg hover:bg-white/20 transition-colors"
                    >
                        ⚙️ Content Settings
                    </Link>
                    <Link
                        href="/admin/projects/add"
                        className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-colors"
                    >
                        + Add Project
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="p-6 rounded-xl border border-white/10 bg-white/5 relative group">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wider ${project.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                                project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-300' :
                                    'bg-blue-500/20 text-blue-300'
                                }`}>
                                {project.status.replace('-', ' ')}
                            </span>
                            <Link
                                href={`/admin/projects/edit/${project.id}`}
                                className="text-xs font-bold text-white/40 hover:text-white border border-white/10 hover:border-white px-2 py-1 rounded transition-colors"
                            >
                                Edit
                            </Link>
                        </div>

                        {/* Project Image */}
                        {project.images && project.images.length > 0 ? (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
                                <Image
                                    src={project.images[0]}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-full aspect-video rounded-lg bg-white/5 mb-4 flex items-center justify-center border border-white/10">
                                <span className="text-white/20 text-3xl font-bold">{project.title[0]}</span>
                            </div>
                        )}

                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-sm text-white/60 line-clamp-2 mb-4">{project.shortDesc}</p>

                        <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                            <Link
                                href={`/projects/${project.slug}`}
                                target="_blank"
                                className="flex-1 py-2 text-sm text-center text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors"
                            >
                                ↗ View Case Study
                            </Link>
                            <form action={deleteProjectAction.bind(null, project.id)} className="flex-1">
                                <button className="w-full py-2 text-sm text-red-400 hover:bg-red-500/10 rounded transition-colors">
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
