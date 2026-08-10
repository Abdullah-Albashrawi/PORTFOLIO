'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  githubLink: string | null;
  liveLink: string | null;
  tags: string; // comma-separated
}

const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Changan Albashrawi Motors',
    description: 'An official automotive dealership web platform for Changan Albashrawi Motors showcasing vehicle models, interactive car browsing, specifications, and client test drive booking.',
    imageUrl: 'https://changan-albashrawi.com/assets/UNi-k-1-B_q5ijZz.jpg',
    githubLink: 'https://github.com/Abdullah-Albashrawi/changan-albashrawi',
    liveLink: 'https://changan-albashrawi.com/',
    tags: 'React,Vite,Tailwind CSS,JavaScript',
  },
  {
    id: 3,
    title: 'Analytics Dashboard',
    description: 'A glassmorphic SaaS dashboard featuring interactive charts, customizable widgets, and real-time WebSocket connection to display server resources.',
    imageUrl: 'https://dashboard-hussein-slais-1.vercel.app/assets/logo-BKsLZ4RB.jpeg',
    githubLink: 'https://github.com/example/analytics-dashboard',
    liveLink: 'https://dashboard-hussein-slais-1.vercel.app',
    tags: 'Vue.js,Bootstrap,Express,Recharts',
  },
  {
    id: 4,
    title: 'Moon Store',
    description: 'A modern full-stack e-commerce store platform featuring product catalog management, shopping cart workflows, customer order processing, and responsive frontend UI.',
    imageUrl: '/logo.svg',
    githubLink: 'https://github.com/m7mdful/Moon-store',
    liveLink: null,
    tags: 'Vue.js,Bootstrap,Node.js,Express,MongoDB',
  },
  {
    id: 5,
    title: 'Dolani',
    description: 'A multi-platform guidance, directory, and consultation ecosystem ("دلني") integrating a web application, cross-platform mobile client, and Vercel-deployed server API to connect users with service guidance and listings in real time.',
    imageUrl: '/dolani-logo.svg',
    githubLink: 'https://github.com/DevM7mdAli/dolani-frontend',
    liveLink: 'https://dolani-backend.vercel.app',
    tags: 'React Native,React,Node.js,Express,Vercel',
  },
];

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Try relative URL first (proxy rewrite), then direct localhost URL
        let res = await fetch('/api/projects').catch(() => null);
        if (!res || !res.ok) {
          res = await fetch('http://localhost:5001/api/projects').catch(() => null);
        }
        
        if (res && res.ok) {
          const data: Project[] = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          }
        }
      } catch (err: any) {
        console.error('Projects fetch error, using fallback:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-6" />
          <p className="text-muted-foreground max-w-xl font-light">
            A selection of my recent works, ranging from visual frontend designs to full-stack applications and real-time backend systems.
          </p>
        </div>

        {/* Projects Display */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-2xl border border-border/50 bg-card/30 p-4 h-[420px] flex flex-col gap-4 animate-pulse">
                <div className="w-full h-48 bg-muted rounded-xl" />
                <div className="h-6 bg-muted rounded w-2/3 mt-2" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6" />
                <div className="flex gap-2 mt-auto">
                  <div className="h-8 bg-muted rounded w-16" />
                  <div className="h-8 bg-muted rounded w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group rounded-2xl border border-border/50 bg-card hover:border-primary/50 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-primary/5"
                >
                  {/* Image container */}
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                        project.imageUrl === '/logo.svg'
                          ? 'object-contain p-6 bg-white/5'
                          : 'object-cover'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="flex gap-4">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-primary/20 backdrop-blur border border-primary/30 hover:bg-primary transition-colors text-white"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-secondary/20 backdrop-blur border border-secondary/30 hover:bg-secondary transition-colors text-white"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tags.split(',').map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded bg-muted text-[10px] font-mono font-semibold text-muted-foreground border border-border/20"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
