export interface Project {
    id: string;
    slug: string;
    title: string;
    shortDesc: string;
    fullDesc: string;
    status: 'completed' | 'in-progress' | 'near-complete';
    techStack: string[];
    llmMetadata?: {
        model: string;
        framework: string;
        deployment: string;
        promptType?: string;
    };
    githubUrl?: string;
    demoUrl?: string;
    images: string[];
    features?: { title: string; desc: string }[];
    specs?: { label: string; value: string }[];
    readme?: string;
}

export const projects: Project[] = [
    {
        id: "0",
        slug: "aether-core",
        title: "Portfolio (Aether Core)",
        shortDesc: "High-fidelity scrollytelling visual experience.",
        fullDesc: "My personal portfolio engine. Originally designed as a landing page for high-fidelity audio, now adapted as a showcase of my frontend engineering capabilities. Features complex scroll-linked animations (canvas), 3D-like image sequencing, and glassmorphism UI.",
        status: "completed",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Canvas"],
        githubUrl: "https://github.com/phemiz/aether-core",
        images: ["/sequence/speaker_sequence_0_frame.webp"],
        features: [
            { title: "Canvas Scrollytelling", desc: "60fps image sequence animation linked to scroll position." },
            { title: "Glassmorphism", desc: "Modern UI aesthetics with backdrop-blur and transparency." },
            { title: "Performance Optimized", desc: "Pre-loading strategies for heavy asset sequences." }
        ]
    },
    {
        id: "1",
        slug: "axiom-ai",
        title: "Axiom AI",
        shortDesc: "Unified AI Development Environment.",
        fullDesc: "Axiom is an AI-powered development environment that unifies app generation, deep code editing, and chat collaboration in one tri-pane workspace. Built with React, TypeScript, and Node.js, it offers context-aware coding, smart refactors, and seamless deployment scaffolding.",
        status: "in-progress",
        techStack: ["React", "TypeScript", "Node.js", "AI Agents", "AST Manipulation"],
        githubUrl: "https://github.com/phemiz/Axiom-Ai-Unified-AI-Development-Environment",
        llmMetadata: {
            model: "Multi-Model (GPT-4/Claude)",
            framework: "Custom Agentic",
            deployment: "Cloud/Local",
            promptType: "System-Level"
        },
        images: [] // User can add screenshots later
    },
    {
        id: "2",
        slug: "aegis-ai",
        title: "Aegis AI",
        shortDesc: "MCP System & Automation Console.",
        fullDesc: "Implements Phase 1 of the Aegis MCP system. Features a Next.js App Router frontend acting as a mock automation console, with a typed client, orchestrator, and DSL utilities for AI model context protocol interactions.",
        status: "near-complete",
        techStack: ["Next.js", "TypeScript", "MCP Protocol", "DSL", "Automation"],
        githubUrl: "https://github.com/phemiz/Aegis-AI",
        llmMetadata: {
            model: "N/A (Protocol Layer)",
            framework: "Model Context Protocol",
            deployment: "Edge/Serverless"
        },
        images: []
    },
    {
        id: "3",
        slug: "docuphemz-ai",
        title: "DocuPhemz AI Suite",
        shortDesc: "Document Intelligence & Versioning Sytem.",
        fullDesc: "A comprehensive AI suite for document handling, featuring strict version control and typed client utilities. Mirrors the Aegis architecture for document-specific workflows.",
        status: "in-progress",
        techStack: ["TypeScript", "Next.js", "AI Pipelines"],
        githubUrl: "https://github.com/phemiz/DocuPhemz-AI-Suite-",
        images: []
    }
];

export const personalInfo = {
    name: "Phemiz",
    role: "Senior SSD & LLM Architect",
    bio: "I build high-performance, intelligent applications that bridge the gap between traditional software engineering and modern AI capabilities. Creator of Axiom AI and Aegis MCP systems.",
    socials: {
        github: "https://github.com/phemiz",
        twitter: "https://x.com/femi544601",
        linkedin: "https://www.linkedin.com/in/femi-adebayo-a849a92ba/"
    }
};
