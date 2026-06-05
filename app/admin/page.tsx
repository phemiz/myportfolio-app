import Link from 'next/link';
import { getProjects } from '@/lib/db-utils';
import ScrollToHash from '@/components/admin/ScrollToHash';
import { AdminProjectList } from '@/components/admin/AdminProjectList';

export default async function AdminDashboard({ searchParams }: { searchParams: { success?: string } }) {
    const projects = await getProjects();
    const isCreated = searchParams?.success === 'created';
    const isUpdated = searchParams?.success === 'updated';

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <ScrollToHash />
            
            {/* STATUS NOTIFICATIONS */}
            {(isCreated || isUpdated) && (
                <div className="mb-12 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="flex items-center gap-4">
                        <span className="text-2xl">⚡</span>
                        <p className="text-emerald-400 font-black uppercase tracking-widest text-xs">
                            {isCreated ? "New tactical asset deployed successfully." : "Asset intelligence updated."}
                        </p>
                    </div>
                    <Link href="/admin" className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60 hover:text-emerald-400">Dismiss</Link>
                </div>
            )}
            
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-24">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-4 block">Command Center</span>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Project <br/> <span className="text-white/40 tracking-normal">Manager.</span></h1>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <Link
                        href="/admin/content"
                        className="flex-1 md:flex-none text-center px-8 py-4 bg-white/5 border border-white/10 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all"
                    >
                        ⚙️ Settings
                    </Link>
                    <Link
                        href="/admin/projects/add"
                        className="flex-1 md:flex-none text-center px-8 py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-xl shadow-white/5"
                    >
                        + Add Asset
                    </Link>
                </div>
            </div>

            {/* UPGRADED PROJECT LIST */}
            <AdminProjectList initialProjects={projects} />
        </div>
    );
}
