import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiDownload } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { portfolioData } from '../../data/portfolioData';
import { scrollToSection, openResume } from '../../utils/helpers';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = (href) => {
    setIsOpen(false);
    const id = href.replace('#', '');
    scrollToSection(id);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-custom flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          className="text-2xl font-bold font-poppins text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-2"
          aria-label="Go to top"
        >
          PK<span className="text-gray-800 dark:text-white">.</span>
        </a>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {portfolioData.navigation.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors focus:outline-none focus:text-primary focus:underline underline-offset-4"
            >
              {link.name}
            </button>
          ))}
          
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" aria-hidden="true"></div>
          
          <button 
            onClick={toggleTheme} 
            className="btn-icon p-2" 
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          
          <button 
            onClick={openResume} 
            className="btn-primary py-2 px-4 text-sm" 
            aria-label="Download Resume"
          >
            <FiDownload /> Resume
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleTheme} className="btn-icon p-2" aria-label="Toggle theme">
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="btn-icon p-2" 
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-gray-200 dark:border-white/10 overflow-hidden"
          >
            <div className="container-custom py-4 space-y-2">
              {portfolioData.navigation.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-200 dark:border-white/10 mt-4">
                <button 
                  onClick={openResume} 
                  className="w-full btn-primary justify-center"
                  aria-label="Download Resume"
                >
                  <FiDownload /> Download Resume
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}