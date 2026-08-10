import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProjectsGrid from '../components/ProjectsGrid';
import Timeline from '../components/Timeline';
import TechStack from '../components/TechStack';
import ContactForm from '../components/ContactForm';
import { Github, Linkedin } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-white">
      {/* Header / Navigation */}
      <Navbar />

      {/* Page Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Projects Section */}
        <ProjectsGrid />

        {/* Experience Section */}
        <Timeline />

        {/* Tech Stack Section */}
        <TechStack />

        {/* Contact Section */}
        <ContactForm />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border/20 bg-background/50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <span className="text-lg font-mono font-bold tracking-wider">
              ABDULLAH <span className="text-primary font-sans font-extrabold">ALBASHRAWI</span>
            </span>
            <p className="text-xs text-muted-foreground mt-2">
              © {new Date().getFullYear()} Abdullah Albashrawi. Designed and built with Next.js, NestJS, and Drizzle.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://github.com/Abdullah-Albashraw"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full glass border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/abdullah-albashrawi-785221360"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full glass border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
