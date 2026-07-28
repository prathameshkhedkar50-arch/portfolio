import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiStar, FiGitBranch, FiExternalLink, FiUsers, FiBookOpen, FiCode, FiAlertCircle } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { fetchGitHubProfile } from '../../services/githubService';
import { portfolioData } from '../../data/portfolioData';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const StatCard = ({ icon: Icon, label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4 }}
    className="glass-card text-center p-4"
  >
    <div className="flex items-center justify-center gap-2 text-primary mb-2">
      <Icon size={20} />
    </div>
    <div className="text-2xl font-bold text-gray-900 dark:text-white font-poppins">
      {value}
    </div>
    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide mt-1">
      {label}
    </div>
  </motion.div>
);

const RepoCard = ({ repo, index }) => (
  <motion.a
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass-card group flex flex-col h-full"
    aria-label={`View ${repo.name} repository`}
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2 text-primary">
        <FiBookOpen size={18} />
        <h3 className="font-bold font-poppins text-gray-900 dark:text-white group-hover:text-primary transition-colors truncate">
          {repo.name}
        </h3>
      </div>
      <FiExternalLink size={16} className="text-gray-400 group-hover:text-primary transition-colors flex-shrink-0" />
    </div>

    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-2">
      {repo.description}
    </p>

    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10">
      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <FiCode size={12} />
          {repo.language}
        </span>
        <span className="flex items-center gap-1">
          <FiStar size={12} />
          {repo.stars}
        </span>
        <span className="flex items-center gap-1">
          <FiGitBranch size={12} />
          {repo.forks}
        </span>
      </div>
      <span className="text-xs text-gray-400">
        {formatDate(repo.updated_at)}
      </span>
    </div>
  </motion.a>
);

const SkeletonCard = () => (
  <div className="glass-card p-6 animate-pulse">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
    </div>
    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
    <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
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
        const result = await fetchGitHubProfile();
        
        if (result.error) {
          setError(result.error);
          // Use fallback data
          setData({
            profile: github.fallbackProfile,
            repos: github.fallbackRepos
          });
        } else {
          setData({
            profile: result.profile,
            repos: result.repos
          });
        }
      } catch (err) {
        setError('Failed to load GitHub data.');
        setData({
          profile: github.fallbackProfile,
          repos: github.fallbackRepos
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [github.fallbackProfile, github.fallbackRepos]);

  return (
    <section id="github" className="section-padding bg-gray-50/50 dark:bg-dark-surface/30">
      <div className="container-custom">
        <SectionHeading
          title={github.title}
          subtitle={github.subtitle}
          description={github.description}
        />

        {loading ? (
          // Loading Skeleton
          <div className="space-y-8">
            <div className="glass-card p-8 animate-pulse">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-grow text-center md:text-left">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48 mb-3"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-4"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        ) : data ? (
          <>
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 mb-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <motion.img
                  src={data.profile.avatar}
                  alt={`${data.profile.name} GitHub Avatar`}
                  className="w-32 h-32 rounded-full border-4 border-primary/20 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white mb-1">
                    {data.profile.name}
                  </h3>
                  <a
                    href={data.profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-mono text-sm mb-3 inline-block"
                  >
                    @{data.profile.username}
                  </a>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-2xl">
                    {data.profile.bio}
                  </p>
                  <a
                    href={data.profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex"
                    aria-label="Visit GitHub Profile"
                  >
                    <FiGithub /> View Profile
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={FiBookOpen}
                label="Repositories"
                value={data.profile.public_repos}
                delay={0.1}
              />
              <StatCard
                icon={FiUsers}
                label="Followers"
                value={data.profile.followers}
                delay={0.2}
              />
              <StatCard
                icon={FiUsers}
                label="Following"
                value={data.profile.following}
                delay={0.3}
              />
              <StatCard
                icon={FiStar}
                label="Total Stars"
                value={data.repos.reduce((acc, repo) => acc + repo.stars, 0)}
                delay={0.4}
              />
            </div>

            {/* Error Message (if using fallback) */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center gap-3 text-amber-600 dark:text-amber-400"
              >
                <FiAlertCircle size={20} />
                <p className="text-sm">{error} Showing cached data.</p>
              </motion.div>
            )}

            {/* Repositories Grid */}
            <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-6">
              Recent Repositories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.repos.map((repo, index) => (
                <RepoCard key={repo.id} repo={repo} index={index} />
              ))}
            </div>

            {data.repos.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No repositories found.
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Unable to load GitHub profile.
          </div>
        )}
      </div>
    </section>
  );
}