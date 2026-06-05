import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'asc' },
    take: 1
  });
  console.log('Oldest Project in DB:');
  console.log(JSON.stringify(projects[0], null, 2));
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
