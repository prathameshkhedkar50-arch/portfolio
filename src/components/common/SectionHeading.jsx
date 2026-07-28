import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

export default function SectionHeading({ 
  title, 
  subtitle, 
  align = 'center', 
  icon: Icon, 
  description 
}) {
  const alignmentClasses = align === 'center' ? 'text-center mx-auto' : 'text-left';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={cn("mb-12 sm:mb-16 max-w-3xl", alignmentClasses)}
    >
      {Icon && (
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
          <Icon size={24} />
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-gray-900 dark:text-white mb-4 text-balance">
        {title}
      </h2>
      <div className={cn("h-1.5 w-20 bg-primary rounded-full mb-4", align === 'center' ? 'mx-auto' : '')}></div>
      {subtitle && (
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-medium mb-2">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="text-base text-gray-500 dark:text-gray-500 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}