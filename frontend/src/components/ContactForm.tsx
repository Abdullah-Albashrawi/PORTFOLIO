'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Mail } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 5) {
      errors.message = 'Message must be at least 5 characters long';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      // 1. Save to local database via NestJS backend
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(async () => {
        await fetch('http://localhost:5001/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }).catch(() => null);
      });

      // 2. Dispatch real email directly to abdullah-albashrawi@outlook.com via FormSubmit service
      await fetch('https://formsubmit.co/ajax/abdullah-albashrawi@outlook.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
        }),
      }).catch(() => null);

      // 3. Trigger mailto link backup
      const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      const mailtoUrl = `mailto:abdullah-albashrawi@outlook.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-secondary/10 blur-[90px] pointer-events-none" />

      <div className="max-w-xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-6" />
          
          {/* Direct Email Badge */}
          <a
            href="mailto:abdullah-albashrawi@outlook.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-4 hover:bg-primary/20 transition-all duration-300 shadow-sm"
          >
            <Mail className="w-4 h-4 text-primary" />
            <span>abdullah-albashrawi@outlook.com</span>
          </a>

          <p className="text-muted-foreground font-light text-sm max-w-sm mt-2">
            Have a project in mind, want to collaborate, or just say hello? Send a message directly to my email!
          </p>
        </div>

        {/* Contact Form Wrapper */}
        <div className="glass rounded-3xl border border-border/50 p-8 glow-primary/5">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center py-10"
              >
                <CheckCircle2 className="w-16 h-16 text-secondary mb-6 animate-bounce" />
                <h3 className="text-2xl font-bold mb-2 text-foreground">Message Ready & Sent!</h3>
                <p className="text-muted-foreground text-sm max-w-xs mb-6">
                  Your message has been saved and your email client was opened for <strong className="text-foreground">abdullah-albashrawi@outlook.com</strong>.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors font-medium text-xs cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
              >
                {/* Error Banner */}
                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-semibold text-foreground/80 tracking-wider uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 rounded-xl bg-background border text-sm text-foreground focus:outline-none transition-all duration-300 ${
                      validationErrors.name
                        ? 'border-destructive focus:ring-1 focus:ring-destructive'
                        : 'border-border hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary'
                    }`}
                  />
                  {validationErrors.name && (
                    <p className="text-destructive text-xs">{validationErrors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-semibold text-foreground/80 tracking-wider uppercase">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-background border text-sm text-foreground focus:outline-none transition-all duration-300 ${
                      validationErrors.email
                        ? 'border-destructive focus:ring-1 focus:ring-destructive'
                        : 'border-border hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary'
                    }`}
                  />
                  {validationErrors.email && (
                    <p className="text-destructive text-xs">{validationErrors.email}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-semibold text-foreground/80 tracking-wider uppercase">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="How can I help you?"
                    className={`w-full px-4 py-3 rounded-xl bg-background border text-sm text-foreground focus:outline-none transition-all duration-300 resize-none ${
                      validationErrors.message
                        ? 'border-destructive focus:ring-1 focus:ring-destructive'
                        : 'border-border hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary'
                    }`}
                  />
                  {validationErrors.message && (
                    <p className="text-destructive text-xs">{validationErrors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white hover:bg-primary-hover font-semibold text-sm transition-all duration-300 shadow-md glow-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {status === 'submitting' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message to Email</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
