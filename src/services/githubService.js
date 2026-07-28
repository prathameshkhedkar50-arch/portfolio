import axios from 'axios';

// EXPLICIT, HARD-CODED CORRECT USERNAME TO PREVENT ANY INTERPOLATION ERRORS
const GITHUB_USERNAME = 'prathameshkhedkar50-arch';
const PROFILE_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;

const CACHE_KEYS = {
  PROFILE: 'github_cache_profile',
  REPOS: 'github_cache_repos',
  COUNT: 'github_cache_count',
  RATE_LIMIT: 'github_cache_rate_limit',
};

const CACHE_TTL = {
  PROFILE: 30 * 60 * 1000, // 30 minutes
  REPOS: 30 * 60 * 1000,
  COUNT: 60 * 60 * 1000, // 1 hour
};

const RATE_LIMIT_THRESHOLD = 5;

const getCachedItem = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, timestamp, ttl } = JSON.parse(raw);
    if (Date.now() - timestamp > ttl) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

const setCachedItem = (key, data, ttl) => {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now(), ttl }));
  } catch {
    // Ignore storage errors (e.g., private mode)
  }
};

const getRateLimitInfo = () => getCachedItem(CACHE_KEYS.RATE_LIMIT);

const updateRateLimitInfo = (headers) => {
  if (!headers) return;
  const remaining = parseInt(headers['x-ratelimit-remaining'], 10);
  const reset = parseInt(headers['x-ratelimit-reset'], 10) * 1000;
  if (!isNaN(remaining) && !isNaN(reset)) {
    setCachedItem(CACHE_KEYS.RATE_LIMIT, { remaining, reset }, 60 * 60 * 1000);
  }
};

const isRateLimited = () => {
  const info = getRateLimitInfo();
  if (!info) return false;
  return info.remaining < RATE_LIMIT_THRESHOLD;
};

const getFallbackAvatar = () => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2563EB"/>
          <stop offset="100%" style="stop-color:#7C3AED"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#g)"/>
      <text x="100" y="120" font-family="Poppins, Arial, sans-serif" font-size="80" font-weight="700" fill="white" text-anchor="middle">PK</text>
    </svg>
  `.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const FALLBACK_PROFILE = {
  name: 'Prathamesh Khedkar',
  username: GITHUB_USERNAME,
  bio: 'Software Developer | Java | Python | Full Stack',
  avatar: getFallbackAvatar(),
  followers: 0,
  following: 0,
  public_repos: 9, // Verified from actual API response
  html_url: `https://github.com/${GITHUB_USERNAME}`,
  created_at: '2026-01-09T07:53:52Z',
  updated_at: new Date().toISOString(),
};

const FALLBACK_REPOS = [
  {
    id: 1,
    name: 'vahtuk-transport-management',
    description: 'Transport Management System with trip management and reports.',
    language: 'Java',
    stars: 0,
    forks: 0,
    updated_at: new Date().toISOString(),
    html_url: `https://github.com/${GITHUB_USERNAME}/vahtuk-transport-management`,
    topics: ['java', 'spring-boot'],
  },
  {
    id: 2,
    name: 'ollama-code-reviewer',
    description: 'AI-powered code review platform using local LLMs.',
    language: 'Python',
    stars: 0,
    forks: 0,
    updated_at: new Date().toISOString(),
    html_url: `https://github.com/${GITHUB_USERNAME}/ollama-code-reviewer`,
    topics: ['python', 'fastapi', 'ai'],
  },
  {
    id: 3,
    name: 'wifishare-app',
    description: 'Large file sharing application over local WiFi.',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    updated_at: new Date().toISOString(),
    html_url: `https://github.com/${GITHUB_USERNAME}/wifishare-app`,
    topics: ['react', 'fastapi'],
  },
];

