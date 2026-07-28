import { motion } from 'framer-motion';
import {
  FiServer, FiGlobe, FiLock, FiDatabase, FiSmartphone,
  FiLayers, FiBookOpen, FiCloud, FiCode, FiTerminal,
  FiBox, FiGitBranch, FiMonitor, FiTool
} from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { portfolioData } from '../../data/portfolioData';

const iconMap = {
  // Languages
  FiCode: <FiCode />,
  FiTerminal: <FiTerminal />,
  // Frameworks & Backend
  FiServer: <FiServer />,
  FiGlobe: <FiGlobe />,
  FiLock: <FiLock />,
  // Databases
  FiDatabase: <FiDatabase />,
  FiBox: <FiBox />,
  // Tools
  FiGitBranch: <FiGitBranch />,
  FiMonitor: <FiMonitor />,
  FiTool: <FiTool />,
  // Learning
  FiBookOpen: <FiBookOpen />,
  FiCloud: <FiCloud />,
  FiLayers: <FiLayers />,
  FiSmartphone: <FiSmartphone />
};

const proficiencyColors = {
  Advanced: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  Intermediate: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Learning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
};

const SkillBadge = ({ skill, index }) => {
  const Icon = iconMap[skill.icon] || <FiCode />;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-default`}
      role="listitem"
      aria-label={`${skill.name} - ${skill.level}`}
    >
      <span className="text-lg text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
        {Icon}
      </span>
      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
        {skill.name}
      </span>
      <span className={`hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded border ${proficiencyColors[skill.level] || proficiencyColors.Learning} font-medium`}>
        {skill.level}
      </span>
    </motion.div>
  );
};

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          title={skills.title}
          subtitle={skills.subtitle}
          description={skills.description}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.categories.map((category, categoryIndex) => {
            const CategoryIcon = iconMap[category.icon] || <FiLayers />;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card group relative overflow-hidden"
              >
                {/* Gradient Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl block">{CategoryIcon}</span>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${proficiencyColors[category.proficiency]}`}>
                    {category.proficiency}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-1">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
                  {category.description}
                </p>

                {/* Skills Grid */}
                <div className="flex flex-wrap gap-2" role="list" aria-label={`${category.title} skills`}>
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBadge key={skill.name} skill={skill} index={skillIndex} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}