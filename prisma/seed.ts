import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    const projectsPath = path.join(process.cwd(), 'data', 'projects.json');
    const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

    console.log('Clearing existing projects...');
    await prisma.project.deleteMany({});

    console.log('Seeding projects...');

    for (const project of projectsData) {
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

        await prisma.project.upsert({
            where: { id: project.id },
            update: data,
            create: {
                id: project.id,
                ...data
            },
        });
    }

    console.log('Seed completed successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
