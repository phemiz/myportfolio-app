import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const projectsData = [
  {
    slug: 'naijadocs',
    fullDesc: `
NaijaDocs AI is a professional, mobile-first web application designed specifically for the Nigerian market. It empowers entrepreneurs, NGOs, and businesses to instantly generate formal, government-standard documents—such as Business Plans for BoI/GEEP grants, Tenancy Agreements for Lagos/Abuja, and CAC-compliant NGO Constitutions.

---

## 🎯 The Mission
To simplify the complex landscape of Nigerian legal and business documentation. By leveraging AI, we reduce the barrier to business formalization for millions of SMEs and NGOs across Nigeria.

## 🛠️ The Challenge
The Problem: Nigerians face significant difficulty in accessing affordable, legally sound formal documents (Tenancy agreements, Business plans, etc.) without expensive legal fees. Small business owners often struggle with the precise terminology and formatting required for these documents.

## 🚀 The Solution
I engineered an AI-powered document orchestration system that saves users time and money while ensuring the output meets local standards:
- **Regional Compliance**: Automatically adapts templates based on state-specific laws (e.g., Lagos vs. Abuja Tenancy Laws).
- **Intelligent Prompting**: Guides users through simplified questions to extract the necessary data for formal documents.
- **Mobile-First Indexing**: Optimized for low-bandwidth mobile environments, ensuring accessibility across all regions of Nigeria.

## ⚡ High-Impact Metrics
- **Speed**: Reduces document creation time from 2 hours to 2 minutes.
- **Performance**: High mobile-first optimization for high-density, low-bandwidth networks in Nigeria.

## ⚙️ Technical Highlights
- **Localized Template Engine**: Handles specific Nigerian legal and business formats with precision.
- **AI Integration**: Uses advanced prompting strategies to parse user input and generate structured, professional text.
- **Security & Privacy**: Built with a focus on secure data handling, ensuring user information is protected.

## 👤 My Role: Product Architect
"Architected the end-to-end workflow from prompt engineering for the AI engine to the final PDF generation. Designed with a 'Mobile-First' approach to cater to the 90%+ mobile-user demographic in the Nigerian market."

---

## 👋 Looking for a Partner?
**Looking for a developer who understands the Nigerian digital landscape?** I can build custom AI-driven documentation tools for your business. [Let's talk about your next project.](https://www.linkedin.com/in/femi-adebayo-a849a92ba/)
`,
    features: [
      { title: "CAC-Compliant Engine", desc: "Generates constitutions and bylaws that meet strict regulatory standards." },
      { title: "Regional Logic", desc: "Smart filtering for state-specific tenancy and land documents." },
      { title: "Grant-Ready Plans", desc: "Specifically designed for BoI and GEEP grant application formats." }
    ]
  },
  {
    slug: 'myportfolio-app',
    fullDesc: `
This high-performance, mobile-first platform showcases the intersection of AI development and digital marketing strategy. It serves as a live hub for my work as an agency owner and developer, scaled for both SaaS products and localized Nigerian solutions.

---

## 🎯 The Mission
To create a "Tactical Headquarters" for my digital identity—demonstrating that a developer's portfolio should be as functional and intelligent as the products they build.

## 🛠️ The Challenge
The Problem: Most developer portfolios are static and fail to communicate the *business value* or *strategic thinking* behind technical decisions. Employers often see code but not the "Architect" behind it.

## 🚀 The Solution
I built a data-driven portfolio engine that:
- **Internal CMS**: Powered by Prisma and SQLite for real-time content management.
- **Agent-Ready Architecture**: Structured in a way that allows AI agents (like Antigravity) to easily maintain and update the codebase.
- **Premium Aesthetics**: Uses glassmorphism and motion logic to provide a top-tier user experience.

## ⚡ High-Impact Metrics
- **Deployment Ready**: 100% Next.js App Router for optimal SEO and performance.
- **Zero Friction**: One-click deployments to Vercel with integrated Blob storage for assets.

## 👤 My Role: Lead Architect
"Built this entire ecosystem from the ground up to serve as a demonstrator of my full-stack capabilities—from database schema design to advanced frontend motion physics."

---

## 👋 Hire a Tactical Developer
**Need a portfolio or a business platform that actually converts?** I build high-conversions digital assets that tell your story. [Let's connect.](https://www.linkedin.com/in/femi-adebayo-a849a92ba/)
`,
    features: [
      { title: "Custom Admin Suite", desc: "Built-in project manager to keep my showcase up-to-date in real-time." },
      { title: "SEO Optimized", desc: "Dynamic metadata generation for every project case study." },
      { title: "High-Fidelity Animations", desc: "Leverages Framer Motion for a premium, 'living' interface." }
    ]
  },
  {
    slug: 'vantage',
    fullDesc: `
Vantage is a strategic analytics dashboard providing a "high-ground" view of business performance. It simplifies complex data into actionable growth insights, specifically tailored for the Nigerian entrepreneurial landscape.

---

## 🎯 The Mission
To empower Nigerian agency owners and entrepreneurs with the data visibility they need to scale without the complexity of traditional enterprise tools.

## 🛠️ The Challenge
The Problem: Small to medium businesses in Nigeria often operate in the dark, lacking clear visibility into their digital marketing ROI and operational health because mainstream analytics tools are too complex or expensive.

## 🚀 The Solution
Vantage provides a "Tactical Overview" of business health:
- **Growth Insights**: Translates raw metrics into plain language advice.
- **Mobile-First Oversight**: Designed for the Nigerian business owner who is always on the move.
- **Digital Ecosystem Sync**: Aggregates data from multiple sources into one unified view.

## ⚙️ Technical Highlights
- **Data Orchestration**: Engineered a pipeline to normalize data from various social and business APIs.
- **Lightweight Design**: Minimal bundle size to ensure fast loading on mobile data networks.

## 👤 My Role: Product Architect
"Focused on simplifying the user experience while maintaining the power of the backend analytics engine. I ensured the tool provides 'Strategic Vantage' from the first login."

---

## 👋 Data-Driven Growth
**Ready to oversee your business from the high ground?** I build custom dashboards that turn your data into a tactical advantage. [Message me today.](https://www.linkedin.com/in/femi-adebayo-a849a92ba/)
`,
    features: [
      { title: "Tactical Dashboard", desc: "High-level overview of key performance indicators (KPIs)." },
      { title: "Actionable Insights", desc: "Auto-generated recommendations based on business performance trends." },
      { title: "Growth Tracking", desc: "Visualize your scale over time with localized projection models." }
    ]
  },
  {
    slug: 'smonitor',
    fullDesc: `
Smonitor is a robust digital monitoring solution designed for real-time tracking and performance oversight. It helps Nigerian businesses and agency owners maintain uptime through a streamlined, mobile-first interface.

---

## 🎯 The Mission
To provide an "Always-On" guardian for your digital assets, ensuring that downtime never goes unnoticed in the fast-paced Nigerian digital economy.

## 🛠️ The Challenge
The Problem: Website and API downtime leads to direct revenue loss. In Nigeria, where network stability can vary, businesses need a monitoring tool that is as reliable as the services they are protecting.

## 🚀 The Solution
A real-time health monitor that offers:
- **Instant Visibility**: See at a glance if your sites or services are healthy.
- **Mobile-First Alerts**: Built to send notifications that reach the business owner wherever they are.
- **Uptime Assurance**: Detailed logs to help identify patterns in service interruptions.

## ⚡ Performance Metric
- **Zero Latency Monitoring**: High-frequency pings with minimal overhead to ensure your results are always fresh.

---

## 👋 Need a Reliable Guardian?
**Don't let downtime kill your conversions.** I build monitoring and automation tools that keep your business running 24/7. [Let's talk uptime.](https://www.linkedin.com/in/femi-adebayo-a849a92ba/)
`,
    features: [
      { title: "Real-Time Tracking", desc: "Watch your system health in real-time with zero-lag updates." },
      { title: "Uptime Oversight", desc: "Historical data logs to prove your reliability to clients." },
      { title: "Instant Alerts", desc: "Stay informed the second a service goes offline." }
    ]
  },
  {
      slug: 'evening-sun-hub',
      fullDesc: `
Evening Sun Hub is a premium, unified lifestyle ecosystem centered in Badagry, Lagos. It integrates five service nodes—Eatery, Beauty, Nightlife, Marine Logistics, and Event Hosting—into a single tactical interface.

---

## 🎯 The Mission
To digitize the luxury lifestyle experience in Badagry, providing a "Command Center" for local high-fidelity services.

## 🛠️ The Challenge
The Problem: The premium service sector in regional Lagos often lacks a unified digital presence, making it difficult for residents and tourists to access a seamless, high-quality lifestyle experience.

## 🚀 The Solution
I built a Service Hub that provides:
- **Unified Ecosystem**: Manage eatery orders, salon bookings, and boat logistics in one place.
- **Local Identity**: Specifically tailored for the Badagry market, respecting the local culture and business flow.
- **Tactical Management**: A backend that allows the hub owner to oversee multiple diverse business units from one screen.

## 👤 My Role: System Architect
"Designed the complex multi-node architecture that allows five different business types to coexist in one harmonious digital platform."

---

## 👋 Building Local Ecosystems
**Taking your regional brand digital?** I build platforms that connect local businesses with modern consumers. [Let's build your hub.](https://www.linkedin.com/in/femi-adebayo-a849a92ba/)
`,
      features: [
          { title: "Multi-Node Registry", desc: "Successfully manages 5 distinct business units under one database." },
          { title: "Unified Loyalty", desc: "Points and rewards that work across all ESH service providers." },
          { title: "Logistics Engine", desc: "Dedicated module for the unique demands of marine and event transport." }
      ]
  },
  {
      slug: 'skyproperties-nigeria',
      fullDesc: `
SkyProperties is a premium real estate platform for the modern Nigerian market, connecting buyers and renters with luxury properties in Lagos and Abuja.

---

## 🎯 The Mission
To bring "Sky-High" standards to the Nigerian real estate search experience through high-fidelity visuals and verified listings.

## 🛠️ The Challenge
The Problem: The real estate market in Nigeria is often plagued by inaccurate listings, poor visual quality, and fragmented communication between agents and buyers.

## 🚀 The Solution
A "High-Converting" listing engine featuring:
- **Luxury-First Visuals**: High-resolution galleries and architectural masterworks.
- **Verified Discovery**: A system designed to build trust through transparent property data.
- **Abuja/Lagos Focus**: Specific modules for Nigeria's most competitive markets.

## ⚙️ Technical Highlights
- **Mobile-First Search**: Optimized for users searching for homes on their smartphones.
- **Lead Generation Engine**: Strategic CTAs placed to maximize agent contact rates.

---

## 👋 Disrupting Real Estate?
**Need a platform that moves properties faster?** I build high-performance real estate engines tailored for the West African market. [Let's talk shop.](https://www.linkedin.com/in/femi-adebayo-a849a92ba/)
`,
      features: [
          { title: "Luxury Showcase", desc: "Focuses on high-fidelity architectural imagery and premium listings." },
          { title: "State-Wide Logic", desc: "Specific optimizations for the high-demand regions of Lagos and Abuja." },
          { title: "Strategic Leads", desc: "Built-in conversion pathways to connect serious buyers with verified agents." }
      ]
  }
];

