import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About | Phemis Portfolio',
    description: 'Learn more about Phemis, a Senior SSD Software Architect and LLM Systems Engineer.',
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
