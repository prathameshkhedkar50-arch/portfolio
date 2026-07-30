import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail, FiPhone, FiMapPin, FiMessageCircle,
  FiGithub, FiLinkedin, FiInstagram, FiSend, FiCheckCircle, FiAlertCircle, FiLoader, FiExternalLink
} from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { portfolioData } from '../../data/portfolioData';
import { APP_CONFIG } from '../../config';
import { isVerifiedLink, isValidEmail, isWithinLength, sendContactForm } from '../../utils/helpers';

const iconMap = {
  FiMail: <FiMail size={22} />,
  FiPhone: <FiPhone size={22} />,
  FiMapPin: <FiMapPin size={22} />,
  FiMessageCircle: <FiMessageCircle size={22} />,
  FiGithub: <FiGithub size={20} />,
  FiLinkedin: <FiLinkedin size={22} />,
  FiInstagram: <FiInstagram size={22} />
};

const getVerifiedInfoCards = (cards) => cards.filter((c) => isVerifiedLink(c.href, c.verified));
const getVerifiedSocials = (socials) => socials.filter((s) => isVerifiedLink(s.url, s.verified));

export default function Contact() {
  const { contact } = portfolioData;
  const formRef = useRef(null);
  const submitButtonRef = useRef(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status.type === 'success') {
      const timer = setTimeout(() => setStatus({ type: '', message: '' }), 6000);
      return () => clearTimeout(timer);
    }
  }, [status.type]);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!isWithinLength(formData.name, 2, 50)) {
      newErrors.name = 'Name must be 2-50 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (!isWithinLength(formData.subject, 5, 100)) {
      newErrors.subject = 'Subject must be 5-100 characters';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (!isWithinLength(formData.message, 10, 1000)) {
      newErrors.message = 'Message must be 10-1000 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    if (!validate()) {
      const firstErrorField = Object.keys(errors)[0];
      const el = document.getElementById(firstErrorField);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const formDataObj = new FormData();
      formDataObj.append('user_name', formData.name);
      formDataObj.append('user_email', formData.email);
      formDataObj.append('subject', formData.subject);
      formDataObj.append('message', formData.message);
      
      const result = await sendContactForm(formDataObj);

      if (result.success) {
        setStatus({ type: 'success', message: result.message });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else if (result.type === 'config') {
        setStatus({ type: 'info', message: result.message });
      } else {
        setStatus({ type: 'error', message: result.message });
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus({ 
        type: 'error', 
        message: 'An unexpected error occurred. Please try again or email me directly.' 
      });
    } finally {
      setIsSubmitting(false);
      if (submitButtonRef.current) {
        submitButtonRef.current.focus();
      }
    }
  };

  const verifiedInfoCards = getVerifiedInfoCards(contact.infoCards);
  const verifiedSocials = getVerifiedSocials(contact.socialLinks);

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          title={contact.title}
          subtitle={contact.subtitle}
          description={contact.description}
        />

        {/* Info Cards - 4 cards: Location, WhatsApp, Instagram, LinkedIn */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-12">
          {verifiedInfoCards.map((info, index) => {
            const InfoIcon = iconMap[info.icon] || <FiMail />;
            const isExternal = info.href.startsWith('http') && !info.href.includes('wa.me');
            const isMap = info.isMapLink;
            return (
              <motion.a
                key={info.label}
                href={info.href}
                target={isExternal ? '_blank' : '_self'}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-bg"
                aria-label={
                  info.label === "Instagram" 
                    ? "Visit Prathamesh Khedkar's Instagram profile" 
                    : info.label === "LinkedIn" 
                    ? "Visit Prathamesh Khedkar's LinkedIn profile" 
                    : `${info.label}: ${info.value}${isMap ? ' (opens in Google Maps)' : ''}`
                }
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0" aria-hidden="true">
                  {InfoIcon}
                </div>
                <div className="min-w-0 flex-grow">
                  <p className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5">
                    {info.label}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Main Content: Form + Social/Map */}
        {/* items-stretch is default for CSS grid, so both columns stretch to equal height */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">
          {/* LEFT: Contact Form - stretches to match right column height */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 h-full"
          >
            <div className="glass-card p-6 md:p-8 h-full flex flex-col">
              <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
                Send me a message
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Fill out the form below and I'll respond as soon as possible.
              </p>

              <AnimatePresence>
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                      status.type === 'success'
                        ? 'bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400'
                        : status.type === 'error'
                        ? 'bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400'
                        : 'bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400'
                    }`}
                    role="alert"
                  >
                    {status.type === 'success' ? <FiCheckCircle size={20} className="flex-shrink-0 mt-0.5" aria-hidden="true" /> :
                     status.type === 'error' ? <FiAlertCircle size={20} className="flex-shrink-0 mt-0.5" aria-hidden="true" /> :
                     <FiAlertCircle size={20} className="flex-shrink-0 mt-0.5" aria-hidden="true" />}
                    <div className="flex-grow">
                      <p className="text-sm">{status.message}</p>
                      {status.type === 'error' && (
                        <button
                          type="button"
                          onClick={() => setStatus({ type: '', message: '' })}
                          className="text-xs underline mt-1 hover:no-underline"
                        >
                          Dismiss
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form stretches to fill available space, button stays at bottom */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 lg:space-y-5 flex-1 flex flex-col justify-between" noValidate>
                <div className="space-y-4 lg:space-y-5 flex-1">
                  <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        placeholder={contact.form.namePlaceholder}
                        maxLength={50}
                        className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-surface border ${
                          errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-white/10 focus:ring-primary'
                        } text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-xs text-red-500 mt-1 flex items-center gap-1" role="alert">
                          <FiAlertCircle size={12} /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        placeholder={contact.form.emailPlaceholder}
                        className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-surface border ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-white/10 focus:ring-primary'
                        } text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs text-red-500 mt-1 flex items-center gap-1" role="alert">
                          <FiAlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder={contact.form.subjectPlaceholder}
                      maxLength={100}
                      className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-surface border ${
                        errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-white/10 focus:ring-primary'
                      } text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="text-xs text-red-500 mt-1 flex items-center gap-1" role="alert">
                        <FiAlertCircle size={12} /> {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder={contact.form.messagePlaceholder}
                      maxLength={1000}
                      className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-surface border ${
                        errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-white/10 focus:ring-primary'
                      } text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition-all resize-none disabled:opacity-60 disabled:cursor-not-allowed`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.message ? (
                        <p id="message-error" className="text-xs text-red-500 flex items-center gap-1" role="alert">
                          <FiAlertCircle size={12} /> {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-500 tabular-nums">
                        {formData.message.length}/1000
                      </span>
                    </div>
                  </div>
                </div>

                {/* Button area - pushed to bottom via flex layout */}
                <div className="mt-auto pt-4">
                  <button
                    ref={submitButtonRef}
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed focus:ring-offset-2 dark:focus:ring-offset-dark-bg h-12"
                  >
                    {isSubmitting ? (
                      <>
                        <FiLoader className="animate-spin" aria-hidden="true" /> 
                        <span>{contact.form.sendingLabel}</span>
                      </>
                    ) : (
                      <>
                        <FiSend aria-hidden="true" /> 
                        <span>{contact.form.submitLabel}</span>
                      </>
                    )}
                  </button>

                  {!contact.form.emailjsConfigured && (
                    <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-2">
                      Email service not configured. Set environment variables to enable direct messaging.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </motion.div>

          {/* RIGHT: Social + Map - unchanged */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Social Links */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold font-poppins text-gray-900 dark:text-white mb-4">
                Connect with me
              </h3>
              {verifiedSocials.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {verifiedSocials.map((social) => {
                    const SocialIcon = iconMap[social.icon] || <FiMail />;
                    const isExternal = social.url.startsWith('http');
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target={isExternal ? '_blank' : '_self'}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-surface hover:bg-primary/10 dark:hover:bg-primary/10 transition-colors group focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label={`Visit Prathamesh Khedkar's ${social.name} profile`}
                      >
                        <span className="text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors" aria-hidden="true">
                          {SocialIcon}
                        </span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                          {social.name}
                        </span>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Social links will appear once verified.
                </p>
              )}
            </div>

            {/* Map */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold font-poppins text-gray-900 dark:text-white mb-4">
                Location
              </h3>
              <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 mb-4">
                <iframe
                  src={contact.map.embedUrl}
                  title={`Map showing ${contact.map.location}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 z-10"
                />
                <div className="absolute inset-0 z-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                   <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                     <FiMapPin /> Loading map...
                   </span>
                </div>
              </div>
              <a
                href={APP_CONFIG.contact.locationMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors group font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-bg"
              >
                <FiMapPin className="flex-shrink-0" aria-hidden="true" />
                <span>View {contact.map.location} on Google Maps</span>
                <FiExternalLink size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}