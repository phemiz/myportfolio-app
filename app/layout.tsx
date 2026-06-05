import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    metadataBase: new URL("https://phemis.dev"),
    title: {
        default: "Phemis Portfolio | Software Architect & LLM Engineer",
        template: "%s | Phemis Portfolio",
    },
    description: "Senior SSD Software Architect & LLM Systems Engineer. Building intelligent platforms with advanced AI and distributed systems.",
    keywords: ["Software Architect", "LLM Engineer", "SSD Architect", "AI Engineer", "Distributed Systems", "Portfolio", "Phemis"],
    authors: [{ name: "Phemis" }],
    creator: "Phemis",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://phemis.dev",
        title: "Phemis Portfolio | Software Architect & LLM Engineer",
        description: "Senior SSD Software Architect & LLM Systems Engineer. Building intelligent platforms with advanced AI and distributed systems.",
        siteName: "Phemis Portfolio",
    },
    twitter: {
        card: "summary_large_image",
        title: "Phemis Portfolio | Software Architect & LLM Engineer",
        description: "Senior SSD Software Architect & LLM Systems Engineer. Building intelligent platforms with advanced AI and distributed systems.",
        creator: "@phemis",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={cn(inter.variable, "bg-background font-sans antialiased")} suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
