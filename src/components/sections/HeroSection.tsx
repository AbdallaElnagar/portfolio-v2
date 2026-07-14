import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';
import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const PHRASES = [
  'scalable web systems',
  'robust backend engines',
  'clean software architectures',
  'performant cloud solutions',
];

const HeroSection = () => {
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhraseIdx(p => (p + 1) % PHRASES.length), 3800);
    return () => clearInterval(id);
  }, []);

  const scrollDown = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center overflow-hidden bg-transparent pt-24 pb-16"
    >
      {/* ── Left dark vignette so text is always readable ─────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(100deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 38%, rgba(0,0,0,0.25) 62%, transparent 100%)',
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          PLANET EARTH  —  CSS-generated (always renders)
      ═══════════════════════════════════════════════════════ */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          zIndex: 0,
          right:  'clamp(-120px, -6vw, -40px)',
          top:    '50%',
          transform: 'translateY(-50%)',
          width:  'clamp(340px, 52vw, 700px)',
          height: 'clamp(340px, 52vw, 700px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.65, filter: 'blur(22px)' }}
          animate={{ opacity: 1, scale: 1,    filter: 'blur(0px)'  }}
          transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="relative w-full h-full"
        >

          {/* ── outermost diffuse atmosphere ─────────────────────── */}
          <div
            className="absolute rounded-full"
            style={{
              inset: '-16%',
              background:
                'radial-gradient(circle, rgba(6,182,212,0.14) 0%, rgba(56,189,248,0.07) 45%, transparent 70%)',
              filter: 'blur(32px)',
            }}
          />

          {/* ── cyan rim atmosphere ──────────────────────────────── */}
          <div
            className="absolute rounded-full"
            style={{
              inset: '-5%',
              background:
                'radial-gradient(circle, transparent 58%, rgba(56,189,248,0.28) 76%, rgba(14,165,233,0.42) 88%, rgba(6,182,212,0.20) 100%)',
              filter: 'blur(7px)',
            }}
          />

          {/* ── Earth globe (Vibrant NASA Earth photograph) ─────────── */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 340, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              backgroundImage: 'url("/images/earth.jpg")',
              backgroundSize: '260%',
              backgroundPosition: 'center',
              filter: 'saturate(1.35) brightness(1.05) contrast(1.05)',
              /* inset shadow for night-side darkness */
              boxShadow: 'inset 16px -16px 80px rgba(0,0,0,0.70), inset -6px 6px 30px rgba(255,255,255,0.04)',
            }}
          />

          {/* ── upper-right specular highlight (lit by distant star) ─ */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 68% 28%, rgba(255,255,255,0.12) 0%, transparent 40%)',
            }}
          />

          {/* ── left/bottom night-side shadow (terminator line) ─────── */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 20% 70%, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 35%, transparent 58%)',
            }}
          />

        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          HERO TEXT
      ═══════════════════════════════════════════════════════ */}
      <div className="relative container mx-auto px-6 sm:px-8 lg:px-12" style={{ zIndex: 2 }}>
        <div className="max-w-2xl xl:max-w-3xl flex flex-col items-start">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.6 }}
            className="mb-7"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black font-mono tracking-[0.18em] uppercase border border-cyan-500/30 bg-black/60 text-cyan-400 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              SYSTEM ONLINE — ORBIT LOCK ACQUIRED
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0,  filter: 'blur(0px)'  }}
            transition={{ type: 'spring', stiffness: 50, damping: 14, delay: 0.75 }}
            style={{ textShadow: '0 2px 28px rgba(0,0,0,1), 0 0 60px rgba(0,0,0,0.95)' }}
            className="text-[clamp(2.4rem,6.5vw,5rem)] font-black leading-none tracking-tight text-white mb-4 whitespace-nowrap"
          >
            {personalInfo.name}
          </motion.h1>

          {/* Role */}
          <motion.h2
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 50, damping: 14, delay: 0.92 }}
            className="text-[clamp(0.8rem,1.8vw,1.25rem)] font-extrabold font-mono tracking-[0.22em] uppercase text-cyan-400 mb-6"
            style={{ textShadow: '0 0 18px rgba(6,182,212,0.6)' }}
          >
            Full Stack Software Engineer
          </motion.h2>

          {/* Rotating phrase */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ delay: 1.05, duration: 0.5 }}
            className="flex flex-wrap items-center gap-x-2.5 text-[clamp(1rem,2vw,1.2rem)] text-gray-400 mb-5 max-w-xl"
          >
            <span>Navigating</span>
            <span className="relative inline-flex items-center h-[1.4em] min-w-[220px] sm:min-w-[280px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={phraseIdx}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%',   opacity: 1 }}
                  exit={{    y: '-100%', opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 130, damping: 16 }}
                  className="absolute inset-0 flex items-center font-bold text-white"
                >
                  {PHRASES[phraseIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ delay: 1.15, duration: 0.5 }}
            className="text-gray-400 text-[clamp(0.88rem,1.5vw,1rem)] leading-relaxed mb-10 max-w-md"
          >
            Architecting full-stack systems, cloud deployments, and production-grade
            backends — one commit at a time.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 75, damping: 14, delay: 1.28 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollDown}
              className="btn-primary inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-[11px] font-black font-mono tracking-[0.18em] uppercase text-black group"
            >
              Launch Sectors
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="btn-outline inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-[11px] font-black font-mono tracking-[0.18em] uppercase text-cyan-400 hover:text-white"
            >
              Contact Command Deck
            </motion.a>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.65 }}
            className="mt-16 sm:mt-20"
          >
            <motion.button
              onClick={scrollDown}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="group inline-flex flex-col items-start gap-2 text-gray-600 hover:text-cyan-400 transition-colors"
            >
              <span className="text-[10px] font-black font-mono tracking-[0.22em] uppercase">
                Initiate Descent
              </span>
              <div className="w-5 h-9 rounded-full border-2 border-current flex items-start justify-center pt-1.5">
                <ChevronDown className="w-2.5 h-2.5 animate-bounce" />
              </div>
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
