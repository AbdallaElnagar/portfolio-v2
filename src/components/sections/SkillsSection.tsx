import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../../data/portfolioData';
import { useState } from 'react';
import { Monitor, Server, Database, Terminal, Cpu } from 'lucide-react';

const iconMap: Record<string, any> = {
  Frontend: Monitor,
  Backend: Server,
  DevOps: Terminal,
  Databases: Database,
};



const planetDescriptions: Record<string, string> = {
  Frontend: 'Client presentation systems, custom components, responsive grids, and spring-based layouts.',
  Backend: 'Secure REST controllers, micro-service routes, secure tokens, and event triggers.',
  Databases: 'Data schemas, query planning, indexing, and high-integrity storage clusters.',
  DevOps: 'Linux operations, container virtualization, automated workflows, and cloud environments.',
};

const auxiliaryTools = [
  'Vite',
  'Axios',
  'Mongoose',
  'bcrypt',
  'CORS',
  'Nodemon',
  'Figma',
  'Postman',
  'VS Code',
  'Chrome DevTools',
];

const SkillsSection = () => {
  const [activePlanet, setActivePlanet] = useState<string>('Frontend');
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'core' | 'aux'>('core');

  const activeCategory = (skills.find((c) => c.category === activePlanet) || skills[0])!;

  return (
    <section id="skills" className="py-24 md:py-36 relative overflow-hidden bg-transparent">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#312e81]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Technology <span className="gradient-text font-black">Galaxy</span>
          </h2>
          <p className="font-mono text-xs text-cyan-400/80 tracking-widest max-w-2xl mx-auto uppercase">
            // SELECT SYSTEM NODES TO QUERY STACK TELEMETRY & ACTIVE LIFECYCLE.
          </p>
        </motion.div>

        {/* Desktop Interactive Galaxy Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-16 max-w-6xl mx-auto items-center">
          
          {/* Left Column (3 cols): 2D Interactive Galaxy Map */}
          <div className="lg:col-span-3 flex justify-center items-center relative aspect-square w-full max-w-[420px] mx-auto border border-white/5 rounded-full p-8 bg-black/10 backdrop-blur-sm">
            
            {/* Concentric Orbital Rings - Elegant Faint SVG Dashed Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
              {/* Outer orbit circle passing through the center of all four planets */}
              <circle
                cx="50"
                cy="50"
                r="40.08"
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
                strokeDasharray="2 3"
              />
              {/* Mid orbit circle */}
              <circle
                cx="50"
                cy="50"
                r="28"
                fill="none"
                stroke="rgba(6, 182, 212, 0.03)"
                strokeWidth="0.5"
                strokeDasharray="1.5 2"
                className="animate-[spin_90s_linear_infinite]"
                style={{ transformOrigin: 'center' }}
              />
              {/* Inner orbit circle */}
              <circle
                cx="50"
                cy="50"
                r="16"
                fill="none"
                stroke="rgba(255, 255, 255, 0.03)"
                strokeWidth="0.5"
                strokeDasharray="1 1.5"
                className="animate-[spin_45s_linear_infinite_reverse]"
                style={{ transformOrigin: 'center' }}
              />
            </svg>

            {/* Central Core: Software Engineering Core (Star) */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  boxShadow: [
                    '0 0 25px rgba(56, 189, 248, 0.2)',
                    '0 0 40px rgba(49, 46, 129, 0.5)',
                    '0 0 25px rgba(56, 189, 248, 0.2)',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-950 flex items-center justify-center border border-white/10"
              >
                <Cpu className="w-8 h-8 text-white animate-pulse" />
              </motion.div>
              <div className="absolute -bottom-9 w-32 text-[9px] font-bold text-cyan-500/70 uppercase tracking-widest font-mono">
                ENGINEERING CORE
              </div>
            </div>

            {/* Orbiting Planet 1: Frontend (Top-Left) */}
            <div style={{ top: '15%', left: '15%' }} className="absolute z-20">
              <button
                onClick={() => setActivePlanet('Frontend')}
                onMouseEnter={() => setHoveredPlanet('Frontend')}
                onMouseLeave={() => setHoveredPlanet(null)}
                className={`relative group w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  activePlanet === 'Frontend'
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-110'
                    : 'bg-black/80 border-white/10 hover:border-cyan-400 hover:bg-cyan-950/20'
                }`}
              >
                {(activePlanet === 'Frontend' || hoveredPlanet === 'Frontend') && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping pointer-events-none" />
                    <span className="absolute -inset-1 rounded-full bg-cyan-400/15 animate-pulse pointer-events-none" />
                  </>
                )}
                <Monitor className="w-5 h-5 text-cyan-400" />
                <span className="absolute -bottom-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 font-mono whitespace-nowrap">
                  Frontend
                </span>
              </button>
            </div>

            {/* Orbiting Planet 2: Backend (Top-Right) */}
            <div style={{ top: '15%', right: '15%' }} className="absolute z-20">
              <button
                onClick={() => setActivePlanet('Backend')}
                onMouseEnter={() => setHoveredPlanet('Backend')}
                onMouseLeave={() => setHoveredPlanet(null)}
                className={`relative group w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  activePlanet === 'Backend'
                    ? 'bg-emerald-500/20 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-110'
                    : 'bg-black/80 border-white/10 hover:border-emerald-400 hover:bg-emerald-950/20'
                }`}
              >
                {(activePlanet === 'Backend' || hoveredPlanet === 'Backend') && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
                    <span className="absolute -inset-1 rounded-full bg-emerald-400/15 animate-pulse pointer-events-none" />
                  </>
                )}
                <Server className="w-5 h-5 text-emerald-400" />
                <span className="absolute -bottom-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 font-mono whitespace-nowrap">
                  Backend
                </span>
              </button>
            </div>

            {/* Orbiting Planet 3: Databases (Bottom-Left) */}
            <div style={{ bottom: '15%', left: '15%' }} className="absolute z-20">
              <button
                onClick={() => setActivePlanet('Databases')}
                onMouseEnter={() => setHoveredPlanet('Databases')}
                onMouseLeave={() => setHoveredPlanet(null)}
                className={`relative group w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  activePlanet === 'Databases'
                    ? 'bg-purple-500/20 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)] scale-110'
                    : 'bg-black/80 border-white/10 hover:border-purple-400 hover:bg-purple-950/20'
                }`}
              >
                {(activePlanet === 'Databases' || hoveredPlanet === 'Databases') && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-purple-400/30 animate-ping pointer-events-none" />
                    <span className="absolute -inset-1 rounded-full bg-purple-400/15 animate-pulse pointer-events-none" />
                  </>
                )}
                <Database className="w-5 h-5 text-purple-400" />
                <span className="absolute -bottom-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 font-mono whitespace-nowrap">
                  Databases
                </span>
              </button>
            </div>

            {/* Orbiting Planet 4: DevOps (Bottom-Right) */}
            <div style={{ bottom: '15%', right: '15%' }} className="absolute z-20">
              <button
                onClick={() => setActivePlanet('DevOps')}
                onMouseEnter={() => setHoveredPlanet('DevOps')}
                onMouseLeave={() => setHoveredPlanet(null)}
                className={`relative group w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  activePlanet === 'DevOps'
                    ? 'bg-pink-500/20 border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.5)] scale-110'
                    : 'bg-black/80 border-white/10 hover:border-pink-400 hover:bg-pink-950/20'
                }`}
              >
                {(activePlanet === 'DevOps' || hoveredPlanet === 'DevOps') && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-pink-400/30 animate-ping pointer-events-none" />
                    <span className="absolute -inset-1 rounded-full bg-pink-400/15 animate-pulse pointer-events-none" />
                  </>
                )}
                <Terminal className="w-5 h-5 text-pink-400" />
                <span className="absolute -bottom-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 font-mono whitespace-nowrap">
                  DevOps
                </span>
              </button>
            </div>

          </div>

          {/* Right Column (2 cols): Holographic Telemetry Deck */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden h-[460px] flex flex-col justify-between">
              
              {/* Holographic scanning line overlay */}
              <div className="absolute inset-x-0 w-full h-[1px] bg-cyan-400/20 pointer-events-none laser-scan" />

              {/* Ambient active color radial light */}
              <div className={`absolute top-0 right-0 w-44 h-44 rounded-full blur-3xl opacity-15 bg-cyan-500/10`} />

              {/* Card header */}
              <div className="flex items-center gap-4 mb-4 pb-3 border-b border-white/5 relative z-10">
                <div className={`p-2.5 border rounded-xl border-cyan-500/30 bg-cyan-500/10`}>
                  {(() => {
                    const Icon = iconMap[activePlanet] || Cpu;
                    return <Icon className="w-6 h-6 text-cyan-400" />;
                  })()}
                </div>
                <div>
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest font-mono">SYSTEM ORBIT ACTIVE</span>
                  <h3 className="text-2xl font-black text-glow-cyan uppercase tracking-wider">{activePlanet}</h3>
                </div>
              </div>

              {/* Subtitle brief */}
              <p className="text-xs text-gray-400 leading-relaxed font-normal mb-4 relative z-10 h-10 overflow-hidden">
                {planetDescriptions[activePlanet]}
              </p>

              {/* Content Panel Area */}
              <div className="flex-1 relative overflow-y-auto pr-1">
                <AnimatePresence mode="wait">
                  {viewMode === 'core' ? (
                    <motion.div
                      key={`${activePlanet}-core`}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-2 gap-3"
                    >
                      {activeCategory.skills.map((skill, index) => {
                        const isEven = index % 2 === 0;
                        return (
                          <motion.div
                            key={skill}
                            whileHover={{ scale: 1.02, borderColor: 'rgba(34, 211, 238, 0.4)' }}
                            className="flex items-center gap-3 px-3 py-3 bg-black/30 border border-cyan-500/10 rounded-xl font-mono text-xs tracking-wider text-cyan-100/90 transition-all duration-300 cursor-default"
                          >
                            <span 
                              className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                                isEven ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]' : 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
                              }`}
                            />
                            <span>{skill}</span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="aux"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-2 gap-3"
                    >
                      {auxiliaryTools.map((tool, index) => {
                        const isEven = index % 2 === 0;
                        return (
                          <motion.div
                            key={tool}
                            whileHover={{ scale: 1.02, borderColor: 'rgba(34, 211, 238, 0.4)' }}
                            className="flex items-center gap-3 px-3 py-3 bg-black/30 border border-cyan-500/10 rounded-xl font-mono text-xs tracking-wider text-cyan-100/90 transition-all duration-300 cursor-default"
                          >
                            <span 
                              className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                                isEven ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]' : 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
                              }`}
                            />
                            <span>{tool}</span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Spaceship Control Console Buttons */}
              <div className="flex gap-3 mt-4 pt-3 border-t border-white/5 relative z-10">
                <button
                  onClick={() => setViewMode('core')}
                  className={`flex-1 py-2.5 rounded-xl font-mono text-[10px] uppercase tracking-widest border transition-all duration-300 ${
                    viewMode === 'core'
                      ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)] font-bold'
                      : 'bg-black/20 border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/10'
                  }`}
                >
                  [ CORE SYSTEM ]
                </button>
                <button
                  onClick={() => setViewMode('aux')}
                  className={`flex-1 py-2.5 rounded-xl font-mono text-[10px] uppercase tracking-widest border transition-all duration-300 ${
                    viewMode === 'aux'
                      ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)] font-bold'
                      : 'bg-black/20 border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/10'
                  }`}
                >
                  [ AUXILIARY DECK ]
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Mobile / Tablet Accordion Layout */}
        <div className="lg:hidden max-w-2xl mx-auto space-y-4">
          {skills.map((category) => {
            const Icon = iconMap[category.category] || Cpu;
            const isOpen = activePlanet === category.category;
            
            return (
              <div
                key={category.category}
                className="glass-card border border-white/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActivePlanet(isOpen ? '' : category.category)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="font-bold text-white uppercase text-sm tracking-widest font-mono">{category.category}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="text-cyan-400"
                  >
                    <Monitor className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/5 bg-black/40 px-5 pb-5 pt-4 space-y-4"
                    >
                      <p className="text-xs text-gray-400 leading-relaxed font-normal">
                        {planetDescriptions[category.category]}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {category.skills.map((skill, index) => {
                          const isEven = index % 2 === 0;
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-2 px-3 py-2 bg-black/30 border border-cyan-500/20 rounded-xl text-xs font-mono uppercase tracking-wider text-cyan-100/90"
                            >
                              <span 
                                className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                                  isEven ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]' : 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
                                }`}
                              />
                              <span>{skill}</span>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Auxiliary Systems for Mobile */}
          <div className="glass-card border border-white/5 overflow-hidden transition-all duration-300">
            <button
              onClick={() => setActivePlanet(activePlanet === 'Auxiliary' ? '' : 'Auxiliary')}
              className="w-full p-5 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="font-bold text-white uppercase text-sm tracking-widest font-mono">Auxiliary Systems</span>
              </div>
              <motion.div
                animate={{ rotate: activePlanet === 'Auxiliary' ? 180 : 0 }}
                className="text-cyan-400"
              >
                <Monitor className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence>
              {activePlanet === 'Auxiliary' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-white/5 bg-black/40 px-5 pb-5 pt-4 space-y-4"
                >
                  <p className="text-xs text-gray-400 leading-relaxed font-normal">
                    Supporting utilities, local engines, tooling, and database modeling extensions.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {auxiliaryTools.map((tool, index) => {
                      const isEven = index % 2 === 0;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-2 bg-black/30 border border-cyan-500/20 rounded-xl text-xs font-mono uppercase tracking-wider text-cyan-100/90"
                        >
                          <span 
                            className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                              isEven ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]' : 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
                            }`}
                          />
                          <span>{tool}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
