import 'server-only';
import { prisma } from './prisma';
import { Project } from './data';

export interface Settings {
    scrollingText: {
        section0: { heading: string; description: string };
        section30: { heading: string; description: string };
        section60: { heading: string; description: string };
        section90: { heading: string; description: string };
    };
    stackTechnology: string[];
}

export async function getProjects(): Promise<Project[]> {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'asc' }
        });

        return projects.map((p: any) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            shortDesc: p.shortDesc,
            fullDesc: p.fullDesc,
            status: p.status as 'completed' | 'in-progress' | 'near-complete',
            techStack: JSON.parse(p.techStack),
            llmMetadata: p.llmMetadata ? JSON.parse(p.llmMetadata) : undefined,
            githubUrl: p.githubUrl || undefined,
            demoUrl: p.demoUrl || undefined,
            images: JSON.parse(p.images),
            features: p.features ? JSON.parse(p.features) : undefined,
            specs: p.specs ? JSON.parse(p.specs) : undefined,
            readme: p.readme || undefined,
        }));
    } catch (error) {
        console.error("Prisma Error loading projects", error);
        return [];
    }
}

export async function saveProjects(projects: Project[]) {
    await prisma.$transaction(async (tx: any) => {
        const existing = await tx.project.findMany({ select: { id: true } });
        const existingIds = new Set(existing.map((e: any) => e.id));
        const incomingIds = new Set(projects.map((p: any) => p.id));

        const toDelete = Array.from(existingIds).filter((id: any) => !incomingIds.has(id));

        if (toDelete.length > 0) {
            await tx.project.deleteMany({ where: { id: { in: toDelete } } });
        }

        for (const project of projects) {
            const data = {
                slug: project.slug,
                title: project.title,
                shortDesc: project.shortDesc,
                fullDesc: project.fullDesc,
                status: project.status,
                techStack: JSON.stringify(project.techStack),
                llmMetadata: project.llmMetadata ? JSON.stringify(project.llmMetadata) : null,
                githubUrl: project.githubUrl,
                demoUrl: project.demoUrl,
                images: JSON.stringify(project.images),
                features: project.features ? JSON.stringify(project.features) : null,
                specs: project.specs ? JSON.stringify(project.specs) : null,
                readme: project.readme,
            };

            await tx.project.upsert({
                where: { id: project.id },
                update: data,
                create: {
                    id: project.id,
                    ...data
                }
            });
        }
    });
}

export async function getAdminCredentials() {
    try {
        const admin = await prisma.admin.findFirst();
        if (admin) {
            return { username: admin.username, password: admin.password };
        }
    } catch (error) {
        console.error("Prisma error getting admin", error);
    }
    return { username: 'admin', password: 'admin' };
}

export async function updateAdminCredentials(creds: { username: string; password: string }) {
    const admin = await prisma.admin.findFirst();
    if (admin) {
        await prisma.admin.update({
            where: { id: admin.id },
            data: { username: creds.username, password: creds.password }
        });
    } else {
        await prisma.admin.create({
            data: { username: creds.username, password: creds.password }
        });
    }
}

export async function getSettings(): Promise<Settings> {
    try {
        const settings = await prisma.settings.findFirst();
        if (settings) {
            return {
                scrollingText: JSON.parse(settings.scrollingText),
                stackTechnology: JSON.parse(settings.stackTechnology)
            };
        }
    } catch (error) {
        console.error("Prisma error getting settings", error);
    }

    return {
        scrollingText: {
            section0: { heading: "Code Unbound.", description: "" },
            section30: { heading: "Modular System Architecture.", description: "Engineered for infinite scalability." },
            section60: { heading: "Precision Logic, Pure Intelligence.", description: "Every component calibrated for performance." },
            section90: { heading: "Experience the Future.", description: "" }
        },
        stackTechnology: [
            "React", "Next.js", "TypeScript", "Python", "FastAPI",
            "PostgreSQL", "OpenAI", "LangChain", "Framer Motion", "Tailwind CSS",
            "Node.js", "Docker", "AWS", "Firebase", "Git"
        ]
    };
}

export async function updateSettings(settings: Settings) {
    const record = await prisma.settings.findFirst();
    const data = {
        scrollingText: JSON.stringify(settings.scrollingText),
        stackTechnology: JSON.stringify(settings.stackTechnology)
    };

    if (record) {
        await prisma.settings.update({
            where: { id: record.id },
            data
        });
    } else {
        await prisma.settings.create({
            data
        });
    }
}
