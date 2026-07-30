import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiGithub, FiLinkedin, FiInstagram, FiMail, FiPhone, FiDownload, 
  FiArrowRight, FiCode, FiDatabase, FiLayers
} from 'react-icons/fi';
import { portfolioData } from '../../data/portfolioData';
import { downloadResume, scrollToSection, isVerifiedLink } from '../../utils/helpers';
import { getGitHubRepoCount } from '../../services/githubService';
import { DeveloperOrb } from '../common/DeveloperOrb';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const StatCard = ({ value, suffix, label, delay, liveFetch, fallback }) => {
  const [displayValue, setDisplayValue] = useState(fallback !== undefined ? fallback : value);
  const [isLive, setIsLive] = useState(false);
  const isNumeric = typeof value === 'number';
  
  useEffect(() => {
    if (!liveFetch) return;
    let cancelled = false;
    const fetchCount = async () => {
      try {
        const result = await getGitHubRepoCount();
        if (!cancelled && result.count) {
          setDisplayValue(result.count);
          setIsLive(true);
        }
      } catch (error) {
        console.warn('GitHub count fetch failed:', error);
        if (!cancelled && fallback) setDisplayValue(fallback);
      }
    };
    const timer = setTimeout(() => { fetchCount(); }, 500);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [liveFetch, fallback]);

  const finalValue = isNumeric ? `${displayValue}${suffix}` : displayValue;
  const isLongValue = !isNumeric && displayValue.toString().length > 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-card min-h-[140px] flex flex-col items-center justify-center p-4 sm:p-6 hover:shadow-xl transition-all duration-300 relative"
      title={isLive ? 'Live from GitHub' : undefined}
    >
      {isLive && (
        <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Live data" aria-hidden="true" />
      )}
      <div className={`font-bold font-poppins text-primary mb-2 sm:mb-3 text-center leading-tight ${isLongValue ? 'text-lg sm:text-xl md:text-2xl' : 'text-2xl sm:text-3xl md:text-4xl'}`}>
        {finalValue}
      </div>
      <div className="text-[10px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide text-center leading-tight px-1">
        {label}
      </div>
    </motion.div>
  );
};

export default function Hero() {
  const { hero } = portfolioData;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const currentRole = hero.roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;
    const timer = setTimeout(() => {
      if (!isDeleting && displayedText === currentRole) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % hero.roles.length);
      } else {
        setDisplayedText((prev) => isDeleting ? currentRole.substring(0, prev.length - 1) : currentRole.substring(0, prev.length + 1));
      }
    }, isDeleting && displayedText === currentRole ? pauseTime : typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, hero.roles]);

  const handleCtaClick = (action) => {
    if (action === 'downloadResume') downloadResume();
    if (action === 'scrollToProjects') scrollToSection('projects');
  };

  const socialIcons = {
    FiGithub: <FiGithub size={20} />,
    FiLinkedin: <FiLinkedin size={20} />,
    FiInstagram: <FiInstagram size={20} />,
    FiMail: <FiMail size={20} />,
    FiPhone: <FiPhone size={20} />
  };

  const verifiedSocials = hero.socials.filter((s) => isVerifiedLink(s.url, s.verified));

  // Staggered entrance variants for left content
  const containerVariants = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: prefersReducedMotion ? 0 : 0.08, 
        delayChildren: prefersReducedMotion ? 0 : 0.2 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const nameVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.7, ease: "easeOut" } 
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        />
      </div>

      <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12">
        {/* LEFT CONTENT - Enhanced with 3D depth and stagger */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Greeting */}
            <motion.p 
              variants={itemVariants}
              className="text-primary font-mono font-medium text-base sm:text-lg hero-greeting-depth"
            >
              {hero.greeting}
            </motion.p>
            
            {/* Main Name - Premium Typography Depth */}
            <motion.h1 
              variants={nameVariants}
              whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.005 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins text-gray-900 dark:text-white leading-tight hero-name-depth cursor-default"
            >
              {hero.name}
            </motion.h1>
            
            {/* Typewriter Title */}
            <motion.div 
              variants={itemVariants}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-600 dark:text-gray-300 h-10 sm:h-12 flex items-center justify-center lg:justify-start gap-1"
            >
              <span className="text-primary hero-title-depth">{displayedText}</span>
              <span className="animate-pulse text-primary">|</span>
            </motion.div>
            
            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {hero.summary}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <motion.button 
                onClick={() => handleCtaClick('downloadResume')} 
                whileHover={prefersReducedMotion ? {} : { y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary group h-12 px-6"
                aria-label="Download Resume"
              >
                <FiDownload className="group-hover:animate-bounce" aria-hidden="true" />
                <span className="font-medium">Download Resume</span>
              </motion.button>
              
              <motion.button 
                onClick={() => handleCtaClick('scrollToProjects')} 
                whileHover={prefersReducedMotion ? {} : { y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary group h-12 px-6"
                aria-label="View Projects"
              >
                <span className="font-medium">View Projects</span>
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </motion.span>
              </motion.button>
            </motion.div>

            {/* Social Icons */}
            {verifiedSocials.length > 0 && (
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-center lg:justify-start gap-3 flex-wrap"
              >
                {verifiedSocials.map((social, index) => {
                  const isExternal = social.url.startsWith('http');
                  return (
                    <motion.a 
                      key={index} 
                      href={social.url} 
                      target={isExternal ? "_blank" : "_self"} 
                      rel={isExternal ? "noopener noreferrer" : undefined} 
                      whileHover={prefersReducedMotion ? {} : { y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white shadow-sm hover:shadow-md transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
                      aria-label={`Visit Prathamesh Khedkar's ${social.name} profile`} 
                      title={social.name}
                    >
                      {socialIcons[social.icon]}
                    </motion.a>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* RIGHT CONTENT - Preserved exactly as is */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative flex flex-col items-center"
        >
          <div className="mb-8 sm:mb-12">
            <DeveloperOrb />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl">
            {hero.stats.map((stat, index) => (
              <StatCard key={index} value={stat.value} suffix={stat.suffix} label={stat.label} delay={index * 0.1 + 0.5} liveFetch={stat.liveFetch} fallback={stat.fallback} />
            ))}
          </div>

          {/* Mobile Scroll Down Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8 flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 cursor-pointer group lg:hidden"
            onClick={() => scrollToSection('about')}
            role="button"
            aria-label="Scroll down to About section"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && scrollToSection('about')}
          >
            <span className="text-xs font-mono uppercase tracking-widest group-hover:text-primary transition-colors whitespace-nowrap">
              Scroll Down
            </span>
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center p-1 group-hover:border-primary transition-colors">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-primary rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-gray-500 dark:text-gray-400 cursor-pointer group"
        onClick={() => scrollToSection('about')}
        role="button"
        aria-label="Scroll down to About section"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && scrollToSection('about')}
      >
        <span className="text-xs font-mono uppercase tracking-widest group-hover:text-primary transition-colors whitespace-nowrap">
          Scroll Down
        </span>
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center p-1 group-hover:border-primary transition-colors">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}