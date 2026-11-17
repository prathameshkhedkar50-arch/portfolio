import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { portfolioData } from '../data/portfolioData';
import { APP_CONFIG, isEmailJSConfigured } from '../config';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Determines if a URL is verified and safe to render.
 * Prevents placeholder/fake URLs from appearing in the UI.
 */
export const isVerifiedLink = (url, isVerified = true) => {
  if (!url || typeof url !== 'string') return false;
  if (!isVerified) return false;
  const trimmed = url.trim();
  if (trimmed === '#' || trimmed === '' || trimmed.toLowerCase() === 'placeholder') return false;
  // Must be a valid http/https/mailto/tel URL
  return /^(https?|mailto|tel):\/\//i.test(trimmed);
};

/**
 * Validates an email address.
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
};

/**
 * Validates string length within bounds.
 */
export const isWithinLength = (str, min, max) => {
  if (!str) return false;
  const len = str.trim().length;
  return len >= min && len <= max;
};

// Check if a resume PDF exists in public/ directory
export const checkResumeExists = async (filename) => {
  try {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const response = await fetch(`${baseUrl}${filename}`, {
      method: 'HEAD',
      cache: 'no-cache'
    });
    return response.ok;
  } catch {
    return false;
  }
};

// Get all resume variants with their availability status
export const getResumesWithAvailability = async () => {
  const variants = portfolioData.resumeVariants || [];
  const results = await Promise.all(
    variants.map(async (resume) => {
      const exists = await checkResumeExists(resume.filename);
      return { ...resume, available: exists };
    })
  );
  return results;
};

// Get the active resume (default that actually exists, or first available)
export const getActiveResume = async () => {
  const variants = portfolioData.resumeVariants || [];
  
  const defaultResume = variants.find((r) => r.isDefault);
  if (defaultResume) {
    const exists = await checkResumeExists(defaultResume.filename);
    if (exists) return defaultResume;
  }
  
  for (const resume of variants) {
    const exists = await checkResumeExists(resume.filename);
    if (exists) return resume;
  }
  
  return null;
};

const getBaseUrl = () => import.meta.env.BASE_URL || '/';

export const openResume = async () => {
  const resume = await getActiveResume();
  if (!resume) {
    showResumeUnavailableNotification();
    return;
  }
  window.open(`${getBaseUrl()}${resume.filename}`, '_blank', 'noopener,noreferrer');
};

export const downloadResume = async () => {
  const resume = await getActiveResume();
  if (!resume) {
    showResumeUnavailableNotification();
    return;
  }

  const link = document.createElement('a');
  link.href = `${getBaseUrl()}${resume.filename}`;
  link.download = resume.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const printResume = async () => {
  const resume = await getActiveResume();
  if (!resume) {
    showResumeUnavailableNotification();
    return;
  }

  const printWindow = window.open(`${getBaseUrl()}${resume.filename}`, '_blank', 'noopener,noreferrer');
  if (printWindow) {
    printWindow.onload = () => {
      setTimeout(() => printWindow.print(), 500);
    };
  }
};

const showResumeUnavailableNotification = () => {
  const existing = document.getElementById('resume-unavailable-toast');
  if (existing) return;
  
  const toast = document.createElement('div');
  toast.id = 'resume-unavailable-toast';
  toast.className = 'fixed top-24 right-4 z-[100] bg-amber-500/90 dark:bg-amber-600/90 text-white px-5 py-3 rounded-xl shadow-lg backdrop-blur-sm flex items-center gap-3';
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
    <span class="text-sm font-medium">Resume PDF not available yet. Please contact me directly.</span>
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

export const openGitHub = () => {
  window.open(APP_CONFIG.github.profileUrl, '_blank', 'noopener,noreferrer');
};

export const copyToClipboard = async (text, type) => {
  try {
    await navigator.clipboard.writeText(text);
    return { success: true, message: `${type} copied to clipboard!` };
  } catch (err) {
    return { success: false, message: `Failed to copy ${type}.` };
  }
};

export const copyEmail = () => copyToClipboard(APP_CONFIG.contact.email, 'Email');
export const copyPhone = () => copyToClipboard(APP_CONFIG.contact.phone, 'Phone number');

export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Send contact form via EmailJS.
 * Returns { success, message }.
 */
export const sendContactForm = async (formData) => {
  if (!isEmailJSConfigured()) {
    return {
      success: false,
      type: 'config',
      message: 'Email service is not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY environment variables.'
    };
  }

  try {
    const emailjs = await import('@emailjs/browser');
    await emailjs.sendForm(
      APP_CONFIG.emailjs.serviceId,
      APP_CONFIG.emailjs.templateId,
      formData,
      APP_CONFIG.emailjs.publicKey
    );
    return { success: true, type: 'success', message: 'Message sent successfully! I will get back to you soon.' };
  } catch (error) {
    console.error('EmailJS error:', error);
    return {
      success: false,
      type: 'error',
      message: 'Failed to send message. Please try again or email me directly.'
    };
  }
};