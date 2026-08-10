'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, Compass } from 'lucide-react';

interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
  type: 'work' | 'education';
}

const FALLBACK_EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: 'B.Sc. in Computer Science',
    company: 'Imam Abdulrahman Bin Faisal University (IAU)',
    duration: '2021 - 2026',
    description: 'Bachelor Degree in Computer Science with Second Class Honors. Specialized in Software Engineering, Web Systems, and Distributed Computing.',
    type: 'education',
  },
  {
    id: 2,
    role: 'Web Development Intern',
    company: 'Kwaidi',
    duration: 'June 2025 - August 2025',
    description: 'Web development internship at Kwaidi focusing on frontend & backend web applications, modern UI component architecture, and software engineering.',
    type: 'work',
  },
];

export default function Timeline() {
  const [experiences, setExperiences] = useState<Experience[]>(FALLBACK_EXPERIENCES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        let res = await fetch('/api/experience').catch(() => null);
        if (!res || !res.ok) {
          res = await fetch('http://localhost:5001/api/experience').catch(() => null);
        }

        if (res && res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setExperiences(data);
          }
        }
      } catch (err: any) {
        console.error('Experiences fetch error, using fallback:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-background/50 border-y border-border/20">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-primary/10 blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            My Journey
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-6" />
          <p className="text-muted-foreground max-w-xl font-light">
            A chronological timeline of my professional career, freelance milestones, and academic background.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col gap-8 animate-pulse max-w-2xl mx-auto">
            {[1, 2].map((n) => (
              <div key={n} className="glass p-6 rounded-2xl border border-border/40 h-36 w-full" />
            ))}
          </div>
        ) : (
          <div className="relative max-w-2xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-accent to-secondary/30 -translate-x-1/2" />

            {/* Experiences Loop */}
            <div className="flex flex-col gap-12">
              {experiences.map((exp, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isEven ? 'sm:justify-start' : 'sm:justify-end'
                    }`}
                  >
                    {/* Glowing Timeline Node */}
                    <div className="absolute left-4 sm:left-1/2 top-1.5 -translate-x-1/2 w-4.5 h-4.5 rounded-full border-4 border-background bg-primary z-20 flex items-center justify-center glow-primary">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>

                    {/* Timeline Card */}
                    <div
                      className={`w-full sm:w-[calc(50%-2rem)] ml-10 sm:ml-0 ${
                        isEven ? 'sm:mr-auto' : 'sm:ml-auto'
                      } glass rounded-2xl border border-border/50 hover:border-primary/40 transition-all p-6 group`}
                    >
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                            {exp.type === 'work' ? (
                              <Briefcase className="w-4 h-4" />
                            ) : (
                              <GraduationCap className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-base">
                              {exp.role}
                            </h3>
                            <p className="text-xs text-muted-foreground font-mono">
                              {exp.company}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-primary font-medium mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.duration}</span>
                      </div>

                      <p className="text-muted-foreground text-xs leading-relaxed font-light">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
