import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, animate } from 'framer-motion';
import { projects } from '../../data/portfolioData';
import ProjectCard, { Project } from '../common/ProjectCard';

interface ProjectsSectionProps {
  onSelectProject?: (project: Project) => void;
  isModalOpen?: boolean;
}

const ProjectsSection = ({ onSelectProject, isModalOpen = false }: ProjectsSectionProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const animationControls = useRef<any>(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Full Stack', 'Frontend', 'Featured'];
  const filteredProjects = filter === 'All' 
    ? projects 
    : filter === 'Featured'
    ? projects.filter(p => p.featured)
    : projects.filter(p => p.category === filter);

  // Triple-duplicate items for smooth continuous loop wrapping (only if we have enough items)
  const marqueeProjects = filteredProjects.length >= 3 
    ? [...filteredProjects, ...filteredProjects, ...filteredProjects]
    : filteredProjects;

  // Pause if hovered locally OR if the parent modal is open
  const shouldPause = isPaused || isModalOpen;

  useEffect(() => {
    let active = true;
    if (!containerRef.current || filteredProjects.length < 3) return;

    const singleSetWidth = containerRef.current.scrollWidth / 3;

    const startMarquee = () => {
      const currentX = x.get();
      const targetX = -singleSetWidth;

      if (currentX <= targetX) {
        x.set(0);
      }

      const remainingDistance = Math.abs(targetX - x.get());
      const baseDuration = 38; // Speed factor
      const duration = (remainingDistance / singleSetWidth) * baseDuration;

      animationControls.current = animate(x, targetX, {
        ease: 'linear',
        duration: duration,
        onComplete: () => {
          if (active) {
            x.set(0);
            startMarquee();
          }
        },
      });
    };

    if (!shouldPause) {
      startMarquee();
    } else {
      if (animationControls.current) {
        animationControls.current.stop();
      }
    }

    return () => {
      active = false;
      if (animationControls.current) {
        animationControls.current.stop();
      }
    };
  }, [shouldPause, filteredProjects, x]);

  // Reset marquee scroll positions on category filter
  useEffect(() => {
    x.set(0);
  }, [filter, x]);

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 bg-transparent">
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-12 bg-transparent"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Project <span className="gradient-text font-black">Constellations</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Discovering engineering system logs and active full-stack payloads drifting in orbit.
          </p>
        </motion.div>

        {/* Console Filter Selectors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-16 bg-black/40 border border-white/5 p-2 rounded-2xl max-w-md mx-auto backdrop-blur-md"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 font-mono ${
                filter === category
                  ? 'bg-[#06b6d4]/10 border border-[#06b6d4]/40 text-[#06b6d4] shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : 'bg-transparent text-gray-500 hover:text-white border border-transparent'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Project Cards Display */}
        {filteredProjects.length < 3 ? (
          <div className="flex flex-wrap justify-center gap-12 md:gap-16 py-6 bg-transparent">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project as any}
                index={idx}
                onClick={() => {
                  onSelectProject?.(project as any);
                }}
              />
            ))}
          </div>
        ) : (
          /* Autonomous Infinite Horizontal Marquee Carousel */
          <div 
            className="w-full overflow-hidden cursor-pointer py-6 relative bg-transparent"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Cosmic edge fading gradients */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

            <motion.div
              ref={containerRef}
              style={{ x }}
              className="flex gap-16 md:gap-24 w-max bg-transparent"
            >
              {marqueeProjects.map((project, idx) => (
                <ProjectCard
                  key={`${project.id}-${idx}`}
                  project={project as any}
                  index={idx}
                  onClick={() => {
                    onSelectProject?.(project as any);
                  }}
                />
              ))}
            </motion.div>
          </div>
        )}

        {/* Navigation to full archive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="text-center mt-20 bg-transparent"
        >
          <Link to="/projects" className="btn-outline px-8 py-4 inline-block text-xs font-bold uppercase tracking-widest font-mono text-cyan-400 hover:text-white">
            View All Sectors
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
