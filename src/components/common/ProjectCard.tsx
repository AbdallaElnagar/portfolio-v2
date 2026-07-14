import { motion } from 'framer-motion';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  images: string[];
  technologies: string[];
  features: string[];
  challenges: string[];
  solutions: string[];
  github: string;
  frontendRepo: string | null;
  backendRepo: string | null;
  liveDemo: string;
  category: string;
  featured: boolean;
  badge: string | null;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
  onClick?: () => void;
}

export default function ProjectCard({ project, index = 0, onClick }: ProjectCardProps) {
  const floatDuration = 4 + (index % 3) * 1.2;
  const floatDelay = (index % 4) * 0.3;

  return (
    <div className="flex flex-col items-center select-none bg-transparent py-4 shrink-0">
      {/* Floating Node */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{
          duration: floatDuration,
          delay: floatDelay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        onClick={onClick}
        className="relative cursor-pointer group flex flex-col items-center"
      >
        {/* Sharp Cyber Cyan thin tilted orbital ring */}
        <div className="absolute border border-cyan-400/35 rounded-full w-[136%] h-[32%] top-[34%] -left-[18%] rotate-[-10deg] pointer-events-none z-0 group-hover:border-cyan-400/70 group-hover:scale-102 transition-all duration-500" />
        
        {/* Orbiting dust particle */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10 + index * 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-x-0 w-full h-full"
          >
            <span className="absolute top-[12%] left-[18%] w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          </motion.div>
        </div>

        {/* Planet Core Sphere */}
        <div className="relative aspect-square w-40 h-40 rounded-full overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(6,182,212,0.05)] border border-white/10 bg-black z-10 transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-400/60 group-hover:shadow-cyber">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-full"
          />

          {/* Atmospherical reflection */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/10 shadow-[inset_12px_-12px_25px_rgba(0,0,0,0.95),inset_-8px_8px_30px_rgba(255,255,255,0.05)] pointer-events-none z-15" />
          
          {/* Inner atmospheric pulse */}
          <div className="absolute -inset-0.5 rounded-full border border-cyan-400/10 bg-transparent blur-[0.5px] pointer-events-none group-hover:border-cyan-400/40 transition-colors duration-500 z-20 animate-pulse" />
        </div>

        {/* Info Telemetry Label */}
        <div className="mt-5 flex flex-col items-center text-center">
          <span className="text-xs font-bold uppercase tracking-wider font-mono text-[#e0f2fe] group-hover:text-cyan-400 transition-colors duration-300">
            {project.title.split(' – ')[0]}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
