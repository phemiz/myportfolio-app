import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'asc' }
  });
  console.log('Projects in DB (Oldest First):');
  projects.forEach((p, i) => {
    console.log(`${i+1}. ${p.title} (ID: ${p.id}, Slug: ${p.slug})`);
  });
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
