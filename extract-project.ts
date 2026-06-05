import { PrismaClient } from '@prisma/client';
import fs from 'fs';
const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.findFirst({
    where: { slug: 'naijadocs' }
  });
  fs.writeFileSync('naijadocs_extract.json', JSON.stringify(project, null, 2));
  console.log('Project written to naijadocs_extract.json');
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
