import { FiArrowUp, FiGithub, FiMail, FiPhone, FiLinkedin, FiInstagram, FiMessageCircle } from 'react-icons/fi';
import { APP_CONFIG } from '../../config';
import { portfolioData } from '../../data/portfolioData';
import { scrollToSection, isVerifiedLink } from '../../utils/helpers';

const iconMap = {
  FiGithub: <FiGithub size={18} />,
  FiMail: <FiMail size={18} />,
  FiPhone: <FiPhone size={18} />,
  FiLinkedin: <FiLinkedin size={18} />,
  FiInstagram: <FiInstagram size={18} />,
  FiMessageCircle: <FiMessageCircle size={18} />
};

export default function Footer() {
  const { contact, name } = portfolioData.personal;
  
  // Filter social links to only verified ones
  const footerSocials = [
    { name: "GitHub", icon: "FiGithub", url: APP_CONFIG.social.github, verified: APP_CONFIG.social.githubVerified },
    { name: "LinkedIn", icon: "FiLinkedin", url: APP_CONFIG.social.linkedin, verified: APP_CONFIG.social.linkedinVerified },
    { name: "Instagram", icon: "FiInstagram", url: APP_CONFIG.social.instagram, verified: APP_CONFIG.social.instagramVerified },
    { name: "Email", icon: "FiMail", url: `mailto:${APP_CONFIG.contact.email}`, verified: true },
    { name: "WhatsApp", icon: "FiMessageCircle", url: APP_CONFIG.social.whatsapp, verified: APP_CONFIG.social.whatsappVerified },
  ].filter((s) => isVerifiedLink(s.url, s.verified));

  return (
    <footer className="bg-gray-50 dark:bg-dark-surface border-t border-gray-200 dark:border-white/10 pt-16 pb-8" role="contentinfo">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="sm:col-span-2">
            <h3 className="text-2xl font-bold font-poppins mb-4 text-gray-900 dark:text-white">
              {name}<span className="text-primary">.</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-6 leading-relaxed">
              Building robust, scalable, and user-centric software solutions. Open to opportunities in backend and full-stack development.
            </p>
            {footerSocials.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {footerSocials.map((social) => {
                  const Icon = iconMap[social.icon];
                  const isExternal = social.url.startsWith('http');
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target={isExternal ? '_blank' : '_self'}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="btn-icon p-2.5"
                      aria-label={`Visit Prathamesh Khedkar's ${social.name} profile`}
                    >
                      {Icon}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
          
          <div>
            <h4 className="font-bold font-poppins mb-4 text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-3">
              {portfolioData.navigation.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => scrollToSection(link.href.replace('#', ''))}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors text-sm focus:outline-none focus:text-primary"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-poppins mb-4 text-gray-900 dark:text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>{contact.location}</li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors focus:outline-none focus:text-primary focus:underline">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors focus:outline-none focus:text-primary focus:underline">
                  {contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-blue-700 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-2 py-1"
            aria-label="Back to top"
          >
            Back to Top <FiArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}