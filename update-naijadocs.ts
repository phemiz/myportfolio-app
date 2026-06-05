import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const markdownContent = `
NaijaDocs AI is a professional, mobile-first web application designed specifically for the Nigerian market. It empowers entrepreneurs, NGOs, and businesses to instantly generate formal, government-standard documents—such as Business Plans for BoI/GEEP grants, Tenancy Agreements for Lagos/Abuja, and CAC-compliant NGO Constitutions.

---

## 🎯 The Mission
To simplify the complex landscape of Nigerian legal and business documentation. By leveraging AI, we reduce the barrier to business formalization for millions of SMEs and NGOs across Nigeria.

## 🛠️ The Challenge
Navigating the regulatory requirements of organizations like the **CAC (Corporate Affairs Commission)** or applying for **BoI (Bank of Industry)** grants typically requires expensive legal assistance or deep domain expertise. Small business owners often struggle with the precise terminology and formatting required for these documents.

## 🚀 The Solution
I engineered an AI-powered document orchestration system that:
- **Regional Compliance**: Automatically adapts templates based on state-specific laws (e.g., Lagos vs. Abuja Tenancy Laws).
- **Intelligent Prompting**: Guides users through simplified questions to extract the necessary data for formal documents.
- **Mobile-First Indexing**: Optimized for low-bandwidth mobile environments, ensuring accessibility across all regions of Nigeria.

## ⚙️ Technical Highlights
- **Engineered for Precision**: Uses specialized LLM prompting strategies to ensure CAC-ready syntax.
- **Modern Stack**: Built with **TypeScript** for high reliability and type safety.
- **Scalable Architecture**: Designed to handle hundreds of concurrent document generations with local caching for state-specific templates.

## 📈 Impact & Roadmap
Currently in active development, NaijaDocs aims to become the "Digital Secretary" for Nigerian SMEs. Future versions will include direct integration with CAC APIs and advanced financial modeling for BoI-ready business plans.
`;

async function main() {
  await prisma.project.update({
    where: { slug: 'naijadocs' },
    data: {
      fullDesc: markdownContent.trim(),
      techStack: JSON.stringify(["TypeScript", "Next.js", "AI Pipelines", "Tailwind CSS"]),
      features: JSON.stringify([
        { title: "CAC-Compliant Engine", desc: "Generates constitutions and bylaws that meet strict regulatory standards." },
        { title: "Regional Logic", desc: "Smart filtering for state-specific tenancy and land documents." },
        { title: "Grant-Ready Plans", desc: "Specifically designed for BoI and GEEP grant application formats." }
      ]),
      status: "near-complete"
    }
  });
  console.log('NaijaDocs updated successfully with professional Case Study content!');
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
