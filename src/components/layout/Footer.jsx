import { motion } from 'framer-motion';
import { FiArrowUp, FiGithub, FiLinkedin, FiInstagram, FiArrowRight, FiMessageCircle } from 'react-icons/fi';
import { APP_CONFIG } from '../../config';
import { scrollToSection } from '../../utils/helpers';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Premium 3D Footer
 * 
 * Features:
 * - Subtle layered depth with gradient background
 * - Decorative background glows (blue/purple)
 * - 3D raised social buttons with hover elevation
 * - Animated quick-link arrows
 * - Premium back-to-top interaction
 * - WhatsApp button included
 * - Compact mobile layout
 * - Full light/dark theme support
 * - Reduced motion support
 */
export default function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: FiGithub, href: APP_CONFIG.social.github },
    { name: 'LinkedIn', icon: FiLinkedin, href: APP_CONFIG.social.linkedin },
    { name: 'Instagram', icon: FiInstagram, href: APP_CONFIG.social.instagram },
    { name: 'WhatsApp', icon: FiMessageCircle, href: APP_CONFIG.social.whatsapp }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-slate-950 border-t border-gray-200 dark:border-gray-800">
      {/* Decorative background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Blue glow - bottom left */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl" />
        {/* Purple glow - top right */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl" />
        {/* Top inner highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* Main footer content */}
      <div className="relative z-10 container-custom py-10 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8 lg:mb-10">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white mb-3">
              Prathamesh Khedkar
              {/* Subtle gradient accent underline */}
              <span className="block mt-1 h-0.5 w-16 bg-gradient-to-r from-primary to-secondary rounded-full" />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
              Software Developer specializing in Java, Python, and full-stack development. 
              Building scalable backend systems and modern web applications.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-1">
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href.replace('#', ''))}
                    className="group flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    <span className="relative">
                      {link.label}
                      {/* Animated underline on hover */}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                    </span>
                    {/* Sliding arrow on hover */}
                    <FiArrowRight 
                      size={12} 
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" 
                      aria-hidden="true" 
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Connect Column */}
          <div className="md:col-span-1">
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-widest mb-4">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Connect on ${social.name}`}
                    whileHover={prefersReducedMotion ? {} : { y: -3, scale: 1.05 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                    className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/30 transition-shadow duration-300"
                  >
                    {/* Subtle inner highlight */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/50 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />
                    <Icon 
                      size={20} 
                      className="relative text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors duration-300" 
                      aria-hidden="true" 
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
            © {currentYear} Prathamesh Khedkar. All rights reserved.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={prefersReducedMotion ? {} : { y: -2 }}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-md transition-all duration-300"
            aria-label="Back to top"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
              Back to top
            </span>
            <motion.span
              animate={prefersReducedMotion ? {} : { y: [0, -2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-primary"
            >
              <FiArrowUp size={14} aria-hidden="true" />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}