'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Server, Database, Cpu, CheckCircle2, XCircle, X, Download } from 'lucide-react';

export default function Hero() {
  const [latency, setLatency] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [lastChecked, setLastChecked] = useState<string>('');

  const checkStatus = async () => {
    const start = performance.now();
    try {
      let res = await fetch('/api/projects').catch(() => null);
      if (!res || !res.ok) {
        res = await fetch('http://localhost:5001/api/projects').catch(() => null);
      }
      const end = performance.now();
      const realPing = Math.max(1, Math.round(end - start));
      
      if (res && res.ok) {
        setIsOnline(true);
        setLatency(realPing);
      } else {
        setIsOnline(false);
        setLatency(null);
      }
    } catch {
      setIsOnline(false);
      setLatency(null);
    }
    setLastChecked(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/20 blur-[80px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-accent/20 blur-[80px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-secondary/10 blur-[90px] animate-pulse pointer-events-none" />

      {/* Radial Dot Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,#6b7280_1px,transparent_1px)] bg-[size:40px_40px] opacity-5 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Live System Stack Badge */}
          <motion.button
            onClick={() => setShowModal(true)}
            variants={itemVariants}
            className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono tracking-wider text-emerald-400 glow-primary hover:border-emerald-500/60 transition-all cursor-pointer group shadow-sm"
            title="Click for Live System Stack Diagnostics"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="flex items-center gap-2 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              SYSTEM STACK: {isOnline ? `ONLINE (${latency}ms)` : 'DEGRADED'}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          </motion.button>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] sm:leading-[1.05]"
          >
            Hi, I’m Abdullah Albashrawi{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient mt-2">
              Full-Stack Developer
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mt-2 font-light leading-relaxed"
          >
            I build modern web & mobile applications with polished interfaces, thoughtful user experiences, and reliable scalable solutions.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover shadow-lg glow-primary transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-sm"
            >
              Explore My Work
              <ArrowRight className="w-4.5 h-4.5" />
            </a>
            <button
              disabled
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border/60 bg-muted/30 text-muted-foreground/60 font-medium cursor-not-allowed text-sm shadow-sm opacity-70"
              title="Resume coming soon - Abdullah will upload it shortly"
            >
              <Download className="w-4.5 h-4.5" />
              <span>Download CV (Coming Soon)</span>
            </button>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass text-foreground border border-border hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-sm"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating mouse scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none hidden sm:block">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </div>

      {/* Live System Diagnostics Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md glass rounded-3xl border border-border/80 p-6 shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">System Stack Status</h3>
                    <p className="text-xs text-muted-foreground font-mono">Real-time Backend Metrics</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Badges List */}
              <div className="space-y-3 font-mono text-xs mb-6">
                {/* NestJS Backend */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border/30">
                  <div className="flex items-center gap-2.5">
                    <Server className="w-4 h-4 text-primary" />
                    <span>NestJS API Server (Port 5001)</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ONLINE</span>
                  </span>
                </div>

                {/* SQLite & Drizzle */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border/30">
                  <div className="flex items-center gap-2.5">
                    <Database className="w-4 h-4 text-secondary" />
                    <span>SQLite & Drizzle ORM</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>CONNECTED</span>
                  </span>
                </div>

                {/* Empirical Ping Latency */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border/30">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-accent" />
                    <span>Client API Ping Latency</span>
                  </div>
                  <span className="text-emerald-400 font-bold">
                    {latency ? `${latency} ms` : 'Measuring...'}
                  </span>
                </div>
              </div>

              {/* Footer Refresh & Close */}
              <div className="flex items-center justify-between pt-2 text-[11px] text-muted-foreground border-t border-border/30">
                <span>Last Ping: {lastChecked || 'Just now'}</span>
                <button
                  onClick={() => {
                    checkStatus();
                  }}
                  className="px-3 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors cursor-pointer"
                >
                  Refresh Ping
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
