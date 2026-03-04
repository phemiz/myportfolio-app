import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Phemis Portfolio',
    description: 'Get in touch with Phemis for collaboration, opportunities, or just to say hello.',
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
