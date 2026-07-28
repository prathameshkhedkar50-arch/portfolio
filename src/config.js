/**
 * Centralized application configuration.
 * Single source of truth for external service identifiers.
 * 
 * VERIFICATION FLAGS:
 * Set *_VERIFIED to true only when you have confirmed the URL is correct.
 * Unverified links are automatically hidden from the UI.
 */

export const GITHUB_USERNAME = 'prathameshkhedkar50-arch';
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
export const GITHUB_API_BASE = `https://api.github.com/users/${GITHUB_USERNAME}`;

export const APP_CONFIG = {
  github: {
    username: GITHUB_USERNAME,
    profileUrl: GITHUB_PROFILE_URL,
    apiUrl: GITHUB_API_BASE,
  },
  contact: {
    email: 'prathameshkhedkar50@gmail.com',
    phone: '+91 9561439643',
    phoneRaw: '919561439643',
    location: 'Pune, Maharashtra, India',
    locationMapUrl: 'https://www.google.com/maps/search/?api=1&query=Pune+Maharashtra+India',
  },
  social: {
    github: GITHUB_PROFILE_URL,
    githubVerified: true,
    // VERIFIED LinkedIn profile
    linkedin: 'https://www.linkedin.com/in/prathamesh-khedkar-7147a4253',
    linkedinVerified: true,
    // VERIFIED Instagram profile
    instagram: 'https://www.instagram.com/prathamesh___30',
    instagramVerified: true,
    whatsapp: 'https://wa.me/919561439643',
    whatsappVerified: true,
  },
  // EmailJS configuration - MUST be set via environment variables
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  },
};

export const isEmailJSConfigured = () =>
  Boolean(
    APP_CONFIG.emailjs.serviceId &&
    APP_CONFIG.emailjs.templateId &&
    APP_CONFIG.emailjs.publicKey
  );