export const fetchGitHubProfile = async () => {
  const cachedProfile = getCachedItem(CACHE_KEYS.PROFILE);
  const cachedRepos = getCachedItem(CACHE_KEYS.REPOS);

  // Serve from cache if rate limited or fresh
  if (cachedProfile && cachedRepos) {
    if (isRateLimited()) {
      return { profile: cachedProfile, repos: cachedRepos, fromCache: true, rateLimited: true, error: null };
    }
    return { profile: cachedProfile, repos: cachedRepos, fromCache: true, rateLimited: false, error: null };
  }

  try {
    // EXPLICIT URLS: No baseURL concatenation ambiguity
    const [profileRes, reposRes] = await Promise.all([
      axios.get(PROFILE_URL, { timeout: 10000 }),
      axios.get(REPOS_URL, { timeout: 10000 }),
    ]);

    updateRateLimitInfo(profileRes.headers);

    const profile = {
      name: profileRes.data.name || GITHUB_USERNAME,
      username: profileRes.data.login,
      bio: profileRes.data.bio || 'Software Developer',
      avatar: profileRes.data.avatar_url || getFallbackAvatar(),
      followers: profileRes.data.followers,
      following: profileRes.data.following,
      public_repos: profileRes.data.public_repos,
      html_url: profileRes.data.html_url,
      created_at: profileRes.data.created_at,
      updated_at: profileRes.data.updated_at,
    };

    const repos = reposRes.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description available',
      language: repo.language || 'Code',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updated_at: repo.updated_at,
      html_url: repo.html_url,
      topics: repo.topics || [],
    }));

    setCachedItem(CACHE_KEYS.PROFILE, profile, CACHE_TTL.PROFILE);
    setCachedItem(CACHE_KEYS.REPOS, repos, CACHE_TTL.REPOS);

    return { profile, repos, fromCache: false, rateLimited: false, error: null };
  } catch (error) {
    let errorMessage = 'Unable to fetch GitHub data.';
    
    if (error.response) {
      updateRateLimitInfo(error.response.headers);
      const status = error.response.status;
      
      if (status === 403) {
        errorMessage = 'GitHub API rate limit exceeded. Showing cached data.';
        if (cachedProfile && cachedRepos) {
          return { profile: cachedProfile, repos: cachedRepos, fromCache: true, rateLimited: true, error: errorMessage };
        }
      } else if (status === 404) {
        errorMessage = 'GitHub profile not found. Please verify the username.';
      } else if (status >= 500) {
        errorMessage = 'GitHub API server error. Showing cached data.';
        if (cachedProfile && cachedRepos) {
          return { profile: cachedProfile, repos: cachedRepos, fromCache: true, rateLimited: false, error: errorMessage };
        }
      }
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'GitHub API request timed out. Showing cached data.';
      if (cachedProfile && cachedRepos) {
        return { profile: cachedProfile, repos: cachedRepos, fromCache: true, rateLimited: false, error: errorMessage };
      }
    } else {
      errorMessage = 'Network error. Please check your connection.';
      if (cachedProfile && cachedRepos) {
        return { profile: cachedProfile, repos: cachedRepos, fromCache: true, rateLimited: false, error: errorMessage };
      }
    }

    // Ultimate fallback
    return {
      profile: FALLBACK_PROFILE,
      repos: FALLBACK_REPOS,
      fromCache: false,
      rateLimited: false,
      error: errorMessage,
    };
  }
};

export const getGitHubRepoCount = async () => {
  // OPTIMIZATION: Check if profile is already cached to avoid duplicate API calls
  const cachedProfile = getCachedItem(CACHE_KEYS.PROFILE);
  if (cachedProfile && typeof cachedProfile.public_repos === 'number') {
    return { count: cachedProfile.public_repos, fromCache: true, error: null };
  }

  const cachedCount = getCachedItem(CACHE_KEYS.COUNT);
  if (cachedCount && !isRateLimited()) {
    return { count: cachedCount, fromCache: true, error: null };
  }

  if (cachedCount && isRateLimited()) {
    return { count: cachedCount, fromCache: true, rateLimited: true, error: null };
  }

  try {
    const response = await axios.get(PROFILE_URL, { timeout: 10000 });
    const count = response.data.public_repos;
    setCachedItem(CACHE_KEYS.COUNT, count, CACHE_TTL.COUNT);
    return { count, fromCache: false, error: null };
  } catch (error) {
    if (cachedCount) {
      return { count: cachedCount, fromCache: true, error: 'Using cached count.' };
    }
    return { count: 9, fromCache: false, error: 'Using fallback count.' };
  }
};

export const clearGitHubCache = () => {
  Object.values(CACHE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
};

export { GITHUB_USERNAME };