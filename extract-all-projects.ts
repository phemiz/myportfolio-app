import { PrismaClient } from '@prisma/client';
import fs from 'fs';
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();
  fs.writeFileSync('all_projects_extract.json', JSON.stringify(projects, null, 2));
  console.log(`Extracted ${projects.length} projects to all_projects_extract.json`);
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
