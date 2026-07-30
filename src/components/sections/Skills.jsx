import SectionHeading from '../common/SectionHeading';
import { SkillCard } from '../cards/SkillCard';
import { portfolioData } from '../../data/portfolioData';

/**
 * Technical Skills Section
 * 
 * Premium interactive showcase of technical capabilities.
 * Delegates individual card presentation to SkillCard.
 * Preserves all existing skill data from portfolioData.js.
 */
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

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Technical skill categories"
        >
          {skills.categories.map((category, index) => (
            <SkillCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}