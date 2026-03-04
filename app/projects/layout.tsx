import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects | Phemis Portfolio',
    description: 'A curated collection of SSD applications, AI modules, and high-performance interfaces.',
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