async function main() {
  for (const data of projectsData) {
    await prisma.project.update({
      where: { slug: data.slug },
      data: {
        fullDesc: data.fullDesc.trim(),
        features: JSON.stringify(data.features),
        status: data.slug === 'naijadocs' || data.slug === 'crestoak-college' ? 'near-complete' : 'in-progress'
      }
    });
    console.log(`Updated ${data.slug} with professional content.`);
  }

  // Generic update for others if they are just placeholders
  const allProjects = await prisma.project.findMany();
  for (const p of allProjects) {
      if (!projectsData.find(pd => pd.slug === p.slug)) {
          // If it's a school management project, give it a school template
          if (p.title.toLocaleLowerCase().includes('school') || p.title.toLocaleLowerCase().includes('eduflow')) {
              await prisma.project.update({
                  where: { id: p.id },
                  data: {
                      fullDesc: `
${p.title} is a comprehensive management platform designed to automate school operations in Nigeria. It streamlines everything from student records to fee payments through a mobile-first interface.

---

## 🎯 The Mission
To transition Nigerian educational institutions from paper-based chaos to digital precision, allowing educators to focus on teaching rather than administrative paperwork.

## 🛠️ The Challenge
The Problem: Administrators and lecturers in Nigerian schools are often overwhelmed by manual record-keeping, leading to data errors, lost fee tracking, and slow result processing.

## 🚀 The Solution
A "Friction-Zero" administrative flow:
- **Student Lifecycle Tracking**: From admission to graduation in one digital record.
- **Automated Fee Management**: Clear visibility into payment statuses for school owners.
- **Mobile-First Access**: Designed for lecturers and parents who primarily use mobile devices.

## ⚙️ Technical Highlights
- **Engineered for Stability**: Built with **TypeScript** to ensure the database remains consistent even during heavy exam processing periods.
- **Localized Logic**: Handles the unique grading and administrative requirements of the Nigerian school system.

---

## 👋 Revolutionizing Education?
**I build tools that modernize the classroom.** If you need a custom management system for your institution, let's connect. [Upgrade your institution today.](https://www.linkedin.com/in/femi-adebayo-a849a92ba/)
`.trim(),
                      features: JSON.stringify([
                          { title: "Student Ledger", desc: "Unified record system for academic and disciplinary history." },
                          { title: "Payment Flow", desc: "Integrated tracking for tuition and school fees." },
                          { title: "Mobile Portal", desc: "Full administrative access optimized for smartphone screens." }
                      ])
                  }
              });
              console.log(`Updated school project: ${p.title}`);
          }
      }
  }

  console.log('ALL PROJECTS ENHANCED!');
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
