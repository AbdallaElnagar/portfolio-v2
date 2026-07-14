import { motion } from 'framer-motion';
import { experience } from '../../data/portfolioData';
import {
  BriefcaseIcon,
  CalendarIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { Rocket, Orbit } from 'lucide-react';

const ExperienceSection = () => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section
      id="experience"
      className="py-24 md:py-36 bg-transparent relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[450px] h-[450px] bg-nebulaPurple/10 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Mission <span className="gradient-text font-black">Timeline</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            System coordinates mapping historical milestones and training modules.
          </p>
        </motion.div>

        {/* Timeline wrapper */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[15px] md:left-[23px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#38bdf8] via-[#1e40af] to-transparent origin-top z-0"
          />

          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className="relative pl-8 md:pl-12 pb-12 last:pb-0 z-10"
            >
              {/* Timeline Dot with Outer Pulsing Orbit */}
              <div className="absolute left-0 md:left-2 top-1.5">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ type: 'spring', stiffness: 140, damping: 12, delay: index * 0.08 }}
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#38bdf8] to-[#1e40af] flex items-center justify-center shadow-lg shadow-primary/25 z-10 border border-white/10"
                >
                  <BriefcaseIcon className="w-4 h-4 text-white" />
                </motion.div>
                
                <span className="absolute -inset-1 rounded-full border border-primary/20 bg-transparent blur-[1px] animate-ping opacity-40 pointer-events-none" />
              </div>

              {/* Content Card */}
              <motion.div
                initial={{ opacity: 0, x: 45 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                whileHover={{ x: 6 }}
                className="glass-card p-6 md:p-8 rounded-3xl border border-white/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden bg-black/40"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_rgba(56,189,248,0.02)_0%,transparent_70%)] pointer-events-none" />

                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-1.5 tracking-tight">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2 text-primary font-bold mb-2.5 text-xs sm:text-sm uppercase tracking-wider font-mono">
                      <Rocket className="w-4 h-4 text-primary animate-pulse" />
                      <span>{exp.company}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-[10px] sm:text-xs text-gray-400 font-medium font-mono">
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon className="w-3.5 h-3.5 text-gray-500" />
                        <span>
                          {formatDate(exp.startDate)} -{' '}
                          {formatDate(exp.endDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPinIcon className="w-3.5 h-3.5 text-gray-500" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Active orbit badge */}
                  {exp.current && (
                    <span className="px-3.5 py-1.5 bg-green-500/10 text-green-400 text-[9px] font-bold rounded-full border border-green-500/20 uppercase tracking-widest font-mono">
                      ACTIVE ORBIT
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-5 leading-relaxed text-xs sm:text-sm font-normal">
                  {exp.description}
                </p>

                {/* Achievements */}
                <div className="mb-5">
                  <h4 className="text-[9px] font-bold text-gray-300 mb-3 uppercase tracking-widest font-mono">
                    MISSION ACCOMPLISHMENTS
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li
                        key={achIndex}
                        className="flex items-start gap-2.5 text-xs text-gray-400 leading-relaxed font-normal"
                      >
                        <span className="text-primary mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* System components loadout */}
                <div>
                  <h4 className="text-[9px] font-bold text-gray-300 mb-3 uppercase tracking-widest font-mono">
                    SYSTEM COMPONENTS LOADED
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1.5 bg-white/5 text-gray-300 text-[10px] rounded-xl border border-white/5 font-mono font-bold tracking-wide uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Download Transmission log */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
          className="text-center mt-20"
        >
          <a
            href="/Abdalla_Elnagar_cv.pdf"
            download
            className="inline-flex items-center gap-2.5 btn-primary px-8 py-4 text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/45 rounded-xl font-mono text-dark-950"
          >
            <Orbit className="w-5 h-5 text-dark-950 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Download Transmission CV Log</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
