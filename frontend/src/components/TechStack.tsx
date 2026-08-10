'use client';

import { motion } from 'framer-motion';
import { 
  Code2, 
  Server, 
  Database, 
  Wrench,
  Zap,
  Layers,
  Package,
  GitBranch,
  Cloud,
  Terminal,
  Palette,
  Settings
} from 'lucide-react';

interface Tech {
  name: string;
  logo?: string; // URL to logo
}

interface TechCategory {
  name: string;
  icon: React.ReactNode;
  description: string;
  technologies: Tech[];
}

export default function TechStack() {
  const techCategories: TechCategory[] = [
    {
      name: 'Languages',
      icon: <Code2 className="w-6 h-6" />,
      description: 'Core Programming',
      technologies: [
        { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
        { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      ],
    },
    {
      name: 'Frontend',
      icon: <Palette className="w-6 h-6" />,
      description: 'UI & User Experience',
      technologies: [
        { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
        { name: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
        { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
        { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' },
        { name: 'Framer Motion', logo: 'https://cdn.simpleicons.org/framer/0055FF' },
        { name: 'Recharts', logo: 'https://cdn.simpleicons.org/chartdotjs/FF6384' },
      ],
    },
    {
      name: 'Backend',
      icon: <Server className="w-6 h-6" />,
      description: 'Server & APIs',
      technologies: [
        { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
        { name: 'NestJS', logo: 'https://cdn.simpleicons.org/nestjs/E0234E' },
        { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
        { name: 'REST APIs', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg' },
      ],
    },
    {
      name: 'Databases',
      icon: <Database className="w-6 h-6" />,
      description: 'Data Storage',
      technologies: [
        { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
        { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
        { name: 'SQLite', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
      ],
    },
    {
      name: 'ORMs & Query',
      icon: <Layers className="w-6 h-6" />,
      description: 'Data Access',
      technologies: [
        { name: 'Drizzle ORM', logo: 'https://cdn.simpleicons.org/drizzle/C5F74F' },
        { name: 'Prisma', logo: 'https://cdn.simpleicons.org/prisma/ffffff' },
      ],
    },
    {
      name: 'Real-time Messaging',
      icon: <Zap className="w-6 h-6" />,
      description: 'Live Connections & WebSockets',
      technologies: [
        { name: 'WebSockets', logo: 'https://cdn.simpleicons.org/socketdotio/ffffff' },
      ],
    },
    {
      name: 'DevOps & Cloud',
      icon: <Wrench className="w-6 h-6" />,
      description: 'Development, Cloud & Deployment',
      technologies: [
        { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
        { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/ffffff' },
        { name: 'Render', logo: 'https://cdn.simpleicons.org/render/46E3B7' },
        { name: 'Railway', logo: 'https://cdn.simpleicons.org/railway/ffffff' },
      ],
    },
  ];

  return (
    <section id="tech-stack" className="py-32 relative overflow-hidden bg-background">
      {/* Animated background glow orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/15 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-secondary/15 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-accent/10 blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-28">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
              My Tech Stack
            </h2>
            <div className="flex gap-4 justify-center mb-8">
              <div className="w-12 h-1.5 bg-primary rounded-full" />
              <div className="w-8 h-1.5 bg-accent rounded-full opacity-60" />
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto font-light text-base leading-relaxed">
              A carefully curated collection of modern tools and frameworks that power my development process
            </p>
          </motion.div>
        </div>

        {/* Tech Categories with Creative Layout */}
        <div className="flex flex-col gap-20">
          {techCategories.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              viewport={{ once: true, margin: '-100px' }}
              className="group"
            >
              {/* Category Header with Gradient Accent */}
              <div className="flex items-center gap-6 mb-8 pb-6 border-b border-border/30 group-hover:border-primary/30 transition-colors duration-300">
                <motion.div 
                  className="p-4 rounded-xl bg-gradient-to-br from-primary/25 to-primary/10 text-primary group-hover:from-primary/40 group-hover:to-primary/20 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {category.icon}
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1.5 font-light">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Technologies Grid with Creative Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {category.technologies.map((tech, tidx) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: tidx * 0.08, duration: 0.5, type: 'spring', stiffness: 200 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="group/tech relative"
                  >
                    {/* Gradient Border Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover/tech:opacity-100 rounded-2xl blur transition-opacity duration-300" />
                    
                    {/* Main Card */}
                    <div className="relative flex flex-col items-center gap-4 p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-card/40 to-card/20 group-hover/tech:from-card/60 group-hover/tech:to-card/40 group-hover/tech:border-primary/50 transition-all duration-300 backdrop-blur-sm h-full">
                      {/* Logo Container with Glow */}
                      <div className="relative">
                        {tech.logo ? (
                          <>
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-primary/30 rounded-xl blur opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 -z-10" />
                            <img 
                              src={tech.logo} 
                              alt={tech.name}
                              className="w-14 h-14 object-contain opacity-80 group-hover/tech:opacity-100 transition-opacity duration-300"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </>
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <span className="w-4 h-4 rounded-full bg-foreground/50" />
                          </div>
                        )}
                      </div>

                      {/* Tech Name */}
                      <span className="text-sm font-bold text-muted-foreground group-hover/tech:text-foreground transition-colors duration-300 text-center leading-tight">
                        {tech.name}
                      </span>

                      {/* Accent line on hover */}
                      <div className="w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover/tech:w-full transition-all duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
