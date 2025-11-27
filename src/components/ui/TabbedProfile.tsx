import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'intro' | 'career' | 'education' | 'resume';

const TabbedProfile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('intro');

    const tabs: { id: Tab; label: string }[] = [
        { id: 'intro', label: 'INTRO' },
        { id: 'career', label: 'CAREER' },
        { id: 'education', label: 'EDUCATION' },
        { id: 'resume', label: 'RESUME' },
    ];

    const content = {
        intro: (
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 items-center h-full">
                <div className="space-y-4">
                    <h3 className="text-2xl font-heading font-bold text-electric-cyan">Hello, World.</h3>
                    <p className="text-white/80 leading-relaxed">
                        I'm a passionate developer with a love for useful and innovative projects.
                        My journey began with a curiosity for how things work, leading me to master the art of
                        data science and backend development.
                    </p>
                    <p className="text-white/80 leading-relaxed">
                        When I'm not coding, you can find me exploring virtual worlds, experimenting with generative machine learning,
                        or gazing at the stars.
                    </p>
                </div>
                {/* Vertical Image Slot */}
                <div className="h-64 md:h-full w-full bg-white/5 rounded-xl border border-white/10 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-void-black/80 to-transparent z-10" />
                    <img
                        src="public/assets/pictures/project-placeholder.jpg"
                        alt="Profile image"
                        className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300 group-hover:opacity-75"
                    />
                    {/* Scanline effect */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-cyan/5 to-transparent h-[200%] w-full animate-scanline pointer-events-none" />
                </div>
            </div>
        ),
        career: (
            <div className="space-y-6">
                <div className="border-l-2 border-white/10 pl-4">
                    <h4 className="text-xl font-bold text-white">Chief Technology Officer and Back-end Developer</h4>
                    <p className="text-electric-cyan text-sm mb-2">PT. Jagoscript Inovasi Digital | 2024 - Present</p>
                    <p className="text-white/70 text-sm">
                        Responsible in researching the latest tech and assisting in major projects. Streamlined CI/CD pipelines
                        and included pioneering technology.
                    </p>
                </div>
                <div className="border-l-2 border-white/10 pl-4">
                    <h4 className="text-xl font-bold text-white">Information Technology Web Developer</h4>
                    <p className="text-electric-cyan text-sm mb-2">ARGENTA Internship | Jan 2024 - Aug 2024</p>
                    <p className="text-white/70 text-sm">
                        Developed QUIZ web application for ARGENTA using Vue.js and Laravel Lumen.
                        Worked closely with the frontend team to ensure seamless integration.
                    </p>
                </div>
            </div>
        ),
        education: (
            <div className="space-y-6">
                <div className="border-l-2 border-white/10 pl-4">
                    <h4 className="text-xl font-bold text-white">Sistem Informasi (Management Information Systems)</h4>
                    <p className="text-electric-cyan text-sm mb-2">Institut Bisnis dan Informatika Kesatuan | 2025 - Present</p>
                    <p className="text-white/70 text-sm">
                        Focus on Data Science and web development.
                    </p>
                </div>
            </div>
        ),
        resume: (
            <div className="flex flex-col items-start space-y-4">
                <p className="text-white/80">
                    Download my full resume to see a detailed history of my experience and skills.
                </p>
                <a
                    href="public/assets/pdf/resume.pdf"
                    target="_blank"
                    className="cursor-none px-6 py-3 bg-electric-cyan/10 border border-electric-cyan text-electric-cyan font-mono rounded hover:bg-electric-cyan/20 transition-colors flex items-center gap-2"
                >
                    <span>DOWNLOAD PDF</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </a>
            </div>
        ),
    };

    return (
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[400px]">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 bg-black/20 p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        onMouseEnter={() => (window as any).playHoverSound?.()}
                        className={`cursor-target cursor-none px-4 py-3 text-left font-mono text-sm transition-all rounded ${activeTab === tab.id
                            ? 'bg-electric-cyan/10 text-electric-cyan border-l-2 border-electric-cyan'
                            : 'text-white/50 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="h-full"
                    >
                        {content[activeTab]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TabbedProfile;
