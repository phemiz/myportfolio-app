import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="w-full bg-black py-12 px-6 md:px-12 border-t border-white/10 text-white/60">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
                <div className="space-y-4 max-w-sm">
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 flex-shrink-0">
                            <Image
                                src="/cchsmt-logo.png"
                                alt="CCHSMT Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-white">Phemis Portfolio</h3>
                    </div>
                    <p className="text-sm leading-relaxed">
                        Senior SSD Software Architect & LLM Engineer.
                        Building the future of intelligent software.
                    </p>
                </div>

                <div className="flex gap-12">
                    <div className="space-y-4">
                        <h4 className="text-white font-medium">Navigation</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-white font-medium">Connect</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="https://github.com/phemiz" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                            <li><a href="https://www.linkedin.com/in/femi-adebayo-a849a92ba/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                            <li><a href="https://x.com/femi544601" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
                <p>&copy; {new Date().getFullYear()} Phemis Portfolio. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
