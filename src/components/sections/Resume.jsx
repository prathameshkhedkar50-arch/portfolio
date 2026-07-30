import SectionHeading from '../common/SectionHeading';
import { ResumeCard } from '../cards/ResumeCard';
import { portfolioData } from '../../data/portfolioData';

/**
 * Resume Section
 * 
 * Premium showcase of available resume variants.
 * All cards maintain identical dimensions.
 * Last row is centered on desktop.
 */
export default function Resume() {
  const { resumeVariants } = portfolioData;

  // Filter to only resumes with valid file paths
  const validResumes = resumeVariants ? resumeVariants.filter(r => r && r.file && r.title) : [];

  if (validResumes.length === 0) {
    return (
      <section id="resume" className="section-padding">
        <div className="container-custom">
          <SectionHeading
            title="My Resume"
            subtitle="Professional Documents"
            description="Download or view my resume tailored to different roles."
          />
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Resume documents are being updated. Please check back soon.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="resume" className="section-padding">
      <div className="container-custom">
        <SectionHeading
          title="My Resume"
          subtitle="Professional Documents"
          description="Download or view my resume tailored to different roles and specializations."
        />

        {/* 
          Flex-wrap with justify-center ensures last row is centered.
          Each card wrapper has a fixed max-width to prevent stretching.
          h-full on ResumeCard ensures equal heights.
        */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-7">
          {validResumes.map((resume, index) => (
            <div
              key={resume.id || index}
              className="w-full sm:w-[calc(50%-14px)] lg:w-[calc(33.333%-19px)] max-w-[380px] flex-shrink-0"
            >
              <ResumeCard
                resume={resume}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Helper note */}
        <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>All resumes are in PDF format. View opens in a new tab; Download saves to your device.</p>
        </div>
      </div>
    </section>
  );
}