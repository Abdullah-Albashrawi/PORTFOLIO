import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  githubLink: text('github_link'),
  liveLink: text('live_link'),
  tags: text('tags').notNull(), // Comma-separated strings or JSON string
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const experiences = sqliteTable('experiences', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  role: text('role').notNull(),
  company: text('company').notNull(),
  duration: text('duration').notNull(), // e.g. "2024 - Present"
  description: text('description').notNull(),
  type: text('type', { enum: ['work', 'education'] }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
