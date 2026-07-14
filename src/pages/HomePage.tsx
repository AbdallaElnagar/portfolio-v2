import { useEffect, useState, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '../components/sections/HeroSection';
import { ScrollSpaceWrapper } from '../components/common/ScrollSpaceWrapper';
import { ProjectModal } from '../components/common/ProjectModal';
import { Project } from '../components/common/ProjectCard';

// Lazy load non-immediate sections to drastically reduce bundle size and speed up first paint
const AboutSection = lazy(() => import('../components/sections/AboutSection'));
const SkillsSection = lazy(() => import('../components/sections/SkillsSection'));
const ProjectsSection = lazy(() => import('../components/sections/ProjectsSection'));
const ExperienceSection = lazy(() => import('../components/sections/ExperienceSection'));
const ContactSection = lazy(() => import('../components/sections/ContactSection'));

const pageVariants = {
  initial: { opacity: 0, scale: 0.96, filter: 'blur(12px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 1.04, filter: 'blur(12px)', transition: { duration: 0.35, ease: 'easeInOut' } },
};

const HomePage = () => {
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    let scrollTimeout: any;
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        scrollTimeout = setTimeout(() => {
          const offset = 90; // Height of navbar
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }, 150);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [location]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-transparent"
    >
      {/* Landing entry starts immediately without distance scrolling */}
      <HeroSection />

      {/* Subsequent sections load via scroll camera wrapper within a Suspense boundary */}
      <Suspense fallback={null}>
        <ScrollSpaceWrapper>
          <AboutSection />
        </ScrollSpaceWrapper>

        <ScrollSpaceWrapper>
          <SkillsSection />
        </ScrollSpaceWrapper>

        <ScrollSpaceWrapper>
          <ProjectsSection onSelectProject={setSelectedProject} isModalOpen={selectedProject !== null} />
        </ScrollSpaceWrapper>

        <ScrollSpaceWrapper>
          <ExperienceSection />
        </ScrollSpaceWrapper>

        <ScrollSpaceWrapper>
          <ContactSection />
        </ScrollSpaceWrapper>
      </Suspense>

      {/* Fullscreen holographic modal rendered outside scroll transform traps */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.div>
  );
};

export default HomePage;
