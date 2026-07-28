import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiDownload, FiEye, FiPrinter, FiFileText, 
  FiCheckCircle, FiXCircle, FiAlertCircle 
} from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { portfolioData } from '../../data/portfolioData';
import { 
  checkResumeExists, 
  downloadResume, 
  openResume, 
  printResume 
} from '../../utils/helpers';

export default function Resume() {
  const { resumeVariants } = portfolioData;
  const [resumeStatus, setResumeStatus] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anyAvailable, setAnyAvailable] = useState(false);

  // Check availability of all resume variants on mount
  useEffect(() => {
    const checkAllResumes = async () => {
      setLoading(true);
      const results = await Promise.all(
        resumeVariants.map(async (resume) => {
          const exists = await checkResumeExists(resume.filename);
          return { ...resume, available: exists };
        })
      );
      
      setResumeStatus(results);
      const hasAvailable = results.some((r) => r.available);
      setAnyAvailable(hasAvailable);
      
      // Set initial selection: prefer default that's available, else first available
      const defaultAvailable = results.find((r) => r.isDefault && r.available);
      const firstAvailable = results.find((r) => r.available);
      
      if (defaultAvailable) {
        setSelectedId(defaultAvailable.id);
      } else if (firstAvailable) {
        setSelectedId(firstAvailable.id);
      } else {
        setSelectedId(results[0]?.id || null);
      }
      
      setLoading(false);
    };
    
    checkAllResumes();
  }, [resumeVariants]);

  const selectedResume = resumeStatus.find((r) => r.id === selectedId);

  const handleDownload = async () => {
    if (!selectedResume?.available) return;
    await downloadResume();
  };

  const handleView = async () => {
    if (!selectedResume?.available) return;
    await openResume();
  };

  const handlePrint = async () => {
    if (!selectedResume?.available) return;
    await printResume();
  };

  if (loading) {
    return (
      <section id="resume" className="section-padding">
        <div className="container-custom">
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Checking resume availability...</p>
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
          subtitle="Professional credentials"
          description="Download or preview my resume tailored for different roles. Select a variant below to see details."
        />

        {/* No resumes available message */}
        {!anyAvailable && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex p-4 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4">
              <FiAlertCircle size={32} />
            </div>
            <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
              Resume PDFs Being Prepared
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              My resume PDFs are currently being updated. Please contact me directly at{' '}
              <a 
                href={`mailto:${portfolioData.personal.contact.email}`}
                className="text-primary hover:underline font-medium"
              >
                {portfolioData.personal.contact.email}
              </a>{' '}
              to request the latest version.
            </p>
            <a
              href={`mailto:${portfolioData.personal.contact.email}`}
              className="btn-primary inline-flex"
            >
              <FiFileText /> Request Resume via Email
            </a>
          </motion.div>
        )}

        {/* Resume Variant Selector */}
        {anyAvailable && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
              {resumeStatus.map((resume, index) => {
                const isActive = resume.id === selectedId;
                return (
                  <motion.button
                    key={resume.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => resume.available && setSelectedId(resume.id)}
                    disabled={!resume.available}
                    className={`glass-card text-left p-5 transition-all duration-300 relative ${
                      !resume.available 
                        ? 'opacity-60 cursor-not-allowed' 
                        : isActive
                        ? 'border-primary ring-2 ring-primary/30 bg-primary/5 dark:bg-primary/10'
                        : 'hover:border-primary/50 cursor-pointer'
                    }`}
                    aria-pressed={isActive}
                    aria-label={`${resume.title} - ${resume.available ? 'Available' : 'Not available'}`}
                  >
                    {/* Availability Badge */}
                    <div className="absolute top-3 right-3">
                      {resume.available ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 flex items-center gap-1">
                          <FiCheckCircle size={10} /> Ready
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 flex items-center gap-1">
                          <FiXCircle size={10} /> Unavailable
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-3 mb-3 pr-16">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${
                        isActive && resume.available
                          ? 'bg-primary text-white' 
                          : resume.available
                          ? 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400'
                          : 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600'
                      }`}>
                        <FiFileText size={20} />
                      </div>
                    </div>
                    
                    <h4 className="font-bold font-poppins text-gray-900 dark:text-white mb-1 text-sm leading-tight">
                      {resume.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {resume.available 
                        ? resume.description 
                        : 'PDF not available. Please contact me directly.'}
                    </p>
                    
                    {resume.isDefault && resume.available && (
                      <span className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary">
                        Default
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Active Resume Preview Card */}
            <AnimatePresence mode="wait">
              {selectedResume && (
                <motion.div
                  key={selectedResume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-8 md:p-10"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-white/10">
                    <div className="flex items-center gap-5">
                      <div className={`p-4 rounded-2xl shadow-lg ${
                        selectedResume.available
                          ? 'bg-gradient-to-br from-primary to-secondary text-white'
                          : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}>
                        <FiFileText size={32} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white mb-1">
                          {selectedResume.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Target Role:{' '}
                          <span className={`font-semibold ${
                            selectedResume.available ? 'text-primary' : 'text-gray-500'
                          }`}>
                            {selectedResume.targetRole}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
                      selectedResume.available
                        ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
                        : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
                    }`}>
                      {selectedResume.available ? (
                        <>
                          <FiCheckCircle size={16} />
                          <span className="text-sm font-medium">Ready to Download</span>
                        </>
                      ) : (
                        <>
                          <FiXCircle size={16} />
                          <span className="text-sm font-medium">PDF Not Available</span>
                        </>
                      )}
                    </div>
                  </div>

                  <p className={`mb-8 leading-relaxed ${
                    selectedResume.available
                      ? 'text-gray-600 dark:text-gray-400'
                      : 'text-gray-500 dark:text-gray-500 italic'
                  }`}>
                    {selectedResume.available
                      ? selectedResume.description
                      : 'This resume variant is currently unavailable. The PDF has not been uploaded yet. Please contact me directly to request this specific resume version.'}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={handleDownload} 
                      disabled={!selectedResume.available}
                      className={`btn-primary ${
                        !selectedResume.available ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      aria-label="Download resume PDF"
                    >
                      <FiDownload /> Download PDF
                    </button>
                    <button 
                      onClick={handleView}
                      disabled={!selectedResume.available}
                      className={`btn-secondary ${
                        !selectedResume.available ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      aria-label="View resume online"
                    >
                      <FiEye /> View Online
                    </button>
                    <button 
                      onClick={handlePrint}
                      disabled={!selectedResume.available}
                      className={`btn-icon ${
                        !selectedResume.available ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      aria-label="Print resume"
                    >
                      <FiPrinter />
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-6 font-mono">
                    File: {selectedResume.filename} • Located in /public/
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
}