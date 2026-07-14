import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/', section: 'home' },
    { name: 'About', href: '/#about', section: 'about' },
    { name: 'Skills', href: '/#skills', section: 'skills' },
    { name: 'Projects', href: '/#projects', section: 'projects' },
    { name: 'Timeline', href: '/#experience', section: 'experience' },
    { name: 'Contact', href: '/#contact', section: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    let observers: { el: HTMLElement; observer: IntersectionObserver }[] = [];

    const setupObservers = () => {
      // Clear any existing observers first
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
      observers = [];

      let allFound = true;
      sections.forEach((sectionId) => {
        const el = document.getElementById(sectionId);
        if (!el) {
          allFound = false;
          return;
        }

        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (entry && entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          },
          {
            rootMargin: '-35% 0px -45% 0px', // slightly wider range for better intersection detection
          }
        );
        observer.observe(el);
        observers.push({ el, observer });
      });

      return allFound;
    };

    // Try immediately
    const allFound = setupObservers();

    // If not all elements are in the DOM (due to lazy loading), check periodically
    let intervalId: any;
    if (!allFound) {
      intervalId = setInterval(() => {
        const done = setupObservers();
        if (done) {
          clearInterval(intervalId);
        }
      }, 500);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, section: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const scrollToSection = () => {
      const element = document.getElementById(section);
      if (element) {
        const offset = 90; // Height of navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    };

    if (location.pathname === '/') {
      // Delay scrolling slightly on mobile/desktop to prevent close animation from interrupting it
      setTimeout(scrollToSection, 200);
    } else {
      navigate(href);
      setTimeout(scrollToSection, 200);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'pt-4 px-4 sm:px-6' : 'pt-0 px-0'
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${
          scrolled
            ? 'max-w-5xl bg-[#000000]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(56,189,248,0.08)] px-6 h-16 flex items-center justify-between'
            : 'container bg-transparent px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between border-b border-white/5'
        }`}
      >
        {/* Logo - Gyroscopic spinning AE */}
        <Link to="/" className="flex items-center space-x-3 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-10 h-10 bg-gradient-to-tr from-primary to-cosmicBlue rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 border border-white/10"
          >
            <span className="text-white font-black text-lg">AE</span>
          </motion.div>
          <span className="text-[#e0f2fe] font-bold text-base tracking-wider hidden sm:block group-hover:text-primary transition-colors font-sans">
            Abdalla Elnagar
          </span>
        </Link>

        {/* Desktop Navigation Spaceship Console */}
        <div className="hidden md:flex items-center space-x-1.5 bg-black/40 border border-white/10 px-2 py-1.5 rounded-2xl backdrop-blur-md">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith('/projects')
              ? item.section === 'projects'
              : activeSection === item.section;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.section)}
                className={`px-4 py-2 font-bold rounded-xl transition-all relative text-xs uppercase tracking-widest ${
                  isActive ? 'text-white font-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <>
                    {/* Console capsule */}
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-white/[0.04] border border-white/5 rounded-xl"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                    {/* Glowing Planet Pointer */}
                    <motion.span
                      layoutId="activeNavPlanet"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#38bdf8] to-indigo-500 shadow-[0_0_8px_#38bdf8,0_0_15px_#1e40af]"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  </>
                )}
              </Link>
            );
          })}
        </div>

        {/* Console CTA Button */}
        <div className="hidden md:block">
          <Link
            to="/#contact"
            onClick={(e) => handleNavClick(e as any, '/#contact', 'contact')}
            className="relative px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 rounded-xl overflow-hidden group hover:border-primary/60 transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.1)] hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] flex items-center justify-center"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-cosmicBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="text-primary group-hover:text-dark-950 transition-colors relative z-10">Sync Link</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
        >
          {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </motion.button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-white/10 bg-[#020617]/95 backdrop-blur-2xl shadow-2xl px-4 py-4 absolute w-full left-0 z-50"
          >
            <div className="flex flex-col space-y-2 max-w-md mx-auto">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.section)}
                  className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5 rounded-xl transition-all font-bold text-xs uppercase tracking-widest"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/#contact"
                onClick={(e) => handleNavClick(e as any, '/#contact', 'contact')}
                className="btn-primary px-4 py-3 text-center mt-2 text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20"
              >
                Sync Link
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;