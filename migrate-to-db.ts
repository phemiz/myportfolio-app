import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    const DATA_DIR = path.join(process.cwd(), 'data');

    // Migrate Settings
    try {
        const settingsData = await fs.readFile(path.join(DATA_DIR, 'settings.json'), 'utf-8');
        const settings = JSON.parse(settingsData);
        await prisma.settings.create({
            data: {
                scrollingText: JSON.stringify(settings.scrollingText),
                stackTechnology: JSON.stringify(settings.stackTechnology),
            }
        });
        console.log('Settings migrated!');
    } catch (e) {
        console.error('Settings migration failed or missing', e);
    }

    // Migrate Admin
    try {
        const adminData = await fs.readFile(path.join(DATA_DIR, 'admin.json'), 'utf-8');
        const admin = JSON.parse(adminData);
        await prisma.admin.create({
            data: {
                username: admin.username,
                password: admin.password,
            }
        });
        console.log('Admin migrated!');
    } catch (e) {
        console.error('Admin migration failed or missing', e);
    }

    // Migrate Projects
    try {
        const projectsData = await fs.readFile(path.join(DATA_DIR, 'projects.json'), 'utf-8');
        const projects = JSON.parse(projectsData);
        for (const project of projects) {
            await prisma.project.create({
                data: {
                    id: project.id,
                    slug: project.slug,
                    title: project.title,
                    shortDesc: project.shortDesc,
                    fullDesc: project.fullDesc,
                    status: project.status,
                    techStack: JSON.stringify(project.techStack || []),
                    llmMetadata: project.llmMetadata ? JSON.stringify(project.llmMetadata) : null,
                    githubUrl: project.githubUrl,
                    demoUrl: project.demoUrl,
                    images: JSON.stringify(project.images || []),
                    features: project.features ? JSON.stringify(project.features) : null,
                    specs: project.specs ? JSON.stringify(project.specs) : null,
                }
            });
        }
        console.log('Projects migrated!');
    } catch (e) {
        console.error('Projects migration failed or missing', e);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
