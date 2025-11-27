import React from 'react';
import { useLenis } from './SmoothScroll';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const lenis = useLenis();

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo(targetId, { duration: 1.5 });
        } else {
            // Fallback if lenis isn't ready
            const element = document.querySelector(targetId);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative w-full min-h-screen text-starlight-white overflow-hidden">
            {/* Navigation Placeholder */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-sm ">
                <div className="cursor-target text-xl font-heading font-bold tracking-wider">
                    <a
                        href="#hero"
                        onClick={(e) => handleScroll(e, '#hero')}
                        className="cursor-target cursor-none hover:text-electric-cyan transition-colors"
                    >
                        vincensius.me
                    </a>
                </div>
                <div className="hidden md:flex gap-8 font-mono text-sm">
                    <a  
                        href="#work"
                        onClick={(e) => handleScroll(e, '#work')}
                        className="cursor-target cursor-none hover:text-electric-cyan transition-colors"
                    >
                        WORK
                    </a>
                    <a
                        href="#about"
                        onClick={(e) => handleScroll(e, '#about')}
                        className="cursor-target cursor-none hover:text-electric-cyan transition-colors"
                    >
                        ABOUT
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => handleScroll(e, '#contact')}
                        className="cursor-target cursor-none hover:text-electric-cyan transition-colors"
                    >
                        CONTACT
                    </a>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 w-full">
                {children}
            </main>

            {/* Footer Placeholder */}
            <footer className="relative z-10 w-full py-8 text-center text-white/20 font-mono text-xs">
                © 2026 Vincensius Marcel Suhendar
            </footer>
        </div>
    );
};

export default Layout;
