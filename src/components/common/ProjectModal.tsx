import { motion, AnimatePresence } from 'framer-motion';
import { Project } from './ProjectCard';
import {
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  AcademicCapIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline';
import { Monitor, Server, Database, Terminal } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

// Flow Diagram representing the system architecture
const ArchitectureDiagram = ({ project }: { project: Project }) => {
  const hasDB = project.technologies.some((t: string) => /mongo|sql|postgres|database/i.test(t));
  const dbName = project.technologies.find((t: string) => /mongo|sql|postgres/i.test(t)) || 'Database';
  const hasBackend = project.technologies.some((t: string) => /node|express|api|django|flask|spring/i.test(t));
  const backendName = project.technologies.find((t: string) => /node|express|api/i.test(t)) || 'REST API';
  const frontendName = project.technologies.find((t: string) => /react|next|javascript|vue|angular/i.test(t)) || 'React App';

  return (
    <div className="p-5 rounded-2xl border border-white/5 bg-black/50 backdrop-blur-md overflow-hidden relative">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest font-mono">SYSTEM CONNECTIONS TELEMETRY</span>
      </div>

      <div className="relative w-full overflow-x-auto py-2">
        <div className="min-w-[420px] flex items-center justify-between px-4 relative h-24">
          {/* Card 1: Client Node */}
          <div className="flex flex-col items-center z-10 w-28 text-center">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <Monitor className="w-4.5 h-4.5 text-cyan-400" />
            </div>
            <span className="text-[9px] text-white font-bold mt-2 uppercase tracking-widest font-mono truncate max-w-full">{frontendName}</span>
            <span className="text-[7px] text-gray-500 font-mono mt-0.5 uppercase">Presentation</span>
          </div>

          {/* SVG Connection Cable 1 */}
          <svg className="absolute top-[45%] left-0 w-full h-3 pointer-events-none z-0">
            <line x1="110" y1="2" x2="210" y2="2" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line
              x1="110"
              y1="2"
              x2="210"
              y2="2"
              stroke="url(#pulseGradModal)"
              strokeWidth="1"
              strokeDasharray="5 7"
              className="animate-flow"
            />
          </svg>

          {/* Card 2: API Node */}
          {hasBackend ? (
            <div className="flex flex-col items-center z-10 w-28 text-center">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <Server className="w-4.5 h-4.5 text-green-400" />
              </div>
              <span className="text-[9px] text-white font-bold mt-2 uppercase tracking-widest font-mono truncate max-w-full">{backendName}</span>
              <span className="text-[7px] text-gray-500 font-mono mt-0.5 uppercase">Gateway API</span>
            </div>
          ) : (
            <div className="flex flex-col items-center z-10 w-28 text-center opacity-30">
              <div className="w-10 h-10 rounded-xl bg-gray-500/10 border border-gray-500/20 flex items-center justify-center">
                <Terminal className="w-4.5 h-4.5 text-gray-400" />
              </div>
              <span className="text-[9px] text-gray-500 font-bold mt-2 uppercase tracking-widest font-mono">Static API</span>
            </div>
          )}

          {/* SVG Connection Cable 2 */}
          <svg className="absolute top-[45%] left-0 w-full h-3 pointer-events-none z-0">
            <line x1="230" y1="2" x2="330" y2="2" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line
              x1="230"
              y1="2"
              x2="330"
              y2="2"
              stroke="url(#pulseGradModal)"
              strokeWidth="1"
              strokeDasharray="5 7"
              className="animate-flow"
            />
          </svg>

          {/* Card 3: Storage Node */}
          <div className="flex flex-col items-center z-10 w-28 text-center">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.1)]">
              <Database className="w-4.5 h-4.5 text-purple-400" />
            </div>
            <span className="text-[9px] text-white font-bold mt-2 uppercase tracking-widest font-mono truncate max-w-full">{hasDB ? dbName : 'Local Cache'}</span>
            <span className="text-[7px] text-gray-500 font-mono mt-0.5 uppercase">Persistence</span>
          </div>

          <svg className="w-0 h-0 absolute">
            <defs>
              <linearGradient id="pulseGradModal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#1e40af" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  // Prevent body scroll when open
  if (typeof window !== 'undefined') {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }

  const handleModalClose = () => {
    document.body.style.overflow = 'unset';
    onClose();
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
            className="fixed inset-0 bg-[#000000]/95 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="relative w-full max-w-5xl bg-black/90 border border-cyan-500/20 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.15)] flex flex-col max-h-[85vh] z-10"
          >
            {/* Horizontal scanline overlay */}
            <div className="absolute inset-x-0 w-full h-[1px] bg-cyan-500/10 pointer-events-none laser-scan z-10" />

            {/* Header dashboard console */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-black/40 relative z-20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest font-mono">
                  SPACESHIP SYSTEM TELEMETRY // SECTOR: {project.id}-G2
                </span>
              </div>
              <button
                onClick={handleModalClose}
                className="p-1.5 rounded-lg border border-white/10 hover:border-cyan-500/40 text-gray-400 hover:text-white transition-all hover:bg-cyan-500/5 font-mono text-[10px] flex items-center gap-1 uppercase"
              >
                <XMarkIcon className="w-4 h-4" />
                <span>Exit Log</span>
              </button>
            </div>

            {/* Scrollable readout container */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 relative z-20">
              {/* Header Titles */}
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap font-mono">
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-[9px] font-bold uppercase tracking-widest rounded-full">
                    {project.category}
                  </span>
                  {project.badge && (
                    <span className="px-3 py-1 bg-[#312e81]/20 border border-[#312e81]/50 text-[#e0f2fe] text-[9px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1">
                      <AcademicCapIcon className="w-3.5 h-3.5 text-cyan-400" />
                      {project.badge}
                    </span>
                  )}
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Mission: {project.title}
                </h2>
              </div>

              {/* Layout splits */}
              <div className="grid md:grid-cols-3 gap-8">
                {/* Left/Mid Columns */}
                <div className="md:col-span-2 space-y-8">
                  {/* Detailed Description */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
                      Mission Objectives
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed font-normal">
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Architecture Diagram */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
                      System Topology Connection
                    </h3>
                    <ArchitectureDiagram project={project} />
                  </div>

                  {/* Highlights */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
                      Operational Highlights
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      {project.features.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 bg-white/5 border border-white/5 rounded-xl p-3"
                        >
                          <CheckIcon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-400 leading-relaxed font-normal">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Challenges & Solutions */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Challenge */}
                    <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-2xl p-5 space-y-2">
                      <div className="flex items-center gap-2 text-yellow-500">
                        <ExclamationTriangleIcon className="w-4.5 h-4.5" />
                        <h4 className="text-[10px] font-bold uppercase tracking-widest font-mono">Anomaly Encountered</h4>
                      </div>
                      <ul className="space-y-2 text-xs text-gray-300 font-normal">
                        {project.challenges.map((c, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0 mt-1.5" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solution */}
                    <div className="bg-green-500/5 border border-green-500/10 rounded-2xl p-5 space-y-2">
                      <div className="flex items-center gap-2 text-green-400">
                        <LightBulbIcon className="w-4.5 h-4.5" />
                        <h4 className="text-[10px] font-bold uppercase tracking-widest font-mono">Action Resolution</h4>
                      </div>
                      <ul className="space-y-2 text-xs text-gray-300 font-normal">
                        {project.solutions.map((s, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 mt-1.5" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right Column details */}
                <div className="space-y-6">
                  {/* Image Cover */}
                  <div className="relative aspect-video sm:aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Engine Technologies */}
                  <div className="glass-card p-5 border border-white/5 rounded-2xl space-y-4 bg-black/30">
                    <div className="flex items-center gap-2 pb-2.5 border-b border-white/5">
                      <CpuChipIcon className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-white font-mono">
                        Engine Stack
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/5 text-gray-400 border border-white/5 rounded-lg text-[9px] font-mono font-bold uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Launch Controls */}
                  <div className="space-y-2.5">
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/35 rounded-xl font-mono text-dark-950 bg-cyan-400 hover:bg-cyan-350"
                      >
                        <ArrowTopRightOnSquareIcon className="w-4 h-4 text-dark-950" />
                        Launch System
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full btn-outline py-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest rounded-xl font-mono text-cyan-400 hover:text-white"
                      >
                        <CodeBracketIcon className="w-4 h-4" />
                        Payload Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
