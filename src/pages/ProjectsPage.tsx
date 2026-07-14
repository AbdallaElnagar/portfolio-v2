import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { projects } from '../data/portfolioData';
import ProjectCard, { Project } from '../components/common/ProjectCard';
import { ProjectModal } from '../components/common/ProjectModal';

const pageVariants = {
  initial: { opacity: 0, scale: 0.96, filter: 'blur(12px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 1.04, filter: 'blur(12px)', transition: { duration: 0.35, ease: 'easeInOut' } },
};

const ProjectsPage = () => {
  const [filter, setFilter] = useState('All');
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const animationControls = useRef<any>(null);

  const categories = ['All', 'Full Stack', 'Frontend', 'Featured'];
  const filteredProjects = filter === 'All' 
    ? projects 
    : filter === 'Featured'
    ? projects.filter(p => p.featured)
    : projects.filter(p => p.category === filter);

  // Triple-duplicate items for smooth continuous loop wrapping
  const marqueeProjects = [...filteredProjects, ...filteredProjects, ...filteredProjects];

  useEffect(() => {
    let active = true;
    if (!containerRef.current || filteredProjects.length === 0) return;

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

    if (!isPaused) {
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
  }, [isPaused, filteredProjects, x]);

  // Reset marquee scroll positions on category filter
  useEffect(() => {
    x.set(0);
  }, [filter, x]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-24 pb-20 min-h-screen bg-transparent relative z-10 flex flex-col justify-center"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 bg-transparent"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Galaxy <span className="gradient-text">Missions</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Explore the complete log coordinates of all full-stack applications and components.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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

        {/* Autonomous Infinite Horizontal Marquee Carousel */}
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
                  setIsPaused(true);
                  setSelectedProject(project as any);
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Holographic Spaceship Telemetry Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => {
          setSelectedProject(null);
          setIsPaused(false);
        }}
      />
    </motion.div>
  );
};

export default ProjectsPage;