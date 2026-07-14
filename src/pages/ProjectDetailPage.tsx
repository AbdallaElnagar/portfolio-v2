import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  AcademicCapIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline';
import { Terminal, Database, Server, Monitor, ShieldAlert } from 'lucide-react';

// Flow Diagram representing the system architecture
const ArchitectureDiagram = ({ project }: { project: any }) => {
  const hasDB = project.technologies.some((t: string) => /mongo|sql|postgres|database/i.test(t));
  const dbName = project.technologies.find((t: string) => /mongo|sql|postgres/i.test(t)) || 'Database';
  const hasBackend = project.technologies.some((t: string) => /node|express|api|django|flask|spring/i.test(t));
  const backendName = project.technologies.find((t: string) => /node|express|api/i.test(t)) || 'REST API';
  const frontendName = project.technologies.find((t: string) => /react|next|javascript|vue|angular/i.test(t)) || 'React App';

  return (
    <div className="glass-card p-6 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-md overflow-hidden relative">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-mono">SYSTEM CONNECTIONS TELEMETRY</span>
      </div>

      <div className="relative w-full overflow-x-auto py-4">
        <div className="min-w-[500px] flex items-center justify-between px-6 relative h-28">
          {/* Card 1: Client Node */}
          <div className="flex flex-col items-center z-10 w-32 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.1)]">
              <Monitor className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-[10px] text-white font-bold mt-2 uppercase tracking-widest font-mono">{frontendName}</span>
            <span className="text-[8px] text-gray-500 font-mono mt-0.5 uppercase">Presentation</span>
          </div>

          {/* SVG Connection Cable 1 */}
          <svg className="absolute top-[48%] left-0 w-full h-4 pointer-events-none z-0">
            <line x1="130" y1="2" x2="260" y2="2" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            <line
              x1="130"
              y1="2"
              x2="260"
              y2="2"
              stroke="url(#pulseGrad)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              className="animate-flow"
            />
          </svg>

          {/* Card 2: API Node */}
          {hasBackend ? (
            <div className="flex flex-col items-center z-10 w-32 text-center">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <Server className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-[10px] text-white font-bold mt-2 uppercase tracking-widest font-mono">{backendName}</span>
              <span className="text-[8px] text-gray-500 font-mono mt-0.5 uppercase">Gateway API</span>
            </div>
          ) : (
            <div className="flex flex-col items-center z-10 w-32 text-center opacity-40">
              <div className="w-12 h-12 rounded-xl bg-gray-500/10 border border-gray-500/20 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-widest font-mono">Static API</span>
            </div>
          )}

          {/* SVG Connection Cable 2 */}
          <svg className="absolute top-[48%] left-0 w-full h-4 pointer-events-none z-0">
            <line x1="290" y1="2" x2="420" y2="2" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            <line
              x1="290"
              y1="2"
              x2="420"
              y2="2"
              stroke="url(#pulseGrad)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              className="animate-flow"
            />
          </svg>

          {/* Card 3: Storage Node */}
          <div className="flex flex-col items-center z-10 w-32 text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.1)]">
              <Database className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-[10px] text-white font-bold mt-2 uppercase tracking-widest font-mono">{hasDB ? dbName : 'Local Cache'}</span>
            <span className="text-[8px] text-gray-500 font-mono mt-0.5 uppercase">Persistence</span>
          </div>

          {/* Definitions for Gradients */}
          <svg className="w-0 h-0 absolute">
            <defs>
              <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#1e40af" />
                <stop offset="100%" stopColor="#312e81" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white px-4">
        <div className="text-center max-w-md">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-6 animate-bounce" />
          <h1 className="text-3xl font-black mb-4">LOG RETRIEVAL ERROR</h1>
          <p className="text-gray-400 mb-8 font-mono text-xs tracking-widest uppercase">
            Requested coordinate record [id: {id}] is not found in the galaxy archives.
          </p>
          <Link to="/projects" className="btn-primary inline-flex items-center gap-2 rounded-xl uppercase text-xs tracking-widest font-mono">
            <ArrowLeftIcon className="w-4 h-4 text-dark-950" />
            Back to Missions
          </Link>
        </div>
      </div>
    );
  }

  const containerVariants = {
    initial: { opacity: 0, scale: 0.96, filter: 'blur(12px)' },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.04,
      filter: 'blur(12px)',
      transition: { duration: 0.35, ease: 'easeInOut' },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
      className="pt-28 pb-20 min-h-screen text-white relative z-10 bg-transparent"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Back link */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#38bdf8] transition-colors font-bold text-xs uppercase tracking-widest group font-mono"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Missions
          </Link>
        </motion.div>

        {/* Header telemetry brief */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="flex items-center gap-2 mb-3.5 flex-wrap">
            <span className="px-3.5 py-1 bg-primary/10 border border-primary/20 text-primary text-[9px] font-bold uppercase tracking-widest rounded-full font-mono">
              {project.category}
            </span>
            {project.badge && (
              <span className="px-3.5 py-1 bg-[#312e81]/15 border border-[#312e81]/40 text-[#e0f2fe] text-[9px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5 w-fit font-mono">
                <AcademicCapIcon className="w-3.5 h-3.5 text-primary" />
                {project.badge}
              </span>
            )}
            <span className="px-3.5 py-1 bg-white/5 border border-white/10 text-gray-400 text-[9px] font-bold uppercase tracking-widest rounded-full font-mono">
              COORDS: {project.id.toUpperCase()}-G2
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight leading-none text-white">
            Mission: {project.title}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            {project.shortDescription}
          </p>
        </motion.div>

        {/* Cinematic Main Screen Container */}
        <motion.div
          variants={itemVariants}
          className="relative h-[20rem] sm:h-[26rem] md:h-[32rem] rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.65)] group"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
          />
          {/* Glass dashboard cover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-[#1e40af]/5 pointer-events-none" />
        </motion.div>

        {/* Content Layout Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Detailed Telemetry logs */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <motion.section variants={itemVariants} className="space-y-4">
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest text-white border-b border-white/5 pb-3 font-mono">
                Mission Objectives
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line font-normal">
                {project.longDescription}
              </p>
            </motion.section>

            {/* System Architecture Diagram */}
            <motion.section variants={itemVariants} className="space-y-4">
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest text-white border-b border-white/5 pb-3 font-mono">
                System Topology
              </h2>
              <ArchitectureDiagram project={project} />
            </motion.section>

            {/* Features log */}
            <motion.section variants={itemVariants} className="space-y-4">
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest text-white border-b border-white/5 pb-3 font-mono">
                Operational Highlights
              </h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 bg-black/40 border border-white/5 rounded-2xl p-4 hover:border-primary/30 transition-all duration-300"
                  >
                    <CheckIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-xs leading-relaxed font-normal">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Engineering challenges & solutions */}
            <motion.section variants={itemVariants} className="space-y-6">
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest text-white border-b border-white/5 pb-3 font-mono">
                Challenges & Solutions
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Challenge */}
                <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-3xl p-6 relative overflow-hidden group hover:border-yellow-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-xl">
                      <ExclamationTriangleIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-yellow-500 font-mono">Anomaly Encountered</h3>
                  </div>
                  <ul className="space-y-3">
                    {project.challenges.map((challenge, idx) => (
                      <li key={idx} className="text-gray-300 text-xs leading-relaxed flex items-start gap-2.5">
                        <span className="text-yellow-500 shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500" />
                        <span className="font-normal">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solution */}
                <div className="bg-green-500/5 border border-green-500/10 rounded-3xl p-6 relative overflow-hidden group hover:border-green-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500/10 text-green-500 rounded-xl">
                      <LightBulbIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-green-500 font-mono">Action Resolution</h3>
                  </div>
                  <ul className="space-y-3">
                    {project.solutions.map((solution, idx) => (
                      <li key={idx} className="text-gray-300 text-xs leading-relaxed flex items-start gap-2.5">
                        <span className="text-green-500 shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="font-normal">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Right Column: Console Details */}
          <div className="space-y-8">
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 md:p-8 space-y-6 border border-white/10 rounded-3xl"
            >
              <div className="flex items-center gap-2 pb-4 border-b border-white/5">
                <CpuChipIcon className="w-5.5 h-5.5 text-primary" />
                <h3 className="text-base font-bold uppercase tracking-widest text-white font-mono">
                  Mission Data
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1 font-mono">
                    System Category
                  </div>
                  <div className="text-white font-bold text-xs uppercase tracking-widest font-mono">{project.category}</div>
                </div>

                {project.badge && (
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1 font-mono">
                      Mission Type
                    </div>
                    <div className="text-white font-bold text-xs uppercase tracking-widest font-mono">{project.badge}</div>
                  </div>
                )}

                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1 font-mono">
                    Purpose
                  </div>
                  <div className="text-white font-bold text-xs uppercase tracking-widest font-mono">
                    {project.badge ? 'Training Program / Core Skill' : 'Production-Ready Sandbox'}
                  </div>
                </div>
              </div>

              {/* Stack items */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold font-mono">
                  Technologies Engine
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 text-[10px] font-mono font-bold tracking-wide rounded-xl border border-white/5 hover:border-primary/30 transition-all duration-300 uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-6 border-t border-white/5">
                {project.liveDemo && (
                  <motion.a
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/45 rounded-xl font-mono"
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 text-dark-950" />
                    Launch Sector
                  </motion.a>
                )}

                {project.github && !project.frontendRepo && !project.backendRepo && (
                  <motion.a
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-outline py-3.5 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest rounded-xl font-mono"
                  >
                    <CodeBracketIcon className="w-4 h-4" />
                    Source Payload
                  </motion.a>
                )}

                {project.frontendRepo && (
                  <motion.a
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.frontendRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-outline py-3.5 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest rounded-xl font-mono"
                  >
                    <CodeBracketIcon className="w-4 h-4" />
                    Client Payload
                  </motion.a>
                )}

                {project.backendRepo && (
                  <motion.a
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.backendRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-outline py-3.5 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest rounded-xl font-mono"
                  >
                    <CodeBracketIcon className="w-4 h-4" />
                    Backend Payload
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetailPage;