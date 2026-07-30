import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import { AmbientBackground } from './components/common/AmbientBackground';

// Phase 3: Hero Section
import Hero from './components/sections/Hero';

// Phase 4: About, Experience, Education Sections
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';

// Phase 5: Skills Section
import Skills from './components/sections/Skills';

// Phase 6: Projects Section
import Projects from './components/sections/Projects';

// Phase 7: GitHub Profile Section
import GitHubProfile from './components/sections/GitHubProfile';

// Phase 8: Resume, Certifications, Contact Sections
import Certifications from './components/sections/Certifications';
import Resume from './components/sections/Resume';
import Contact from './components/sections/Contact';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col relative bg-light-bg dark:bg-dark-bg transition-colors duration-300 overflow-x-hidden">
        
        {/* Accessibility: Skip to main content */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Skip to main content
        </a>

        {/* Phase 3D.5: Premium Ambient Background */}
        <AmbientBackground />
        
        {/* Global Navigation */}
        <Navbar />
        
        {/* Main Content Area - z-10 ensures content sits above the ambient background */}
        <main id="main-content" className="flex-grow relative z-10" role="main" tabIndex="-1">
          
          {/* Phase 3: Premium Hero Section */}
          <Hero />
          
          {/* Phase 4: About, Experience, Education */}
          <About />
          <Experience />
          <Education />
          
          {/* Phase 5: Skills Section */}
          <Skills />
          
          {/* Phase 6: Projects Section */}
          <Projects />
          
          {/* Phase 7: GitHub Profile Section */}
          <GitHubProfile />
          
          {/* Phase 8: Resume, Certifications, Contact */}
          <Certifications />
          <Resume />
          <Contact />
          
        </main>
        
        {/* Global Footer */}
        <Footer />
        
        {/* Floating WhatsApp Button */}
        <WhatsAppButton />
        
      </div>
    </ThemeProvider>
  );
}

export default App;