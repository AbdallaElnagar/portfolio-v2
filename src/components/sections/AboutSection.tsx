import { motion } from 'framer-motion';
import { personalInfo, stats } from '../../data/portfolioData';
import { Monitor, Server, Database, Cloud, Download, Cpu, Radio } from 'lucide-react';
import { useState, useEffect } from 'react';

const AboutSection = () => {
  // Angle state for the 3D orbital badge path
  const [angle, setAngle] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let animFrame: number;
    const tick = () => {
      setAngle((prev) => (prev + 0.4) % 360);
      animFrame = requestAnimationFrame(tick);
    };
    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Orbital badges list
  const badges = [
    { text: 'Full Stack', icon: <Monitor className="w-3.5 h-3.5" /> },
    { text: 'Backend Systems', icon: <Server className="w-3.5 h-3.5" /> },
    { text: 'Database Design', icon: <Database className="w-3.5 h-3.5" /> },
    { text: 'Cloud Arch', icon: <Cloud className="w-3.5 h-3.5" /> },
  ];

  return (
    <section id="about" className="py-24 md:py-36 relative overflow-hidden bg-transparent">
      {/* Cosmic background glows */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-cosmicBlue/15 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-nebulaPurple/15 rounded-full blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Engineer <span className="gradient-text">Planet</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Telemetry brief: Mapping the coordinates of the core interface and local system credentials.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
          {/* Left: 3D Orbiting Badges & Glass Profile Sphere */}
          <div className="flex justify-center items-center relative min-h-[25rem] sm:min-h-[30rem] lg:min-h-[32rem] order-2 lg:order-1 select-none">
            
            {/* Core Planet Glow */}
            <div className="absolute w-72 h-72 sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-tr from-primary/10 to-cosmicBlue/20 blur-3xl opacity-60 animate-pulse pointer-events-none" />

            {/* Profile Planet core */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[360px] lg:h-[360px] rounded-full z-20 flex items-center justify-center">
              
              {/* Planetary Atmosphere Ring */}
              <div 
                className="absolute w-[140%] h-[32%] border border-white/15 rounded-full pointer-events-none z-10"
                style={{
                  transform: 'rotate(-12deg) rotateX(72deg)',
                  boxShadow: '0 0 30px rgba(56, 189, 248, 0.08), inset 0 0 20px rgba(255, 255, 255, 0.03)',
                  background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.01) 0%, transparent 80%)'
                }}
              />

              {/* Main Planet Core containing image */}
              <div className="relative w-full h-full rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-[#38bdf8]/35 via-white/5 to-[#312e81]/35 shadow-[0_0_60px_rgba(56,189,248,0.2)] border border-white/10 backdrop-blur-md">
                <div className="w-full h-full rounded-full overflow-hidden relative group">
                  <img
                    src="/images/porfolio.webp"
                    alt="Abdalla Elnagar"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-transparent to-transparent opacity-90" />
                </div>
              </div>

              {/* 3D Orbiting Badge Node elements */}
              {badges.map((badge, idx) => {
                // Calculate radians offset by 90 degrees per index
                const radians = ((angle + idx * 90) * Math.PI) / 180;
                
                // Ellipse radius values matching the angled ring orientation, dynamically responsive
                let rx = 150; // horizontal spread
                let ry = 42;  // vertical depth spread (flat angle)
                if (windowWidth >= 1024) {
                  rx = 240;
                  ry = 66;
                } else if (windowWidth >= 768) {
                  rx = 205;
                  ry = 56;
                } else if (windowWidth >= 640) {
                  rx = 185;
                  ry = 50;
                }
                
                // Trigonometric translation coordinates
                const x = Math.cos(radians) * rx;
                const y = Math.sin(radians) * ry;
                
                // Depth coordinates: items at bottom (sin > 0) are in front, at top (sin < 0) are behind
                const scale = 0.82 + Math.sin(radians) * 0.12;
                const opacity = 0.6 + Math.sin(radians) * 0.4;
                const zIndex = Math.sin(radians) > 0 ? 30 : 10;

                return (
                  <div
                    key={idx}
                    className="absolute px-3.5 py-2.5 bg-[#000000]/70 border border-white/15 rounded-2xl flex items-center gap-2 shadow-2xl hover:border-primary/50 transition-all duration-300 pointer-events-auto cursor-default text-[10px] font-bold text-gray-300 uppercase tracking-widest font-mono"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
                      opacity,
                      zIndex,
                    }}
                  >
                    <div className="p-1 bg-[#38bdf8]/10 rounded-lg text-[#38bdf8] shrink-0">
                      {badge.icon}
                    </div>
                    <span>{badge.text}</span>
                  </div>
                );
              })}

              {/* Console Telemetry Ping */}
              <div className="absolute -bottom-8 bg-[#000000]/60 border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-md shadow-lg z-30">
                <Radio className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span className="text-[9px] text-[#e0f2fe] font-bold uppercase tracking-widest font-mono">LOG LINK: SECURED</span>
              </div>

            </div>
          </div>

          {/* Right: Profile Info Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-3 font-mono">
                <Cpu className="w-4.5 h-4.5 text-primary animate-spin" style={{ animationDuration: '10s' }} />
                Core Systems Interface
              </div>
              <h3 className="text-3xl sm:text-4xl font-black mb-4 text-white leading-tight">
                Architecting <span className="gradient-text font-black">Digital Systems</span>
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-normal">
                {personalInfo.bio}
              </p>
            </motion.div>

            {/* Core Capability highlights */}
            <div className="space-y-4">
              {[
                {
                  icon: <Monitor className="w-5 h-5 text-primary" />,
                  title: 'Frontend Client Interfaces',
                  desc: 'Crafting responsive SPA structures and clean design components using React, TypeScript, and Framer Motion layout tools.',
                },
                {
                  icon: <Server className="w-5 h-5 text-indigo-400" />,
                  title: 'High-Throughput Web Services',
                  desc: 'Assembling Node.js Express architectures, secure middleware systems, JWT security controls, and relational/NoSQL datastores.',
                },
              ].map((cap, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="glass-card p-5 rounded-2xl border border-white/5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-primary shrink-0 mt-0.5">
                    {cap.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 uppercase text-xs tracking-widest font-mono">{cap.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">{cap.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resume CV link */}
            <motion.div variants={itemVariants} className="pt-2">
              <a
                href={personalInfo.resume}
                download
                className="inline-flex items-center gap-2.5 btn-primary px-8 py-4 text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/40 rounded-xl"
              >
                <span>Download Transmission Log</span>
                <Download className="w-4 h-4 text-dark-950" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats metrics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 max-w-6xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass-card p-6 rounded-2xl text-center border border-white/5 hover:border-primary/20 transition-all duration-300 bg-black/30"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
