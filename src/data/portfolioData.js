import { APP_CONFIG, isEmailJSConfigured } from '../config';
import { isVerifiedLink } from '../utils/helpers';

export const portfolioData = {
  personal: {
    name: "Prathamesh Khedkar",
    contact: {
      email: APP_CONFIG.contact.email,
      phone: APP_CONFIG.contact.phone,
      location: APP_CONFIG.contact.location,
      locationShort: "Pune, India",
      locationMapUrl: APP_CONFIG.contact.locationMapUrl,
    },
    socialLinks: {
      github: APP_CONFIG.social.github,
      linkedin: APP_CONFIG.social.linkedin,
      instagram: APP_CONFIG.social.instagram,
    },
  },
  navigation: [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ],
  resumeVariants: [
    {
      id: "res-01",
      title: "Java Full Stack Developer Resume",
      file: "/resume-fullstack.pdf",
      description: "Comprehensive resume highlighting Java, Spring Boot, React, and full-stack development experience.",
      tags: ["Java", "Spring Boot", "React", "REST APIs", "SQL"],
      isDefault: true,
    },
    {
      id: "res-02",
      title: "Java Developer Resume",
      file: "/resume-java.pdf",
      description: "Focused on core Java, Spring ecosystem, and backend development expertise.",
      tags: ["Java", "Spring Boot", "Hibernate", "MySQL"],
      isDefault: false,
    },
    {
      id: "res-03",
      title: "Backend Developer Resume",
      file: "/resume-backend.pdf",
      description: "Emphasizes server-side development, APIs, databases, and system architecture.",
      tags: ["Java", "Python", "REST APIs", "PostgreSQL", "Docker"],
      isDefault: false,
    },
    {
      id: "res-04",
      title: "Python Developer Resume",
      file: "/resume-python.pdf",
      description: "Highlights Python, FastAPI, automation, and data-focused development.",
      tags: ["Python", "FastAPI", "Flask", "SQL", "Automation"],
      isDefault: false,
    },
    {
      id: "res-05",
      title: "Technology Apprentice Resume",
      file: "/resume-apprentice.pdf",
      description: "Entry-level resume emphasizing learning agility, academic foundation, and project experience.",
      tags: ["Java", "Python", "SQL", "Git", "Problem Solving"],
      isDefault: false,
    },
  ],
  hero: {
    greeting: "Hi, I'm",
    name: "Prathamesh Khedkar",
    roles: ["Software Developer", "Java Full Stack Developer", "Backend Developer", "Python Developer"],
    summary: "Passionate MCA Graduate and Software Developer specializing in building scalable backend systems, robust REST APIs, and full-stack applications. Adept at problem-solving, continuous learning, and delivering high-performance software solutions using Java, Python, and modern web technologies.",
    stats: [
      { label: "Projects", value: 10, suffix: "+", fallback: 10 },
      { label: "Technologies", value: 15, suffix: "+", fallback: 15 },
      { label: "GitHub Repos", value: 20, suffix: "+", liveFetch: true, fallback: 9 },
      { label: "Education", value: "MCA", suffix: " Graduate" }
    ],
    ctas: [
      { label: "Download Resume", type: "primary", action: "downloadResume" },
      { label: "View Projects", type: "secondary", action: "scrollToProjects" }
    ],
    socials: [
      { name: "GitHub", icon: "FiGithub", url: APP_CONFIG.social.github, verified: APP_CONFIG.social.githubVerified },
      { name: "LinkedIn", icon: "FiLinkedin", url: APP_CONFIG.social.linkedin, verified: APP_CONFIG.social.linkedinVerified },
      { name: "Instagram", icon: "FiInstagram", url: APP_CONFIG.social.instagram, verified: APP_CONFIG.social.instagramVerified },
      { name: "Email", icon: "FiMail", url: `mailto:${APP_CONFIG.contact.email}`, verified: true },
      { name: "Phone", icon: "FiPhone", url: `tel:${APP_CONFIG.contact.phone}`, verified: true }
    ]
  },
  about: {
    title: "About Me",
    subtitle: "Get to know me better",
    summary: "I am a passionate MCA Graduate (2025) and Software Developer specializing in building scalable backend systems, robust REST APIs, and full-stack applications. My expertise spans across Java, Spring Boot, Python, and FastAPI, with a strong foundation in Database Design, SQL, and Git. I thrive on Problem Solving, Continuous Learning, and delivering high-performance, Responsive Web Development solutions that make a real impact.",
    highlights: [
      { title: "Backend Development", description: "Building robust APIs and server-side logic using Java and Python.", icon: "FiCode" },
      { title: "Full Stack Solutions", description: "Creating seamless end-to-end web applications with modern frameworks.", icon: "FiLayers" },
      { title: "Database Design", description: "Designing efficient schemas and optimizing queries for SQL databases.", icon: "FiDatabase" },
      { title: "Problem Solving", description: "Tackling complex challenges with clean, efficient, and scalable code.", icon: "FiCheckCircle" }
    ],
    personalInfo: [
      { label: "Location", value: "Pune, Maharashtra", icon: "FiMapPin" },
      { label: "Role", value: "Software Developer", icon: "FiBriefcase" },
      { label: "Availability", value: "Full-Time Opportunities", icon: "FiClock" },
      { label: "Languages", value: "English, Hindi, Marathi", icon: "FiGlobe" }
    ]
  },
  experience: [
    {
      company: "Think it Code it Private Limited",
      location: "Pune",
      role: "Full Stack Developer",
      duration: "August 2025 – Present",
      techStack: ["Java", "Spring Boot", "REST APIs", "PostgreSQL", "MySQL", "Git", "HTML", "CSS", "JavaScript"],
      responsibilities: [
        "Develop backend modules using Java.",
        "Build REST APIs using Spring Boot.",
        "Design SQL queries.",
        "Work with PostgreSQL and MySQL.",
        "Develop CRUD operations.",
        "Debug and resolve application issues.",
        "Improve application performance.",
        "Maintain existing applications.",
        "Collaborate with development team.",
        "Participate in feature implementation.",
        "Use Git and GitHub for version control.",
        "Test backend functionality.",
        "Work on Java, HTML, CSS and JavaScript based web applications."
      ]
    }
  ],
  education: [
    {
      degree: "Master of Computer Applications",
      institution: "JSPM's Jayawantrao Sawant College of Engineering",
      location: "Pune",
      duration: "2023 – 2025",
      grade: "6.54 CGPA",
      icon: "FiAward"
    },
    {
      degree: "Bachelor of Computer Applications",
      institution: "SVPM College Of Commerce Science and Computer Education",
      location: "Baramati",
      duration: "2020 – 2023",
      grade: "8.86 CGPA",
      icon: "FiBookOpen"
    }
  ],
  skills: {
    title: "Technical Skills",
    subtitle: "Technologies I work with",
    description: "A comprehensive overview of my technical expertise across the full development stack, from backend architecture to frontend interfaces.",
    categories: [
      {
        id: "languages",
        title: "Languages",
        description: "Core programming languages I use daily",
        icon: "FiCode",
        gradient: "from-orange-500 to-red-500",
        proficiency: "Advanced",
        skills: [
          { name: "Java", icon: "FiCode", level: "Advanced" },
          { name: "Python", icon: "FiCode", level: "Advanced" },
          { name: "JavaScript", icon: "FiCode", level: "Intermediate" },
          { name: "SQL", icon: "FiDatabase", level: "Advanced" },
          { name: "HTML", icon: "FiCode", level: "Advanced" },
          { name: "CSS", icon: "FiCode", level: "Advanced" }
        ]
      },
      {
        id: "frameworks",
        title: "Frameworks",
        description: "Backend and web frameworks",
        icon: "FiServer",
        gradient: "from-green-500 to-emerald-600",
        proficiency: "Advanced",
        skills: [
          { name: "Spring Boot", icon: "FiServer", level: "Advanced" },
          { name: "FastAPI", icon: "FiServer", level: "Intermediate" },
          { name: "Hibernate", icon: "FiServer", level: "Intermediate" },
          { name: "Flask", icon: "FiServer", level: "Intermediate" }
        ]
      },
      {
        id: "backend",
        title: "Backend",
        description: "Server-side development expertise",
        icon: "FiGlobe",
        gradient: "from-blue-500 to-cyan-500",
        proficiency: "Advanced",
        skills: [
          { name: "REST APIs", icon: "FiGlobe", level: "Advanced" },
          { name: "Java Backend", icon: "FiServer", level: "Advanced" },
          { name: "Python Backend", icon: "FiServer", level: "Advanced" },
          { name: "Authentication", icon: "FiLock", level: "Intermediate" },
          { name: "CRUD Operations", icon: "FiDatabase", level: "Advanced" }
        ]
      },
      {
        id: "frontend",
        title: "Frontend",
        description: "User interface development",
        icon: "FiSmartphone",
        gradient: "from-cyan-400 to-blue-500",
        proficiency: "Intermediate",
        skills: [
          { name: "React", icon: "FiCode", level: "Intermediate" },
          { name: "HTML", icon: "FiCode", level: "Advanced" },
          { name: "CSS", icon: "FiCode", level: "Advanced" },
          { name: "JavaScript", icon: "FiCode", level: "Intermediate" },
          { name: "Responsive Design", icon: "FiSmartphone", level: "Intermediate" }
        ]
      },
      {
        id: "databases",
        title: "Databases",
        description: "Data storage and management",
        icon: "FiDatabase",
        gradient: "from-indigo-500 to-purple-600",
        proficiency: "Advanced",
        skills: [
          { name: "PostgreSQL", icon: "FiDatabase", level: "Advanced" },
          { name: "MySQL", icon: "FiDatabase", level: "Advanced" },
          { name: "MongoDB", icon: "FiDatabase", level: "Intermediate" }
        ]
      },
      {
        id: "tools",
        title: "Tools",
        description: "Development and productivity tools",
        icon: "FiTool",
        gradient: "from-pink-500 to-rose-500",
        proficiency: "Advanced",
        skills: [
          { name: "Git", icon: "FiGitBranch", level: "Advanced" },
          { name: "GitHub", icon: "FiGitBranch", level: "Advanced" },
          { name: "VS Code", icon: "FiMonitor", level: "Advanced" },
          { name: "IntelliJ IDEA", icon: "FiMonitor", level: "Advanced" },
          { name: "Postman", icon: "FiTool", level: "Intermediate" },
          { name: "pgAdmin", icon: "FiDatabase", level: "Intermediate" }
        ]
      },
      {
        id: "learning",
        title: "Currently Learning",
        description: "Expanding my skill set",
        icon: "FiBookOpen",
        gradient: "from-amber-500 to-orange-500",
        proficiency: "Learning",
        skills: [
          { name: "Docker", icon: "FiBox", level: "Learning" },
          { name: "Linux", icon: "FiTerminal", level: "Learning" },
          { name: "Software Architecture", icon: "FiLayers", level: "Learning" },
          { name: "Cloud Fundamentals", icon: "FiCloud", level: "Learning" }
        ]
      }
    ]
  },
  projects: {
    title: "Featured Projects",
    subtitle: "A showcase of my recent work",
    description: "Explore a selection of projects that demonstrate my skills in full-stack development, backend architecture, and problem-solving.",
    stats: [
      { label: "Total Projects", value: 10 },
      { label: "Java Projects", value: 3 },
      { label: "Python Projects", value: 4 },
      { label: "Web Apps", value: 6 }
    ],
    filters: ["All", "Java", "Python", "React", "Spring Boot", "FastAPI", "HTML/CSS", "Tools"],
    items: [
      {
        id: 1,
        title: "Vahtuk – Transport Management System",
        description: "Transport Management System with trip management, reports, CRUD operations and database integration.",
        category: "Java",
        year: "2026",
        status: "Completed",
        featured: true,
        tech: ["Java", "SQL", "Spring Boot"],
        github: `https://github.com/${APP_CONFIG.github.username}/vahtuk-transport-management`,
        live: null,
        image: "/images/projects/vahtuk.jpg"
      },
      {
        id: 2,
        title: "Ollama Code Reviewer",
        description: "AI-powered code review platform using local LLMs for automated code analysis.",
        category: "Python",
        year: "2026",
        status: "Completed",
        featured: true,
        tech: ["Python", "FastAPI", "Ollama", "REST APIs"],
        github: `https://github.com/${APP_CONFIG.github.username}/ollama-code-reviewer`,
        live: "https://ollama-reviewer.vercel.app",
        image: "/images/projects/ollama.jpg"
      },
      {
        id: 3,
        title: "WiFiShare",
        description: "Large file sharing application over local WiFi with upload and download support.",
        category: "React",
        year: "2026",
        status: "Completed",
        featured: true,
        tech: ["React", "FastAPI"],
        github: `https://github.com/${APP_CONFIG.github.username}/wifishare-app`,
        live: null,
        image: "/images/projects/wifishare.jpg"
      },
      {
        id: 4,
        title: "Mahalaxmi Steel Arts Website",
        description: "Responsive business website with gallery, services, contact pages and SEO optimization.",
        category: "HTML/CSS",
        year: "2023",
        status: "Completed",
        featured: false,
        tech: ["HTML", "CSS", "JavaScript"],
        github: `https://github.com/${APP_CONFIG.github.username}/mahalaxmi-steel-arts-website`,
        live: "https://mahalaxmi-steel.vercel.app",
        image: "/images/projects/mahalaxmi.jpg"
      },
      {
        id: 5,
        title: "Flask RBAC Management System",
        description: "Role Based Access Control management application with secure authentication.",
        category: "Python",
        year: "2026",
        status: "Completed",
        featured: true,
        tech: ["Python", "Flask", "SQL"],
        github: `https://github.com/${APP_CONFIG.github.username}/flask-rbac-management`,
        live: null,
        image: "/images/projects/flask-rbac.jpg"
      },
      {
        id: 6,
        title: "Spring Boot Template Marketplace",
        description: "Marketplace application for reusable Spring Boot templates and boilerplate code.",
        category: "Spring Boot",
        year: "2026",
        status: "Completed",
        featured: false,
        tech: ["Java", "Spring Boot", "MySQL"],
        github: `https://github.com/${APP_CONFIG.github.username}/springboot-template-marketplace`,
        live: null,
        image: "/images/projects/template-market.jpg"
      },
      {
        id: 7,
        title: "AI Code Reviewer",
        description: "Automated AI-assisted source code review application for identifying bugs and improvements.",
        category: "Python",
        year: "2026",
        status: "Completed",
        featured: false,
        tech: ["Python", "FastAPI", "AI"],
        github: `https://github.com/${APP_CONFIG.github.username}/ai-code-reviewer`,
        live: null,
        image: "/images/projects/ai-reviewer.jpg"
      },
      {
        id: 8,
        title: "Interactive Interview Prep Portal",
        description: "Interactive interview preparation portal with mock questions and progress tracking.",
        category: "HTML/CSS",
        year: "2023",
        status: "Completed",
        featured: false,
        tech: ["HTML", "CSS", "JavaScript", "Python"],
        github: `https://github.com/${APP_CONFIG.github.username}/interview-prep-portal`,
        live: null,
        image: "/images/projects/interview-portal.jpg"
      },
      {
        id: 9,
        title: "Python Storage Cleanup Tool",
        description: "Utility for automated storage cleanup and duplicate file management.",
        category: "Tools",
        year: "2023",
        status: "Completed",
        featured: false,
        tech: ["Python", "OS", "File System"],
        github: `https://github.com/${APP_CONFIG.github.username}/python-storage-cleanup`,
        live: null,
        image: "/images/projects/cleanup-tool.jpg"
      },
      {
        id: 10,
        title: "Arrow Escape Puzzle Game",
        description: "Browser-based puzzle game with interactive gameplay and smooth animations.",
        category: "HTML/CSS",
        year: "2023",
        status: "Completed",
        featured: false,
        tech: ["HTML", "CSS", "JavaScript"],
        github: `https://github.com/${APP_CONFIG.github.username}/arrow-escape-puzzle`,
        live: "https://arrow-escape.vercel.app",
        image: "/images/projects/arrow-game.jpg"
      }
    ]
  },
  github: {
    title: "GitHub Profile",
    subtitle: "My open source contributions",
    description: "Explore my repositories, contributions, and coding activity on GitHub.",
    username: APP_CONFIG.github.username,
    profileUrl: APP_CONFIG.github.profileUrl,
    fallbackProfile: {
      name: "Prathamesh Khedkar",
      username: APP_CONFIG.github.username,
      bio: "Software Developer | Java | Python | Full Stack",
      avatar: null,
      followers: 0,
      following: 0,
      public_repos: 9,
      html_url: APP_CONFIG.github.profileUrl
    },
    fallbackRepos: [
      {
        id: 1,
        name: "vahtuk-transport-management",
        description: "Transport Management System with trip management and reports.",
        language: "Java",
        stars: 0,
        forks: 0,
        updated_at: new Date().toISOString(),
        html_url: `https://github.com/${APP_CONFIG.github.username}/vahtuk-transport-management`
      },
      {
        id: 2,
        name: "ollama-code-reviewer",
        description: "AI-powered code review platform using local LLMs.",
        language: "Python",
        stars: 0,
        forks: 0,
        updated_at: new Date().toISOString(),
        html_url: `https://github.com/${APP_CONFIG.github.username}/ollama-code-reviewer`
      },
      {
        id: 3,
        name: "wifishare-app",
        description: "Large file sharing application over local WiFi.",
        language: "JavaScript",
        stars: 0,
        forks: 0,
        updated_at: new Date().toISOString(),
        html_url: `https://github.com/${APP_CONFIG.github.username}/wifishare-app`
      }
    ]
  },
  certifications: {
    title: "Certifications",
    subtitle: "Professional Credentials",
    description: "Certifications and credentials earned through professional development.",
    items: [
      {
        id: "cert-01",
        name: "Claude Code in Action",
        issuer: "Anthropic Academy",
        date: "March 2026",
        description: "Hands-on certification covering practical application of Claude AI for code generation, review, debugging, and developer productivity workflows.",
        credentialUrl: "#",
        icon: "FiAward",
        featured: true,
        skills: ["AI", "Developer Productivity", "Code Review"]
      }
    ]
  },
  contact: {
    title: "Get In Touch",
    subtitle: "Let's work together",
    description: "Have a project in mind, an opportunity to discuss, or just want to say hello? I'd love to hear from you.",
    infoCards: [
      { 
        label: "Location", 
        value: APP_CONFIG.contact.location, 
        href: APP_CONFIG.contact.locationMapUrl, 
        icon: "FiMapPin",
        verified: true,
        isMapLink: true
      },
      { 
        label: "WhatsApp", 
        value: "Chat with me", 
        href: APP_CONFIG.social.whatsapp, 
        icon: "FiMessageCircle",
        verified: APP_CONFIG.social.whatsappVerified
      },
      { 
        label: "Instagram", 
        value: "@prathamesh___30", 
        href: APP_CONFIG.social.instagram, 
        icon: "FiInstagram",
        verified: APP_CONFIG.social.instagramVerified
      },
      { 
        label: "LinkedIn", 
        value: "Prathamesh Khedkar", 
        href: APP_CONFIG.social.linkedin, 
        icon: "FiLinkedin",
        verified: APP_CONFIG.social.linkedinVerified
      }
    ],
    socialLinks: [
      { name: "GitHub", icon: "FiGithub", url: APP_CONFIG.social.github, verified: APP_CONFIG.social.githubVerified },
      { name: "LinkedIn", icon: "FiLinkedin", url: APP_CONFIG.social.linkedin, verified: APP_CONFIG.social.linkedinVerified },
      { name: "Instagram", icon: "FiInstagram", url: APP_CONFIG.social.instagram, verified: APP_CONFIG.social.instagramVerified },
      { name: "Email", icon: "FiMail", url: `mailto:${APP_CONFIG.contact.email}`, verified: true },
      { name: "WhatsApp", icon: "FiMessageCircle", url: APP_CONFIG.social.whatsapp, verified: APP_CONFIG.social.whatsappVerified }
    ],
    form: {
      namePlaceholder: "Your full name",
      emailPlaceholder: "your.email@example.com",
      subjectPlaceholder: "Project discussion / Opportunity",
      messagePlaceholder: "Tell me about your project or opportunity...",
      submitLabel: "Send Message",
      sendingLabel: "Sending...",
      emailjsConfigured: isEmailJSConfigured(),
    },
    map: {
      location: APP_CONFIG.contact.location,
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.67879049847!2d73.72288087798407!3d18.524598742650835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
    }
  },
  seo: {
    title: "Prathamesh Khedkar | Software Developer",
    description: "Professional portfolio of Prathamesh Khedkar, specializing in Java, Python, Spring Boot, and Backend Development.",
  },
};

/**
 * Helper to get the default resume (used by Navbar and Hero)
 */
export const getDefaultResume = () => {
  return portfolioData.resumeVariants.find(r => r.isDefault) || portfolioData.resumeVariants[0];
};