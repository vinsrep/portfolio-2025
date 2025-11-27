import React from 'react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    image?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tags, image }) => {
    return (
        <motion.div
            whileHover={{ y: -1 }}
            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-electric-cyan/50 transition-all duration-300"
        >
            {/* Image Placeholder or Actual Image */}
            <div className="h-48 w-full backdrop-blur-lg bg-midnight-blue/50 relative overflow-hidden">
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-4xl">
                        {title[0]}
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-void-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6">
                <h3 className="text-2xl font-bold font-heading mb-2 group-hover:text-electric-cyan transition-colors">
                    {title}
                </h3>
                <p className="text-white/60 mb-4 line-clamp-2">
                    {description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-electric-cyan/80">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-electric-cyan to-neon-purple opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300 -z-10" />
        </motion.div>
    );
};

export default ProjectCard;
