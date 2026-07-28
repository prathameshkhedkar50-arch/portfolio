import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';

import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import GitHubProfile from './components/sections/GitHubProfile';
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

        <Navbar />
        
        <main id="main-content" className="flex-grow" role="main" tabIndex="-1">
          <Hero />
          <About />
          <Experience />
          <Education />
          <Skills />
          <Projects />
          <GitHubProfile />
          <Certifications />
          <Resume />
          <Contact />
        </main>
        
        <Footer />
        <WhatsAppButton />
      </div>
    </ThemeProvider>
  );
}

export default App;