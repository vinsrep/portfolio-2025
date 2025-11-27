import Layout from './components/ui/Layout';
import Section from './components/ui/Section';
import CanvasContainer from './components/canvas/CanvasContainer';
import Starfield from './components/canvas/Starfield';
import Hero3D from './components/canvas/Hero3D';
import ProjectCard from './components/ui/ProjectCard';
import TabbedProfile from './components/ui/TabbedProfile';
import TextReveal from './components/ui/TextReveal';
import TiltedCard from './components/ui/TiltedCard';
import TargetCursor from './components/anim/TargetCursor';
import SmoothScroll from './components/ui/SmoothScroll';
import AudioController from './components/audio/AudioController';
import ContactTerminal from './components/ui/ContactTerminal';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS = [
  {
    title: "Jagoscript.com",
    description: "Explore code from the most talented and accomplished developers in Jagoscript's developer platform.",
    tags: ['Laravel', 'PHP', 'Tailwind', 'PostgreSQL'],
    image: '/assets/pictures/project/platform.png'
  },
  {
    title: "PIU Purchasing Web",
    description: "Internal purchasing web project for PIU.",
    tags: ['Laravel', 'PHP', 'Tailwind', 'PostgreSQL'],
    image: '/assets/pictures/project/piu.png'
  },
  {
    title: "otakQu - Erudite",
    description: "AI Chatbot front-end using Python & model tuning using Unsloth AI Google Colab.",
    tags: ['Python', 'Huggingface', 'Google Colab', 'React'],
    image: '/assets/pictures/project/otakqu.jpg'
  },
  {
    title: "Portfolio 2026",
    description: "The very portfolio you are looking at right now. Built with React and Three.js.",
    tags: ['React', 'Three.js', 'Tailwind', 'Framer Motion'],
    image: '/assets/pictures/project/portfolio.png'
  },
  {
    title: "Jagoscript Digital Goods",
    description: "The premier platform for purchasing digital goods provided by Jagoscript - from coding lessons, illustration courses, etc.",
    tags: ['Laravel', 'PHP', 'Tailwind', 'MySQL'],
    image: '/assets/pictures/project/digigoods.jpg'
  },
  {
    title: "Jagoscript LMS",
    description: "Learning Management System for Jagoscript.",
    tags: ['React', 'Node.js', 'Tailwind', 'MySQL'],
    image: '/assets/pictures/project/lms.jpg'
  },
  {
    title: "Sanity",
    description: "prototype FPS horror game made for Global Game Jam 2025 using Unity",
    tags: ['C#', 'Unity'],
    image: '/assets/pictures/project/sanity.jpg'
  },
  {
    title: "Graduation Website",
    description: "Website for SMK Wikrama 26th generation's graduation.",
    tags: ['React', 'Tailwind', 'PostgreSQL', 'Node.js'],
    image: '/assets/pictures/project/grad.jpg'
  }
];

const ITEMS_PER_PAGE = 4;

function App() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(PROJECTS.length / ITEMS_PER_PAGE);
  const currentProjects = PROJECTS.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <SmoothScroll>
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      <CanvasContainer>
        <Starfield />
        <Hero3D />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
      </CanvasContainer>

      <Layout>
        <Section id="hero" className="items-start">
          <h1 className="cursor-target text-5xl md:text-8xl font-heading font-bold leading-tight">
            <TextReveal text="BUILDING" delay={0.1} />
            <span className="cursor-target text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-neon-purple block">
              <TextReveal text="THE FUTURE" delay={0.2} />
            </span>
          </h1>
          <p className="cursor-target mt-6 text-lg md:text-xl text-white/60 max-w-lg">
            Professional Developer & Backend Expert crafting immersive digital experiences.
          </p>
        </Section>

        <Section id="work">
          <h2 className="text-4xl font-heading mb-10">SELECTED WORK</h2>

          <div className="min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {currentProjects.map((project, index) => (
                  <TiltedCard key={`${currentPage}-${index}`}>
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      tags={project.tags}
                      image={project.image}
                    />
                  </TiltedCard>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <button
              onClick={() => {
                setCurrentPage(prev => Math.max(0, prev - 1));
                (window as any).playHoverSound?.();
              }}
              disabled={currentPage === 0}
              className={`cursor-target cursor-none px-6 py-2 rounded-full border border-electric-cyan/30 text-electric-cyan font-mono transition-all ${currentPage === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-electric-cyan/10 hover:border-electric-cyan cursor-pointer'
                }`}
            >
              &lt; PREV
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentPage ? 'bg-electric-cyan w-4' : 'bg-white/20'
                    }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
                (window as any).playHoverSound?.();
              }}
              disabled={currentPage === totalPages - 1}
              className={`cursor-target cursor-none px-6 py-2 rounded-full border border-electric-cyan/30 text-electric-cyan font-mono transition-all ${currentPage === totalPages - 1
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-electric-cyan/10 hover:border-electric-cyan cursor-pointer'
                }`}
            >
              NEXT &gt;
            </button>
          </div>
        </Section>

        <Section id="about">
          <div className="flex flex-col items-center">
            <h2 className="cursor-target text-4xl font-heading mb-10">ABOUT ME</h2>
            <TabbedProfile />
          </div>
        </Section>

        <Section id="contact" className="items-center text-center">
          <h2 className="cursor-target text-5xl md:text-7xl font-heading font-bold mb-8">
            READY TO <br />
            <span className="cursor-target text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-neon-purple">
              LAUNCH?
            </span>
          </h2>
          <p className="cursor-target text-xl text-white/60 mb-10 max-w-2xl">
            Whether you have a groundbreaking idea or just want to say hi, my comms channels are open.
          </p>

          {!showTerminal ? (
            <button
              onClick={() => {
                setShowTerminal(true);
                (window as any).playHoverSound?.();
              }}
              onMouseEnter={() => (window as any).playHoverSound?.()}
              className="cursor-target cursor-none group relative px-8 py-4 bg-white text-void-black font-bold text-lg rounded-full overflow-hidden hover:scale-105 transition-transform"
            >
              <span className="relative z-10">INITIATE TRANSMISSION</span>
              <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <ContactTerminal />
            </motion.div>
          )}
        </Section>
      </Layout>
      <AudioController />
    </SmoothScroll>
  );
}

export default App;
