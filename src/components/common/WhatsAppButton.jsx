import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';

export default function WhatsAppButton() {
  const phone = portfolioData.personal.contact.phone.replace(/\D/g, '');
  const message = encodeURIComponent("Hello Prathamesh,\n\nI found your portfolio and would like to discuss an opportunity.");
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contact on WhatsApp"
    >
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Chat with me
      </span>
      <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg shadow-green-500/30 transition-colors duration-300 animate-float">
        <FaWhatsapp size={28} />
      </div>
    </motion.a>
  );
}