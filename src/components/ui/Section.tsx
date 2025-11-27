import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
}

const Section: React.FC<SectionProps> = ({ children, id, className = '' }) => {
    return (
        <section id={id} className={`w-full min-h-screen flex flex-col justify-center px-6 md:px-20 py-20 ${className}`}>
            {children}
        </section>
    );
};

export default Section;
