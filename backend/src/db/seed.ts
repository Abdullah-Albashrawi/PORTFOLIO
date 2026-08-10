import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { projects, experiences } from './schema';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

async function seed() {
  console.log('🌱 Seeding database...');

  // Ensure tables exist with exact schema matching schema.ts
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT NOT NULL,
      github_link TEXT,
      live_link TEXT,
      tags TEXT NOT NULL,
      created_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role TEXT NOT NULL,
      company TEXT NOT NULL,
      duration TEXT NOT NULL,
      description TEXT NOT NULL,
      type TEXT NOT NULL,
      created_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at INTEGER
    );
  `);

  // Ensure created_at columns exist if tables were created previously
  try { sqlite.exec('ALTER TABLE projects ADD COLUMN created_at INTEGER;'); } catch {}
  try { sqlite.exec('ALTER TABLE experiences ADD COLUMN created_at INTEGER;'); } catch {}
  try { sqlite.exec('ALTER TABLE messages ADD COLUMN created_at INTEGER;'); } catch {}

  // Clear existing data
  console.log('Clearing old entries...');
  sqlite.exec('DELETE FROM projects');
  sqlite.exec('DELETE FROM experiences');

  // Insert seed projects
  console.log('Seeding projects...');
  await db.insert(projects).values([
    {
      title: 'Changan Albashrawi Motors',
      description: 'An official automotive dealership web platform for Changan Albashrawi Motors showcasing vehicle models, interactive car browsing, specifications, and client test drive booking.',
      imageUrl: 'https://changan-albashrawi.com/assets/UNi-k-1-B_q5ijZz.jpg',
      githubLink: 'https://github.com/Abdullah-Albashrawi/changan-albashrawi',
      liveLink: 'https://changan-albashrawi.com/',
      tags: 'React,Vite,Tailwind CSS,JavaScript',
    },
    {
      title: 'Analytics Dashboard',
      description: 'A glassmorphic SaaS dashboard featuring interactive charts, customizable widgets, and real-time WebSocket connection to display server resources.',
      imageUrl: 'https://dashboard-hussein-slais-1.vercel.app/assets/logo-BKsLZ4RB.jpeg',
      githubLink: 'https://github.com/example/analytics-dashboard',
      liveLink: 'https://dashboard-hussein-slais-1.vercel.app',
      tags: 'Vue.js,Bootstrap,Express,Recharts',
    },
    {
      title: 'Moon Store',
      description: 'A modern full-stack e-commerce store platform featuring product catalog management, shopping cart workflows, customer order processing, and responsive frontend UI.',
      imageUrl: '/logo.svg',
      githubLink: 'https://github.com/m7mdful/Moon-store',
      liveLink: null,
      tags: 'Vue.js,Bootstrap,Node.js,Express,MongoDB',
    },
    {
      title: 'Dolani',
      description: 'A multi-platform guidance, directory, and consultation ecosystem ("دلني") integrating a web application, cross-platform mobile client, and Vercel-deployed server API to connect users with service guidance and listings in real time.',
      imageUrl: '/dolani-logo.svg',
      githubLink: 'https://github.com/DevM7mdAli/dolani-frontend',
      liveLink: 'https://dolani-backend.vercel.app',
      tags: 'React Native,React,Node.js,Express,Vercel',
    },
  ]);

  // Insert seed experiences
  console.log('Seeding experiences...');
  await db.insert(experiences).values([
    {
      role: 'B.Sc. in Computer Science',
      company: 'Imam Abdulrahman Bin Faisal University (IAU)',
      duration: '2021 - 2026',
      description: 'Bachelor Degree in Computer Science with Second Class Honors. Specialized in Software Engineering, Web Systems, and Distributed Computing.',
      type: 'education',
    },
    {
      role: 'Web Development Intern',
      company: 'Kwaidi',
      duration: 'June 2025 - August 2025',
      description: 'Web development internship at Kwaidi focusing on frontend & backend web applications, modern UI component architecture, and software engineering.',
      type: 'work',
    },
  ]);

  console.log('✅ Seeding completed successfully!');
  sqlite.close();
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  sqlite.close();
  process.exit(1);
});
