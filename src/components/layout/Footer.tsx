import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';
import { Github, Linkedin, Twitter } from '../common/BrandIcons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: <Github className="w-5 h-5" />, url: personalInfo.social.github },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: personalInfo.social.linkedin },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, url: personalInfo.social.twitter },
  ];

  const quickLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <footer className="bg-black/40 border-t border-white/5 relative overflow-hidden backdrop-blur-md">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <span className="text-black font-extrabold text-lg">AE</span>
              </div>
              <span className="text-white font-bold text-xl tracking-wide">
                Abdalla Elnagar
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-mono font-semibold mb-4 uppercase text-xs tracking-wider text-cyan-400">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-mono font-semibold mb-4 uppercase text-xs tracking-wider text-cyan-400">Connect With Me</h3>
            <div className="flex gap-3 mb-4">
              {socialLinks.map(social => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all shadow-sm"
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-gray-400 text-sm font-mono">
              <a
                href={`mailto:${personalInfo.email}`}
                className="hover:text-cyan-400 transition-colors"
              >
                {personalInfo.email}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs text-center md:text-right font-medium">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
