import { motion } from 'framer-motion';
import { useState } from 'react';
import { personalInfo } from '../../data/portfolioData';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Github, Linkedin, Twitter } from '../common/BrandIcons';
import { Radio, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `New Portfolio Message: ${formData.subject}`,
          _captcha: 'false'
        }),
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        toast.success('Transmission sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Transmission failed. Please try again.');
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        toast.error('Transmission timeout. Please check your connection.');
      } else {
        toast.error('Network error. Please check your internet connection.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <EnvelopeIcon className="w-5 h-5 text-[#38bdf8]" />,
      label: 'Email Node',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: <PhoneIcon className="w-5 h-5 text-[#38bdf8]" />,
      label: 'Comms Transceiver',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
    {
      icon: <MapPinIcon className="w-5 h-5 text-[#38bdf8]" />,
      label: 'Sector Coordinate',
      value: personalInfo.location,
      href: null,
    },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <Github className="w-5 h-5" />, url: personalInfo.social.github },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: personalInfo.social.linkedin },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, url: personalInfo.social.twitter },
  ];

  return (
    <section id="contact" className="py-24 md:py-36 relative overflow-hidden bg-transparent">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-nebulaPurple/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-cosmicBlue/10 rounded-full blur-[140px]" />
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
            Establish <span className="gradient-text font-black">Link</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Console status: Transceiver operational. Dispatch a telemetry packet to synchronize coordinates.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-black mb-4 text-white">System Diagnostics</h3>
              <p className="text-gray-300 leading-relaxed mb-6 font-normal">
                Ready to review requirements, custom web architectures, or coordinate full-stack deployments. Use the console link to query my terminal.
              </p>
            </div>

            {/* Diagnostic Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ x: 6 }}
                  className="glass-card p-5 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 bg-black/40"
                >
                  {info.href ? (
                    <a href={info.href} className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1 font-mono">{info.label}</div>
                        <div className="text-white font-bold text-sm sm:text-base font-mono">{info.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1 font-mono">{info.label}</div>
                        <div className="text-white font-bold text-sm sm:text-base font-mono">{info.value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-[9px] font-bold uppercase tracking-widest mb-4 text-gray-400 font-mono">Secure Network Nodes</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center border border-white/5 hover:border-primary/45 text-gray-400 hover:text-primary transition-all duration-300 bg-black/40"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 space-y-6 relative overflow-hidden bg-black/40">
              
              {/* Green Laser Scan Sweep Line */}
              <div className="absolute inset-x-0 w-full h-[1px] bg-green-500/40 pointer-events-none laser-scan z-10" />

              {/* Status Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-2 relative z-20">
                <div className="flex items-center gap-2">
                  <Radio className="w-4.5 h-4.5 text-green-400 animate-pulse" />
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest font-mono">LINK STABLE</span>
                </div>
                <span className="text-[9px] text-gray-500 font-mono">BUFFER: READY</span>
              </div>

              <div className="relative z-20">
                <label htmlFor="name" className="block text-[9px] font-bold uppercase tracking-widest text-[#38bdf8] mb-2 font-mono">
                  Sender Identity
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-black/40 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-white placeholder-gray-700 focus:outline-none transition-all font-mono text-xs"
                  placeholder="Query Name..."
                />
              </div>

              <div className="relative z-20">
                <label htmlFor="email" className="block text-[9px] font-bold uppercase tracking-widest text-[#38bdf8] mb-2 font-mono">
                  Return Comm Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-black/40 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-white placeholder-gray-700 focus:outline-none transition-all font-mono text-xs"
                  placeholder="comm@galaxy.com"
                />
              </div>

              <div className="relative z-20">
                <label htmlFor="subject" className="block text-[9px] font-bold uppercase tracking-widest text-[#38bdf8] mb-2 font-mono">
                  Subject Vector
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-black/40 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-white placeholder-gray-700 focus:outline-none transition-all font-mono text-xs"
                  placeholder="System spec targets..."
                />
              </div>

              <div className="relative z-20">
                <label htmlFor="message" className="block text-[9px] font-bold uppercase tracking-widest text-[#38bdf8] mb-2 font-mono">
                  Transmission Packet Payload
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3.5 bg-black/40 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-white placeholder-gray-700 focus:outline-none transition-all resize-none font-mono text-xs"
                  placeholder="Input text logs..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full btn-primary py-4 text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/45 rounded-xl flex items-center justify-center gap-2 font-mono relative z-20 text-dark-950 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <span>{isSubmitting ? 'Transmitting...' : 'Transmit Signal'}</span>
                <Send className="w-3.5 h-3.5 text-dark-950" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
