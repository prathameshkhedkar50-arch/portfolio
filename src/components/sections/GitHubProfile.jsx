import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiUsers, FiBookOpen, FiStar, FiAlertCircle, FiExternalLink } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { fetchGitHubProfile } from '../../services/githubService';
import { portfolioData } from '../../data/portfolioData';
import { RepositoryCard } from '../cards/RepositoryCard';

const getLocalFallbackAvatar = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#2563EB"/><stop offset="100%" style="stop-color:#7C3AED"/></linearGradient></defs><rect width="200" height="200" fill="url(#g)"/><text x="100" y="120" font-family="Poppins, Arial, sans-serif" font-size="80" font-weight="700" fill="white" text-anchor="middle">PK</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const SkeletonCard = () => (
  <div className="rounded-2xl bg-gray-100 dark:bg-gray-800 p-5 animate-pulse h-64">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32" />
    </div>
    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-4" />
    <div className="flex gap-2 mb-4">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-12" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-12" />
    </div>
    <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-white/10">
      <div className="flex gap-3">
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16" />
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-10" />
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-10" />
      </div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-20" />
    </div>
  </div>
);

export default function GitHubProfile() {
  const { github } = portfolioData;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchGitHubProfile();
        
        if (result.error) {
          setError(result.error);
        }
        
        setData({
          profile: {
            ...result.profile,
            avatar: result.profile.avatar || getLocalFallbackAvatar(),
          },
          repos: result.repos,
        });
      } catch (err) {
        setError('Failed to load GitHub data.');
        setData({
          profile: { ...github.fallbackProfile, avatar: getLocalFallbackAvatar() },
          repos: github.fallbackRepos,
        });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [github.fallbackProfile, github.fallbackRepos]);

  if (loading) {
    return (
      <section id="github" className="section-padding bg-gray-50/50 dark:bg-dark-surface/30">
        <div className="container-custom">
          <SectionHeading title={github.title} subtitle={github.subtitle} description={github.description} />
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-8 animate-pulse">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full flex-shrink-0" />
                <div className="flex-grow text-center md:text-left space-y-3 w-full">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48 mx-auto md:mx-0" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 mx-auto md:mx-0" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full max-w-md mx-auto md:mx-0" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const totalStars = data.repos.reduce((acc, repo) => acc + (repo.stars || 0), 0);

  return (
    <section id="github" className="section-padding bg-gray-50/50 dark:bg-dark-surface/30">
      <div className="container-custom">
        <SectionHeading title={github.title} subtitle={github.subtitle} description={github.description} />

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
              <img 
                src={data.profile.avatar} 
                alt={`${data.profile.name} GitHub Avatar`} 
                className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-700 shadow-lg bg-gradient-to-br from-primary to-secondary flex-shrink-0"
                onError={(e) => { e.target.src = getLocalFallbackAvatar(); }}
              />
              <div className="flex-grow space-y-3">
                <div>
                  <h3 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white">
                    {data.profile.name}
                  </h3>
                  <a
                    href={data.profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-mono text-sm"
                  >
                    @{data.profile.username}
                  </a>
                </div>
                {data.profile.bio && (
                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                    {data.profile.bio}
                  </p>
                )}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <FiBookOpen size={16} className="text-primary flex-shrink-0" aria-hidden="true" />
                    <span className="font-semibold text-gray-900 dark:text-white">{data.profile.public_repos}</span> Repositories
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiUsers size={16} className="text-primary flex-shrink-0" aria-hidden="true" />
                    <span className="font-semibold text-gray-900 dark:text-white">{data.profile.followers}</span> Followers
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiStar size={16} className="text-primary flex-shrink-0" aria-hidden="true" />
                    <span className="font-semibold text-gray-900 dark:text-white">{totalStars}</span> Total Stars
                  </span>
                </div>
                <a
                  href={data.profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary/20"
                >
                  <FiGithub aria-hidden="true" /> View GitHub Profile
                </a>
              </div>
            </div>
          </motion.div>

          {/* Error / Fallback Notice */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-start gap-3"
              role="alert"
            >
              <FiAlertCircle size={20} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm">{error} Showing cached or fallback data.</p>
            </motion.div>
          )}

          {/* Repositories */}
          <div>
            <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-6">Recent Repositories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.repos.map((repo, index) => (
                <RepositoryCard key={repo.id || index} repo={repo} index={index} />
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <a
                href={data.profile.html_url + '?tab=repositories'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 font-semibold rounded-xl transition-colors"
              >
                View All on GitHub <FiExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}